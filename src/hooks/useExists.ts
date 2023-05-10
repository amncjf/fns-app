import { useEffect, useState } from 'react'
import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'
import { useQueryKeys } from '@app/utils/cacheKeyFactory'

export const useExists = (name: string, skip?: any) => {
  const { ready, getOwner } = useFns()

  const [exists, setExists] = useState(false)

  const {
    data,
    isLoading: loading,
    status,
  } = useQuery(useQueryKeys().exists(name), () => getOwner(name).then((d) => d || null), {
    enabled: ready && !skip && name !== '',
  })

  useEffect(() => {
    if (data) {
      setExists(true)
    }
  }, [ready, name, skip, data])

  return { exists, loading, status, data }
}
