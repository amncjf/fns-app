import { getContractAddress } from '@fildomains/fnsjs/contracts/getContractAddress'

import { RESOLVER_ADDRESSES } from './constants'

describe('RESOLVER_ADDRESSES', () => {
  it('should have the most recent resolver as the first address', () => {
    expect(RESOLVER_ADDRESSES['314'][0]).toEqual(getContractAddress('314')('PublicResolver'))
    expect(RESOLVER_ADDRESSES['1337'][0]).toEqual('0x0B306BF915C4d645ff596e518fAf3F9669b97016')
    expect(RESOLVER_ADDRESSES['3141'][0]).toEqual(getContractAddress('3141')('PublicResolver'))
    expect(RESOLVER_ADDRESSES['314159'][0]).toEqual(getContractAddress('314159')('PublicResolver'))
  })
})
