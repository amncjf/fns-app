import { ethers } from 'ethers'
import { ENSArgs } from '..'

export async function _getOwner(
  { contracts }: ENSArgs<'contracts'>,
  name: string,
) {
  const multicall = await contracts?.getMulticall()!
  const registry = await contracts?.getRegistry()!
  const baseRegistrar = await contracts?.getBaseRegistrar()!
  const nameWrapper = await contracts?.getNameWrapper()!

  const namehash = ethers.utils.namehash(name)
  const labels = name.split('.')

  const registryData = {
    target: registry.address,
    callData: registry.interface.encodeFunctionData('owner(bytes32)', [
      namehash,
    ]),
  }
  const nameWrapperData = {
    target: nameWrapper.address,
    callData: nameWrapper.interface.encodeFunctionData('ownerOf(uint256)', [
      namehash,
    ]),
  }
  const registrarData = {
    target: baseRegistrar.address,
    callData: baseRegistrar.interface.encodeFunctionData('ownerOf(uint256)', [
      ethers.utils.solidityKeccak256(['string'], [labels[0]]),
    ]),
  }

  const data: any[] = [registryData, nameWrapperData]

  if (labels.length == 2 && labels[1] === 'eth') {
    data.push(registrarData)
  }

  const returnedData = await multicall.callStatic.tryAggregate(false, data)

  const decodedData = [
    returnedData[0][1],
    returnedData[1][1],
    returnedData[2]?.[1],
  ].map(
    (ret) =>
      ret &&
      ret !== '0x' &&
      ethers.utils.defaultAbiCoder.decode(['address'], ret),
  )

  const registryOwner = decodedData[0][0]
  const nameWrapperOwner = decodedData[1][0]
  const registrarOwner = decodedData[2]?.[0]

  return {
    registryOwner,
    nameWrapperOwner,
    registrarOwner,
  }
}

export async function getOwner(
  { contracts }: ENSArgs<'contracts'>,
  name: string,
) {
  const nameWrapper = await contracts?.getNameWrapper()!
  const { registryOwner, nameWrapperOwner, registrarOwner } = await _getOwner(
    { contracts },
    name,
  )
  const labels = name.split('.')

  // check for only .eth names
  if (labels[labels.length - 1] === 'eth') {
    // if the owner on the registrar is the namewrapper, then the namewrapper owner is the owner
    // there is no "registrant" for wrapped names
    if (registrarOwner === nameWrapper.address) {
      return {
        owner: nameWrapperOwner,
        ownershipLevel: 'nameWrapper',
      }
    }
    // if there is a registrar owner, then it's not a subdomain but we have also passed the namewrapper clause
    // this means that it's an unwrapped second-level name
    // the registrant is the owner of the NFT
    // the owner is the controller of the records
    if (registrarOwner) {
      return {
        registrant: registrarOwner,
        owner: registryOwner,
        ownershipLevel: 'registrar',
      }
    }
    if (
      labels.length > 2 &&
      ethers.utils.hexStripZeros(registryOwner) !== '0x'
    ) {
      // this means that the subname is wrapped
      if (registryOwner === nameWrapper.address) {
        return {
          owner: nameWrapperOwner,
          ownershipLevel: 'nameWrapper',
        }
      }
      // unwrapped subnames do not have NFTs associated, so do not have a registrant
      return {
        owner: registryOwner,
        ownershipLevel: 'registry',
      }
    }
    // .eth names with no registrar owner are either unregistered or expired
    return null
  }

  // non .eth names inherit the owner from the registry
  // there will only ever be an owner for non .eth names, not a registrant
  // this is because for unwrapped names, there is no associated NFT
  // and for wrapped names, owner and registrant are the same thing
  if (registryOwner == nameWrapper.address) {
    return {
      owner: nameWrapperOwner,
      ownershipLevel: 'nameWrapper',
    }
  }

  // for unwrapped non .eth names, the owner is the registry owner
  if (ethers.utils.hexStripZeros(registryOwner) !== '0x') {
    return {
      owner: registryOwner,
      ownershipLevel: 'registry',
    }
  }

  // for anything else, return null
  return null
}
