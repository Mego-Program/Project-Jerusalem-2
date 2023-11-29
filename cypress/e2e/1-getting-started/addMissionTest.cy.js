describe('AddTaskButton', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });
    

    if(it('is alredy exist test misiion',()=>{
        cy.get('.mission-card:has(.header:contains("test mission1111"))').should('not.exist')})){
    it('displays the add button and press', () => {
        
        cy.contains('.text_button', 'Add Task').click();
        cy.get('.MuiTypography-root' ,{ timeout: 10000 }).should('be.visible');
    });


it('write new task',()=>{
    cy.contains('.text_button', 'Add Task').click();
    cy.get('.MuiTypography-root' ,{ timeout: 10000 }).should('be.visible');
    cy.get('input[name="header"]').type('test mission1111');
    cy.get('input[name="content"]').type('test mission');
    cy.get('input[name="category"]').type('test mission');
    cy.get('input[name="milestone"]').type('test mission');
    cy.get('input[name="issueType"]').type('test mission');
    cy.contains('button', 'Add Task').click();
})

it('new mission display',()=>{
    const newMission = cy.get('.mission-card:has(.header:contains("test mission1111"))');
   newMission.should('exist')
   
})}

    it('delete the mission', () => {
        const testM = cy.get('.mission-card:has(.header:contains("test mission1111"))')
        testM.should('exist')
        testM.find('.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root[data-testid="DeleteTwoToneIcon"]').click()
        const confrm = cy.get('.confirm', { timeout: 10000 })
        confrm.should('be.visible');
        confrm.find('button:contains("Delete")').click()
    });
    


it('dleted',()=>{
    const newMission = cy.get('.mission-card:has(.header:contains("test mission1111"))');
   newMission.should('not.exist')
})

    
})