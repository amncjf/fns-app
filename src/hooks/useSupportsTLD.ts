import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'
import { useQueryKeys } from '@app/utils/cacheKeyFactory'

export const useSupportsTLD = (name = '') => {
  const { ready, supportsTLD } = useFns()
  const labels = name?.split('.') || []
  const tld = labels[labels.length - 1]
  return useQuery(
    useQueryKeys().isSupportedTLD(tld),
    async () => {
      // if using "[root]", not really a valid TLD but return true for display purposes
      if (tld === '[root]') return true
      return supportsTLD(tld).then((d) => d || null)
    },
    {
      enabled: ready && !!tld,
    },
  )
}
