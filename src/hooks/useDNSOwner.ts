import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

const useDNSOwner = (name: string, valid: boolean | undefined) => {
  const { ready, getDNSOwner } = useFns()

  const {
    data: dnsOwner,
    status,
    isFetched,
    isLoading,
    internal: { isFetchedAfterMount },
  } = useQuery(['getDNSOwner', name], () => getDNSOwner(name), {
    enabled: ready && valid && !name?.endsWith('.fil'),
  })

  const isCachedData = status === 'success' && isFetched && !isFetchedAfterMount

  return {
    dnsOwner,
    isCachedData,
    isLoading,
  }
}

export default useDNSOwner
