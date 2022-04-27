import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SHA1Digest, SHA1DigestInterface } from "../SHA1Digest";
declare type SHA1DigestConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class SHA1Digest__factory extends ContractFactory {
    constructor(...args: SHA1DigestConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<SHA1Digest>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): SHA1Digest;
    connect(signer: Signer): SHA1Digest__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610924806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063f7e83aee14610030575b600080fd5b61004a60048036038101906100459190610737565b610060565b60405161005791906107de565b60405180910390f35b6000601483839050146100a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161009f906107f9565b60405180910390fd5b6000610102600085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061018290919063ffffffff16565b6bffffffffffffffffffffffff19169050600061016287878080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050506101cf565b9050806bffffffffffffffffffffffff1916821492505050949350505050565b60008251601483610193919061082a565b111561019e57600080fd5b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000008260208501015116905092915050565b60006040518251602084019350604067ffffffffffffffc06001830116016009828203106001811461020057610207565b6040820191505b50776745230100efcdab890098badcfe001032547600c3d2e1f061025f565b6000838310156102585782820151905082840393506020841015610257576001846020036101000a03198082169150505b5b9392505050565b60005b8281101561066d57610275848289610226565b8552610285846020830189610226565b60208601526040818503106001811461029d576102a6565b60808286038701535b50604083038114600181146102ba576102ca565b6008850260208701511760208701525b5060405b60808110156103565760408103860151603882038701511860208203870151600c830388015118187c010000000100000001000000010000000100000001000000010000000163800000008204167ffffffffefffffffefffffffefffffffefffffffefffffffefffffffefffffffe6002830216179050808288015250600c810190506102ce565b5060805b6101408110156103e357608081038601516070820387015118604082038701516018830388015118187c030000000300000003000000030000000300000003000000030000000363400000008204167ffffffffcfffffffcfffffffcfffffffcfffffffcfffffffcfffffffcfffffffc600483021617905080828801525060188101905061035a565b508160008060005b605081101561063f57601481046000811461041d576001811461046757600281146104a4576003811461050757610540565b6501000000000085046a01000000000000000000008604189350836f01000000000000000000000000000000860416935083650100000000008604189350635a8279999250610540565b6a010000000000000000000085046f01000000000000000000000000000000860418935083650100000000008604189350636ed9eba19250610540565b6a010000000000000000000085046f01000000000000000000000000000000860417935083650100000000008604169350836a010000000000000000000086046f01000000000000000000000000000000870416179350638f1bbcdc9250610540565b6a010000000000000000000085046f0100000000000000000000000000000086041893508365010000000000860418935063ca62c1d692505b50601f770800000000000000000000000000000000000000000000008504168063ffffffe073080000000000000000000000000000000000000087041617905080840190508063ffffffff86160190508083019050807c0100000000000000000000000000000000000000000000000000000000600484028c0151040190507401000000000000000000000000000000000000000081026501000000000086041794506a0100000000000000000000633fffffff6a040000000000000000000087041663c00000006604000000000000880416170277ffffffff00ffffffff000000000000ffffffff00ffffffff8616179450506001810190506103eb565b5077ffffffff00ffffffff00ffffffff00ffffffff00ffffffff838601169450505050604081019050610262565b506c0100000000000000000000000063ffffffff821667ffffffff000000006101008404166bffffffff0000000000000000620100008504166fffffffff000000000000000000000000630100000086041673ffffffff000000000000000000000000000000006401000000008704161717171702945050505050919050565b60008083601f8401126106ff57600080fd5b8235905067ffffffffffffffff81111561071857600080fd5b60208301915083600182028301111561073057600080fd5b9250929050565b6000806000806040858703121561074d57600080fd5b600085013567ffffffffffffffff81111561076757600080fd5b610773878288016106ed565b9450945050602085013567ffffffffffffffff81111561079257600080fd5b61079e878288016106ed565b925092505092959194509250565b6107b581610880565b82525050565b60006107c8601883610819565b91506107d3826108c5565b602082019050919050565b60006020820190506107f360008301846107ac565b92915050565b60006020820190508181036000830152610812816107bb565b9050919050565b600082825260208201905092915050565b60006108358261088c565b91506108408361088c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561087557610874610896565b5b828201905092915050565b60008115159050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f496e76616c696420736861312068617368206c656e677468000000000000000060008201525056fea2646970667358221220bb4464cdaaa81739af0648c949149178d7f2a1221866db1adee1843295a2783864736f6c63430008040033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): SHA1DigestInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SHA1Digest;
}
export {};
