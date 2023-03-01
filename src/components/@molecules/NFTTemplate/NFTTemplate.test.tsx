import { cleanup, render, waitFor } from '@app/test-utils'

import NFTTemplate from './NFTTemplate'

describe('NFTTemplate', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render', async () => {
    const { getByText } = render(
      <NFTTemplate name="nick.fil" backgroundImage={undefined} isNormalised />,
    )
    expect(getByText('nick.fil')).toBeInTheDocument()
  })

  it('should render with background', async () => {
    const whiteBG =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg=='
    const { getByText, getByTestId } = render(
      <NFTTemplate name="validator.fil" backgroundImage={whiteBG} isNormalised />,
    )
    expect(getByText('validator.fil')).toBeInTheDocument()
    expect(getByTestId('nft-back-img')).toBeInTheDocument()
  })

  it('should render with subdomain', async () => {
    const { getByText } = render(
      <NFTTemplate name="itsasubdomain.khori.fil" backgroundImage={undefined} isNormalised />,
    )
    expect(getByText('itsasubdomain.')).toBeInTheDocument()
  })

  it('should render domain with more than 25 chars', async () => {
    const { getByText } = render(
      <NFTTemplate
        name="thisnameislongerthan25char.fil"
        backgroundImage={undefined}
        isNormalised
      />,
    )
    expect(getByText('thisnameislonge')).toBeInTheDocument()
    expect(getByText('rthan25char.fil')).toBeInTheDocument()
  })

  it('should use polyfill of Intl.Segmenter if browser does not support', async () => {
    ;(window.Intl.Segmenter as typeof Intl['Segmenter']) = undefined as any
    const { getByText } = render(
      <NFTTemplate name="alisha.fil" backgroundImage={undefined} isNormalised />,
    )
    await waitFor(() => expect(getByText('alisha.fil')).toBeInTheDocument())
    expect(getByText('alisha.fil')).toBeInTheDocument()
  })
})
