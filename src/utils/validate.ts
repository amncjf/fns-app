import { getAddress } from '@ethersproject/address'

import { formatsByName } from '@fildomains/fnsjs/utils/recordHelpers'
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
  (address?: string): string | boolean => {
    try {
      if (!address) return 'addressRequired'
      let _coin = coin.toUpperCase()

      if (_coin === 'FIL' && address.substring(0, 2).toUpperCase() === '0X') {
        _coin = 'ETH'
      }

      let _address
      if (_coin === 'ETH') _address = getAddress(address)
      else _address = address

      const coinTypeInstance = formatsByName[_coin]
      coinTypeInstance.decoder(_address)
      return true
    } catch (e: any) {
      if (typeof e === 'string') return e
      if (e.reason) return e.reason
      if (e.message) return e.message
      if (e.toString) return e.toString()
      return 'Invalid address'
    }
  }
