import { formatFixed } from '@ethersproject/bignumber'
import type { JsonRpcSigner } from '@ethersproject/providers'

import { PublicFNS, Transaction, TransactionDisplayItem } from '@app/types'

type Data = {
  amount: string
  title: string
}

const displayItems = ({ amount, title }: Data): TransactionDisplayItem[] => [
  {
    label: 'amount',
    value: formatFixed(amount, 18),
  },
  {
    label: 'action',
    value: title,
  },
]

const transaction = (signer: JsonRpcSigner, fns: PublicFNS, data: Data) => {
  const tx = fns.withdrawal.populateTransaction(data.amount, {
    signer,
  })
  return tx
}

export default {
  displayItems,
  transaction,
  backToInput: true,
} as Transaction<Data>
