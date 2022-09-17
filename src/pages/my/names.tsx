import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { useAccount } from 'wagmi'

import { Button, Spinner } from '@ensdomains/thorin'

import FastForwardSVG from '@app/assets/FastForward.svg'
import { NameListView } from '@app/components/@molecules/NameListView/NameListView'
import { NameTableFooter } from '@app/components/@molecules/NameTableFooter/NameTableFooter'
import { SortDirection, SortType } from '@app/components/@molecules/SortControl/SortControl'
import { TabWrapper } from '@app/components/pages/profile/TabWrapper'
import { useChainId } from '@app/hooks/useChainId'
import { useNamesFromAddress } from '@app/hooks/useNamesFromAddress'
import { useProtectedRoute } from '@app/hooks/useProtectedRoute'
import { Content } from '@app/layouts/Content'
import { ContentGrid } from '@app/layouts/ContentGrid'
import { useTransactionFlow } from '@app/transaction-flow/TransactionFlowProvider'

import {
  NameTableHeader,
  NameTableMode,
} from '../../components/@molecules/NameTableHeader/NameTableHeader'

const EmptyDetailContainer = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['4']};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
)

const TabWrapperWithButtons = styled(TabWrapper)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: normal;
    justify-content: flex-start;
    width: 100%;
    max-width: 100%;
    background: ${theme.colors.white};
  `,
)

const ButtonInner = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space['2']};
    font-size: ${theme.space['3.5']};
    height: ${theme.space['5']};
    padding: 0 ${theme.space['2']};

    svg {
      display: block;
      width: ${theme.space['3']};
      height: ${theme.space['3']};
    }
  `,
)

const spacing = '1fr 1fr'

export default function Page() {
  const { t } = useTranslation('names')
  const router = useRouter()
  const { address: _address, isConnecting, isReconnecting } = useAccount()
  const address = (router.query.address as string) || (_address as string)
  const isSelf = true
  const chainId = useChainId()

  const [mode, setMode] = useState<NameTableMode>('view')
  const [selectedNames, setSelectedNames] = useState<string[]>([])

  const [sortType, setSortType] = useState<SortType | undefined>()
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.desc)
  const [searchQuery, setSearchQuery] = useState('')

  const { showDataInput } = useTransactionFlow()
  const handleExtend = () => {
    showDataInput(`extend-names-${selectedNames.join('-')}`, 'ExtendNames', {
      names: selectedNames,
    })
  }

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    currentPage,
    isLoading: namesLoading,
    status: namesStatus,
    pageLength,
  } = useNamesFromAddress({
    address,
    sort: {
      type: sortType || SortType.expiryDate,
      orderDirection: sortDirection,
    },
    page,
    resultsPerPage: pageSize,
    search: searchQuery,
  })

  const loading =
    isConnecting || isReconnecting || namesLoading || namesStatus === 'loading' || !router.isReady

  useProtectedRoute('/', loading ? true : address && address !== '')

  return (
    <Content
      title={t('title')}
      subtitle={`${t('subtitle.start')} ${isSelf ? t('subtitle.your') : t('subtitle.this')} ${t(
        'subtitle.wallet',
      )}`}
      alwaysShowSubtitle
      singleColumnContent
      spacing={spacing}
    >
      {{
        trailing: (
          <TabWrapperWithButtons>
            <NameTableHeader
              mode={mode}
              sortType={sortType}
              sortTypeOptionValues={[
                SortType.expiryDate,
                SortType.labelName,
                SortType.creationDate,
              ]}
              sortDirection={sortDirection}
              searchQuery={searchQuery}
              selectedCount={selectedNames.length}
              onModeChange={setMode}
              onSortDirectionChange={setSortDirection}
              onSortTypeChange={setSortType}
              onSearchChange={setSearchQuery}
            >
              {mode === 'select' && (
                <Button size="extraSmall" shadowless onClick={handleExtend}>
                  <ButtonInner>
                    <FastForwardSVG />
                    {t('action.extend', { ns: 'common' })}
                  </ButtonInner>
                </Button>
              )}
            </NameTableHeader>
            {loading && (
              <EmptyDetailContainer>
                <Spinner color="accent" />
              </EmptyDetailContainer>
            )}
            {!loading && currentPage && pageLength > 0 && (
              <NameListView
                currentPage={currentPage}
                network={chainId}
                rowsOnly
                mode={mode}
                selectedNames={selectedNames}
                onSelectedNamesChange={setSelectedNames}
              />
            )}
            {!loading && pageLength < 1 && (!currentPage || currentPage.length === 0) && (
              <EmptyDetailContainer>{t('empty')}</EmptyDetailContainer>
            )}
            <NameTableFooter
              current={page}
              onChange={(value) => setPage(value)}
              total={pageLength}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </TabWrapperWithButtons>
        ),
      }}
    </Content>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ContentGrid $spacing={spacing}>{page}</ContentGrid>
}
