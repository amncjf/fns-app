import { BigNumber, parseFixed } from '@ethersproject/bignumber'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Button, Dialog, mq } from '@ensdomains/thorin'

import FnsTokenForm from '@app/components/@molecules/FnsToken/FnsTokenForm'
import useFnsTokenEditor from '@app/hooks/useFnsTokenEditor'
import { TransactionDialogPassthrough } from '@app/transaction-flow/types'

import { TransactionName, makeTransactionItem } from '../../transaction'

const Container = styled.div(({ theme }) => [
  css`
    width: 100%;
  `,
  mq.sm.min(css`
    min-width: ${theme.space['80']};
    min-height: ${theme.space['30']};
  `),
])

const FormContainer = styled.div<{ $state: boolean }>(
  ({ theme, $state }) => css`
    padding-top: ${$state ? theme.space['10'] : theme.space['6']};
  `,
)

const EditResolverFormContainer = styled.div(({ theme }) => [
  css`
    width: 100%;
  `,
  mq.sm.min(css`
    width: calc(80vw - 2 * ${theme.space['6']});
    max-width: ${theme.space['128']};
  `),
])

type Data = {
  maxValue: BigNumber | undefined
  action: string
  name: string | undefined
  title: string
}

export type Props = {
  data: Data
} & TransactionDialogPassthrough

export const FnsToken = ({ data, dispatch, onDismiss }: Props) => {
  const { t } = useTranslation('transactionFlow')

  const { maxValue, name, title, action } = data
  const formRef = useRef<HTMLFormElement>(null)

  const handleCreateTransaction = useCallback(
    (value: string | undefined) => {
      dispatch({
        name: 'setTransactions',
        payload: [
          makeTransactionItem(action as TransactionName, {
            amount: maxValue ? parseFixed(value!, 18).toString() : undefined,
            title,
            name,
          }),
        ],
      })
      dispatch({ name: 'setFlowStage', payload: 'transaction' })
    },
    [dispatch, maxValue, name],
  )

  const fnsTokenForm = useFnsTokenEditor({ maxValue, callback: handleCreateTransaction })
  const { error } = fnsTokenForm

  const handleSubmitForm = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  return (
    <Container>
      <Dialog.Heading title={title} />
      <FormContainer $state={!maxValue}>
        <form data-testid="edit-fns-token-form" onSubmit={fnsTokenForm.handleSubmit} ref={formRef}>
          {!!maxValue && (
            <EditResolverFormContainer>
              <FnsTokenForm {...{ ...fnsTokenForm, maxValue }} />
            </EditResolverFormContainer>
          )}
          <Dialog.Footer
            leading={
              <Button colorStyle="accentSecondary" onClick={onDismiss}>
                {t('action.cancel', { ns: 'common' })}
              </Button>
            }
            trailing={
              <Button
                onClick={handleSubmitForm}
                disabled={maxValue == null ? false : !!error}
                data-testid="confirm-button"
              >
                {t('action.confirm', { ns: 'common' })}
              </Button>
            }
          />
        </form>
      </FormContainer>
    </Container>
  )
}

export default FnsToken
