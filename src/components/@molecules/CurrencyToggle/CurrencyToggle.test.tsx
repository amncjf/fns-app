import { cleanup, render } from '@app/test-utils'

import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { lightTheme } from '@app/tokens'

import { CurrencyToggle } from './CurrencyToggle'

describe('<CurrencyToggle />', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <CurrencyToggle />
      </ThemeProvider>,
    )
  })
})
