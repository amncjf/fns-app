import { ethers } from 'ethers'
import { ENSArgs } from '..'
import type { FuseOptions } from '../@types/FuseOptions'
import generateFuseInput from '../utils/generateFuseInput'
import { hexEncodeName } from '../utils/hexEncodedName'

async function wrapETH(
  { contracts }: ENSArgs<'contracts'>,
  labels: string[],
  wrappedOwner: string,
  decodedFuses: string,
  resolverAddress: string,
  signer: ethers.Signer,
  address: string,
) {
  const nameWrapper = await contracts?.getNameWrapper()!
  const baseRegistrar = (await contracts?.getBaseRegistrar()!).connect(signer)

  const labelhash = ethers.utils.solidityKeccak256(['string'], [labels[0]])

  const data = ethers.utils.defaultAbiCoder.encode(
    ['string', 'address', 'uint32', 'uint64', 'address'],
    [labels[0], wrappedOwner, '0x0', decodedFuses, resolverAddress],
  )

  return baseRegistrar.populateTransaction[
    'safeTransferFrom(address,address,uint256,bytes)'
  ](address, nameWrapper.address, labelhash, data)
}

async function wrapOther(
  { contracts }: ENSArgs<'contracts'>,
  name: string,
  wrappedOwner: string,
  decodedFuses: string,
  resolverAddress: string,
  address: string,
  signer: ethers.Signer,
) {
  const nameWrapper = (await contracts?.getNameWrapper()!).connect(signer)
  const registry = await contracts?.getRegistry()!

  const hasApproval = await registry.isApprovedForAll(
    address,
    nameWrapper.address,
  )

  if (!hasApproval) {
    throw new Error(
      'NameWrapper must have approval to wrap a name from this address.',
    )
  }

  return nameWrapper.populateTransaction.wrap(
    hexEncodeName(name),
    wrappedOwner,
    decodedFuses,
    resolverAddress,
  )
}

export default async function (
  { contracts, signer, populate }: ENSArgs<'contracts' | 'signer' | 'populate'>,
  name: string,
  {
    wrappedOwner,
    fuseOptions,
    resolverAddress,
  }: {
    wrappedOwner: string
    fuseOptions?: FuseOptions | string | number
    resolverAddress?: string
  },
) {
  const address = await signer.getAddress()

  let decodedFuses: string

  switch (typeof fuseOptions) {
    case 'object': {
      decodedFuses = generateFuseInput(fuseOptions)
      break
    }
    case 'number': {
      decodedFuses = fuseOptions.toString(16)
      break
    }
    case 'string': {
      decodedFuses = fuseOptions
      break
    }
    case 'undefined': {
      decodedFuses = '0'
      break
    }
    default: {
      throw new Error(`Invalid fuseOptions type: ${typeof fuseOptions}`)
    }
  }

  const publicResolver = await contracts?.getPublicResolver()!
  if (!resolverAddress) resolverAddress = publicResolver.address

  const labels = name.split('.')
  if (labels.length < 3 && labels[labels.length - 1] === 'eth') {
    return wrapETH(
      { contracts },
      labels,
      wrappedOwner,
      decodedFuses,
      resolverAddress,
      signer,
      address,
    )
  } else {
    return wrapOther(
      { contracts },
      name,
      wrappedOwner,
      decodedFuses,
      resolverAddress,
      address,
      signer,
    )
  }
}
