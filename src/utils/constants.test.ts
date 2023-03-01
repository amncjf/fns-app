import { getContractAddress } from '@fildomains/fnsjs/contracts/getContractAddress'

import { RESOLVER_ADDRESSES } from './constants'

describe('RESOLVER_ADDRESSES', () => {
  it('should have the most recent resolver as the first address', () => {
    expect(RESOLVER_ADDRESSES['1'][0]).toEqual(getContractAddress('1')('PublicResolver'))
    expect(RESOLVER_ADDRESSES['1337'][0]).toEqual('0x0B306BF915C4d645ff596e518fAf3F9669b97016')
    expect(RESOLVER_ADDRESSES['5'][0]).toEqual(getContractAddress('5')('PublicResolver'))
  })
})
