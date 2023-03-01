import type { JsonRpcSigner } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useQuery, useSigner } from 'wagmi'

import {
  Transaction,
  TransactionName,
  transactions as _transactions,
  makeTransactionItem,
} from '@app/transaction-flow/transaction'
import { useFns } from '@app/utils/FnsProvider'

type FNS = ReturnType<typeof useFns>
type TransactionItem = ReturnType<typeof makeTransactionItem>

export const fetchEstimateWithConfig =
  (transactionsObj: Transaction, signer: JsonRpcSigner, fns: FNS) =>
  async (transaction: TransactionItem) => {
    const transactionName = transaction.name as TransactionName
    const populatedTransaction = await transactionsObj[transactionName].transaction(
      signer as JsonRpcSigner,
      fns,
      transaction.data,
    )
    const gasLimit = await signer!.estimateGas(populatedTransaction)
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
  const keys = transactions.map((t) => t.name)

  const fns = useFns()
  const { ready: ensReady } = fns
  const { data: signer, isLoading: isSignerLoading } = useSigner()

  const { data, ...results } = useQuery(
    ['use-estimate-gas-limit-for-transactions', ...keys, ...extraKeys],
    async () => {
      if (!signer) throw new Error('No signer available')
      if (!fns) throw new Error('ensjs did not load')
      const fetchEstimate = fetchEstimateWithConfig(
        _transactions,
        signer as JsonRpcSigner,
        fns as FNS,
      )
      const estimates = await Promise.all(transactions.map(fetchEstimate))
      const total = estimates.map((r) => r.gasLimit).reduce((a, b) => a.add(b))
      const gasPrice = await signer.getGasPrice()
      const gasCost = gasPrice.mul(total)

      return {
        estimates,
        gasCost,
        gasLimit: total,
      }
    },
    {
      enabled: ensReady && !isSignerLoading && isEnabled,
    },
  )

  return {
    gasLimit: data?.gasLimit,
    gasCostEth: formatEther(data?.gasCost || 0),
    estimates: data?.estimates,
    ...results,
  }
}
