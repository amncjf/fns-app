import { BigNumber } from '@ethersproject/bignumber'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Spinner, Typography } from '@ensdomains/thorin'

import { NameTableFooter } from '@app/components/@molecules/NameTableFooter/NameTableFooter'
import { Card } from '@app/components/Card'
import { Outlink } from '@app/components/Outlink'
import { TabWrapper } from '@app/components/pages/profile/TabWrapper'
import { useChainName } from '@app/hooks/useChainName'
import { useFnsEarningsFromAddress } from '@app/hooks/useFnsEarningsFromAddress'
import { makeDisplay } from '@app/utils/currency'
import { makeEtherscanLink } from '@app/utils/utils'

import { formatFnsExpiry } from './FnsSection'
import { SectionContainer } from './Section'

const EmptyDetailContainer = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['4']};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
)

const TabWrapperWithButtons = styled(TabWrapper)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: flex-start;
    width: 100%;
    max-width: 100%;
    background: ${theme.colors.backgroundPrimary};
  `,
)

const TransactionContainer = styled(Card)(
  ({ theme, onClick }) => css`
    width: 100%;
    min-height: ${theme.space['18']};
    padding: ${theme.space['3']};
    flex-direction: row;
    justify-content: space-between;
    gap: ${theme.space['3']};
    flex-gap: ${theme.space['3']};
    border: none;
    border-bottom: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.none};

    ${onClick &&
    css`
      cursor: pointer;
    `}

    &:last-of-type {
      border: none;
    }
  `,
)

const InfoContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['2']};
  `,
)

const TransactionInfoContainer = styled.div(
  ({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: ${theme.space['1']};
    gap: ${theme.space['0.5']};
  `,
)

const StyledOutlink = styled(Outlink)<{ $error: boolean }>(
  ({ theme, $error }) =>
    $error &&
    css`
      > div {
        color: ${theme.colors.red};
      }
      color: ${theme.colors.red};
    `,
)

const FnsEarnings = ({ address }: { address: string | null | undefined }) => {
  const { t, i18n } = useTranslation('fnsToken')
  const router = useRouter()
  const chainName = useChainName()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    currentPage,
    isLoading: namesLoading,
    status: namesStatus,
    pageLength,
  } = useFnsEarningsFromAddress({
    address,
    page,
    resultsPerPage: pageSize,
  })

  useEffect(() => {
    setPage(1)
  }, [address])

  const loading = namesLoading || namesStatus === 'loading' || !router.isReady
  const timezoneOffset = new Date(0).getTimezoneOffset() * 60000

  if (address == null) {
    return <></>
  }

  return (
    <SectionContainer data-testid="transaction-section" title={t('fnsEarnings.title')} fill>
      <TabWrapperWithButtons>
        <div data-testid="names-list">
          {/* eslint-disable no-nested-ternary */}
          {loading ? (
            <EmptyDetailContainer>
              <Spinner color="accent" />
            </EmptyDetailContainer>
          ) : pageLength === 0 ? (
            <EmptyDetailContainer>{t('empty')}</EmptyDetailContainer>
          ) : currentPage ? (
            currentPage.map((earning, i) => {
              return (
                <TransactionContainer
                  data-testid={`transaction-${i}`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${earning.transactionID}-${i}`}
                >
                  <InfoContainer>
                    <TransactionInfoContainer>
                      <Typography fontVariant="small" weight="light">{`${t(
                        'fnsEarnings.earnings',
                      )}：${makeDisplay(BigNumber.from(earning.fns), 5, 'fns')}, ${makeDisplay(
                        BigNumber.from(earning.fns),
                        5,
                        'fns',
                      )}, ${makeDisplay(BigNumber.from(earning.fil), 5, 'fil')}`}</Typography>
                      <Typography fontVariant="small" weight="light">{`${t(
                        'fnsEarnings.time',
                      )}：${formatFnsExpiry(
                        earning.timestamp - timezoneOffset,
                        i18n.language,
                      )}`}</Typography>
                    </TransactionInfoContainer>
                  </InfoContainer>
                  <InfoContainer>
                    <TransactionInfoContainer>
                      <StyledOutlink
                        $error={false}
                        href={makeEtherscanLink(earning.transactionID, chainName)}
                        target="_blank"
                      >
                        {t('fnsEarnings.look')}
                      </StyledOutlink>
                    </TransactionInfoContainer>
                  </InfoContainer>
                </TransactionContainer>
              )
            })
          ) : null}
        </div>
        <NameTableFooter
          current={page}
          onChange={(value) => setPage(value)}
          total={pageLength}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </TabWrapperWithButtons>
    </SectionContainer>
  )
}

export default FnsEarnings
