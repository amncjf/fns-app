import { acceptMetamaskAccess, connectFromExisting } from '../../setup'

describe('Profile Editor', () => {
  before(() => {
    acceptMetamaskAccess(2, true)
  })

  it('should force a name on the old registry to go to update registry', () => {
    cy.visit('/legacy.test')
    connectFromExisting()
    cy.contains('Edit profile').click()
    cy.findByTestId('warning-overlay').should('be.visible')
    cy.contains('Your registry is out of date').should('be.visible')
    cy.findByTestId('warning-overlay-dismiss').should('exist').click()
    cy.findByTestId('profile-editor').should('not.exist')
  })

  it('should force a user without a resolver set to migrate resolver', () => {
    cy.visit('/tld/reverse')
    connectFromExisting()
    cy.contains('Edit profile').click()
    cy.findByTestId('warning-overlay').should('be.visible')
    cy.contains('No resolver assigned').should('be.visible')
    cy.findByTestId('warning-overlay-dismiss').should('exist').click()
    cy.findByTestId('profile-editor').should('not.exist')
  })

  it('should be able to update resolver if profile has been migrated but resolver has not been updated', () => {
    cy.visit('/migrated-resolver-to-be-updated.eth')
    connectFromExisting()
    cy.contains('Edit profile').click()
    cy.findByTestId('warning-overlay').should('be.visible')
    cy.get('button').contains('Update').click()
    cy.findByTestId('transaction-modal-confirm-button').should('not.be.disabled').click()
    cy.confirmMetamaskTransaction()
    cy.findByTestId('transaction-modal-complete-button').click()
    cy.contains('0x3C4...293BC').should('be.visible')
  })

  it('should be able to migrate account to new resolver', () => {
    cy.visit('/test123.eth')
    connectFromExisting()
    cy.contains('Edit profile').click()
    cy.findByTestId('warning-overlay').should('be.visible')
    cy.get('[data-testid=warning-overlay-dismiss]').should('be.visible')
    cy.get('button').contains('Update').click()
    cy.findByTestId('transfer-profile-trailing-btn').should('not.be.disabled').click()
    cy.findByTestId('transaction-modal-confirm-button').should('not.be.disabled').click()
    cy.confirmMetamaskTransaction()
    cy.findByTestId('transaction-modal-complete-button').click()
    cy.findByTestId('transaction-modal-confirm-button').should('not.be.disabled').click()
    cy.confirmMetamaskTransaction()
    cy.findByTestId('transaction-modal-complete-button').click()
    cy.contains('0x709...c79C8').should('be.visible')
  })

  it('should be able to update account', () => {
    cy.visit('/wrapped.eth')
    connectFromExisting()
    cy.contains('Edit profile').click()
    cy.findByPlaceholderText('John Smith').type('Test Name')
    cy.findByText('Save').should('not.be.disabled').click()
    cy.findByTestId('transaction-modal-confirm-button').should('not.be.disabled').click()
    cy.confirmMetamaskTransaction()
    cy.findByTestId('transaction-modal-complete-button').click()
    cy.wait(1000)
    cy.reload()
    cy.contains('Test Name').should('be.visible')
  })
})
