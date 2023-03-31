import { mockFunction, render, screen } from '@app/test-utils'

import { act, waitFor } from '@testing-library/react'

import { useChainId } from '@app/hooks/useChainId'
import { useLocalStorage } from '@app/hooks/useLocalStorage'
import { useBreakpoint } from '@app/utils/BreakpointProvider'

import { SearchInput } from './SearchInput'

jest.mock('@app/utils/BreakpointProvider')
jest.mock('@app/hooks/useLocalStorage')
jest.mock('@app/hooks/useChainId')

const mockUseBreakpoint = mockFunction(useBreakpoint)
const mockUseLocalStorage = mockFunction(useLocalStorage)
const mockUseChainId = mockFunction(useChainId)

window.scroll = jest.fn()

describe('SearchInput', () => {
  mockUseLocalStorage.mockReturnValue([[]])
  mockUseChainId.mockReturnValue(1)
  window.ResizeObserver = jest.fn()
  ;(window.ResizeObserver as jest.Mock).mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }))

  it('should render on desktop layouts', () => {
    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: true,
      md: true,
      lg: false,
      xl: false,
    })
    render(<SearchInput />)
    expect(screen.getByTestId('search-input-desktop')).toBeVisible()
  })
  it('should render on mobile layouts', () => {
    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    })
    render(<SearchInput />)
    expect(screen.getByTestId('search-input-mobile')).toBeVisible()
  })
  it('should show a popup with backdrop when clicked on mobile', async () => {
    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    })
    render(<SearchInput />)

    act(() => {
      screen.getByTestId('search-input-box-fake').click()
    })

    await waitFor(() => screen.getByTestId('search-input-backdrop'), {
      timeout: 500,
    }).then((el) => expect(el).toBeVisible())
  })
  it('should show info text on click', async () => {
    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: true,
      md: true,
      lg: false,
      xl: false,
    })
    render(<SearchInput />)
    act(() => {
      screen.getByTestId('search-input-box').focus()
    })
    await waitFor(() => screen.getByTestId('search-input-results'), {
      timeout: 500,
    }).then((el) => expect(el).toHaveTextContent('search.emptyText'))
    expect(screen.getByTestId('search-input-box')).not.toHaveTextContent('Search for a name')
  })
  it('should show history items if available', async () => {
    mockUseLocalStorage.mockReturnValue([
      [
        {
          type: 'name',
          value: 'nick.fil',
        },
        {
          type: 'address',
          value: '0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9',
        },
        {
          type: 'name',
          value: 'test.fil',
        },
      ],
    ])
    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: true,
      md: true,
      lg: false,
      xl: false,
    })
    render(<SearchInput />)
    act(() => {
      screen.getByTestId('search-input-box').focus()
    })
    await waitFor(() => screen.getByTestId('search-input-results'), {
      timeout: 500,
    })

    expect(screen.getByText('nick.fil')).toBeInTheDocument()
    expect(screen.getByText('0xb6E040...d28cd9')).toBeInTheDocument()
    expect(screen.getByText('test.fil')).toBeInTheDocument()
  })
  it('should show history items in correct order', async () => {
    mockUseLocalStorage.mockReturnValue([
      [
        {
          type: 'name',
          value: 'nick.fil',
          lastAccessed: 1,
        },
        {
          type: 'address',
          value: '0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9',
          lastAccessed: 3,
        },
        {
          type: 'name',
          value: 'test.fil',
          lastAccessed: 2,
        },
      ],
    ])
    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: true,
      md: true,
      lg: false,
      xl: false,
    })
    render(<SearchInput />)
    act(() => {
      screen.getByTestId('search-input-box').focus()
    })
    const container = await waitFor(() => screen.getByTestId('search-input-results'), {
      timeout: 500,
    })

    expect(container.children[0]).toHaveTextContent('0xb6E040...d28cd9')
    expect(container.children[1]).toHaveTextContent('test.fil')
    expect(container.children[2]).toHaveTextContent('nick.fil')
  })
  it('should show a maximum of 5 history items', async () => {
    mockUseLocalStorage.mockReturnValue([
      [
        {
          type: 'name',
          value: 'nick.fil',
        },
        {
          type: 'address',
          value: '0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9',
        },
        {
          type: 'name',
          value: 'test.fil',
        },
        {
          type: 'name',
          value: 'test1.fil',
        },
        {
          type: 'name',
          value: 'test2.fil',
        },
        {
          type: 'name',
          value: 'test3.fil',
        },
      ],
    ])
    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: true,
      md: true,
      lg: false,
      xl: false,
    })
    render(<SearchInput />)
    act(() => {
      screen.getByTestId('search-input-box').focus()
    })
    await waitFor(() => screen.getByTestId('search-input-results'), {
      timeout: 500,
    })

    expect(screen.getByText('test2.fil')).toBeInTheDocument()
    expect(screen.queryByText('test3.fil')).not.toBeInTheDocument()
  })
})
