import type { JsonRpcSigner } from '@ethersproject/providers'

import { PublicFNS, Transaction, TransactionDisplayItem } from '@app/types'

type Data = {
  title: string
}

const displayItems = ({ title }: Data): TransactionDisplayItem[] => [
  {
    label: 'action',
    value: title,
  },
]

const transaction = (signer: JsonRpcSigner, fns: PublicFNS) => {
  const tx = fns.initShare.populateTransaction(null, { signer })
  return tx
}

export default {
  displayItems,
  transaction,
  backToInput: true,
} as Transaction<Data>
