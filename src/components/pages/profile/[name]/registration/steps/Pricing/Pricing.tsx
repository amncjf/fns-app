import type { BigNumber } from 'ethers'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import usePrevious from 'react-use/lib/usePrevious'
import styled, { css } from 'styled-components'
import { useBalance } from 'wagmi'

import {
  Button,
  Field,
  Heading,
  Helper,
  RadioButton,
  RadioButtonGroup,
  Toggle,
  Typography,
  mq,
} from '@ensdomains/thorin'

import MobileFullWidth from '@app/components/@atoms/MobileFullWidth'
import { PlusMinusControl } from '@app/components/@atoms/PlusMinusControl/PlusMinusControl'
import { RegistrationTimeComparisonBanner } from '@app/components/@atoms/RegistrationTimeComparisonBanner/RegistrationTimeComparisonBanner'
import { Spacer } from '@app/components/@atoms/Spacer'
import { Card } from '@app/components/Card'
import { ConnectButton } from '@app/components/ConnectButton'
import { useAccountSafely } from '@app/hooks/useAccountSafely'
import { useContractAddress } from '@app/hooks/useContractAddress'
import { useEstimateFullRegistration } from '@app/hooks/useEstimateRegistration'
import { useNameDetails } from '@app/hooks/useNameDetails'
import { useBreakpoint } from '@app/utils/BreakpointProvider'

import FullInvoice from '../../FullInvoice'
import {
  MoonpayTransactionStatus,
  PaymentMethod,
  RegistrationReducerDataItem,
  RegistrationStepData,
} from '../../types'
import { useMoonpayRegistration } from '../../useMoonpayRegistration'
import TemporaryPremium from './TemporaryPremium'

const StyledCard = styled(Card)(
  ({ theme }) => css`
    max-width: 780px;
    margin: 0 auto;
    flex-direction: column;
    gap: ${theme.space['4']};
    padding: ${theme.space['4']};

    ${mq.sm.min(css`
      padding: ${theme.space['6']} ${theme.space['18']};
      gap: ${theme.space['6']};
    `)}
  `,
)

const OutlinedContainer = styled.div(
  ({ theme }) => css`
    width: ${theme.space.full};
    display: grid;
    align-items: center;
    grid-template-areas: 'title checkbox' 'description description';
    gap: ${theme.space['2']};

    padding: ${theme.space['4']};
    border-radius: ${theme.radii.large};
    background: ${theme.colors.backgroundSecondary};

    ${mq.sm.min(css`
      grid-template-areas: 'title checkbox' 'description checkbox';
    `)}
  `,
)

const StyledHeading = styled(Heading)(
  () => css`
    width: 100%;
    word-break: break-all;

    @supports (overflow-wrap: anywhere) {
      overflow-wrap: anywhere;
      word-break: normal;
    }
  `,
)

const gridAreaStyle = ({ $name }: { $name: string }) => css`
  grid-area: ${$name};
`

const PaymentChoiceContainer = styled.div`
  width: 100%;
`

const StyledRadioButtonGroup = styled(RadioButtonGroup)(
  ({ theme }) => css`
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.large};
    gap: 0;
  `,
)

const StyledRadioButton = styled(RadioButton)``

const RadioButtonContainer = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['4']};
    &:last-child {
      border-top: 1px solid ${theme.colors.border};
    }
  `,
)

const ButtonContainer = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['2']};
    &:last-child {
      border-top: 1px solid ${theme.colors.border};
    }
  `,
)

const StyledTitle = styled(Typography)`
  margin-left: 15px;
`

const RadioLabel = styled(Typography)(
  ({ theme }) => css`
    margin-right: 10px;
    color: ${theme.colors.text};
  `,
)

const CheckboxWrapper = styled.div(
  () => css`
    width: 100%;
  `,
  gridAreaStyle,
)

const OutlinedContainerDescription = styled(Typography)(gridAreaStyle)

