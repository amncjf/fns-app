import { formatsByCoinType, formatsByName } from '@ensdomains/address-encoder';
import { encodeContenthash } from './contentHash';
export const generateSetAddr = (namehash, coinType, address, resolver) => {
    let coinTypeInstance;
    if (!isNaN(parseInt(coinType))) {
        coinTypeInstance = formatsByCoinType[parseInt(coinType)];
    }
    else {
        coinTypeInstance = formatsByName[coinType.toUpperCase()];
    }
    const inputCoinType = coinTypeInstance.coinType;
    const encodedAddress = coinTypeInstance.decoder(address);
    return resolver?.interface.encodeFunctionData('setAddr(bytes32,uint256,bytes)', [namehash, inputCoinType, encodedAddress]);
};
export function generateSingleRecordCall(namehash, resolver, type) {
    if (type === 'contentHash') {
        return (_r) => {
            const record = _r;
            let _contentHash = '';
            if (record !== _contentHash) {
                const encoded = encodeContenthash(record);
                if (encoded.error)
                    throw new Error(encoded.error);
                _contentHash = encoded.encoded;
            }
            return resolver.interface.encodeFunctionData('setContenthash', [
                namehash,
                _contentHash,
            ]);
        };
    }
    else {
        return (_r) => {
            const record = _r;
            if (type === 'text') {
                return resolver.interface.encodeFunctionData('setText', [
                    namehash,
                    record.key,
                    record.value,
                ]);
            }
            else {
                return generateSetAddr(namehash, record.key, record.value, resolver);
            }
        };
    }
}
export const generateRecordCallArray = (namehash, records, resolver) => {
    const calls = [];
    if (records.contentHash) {
        const data = generateSingleRecordCall(namehash, resolver, 'contentHash')(records.contentHash);
        data && calls.push(data);
    }
    if (records.texts && records.texts.length > 0) {
        records.texts
            .map(generateSingleRecordCall(namehash, resolver, 'text'))
            .forEach((call) => calls.push(call));
    }
    if (records.coinTypes && records.coinTypes.length > 0) {
        records.coinTypes
            .map(generateSingleRecordCall(namehash, resolver, 'addr'))
            .forEach((call) => calls.push(call));
    }
    return calls;
};
