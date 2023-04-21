import { BigNumber } from '@ethersproject/bignumber'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Button, Typography } from '@ensdomains/thorin'

import RecordItem from '@app/components/RecordItem'
import { useTransactionFlow } from '@app/transaction-flow/TransactionFlowProvider'
import { makeDisplay } from '@app/utils/currency'

import { SectionContainer } from './Section'

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

const formatFnsExpiry = (timestamp: number, language: string) => {
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

export const FnsSection = ({ data }: { data: any }) => {
  const { t, i18n } = useTranslation('fnsToken')
  const {
    name,
    address,
    fnsSupply,
    sundaySupply,
    fnsBalance,
    sundayBalance,
    share,
    earnings,
    filBalance,
    paused,
    timestamp,
  } = data
  const { showDataInput } = useTransactionFlow()
  const handleClick = (
    action: string,
    title: string,
    maxValue: BigNumber | undefined = undefined,
  ) => {
    showDataInput(`fns-token-edit`, 'EditFnsToken', {
      maxValue,
      action,
      name,
      title,
    })
  }

  const haveEarnings = earnings.fns.add(earnings.fil).gt(0)
  return (
    <SectionContainer
      title={t('section.name.title')}
      action={<RecordItem type="text" data-testid="wallet-address" value={name} />}
      fill={!!address}
    >
      <ItemWrapper data-testid="primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="small" color="text">
            {`${t('section.wallet.title')}：`}
          </Typography>
          <div>
            <RecordItem type="text" data-testid="wallet-address" value={address!} />
          </div>
        </SectionHeader>
      </ItemWrapper>
      {!!timestamp && (
        <ItemWrapper data-testid="primary-wrapper">
          <SectionHeader $hideBorder={false}>
            <Typography fontVariant="small" color="text">{`${t(
              'section.time.title',
            )}：${formatFnsExpiry(timestamp.toNumber(), i18n.language)}`}</Typography>
          </SectionHeader>
        </ItemWrapper>
      )}
      <ItemWrapper data-testid="primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="small" color="text">{`${t(
            'section.release.title',
          )}：${makeDisplay(fnsSupply, 5, 'fns')}`}</Typography>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="small" color="text">
            {`${t('section.pledge.title')}：${makeDisplay(sundaySupply, 5, 'fns')}, ${makeDisplay(
              filBalance,
              5,
              'fil',
            )}`}
          </Typography>
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="small" color="text">{`${
            share.inited ? t('section.share.already') : t('section.share.title')
          }：${makeDisplay(share.fns, 5, 'fns')}, ${makeDisplay(share.fil, 5, 'fil')}`}</Typography>
          {sundaySupply.gt(0) && (
            <div>
              {!share.inited && paused && (
                <Button
                  data-testid="primary-section-button"
                  size="small"
                  onClick={() => handleClick('initShare', t('section.share.button'))}
                >
                  {t('section.share.button')}
                </Button>
              )}
            </div>
          )}
        </SectionHeader>
      </ItemWrapper>
      <ItemWrapper data-testid="primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="small" color="text">
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
      <ItemWrapper data-testid="primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="small" color="text">
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
      <ItemWrapper data-testid="primary-wrapper">
        <SectionHeader $hideBorder={false}>
          <Typography fontVariant="small" color="text">
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
