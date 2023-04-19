import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Colors } from '@ensdomains/thorin'

import GasDisplay from '@app/components/@atoms/GasDisplay'
import { Invoice } from '@app/components/@atoms/Invoice/Invoice'
import { PaymentMethod } from '@app/components/pages/profile/[name]/registration/types'
import { useEstimateFullRegistration } from '@app/hooks/useEstimateRegistration'

const OptionBar = styled.div(
  () => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
)

const InvoiceContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: ${theme.space['2']};
    width: 100%;
  `,
)

type Props = ReturnType<typeof useEstimateFullRegistration>

const FullInvoice = ({
  paymentMethodChoice,
  years,
  totalYearlyFee,
  totalYearlyFeeFns,
  estimatedGasFee,
  hasPremium,
  premiumFee,
  premiumFeeFns,
  estimatedGasLoading,
  gasPrice,
}: Props) => {
  const { t } = useTranslation('register')

  const useFil = paymentMethodChoice === PaymentMethod.ethereum
  const currencyDisplay = useFil ? 'fil' : 'fns'

  const invoiceItems = useMemo(
    () => [
      {
        label: t('invoice.yearRegistration', { years }),
        value: useFil ? totalYearlyFee : totalYearlyFeeFns,
      },
      {
        label: t('invoice.estimatedNetworkFee'),
        value: estimatedGasFee,
      },
      ...(hasPremium
        ? [
            {
              label: t('invoice.temporaryPremium'),
              value: useFil ? premiumFee : premiumFeeFns,
              color: 'blue' as Colors,
            },
          ]
        : []),
    ],
    [
      t,
      years,
      totalYearlyFee,
      totalYearlyFeeFns,
      estimatedGasFee,
      hasPremium,
      premiumFee,
      premiumFeeFns,
      paymentMethodChoice,
    ],
  )

  if (estimatedGasLoading) return <InvoiceContainer />

  return (
    <InvoiceContainer>
      <OptionBar>
        <GasDisplay gasPrice={gasPrice} />
      </OptionBar>
      <Invoice items={invoiceItems} unit={currencyDisplay} totalLabel={t('invoice.total')} />
    </InvoiceContainer>
  )
}

export default FullInvoice
