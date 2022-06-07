import { ethers } from 'ethers'
import { UniversalResolver__factory } from '../generated/factories/UniversalResolver__factory'

const defaultAddress = '0xAbCd01ddDa102B0C32e8C5a371D7480dFA559DC3'

export default (provider: ethers.providers.JsonRpcProvider, address?: string) =>
  UniversalResolver__factory.connect(address || defaultAddress, provider)
