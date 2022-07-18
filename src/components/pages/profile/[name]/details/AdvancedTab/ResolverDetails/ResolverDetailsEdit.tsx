import { useMemo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { ethers } from 'ethers'
import { useProvider } from 'wagmi'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { Dialog, RadioButton, Input, mq, Button } from '@ensdomains/thorin'

import { useTransaction } from '@app/utils/TransactionProvider'
import { Outlink } from '@app/components/Outlink'
import {
  RESOLVER_ADDRESSES,
  RESOLVER_INTERFACE_IDS,
} from '@app/utils/constants'
import { useProfile } from '@app/hooks/useProfile'
import { ErrorContainer } from '@app/components/@molecules/ErrorContainer'
import { Spacer } from '@app/components/@atoms/Spacer'
import { useEns } from '@app/utils/EnsProvider'

const supportsInterfaceAbi = [
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const validateResolver = async (address: string, provider: any) => {
  const maybeResolver = new ethers.Contract(
    address,
    supportsInterfaceAbi,
    provider,
  )
  let results
  try {
    results = await Promise.all([
      maybeResolver.supportsInterface(RESOLVER_INTERFACE_IDS.addrInterfaceId),
      maybeResolver.supportsInterface(
        RESOLVER_INTERFACE_IDS.contentHashInterfaceId,
      ),
      maybeResolver.supportsInterface(RESOLVER_INTERFACE_IDS.txtInterfaceId),
    ])
    return results
      .map((result, idx) => {
        if (result) return undefined
        if (idx === 0 && !result) {
          return 'addr method not supported'
        }
        if (idx === 1 && !result) {
          return 'contentHash method not supported'
        }
        if (idx === 2 && !result) {
          return 'txt method not supported'
        }
        return undefined
      })
      .filter((x) => x)
  } catch (error) {
    if (error.method === 'supportsInterface(bytes4)') {
      return ['Cannot determine if address supports common resolver methods']
    }
    return []
  }
}

const customResolverErrorMessage = (errors) => {
  if (
    errors.customResolver?.type === 'minLength' ||
    errors.customResolver?.type === 'maxLength'
  ) {
    return 'Address should be 42 characters long'
  }
  if (errors.customResolver?.type === 'isCurrentResolver') {
    return 'This is the current resolver'
  }
  return undefined
}

const EditResolverFormContainer = styled.div(() => [
  css`
    width: 100%;
  `,
  mq.sm.min(css`
    width: 510px;
  `),
])

const LatestResolverContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
)

const InputContainer = styled.div(
  ({ theme }) => css`
    margin-left: ${theme.space[8]};
  `,
)

const ButtonsContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.space[4]};
    margin-top: ${theme.space[4]};
  `,
)

interface Props {
  isOpen: boolean
  onDismiss: () => null
}

const EditResolverForm = ({ onSubmit }: { onSubmit: () => null }) => {
  const router = useRouter()
  const { name } = router.query

  const { profile = { resolverAddress: '' } } = useProfile(name as string)
  const { resolverAddress } = profile
  const resolverAddressIndex = RESOLVER_ADDRESSES.indexOf(resolverAddress ?? '')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const { t } = useTranslation('profile')
  const resolverChoice: 'latest' | 'custom' = watch('resolverChoice')
  const customResolver = watch('customResolver')
  const provider = useProvider()

  const { data } = useQuery(
    ['validateResolverInterfaces', customResolver],
    () => validateResolver(customResolver, provider),
    {
      enabled: ethers.utils.isAddress(customResolver),
    },
  )

  const isValid = useMemo(() => {
    if (resolverChoice === 'latest' && resolverAddressIndex === 0) {
      return false
    }
    if (resolverChoice === 'latest') {
      return true
    }
    if (resolverChoice === 'custom' && !customResolver?.length) {
      return false
    }
    return !Object.keys(errors).length
  }, [resolverChoice, customResolver, errors, resolverAddressIndex])

  return (
    <EditResolverFormContainer>
      {resolverChoice === 'custom' && data?.length ? (
        <>
          <ErrorContainer
            message={
              <ul>
                {data?.map((message) => (
                  <li key={message}>- {message}</li>
                ))}
              </ul>
            }
            type="warning"
          />
          <Spacer $height={4} />
        </>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <LatestResolverContainer>
          <RadioButton
            label="Use latest resolver"
            value="latest"
            labelRight
            width={44}
            {...register('resolverChoice', {
              required: true,
            })}
            defaultChecked
          />
          <Outlink
            href={`https://etherscan.io/address/${RESOLVER_ADDRESSES[0]}`}
          >
            {t('details.tabs.advanced.resolver.etherscan')}
          </Outlink>
        </LatestResolverContainer>

        <RadioButton
          label={t('details.tabs.advanced.resolver.custom')}
          value="custom"
          labelRight
          {...register('resolverChoice')}
        />

        <InputContainer>
          <Input
            placeholder="Enter custom resolver address"
            disabled={resolverChoice !== 'custom'}
            {...register('customResolver', {
              maxLength: 42,
              minLength: 42,
              validate: {
                isCurrentResolver: (value) => !(value === resolverAddress),
              },
            })}
            error={customResolverErrorMessage(errors)}
          />
        </InputContainer>
        <Spacer $height={4} />
        <ButtonsContainer>
          <Button onClick={handleSubmit(onSubmit)} tone="grey">
            {t('action.cancel', { ns: 'common' })}
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            {t('action.update', { ns: 'common' })}
          </Button>
        </ButtonsContainer>
      </form>
    </EditResolverFormContainer>
  )
}

const ResolverDetailsEdit = ({ isOpen, onDismiss }: Props) => {
  const router = useRouter()
  const { name } = router.query
  const { setCurrentTransaction } = useTransaction()
  const { setResolver } = useEns()
  const { profile = { resolverAddress: '' } } = useProfile(name as string)

  const { resolverAddress } = profile

  const handleSubmit = useCallback(
    async ({ resolverChoice, customResolver }) => {
      let newResolver

      if (resolverChoice === 'latest') {
        newResolver = RESOLVER_ADDRESSES[0]
      }
      if (resolverChoice === 'custom') {
        newResolver = customResolver
      }

      setCurrentTransaction({
        data: [
          {
            actionName: 'updateResolver',
            generateTx: (signer) => {
              return setResolver(name, {
                contract: 'registry',
                resolver: newResolver,
                signer,
              })
            },
            displayItems: [
              {
                label: 'currentResolver',
                value: resolverAddress,
                type: 'address',
              },
              {
                label: 'newResolver',
                value: newResolver,
                type: 'address',
              },
            ],
          },
        ],
        key: 'updateResolver',
      })
    },
    [setCurrentTransaction, setResolver, name, resolverAddress],
  )

  return (
    <Dialog
      open={isOpen}
      title="Edit Resolver"
      subtitle="Edit the resolver details"
      onDismiss={onDismiss}
      variant="closable"
    >
      <EditResolverForm onSubmit={handleSubmit} />
    </Dialog>
  )
}

export { ResolverDetailsEdit }
