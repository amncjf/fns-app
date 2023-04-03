import { formatsByName } from '@fildomains/fnsjs/utils/recordHelpers'

const COIN_LIST = Object.keys(formatsByName).filter((c) => !c.match(/_LEGACY/))
export default COIN_LIST
