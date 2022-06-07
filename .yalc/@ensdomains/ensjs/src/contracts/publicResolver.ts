import { ethers } from 'ethers'
import { PublicResolver__factory } from '../generated/factories/PublicResolver__factory'

const defaultAddress = '0x3bAa5F3ea7bFCC8948c4140f233d72c11eBF0bdB'

export default (provider: ethers.providers.JsonRpcProvider, address?: string) =>
  PublicResolver__factory.connect(address || defaultAddress, provider)
