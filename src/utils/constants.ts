import { EthAddress } from '@app/types'

export const emptyAddress = '0x0000000000000000000000000000000000000000'

export const networkName = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1337': 'local',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '31337': 'hardhat',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '314': 'filecoin',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '3141': 'hyperspace',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '314159': 'calibration',
}

interface ResolverAddresses {
  [key: string]: EthAddress[]
}

// Ordered by recency
export const RESOLVER_ADDRESSES: ResolverAddresses = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '314': ['0xd1fA99Bde6a85378df590B24188376280fA7919A'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '3141': ['0x55B372Ea4907A26a692BA41D0284E572d7A4e8da'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1337': ['0x0B306BF915C4d645ff596e518fAf3F9669b97016'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '31337': ['0x0B306BF915C4d645ff596e518fAf3F9669b97016'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '314159': ['0x86bdC76cee571e8A5E5060971499e4Fd620Ff6D4'],
}

export const NAMEWRAPPER_AWARE_RESOLVERS: ResolverAddresses = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '314': ['0xd1fA99Bde6a85378df590B24188376280fA7919A'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '3141': ['0x55B372Ea4907A26a692BA41D0284E572d7A4e8da'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '1337': ['0x0B306BF915C4d645ff596e518fAf3F9669b97016'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '31337': ['0x0B306BF915C4d645ff596e518fAf3F9669b97016'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '314159': ['0x86bdC76cee571e8A5E5060971499e4Fd620Ff6D4'],
}

export const RESOLVER_INTERFACE_IDS = {
  addrInterfaceId: '0x3b3b57de',
  txtInterfaceId: '0x59d1d43c',
  contentHashInterfaceId: '0xbc1c58d1',
}

export const GRACE_PERIOD = 90 * 24 * 60 * 60 * 1000

export const MOONPAY_WORKER_URL: { [key: number]: string } = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  1: 'https://moonpay-worker.ens-cf.workers.dev',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  5: 'https://moopnay-worker-goerli.ens-cf.workers.dev',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  1337: 'https://moonpay-goerli.ens-cf.workers.dev',
}
