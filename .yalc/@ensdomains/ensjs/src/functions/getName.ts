import { ENSArgs } from '..'
import { hexEncodeName } from '../utils/hexEncodedName'

const raw = async ({ contracts }: ENSArgs<'contracts'>, address: string) => {
  const universalResolver = await contracts?.getUniversalResolver()!
  const reverseNode = address.toLowerCase().substring(2) + '.addr.reverse'
  return {
    to: universalResolver.address,
    data: universalResolver.interface.encodeFunctionData('reverse', [
      hexEncodeName(reverseNode),
    ]),
  }
}

const decode = async (
  { contracts }: ENSArgs<'contracts'>,
  data: string,
  address: string,
) => {
  if (data === null) return
  const universalResolver = await contracts?.getUniversalResolver()!
  try {
    const result = universalResolver.interface.decodeFunctionResult(
      'reverse',
      data,
    )
    return {
      name: result['0'],
      match: result['1'].toLowerCase() === address.toLowerCase(),
      reverseResolverAddress: result['2'],
      resolverAddress: result['3'],
    }
  } catch {
    return { name: null, match: false }
  }
}

export default {
  raw,
  decode,
}
