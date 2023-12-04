import React from 'react'
import AppProjects from './AppProjects'

describe('<AppProjects />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AppProjects />)
  })
})