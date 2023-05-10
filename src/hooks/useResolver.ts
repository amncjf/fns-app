import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'
import { useQueryKeys } from '@app/utils/cacheKeyFactory'

export const useResolver = (name: string) => {
  const { ready, getResolver } = useFns()
  return useQuery(
    useQueryKeys().getResolver(name),
    async () => {
      const resolver = await getResolver(name)
      if (!resolver) return ''
      return resolver
    },
    {
      enabled: ready && !!name,
    },
  )
}
