import type { ENS } from '@ensdomains/ensjs'

export type Profile = NonNullable<Awaited<ReturnType<ENS['getProfile']>>>

export type ProfileRecords = NonNullable<Profile['records']>

export type RecordItem = NonNullable<ProfileRecords['texts']>[number]

export type Name = NonNullable<Awaited<ReturnType<ENS['getNames']>>>[0]

export type TransactionDisplayItem = {
  type?: 'name' | 'address'
  label: string
  value: string
  fade?: boolean
  shrink?: boolean
  useRawLabel?: boolean
}

type PublicInterface<T> = { [K in keyof T]: T[K] }

export type ProfileEditorType = {
  _avatar?: File
  avatar?: string
  banner?: string
  website?: string
  general: {
    [key: string]: string
  }
  accounts: {
    [key: string]: string
  }
  address: {
    [key: string]: string
  }
  other: {
    [key: string]: string
  }
}
export type PublicENS = PublicInterface<ENS>
