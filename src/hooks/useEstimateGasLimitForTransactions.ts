import { BigNumber } from '@ethersproject/bignumber'
import type { JsonRpcSigner } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useMemo } from 'react'
import { useQuery, useSigner } from 'wagmi'

import {
  Transaction,
  TransactionData,
  TransactionName,
  transactions as _transactions,
  makeTransactionItem,
} from '@app/transaction-flow/transaction'
import { useFns } from '@app/utils/FnsProvider'
import { useQueryKeys } from '@app/utils/cacheKeyFactory'
import { fetchTenderlyEstimate } from '@app/utils/tenderly'

import { useChainId } from './useChainId'
import useGasPrice from './useGasPrice'

type FNS = ReturnType<typeof useFns>
type TransactionItem = ReturnType<typeof makeTransactionItem>

export const fetchEstimateWithConfig =
  (chainId: number, transactionsObj: Transaction, signer: JsonRpcSigner, fns: FNS) =>
  async (transaction: TransactionItem) => {
    const transactionName = transaction.name as TransactionName
    const populatedTransaction = await transactionsObj[transactionName].transaction(
      signer as JsonRpcSigner,
      fns,
      transaction.data,
    )

    let gasLimit: BigNumber

    try {
      gasLimit = await signer!.estimateGas(populatedTransaction)
      return {
        name: transactionName,
        gasLimit,
      }
    } catch (e) {
      if (transactionName !== 'extendNames') {
        throw e
      }
      const { names, duration } = transaction.data as TransactionData<'extendNames'>
      const fetchedEstimate = await fetchTenderlyEstimate({
        type: 'extension',
        networkId: chainId,
        labels: names.map((name) => name.split('.')[0]),
        duration,
        from: await signer.getAddress(),
      })

      gasLimit = BigNumber.from(fetchedEstimate)
    }

    return {
      name: transactionName,
      gasLimit,
    }
  }

export const useEstimateGasLimitForTransactions = (
  transactions: TransactionItem[],
  isEnabled: boolean = true,
  extraKeys: string[] = [],
) => {
  const fns = useFns()
  const { ready: ensReady } = fns
  const { gasPrice, isLoading: gasPriceLoading, isFetching: gasPriceFetching } = useGasPrice()
  const { data: signer, isLoading: isSignerLoading } = useSigner()
  const chainId = useChainId()

  const { data, isLoading, isFetching, ...results } = useQuery(
    useQueryKeys().estimateGasLimitForTransactions(transactions, extraKeys),
    async () => {
      const fetchEstimate = fetchEstimateWithConfig(
        chainId,
        _transactions,
        signer as JsonRpcSigner,
        fns as FNS,
      )
      const estimates = await Promise.all(transactions.map(fetchEstimate))
      const total = estimates.map((r) => r.gasLimit).reduce((a, b) => a.add(b))

      return {
        estimates,
        gasLimit: total,
      }
    },
    {
      enabled: ensReady && !isSignerLoading && !!signer && isEnabled,
      onError: console.error,
    },
  )

  const { gasCost, gasCostEth } = useMemo(() => {
    if (!gasPrice || !data) {
      return {
        gasCost: 0,
        gasCostEth: '0',
      }
    }

    const _gasCost = gasPrice.mul(data.gasLimit)

    return {
      gasCost: _gasCost,
      gasCostEth: formatEther(_gasCost),
    }
  }, [gasPrice, data])

  return {
    gasLimit: data?.gasLimit,
    gasCost,
    gasCostEth,
    gasPrice,
    estimates: data?.estimates,
    isLoading: isLoading || gasPriceLoading || isSignerLoading,
    isFetching: isFetching || gasPriceFetching,
    ...results,
  }
}
