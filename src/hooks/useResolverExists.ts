import { useQuery } from 'wagmi'

import { namehash } from '@fildomains/fnsjs/utils/normalise'

import { useFns } from '@app/utils/FnsProvider'

const query = `
  query getResolverExists($id: String!) {
    resolver(id: $id) {
      id
    }
  }
`

const useResolverExists = (name: string, address: string) => {
  const { ready, gqlInstance } = useFns()
  const { data, isLoading } = useQuery(
    ['graph', 'getResolverExists', name],
    async () => {
      const { resolver } = await gqlInstance.client.request(query, {
        id: `${address}-${namehash(name)}`,
      })
      return !!resolver
    },
    {
      enabled: ready && name !== '',
    },
  )

  return {
    data,
    isLoading,
  }
}

export default useResolverExists
