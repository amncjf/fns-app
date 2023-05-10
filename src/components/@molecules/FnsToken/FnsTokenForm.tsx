import { BigNumber, formatFixed } from '@ethersproject/bignumber'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Button, Input } from '@ensdomains/thorin'

import useFnsTokenEditor from '@app/hooks/useFnsTokenEditor'

const ButtonContainer = styled.div<{ $state: boolean }>(
  ({ theme, $state }) => css`
    display: flex;
    align-items: center;
    padding-top: ${$state ? theme.space['6'] : 0};
    padding-left: ${theme.space['4']};
    padding-right: ${theme.space['0']};
  `,
)

const SectionHeader = styled.div<{ $hideBorder?: boolean }>(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${theme.space['0']};
    padding-bottom: ${theme.space['8']};
  `,
)

type Props = ReturnType<typeof useFnsTokenEditor> & {
  maxValue: BigNumber
}

const FnsTokenForm = ({ maxValue, register, setValue, error }: Props) => {
  const { t } = useTranslation('fnsToken')

  return (
    <SectionHeader>
      <Input
        label={`${t('section.form.max')}: ${formatFixed(maxValue, 18)}`}
        // @ts-ignore
        type="number"
        placeholder={t('section.form.placeholder')}
        error={error}
        {...register(`fnstokenValue`, {})}
      />

      <ButtonContainer $state={!error}>
        <Button
          data-testid="primary-section-button"
          size="small"
          onClick={() =>
            setValue('fnstokenValue', formatFixed(maxValue, 18), { shouldDirty: true })
          }
        >
          {t('section.form.all')}
        </Button>
      </ButtonContainer>
    </SectionHeader>
  )
}

export default FnsTokenForm
