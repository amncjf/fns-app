import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'
import { yearsToSeconds } from '@app/utils/utils'

export const usePrice = (nameOrNames: string | string[], legacy?: boolean) => {
  const { ready, getPrice } = useFns()
  const names = Array.isArray(nameOrNames) ? nameOrNames : [nameOrNames]
  const type = legacy ? 'legacy' : 'new'
  const {
    data,
    status,
    isFetched,
    isLoading: loading,
    error,
    isFetchedAfterMount,
    // don't remove this line, it updates the isCachedData state (for some reason) but isn't needed to verify it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFetching,
  } = useQuery(
    ['usePrice', type, ...names],
    async () => getPrice(nameOrNames, yearsToSeconds(1)),
    {
      enabled: !!(ready && nameOrNames && nameOrNames.length > 0),
    },
  )

  const base = data?.base
  const premium = data?.premium
  const hasPremium = data?.premium.gt(0)

  return {
    base,
    premium,
    hasPremium,
    isCachedData: status === 'success' && isFetched && !isFetchedAfterMount,
    loading,
    error,
  }
}
