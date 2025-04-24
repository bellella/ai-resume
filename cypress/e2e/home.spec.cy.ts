describe('Home Page',() => {
    beforeEach(() => {
        cy.visit('https://ai-resume-gilt.vercel.app/')
    })
    context('Home Page Display', () => {
        it('Should have the correct title', () => {
            cy.title().should('eq', 'AI Resume')
        })
        context('Section 1',() => {
            it('Should have the correct heading', () => {
                cy.get('section').eq(0).get('h1').should('contain', 'Create Professional Resumes with AI')
            })
            it('Should have a button with text "Create Resume" on the header section', () => {
                cy.get('section').eq(0).get('button').contains('Create Resume').should('be.visible')
            })
            it('Should have a button with text "Log in" on the header section', () => {
                cy.get('section').eq(0).get('button').contains('Log in').should('be.visible')
            })
        })
        context('Section 2',() => {
            it('Should have the correct heading', () => {
                cy.get('section').eq(1).get('h2').should('contain', 'Features that Make the Difference')
            })
            it('Should display three features', () => {
                cy.get('section').eq(1).find('h3').should('have.length', 3)
                cy.get('section').eq(1).find('h3').eq(0).should('contain', 'AI Content Generation')
                cy.get('section').eq(1).find('h3').eq(1).should('contain', 'Professional Templates')
                cy.get('section').eq(1).find('h3').eq(2).should('contain', 'Quick & Easy')
            })
        })
        context('Section 3',() => {
            it('Should have the correct heading', () => {
                cy.get('section').eq(2).get('h2').should('contain', 'Professional Templates')
            })
            it('Should display three steps', () => {
                cy.get('section').eq(2).find('h3').should('have.length', 3)
                cy.get('section').eq(2).find('h3').eq(0).should('contain', 'Template 1')
                cy.get('section').eq(2).find('h3').eq(1).should('contain', 'Template 2')
                cy.get('section').eq(2).find('h3').eq(2).should('contain', 'Template 3')
                it('Should have a button with text "Get Started"', () => {
                    cy.get('button').contains('Get Started').should('be.visible')
                })
            })
        })
        context('Section 4',() => {
            it('Should have the correct heading', () => {
                cy.get('section').eq(3).get('h2').should('contain', 'What Our Users Say')
            })
            it('Should display three testimonials', () => {
                cy.get('section').eq(3).find('div').eq(0).find('div').eq(2).children('div').should('have.length', 3)
                cy.get(':nth-child(1) > .p-6 > .space-x-2 > :nth-child(2) > .font-medium').should('contain', 'User 1')
                cy.get(':nth-child(2) > .p-6 > .space-x-2 > :nth-child(2) > .font-medium').should('contain', 'User 2')
                cy.get(':nth-child(3) > .p-6 > .space-x-2 > :nth-child(2) > .font-medium').should('contain', 'User 3')
            })
        })
        context('Section 5',() => {
            it('Should have the correct heading', () => {
                cy.get('section').eq(4).get('h2').should('contain', 'Ready to Create Your Professional Resume?')
            })
            it('Should have a button with text "Create Resume" on the footer section', () => {
                cy.get('section').eq(4).find('button').contains('Create Resume').should('be.visible')
            })
            it('Should have a button with text "Log in" on the header section', () => {
                cy.get('section').eq(4).find('button').contains('Log in').should('be.visible')
            })
        })
    })

    context('Navigation', () => {
        it('Should navigate to the "Create Resume" page when "Create Resume" button in the first section is clicked', () => {
            cy.get('section').eq(0).find('button').contains('Create Resume').click()
            cy.location("pathname").should("eq", "/resumes/new")
        })
        it('Should navigate to the "Log in" page when "Log in" button in the first section is clicked', () => {
            cy.get('section').eq(0).find('button').contains('Log in').click()
            cy.location("pathname").should("eq", "/login")
        })
        it('Should navigate to the "Create Resume" page when "Get Started" button in the third section is clicked', () => {
            cy.get('button').contains('Get Started').click()
            cy.location("pathname").should("eq", "/resumes/new")
        })
        it('Should navigate to the "Create Resume" page when "Create Resume" button in the last section is clicked', () => {
            cy.get('section').eq(4).find('button').contains('Create Resume').click()
            cy.location("pathname").should("eq", "/resumes/new")
        })
        it('Should navigate to the "Log in" page when "Log in" button in the last section is clicked', () => {
            cy.get('section').eq(4).find('button').contains('Log in').click()
            cy.location("pathname").should("eq", "/login")
        })
    })
})