import { useConnected } from '@app/hooks/useConnected'
import { useBreakpoint } from '@app/utils/BreakpointProvider'
import { mq } from '@ensdomains/thorin'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import styled, { css, useTheme } from 'styled-components'
import ENSFull from '../assets/ENSFull.svg'
import ENSWithGradient from '../assets/ENSWithGradient.svg'
import { ConditionalWrapper } from './ConditionalWrapper'
import { HeaderConnect } from './ConnectButton'
import { HamburgerMenu } from './HamburgerMenu'
import { LanugageDropdown } from './LanguageDropdown'
import { SearchInput } from './SearchInput'
import { StyledNavLink } from './StyledNavLink'

const publicRoutes = [
  { href: '/', disabled: false, label: 'navigation.home' },
  { href: '/about', disabled: true, label: 'navigation.about' },
  { href: '/developers', disabled: true, label: 'navigation.developers' },
  {
    label: 'navigation.community',
    disabled: true,
    href: '/community',
  },
  {
    label: 'navigation.help',
    disabled: true,
    href: '/help',
  },
  {
    label: 'navigation.governance',
    disabled: true,
    href: '/governance',
  },
  {
    label: 'navigation.docs',
    disabled: true,
    href: '/docs',
  },
]

const connectedRoutes = [
  {
    label: 'navigation.connected.favourites',
    disabled: true,
    href: '/favourites',
  },
  { label: 'navigation.connected.myNames', disabled: false, href: '/names' },
]

const HeaderWrapper = styled.header(
  () => css`
    height: min-content;
  `,
)

const LogoAnchor = styled.a(
  () => css`
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    & > svg {
      vertical-align: bottom;
    }

    &:hover {
      filter: brightness(1.05);
      transform: translateY(-1px);
    }
  `,
)

const VerticalLine = styled.div(
  ({ theme }) => css`
    width: 1px;
    height: ${theme.space['14']};
    background-color: ${theme.colors.borderSecondary};
  `,
)

const NavContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-gap: ${theme.space['3']};
    gap: ${theme.space['3']};
    ${mq.sm.min(css`
      flex-gap: ${theme.space['6']};
      gap: ${theme.space['6']};
    `)}
  `,
)

const DefaultLeadingItem = () => {
  const router = useRouter()
  const breakpoints = useBreakpoint()
  const { space } = useTheme()

  return (
    <>
      <ConditionalWrapper
        condition={router.asPath !== '/'}
        wrapper={(children) => (
          <Link passHref href="/">
            <LogoAnchor>{children}</LogoAnchor>
          </Link>
        )}
      >
        {breakpoints.sm && router.asPath === '/' ? (
          <ENSFull height={space['12']} />
        ) : (
          <ENSWithGradient height={space['12']} />
        )}
      </ConditionalWrapper>
      <LanugageDropdown />
      {router.asPath !== '/' && breakpoints.md && (
        <>
          <VerticalLine />
          <SearchInput size="large" />
        </>
      )}
    </>
  )
}

const DefaultTrailingItem = () => {
  const { t } = useTranslation('common')
  const connected = useConnected()
  const breakpoints = useBreakpoint()
  const dropdownRoutes = breakpoints.sm
    ? [
        publicRoutes[0],
        ...(connected ? connectedRoutes : []),
        ...publicRoutes.slice(1),
      ]
    : publicRoutes.slice(1)
  const alwaysVisibleRoutes = breakpoints.lg ? dropdownRoutes.splice(0, 3) : []

  return (
    <>
      {alwaysVisibleRoutes.map((route) => (
        <StyledNavLink
          disabled={route.disabled}
          key={route.href}
          href={route.href}
        >
          {t(route.label)}
        </StyledNavLink>
      ))}
      <HamburgerMenu
        dropdownItems={dropdownRoutes.map((route) => ({
          ...route,
          label: t(route.label),
        }))}
      />
      {breakpoints.sm && <HeaderConnect />}
    </>
  )
}

const MobileLayout = ({
  leading,
  trailing,
}: {
  leading?: React.ReactNode
  trailing?: React.ReactNode
}) => {
  return (
    <>
      {leading || <DefaultLeadingItem />}
      <div style={{ flexGrow: 1 }} />
      {trailing || <DefaultTrailingItem />}
    </>
  )
}

const DesktopLayout = () => {
  return (
    <>
      <DefaultLeadingItem />
      <div style={{ flexGrow: 1 }} />
      <DefaultTrailingItem />
    </>
  )
}

export const Header = ({
  leading,
  trailing,
}: {
  leading?: React.ReactNode
  trailing?: React.ReactNode
}) => {
  const { isReady } = useRouter()
  const breakpoints = useBreakpoint()

  return (
    <HeaderWrapper>
      <NavContainer>
        {isReady && !breakpoints.sm ? (
          <MobileLayout leading={leading} trailing={trailing} />
        ) : (
          <DesktopLayout />
        )}
      </NavContainer>
    </HeaderWrapper>
  )
}
