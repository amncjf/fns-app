import { mockFunction, renderHook, waitFor } from '@app/test-utils'

import { useFns } from '@app/utils/FnsProvider'

import { useBasicName } from './useBasicName'
import { useContractAddress } from './useContractAddress'
import { useSupportsTLD } from './useSupportsTLD'
import { useValidate } from './useValidate'

jest.mock('@app/utils/FnsProvider')
jest.mock('./useValidate')
jest.mock('./useContractAddress')
jest.mock('./useSupportsTLD')

const mockUseEns = mockFunction(useFns)
const mockUseValidate = mockFunction(useValidate)
const mockUseContractAddress = mockFunction(useContractAddress)
const mockUseSupportsTLD = mockFunction(useSupportsTLD)

const mockGetOwner = {
  ...jest.fn(),
  batch: jest.fn(),
}
const mockGetExpiry = {
  ...jest.fn(),
  batch: jest.fn(),
}
const mockGetPrice = {
  ...jest.fn(),
  batch: jest.fn(),
}
const mockGetWrapperData = {
  ...jest.fn(),
  batch: jest.fn(),
}

const mockBatch = jest.fn()

describe('useBasicName', () => {
  mockUseSupportsTLD.mockReturnValue({ data: true, isLoading: false })
  mockUseEns.mockReturnValue({
    ready: true,
    getOwner: mockGetOwner,
    getExpiry: mockGetExpiry,
    getPrice: mockGetPrice,
    getWrapperData: mockGetWrapperData,
    batch: mockBatch,
  })
  mockUseContractAddress.mockReturnValue('0x123')
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should query for the expiry if the name is a 2LD .fil', async () => {
    mockUseValidate.mockReturnValue({
      valid: true,
      name: 'test.fil',
      labelCount: 2,
    })

    renderHook(() => useBasicName('test.fil'))
    await waitFor(() => expect(mockBatch).toHaveBeenCalled())
    expect(mockGetExpiry.batch).toHaveBeenCalled()
  })
  it('should not query for the expiry if not a 2LD .fil', () => {
    mockUseValidate.mockReturnValue({
      valid: true,
      name: 'test.com',
      labelCount: 2,
    })

    renderHook(() => useBasicName('test.com'))
    expect(mockGetExpiry.batch).not.toHaveBeenCalled()
  })
})
