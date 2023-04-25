import type { JsonRpcSigner } from '@ethersproject/providers'
import { namehash } from '@fildomains/fnsjs/utils/normalise'

import { PublicFNS, Transaction, TransactionDisplayItem } from '@app/types'

type Data = {
  name: string
  title: string
}

const displayItems = ({ title }: Data): TransactionDisplayItem[] => [
  {
    label: 'action',
    value: title,
  },
]

const transaction = (signer: JsonRpcSigner, fns: PublicFNS, data: Data) => {
  const tx = fns.claimEarnings.populateTransaction(namehash(data.name), { signer })
  return tx
}

export default {
  displayItems,
  transaction,
  backToInput: true,
} as Transaction<Data>
