import { ContractName } from '@fildomains/fnsjs/contracts/types'

import { useFns } from '@app/utils/FnsProvider'

import { useChainId } from './useChainId'

export const useContractAddress = (contractName: ContractName) => {
  const chainId = useChainId()
  const { getContractAddress } = useFns()
  return getContractAddress(chainId as any)(contractName)
}
