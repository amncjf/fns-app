import { mockFunction, render, screen } from '@app/test-utils'

import { BigNumber } from '@ethersproject/bignumber/lib/bignumber'

import { useEthPrice } from '@app/hooks/useEthPrice'

import { CurrencyText } from './CurrencyText'

jest.mock('@app/hooks/useEthPrice')

const mockUseEthPrice = mockFunction(useEthPrice)
mockUseEthPrice.mockReturnValue({ data: 1e8, loading: false })

describe('CurrencyText', () => {
  it('should render correctly', async () => {
    render(<CurrencyText fil={BigNumber.from('4000000000000000000')} currency="fil" />)

    expect(
      screen.getByText(
        new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'fil',
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
          currencyDisplay: 'name',
        }).format(4),
      ),
    ).toBeVisible()
  })

  it('should append extra decimal to usd if it does not exist', async () => {
    render(<CurrencyText fil={BigNumber.from('4000000000000000000')} currency="usd" />)
    expect(screen.getByText('$4.00')).toBeVisible()
  })

  it('should cut off at ETH at 4 decimals', async () => {
    render(<CurrencyText fil={BigNumber.from('4444444444444444444')} currency="fil" />)

    expect(
      screen.getByText(
        new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'fil',
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
          currencyDisplay: 'name',
        }).format(4.4444),
      ),
    ).toBeVisible()
  })
})
