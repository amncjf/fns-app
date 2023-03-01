import { mockFunction, render } from '@app/test-utils'

import { decodeFuses, encodeFuses } from '@fildomains/fnsjs/utils/fuses'
import { ReactNode } from 'react'

import { NameDetailItem } from './NameDetailItem'
import { TaggedNameItem } from './TaggedNameItem'

jest.mock('./NameDetailItem')
jest.mock('@app/components/@atoms/ExpiryComponents/ExpiryComponents')

const mockNameDetailItem = mockFunction(NameDetailItem)

const mockComponent = ({ children }: { children: ReactNode }) => <div>{children}</div>
const renderHelper = ({
  fil,
  controller,
  registrant,
  wrappedOwner,
  notOwned,
  fuses,
}: {
  fil?: boolean
  controller?: boolean
  registrant?: boolean
  wrappedOwner?: boolean
  notOwned?: boolean
  fuses?: number
}) =>
  render(
    <TaggedNameItem
      name={fil ? 'name.fil' : 'name'}
      isController={controller}
      isRegistrant={registrant}
      isWrappedOwner={wrappedOwner}
      fuses={typeof fuses !== 'undefined' ? decodeFuses(fuses) : undefined}
      notOwned={notOwned}
      network={1}
      expiryDate={'2020-01-01' as any}
    />,
  )
mockNameDetailItem.mockImplementation(mockComponent as any)

describe('TaggedNameItem', () => {
  describe('unwrapped', () => {
    describe('.fil', () => {
      it('should show all tags as disabled by default', () => {
        const { getByTestId } = renderHelper({ fil: true })
        expect(getByTestId('tag-name.manager-false')).toBeInTheDocument()
        expect(getByTestId('tag-name.owner-false')).toBeInTheDocument()
      })
      it('should show enabled owner tag when user is registrant', () => {
        const { getByTestId } = renderHelper({ fil: true, registrant: true })
        expect(getByTestId('tag-name.manager-false')).toBeInTheDocument()
        expect(getByTestId('tag-name.owner-true')).toBeInTheDocument()
      })
      it('should show enabled manager tag when user is controller', () => {
        const { getByTestId } = renderHelper({ fil: true, controller: true })
        expect(getByTestId('tag-name.manager-true')).toBeInTheDocument()
        expect(getByTestId('tag-name.owner-false')).toBeInTheDocument()
      })
      it('should show both enabled tags when user is both controller and registrant', () => {
        const { getByTestId } = renderHelper({ fil: true, controller: true, registrant: true })
        expect(getByTestId('tag-name.manager-true')).toBeInTheDocument()
        expect(getByTestId('tag-name.owner-true')).toBeInTheDocument()
      })
    })
    describe('other', () => {
      it('should only show manager tag, disabled by default', () => {
        const { getByTestId, queryByText } = renderHelper({ fil: false })
        expect(getByTestId('tag-name.manager-false')).toBeInTheDocument()
        expect(queryByText('name.owner')).not.toBeInTheDocument()
      })
      it('should show enabled manager tag when user is controller', () => {
        const { getByTestId, queryByText } = renderHelper({ fil: false, controller: true })
        expect(getByTestId('tag-name.manager-true')).toBeInTheDocument()
        expect(queryByText('name.owner')).not.toBeInTheDocument()
      })
    })
  })
  describe('wrapped', () => {
    describe('.fil', () => {
      it('should only show owner tag, disabled by default', () => {
        const { getByTestId, queryByText } = renderHelper({
          fil: true,
          wrappedOwner: false,
          fuses: encodeFuses({ parent: { named: ['PARENT_CANNOT_CONTROL'] } }),
        })
        expect(getByTestId('tag-name.owner-false')).toBeInTheDocument()
        expect(queryByText('name.manager')).not.toBeInTheDocument()
      })
      it('should show enabled owner tag when user is owner', () => {
        const { getByTestId, queryByText } = renderHelper({
          fil: true,
          wrappedOwner: true,
          fuses: encodeFuses({ parent: { named: ['PARENT_CANNOT_CONTROL'] } }),
        })
        expect(getByTestId('tag-name.owner-true')).toBeInTheDocument()
        expect(queryByText('name.manager')).not.toBeInTheDocument()
      })
    })
    describe('other', () => {
      it('should show manager tag as disabled by default', () => {
        const { getByTestId, queryByText } = renderHelper({
          fil: false,
          wrappedOwner: false,
          fuses: 0,
        })
        expect(getByTestId('tag-name.manager-false')).toBeInTheDocument()
        expect(queryByText('name.owner')).not.toBeInTheDocument()
      })
      it('should show owner tag when PCC is burned, disabled by default', () => {
        const { getByTestId, queryByText } = renderHelper({
          fil: false,
          wrappedOwner: false,
          fuses: encodeFuses({ parent: { named: ['PARENT_CANNOT_CONTROL'] } }),
        })
        expect(getByTestId('tag-name.owner-false')).toBeInTheDocument()
        expect(queryByText('name.manager')).not.toBeInTheDocument()
      })
      it('should show enabled manager tag when user is wrapped owner', () => {
        const { getByTestId, queryByText } = renderHelper({
          fil: false,
          wrappedOwner: true,
          fuses: 0,
        })
        expect(getByTestId('tag-name.manager-true')).toBeInTheDocument()
        expect(queryByText('name.owner')).not.toBeInTheDocument()
      })
      it('should show enabled owner tag when user is wrapped owner and PCC is burned', () => {
        const { getByTestId, queryByText } = renderHelper({
          fil: false,
          wrappedOwner: true,
          fuses: encodeFuses({ parent: { named: ['PARENT_CANNOT_CONTROL'] } }),
        })
        expect(getByTestId('tag-name.owner-true')).toBeInTheDocument()
        expect(queryByText('name.manager')).not.toBeInTheDocument()
      })
      it('should show not owned tag and override all other tags if enabled', () => {
        const { getByTestId, queryByText } = renderHelper({
          fil: false,
          wrappedOwner: true,
          fuses: 0,
          notOwned: true,
        })
        expect(getByTestId('tag-name.notOwned-false')).toBeInTheDocument()
        expect(queryByText('name.manager')).not.toBeInTheDocument()
        expect(queryByText('name.owner')).not.toBeInTheDocument()
      })
    })
  })
})
