"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const normalise_1 = require("../utils/normalise");
async function default_1({ contracts, signer }, name, { newOwner, contract, }) {
    const address = await signer.getAddress();
    switch (contract) {
        case 'registry': {
            const registry = (await contracts?.getRegistry()).connect(signer);
            return registry.populateTransaction.setOwner((0, normalise_1.namehash)(name), newOwner);
        }
        case 'baseRegistrar': {
            const baseRegistrar = (await contracts?.getBaseRegistrar()).connect(signer);
            const labels = name.split('.');
            if (labels.length > 2 || labels[labels.length - 1] !== 'eth') {
                throw new Error('Invalid name for baseRegistrar');
            }
            return baseRegistrar.populateTransaction['safeTransferFrom(address,address,uint256)'](address, newOwner, ethers_1.ethers.utils.solidityKeccak256(['string'], [labels[0]]));
        }
        case 'nameWrapper': {
            const nameWrapper = (await contracts?.getNameWrapper()).connect(signer);
            return nameWrapper.populateTransaction.safeTransferFrom(address, newOwner, (0, normalise_1.namehash)(name), 1, '0x');
        }
        default: {
            throw new Error(`Unknown contract: ${contract}`);
        }
    }
}
exports.default = default_1;
