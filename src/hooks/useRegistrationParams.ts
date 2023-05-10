import { ChildFuses } from '@fildomains/fnsjs'
import { BaseRegistrationParams } from '@fildomains/fnsjs/utils/registerHelpers'
import { useMemo } from 'react'

import { profileRecordsToRecordOptions } from '@app/components/pages/profile/[name]/registration/steps/Profile/profileRecordUtils'
import { RegistrationReducerDataItem } from '@app/components/pages/profile/[name]/registration/types'
import { yearsToSeconds } from '@app/utils/utils'

type Props = {
  useFns?: Boolean
  name: string
  owner: string
  registrationData: Pick<
    RegistrationReducerDataItem,
    'years' | 'resolver' | 'secret' | 'records' | 'clearRecords' | 'permissions' | 'reverseRecord'
  >
}

const useRegistrationParams = ({ useFns, name, owner, registrationData }: Props) => {
  const registrationParams: BaseRegistrationParams & { useFns?: Boolean; name: string } = useMemo(
    () => ({
      useFns,
      name,
      owner,
      duration: yearsToSeconds(registrationData.years),
      resolverAddress: registrationData.resolver,
      secret: registrationData.secret,
      records: profileRecordsToRecordOptions(
        registrationData.records,
        registrationData.clearRecords,
      ),
      fuses: {
        named: registrationData.permissions
          ? (Object.keys(registrationData.permissions).filter(
              (key) => !!registrationData.permissions?.[key as ChildFuses['fuse']],
            ) as ChildFuses['fuse'][])
          : [],
        unnamed: [],
      },
      reverseRecord: registrationData.reverseRecord,
    }),
    [useFns, owner, name, registrationData],
  )

  return registrationParams
}

export default useRegistrationParams
