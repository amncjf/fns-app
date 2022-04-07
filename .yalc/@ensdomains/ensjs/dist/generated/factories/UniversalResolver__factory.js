/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        type: "constructor",
        payable: false,
        inputs: [
            {
                type: "address",
                name: "_registry",
            },
        ],
    },
    {
        type: "error",
        name: "OffchainLookup",
        inputs: [
            {
                type: "address",
                name: "sender",
            },
            {
                type: "string[]",
                name: "urls",
            },
            {
                type: "bytes",
                name: "callData",
            },
            {
                type: "bytes4",
                name: "callbackFunction",
            },
            {
                type: "bytes",
                name: "extraData",
            },
        ],
    },
    {
        type: "function",
        name: "findResolver",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [
            {
                type: "bytes",
                name: "name",
            },
        ],
        outputs: [
            {
                type: "address",
            },
            {
                type: "bytes32",
            },
        ],
    },
    {
        type: "function",
        name: "registry",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [],
        outputs: [
            {
                type: "address",
            },
        ],
    },
    {
        type: "function",
        name: "resolve",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [
            {
                type: "bytes",
                name: "name",
            },
            {
                type: "bytes",
                name: "data",
            },
        ],
        outputs: [
            {
                type: "bytes",
            },
            {
                type: "address",
            },
        ],
    },
    {
        type: "function",
        name: "resolveCallback",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [
            {
                type: "bytes",
                name: "response",
            },
            {
                type: "bytes",
                name: "extraData",
            },
        ],
        outputs: [
            {
                type: "bytes",
            },
        ],
    },
    {
        type: "function",
        name: "reverse",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [
            {
                type: "bytes",
                name: "reverseNode",
            },
        ],
        outputs: [
            {
                type: "string",
            },
            {
                type: "bytes",
            },
        ],
    },
    {
        type: "function",
        name: "supportsInterface",
        constant: true,
        stateMutability: "view",
        payable: false,
        inputs: [
            {
                type: "bytes4",
                name: "interfaceId",
            },
        ],
        outputs: [
            {
                type: "bool",
            },
        ],
    },
];
export class UniversalResolver__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
UniversalResolver__factory.abi = _abi;
