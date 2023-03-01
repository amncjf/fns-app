import { fireEvent, mockFunction, render, screen, waitFor } from '@app/test-utils'

import { NamePill } from '@app/components/@molecules/NamePill'
import { useChainId } from '@app/hooks/useChainId'
import { useFns } from '@app/utils/FnsProvider'

import SelectPrimaryName from './SelectPrimaryName-flow'

jest.mock('@app/hooks/useChainId')
jest.mock('@app/utils/FnsProvider')
jest.mock('@app/components/@molecules/NamePill')

const mockUseChainId = mockFunction(useChainId)
const mockUseEns = mockFunction(useFns)
const mockNamePill = mockFunction(NamePill)

const mockComponent = ({ name }: { name: string }) => <div>{name}</div>

const mockRequest = jest.fn()

const mockRequestWithNames = () =>
  mockRequest.mockResolvedValue({
    domains: [
      {
        name: 'test.fil',
        id: '0x0',
      },
      {
        name: 'test2.fil',
        id: '0x1',
      },
      {
        name: 'test3.fil',
        id: '0x2',
      },
    ],
  })

const renderHelper = ({ existingPrimary }: { existingPrimary?: string }) =>
  render(
    <SelectPrimaryName
      data={{
        address: '0x0',
        existingPrimary: existingPrimary || null,
      }}
      dispatch={jest.fn()}
      onDismiss={jest.fn()}
    />,
  )

describe('SelectPrimaryName', () => {
  window.IntersectionObserver = jest.fn().mockReturnValue({
    observe: jest.fn(),
    disconnect: jest.fn(),
  })
  mockNamePill.mockImplementation(mockComponent as any)
  mockUseChainId.mockReturnValue(1)
  mockUseEns.mockReturnValue({
    gqlInstance: {
      gql: (str: string) => str,
      client: {
        request: mockRequest,
      },
    },
  })
  it('should show loading', async () => {
    mockRequest.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolve()
        }),
    )
    renderHelper({})
    await waitFor(() =>
      expect(screen.getByText('section.primary.input.loading')).toBeInTheDocument(),
    )
    mockRequest.mockClear()
  })
  it('should show no name message', async () => {
    mockRequest.mockResolvedValue({ domains: [] })
    render(
      <SelectPrimaryName
        data={{
          address: '0x0',
          existingPrimary: null,
        }}
        dispatch={jest.fn()}
        onDismiss={jest.fn()}
      />,
    )
    await waitFor(() =>
      expect(screen.getByText('section.primary.input.noNames')).toBeInTheDocument(),
    )
  })
  it('should show names', async () => {
    mockRequestWithNames()
    renderHelper({})
    await waitFor(() => {
      expect(screen.getByText('test.fil')).toBeInTheDocument()
      expect(screen.getByText('test2.fil')).toBeInTheDocument()
      expect(screen.getByText('test3.fil')).toBeInTheDocument()
    })
  })
  it('should only enable next button if name selected', async () => {
    mockRequestWithNames()
    renderHelper({})
    await waitFor(() => {
      expect(screen.getByText('test.fil')).toBeInTheDocument()
      expect(screen.getByText('test2.fil')).toBeInTheDocument()
      expect(screen.getByText('test3.fil')).toBeInTheDocument()
    })
    expect(screen.getByTestId('primary-next')).toBeDisabled()
    fireEvent.click(screen.getByText('test.fil'))
    expect(screen.getByTestId('primary-next')).not.toBeDisabled()
  })
  it('should filter out existing primary name for selection', async () => {
    mockRequestWithNames()
    renderHelper({ existingPrimary: 'test.fil' })
    await waitFor(() => {
      expect(screen.queryByText('test.fil')).not.toBeInTheDocument()
      expect(screen.getByText('test2.fil')).toBeInTheDocument()
      expect(screen.getByText('test3.fil')).toBeInTheDocument()
    })
  })
  it('should truncate encoded names', async () => {
    mockRequest.mockResolvedValue({
      domains: [
        {
          name: '[2fcba40a1a605acf57a88f10820dd7f474036e9c73660ce1bafdbb9004b92ded].fil',
          id: '0x0',
        },
      ],
    })
    renderHelper({})
    await waitFor(() => {
      expect(screen.getByText('[2fc...ded].fil')).toBeInTheDocument()
    })
  })
})
