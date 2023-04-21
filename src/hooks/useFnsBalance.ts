import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

export const useFnsBalance = (address: string) => {
  const { ready, getFnsBalance } = useFns()
  return useQuery(
    ['use-fns-balance', address],
    async () => {
      const resolver = await getFnsBalance(address)
      if (!resolver) return ''
      return resolver
    },
    {
      enabled: ready && !!address,
    },
  )
}
