import { getAddress } from 'ethers/lib/utils'

import { formatsByName } from '@ensdomains/address-encoder'
import { validate } from '@ensdomains/ens-validation'

export const hasNonAscii = () => {
  const strs = window.location.pathname.split('/')
  const rslt = strs.reduce((accum, next) => {
    if (accum) return true
    if (!validate(next)) return true
    return accum
  }, false)
  return rslt
}

export const validateCryptoAddress =
  (coin: string) =>
  async (address: string): Promise<string | boolean> => {
    try {
      const _coin = coin.toUpperCase()

      let _address
      if (_coin === 'ETH') _address = getAddress(address)
      else _address = address

      const coinTypeInstance = formatsByName[_coin]
      coinTypeInstance.decoder(_address)
      return true
    } catch (e: any) {
      if (typeof e === 'string') return e
      if (e.message) return e.message
      if (e.toString) return e.toString()
      return 'Invalid address'
    }
  }
