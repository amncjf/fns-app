import type { JsonRpcSigner } from '@ethersproject/providers'
import type { TFunction } from 'react-i18next'

import { PublicFNS, Transaction, TransactionDisplayItem } from '@app/types'

type Data = {
  parent: string
  label: string
  contract: 'nameWrapper' | 'registry'
}

const displayItems = (
  { parent, label }: Data,
  t: TFunction<'translation', undefined>,
): TransactionDisplayItem[] => [
  {
    label: 'name',
    value: parent,
    type: 'name',
  },
  {
    label: 'action',
    value: t(`transaction.description.createSubname`),
  },
  {
    label: 'subname',
    value: `${label}.${parent}`,
    type: 'name',
  },
]

const transaction = async (signer: JsonRpcSigner, fns: PublicFNS, data: Data) =>
  fns.createSubname.populateTransaction(`${data.label}.${data.parent}`, {
    signer,
    owner: await signer.getAddress(),
    contract: data.contract,
  })

export default {
  displayItems,
  transaction,
} as Transaction<Data>
