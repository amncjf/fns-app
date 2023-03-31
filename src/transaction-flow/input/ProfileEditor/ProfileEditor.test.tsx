/* eslint-disable no-await-in-loop */
import {
  cleanup,
  fireEvent,
  mockFunction,
  render,
  screen,
  userEvent,
  waitFor,
} from '@app/test-utils'

import { useNetwork } from 'wagmi'

import { useBasicName } from '@app/hooks/useBasicName'
import { useChainId } from '@app/hooks/useChainId'
import { useContractAddress } from '@app/hooks/useContractAddress'
import { useNameDetails } from '@app/hooks/useNameDetails'
import { useResolverStatus } from '@app/hooks/useResolverStatus'
import { Profile } from '@app/types'
import { useBreakpoint } from '@app/utils/BreakpointProvider'

import ProfileEditor from './ProfileEditor-flow'

const appPackage = require('@app/../package.json')
const ensjsPackage = require('@app/../node_modules/@fildomains/fnsjs/package.json')

const mockProfileData = {
  profile: {
    address: '0x70643CB203137b9b9eE19deA56080CD2BA01dBFd',
    records: {
      contentHash: {},
      texts: [
        {
          key: 'email',
          type: 'text',
          value: 'test@fildomains.com',
        },
        {
          key: 'url',
          type: 'text',
          value: 'https://fildomains.com',
        },
        {
          key: 'avatar',
          type: 'text',
          value: 'https://example.xyz/avatar/test.jpg',
        },
        {
          key: 'com.discord',
          type: 'text',
          value: 'test#1234',
        },
        {
          key: 'com.reddit',
          type: 'text',
          value: 'https://www.reddit.com/user/test/',
        },
        {
          key: 'com.twitter',
          type: 'text',
          value: 'https://twitter.com/test',
        },
        {
          key: 'org.telegram',
          type: 'text',
          value: '@test',
        },
        {
          key: 'com.linkedin.com',
          type: 'text',
          value: 'https://www.linkedin.com/in/test/',
        },
        {
          key: 'xyz.lensfrens',
          type: 'text',
          value: 'https://www.lensfrens.xyz/test.lens',
        },
      ],
      coinTypes: [
        {
          key: '60',
          type: 'addr',
          coin: 'ETH',
          addr: '0xb794f5ea0ba39494ce839613fffba74279579268',
        },
        {
          key: '0',
          type: 'addr',
          coin: 'BTC',
          addr: '1JnJvEBykLcGHYxCZVWgDGDm7pkK3EBHwB',
        },
        {
          key: '3030',
          type: 'addr',
          coin: 'HBAR',
          addr: '0.0.123123',
        },
        {
          key: '501',
          type: 'addr',
          coin: 'SOL',
          addr: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
        },
      ],
    },
    resolverAddress: '0x0',
    isMigrated: true,
    createdAt: '1630553876',
  },
  isLoading: false,
  isWrapped: false,
}

jest.mock('@app/utils/BreakpointProvider')
jest.mock('@app/hooks/useNameDetails')
jest.mock('@app/utils/FnsProvider')
jest.mock('@app/transaction-flow/TransactionFlowProvider')
jest.mock('@app/hooks/useContractAddress')
jest.mock('@app/hooks/useResolverStatus')
jest.mock('wagmi')
jest.mock('@app/hooks/useChainId')
jest.mock('@app/hooks/useBasicName')

const mockUseBreakpoint = mockFunction(useBreakpoint)
const mockUseNameDetails = mockFunction(useNameDetails)
const mockUseContractAddress = mockFunction(useContractAddress)
const mockUseResolverStatus = mockFunction(useResolverStatus)
const mockUseNetwork = mockFunction(useNetwork)
const mockUseChainId = mockFunction(useChainId)
const mockUseBasicName = mockFunction(useBasicName)

const mockDispatch = jest.fn()

export function setupIntersectionObserverMock({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}): void {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = root

    readonly rootMargin: string = rootMargin

    readonly thresholds: ReadonlyArray<number> = thresholds

    disconnect: () => void = disconnect

    observe: (target: Element) => void = observe

    takeRecords: () => IntersectionObserverEntry[] = takeRecords

    unobserve: (target: Element) => void = unobserve
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
}

describe('ProfileEditor', () => {
  beforeEach(() => {
    mockUseNameDetails.mockReturnValue(
      mockProfileData as unknown as { profile: Profile; loading: boolean },
    )

    mockUseNetwork.mockReturnValue({ chain: { id: 1 } })

    mockUseBreakpoint.mockReturnValue({
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    })

    setupIntersectionObserverMock()
    window.scroll = jest.fn()

    mockUseContractAddress.mockReturnValue('0x0')

    mockUseResolverStatus.mockReturnValue({
      status: {
        hasResolver: true,
        hasLatestResolver: true,
        isMigratedProfileEqual: true,
        hasMigratedProfile: true,
      },
      loading: false,
    })
    mockUseChainId.mockReturnValue(1)
    mockUseBasicName.mockReturnValue({ isWrapped: false })
  })

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('should have use the same version of address-encoder as ensjs', () => {
    expect(appPackage.dependencies['address-encoder']).toEqual(
      ensjsPackage.dependencies['address-encoder'],
    )
  })

  it('should render', async () => {
    render(
      <ProfileEditor data={{ name: 'test.fil' }} dispatch={mockDispatch} onDismiss={() => {}} />,
    )
    await waitFor(() => {
      expect(screen.getByTestId('profile-editor')).toBeVisible()
    })
  })
})

describe('ProfileEditor with old resolver', () => {
  beforeEach(() => {
    mockUseNameDetails.mockReturnValue(
      mockProfileData as unknown as { profile: Profile; loading: boolean },
    )

    mockUseContractAddress.mockReturnValue('0x123')

    mockUseResolverStatus.mockReturnValue({
      status: {
        hasResolver: true,
        hasLatestResolver: false,
        isMigratedProfileEqual: true,
        hasMigratedProfile: true,
      },
      loading: false,
    })

    mockUseNetwork.mockReturnValue({ chain: { id: 1 } })
    mockUseChainId.mockReturnValue(1)
    mockUseBasicName.mockReturnValue({ isWrapped: false })
  })

  it('should submit to key value to alternative dispatch if resolver address is not current', async () => {
    render(
      <ProfileEditor data={{ name: 'test.fil' }} dispatch={mockDispatch} onDismiss={() => {}} />,
    )

    await userEvent.click(screen.getByTestId('dismiss-dialog-button'))
    await userEvent.click(screen.getByTestId('show-add-profile-records-modal-button'))
    await userEvent.click(screen.getByTestId('profile-record-option-DOT'))
    await userEvent.click(screen.getByTestId('add-profile-records-button'))
    await userEvent.type(
      screen.getByTestId('profile-record-input-input-DOT'),
      '5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX',
    )

    const submitButton = screen.getByTestId('profile-submit-button')
    await waitFor(() => {
      expect(submitButton).not.toHaveAttribute('disabled')
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockDispatch.mock.calls[0][0].name).toBe('startFlow')
      expect(
        mockDispatch.mock.calls[0][0].payload.transactions[0].data.records.find(
          (r: any) => r.key === 'DOT',
        ),
      ).toEqual({
        group: 'address',
        key: 'DOT',
        type: 'addr',
        value: '5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX',
      })
    })
  })
})
