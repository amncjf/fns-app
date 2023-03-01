import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

export const usePrimary = (address: string, skip?: any) => {
  const { ready, getName } = useFns()

  const {
    data,
    isLoading: loading,
    status,
  } = useQuery(['getName', address], () => getName(address), {
    enabled: ready && !skip && address !== '',
    cacheTime: 60,
  })

  return { name: data?.match ? data.name : null, loading, status }
}
