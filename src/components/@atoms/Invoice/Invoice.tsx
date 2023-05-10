import { BigNumber } from '@ethersproject/bignumber/lib/bignumber'
import styled, { css } from 'styled-components'

import { Colors, Skeleton } from '@ensdomains/thorin'

import { CurrencyDisplay } from '@app/types'

import { CurrencyText } from '../CurrencyText/CurrencyText'

const Container = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['4']};
    background: ${theme.colors.backgroundSecondary};
    display: flex;
    flex-direction: column;
    gap: ${theme.space['2']};
    width: 100%;
    border-radius: ${theme.space['2']};
  `,
)

const LineItem = styled.div<{ $color?: Colors }>(
  ({ theme, $color }) => css`
    display: flex;
    justify-content: space-between;
    line-height: ${theme.space['5']};
    color: ${$color ? theme.colors[$color] : theme.colors.textTertiary};
  `,
)

const Total = styled(LineItem)(
  ({ theme }) => css`
    color: ${theme.colors.text};
  `,
)

type InvoiceItem = {
  label: string
  value?: BigNumber
  color?: Colors
}

type Props = {
  items: InvoiceItem[]
  totalLabel: string
  unit?: CurrencyDisplay
}

export const Invoice = ({ totalLabel = 'Estimated total', unit = 'fil', items }: Props) => {
  const isFil = unit === 'fil'
  const total = !isFil
    ? items[0].value
    : items
        .map(({ value }) => value)
        .filter((x) => !!x)
        .reduce((a, b) => a!.add(b!), BigNumber.from(0))
  const filteredItems = items.map(({ value }) => value).filter((x) => !!x)
  const hasEmptyItems = filteredItems.length !== items.length

  return (
    <Container>
      {items.map(({ label, value, color }, inx) => (
        <LineItem data-testid={`invoice-item-${inx}`} $color={color} key={label}>
          <div>{label}</div>
          <Skeleton loading={!value}>
            <div data-testid={`invoice-item-${inx}-amount`}>
              <CurrencyText fil={value} currency={!isFil && inx > 0 ? 'fil' : unit} />
            </div>
          </Skeleton>
        </LineItem>
      ))}
      <Total>
        <div>{totalLabel}</div>
        <Skeleton loading={hasEmptyItems}>
          <div data-testid="invoice-total">
            {isFil ? (
              <CurrencyText fil={total} currency={unit} />
            ) : (
              <>
                <CurrencyText fil={total} currency={unit} />
                {'; '}
                <CurrencyText fil={items[1].value} currency="fil" />
              </>
            )}
          </div>
        </Skeleton>
      </Total>
    </Container>
  )
}
