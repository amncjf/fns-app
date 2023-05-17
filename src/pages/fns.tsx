import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'

import FnsEarnings from '@app/components/pages/fns/FnsEarnings'
import { FnsSection } from '@app/components/pages/fns/FnsSection'
import { useExists } from '@app/hooks/useExists'
import { usePrimary } from '@app/hooks/usePrimary'
import { useProtectedRoute } from '@app/hooks/useProtectedRoute'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { Content } from '@app/layouts/Content'
import { ContentGrid } from '@app/layouts/ContentGrid'

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
  const { t } = useTranslation('fnsToken')
  const { address, isConnecting, isReconnecting } = useAccount()
  const { name: mainName } = usePrimary(address!, !address)
  const router = useRouterWithHistory()
  const name = (router.query.name ? router.query.name : mainName) as string
  const { owner } = useExists(name)

  useProtectedRoute('/', isConnecting || isReconnecting ? true : address)

  return (
    <Content singleColumnContent title={t('fns.title')}>
      {{
        leading: null,
        trailing: (
          <OtherWrapper>
            <FnsSection name={name} address={owner} />
            <FnsEarnings address={owner} />
          </OtherWrapper>
        ),
      }}
    </Content>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ContentGrid>{page}</ContentGrid>
}
