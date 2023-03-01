import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

import { useContractAddress } from './useContractAddress'

const useWrapperApprovedForAll = (address: string, isSubdomain: boolean) => {
  const { contracts } = useFns()
  const nameWrapperAddress = useContractAddress('NameWrapper')
  const { data: approvedForAll, isLoading } = useQuery(
    ['approvedForAll', nameWrapperAddress, address],
    async () => {
      const registry = await contracts!.getRegistry()
      return registry.isApprovedForAll(address, nameWrapperAddress)
    },
    {
      enabled: !!address && !!nameWrapperAddress && isSubdomain,
    },
  )

  return { approvedForAll, isLoading }
}

export default useWrapperApprovedForAll
