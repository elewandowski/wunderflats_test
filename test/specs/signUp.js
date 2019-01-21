const user = require('../data/user.json')
const {uniqueifyEmail} = require('../helpers/generic.js')


describe('Signup page', () => {
    before(() => {
        browser.url('https://en-master.wunderflats.xyz/signup?redirect=/my/account')
    })

    /*   
        One can create a generic function here in order to write concise code, or one can be explicit and
        create individual functions for each input field. I prefer the latter, as exceptions can always 
        arise inbetween fields, and handling exceptions is always easier, when each test is defined individually.
    */

    describe('Signup Modal', ()=> {
        it('should be visible', () => {
            const signUpModal = $('.SignupModal')
            signUpModal.waitForDisplayed()
        })
        describe('First Name field', () => {
            it('should be visible', () => {
                const firstNameField = $('#firstName')
                firstNameField.waitForExist()
            })
            it('should allow text input', () => {
                const firstNameField = $('#firstName')

                firstNameField.setValue(user.firstName)
                expect(firstNameField.getValue()).to.equal(user.firstName)
            })
        })

        describe('Last Name field', () => {
            it('should be visible', () => {
                const lastNameField = $('#lastName')

                lastNameField.waitForExist()
            })
            it('should allow text input', () => {
                const lastNameField = $('#lastName')

                lastNameField.setValue(user.lastName)
                expect(lastNameField.getValue()).to.equal(user.lastName)
            })
        })


        describe('Email field', () => {

            it('should be visible', () => {
                const emailField = $('#email')

                emailField.waitForExist()
            })
            it('should allow text input', () => {
                const emailField = $('#email')

                emailField.setValue(uniqueifyEmail(user.email))
                expect(emailField.getValue()).to.equal(user.email)
            })
        })

        describe('Telephone field', () => {
            it('should be visible', () => {
                const telephoneField = $('.CustomPhoneNumberInput-phoneNumber')

                telephoneField.waitForExist()
            })
            it('should allow text input', () => {
                const telephoneField = $('.CustomPhoneNumberInput-phoneNumber')

                telephoneField.setValue(user.telephone)
                expect(telephoneField.getValue()).to.equal(user.telephone)
            })
        })

        describe('Password field', () => {
            it('should be visible', () => {
                const passwordField = $('#password')

                passwordField.waitForExist()
            })
            it('should allow text input', () => {
                const passwordField = $('#password')

                passwordField.setValue(user.password)
                expect(passwordField.getValue()).to.equal(user.password)
            })
        })

        describe('Password Confirmation field', () => {
            it('should be visible', () => {
                const passwordConfirmationField = $('#passwordConfirmation')

                passwordConfirmationField.waitForExist()
            })
            it('should allow text input', () => {
                const passwordConfirmationField = $('#passwordConfirmation')

                passwordConfirmationField.setValue(user.password)
                expect(passwordConfirmationField.getValue()).to.equal(user.password)
            })
        })

        describe('Terms of Use field', () => {
            it('should be visible', () => {
                const tosField = $('.tos-label input')

                tosField.waitForExist()
            })
            it('should allow selection', () => {
                const tosField = $('.tos-label input')

                tosField.click()
                expect(tosField.isSelected()).to.equal(true)
            })
        })

        describe(('Submit Button'), () => {
            it('should be visible', () => {
                const submitButtonField = $('.Button--primary')

                submitButtonField.waitForExist()
            })
            it('should allow selection', () => {
                const submitButtonField = $('.Button--primary')

                submitButtonField.click()
                browser.debug()
            })
        })
    })
})