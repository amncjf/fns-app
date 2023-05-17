import type { Name } from '@fildomains/fnsjs/functions/getNames'
import { useMemo } from 'react'
import { useQuery } from 'wagmi'

import { useFns } from '@app/utils/FnsProvider'
import { useQueryKeys } from '@app/utils/cacheKeyFactory'

import { useBlockTimestamp } from './useBlockTimestamp'

const query = `
  query getEarnings($addr: String) {
  tokenEarnings(
    orderBy: vid
    orderDirection: desc
    first: 1000
    skip: 0
  ) {
    addr
    fil
    fns
    transactionID
    tokenId
    timestamp
    name
  }
}
`

export type ReturnedEarning = {
  addr: string
  fil: string
  fns: string
  transactionID: string
  tokenId: string
  name: string
  timestamp: number
}

export type ReturnedName = Name & {
  isController?: boolean
  isRegistrant?: boolean
  isWrappedOwner?: boolean
}

const chunkArr = (arr: any[], chunkSize: number) => {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }

  console.log('chunkArr arr:', arr, ',res:', res, ',chunkSize:', chunkSize)
  return res
}

export const useFnsEarningsFromAddress = ({
  address,
  resultsPerPage,
  page,
}: {
  address: string | null | undefined
  page: number
  resultsPerPage: number | 'all'
}) => {
  const { ready, gqlInstance } = useFns()

  const { isLoading: isBlockTimestampLoading } = useBlockTimestamp()

  const { data, isLoading, status, refetch } = useQuery(
    useQueryKeys().getEarnings(address),
    async () => {
      if (address == null) {
        return undefined
      }

      const ret = await gqlInstance.client.request(query, {
        addr: address?.toLocaleLowerCase(),
      })
      console.log('useFnsEarningsFromAddress ret:', ret)
      return ret
    },
    {
      enabled: ready && !!address && !isBlockTimestampLoading,
    },
  )

  const pages = useMemo(
    () =>
      data &&
      (resultsPerPage === 'all'
        ? [data && data.tokenEarnings]
        : chunkArr(data && data.tokenEarnings, resultsPerPage)),
    [data, resultsPerPage],
  )

  const currentPage: ReturnedEarning[] | null = useMemo(
    () => pages && pages[page - 1],
    [pages, page],
  )

  console.log('data:', data, ',address:', address?.toLocaleLowerCase(), ',currentPage:', currentPage, ',pages:', pages, ',resultsPerPage:', resultsPerPage)
  return {
    currentPage,
    isLoading: isLoading || isBlockTimestampLoading,
    status,
    refetch,
    pageLength: pages?.length || 0,
  }
}
