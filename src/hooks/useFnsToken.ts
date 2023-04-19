import { useQuery } from 'wagmi'

import { useContractAddress } from '@app/hooks/useContractAddress'
import { ReturnedENS } from '@app/types'
import { useFns } from '@app/utils/FnsProvider'

type BaseBatchReturn = [
  ReturnedENS['getFnsSupply'],
  ReturnedENS['getSundaySupply'],
  ReturnedENS['getFnsBalance'],
  ReturnedENS['getSundayBalance'],
  ReturnedENS['getShare'],
  ReturnedENS['getEarnings'],
  ReturnedENS['getSundayPaused'],
  ReturnedENS['getBalance'],
  ReturnedENS['getFnsBalance'],
  ReturnedENS['getCurrentBlockTimestamp'],
]

export const useFnsToken = (address: string | undefined) => {
  const fns = useFns()

  const sundayAddress = useContractAddress('Sunday')
  const { data: batchData } = useQuery(
    [
      'batch',
      'getFnsSupply',
      'getSundaySupply',
      'getFnsBalance',
      'getSundayBalance',
      'getShare',
      'getEarnings',
      'getSundayPaused',
      'getBalance',
      'getCurrentBlockTimestamp',
      address,
    ],
    (): Promise<[] | BaseBatchReturn | undefined> => {
      if (!address) {
        // eslint-disable-next-line no-promise-executor-return
        return new Promise(() => undefined)
      }

      return fns.batch(
        fns.getFnsSupply.batch(),
        fns.getSundaySupply.batch(),
        fns.getFnsBalance.batch(address),
        fns.getSundayBalance.batch(address),
        fns.getShare.batch(0),
        fns.getEarnings.batch(address, 0),
        fns.getSundayPaused.batch(),
        fns.getBalance.batch(sundayAddress),
        fns.getFnsBalance.batch(sundayAddress),
        fns.getCurrentBlockTimestamp.batch(),
      )
    },
    {
      enabled: !!fns.ready,
    },
  )

  const [
    fnsSupply,
    sundaySupply,
    fnsBalance,
    sundayBalance,
    share,
    earnings,
    paused,
    filBalance,
    sundayFnsBalance,
    timestamp,
  ] = batchData || []

  if (share && !share.inited) {
    share.fns = sundayFnsBalance.sub(sundaySupply).div(64)
    share.fil = filBalance.div(64)
  }

  if (earnings && !earnings.inited && sundayBalance.gt(0)) {
    earnings.fns = share!.fns.mul(sundayBalance).div(sundaySupply)
    earnings.fil = share!.fil.mul(sundayBalance).div(sundaySupply)
  }

  return {
    fnsSupply,
    sundaySupply,
    fnsBalance,
    sundayBalance,
    share,
    earnings,
    paused,
    filBalance,
    timestamp,
  }
}
