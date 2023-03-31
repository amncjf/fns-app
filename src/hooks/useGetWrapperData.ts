import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

export const useGetWrapperData = (name: string, skip?: any) => {
  const { ready, getWrapperData } = useFns()

  const {
    data: wrapperData,
    isLoading,
    status,
    isFetched,
    isFetchedAfterMount,
    // don't remove this line, it updates the isCachedData state (for some reason) but isn't needed to verify it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFetching: _,
  } = useQuery(['getWrapperData', name], () => getWrapperData(name), {
    enabled: ready && !skip && name !== '',
  })

  return {
    wrapperData,
    isLoading,
    status,
    isCachedData: status === 'success' && isFetched && !isFetchedAfterMount,
  }
}
