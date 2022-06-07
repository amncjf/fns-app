import { ethers } from 'ethers'
import { NameWrapper__factory } from '../generated/factories/NameWrapper__factory'

const defaultAddress = '0xD7D9C568Bc4C2343ab286096e1F851D33eEf49Af'

export default (provider: ethers.providers.JsonRpcProvider, address?: string) =>
  NameWrapper__factory.connect(address || defaultAddress, provider)
