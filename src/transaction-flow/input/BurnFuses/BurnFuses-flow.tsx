import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, Dispatch } from 'react'
import isEqual from 'lodash/isEqual'

import { Typography, Button, FlameSVG, FlameBurnedSVG, Helper } from '@ensdomains/thorin'

import { useGetFuseData } from '@app/hooks/useGetFuseData'
import { Spacer } from '@app/components/@atoms/Spacer'
import mq from '@app/mediaQuery'
import { FuseObj } from '@app/types'
import { TransactionDialogPassthrough, TransactionFlowAction } from '../../types'

import { makeTransactionItem } from '../../transaction'

export const defaultFuseObj = {
  CANNOT_UNWRAP: false,
  CANNOT_BURN_FUSES: false,
  CANNOT_TRANSFER: false,
  CANNOT_SET_RESOLVER: false,
  CANNOT_SET_TTL: false,
  CANNOT_CREATE_SUBDOMAIN: false,
  PARENT_CANNOT_CONTROL: false,
}

type FuseSelected = Omit<FuseObj, 'PARENT_CANNOT_CONTROL'>

const FusesContainer = styled.div(() => [
  css`
    width: 100%;
    padding: 5px 15px;
  `,
  mq.md.min(css`
    min-width: 400px;
  `),
])

const BurnButtonsContainer = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
)

