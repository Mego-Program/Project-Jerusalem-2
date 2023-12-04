// cypress/integration/borderFilter.spec.js

describe('BorderFilter', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173'); // Update the URL accordingly
    });
  
    it('displays the default selected project', () => {
      // Check if the default selected project is displayed
      cy.get('.proj_name').should('contain.text', 'first board'); // Replace with your actual default project name
    });
  
    it('opens the dropdown menu on filter icon click', () => {
      // Click on the filter icon
      cy.get('.filter-icon').click();
  
      // Check if the dropdown menu is open
      cy.get('.drop_board').should('exist');
    });
  
    it('selects a project from the dropdown menu', () => {
      // Click on the filter icon to open the dropdown menu
      cy.get('.filter-icon').click();
  
      // Select a project from the dropdown menu
      cy.contains('li', 'ajha').click(); // Replace with your selected project name
  
      // Check if the selected project is displayed in the filter
      cy.get('.proj_name').should('contain.text', 'ajha');; // Replace with your selected project name
    });
  });
  