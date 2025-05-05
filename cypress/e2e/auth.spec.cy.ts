describe('Sign up functionality', () => {
  beforeEach(() => {
    cy.visit('https://ai-resume-gilt.vercel.app/')
  })
  before(() => {
    cy.task('deleteTestUser', { email: 'testuser@test.com' });
  });
  it.only('Should Sign up with valid credentials', () => {
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
  it('Should display an error when signing up with an existing user', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('.text-sm > .text-primary').click()
    cy.location("pathname").should("eq", "/signup")
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('testuser@test.com')
    cy.get('input[name="password"]').type('Test@1234')
    cy.get('input[name="confirmPassword"]').type('Test@1234')
    cy.get('button').contains('Sign Up').click()
    cy.get('.toast').should('be.visible').and('contain', 'Signup failed. Please try again.')
    cy.task('findInMongo', { name: 'Test User' }).then((doc) => {
      expect(doc).to.have.property('email', 'testuser@test.com')
    })
  })
  it('Should display an error when passwords do not match', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('.text-sm > .text-primary').click()
    cy.location("pathname").should("eq", "/signup")
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('testuser@test.com')
    cy.get('input[name="password"]').type('CorrectPassword@1234')
    cy.get('input[name="confirmPassword"]').type('IncorrectPassword@1234')
    cy.get('button').contains('Sign Up').click()
    cy.get('.text-red-500').contains('Passwords do not match').should('be.visible')
  })
  it('Should display an error when password is less than 6 characters', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('.text-sm > .text-primary').click()
    cy.location("pathname").should("eq", "/signup")
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('testuser@test.com')
    cy.get('input[name="password"]').type('Short')
    cy.get('input[name="confirmPassword"]').type('Short')
    cy.get('button').contains('Sign Up').click()
    cy.get('.text-red-500').contains('Password must be at least 6 characters').should('be.visible')
  })
})

describe('Login functionality', () => {
  beforeEach(() => {
    cy.visit('https://ai-resume-gilt.vercel.app/')
  })

  it('Should login with valid credentials', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('input[name="email"]').type('testuser@test.com')
    cy.get('input[name="password"]').type('Test@1234')
    cy.get('button').contains('Login').click()
    cy.get('.toast').should('be.visible').and('contain', 'Login successful!') //error here - no toast message
    cy.location("pathname").should("eq", "/profile")
  })

  it('Should display an error when logging in without credentials', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('button').contains('Login').click()
    cy.get('.text-red-500').contains('Please enter a valid email address').should('be.visible')
    cy.get('.text-red-500').contains('Please enter your password').should('be.visible') 
  })
  
  it('Should display an error when logging in with unregistered user', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('input[name="email"]').type('unregistered@user.com')
    cy.get('input[name="password"]').type('WrongPassword@1234')
    cy.get('button').contains('Login').click()
    cy.get('.toast').should('be.visible').and('contain', 'Login failed. Please try again.') //issue - no error message for incorrect credentials
  })

  it('Should display an error if email is invalid (without @ and domain name).', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('input[name="password"]').type('Test@1234')
    cy.get('button').contains('Login').click()
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Please include an \'@\' in the email address. \'invalid-email\' is missing an \'@\'.');
    });
  })
  
  it('Should display an error if email is invalid (without domain name).', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('input[name="email"]').type('invalid-email@')
    cy.get('input[name="password"]').type('Test@1234')
    cy.get('button').contains('Login').click()
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Please enter a part following \'@\' in the email address. \'invalid-email@\' is incomplete.');
    });
  })

  it('Should display an error if password is incorrect', () => {
    cy.get('span').contains('Profile').parent().click()
    cy.location("pathname").should("eq", "/login")
    cy.get('input[name="email"]').type('testuser@test.com')
    cy.get('input[name="password"]').type('WrongPassword@1234')
    cy.get('button').contains('Login').click()
    cy.get('.toast').should('be.visible').and('contain', 'Login failed. Please try again.') //issue - no error message for password
  })
})
