import { useMemo } from 'react'
import { useQuery } from 'wagmi'

import { truncateFormat } from '@fildomains/fnsjs/utils/format'

import { ReturnedENS } from '@app/types'
import { useEns } from '@app/utils/EnsProvider'
import { getRegistrationStatus } from '@app/utils/registrationStatus'
import { checkETH2LDName, checkETHName, isLabelTooLong, yearsToSeconds } from '@app/utils/utils'

import { useSupportsTLD } from './useSupportsTLD'
import { useValidate } from './useValidate'
import { useWrapperExists } from './useWrapperExists'

type BaseBatchReturn = [ReturnedENS['getOwner'], ReturnedENS['getWrapperData']]
type ETH2LDBatchReturn = [...BaseBatchReturn, ReturnedENS['getExpiry'], ReturnedENS['getPrice']]

export const useBasicName = (name?: string | null, normalised?: boolean) => {
  const fns = useEns()

  const { name: _normalisedName, valid, labelCount } = useValidate(name!, !name)

  const normalisedName = normalised ? name! : _normalisedName

  const { data: supportedTLD, isLoading: supportedTLDLoading } = useSupportsTLD(normalisedName)

  const {
    data: batchData,
    isLoading: batchLoading,
    isFetched,
    internal: { isFetchedAfterMount },
    status,
  } = useQuery(
    ['batch', 'getOwner', 'getExpiry', normalisedName],
    (): Promise<[] | BaseBatchReturn | ETH2LDBatchReturn | undefined> => {
      const labels = normalisedName.split('.')
      const isDotETH = checkETHName(labels)
      if (checkETH2LDName(isDotETH, labels, true)) {
        if (labels[0].length < 3) {
          return Promise.resolve([])
        }
        return fns.batch(
          fns.getOwner.batch(normalisedName),
          fns.getWrapperData.batch(normalisedName),
          fns.getExpiry.batch(normalisedName),
          fns.getPrice.batch(labels[0], yearsToSeconds(1), false),
        )
      }

      return fns.batch(fns.getOwner.batch(normalisedName), fns.getWrapperData.batch(normalisedName))
    },
    {
      enabled: !!(fns.ready && name && valid),
    },
  )

  const [ownerData, _wrapperData, expiryData, priceData] = batchData || []

  const wrapperData = useMemo(() => {
    if (!_wrapperData) return undefined
    const { expiryDate, ...rest } = _wrapperData
    return {
      ...rest,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
    }
  }, [_wrapperData])

  const registrationStatus = batchData
    ? getRegistrationStatus({
        name: normalisedName,
        ownerData,
        wrapperData,
        expiryData,
        priceData,
        supportedTLD,
      })
    : undefined

  const expiryDate = expiryData?.expiry ? new Date(expiryData.expiry) : undefined

  const gracePeriodEndDate =
    expiryDate && expiryData?.gracePeriod
      ? new Date(expiryDate.getTime() + expiryData.gracePeriod)
      : undefined

  const truncatedName = normalisedName ? truncateFormat(normalisedName) : undefined

  const nameWrapperExists = useWrapperExists()
  const isWrapped = ownerData?.ownershipLevel === 'nameWrapper'

  const isLoading = !fns.ready || batchLoading || supportedTLDLoading

  return {
    normalisedName,
    valid,
    labelCount,
    ownerData,
    wrapperData,
    priceData,
    expiryDate,
    gracePeriodEndDate,
    isLoading,
    truncatedName,
    registrationStatus,
    isWrapped: ownerData?.ownershipLevel === 'nameWrapper',
    canBeWrapped:
      nameWrapperExists &&
      !isWrapped &&
      normalisedName?.endsWith('.fil') &&
      !isLabelTooLong(normalisedName),
    isCachedData: status === 'success' && isFetched && !isFetchedAfterMount,
  }
}
