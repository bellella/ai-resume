describe('Sign up functionality', () => {
  beforeEach(() => {
    cy.visit('https://ai-resume-gilt.vercel.app/')
  })
  it('Should Sign up with valid credentials', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('.text-sm > .text-primary').click()
    
  })
})