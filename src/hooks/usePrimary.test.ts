import { mockFunction, renderHook } from '@app/test-utils'

import { useFns } from '@app/utils/FnsProvider'

import { usePrimary } from './usePrimary'

jest.mock('@app/utils/FnsProvider')

const mockUseEns = mockFunction(useFns)

const mockGetName = jest.fn()

describe('usePrimary', () => {
  mockUseEns.mockReturnValue({
    ready: true,
    getName: mockGetName,
  })
  it('should return a name if name is returned and matches', async () => {
    mockGetName.mockResolvedValue({
      name: 'test.fil',
      match: true,
    })

    const { result, waitForNextUpdate } = renderHook(() => usePrimary('0x123'))
    await waitForNextUpdate()
    expect(result.current.name).toBe('test.fil')
  })
  it("should return null if name doesn't match", async () => {
    mockGetName.mockResolvedValue({
      name: 'test.fil',
      match: false,
    })

    const { result, waitForNextUpdate } = renderHook(() => usePrimary('0x123'))
    await waitForNextUpdate()
    expect(result.current.name).toBe(null)
  })
})
