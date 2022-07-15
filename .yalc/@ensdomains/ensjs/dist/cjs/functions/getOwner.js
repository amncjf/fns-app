"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const labels_1 = require("../utils/labels");
const normalise_1 = require("../utils/normalise");
const singleContractOwnerRaw = async ({ contracts }, contract, namehash, labels) => {
    switch (contract) {
        case 'nameWrapper': {
            const nameWrapper = await contracts?.getNameWrapper();
            return {
                to: nameWrapper.address,
                data: nameWrapper.interface.encodeFunctionData('ownerOf', [namehash]),
            };
        }
        case 'registry': {
            const registry = await contracts?.getRegistry();
            return {
                to: registry.address,
                data: registry.interface.encodeFunctionData('owner', [namehash]),
            };
        }
        case 'registrar': {
            const registrar = await contracts?.getBaseRegistrar();
            return {
                to: registrar.address,
                data: registrar.interface.encodeFunctionData('ownerOf', [
                    (0, labels_1.labelhash)(labels[0]),
                ]),
            };
        }
    }
};
const raw = async ({ contracts, multicallWrapper }, name, contract) => {
    const namehash = (0, normalise_1.namehash)(name);
    const labels = name.split('.');
    if (contract || labels.length === 1) {
        return await singleContractOwnerRaw({ contracts }, contract || 'registry', namehash, labels);
    }
    const registryData = await singleContractOwnerRaw({ contracts }, 'registry', namehash, labels);
    const nameWrapperData = await singleContractOwnerRaw({ contracts }, 'nameWrapper', namehash, labels);
    const registrarData = await singleContractOwnerRaw({ contracts }, 'registrar', namehash, labels);
    const data = [registryData, nameWrapperData];
    if (labels.length == 2 && labels[1] === 'eth') {
        data.push(registrarData);
    }
    return multicallWrapper.raw(data);
};
const singleContractOwnerDecode = (data) => ethers_1.ethers.utils.defaultAbiCoder.decode(['address'], data)[0];
const decode = async ({ contracts, multicallWrapper }, data, name, contract) => {
    if (data === null)
        return;
    const labels = name.split('.');
    if (contract || labels.length === 1) {
        const singleOwner = singleContractOwnerDecode(data);
        let obj = {
            ownershipLevel: contract || 'registry',
        };
        if (contract === 'registrar') {
            return {
                ...obj,
                registrant: singleOwner,
            };
        }
        else {
            return {
                ...obj,
                owner: singleOwner,
            };
        }
    }
    const result = await multicallWrapper.decode(data);
    if (result === null)
        return;
    const nameWrapper = await contracts?.getNameWrapper();
    const decodedData = [result[0][1], result[1][1], result[2]?.[1]].map((ret) => ret &&
        ret !== '0x' &&
        ethers_1.ethers.utils.defaultAbiCoder.decode(['address'], ret));
    const registryOwner = decodedData[0][0];
    const nameWrapperOwner = decodedData[1][0];
    const registrarOwner = decodedData[2]?.[0];
    // check for only .eth names
    if (labels[labels.length - 1] === 'eth') {
        // if the owner on the registrar is the namewrapper, then the namewrapper owner is the owner
        // there is no "registrant" for wrapped names
        if (registrarOwner === nameWrapper.address) {
            return {
                owner: nameWrapperOwner,
                ownershipLevel: 'nameWrapper',
            };
        }
        // if there is a registrar owner, then it's not a subdomain but we have also passed the namewrapper clause
        // this means that it's an unwrapped second-level name
        // the registrant is the owner of the NFT
        // the owner is the controller of the records
        if (registrarOwner) {
            return {
                registrant: registrarOwner,
                owner: registryOwner,
                ownershipLevel: 'registrar',
            };
        }
        if (labels.length > 2 &&
            ethers_1.ethers.utils.hexStripZeros(registryOwner) !== '0x') {
            // this means that the subname is wrapped
            if (registryOwner === nameWrapper.address) {
                return {
                    owner: nameWrapperOwner,
                    ownershipLevel: 'nameWrapper',
                };
            }
            // unwrapped subnames do not have NFTs associated, so do not have a registrant
            return {
                owner: registryOwner,
                ownershipLevel: 'registry',
            };
        }
        // .eth names with no registrar owner are either unregistered or expired
        return;
    }
    // non .eth names inherit the owner from the registry
    // there will only ever be an owner for non .eth names, not a registrant
    // this is because for unwrapped names, there is no associated NFT
    // and for wrapped names, owner and registrant are the same thing
    if (registryOwner == nameWrapper.address) {
        return {
            owner: nameWrapperOwner,
            ownershipLevel: 'nameWrapper',
        };
    }
    // for unwrapped non .eth names, the owner is the registry owner
    if (ethers_1.ethers.utils.hexStripZeros(registryOwner) !== '0x') {
        return {
            owner: registryOwner,
            ownershipLevel: 'registry',
        };
    }
    // for anything else, return
    return;
};
exports.default = { raw, decode };
