import { BigNumber } from 'ethers';
import { ENSArgs } from '..';
declare const _default: {
    raw: ({ contracts }: ENSArgs<"contracts">, name: string) => Promise<{
        to: string;
        data: string;
    }>;
    decode: ({ contracts }: ENSArgs<"contracts">, data: string, name: string) => Promise<{
        fuseObj: {
            [k: string]: any;
        };
        vulnerability: any;
        vulnerableNode: null;
        rawFuses: BigNumber;
    } | undefined>;
};
export default _default;
