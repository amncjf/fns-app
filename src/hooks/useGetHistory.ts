import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

export const useGetHistory = (name: string, skip?: any) => {
  const { ready, getHistory } = useFns()

  const {
    data: history,
    isLoading,
    status,
    isFetched,
    internal: { isFetchedAfterMount },
  } = useQuery(['graph', 'getHistory', name], () => getHistory(name), {
    enabled: ready && !skip && name !== '',
  })

  return {
    history,
    isLoading,
    status,
    isCachedData: status === 'success' && isFetched && !isFetchedAfterMount,
  }
}
