import '../support/commands';

describe('Profile functionality', () => { 
    beforeEach(() => {
        cy.task('deleteDefaultResume', { email: 'testuser@test.com' })
        cy.visit('https://ai-resume-gilt.vercel.app/login');
        cy.get('input[name="email"]').type('testuser@test.com');
        cy.get('input[name="password"]').type('Test@1234');
        cy.get('button').contains('Login').click();
    })
    context('Update Personal Information', () => {
        it('Should update name and email', () => {
            cy.get('input[name="name"]').clear().type('Updated Name');
            cy.get('input[name="email"]').clear().type('testuserupdated@test.com');
            cy.get('button').contains('Save Changes').click();
            cy.task('findInMongo', { name: 'Updated Name' }).then((doc) => {
                expect(doc).to.have.property('email', 'testuserupdated@test.com') //not updated in the db
            })
        })
        it('Should display an error when email is already taken', () => {
          //to be created after fixing the update functionality
            /**
             * cy.get('input[name="email"]').clear().type('existinguser@test.com');
             * cy.get('button').contains('Save Changes').click();
             * cy.get('.text-red-500').contains('Email already exists').should('be.visible')
             * */
        })
        it('Should display an error when name is empty', () => {
            //to be created after fixing the update functionality
            /**
             * cy.get('input[name="name"]').clear();
             * cy.get('button').contains('Save Changes').click();
             * cy.get('.text-red-500').contains('Name is required').should('be.visible')
             * */
        })
        it('Should display an error when email is empty', () => {
            //to be created after fixing the update functionality
            /**
             * cy.get('input[name="email"]').clear();
             * cy.get('button').contains('Save Changes').click();
             * cy.get('.text-red-500').contains('Email is required').should('be.visible')
             * */
        })
    })
    context('Default Resume', () => {
        it.only('Should create default resume', () => {
            cy.get('button').contains('Default Resume').click();
            //Personal Information
            cy.get('input[name="firstName"]').type('Test');
            cy.get('input[name="lastName"]').type('User');
            cy.get('input[name="city"]').type('Test City');
            cy.get('input[name="province"]').type('Test Province');
            cy.get('input[name="postalCode"]').type('12345');
            cy.get('input[name="phone"]').type('1234567890');
            cy.get('input[name="email"]').type('testuser@test.com');

            //Work Experience
            cy.get('input[name="workExperiences.0.jobTitle"]').type('Software Engineer');
            cy.get('input[name="workExperiences.0.employer"]').type('Test Company');
            cy.get('input[name="workExperiences.0.city"]').type('Test City');
            cy.get('input[name="workExperiences.0.province"]').type('Test Province');
            cy.get('input[name="workExperiences.0.startDate"]').type('2022-01-01');
            cy.get('input[name="workExperiences.0.endDate"]').type('2023-01-01');

            //Education
            cy.get('input[name="educations.0.schoolName"]').type('Test University');
            cy.get('input[name="educations.0.schoolLocation"]').type('Test Location');
            cy.get('input[name="educations.0.degree"]').type('Bachelor of Science in Computer Science');
            cy.get('input[name="educations.0.fieldOfStudy"]').type('Computer Science');
            cy.get('input[name="educations.0.graduationMonth"]').type('April');
            cy.get('input[name="educations.0.graduationYear"]').type('2022');

            //Skills
            cy.get('.space-y-4 > :nth-child(2) > .flex').type('JavaScript{enter}');
            cy.get('textarea[name="professionalSummary"]').type('Test Professional Summary');
            cy.get('button').contains('Save Changes').click();
            cy.get('.toast').should('be.visible').and('contain', 'Default resume updated successfully')

            cy.task('findInMongo', { name: 'Test User' }).then((doc: { defaultResumeJson: any }) => {
                expect(doc.defaultResumeJson).to.have.property('firstName', 'Test')
                expect(doc.defaultResumeJson).to.have.property('lastName', 'User')
                expect(doc.defaultResumeJson).to.have.property('city', 'Test City')
                expect(doc.defaultResumeJson).to.have.property('province', 'Test Province')
                expect(doc.defaultResumeJson).to.have.property('postalCode', '12345')
                expect(doc.defaultResumeJson).to.have.property('phone', '1234567890')
                expect(doc.defaultResumeJson).to.have.property('email', 'testuser@test.com')
                expect(doc.defaultResumeJson.workExperiences[0]).to.have.property('jobTitle', 'Software Engineer')
                expect(doc.defaultResumeJson.workExperiences[0]).to.have.property('employer', 'Test Company')
                expect(doc.defaultResumeJson.workExperiences[0]).to.have.property('city', 'Test City')
                expect(doc.defaultResumeJson.workExperiences[0]).to.have.property('province', 'Test Province')
                expect(doc.defaultResumeJson.workExperiences[0]).to.have.property('startDate', '2022-01-01')
                expect(doc.defaultResumeJson.workExperiences[0]).to.have.property('endDate', '2023-01-01')
                expect(doc.defaultResumeJson.educations[0]).to.have.property('schoolName', 'Test University')
                expect(doc.defaultResumeJson.educations[0]).to.have.property('schoolLocation', 'Test Location')
                expect(doc.defaultResumeJson.educations[0]).to.have.property('degree', 'Bachelor of Science in Computer Science')
                expect(doc.defaultResumeJson.educations[0]).to.have.property('fieldOfStudy', 'Computer Science')
                expect(doc.defaultResumeJson.educations[0]).to.have.property('graduationMonth', 'April')
                expect(doc.defaultResumeJson.educations[0]).to.have.property('graduationYear', '2022')
                expect(doc.defaultResumeJson.skills[0]).to.equal('JavaScript')
                expect(doc.defaultResumeJson).to.have.property('professionalSummary', 'Test Professional Summary')
            })
        })
    })
})