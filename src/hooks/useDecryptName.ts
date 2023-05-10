import { useMemo } from 'react'
import { useQuery } from 'wagmi'

import { checkIsDecrypted } from '@fildomains/fnsjs/utils/labels'

import { useFns } from '@app/utils/FnsProvider'
import { useQueryKeys } from '@app/utils/cacheKeyFactory'

const useDecryptName = (name: string, skip?: boolean) => {
  const { ready, getDecryptedName } = useFns()

  const nameIsEncrypted = useMemo(() => !checkIsDecrypted(name), [name])

  const {
    data: decryptedName,
    isLoading,
    status,
    isFetched,
    isFetchedAfterMount,
    // don't remove this line, it updates the isCachedData state (for some reason) but isn't needed to verify it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFetching,
  } = useQuery(
    useQueryKeys().decryptName(name),
    () => getDecryptedName(name, true).then((d) => d || null),
    {
      enabled: !!(!skip && ready && name && nameIsEncrypted),
    },
  )

  return {
    decryptedName,
    isLoading: !ready || isLoading,
    isCachedData: status === 'success' && isFetched && !isFetchedAfterMount,
  }
}

export default useDecryptName
