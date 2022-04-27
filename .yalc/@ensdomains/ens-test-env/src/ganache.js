#!/usr/bin/env node
import ganache from 'ganache'

export const main = async (config) => {
  const writeToStdout = process.stdout.write.bind(process.stdout)

  const outputsToIgnore = [
    'eth_getBlockByNumber',
    'eth_getBlockByHash',
    'eth_getTransactionReceipt',
  ]

  process.stdout.write = (chunk, ...args) => {
    if (
      typeof chunk === 'string' &&
      outputsToIgnore.reduce(
        (prev, curr) => prev || chunk.includes(curr),
        false,
      )
    ) {
      return
    }
    return writeToStdout(chunk, ...args)
  }

  const server = ganache.server({
    chain: {
      chainId: config.docker.chainId,
      networkId: config.docker.chainId,
    },
    fork: {
      url: config.docker.forkRpcUrl,
      blockNumber: config.archive.block,
    },
    wallet: {
      mnemonic: config.docker.secretWords,
      unlockedAccounts: config.docker.unlockedAccounts || [],
    },
    database: {
      dbPath: config.docker.dbPath,
    },
  })

  server.listen(8545, '0.0.0.0', (err) => {
    if (err) throw new Error(err.message)

    console.log('Ganache listening on port 8545')
  })
}
