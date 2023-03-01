import { useFns } from '@app/utils/FnsProvider'
import { emptyAddress } from '@app/utils/constants'

import { useChainId } from './useChainId'

export const useWrapperExists = (): boolean => {
  const { ready, getContractAddress } = useFns()
  const chainId = useChainId()
  const nameWrapperAddress = getContractAddress(String(chainId) as any)('NameWrapper')
  return !!(ready && nameWrapperAddress && nameWrapperAddress !== emptyAddress)
}
