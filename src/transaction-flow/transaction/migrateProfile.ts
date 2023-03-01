import type { JsonRpcSigner } from '@ethersproject/providers'
import type { TFunction } from 'react-i18next'

import { PublicFNS, Transaction, TransactionDisplayItem } from '@app/types'

type Data = {
  name: string
  resolverAddress?: string
}

const displayItems = (
  { name }: Data,
  t: TFunction<'translation', undefined>,
): TransactionDisplayItem[] => [
  {
    label: 'name',
    value: name,
    type: 'name',
  },
  {
    label: 'action',
    value: t(`transaction.description.migrateProfile`),
  },
  {
    label: 'info',
    value: t(`transaction.info.migrateProfile`),
  },
]

const transaction = async (signer: JsonRpcSigner, fns: PublicFNS, data: Data) => {
  const options = data.resolverAddress ? { resolverAddress: data.resolverAddress } : undefined
  const profile = await fns.getProfile(data.name, options)
  if (!profile) throw new Error('No profile found')
  if (!profile.records) throw new Error('No records found')
  const { contentHash } = profile.records
  const resolverAddress = (await fns.contracts!.getPublicResolver()!).address
  let migratableContentHash: string | undefined
  if (contentHash) {
    if (typeof contentHash === 'string') {
      migratableContentHash = contentHash
    } else if (typeof contentHash === 'object' && contentHash.decoded) {
      migratableContentHash = `${contentHash.protocolType}://${contentHash.decoded}`
    }
  }

  const migratableProfile = {
    contentHash: migratableContentHash,
    texts: profile.records.texts as {
      key: string
      value: string
    }[],
    coinTypes: profile.records.coinTypes?.map((coinType) => ({
      key: coinType.key as string,
      value: (coinType as any).addr as string,
    })),
  }

  return fns.setRecords.populateTransaction(data.name, {
    records: migratableProfile,
    resolverAddress,
    signer,
  })
}

export default { displayItems, transaction } as Transaction<Data>
