import { useMemo } from 'react'
import { useQuery } from 'wagmi'

import { truncateFormat } from '@fildomains/fnsjs/utils/format'

import { ReturnedENS } from '@app/types'
import { useFns } from '@app/utils/FnsProvider'
import { emptyAddress } from '@app/utils/constants'
import { getRegistrationStatus } from '@app/utils/registrationStatus'
import { checkETH2LDName, checkETHName, isLabelTooLong, yearsToSeconds } from '@app/utils/utils'

import { useContractAddress } from './useContractAddress'
import { useSupportsTLD } from './useSupportsTLD'
import { useValidate } from './useValidate'

type BaseBatchReturn = [ReturnedENS['getOwner'], ReturnedENS['getWrapperData']]
type ETH2LDBatchReturn = [...BaseBatchReturn, ReturnedENS['getExpiry'], ReturnedENS['getPrice']]

export const useBasicName = (name?: string | null, normalised?: boolean) => {
  const fns = useFns()

  const { name: _normalisedName, valid, labelCount, isNonASCII } = useValidate(name!, !name)

  const normalisedName = normalised ? name! : _normalisedName

  const { data: supportedTLD, isLoading: supportedTLDLoading } = useSupportsTLD(normalisedName)

  const {
    data: batchData,
    isLoading: batchLoading,
    isFetched,
    /** DO NOT REMOVE */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFetching,
    isFetchedAfterMount,
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

  const nameWrapperAddress = useContractAddress('NameWrapper')
  const isWrapped = ownerData?.ownershipLevel === 'nameWrapper'
  const canBeWrapped = useMemo(
    () =>
      !!(
        fns.ready &&
        nameWrapperAddress &&
        nameWrapperAddress !== emptyAddress &&
        !isWrapped &&
        normalisedName?.endsWith('.fil') &&
        !isLabelTooLong(normalisedName)
      ),
    [fns.ready, nameWrapperAddress, isWrapped, normalisedName],
  )
  const pccExpired = useMemo(
    () =>
      !!(
        ownerData?.ownershipLevel === 'registry' &&
        ownerData.owner === nameWrapperAddress &&
        wrapperData?.expiryDate &&
        wrapperData.expiryDate < new Date()
      ),
    [ownerData, wrapperData, nameWrapperAddress],
  )

  const isLoading = !fns.ready || batchLoading || supportedTLDLoading

  return {
    normalisedName,
    valid,
    isNonASCII,
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
    pccExpired,
    canBeWrapped,
    isCachedData: status === 'success' && isFetched && !isFetchedAfterMount,
  }
}
