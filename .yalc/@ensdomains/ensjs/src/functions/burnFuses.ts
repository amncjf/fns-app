import { ENSArgs } from '..'
import { FuseOptions } from '../@types/FuseOptions'
import generateFuseInput from '../utils/generateFuseInput'
import { namehash } from '../utils/normalise'

export default async function (
  { contracts, provider }: ENSArgs<'contracts' | 'provider'>,
  name: string,
  fusesToBurn: FuseOptions,
) {
  const signer = provider?.getSigner()

  if (!signer) {
    throw new Error('No signer found')
  }

  const nameWrapper = (await contracts?.getNameWrapper()!).connect(signer)
  const hash = namehash(name)

  const encodedFuses = generateFuseInput(fusesToBurn)

  return nameWrapper.burnFuses(hash, encodedFuses)
}
