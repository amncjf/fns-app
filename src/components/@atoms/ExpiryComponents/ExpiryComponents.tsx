import ClockSVG from '@app/assets/Clock.svg'
import { secondsToDays } from '@app/utils/utils'
import { Typography } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

const ExpiryWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${theme.space['1']};
    flex-gap: ${theme.space['1']};
  `,
)

const ClockIcon = styled.div<{ $color: 'red' | 'orange' | 'grey' }>(
  ({ theme, $color }) => css`
    width: ${theme.space['5']};
    height: ${theme.space['5']};
    color: ${theme.colors[$color]};
  `,
)

const ExpiryText = styled(Typography)<{
  $color: 'red' | 'orange' | 'foreground'
}>(
  ({ theme, $color }) => css`
    color: ${theme.colors[$color]};
    ${$color === 'foreground'
      ? css`
          opacity: 0.4;
        `
      : ``}
  `,
)

export const ExpiryClock = ({ expiry }: { expiry: Date }) => {
  const currentDate = new Date()
  const difference = secondsToDays(
    (expiry.getTime() - currentDate.getTime()) / 1000,
  )

  if (difference < 0) {
    return (
      <ClockIcon data-testid="expiry-clock-red" $color="red" as={ClockSVG} />
    )
  }
  if (difference < 90) {
    return (
      <ClockIcon
        data-testid="expiry-clock-orange"
        $color="orange"
        as={ClockSVG}
      />
    )
  }

  return (
    <ClockIcon data-testid="expiry-clock-grey" $color="grey" as={ClockSVG} />
  )
}

const pluralise = (unit: string, count: number) =>
  `${count} ${unit}${count > 1 ? 's' : ''}`

export const ShortExpiry = ({ expiry }: { expiry: Date }) => {
  const currentDate = new Date()
  const difference = secondsToDays(
    (expiry.getTime() - currentDate.getTime()) / 1000,
  )
  const months = Math.floor(difference / 30)
  const years = Math.floor(difference / 365)

  let text = pluralise('year', years)
  let color: 'foreground' | 'red' | 'orange' = 'foreground'

  if (difference < 0) {
    text = pluralise('day', difference + 90)
    color = 'red'
  } else if (difference < 30) {
    text = pluralise('day', difference)
    color = 'orange'
  } else if (difference < 90) {
    text = pluralise('month', months)
    color = 'orange'
  } else if (difference < 365) {
    text = `${months} months`
    color = 'foreground'
  }

  return (
    <ExpiryText
      data-testid={`short-expiry-${color}`}
      weight="bold"
      $color={color}
    >
      Expires in {text}
    </ExpiryText>
  )
}

export const ReadableExpiry = ({ expiry }: { expiry: Date }) => {
  return (
    <ExpiryWrapper>
      <ExpiryClock expiry={expiry} />
      <Typography weight="bold" color="textSecondary">
        {`${expiry.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })}, ${expiry.getFullYear()}`}
      </Typography>
      <Typography weight="bold" color="textTertiary">
        {`at ${expiry.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })}`}
      </Typography>
    </ExpiryWrapper>
  )
}
