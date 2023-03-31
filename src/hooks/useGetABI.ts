import { useMemo } from 'react'
import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'

type AbiData = NonNullable<Awaited<ReturnType<ReturnType<typeof useFns>['getABI']>>>

export const useGetABI = (name: string, skip?: boolean) => {
  const { ready, getABI } = useFns()
  const {
    data,
    isLoading: loading,
    ...rest
  } = useQuery(
    ['useGetABI', name],
    async () => {
      const result = await getABI(name)
      return result || { abi: '' }
    },
    {
      enabled: ready && !skip && name !== '',
    },
  )

  const abi = useMemo(() => {
    if (!data?.abi) return undefined
    const abiData = data as AbiData
    return {
      data: JSON.stringify(abiData.abi),
      contentType: abiData.contentType,
    }
  }, [data])

  return {
    abi,
    loading: !ready || loading,
    ...rest,
  }
}
