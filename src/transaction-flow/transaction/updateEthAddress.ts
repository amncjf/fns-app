import type { JsonRpcSigner } from '@ethersproject/providers'
import type { TFunction } from 'react-i18next'

import { PublicFNS, Transaction, TransactionDisplayItem } from '@app/types'

type Data = {
  name: string
  address: string
}

const displayItems = (
  { name, address }: Data,
  t: TFunction<'translation', undefined>,
): TransactionDisplayItem[] => [
  {
    label: 'action',
    value: t(`transaction.description.updateEthAddress`),
  },
  {
    label: 'info',
    value: t(`transaction.info.updateEthAddress`),
  },
  {
    label: 'name',
    value: name,
    type: 'name',
  },
  {
    label: 'address',
    value: address,
    type: 'address',
  },
]

const transaction = async (signer: JsonRpcSigner, fns: PublicFNS, data: Data) =>
  fns.setRecord.populateTransaction(data.name, {
    signer,
    record: { key: 'FIL', value: data.address },
    type: 'addr',
  })

const exports = { displayItems, transaction } as Transaction<Data>

export default exports
