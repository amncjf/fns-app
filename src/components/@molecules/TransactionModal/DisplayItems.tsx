import { AvatarWithZorb } from '@app/components/AvatarWithZorb'
import { useChainId } from '@app/hooks/useChainId'
import { usePrimary } from '@app/hooks/usePrimary'
import { TransactionDisplayItem } from '@app/types'
import { shortenAddress } from '@app/utils/utils'
import { Typography } from '@ensdomains/thorin'
import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    width: ${theme.space.full};
    gap: ${theme.space['2']};
  `,
)

const DisplayItemContainer = styled.div<{ $shrink?: boolean; $fade?: boolean }>(
  ({ theme, $shrink, $fade }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: ${theme.radii.extraLarge};
    border: ${theme.borderWidths.px} ${theme.borderStyles.solid}
      rgba(${theme.shadesRaw.foreground}, 0.06);
    min-height: ${theme.space['14']};
    padding: ${theme.space['2']} ${theme.space['5']};
    width: ${theme.space.full};

    ${$shrink &&
    css`
      min-height: ${theme.space['12']};
      div {
        margin-top: 0;
        align-self: center;
      }
    `}
    ${$fade &&
    css`
      opacity: 0.5;
      background-color: ${theme.colors.backgroundTertiary};
    `}
  `,
)

const DisplayItemLabel = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.textSecondary};
    align-self: flex-start;
    margin-top: ${theme.space['2']};
  `,
)

const AvatarWrapper = styled.div(
  ({ theme }) => css`
    width: ${theme.space['7']};
    height: ${theme.space['7']};
  `,
)

const ValueWithAvatarContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: ${theme.space['4']};
  `,
)

const InnerValueWrapper = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  `,
)

const AddressSubtitle = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-weight: ${theme.fontWeights.medium};
  `,
)

const AddressValue = ({ value }: { value: string }) => {
  const primary = usePrimary(value)
  const network = useChainId()

  const AddressTypography = useMemo(
    () =>
      primary.name ? (
        <AddressSubtitle variant="label">
          {shortenAddress(value)}
        </AddressSubtitle>
      ) : (
        <Typography weight="bold">{shortenAddress(value)}</Typography>
      ),
    [primary.name, value],
  )

  return (
    <ValueWithAvatarContainer>
      <InnerValueWrapper>
        {primary.name && <Typography weight="bold">{primary.name}</Typography>}
        {AddressTypography}
      </InnerValueWrapper>
      <AvatarWrapper>
        <AvatarWithZorb
          address={value}
          name={primary.name || undefined}
          label={`${value}-avatar`}
          network={network}
        />
      </AvatarWrapper>
    </ValueWithAvatarContainer>
  )
}

const NameValue = ({ value }: { value: string }) => {
  const network = useChainId()

  return (
    <ValueWithAvatarContainer>
      <Typography weight="bold">{value}</Typography>
      <AvatarWrapper>
        <AvatarWithZorb
          name={value}
          label={`${value}-avatar`}
          network={network}
        />
      </AvatarWrapper>
    </ValueWithAvatarContainer>
  )
}

const NormalValueTypography = styled(Typography)(
  () => css`
    max-width: 60%;
    text-align: right;
  `,
)

const DisplayItemValue = ({
  value,
  type,
}: Omit<TransactionDisplayItem, 'label'>) => {
  if (type === 'address') {
    return <AddressValue value={value} />
  }
  if (type === 'name') {
    return <NameValue value={value} />
  }
  return <NormalValueTypography weight="bold">{value}</NormalValueTypography>
}

export const DisplayItem = ({
  label,
  value,
  type,
  shrink,
  fade,
  useRawLabel,
  t,
}: TransactionDisplayItem & { t: TFunction }) => {
  return (
    <DisplayItemContainer
      $fade={fade}
      $shrink={shrink}
      key={`${label}-${value}`}
    >
      <DisplayItemLabel>
        {useRawLabel ? label : t(`transaction.itemLabel.${label}`)}
      </DisplayItemLabel>
      <DisplayItemValue {...{ value, type }} />
    </DisplayItemContainer>
  )
}

export const DisplayItems = ({
  displayItems,
}: {
  displayItems: TransactionDisplayItem[]
}) => {
  const { t } = useTranslation()

  if (!displayItems || !displayItems.length) return null

  return (
    <Container>
      {displayItems.map((props) => DisplayItem({ ...props, t }))}
    </Container>
  )
}
