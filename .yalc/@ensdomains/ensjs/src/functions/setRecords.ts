import { ENSArgs } from '..'
import { namehash } from '../utils/normalise'
import { generateRecordCallArray, RecordOptions } from '../utils/recordHelpers'

export default async function (
  {
    contracts,
    provider,
    getResolver,
  }: ENSArgs<'contracts' | 'provider' | 'getResolver'>,
  name: string,
  records: RecordOptions,
) {
  if (!name.includes('.')) {
    throw new Error('Input is not an ENS name')
  }

  const resolverAddress = await getResolver(name)

  if (!resolverAddress) {
    throw new Error('No resolver found for input address')
  }

  const address = await provider?.getSigner().getAddress()

  if (!address) {
    throw new Error('No signer found')
  }

  const resolver = (
    await contracts?.getPublicResolver(provider, resolverAddress)
  )?.connect(provider?.getSigner()!)
  const hash = namehash(name)

  const calls: string[] = generateRecordCallArray(hash, records, resolver!)

  return resolver?.multicall(calls)
}
