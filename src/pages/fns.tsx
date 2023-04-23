import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'

import { FnsSection } from '@app/components/pages/fns/FnsSection'
import { WalletSection } from '@app/components/pages/profile/settings/WalletSection'
import { useFnsToken } from '@app/hooks/useFnsToken'
import { usePrimary } from '@app/hooks/usePrimary'
import { useProtectedRoute } from '@app/hooks/useProtectedRoute'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { Content } from '@app/layouts/Content'

const OtherWrapper = styled.div(
  ({ theme }) => css`
    grid-area: other;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: ${theme.space['3']};
    flex-gap: ${theme.space['3']};
  `,
)

export default function Page() {
  const { t } = useTranslation('fns')
  const { address, isConnecting, isReconnecting } = useAccount()
  const { name: mainName } = usePrimary(address!, !address)
  const router = useRouterWithHistory()
  const name = router.query.name as string

  const data = useFnsToken(!name || name.length === 0 ? mainName : name)
  useProtectedRoute('/', isConnecting || isReconnecting ? true : address)

  return (
    <Content singleColumnContent title={t('title')}>
      {{
        trailing: (
          <OtherWrapper>
            <WalletSection />
            {!!data.fnsSupply && <FnsSection data={data} />}
          </OtherWrapper>
        ),
      }}
    </Content>
  )
}
