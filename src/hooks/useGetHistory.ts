import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

export const useGetHistory = (name: string, skip?: any) => {
  const { ready, getHistory } = useFns()

  const {
    data: history,
    isLoading,
    status,
    isFetched,
    isFetchedAfterMount,
    // don't remove this line, it updates the isCachedData state (for some reason) but isn't needed to verify it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFetching,
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
