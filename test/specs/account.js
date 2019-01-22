const {user} = require('../data/user.js')
const {signUp} = require('../helpers/signUp')
const {uniqueifyEmail} = require('../helpers/generic.js')


describe('Account page', () => {

    const submitButtonSel = 'button[type="submit"]'
    const originalEmail = uniqueifyEmail(user.email)
    const newEmail = uniqueifyEmail(user.email)

    before(() => {
        // start url contains redirect to account page, to save click-through from landing page to settings page
        browser.url('https://en-master.wunderflats.xyz/signup?redirect=/my/account')
        signUp(originalEmail)
        // newEmail = uniqueifyEmail(user.email)
    })

    describe('Account Settings Card', () => {
        it('is displayed', () => {
            const accountSettingsCardSel = '.Card.ProfileManagementPage'
            $(accountSettingsCardSel).waitForDisplayed()
        })

        describe('Language field', () => {
            const languageFieldSel = '.Select-select[name="language"]'
            it('is displayed', () => {
                $(languageFieldSel).waitForDisplayed()
            })
            it('is initially set to DE', () => {
                expect($(languageFieldSel).getValue()).to.equal('de')
            })
            it('can be set to English', () => {
                const englishValSel = 'option[value="en"]'
                $(`${languageFieldSel} ${englishValSel}`).click()
            })
            it('can be updated', () => {
                $(submitButtonSel).click()
                expect($(languageFieldSel).getValue()).to.equal('en')
            })
        })
        describe('First Name field', () => {
            const firstNameFieldSel = '#firstName'
            const newFirstName = 'John'
            it('is displayed', () => {
                $(firstNameFieldSel).waitForDisplayed()
            })
            it(`is initially set to ${user.firstName}`, () => {
                expect($(firstNameFieldSel).getValue()).to.equal(user.firstName)
            })
            it(`can be set to ${newFirstName}`, () => {
                $(firstNameFieldSel).setValue(newFirstName)
            })
            it('can be updated', () => {
                $(submitButtonSel).click()
                expect($(firstNameFieldSel).getValue()).to.equal(newFirstName)
            })
        })
        describe('Last Name field', () => {
            const lastNameFieldSel = '#lastName'
            const newLastName = 'Doe'
            it('is displayed', () => {
                $(lastNameFieldSel).waitForDisplayed()
            })
            it(`is initially set to ${user.lastName}`, () => {
                expect($(lastNameFieldSel).getValue()).to.equal(user.lastName)
            })
            it(`can be set to ${newLastName}`, () => {
                $(lastNameFieldSel).setValue(newLastName)
            })
            it('can be updated', () => {
                $(submitButtonSel).click()
                expect($(lastNameFieldSel).getValue()).to.equal(newLastName)
            })
        })
        describe('Email field', () => {
            const emailFieldSel = '#email'


            before(() => {

                console.log(newEmail)
            })
            it('is displayed', () => {
                $(emailFieldSel).waitForDisplayed()
            })
            it(`is initially set to ${originalEmail}`, () => {
                expect($(emailFieldSel).getValue()).to.equal(originalEmail)
            })
            it(`can be set to ${newEmail}`, () => {
                $(emailFieldSel).setValue(newEmail)
                expect($(emailFieldSel).getValue()).to.equal(newEmail)
            })
            it('can be updated', () => {
                $(submitButtonSel).click()
                expect($(emailFieldSel).getValue()).to.equal(newEmail)
            })
        })
        describe('Telephone field', () => {
            const phoneNumFieldSel = '.CustomPhoneNumberInput-phoneNumber-container input'
            


            const newDialCode = '1'

            describe('Dial Code field', () => {
                const dialCodeFieldValueSel = '.CustomPhoneNumberInput-dialCode-container > input'
                const ukDialCode = {
                    text: 'GB',
                    number: '44'
                }

                describe('Drop down', () => {
                    const dropDownSel = '.CustomPhoneNumberInput-country'
                    
                    it('is displayed', () => {
                        // The rest of the element doesn't get rendered fully,
                        // until the flag figure is rendered, so we count the flag figure being rendered as the full
                        // element being rendered
                        $('.CustomPhoneNumberInput-country figure').waitForDisplayed()
                    })
                    it(`is initially set to ${user.dialCode}`, () => {
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(user.dialCode)
                    })
                    it(`can be set to UK dial code`, () => {
                        $(`${dropDownSel}-select option[value="${ukDialCode.text}"]`).click()
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(ukDialCode.number)
                    })
                    it('can be updated', () => {
                        $(submitButtonSel).click()
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(ukDialCode.number)
                    })
                })
                describe('Text input', () => {

                })

            })

            describe.skip('Phone number field', () => {
                it('is displayed', () => {
                    $(phoneNumFieldSel).waitForDisplayed()
                })
                it(`is initially set to ${user.telephone}`, () => {
                    
                    expect($(phoneNumFieldSel).getValue()).to.equal(user.telephone)
                })
                it(`can be set to ${newEmail}`, () => {
                    $(phoneNumFieldSel).setValue(newEmail)
                    expect($(phoneNumFieldSel).getValue()).to.equal(newEmail)
                })
                it('can be updated', () => {
                    $(submitButtonSel).click()
                    expect($(phoneNumFieldSel).getValue()).to.equal(newEmail)
                })
            })
        })
    })
})