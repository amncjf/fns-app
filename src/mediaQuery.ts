import { css } from 'styled-components'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type BreakpointType = 'min' | 'max'

const breakpointTypes: Record<BreakpointType, string> = {
  min: 'min-width',
  max: 'max-width',
}

const breakpoints: Record<Breakpoint, string> = {
  xs: '360px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

type CSSParams = Parameters<typeof css>
const keys = Object.keys(breakpoints) as Array<Breakpoint>
const typeKeys = Object.keys(breakpointTypes) as Array<BreakpointType>

const mq = keys.reduce((acc, sizeLabel) => {
  acc[sizeLabel] = typeKeys.reduce((accumulator, typeLabel) => {
    accumulator[typeLabel] = (...args: CSSParams) => {
      return css`
        @media (${breakpointTypes[typeLabel]}: ${breakpoints[sizeLabel]}) {
          ${css(...args)};
        }
      `
    }
    return accumulator
  }, {} as Record<BreakpointType, Function>)
  return acc
}, {} as Record<Breakpoint, Record<BreakpointType, Function>>)

export default mq
