"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.namehash = exports.normalise = void 0;
const utils_1 = require("ethers/lib/utils");
const uts46bundle_js_1 = __importDefault(require("idna-uts46-hx/uts46bundle.js"));
const labels_1 = require("./labels");
const zeros = new Uint8Array(32);
zeros.fill(0);
const normalise = (name) => name ? uts46bundle_js_1.default.toUnicode(name, { useStd3ASCII: true }) : name;
exports.normalise = normalise;
const namehash = (name) => {
    let result = zeros;
    if (name) {
        const labels = name.split('.');
        for (var i = labels.length - 1; i >= 0; i--) {
            let labelSha;
            if ((0, labels_1.isEncodedLabelhash)(labels[i])) {
                labelSha = (0, labels_1.decodeLabelhash)(labels[i]);
            }
            else {
                const normalised = (0, exports.normalise)(labels[i]);
                labelSha = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)(normalised));
            }
            result = (0, utils_1.keccak256)((0, utils_1.concat)([result, labelSha]));
        }
    }
    else {
        result = (0, utils_1.hexlify)(zeros);
    }
    return result;
};
exports.namehash = namehash;
