import { utils } from 'ethers'
import { ENSArgs } from '..'

export default async function (
  { contracts, provider }: ENSArgs<'contracts' | 'provider'>,
  name: string,
  newController: string,
  newRegistrant?: string,
  options?: { addressOrIndex?: string | number },
) {
  const signer = provider?.getSigner(options?.addressOrIndex)

  const address = await signer?.getAddress()

  if (!signer || !address) {
    throw new Error('No signer found')
  }

  const labels = name.split('.')
  const labelhash = utils.solidityKeccak256(['string'], [labels[0]])
  const parentNodehash = utils.namehash(labels.slice(1).join('.'))

  const nameWrapper = (await contracts?.getNameWrapper()!).connect(signer)

  if (labels.length === 2 && labels[1] === 'eth') {
    if (!newRegistrant) {
      throw new Error('newRegistrant must be specified for .eth names')
    }

    return nameWrapper.unwrapETH2LD(labelhash, newRegistrant, newController)
  } else {
    if (newRegistrant) {
      throw new Error('newRegistrant can only be specified for .eth names')
    }

    return nameWrapper.unwrap(parentNodehash, labelhash, newController)
  }
}
