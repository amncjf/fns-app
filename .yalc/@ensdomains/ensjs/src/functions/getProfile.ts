import { formatsByName } from '@ensdomains/address-encoder'
import { ethers } from 'ethers'
import { ENSArgs } from '..'
import { decodeContenthash, DecodedContentHash } from '../utils/contentHash'
import { hexEncodeName } from '../utils/hexEncodedName'

type InternalProfileOptions = {
  contentHash?: boolean | string | DecodedContentHash
  texts?: string[]
  coinTypes?: string[]
}

type ProfileResponse = {
  contentHash?: string | DecodedContentHash
  texts?: string[]
  coinTypes?: string[]
}

type DataItem = {
  key: string | number
  type: 'addr' | 'text' | 'contentHash'
  coin?: string
  value: string
}
const makeMulticallData = async (
  {
    _getAddr,
    _getContentHash,
    _getText,
    resolverMulticallWrapper,
  }: ENSArgs<
    '_getText' | '_getAddr' | '_getContentHash' | 'resolverMulticallWrapper'
  >,
  name: string,
  options: InternalProfileOptions,
) => {
  let calls: any[] = []
  options.texts &&
    (calls = [
      ...calls,
      ...(await Promise.all(
        options.texts.map(async (x) => ({
          key: x,
          data: await _getText.raw(name, x),
          type: 'text',
        })),
      )),
    ])
  options.coinTypes &&
    (calls = [
      ...calls,
      ...(await Promise.all(
        options.coinTypes.map(async (x) => ({
          key: x,
          data: await _getAddr.raw(name, x, true),
          type: 'addr',
        })),
      )),
    ])
  if (typeof options.contentHash === 'boolean' && options.contentHash) {
    calls.push({
      key: 'contentHash',
      data: await _getContentHash.raw(name),
      type: 'contenthash',
    })
  }

  if (!calls.find((x) => x.key === '60')) {
    calls.push({
      key: '60',
      data: await _getAddr.raw(name, '60', true),
      type: 'addr',
    })
  }

  const prRawData = await resolverMulticallWrapper.raw(calls.map((x) => x.data))

  return { data: prRawData.data, calls }
}

const makeHashIndexes = (data: string, name: string) =>
  [...data.matchAll(ethers.utils.namehash(name).substring(2) as any)].map(
    (x: any) => x.index / 2 - 1,
  )

const getDataForName = async (
  {
    contracts,
    _getAddr,
    _getContentHash,
    _getText,
    resolverMulticallWrapper,
  }: ENSArgs<
    | 'contracts'
    | '_getText'
    | '_getAddr'
    | '_getContentHash'
    | 'resolverMulticallWrapper'
  >,
  name: string,
  options: InternalProfileOptions,
) => {
  const universalResolver = await contracts?.getUniversalResolver()

  const { data, calls } = await makeMulticallData(
    { _getAddr, _getContentHash, _getText, resolverMulticallWrapper },
    name,
    options,
  )

  let resolver: any
  try {
    resolver = await universalResolver?.resolve(hexEncodeName(name), data)
  } catch {
    return null
  }

  const [recordData] = await resolverMulticallWrapper.decode(resolver['0'])

  const matchAddress = recordData[calls.findIndex((x) => x.key === '60')]

  return {
    address: matchAddress && (await _getAddr.decode(matchAddress)),
    records: await formatRecords(
      { _getAddr, _getContentHash, _getText },
      recordData,
      calls,
      options,
    ),
    resolverAddress: resolver['1'],
  }
}

const getDataForAddress = async (
  {
    contracts,
    _getAddr,
    _getContentHash,
    _getText,
    resolverMulticallWrapper,
  }: ENSArgs<
    | 'contracts'
    | '_getText'
    | '_getAddr'
    | '_getContentHash'
    | 'resolverMulticallWrapper'
  >,
  address: string,
  options: InternalProfileOptions,
) => {
  const universalResolver = await contracts?.getUniversalResolver()
  const DNCOCURP = await contracts?.getDNCOCURP()

  const reverseNode = address.toLowerCase().substring(2) + '.addr.reverse'

  const { data, calls } = await makeMulticallData(
    { _getAddr, _getContentHash, _getText, resolverMulticallWrapper },
    reverseNode,
    options,
  )

  let result: any
  try {
    result = await DNCOCURP?.reverse(hexEncodeName(reverseNode), [
      {
        target: universalResolver!.address,
        data: data,
        dataType: 0,
        locations: makeHashIndexes(data as string, reverseNode),
      },
    ])
  } catch {
    return null
  }

  const name = result.name
  const URData = result.returnData[0]
  const [URDecoded, resolverAddress] = ethers.utils.defaultAbiCoder.decode(
    ['bytes', 'address'],
    URData,
  )
  const [recordData] = await resolverMulticallWrapper.decode(URDecoded)

  const matchAddress = recordData[calls.findIndex((x) => x.key === '60')]

  if (
    !matchAddress ||
    (await _getAddr.decode(matchAddress)).toLowerCase() !==
      address.toLowerCase()
  ) {
    return { name, records: null, match: false }
  }
  return {
    name,
    records: await formatRecords(
      { _getAddr, _getContentHash, _getText },
      recordData,
      calls,
      options,
    ),
    match: true,
    resolverAddress,
  }
}

