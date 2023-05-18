import { BigNumber } from '@ethersproject/bignumber'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Button, Helper, Spinner, Typography, mq } from '@ensdomains/thorin'

import { Outlink } from '@app/components/Outlink'
import RecordItem from '@app/components/RecordItem'
import { useContractAddress } from '@app/hooks/useContractAddress'
import useCurrentBlockTimestamp from '@app/hooks/useCurrentBlockTimestamp'
import { useRouterWithHistory } from '@app/hooks/useRouterWithHistory'
import { useTransactionFlow } from '@app/transaction-flow/TransactionFlowProvider'
import { useFns } from '@app/utils/FnsProvider'
import { makeDisplay } from '@app/utils/currency'

import { SectionContainer } from './Section'

const EmptyDetailContainer = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['4']};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
)

const ItemWrapper = styled.div(
  ({ theme }) => css`
    width: ${theme.space.full};
    background-color: ${theme.colors.background};
  `,
)

const SectionHeader = styled.div<{ $hideBorder?: boolean }>(
  ({ theme, $hideBorder }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: ${theme.space['4']};
    width: ${theme.space.full};

    background-color: ${theme.colors.background};
    ${!$hideBorder &&
    css`
      border-bottom: 1px solid ${theme.colors.border};
    `}
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

const Card = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['3.5']};
    border-radius: ${theme.radii['3xLarge']};
    background-color: ${theme.colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: ${theme.space.full};
    gap: ${theme.space['4']};
    max-height: 75vh;
    overflow-y: auto;

    ${mq.sm.min(css`
      width: initial;
      min-width: ${theme.space['128']};
    `)}
  `,
)

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const formatFnsExpiry = (timestamp: number, language: string) => {
  let locales
  if (language === 'zh') {
    locales = 'zh-CN'
  } else if (language === 'en') {
    locales = 'en-GB'
  } else if (language === 'nl') {
    locales = 'nl-NL'
  } else if (language === 'de') {
    locales = 'de-DE'
  } else {
    locales = 'default'
  }

  const expiry = new Date(timestamp * 1000 + new Date(0).getTimezoneOffset() * 60000)
  return `${expiry.toLocaleDateString(locales, {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })} ${expiry.toLocaleTimeString(locales)}`
}

const getEarnings = async (fns: any, sundayAddress: string, address: string) => {
  const data = await fns.batch(
    fns.getFnsSupply.batch(),
    fns.getSundaySupply.batch(),
    fns.getFnsBalance.batch(address),
    fns.getSundayBalance.batch(address),
    fns.getShare.batch(0),
    fns.getEarnings.batch(address, 0),
    fns.getSundayPaused.batch(),
    fns.getBalance.batch(sundayAddress),
    fns.getFnsBalance.batch(sundayAddress),
  )

  const [
    fnsSupply,
    sundaySupply,
    fnsBalance,
    sundayBalance,
    share,
    earnings,
    paused,
    filBalance,
    sundayFnsBalance,
  ] = data || []

  if (share && !share.inited) {
    share.fns = sundayFnsBalance.sub(sundaySupply).div(64)
    share.fil = filBalance.div(64)
  }

  if (earnings && !earnings.inited && sundayBalance.gt(0)) {
    earnings.fns = share!.fns.mul(sundayBalance).div(sundaySupply)
    earnings.fil = share!.fil.mul(sundayBalance).div(sundaySupply)
  }

  const queryData = {
    fnsSupply,
    sundaySupply,
    sundayFnsBalance,
    fnsBalance,
    sundayBalance,
    share,
    earnings,
    paused,
    filBalance,
  }

  return queryData
}

export const FnsSection = ({
  name,
  address,
}: {
  name: string
  address: string | null | undefined
}) => {
  const { t, i18n } = useTranslation('fnsToken')
  const router = useRouterWithHistory()
  const fns = useFns()
  const sundayAddress = useContractAddress('Sunday')
  const currentBlockTimestamp = useCurrentBlockTimestamp()
  const [result, setResult] = useState<{
    fnsSupply: BigNumber
    sundaySupply: BigNumber
    sundayFnsBalance: BigNumber
    fnsBalance: BigNumber
    sundayBalance: BigNumber
    share: any
    earnings: any
    filBalance: BigNumber
    paused: boolean
  }>({
    fnsSupply: BigNumber.from(0),
    sundaySupply: BigNumber.from(0),
    sundayFnsBalance: BigNumber.from(0),
    fnsBalance: BigNumber.from(0),
    sundayBalance: BigNumber.from(0),
    share: null,
    earnings: null,
    filBalance: BigNumber.from(0),
    paused: true,
  })

  const {
    fnsSupply,
    sundaySupply,
    sundayFnsBalance,
    fnsBalance,
    sundayBalance,
    share,
    earnings,
    filBalance,
    paused,
  } = result

  useMemo(async () => {
    if (address) {
      const ret = await getEarnings(fns, sundayAddress, address)
      setResult(ret)
    }
  }, [name, currentBlockTimestamp, address, fns, sundayAddress])
  const { prepareDataInput } = useTransactionFlow()
  const showRevokePermissionsInput = prepareDataInput('FnsToken')

  const handleClick = (
    action: string,
    title: string,
    maxValue: BigNumber | undefined = undefined,
  ) => {
    showRevokePermissionsInput(`fns-token-${name}`, {
      maxValue,
      action,
      name,
      title,
    })
  }

  if (address == null) {
    return (
      <Container>
        <Card>
          <Helper type="error">{t('fns.helper')}</Helper>
          <div>
            <StyledOutlink $error={false} href="https://github.com/fildomains" target="_blank">
              {t('section.share.help')}
            </StyledOutlink>
          </div>
          <Button onClick={() => router.push(`/`)}>{t('fns.action')}</Button>
        </Card>
      </Container>
    )
  }

  if (earnings == null) {
    return (
      <EmptyDetailContainer>
        <Spinner color="accent" size="large" />
      </EmptyDetailContainer>
    )
  }

  const haveEarnings = !!earnings && earnings.fns.add(earnings.fil).gt(0)
  return (
    <SectionContainer
      title={t('section.name.title')}
      action={<RecordItem type="text" data-testid="wallet-address" value={name} />}
      fill={!!address}
    >
      <ItemWrapper data-testid="fns-section-1">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">
            {`${t('section.wallet.title')}：`}
          </Typography>
          <div>
            <RecordItem type="text" data-testid="wallet-address" value={address!} />
          </div>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-2">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">{`${t(
            'section.time.title',
          )}：${formatFnsExpiry(currentBlockTimestamp || 0, i18n.language)}`}</Typography>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-3">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">{`${t(
            'section.release.title',
          )}：${makeDisplay(fnsSupply, 5, 'fns')}`}</Typography>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">
            {`${t('section.pledge.total')}：${makeDisplay(sundaySupply, 5, 'fns')}`}
          </Typography>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-4">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">
            {`${t('section.pledge.title')}：${makeDisplay(
              sundayFnsBalance.sub(sundaySupply),
              5,
              'fns',
            )}, ${makeDisplay(filBalance, 5, 'fil')}`}
          </Typography>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-5">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">{`${
            share.inited ? t('section.share.already') : t('section.share.title')
          }：${makeDisplay(share.fns, 5, 'fns')}, ${makeDisplay(share.fil, 5, 'fil')}`}</Typography>
          <div>
            <StyledOutlink $error={false} href="https://github.com/fildomains" target="_blank">
              {t('section.share.help')}
            </StyledOutlink>
          </div>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-6">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">
            {`${
              earnings.inited ? t('section.earnings.already') : t('section.earnings.title')
            }：${makeDisplay(earnings.fns, 5, 'fns')}, ${makeDisplay(earnings.fil, 5, 'fil')}`}
          </Typography>
          {haveEarnings && (
            <div>
              <Button
                data-testid="primary-section-button"
                size="small"
                disabled={!paused || earnings.inited}
                onClick={() => handleClick('claimEarnings', t('section.earnings.button'))}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {!paused
                  ? `${t('section.notPaused')}:${t('section.earnings.button')}`
                  : earnings.inited
                  ? t('section.earnings.buttonAlready')
                  : t('section.earnings.button')}
              </Button>
            </div>
          )}
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-7">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">
            {`${t('section.fnsBalance.title')}：${makeDisplay(fnsBalance, 5, 'fns')}`}{' '}
          </Typography>
          <div>
            <Button
              data-testid="primary-section-button"
              size="small"
              disabled={paused}
              onClick={() => handleClick('pledge', t('section.fnsBalance.button'), fnsBalance)}
            >
              {paused
                ? `${t('section.paused')}:${t('section.fnsBalance.button')}`
                : t('section.fnsBalance.button')}
            </Button>
          </div>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="fns-section-8">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="large" color="text">
            {`${t('section.sundayBalance.title')}：${makeDisplay(sundayBalance, 5, 'fns')}`}{' '}
          </Typography>
          <div>
            <Button
              data-testid="primary-section-button"
              size="small"
              disabled={paused}
              onClick={() =>
                handleClick('withdrawal', t('section.sundayBalance.button'), sundayBalance)
              }
            >
              {paused
                ? `${t('section.paused')}:${t('section.sundayBalance.button')}`
                : t('section.sundayBalance.button')}
            </Button>
          </div>
        </SectionHeader>
      </ItemWrapper>
    </SectionContainer>
  )
}
