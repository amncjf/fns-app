import styled, { css } from 'styled-components'
import { PropsWithChildren } from 'react'

const Container = styled.div<{
  $expanded: boolean
  $maxHeight?: string
}>(
  ({ $expanded, $maxHeight }) => css`
    max-height: ${$expanded ? $maxHeight : '0px'};
    opacity: ${$expanded ? '1' : '0'};
    visibility: ${$expanded ? 'visible' : 'hidden'};
    transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6);
    width: 100%;
    position: relative;
  `,
)

type Props = {
  expanded?: boolean
  maxHeight?: string
}

const CollapsibleContent = ({
  expanded = false,
  maxHeight = '100vh',
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Container $expanded={expanded} $maxHeight={maxHeight}>
      {children}
    </Container>
  )
}

export default CollapsibleContent