const formatRecords = async (
  {
    _getText,
    _getAddr,
    _getContentHash,
  }: ENSArgs<'_getText' | '_getAddr' | '_getContentHash'>,
  data: any[],
  calls: any[],
  options: InternalProfileOptions,
) => {
  let returnedRecords: DataItem[] = (
    await Promise.all(
      data.map(async (item: string, i: number) => {
        let decodedFromAbi: any
        let itemRet: Record<string, any> = {
          key: calls[i].key,
          type: calls[i].type,
        }
        if (itemRet.type === 'addr' || itemRet.type === 'contenthash') {
          decodedFromAbi = ethers.utils.defaultAbiCoder.decode(
            ['bytes'],
            item,
          )[0]
          if (ethers.utils.hexStripZeros(decodedFromAbi) === '0x') {
            return null
          }
        }
        switch (calls[i].type) {
          case 'text':
            itemRet = {
              ...itemRet,
              value: await _getText.decode(item),
            }
            if (itemRet.value === '') return null
            break
          case 'addr':
            try {
              const addr = await _getAddr.decode(item, '', calls[i].key)
              if (addr) {
                itemRet = {
                  ...itemRet,
                  ...addr,
                }
                break
              } else {
                return null
              }
            } catch {
              return null
            }
          case 'contenthash':
            try {
              itemRet = {
                ...itemRet,
                value: await _getContentHash.decode(item),
              }
            } catch {
              return null
            }
        }
        return itemRet
      }),
    )
  )
    .filter((x): x is DataItem => {
      return typeof x === 'object'
    })
    .filter((x) => x !== null)

  let returnedResponse: {
    contentHash?: string | null | DecodedContentHash
    coinTypes?: DataItem[]
    texts?: DataItem[]
  } = {}

  if (
    typeof options.contentHash === 'string' ||
    typeof options.contentHash === 'object'
  ) {
    if (
      typeof options.contentHash === 'string' &&
      ethers.utils.hexStripZeros(options.contentHash) === '0x'
    ) {
      returnedResponse.contentHash = null
    } else if (
      ethers.utils.isBytesLike((options.contentHash as any).decoded) &&
      ethers.utils.hexStripZeros((options.contentHash as any).decoded) === '0x'
    ) {
      returnedResponse.contentHash = null
    } else {
      returnedResponse.contentHash = options.contentHash
    }
  } else if (options.contentHash) {
    const foundRecord = returnedRecords.find(
      (item: any) => item.type === 'contenthash',
    )
    returnedResponse.contentHash = foundRecord ? foundRecord.value : null
  }
  if (options.texts) {
    returnedResponse.texts = returnedRecords.filter(
      (x: any) => x.type === 'text',
    )
  }
  if (options.coinTypes) {
    returnedResponse.coinTypes = returnedRecords.filter(
      (x: any) => x.type === 'addr',
    )
  }
  return returnedResponse
}

const graphFetch = async (
  { gqlInstance }: ENSArgs<'gqlInstance'>,
  name: string,
  wantedRecords: ProfileOptions,
) => {
  const query = gqlInstance.gql`
    query getRecords($name: String!) {
      domains(where: { name: $name }) {
        resolver {
          texts
          coinTypes
          contentHash
          addr {
            id
          }
        }
      }
    }
  `

  const client = gqlInstance.client

  const { domains } = await client.request(query, { name })

  if (!domains || domains.length === 0) return null

  const [{ resolver: resolverResponse }] = domains

  let returnedRecords: ProfileResponse = {}

  Object.keys(wantedRecords).forEach((key: string) => {
    const data = wantedRecords[key as keyof ProfileOptions]
    if (typeof data === 'boolean' && data) {
      if (key === 'contentHash') {
        returnedRecords[key] = decodeContenthash(resolverResponse.contentHash)
      } else {
        returnedRecords[key as keyof ProfileOptions] = resolverResponse[key]
      }
    }
  })

  return returnedRecords
}

