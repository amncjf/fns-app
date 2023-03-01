import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

export const useSupportsTLD = (name = '') => {
  const { ready, supportsTLD } = useFns()
  const labels = name?.split('.') || []
  const tld = labels[labels.length - 1]
  return useQuery(['supportedTLD', tld], () => supportsTLD(tld), {
    enabled: ready && !!tld,
  })
}
