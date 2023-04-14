import { BigNumber, parseFixed } from '@ethersproject/bignumber'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type FormData = {
  fnstokenValue: string
}

export type Props = {
  callback: (value: string | undefined) => void
  maxValue: BigNumber | undefined
}

const useFnsTokenEditor = ({ callback, maxValue }: Props) => {
  const { t } = useTranslation('fnsToken')
  const { register, formState, handleSubmit, reset, trigger, watch, getFieldState, setValue } =
    useForm<FormData>({
      mode: 'onChange',
      defaultValues: { fnstokenValue: '' },
    })

  const customValue = watch('fnstokenValue') as string
  const handleResolverSubmit = async () => {
    callback(maxValue == null ? undefined : customValue)
  }

  let error
  if (typeof customValue !== 'string' || customValue.length === 0) {
    error = t('section.error.amount')
  } else if (parseFixed(customValue, 18).eq(0)) {
    error = t('section.error.notZero')
  } else if (parseFixed(customValue, 18).gt(maxValue!)) {
    error = t('section.error.tooBig')
  }

  return {
    register,
    handleSubmit: handleSubmit(handleResolverSubmit),
    reset,
    trigger,
    watch,
    getFieldState,
    customValue,
    error,
    setValue,
    formState,
  }
}

export default useFnsTokenEditor
