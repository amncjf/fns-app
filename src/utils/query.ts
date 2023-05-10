import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { DefaultOptions, QueryClient } from '@tanstack/react-query'
import { ChainProviderFn, configureChains, createClient } from 'wagmi'
import { filecoin, filecoinCalibration, filecoinHyperspace, goerli, localhost } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { makePersistent } from '@app/utils/persist'

const providerArray: ChainProviderFn<
  | typeof filecoin
  | typeof filecoinHyperspace
  | typeof filecoinCalibration
  | typeof goerli
  | typeof localhost
>[] = []

if (process.env.NEXT_PUBLIC_PROVIDER) {
  // for local testing
  providerArray.push(
    jsonRpcProvider({
      rpc: () => ({ http: process.env.NEXT_PUBLIC_PROVIDER! }),
    }),
  )
} else {
  if (!process.env.NEXT_PUBLIC_IPFS) {
    // only use infura if we are not using IPFS
    // since we don't want to allow all domains to access infura
    providerArray.push(
      infuraProvider({
        apiKey: process.env.NEXT_PUBLIC_INFURA_KEY || 'cfa6ae2501cc4354a74e20432507317c',
      }),
    )
  }
  // fallback cloudflare gateway if infura is down or for IPFS
  providerArray.push(
    jsonRpcProvider({
      rpc: (c) => {
        if (c.network === 'hardhat' || c.network === 'localhost') {
          return {
            http: `http://localhost:8545`,
          }
        }
        if (c.network === 'filecoin-hyperspace') {
          return {
            http: `https://api.hyperspace.node.glif.io/rpc/v1`,
          }
        }
        if (c.network === 'filecoin-calibration') {
          return {
            http: `https://api.calibration.node.glif.io/rpc/v1`,
          }
        }

        return {
          http: `https://api.node.glif.io`,
        }
      },
    }),
  )
}

const { provider, chains } = configureChains(
  [filecoin, filecoinHyperspace, filecoinCalibration, goerli, localhost],
  providerArray,
)

const { connectors } = getDefaultWallets({
  appName: 'FNS',
  chains,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  queryClient,
  persister: null,
})

makePersistent(queryClient)

export const refetchOptions: DefaultOptions<unknown> = {
  queries: {
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 120,
    meta: {
      isRefetchQuery: true,
    },
    refetchOnMount: 'always',
  },
}

const queryClientWithRefetch = new QueryClient({
  queryCache: queryClient.getQueryCache(),
  defaultOptions: refetchOptions,
  mutationCache: queryClient.getMutationCache(),
})

const wagmiClientWithRefetch = createClient({
  autoConnect: true,
  connectors,
  provider,
  queryClient: queryClientWithRefetch,
  persister: null,
})

export { queryClient, wagmiClient, chains, wagmiClientWithRefetch }
