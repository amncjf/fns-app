import { mockFunction, renderHook } from '@app/test-utils'

import { useFns } from '@app/utils/FnsProvider'

import { useChainId } from './useChainId'
import { useWrapperExists } from './useWrapperExists'

jest.mock('@app/utils/FnsProvider')
jest.mock('./useChainId')

const mockUseEns = mockFunction(useFns)
const mockUseChainId = mockFunction(useChainId)

const mockGetContractAddress = jest.fn()

describe('useWrapperExists', () => {
  mockUseChainId.mockReturnValue(1)
  mockGetContractAddress.mockReturnValue(() => '0x123')
  it('should return false if FNS not ready', () => {
    mockUseEns.mockReturnValue({
      ready: false,
      getContractAddress: mockGetContractAddress,
    })
    const { result } = renderHook(() => useWrapperExists())
    expect(result.current).toBe(false)
  })
  it('should return false if nameWrapper address is undefined', () => {
    mockUseEns.mockReturnValue({
      ready: true,
      getContractAddress: mockGetContractAddress,
    })
    mockGetContractAddress.mockReturnValue(() => undefined)
    const { result } = renderHook(() => useWrapperExists())
    expect(result.current).toBe(false)
  })
  it('should return false if nameWrapper address is empty address', () => {
    mockUseEns.mockReturnValue({
      ready: true,
      getContractAddress: mockGetContractAddress,
    })
    mockGetContractAddress.mockReturnValue(() => '0x0000000000000000000000000000000000000000')
    const { result } = renderHook(() => useWrapperExists())
    expect(result.current).toBe(false)
  })
  it('should return true if nameWrapper address is not empty address', () => {
    mockUseEns.mockReturnValue({
      ready: true,
      getContractAddress: mockGetContractAddress,
    })
    mockGetContractAddress.mockReturnValue(() => '0x123')
    const { result } = renderHook(() => useWrapperExists())
    expect(result.current).toBe(true)
  })
})
