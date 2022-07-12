import { ethers } from 'ethers'
import { ENS } from '..'
import setup from '../tests/setup'
import { namehash } from '../utils/normalise'

let ENSInstance: ENS
let revert: Awaited<ReturnType<typeof setup>>['revert']
let createSnapshot: Awaited<ReturnType<typeof setup>>['createSnapshot']
let provider: ethers.providers.JsonRpcProvider
let accounts: string[]

beforeAll(async () => {
  ;({ ENSInstance, revert, createSnapshot, provider } = await setup())
  accounts = await provider.listAccounts()
})

afterAll(async () => {
  await revert()
})

describe('createSubname', () => {
  beforeEach(async () => {
    await revert()
  })
  it('should allow creating a subname on the registry', async () => {
    const tx = await ENSInstance.createSubname('test.parthtejpal.eth', {
      contract: 'registry',
      owner: accounts[0],
      addressOrIndex: 0,
    })
    expect(tx).toBeTruthy()
    await tx.wait()

    const registry = await ENSInstance.contracts!.getRegistry()!
    const result = await registry.owner(namehash('test.parthtejpal.eth'))
    expect(result).toBe(accounts[0])
  })
  it('should allow creating a subname on the namewrapper', async () => {
    const wrapNameTx = await ENSInstance.wrapName('parthtejpal.eth', {
      wrappedOwner: accounts[0],
    })
    await wrapNameTx.wait()
    const tx = await ENSInstance.createSubname('test.parthtejpal.eth', {
      contract: 'nameWrapper',
      owner: accounts[0],
      addressOrIndex: 0,
    })
    expect(tx).toBeTruthy()
    await tx.wait()

    const nameWrapper = await ENSInstance.contracts!.getNameWrapper()!
    const result = await nameWrapper.ownerOf(namehash('test.parthtejpal.eth'))
    expect(result).toBe(accounts[0])
  })
})
