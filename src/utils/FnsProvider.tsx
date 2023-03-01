import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useProvider } from 'wagmi'

import { FNS } from '@fildomains/fnsjs'
import type { ContractName } from '@fildomains/fnsjs/contracts/types'

const opts: ConstructorParameters<typeof FNS>[0] = {}

if (process.env.NEXT_PUBLIC_PROVIDER && process.env.NEXT_PUBLIC_DEPLOYMENT_ADDRESSES) {
  const deploymentAddresses = JSON.parse(process.env.NEXT_PUBLIC_DEPLOYMENT_ADDRESSES!) as Record<
    ContractName | 'ENSRegistry',
    string
  >
  opts.getContractAddress = () => (contractName) => deploymentAddresses[contractName]
}

if (process.env.NEXT_PUBLIC_GRAPH_URI) {
  opts.graphURI = process.env.NEXT_PUBLIC_GRAPH_URI
}

const defaultValue: FNS = new FNS(opts)

const FnsContext = createContext({ ...defaultValue, ready: false })

const FnsProvider = ({ children }: { children: React.ReactNode }) => {
  const provider = useProvider()
  const ensWithCurrentProvider = useMemo(() => defaultValue, [])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)
    ensWithCurrentProvider.setProvider(provider as any).then(() => setReady(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider])

  return (
    <FnsContext.Provider
      value={useMemo(() => ({ ...ensWithCurrentProvider, ready }), [ensWithCurrentProvider, ready])}
    >
      {children}
    </FnsContext.Provider>
  )
}

function useFns() {
  const context = useContext(FnsContext)
  return context
}
export { useFns, FnsProvider }