type ProfileOptions = {
  contentHash?: boolean
  texts?: boolean | string[]
  coinTypes?: boolean | string[]
}

const getProfileFromAddress = async (
  {
    contracts,
    gqlInstance,
    getName,
    _getAddr,
    _getContentHash,
    _getText,
    resolverMulticallWrapper,
  }: ENSArgs<
    | 'contracts'
    | 'gqlInstance'
    | 'getName'
    | '_getText'
    | '_getAddr'
    | '_getContentHash'
    | 'resolverMulticallWrapper'
  >,
  address: string,
  options?: ProfileOptions,
) => {
  if (
    !options ||
    (options && options.texts === true) ||
    options.coinTypes === true
  ) {
    let name
    try {
      name = await getName(address)
    } catch {
      return null
    }
    if (!name || !name.name || name.name === '') return null
    if (!name.match) return { name, records: null, match: false }
    const wantedRecords = await graphFetch(
      { gqlInstance },
      name.name,
      options || { contentHash: true, texts: true, coinTypes: true },
    )
    if (!wantedRecords) return null
    const result = await getDataForName(
      {
        contracts,
        _getAddr,
        _getContentHash,
        _getText,
        resolverMulticallWrapper,
      },
      name.name,
      wantedRecords,
    )
    if (!result) return null
    delete result.address
    return { ...result, match: true, name: name.name }
  } else {
    return await getDataForAddress(
      {
        contracts,
        _getAddr,
        _getContentHash,
        _getText,
        resolverMulticallWrapper,
      },
      address,
      options as InternalProfileOptions,
    )
  }
}

const getProfileFromName = async (
  {
    contracts,
    gqlInstance,
    _getAddr,
    _getContentHash,
    _getText,
    resolverMulticallWrapper,
  }: ENSArgs<
    | 'contracts'
    | 'gqlInstance'
    | '_getText'
    | '_getAddr'
    | '_getContentHash'
    | 'resolverMulticallWrapper'
  >,
  name: string,
  options?: ProfileOptions,
) => {
  if (
    !options ||
    (options && options.texts === true) ||
    options.coinTypes === true
  ) {
    const wantedRecords = await graphFetch(
      { gqlInstance },
      name,
      options || { contentHash: true, texts: true, coinTypes: true },
    )
    if (!wantedRecords) return null
    return await getDataForName(
      {
        contracts,
        _getAddr,
        _getContentHash,
        _getText,
        resolverMulticallWrapper,
      },
      name,
      wantedRecords,
    )
  } else {
    return await getDataForName(
      {
        contracts,
        _getAddr,
        _getContentHash,
        _getText,
        resolverMulticallWrapper,
      },
      name,
      options as InternalProfileOptions,
    )
  }
}

export default async function (
  {
    contracts,
    gqlInstance,
    getName,
    _getAddr,
    _getContentHash,
    _getText,
    resolverMulticallWrapper,
  }: ENSArgs<
    | 'contracts'
    | 'gqlInstance'
    | 'getName'
    | '_getText'
    | '_getAddr'
    | '_getContentHash'
    | 'resolverMulticallWrapper'
  >,
  nameOrAddress: string,
  options?: ProfileOptions,
) {
  if (options && options.coinTypes && typeof options.coinTypes !== 'boolean') {
    options.coinTypes = options.coinTypes.map((coin: string) => {
      if (!isNaN(parseInt(coin))) {
        return coin
      } else {
        return `${formatsByName[coin.toUpperCase()].coinType}`
      }
    })
  }

  if (nameOrAddress.includes('.')) {
    return getProfileFromName(
      {
        contracts,
        gqlInstance,
        _getAddr,
        _getContentHash,
        _getText,
        resolverMulticallWrapper,
      },
      nameOrAddress,
      options,
    )
  } else {
    return getProfileFromAddress(
      {
        contracts,
        gqlInstance,
        getName,
        _getAddr,
        _getContentHash,
        _getText,
        resolverMulticallWrapper,
      },
      nameOrAddress,
      options,
    )
  }
}
