import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

export const useResolver = (name: string) => {
  const { ready, getResolver } = useFns()
  return useQuery(
    ['use-resolver', name],
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
