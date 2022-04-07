import { ethers } from 'ethers'
import { BaseRegistrarImplementation__factory } from '../generated/factories/BaseRegistrarImplementation__factory'

const defaultAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'

export default (provider: ethers.providers.JsonRpcProvider, address?: string) =>
  BaseRegistrarImplementation__factory.connect(
    address || defaultAddress,
    provider,
  )
