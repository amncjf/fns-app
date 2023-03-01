import { BigNumber } from '@ethersproject/bignumber/lib/bignumber'

import { useEthPrice } from '@app/hooks/useEthPrice'
import { CurrencyDisplay } from '@app/types'
import { makeDisplay } from '@app/utils/currency'

type Props = {
  fil?: BigNumber
  currency: CurrencyDisplay
}

export const CurrencyText = ({ fil, currency = 'fil' }: Props) => {
  const { data: ethPrice, loading } = useEthPrice()

  if (loading || !fil || !ethPrice) return null

  if (currency === 'fil') {
    return <>{makeDisplay(fil, 5, 'fil')}</>
  }
  return <>{makeDisplay(fil.mul(ethPrice).div(1e8), 2, currency, 18)}</>
}
