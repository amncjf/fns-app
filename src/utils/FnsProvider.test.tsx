/* eslint-disable no-promise-executor-return, func-names */
import type { PartialMockedFunction } from '@app/test-utils'

import { RenderHookOptions, act, renderHook } from '@testing-library/react-hooks'
import { getProvider } from '@wagmi/core'

const mockSetProvider = jest.fn()
const getName = async function () {
  return 'test.fil'
}
const somethingSync = function () {
  return 'sync'
}
const mockEns = {
  getName,
  somethingSync,
  setProvider: mockSetProvider,
}

jest.mock('@wagmi/core')
jest.mock('@fildomains/fnsjs', () => {
  return {
    FNS: jest.fn().mockImplementation(() => {
      return mockEns
    }),
  }
})

const { FnsProvider, useFns } = require('./FnsProvider')

const mockGetProvider = getProvider as unknown as jest.MockedFunction<
  PartialMockedFunction<typeof getProvider>
>

const renderHookHelper = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: Omit<RenderHookOptions<TProps>, 'wrapper'>,
) => renderHook(callback, { wrapper: FnsProvider as any, ...options })

describe('<FnsProvider />', () => {
  const providerMock = { network: { chainId: 314 } }
  beforeEach(() => {
    jest.resetAllMocks()
    mockGetProvider.mockReturnValue(providerMock)
    mockSetProvider.mockResolvedValue(undefined)
  })
  it('should set the initial chain on render', async () => {
    const { result, waitForNextUpdate } = renderHookHelper(() => useFns())
    await waitForNextUpdate()
    expect(result.current.ready).toBe(true)
    expect(mockSetProvider).toHaveBeenCalledWith(providerMock)
  })
  it('should run setProvider() when the chain id changes and a function is called', async () => {
    const { result, waitForNextUpdate } = renderHookHelper(() => useFns())
    await waitForNextUpdate()
    expect(result.current.ready).toBe(true)
    expect(mockSetProvider).toHaveBeenCalledWith(providerMock)
    const providerMock2 = { network: { chainId: 314 } }
    mockGetProvider.mockReturnValue(providerMock2)
    await act(async () => {
      const fnResult = await result.current.getName()
      expect(fnResult).toBe('test.fil')
    })
    expect(mockSetProvider).toHaveBeenCalledWith(providerMock2)
  })
  it('should wait for the setProvider() promise to resolve before calling the function', async () => {
    jest.useFakeTimers()
    const { result, waitForNextUpdate } = renderHookHelper(() => useFns())
    await waitForNextUpdate()
    expect(result.current.ready).toBe(true)
    expect(mockSetProvider).toHaveBeenCalledWith(providerMock)
    const providerMock2 = { network: { chainId: 314 } }
    mockGetProvider.mockReturnValue(providerMock2)

    // mockSetProvider.mockClear()
    mockSetProvider.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return undefined
    })
    await act(async () => {
      let hasWaited = false
      const fnResult = await new Promise((resolve) => {
        result.current.getName().then((_result: any) => {
          expect(hasWaited).toBe(true)
          resolve(_result)
        })
        jest.advanceTimersByTime(500)
        hasWaited = true
      })
      expect(fnResult).toBe('test.fil')
      expect(mockSetProvider).toHaveBeenCalledWith(providerMock2)
      expect(mockSetProvider).toHaveBeenCalledTimes(1)
    })
  })
  it('should only run setProvider() once when the chain id changes and multiple functions are called', async () => {
    jest.useFakeTimers()
    const { result, waitForNextUpdate } = renderHookHelper(() => useFns())
    await waitForNextUpdate()
    expect(result.current.ready).toBe(true)
    expect(mockSetProvider).toHaveBeenCalledWith(providerMock)
    const providerMock2 = { network: { chainId: 314 } }
    mockGetProvider.mockReturnValue(providerMock2)
    // mockSetProvider.mockClear()
    mockSetProvider.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return undefined
    })
    await act(async () => {
      let hasWaited = false
      let resolveCount = 0
      const fnResult = await new Promise((resolve) => {
        result.current.getName().then((_result: any) => {
          expect(hasWaited).toBe(true)
          resolveCount += 1
          if (resolveCount === 3) {
            resolve(_result)
          }
        })
        result.current.getName().then((_result: any) => {
          expect(hasWaited).toBe(true)
          resolveCount += 1
          if (resolveCount === 3) {
            resolve(_result)
          }
        })
        result.current.getName().then((_result: any) => {
          expect(hasWaited).toBe(true)
          resolveCount += 1
          if (resolveCount === 3) {
            resolve(_result)
          }
        })
        jest.advanceTimersByTime(500)
        hasWaited = true
      })
      expect(fnResult).toBe('test.fil')
      expect(mockSetProvider).toHaveBeenCalledWith(providerMock2)
      expect(mockSetProvider).toHaveBeenCalledTimes(1)
    })
  })
  it('should return non-async functions as normal', async () => {
    jest.useFakeTimers()
    const { result, waitForNextUpdate } = renderHookHelper(() => useFns())
    await waitForNextUpdate()
    expect(result.current.ready).toBe(true)
    expect(mockSetProvider).toHaveBeenCalledWith(providerMock)
    const providerMock2 = { network: { chainId: 3141 } }
    mockGetProvider.mockReturnValue(providerMock2)
    mockSetProvider.mockClear()
    mockSetProvider.mockResolvedValue(undefined)
    const fnResult = result.current.somethingSync()
    expect(fnResult).toBe('sync')
    expect(mockSetProvider).not.toHaveBeenCalled()
  })
})