const ButtonInner = styled.div(
  () => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  `,
)

const StyledFlameSVG = styled(FlameSVG)(
  () => css`
    position: relative;
    bottom: -1px;
    right: 1px;
  `,
)

const BurnedFlameContainer = styled.div<{ $isBurned: boolean }>(
  ({ theme, $isBurned }) => css`
    background: ${theme.colors.backgroundTertiary};
    color: ${theme.colors.textSecondary};
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 2px 10px;

    ${$isBurned &&
    `
      position: absolute;
      right: 6px;  
      z-index: 1;
    `}
  `,
)

const BurnedStyledFlameSVG = styled(FlameSVG)(
  () => css`
    position: relative;
    right: -8px;
    bottom: -1px;
    color: black;
  `,
)

const StyledButton = styled(Button)(
  () => css`
    padding: 0px 6px;
  `,
)

const BurnButton = ({
  permission,
  isBurned,
  handleBurnClick,
  isSelected,
}: {
  permission: string
  isBurned: boolean
  handleBurnClick: (permission: string) => void
  isSelected: boolean
}) => {
  const { t } = useTranslation('profile', { keyPrefix: 'details.tabs.advanced' })

  return (
    <StyledButton
      onClick={() => handleBurnClick(permission)}
      disabled={isBurned}
      variant="secondary"
      tone={isSelected ? 'red' : 'grey'}
      size="small"
      fullWidthContent
      shadowless
    >
      <ButtonInner data-testid={`burn-button-${permission}`}>
        <Typography>{t(`fuses.permissions.${permission}`)}</Typography>
        {isBurned && (
          <BurnedFlameContainer $isBurned={isBurned}>
            <Typography>{t('fuses.burned')}</Typography>
            <BurnedStyledFlameSVG width="24" height="24" />
          </BurnedFlameContainer>
        )}
        {isSelected ? (
          <FlameBurnedSVG width="24" height="24" data-testid={`flame-selected-${permission}`} />
        ) : (
          <StyledFlameSVG width="24" height="24" />
        )}
      </ButtonInner>
    </StyledButton>
  )
}

const ButtonsContainer = styled.div(
  () => css`
    display: flex;
    gap: 15px;
  `,
)

const canContinue = (fuseData: Partial<FuseObj>, fuseSelected: FuseSelected) => {
  const filteredInitialFuseData: Partial<FuseObj> = { ...fuseData }
  Object.keys(filteredInitialFuseData).forEach((key: string) => {
    if (filteredInitialFuseData[key as keyof FuseObj]) {
      delete filteredInitialFuseData[key as keyof FuseObj]
    }
  })
  const cannotUnwrap = !fuseData.CANNOT_UNWRAP && !fuseSelected.CANNOT_UNWRAP
  return isEqual(filteredInitialFuseData, fuseSelected) || cannotUnwrap
}

type Data = {
  name: string
}

export type Props = {
  data: Data
  onDismiss: () => void
  dispatch: Dispatch<TransactionFlowAction>
} & TransactionDialogPassthrough

export const BurnFuses = ({ onDismiss, dispatch }: Props) => {
  const { t } = useTranslation('profile', { keyPrefix: 'details.tabs.advanced' })
  const { t: tc } = useTranslation()
  const router = useRouter()
  const { name } = router.query
  const { fuseData } = useGetFuseData((name as string) || '')
  const [_fuseData, setFuseData] = useState<Omit<FuseObj, 'PARENT_CANNOT_CONTROL'>>(defaultFuseObj)
  const [fuseSelected, setFuseSelected] = useState<FuseObj>(defaultFuseObj)

  const handleBurnClick = (permission: keyof FuseObj) => {
    console.log('handleBurnClick: ', permission)
    const nextFuseSelected = { ...fuseSelected } as FuseObj
    nextFuseSelected[permission] = !nextFuseSelected[permission]
    setFuseSelected(nextFuseSelected)
  }

  const onSubmit = () => {
    const selectedFuses: Array<keyof FuseObj> = []
    Object.keys(fuseSelected).forEach(function (key) {
      if (fuseSelected[key as keyof FuseObj]) {
        selectedFuses.push(key as keyof FuseObj)
      }
    })

    const permissions = selectedFuses.map((key) => t(`fuses.permissions.${key}`))

    dispatch({
      name: 'setTransactions',
      payload: [
        makeTransactionItem('burnFuses', {
          name: name as string,
          selectedFuses,
          permissions,
        }),
      ],
    })
    dispatch({ name: 'setFlowStage', payload: 'transaction' })
  }

  useEffect(() => {
    if (fuseData) {
      const initialFuseData = {
        ...(fuseData.fuseObj as Omit<FuseObj, 'PARENT_CANNOT_CONTROL'>),
      }
      delete initialFuseData.canDoEverything
      delete initialFuseData.PARENT_CANNOT_CONTROL

      setFuseData({ ...initialFuseData })

      const initialFusesSelected = { ...initialFuseData }
      Object.keys(initialFusesSelected).forEach(function (key) {
        if (initialFusesSelected[key]) {
          delete initialFusesSelected[key]
          return
        }
        initialFusesSelected[key] = false
      })
      setFuseSelected(initialFusesSelected)
    }
  }, [fuseData])

  if (!_fuseData) return null

  return (
    <FusesContainer>
      <Typography weight="bold" variant="extraLarge">
        {t('fuses.burnFormTitle')}
      </Typography>
      {!_fuseData.CANNOT_UNWRAP && !fuseSelected.CANNOT_UNWRAP ? (
        <>
          <Spacer $height="1" />
          <Helper type="info" style={{ textAlign: 'center' }}>
            <Typography>{t('fuses.info')}</Typography>
          </Helper>
        </>
      ) : (
        ''
      )}
      <Spacer $height="4" />
      <BurnButtonsContainer>
        {Object.entries(_fuseData).map(([key, value]) => (
          <BurnButton
            {...{
              permission: key,
              isBurned: !!value,
              handleBurnClick,
              isSelected: !!fuseSelected[key as keyof FuseObj],
            }}
          />
        ))}
      </BurnButtonsContainer>
      <Spacer $height="6" />
      <ButtonsContainer>
        <Button tone="grey" variant="secondary" onClick={onDismiss}>
          {tc('action.cancel')}
        </Button>
        <Button
          disabled={canContinue(_fuseData, fuseSelected)}
          onClick={onSubmit}
          tone="red"
          data-testid="burn-form-continue"
        >
          {tc('action.burnSelected')}
        </Button>
      </ButtonsContainer>
    </FusesContainer>
  )
}

export default BurnFuses
