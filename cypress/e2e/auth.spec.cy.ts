describe('Sign up functionality', () => {
  beforeEach(() => {
    cy.visit('https://ai-resume-gilt.vercel.app/')
  })
  it('Should Sign up with valid credentials', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('.text-sm > .text-primary').click()
    cy.location("pathname").should("eq", "/signup")
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('testuser@test.com')
    cy.get('input[name="password"]').type('Test@1234')
    cy.get('input[name="confirmPassword"]').type('Test@1234')
    cy.get('button').contains('Sign Up').click()
    cy.get('.toast').should('be.visible').and('contain', 'Signup successful!')
    cy.location("pathname").should("eq", "/login")
    cy.task('findInMongo', { name: 'Test User' }).then((doc) => {
      expect(doc).to.have.property('email', 'testuser@test.com')
    })
  })
})