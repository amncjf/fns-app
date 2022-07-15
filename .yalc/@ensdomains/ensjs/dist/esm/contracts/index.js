import getBaseRegistrar from './baseRegistrar';
import getEthRegistrarController from './ethRegistrarController';
import getMulticall from './multicall';
import getNameWrapper from './nameWrapper';
import getPublicResolver from './publicResolver';
import getRegistry from './registry';
import getReverseRegistrar from './reverseRegistrar';
import getUniversalResolver from './universalResolver';
export default class ContractManager {
    constructor(provider, fetchAddress) {
        this.generateContractGetter = (name, func) => {
            return async (passedProvider, address) => {
                const inputAddress = address || this.fetchAddress(name);
                const provider = passedProvider || this.provider;
                return func(provider, inputAddress);
            };
        };
        this.getPublicResolver = this.generateContractGetter('PublicResolver', getPublicResolver);
        this.getUniversalResolver = this.generateContractGetter('UniversalResolver', getUniversalResolver);
        this.getRegistry = this.generateContractGetter('ENSRegistryWithFallback', getRegistry);
        this.getReverseRegistrar = this.generateContractGetter('ReverseRegistrar', getReverseRegistrar);
        this.getNameWrapper = this.generateContractGetter('NameWrapper', getNameWrapper);
        this.getBaseRegistrar = this.generateContractGetter('BaseRegistrarImplementation', getBaseRegistrar);
        this.getEthRegistrarController = this.generateContractGetter('ETHRegistrarController', getEthRegistrarController);
        this.getMulticall = this.generateContractGetter('Multicall', getMulticall);
        this.provider = provider;
        this.fetchAddress = fetchAddress;
    }
}