const OutlinedContainerTitle = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.large};
    font-weight: ${theme.fontWeights.bold};
    white-space: nowrap;
  `,
  gridAreaStyle,
)

const PaymentChoice = ({
  paymentMethodChoice,
  setPaymentMethodChoice,
  hasEnoughEth,
  hasEnoughFns,
  hasPendingMoonpayTransaction,
  address,
  breakpoints,
  reverseRecord,
  setReverseRecord,
}: {
  paymentMethodChoice: PaymentMethod | ''
  setPaymentMethodChoice: Dispatch<SetStateAction<PaymentMethod | ''>>
  hasEnoughEth: boolean
  hasEnoughFns: boolean
  hasPendingMoonpayTransaction: boolean
  address?: string
  breakpoints: ReturnType<typeof useBreakpoint>
  reverseRecord: boolean
  setReverseRecord: (reverseRecord: boolean) => void
}) => {
  const { t } = useTranslation('register')
  const hasEnough = paymentMethodChoice === PaymentMethod.ethereum ? hasEnoughEth : hasEnoughFns

  return (
    <PaymentChoiceContainer>
      <StyledTitle color="textTertiary" weight="bold">
        {t('steps.info.paymentMethod')}
      </StyledTitle>
      <Spacer $height="2" />
      <StyledRadioButtonGroup
        value={paymentMethodChoice}
        onChange={(e) => setPaymentMethodChoice(e.target.value as PaymentMethod)}
      >
        <RadioButtonContainer>
          <ButtonContainer>
            <StyledRadioButton
              data-testid="payment-choice-ethereum"
              label={<RadioLabel>{t('steps.info.ethereum')}</RadioLabel>}
              name="RadioButtonGroup"
              value={PaymentMethod.ethereum}
              disabled={hasPendingMoonpayTransaction}
              checked={paymentMethodChoice === PaymentMethod.ethereum || undefined}
            />
          </ButtonContainer>
          <ButtonContainer>
            <StyledRadioButton
              label={<RadioLabel>{t('steps.info.fns')}</RadioLabel>}
              name="RadioButtonGroup"
              value={PaymentMethod.fns}
              checked={paymentMethodChoice === PaymentMethod.fns || undefined}
            />
          </ButtonContainer>
          {!hasEnough && (
            <>
              <Spacer $height="4" />
              <Helper type="warning" alignment="horizontal">
                {paymentMethodChoice === PaymentMethod.ethereum
                  ? t('steps.info.notEnoughEth')
                  : t('steps.info.notEnoughFns')}
              </Helper>
              <Spacer $height="2" />
            </>
          )}
          {hasEnough && (
            <>
              <Spacer $height="4" />
              <OutlinedContainer>
                <OutlinedContainerTitle $name="title">
                  {t('steps.pricing.primaryName')}
                </OutlinedContainerTitle>
                <CheckboxWrapper $name="checkbox">
                  <Field
                    hideLabel
                    label={t('steps.pricing.primaryName')}
                    inline
                    reverse
                    disabled={!address}
                  >
                    {(ids) => (
                      <Toggle
                        {...ids?.content}
                        disabled={!address}
                        size={breakpoints.sm ? 'large' : 'medium'}
                        checked={reverseRecord}
                        onChange={(e) => {
                          e.stopPropagation()
                          setReverseRecord(e.target.checked)
                        }}
                        data-testid="primary-name-toggle"
                      />
                    )}
                  </Field>
                </CheckboxWrapper>
                <OutlinedContainerDescription $name="description">
                  {t('steps.pricing.primaryNameMessage')}
                </OutlinedContainerDescription>
              </OutlinedContainer>
              <Spacer $height="2" />
            </>
          )}
        </RadioButtonContainer>
      </StyledRadioButtonGroup>
    </PaymentChoiceContainer>
  )
}

interface ActionButtonProps {
  address?: string
  hasPendingMoonpayTransaction: boolean
  hasFailedMoonpayTransaction: boolean
  paymentMethodChoice: PaymentMethod | ''
  reverseRecord: boolean
  callback: (props: RegistrationStepData['pricing']) => void
  initiateMoonpayRegistrationMutation: ReturnType<
    typeof useMoonpayRegistration
  >['initiateMoonpayRegistrationMutation']
  years: number
  balance: ReturnType<typeof useBalance>['data']
  totalRequiredBalance?: BigNumber
}

export const ActionButton = ({
  address,
  hasPendingMoonpayTransaction,
  hasFailedMoonpayTransaction,
  paymentMethodChoice,
  reverseRecord,
  callback,
  initiateMoonpayRegistrationMutation,
  years,
  balance,
  totalRequiredBalance,
}: ActionButtonProps) => {
  const { t } = useTranslation('register')

  if (!address) {
    return <ConnectButton large />
  }
  if (hasPendingMoonpayTransaction) {
    return (
      <Button data-testid="next-button" disabled loading>
        {t('steps.info.processing')}
      </Button>
    )
  }
  if (hasFailedMoonpayTransaction && paymentMethodChoice === PaymentMethod.moonpay) {
    return (
      <Button
        data-testid="next-button"
        onClick={() => callback({ reverseRecord, years, paymentMethodChoice })}
      >
        {t('action.tryAgain', { ns: 'common' })}
      </Button>
    )
  }
  if (paymentMethodChoice === PaymentMethod.moonpay) {
    return (
      <Button
        loading={initiateMoonpayRegistrationMutation.isLoading}
        data-testid="next-button"
        onClick={() => callback({ reverseRecord, years, paymentMethodChoice })}
        disabled={!paymentMethodChoice || initiateMoonpayRegistrationMutation.isLoading}
      >
        {t('action.next', { ns: 'common' })}
      </Button>
    )
  }
  if (!balance?.value || !totalRequiredBalance) {
    return (
      <Button data-testid="next-button" disabled>
        {t('loading', { ns: 'common' })}
      </Button>
    )
  }
  if (balance?.value.lt(totalRequiredBalance) && paymentMethodChoice === PaymentMethod.ethereum) {
    return (
      <Button data-testid="next-button" disabled>
        {t('steps.pricing.insufficientBalance')}
      </Button>
    )
  }
  return (
    <Button
      data-testid="next-button"
      onClick={() => callback({ reverseRecord, years, paymentMethodChoice })}
      disabled={!paymentMethodChoice}
    >
      {t('action.next', { ns: 'common' })}
    </Button>
  )
}

type Props = {
  nameDetails: ReturnType<typeof useNameDetails>
  resolverExists: boolean | undefined
  callback: (props: RegistrationStepData['pricing']) => void
  hasPrimaryName: boolean
  registrationData: RegistrationReducerDataItem
  moonpayTransactionStatus?: MoonpayTransactionStatus
  initiateMoonpayRegistrationMutation: ReturnType<
    typeof useMoonpayRegistration
  >['initiateMoonpayRegistrationMutation']
}

const Pricing = ({
  nameDetails,
  callback,
  hasPrimaryName,
  registrationData,
  resolverExists,
  moonpayTransactionStatus,
  initiateMoonpayRegistrationMutation,
}: Props) => {
  const { t } = useTranslation('register')

  const breakpoints = useBreakpoint()
  const { normalisedName, gracePeriodEndDate } = nameDetails

  const { address } = useAccountSafely()
  const { data: balance } = useBalance({ address: address as `0x${string}` | undefined })
  const resolverAddress = useContractAddress('PublicResolver')

  const [years, setYears] = useState(registrationData.years)
  const [reverseRecord, setReverseRecord] = useState(
    registrationData.reverseRecord || !hasPrimaryName,
  )

  const hasPendingMoonpayTransaction = moonpayTransactionStatus === 'pending'
  const hasFailedMoonpayTransaction = moonpayTransactionStatus === 'failed'

  const previousMoonpayTransactionStatus = usePrevious(moonpayTransactionStatus)

  const [paymentMethodChoice, setPaymentMethodChoice] = useState<PaymentMethod | ''>(
    hasPendingMoonpayTransaction ? PaymentMethod.moonpay : '',
  )

  // Keep radio button choice up to date
  useEffect(() => {
    if (moonpayTransactionStatus) {
      setPaymentMethodChoice(
        hasPendingMoonpayTransaction || hasFailedMoonpayTransaction ? PaymentMethod.moonpay : '',
      )
    }
  }, [
    hasFailedMoonpayTransaction,
    hasPendingMoonpayTransaction,
    moonpayTransactionStatus,
    previousMoonpayTransactionStatus,
    setPaymentMethodChoice,
  ])

  const fullEstimate = useEstimateFullRegistration({
    registration: {
      records: [{ key: 'FIL', value: resolverAddress, type: 'addr', group: 'address' }],
      clearRecords: resolverExists,
      resolver: resolverAddress,
      reverseRecord,
      years,
    },
    price: nameDetails.priceData,
  })
  const { hasPremium, premiumFee, gasPrice, yearlyFee, totalYearlyFee, estimatedGasFee } =
    fullEstimate

  const yearlyRequiredBalance = totalYearlyFee?.mul(110).div(100)
  const totalRequiredBalance = yearlyRequiredBalance?.add(premiumFee || 0).add(estimatedGasFee || 0)

  return (
    <StyledCard>
      <StyledHeading>{t('heading', { name: normalisedName })}</StyledHeading>
      <PlusMinusControl
        minValue={1}
        value={years}
        onChange={(e) => {
          const newYears = parseInt(e.target.value)
          if (!Number.isNaN(newYears)) setYears(newYears)
        }}
        highlighted
      />
      <FullInvoice {...fullEstimate} />
      {hasPremium && gracePeriodEndDate ? (
        <TemporaryPremium startDate={gracePeriodEndDate} name={normalisedName} />
      ) : (
        yearlyFee &&
        estimatedGasFee &&
        gasPrice && (
          <RegistrationTimeComparisonBanner
            rentFee={yearlyFee}
            transactionFee={estimatedGasFee}
            message={t('steps.pricing.multipleYearsMessage')}
          />
        )
      )}
      <PaymentChoice
        {...{
          paymentMethodChoice,
          setPaymentMethodChoice,
          address,
          breakpoints,
          reverseRecord,
          setReverseRecord,
          hasEnoughEth: true,
          hasEnoughFns: true,
          hasPendingMoonpayTransaction,
          hasFailedMoonpayTransaction,
        }}
      />
      <MobileFullWidth>
        <ActionButton
          {...{
            address,
            hasPendingMoonpayTransaction,
            hasFailedMoonpayTransaction,
            paymentMethodChoice,
            reverseRecord,
            callback,
            initiateMoonpayRegistrationMutation,
            years,
            balance,
            totalRequiredBalance,
          }}
        />
      </MobileFullWidth>
    </StyledCard>
  )
}

export default Pricing
