import type { JsonRpcSigner } from '@ethersproject/providers'
import type { TFunction } from 'react-i18next'

import { EthAddress, PublicFNS, Transaction, TransactionDisplayItem } from '@app/types'

type Data = {
  name: string
  newOwner: EthAddress
  contract: 'registry' | 'baseRegistrar' | 'nameWrapper'
  sendType: 'sendManager' | 'sendOwner'
  reclaim?: boolean
}

const displayItems = (
  { name, sendType, newOwner }: Data,
  t: TFunction<'translation', undefined>,
): TransactionDisplayItem[] => [
  {
    label: 'name',
    value: name,
    type: 'name',
  },
  {
    label: 'action',
    value: t(`name.${sendType}`),
  },
  {
    label: 'to',
    type: 'address',
    value: newOwner,
  },
]

const transaction = (signer: JsonRpcSigner, fns: PublicFNS, data: Data) => {
  const tx = fns.transferName.populateTransaction(data.name, {
    newOwner: data.newOwner,
    contract: data.contract,
    reclaim: data.reclaim,
    signer,
  })
  return tx
}

export default {
  displayItems,
  transaction,
  backToInput: true,
} as Transaction<Data>
