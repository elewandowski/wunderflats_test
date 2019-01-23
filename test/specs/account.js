const {user} = require('../data/user.js')
const {signUp} = require('../helpers/signUp')
const {uniqueifyEmail, emptyFieldUsingKeyboard} = require('../helpers/generic.js')


describe('Account page', () => {

    const submitButtonSel = 'button[type="submit"]'
    const originalEmail = uniqueifyEmail(user.email)
    const newEmail = uniqueifyEmail('new-test@email.de')

    const clickSubmitButtonAndWaitForLoadToFinish = () => {
        $(submitButtonSel).click()
        const loadingOverlaySel = '.UserProfileForm--loading'
        $(loadingOverlaySel).waitForExist(null)
        $(loadingOverlaySel).waitForExist(null, true)
    }

    before(() => {
        // start url contains redirect to account page, to save click-through from landing page to settings page
        browser.url('https://en-master.wunderflats.xyz/signup?redirect=/my/account')
        signUp(originalEmail)
        // newEmail = uniqueifyEmail(user.email)
    })

    describe('Account Settings Card', () => {
        before(() => {
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
                clickSubmitButtonAndWaitForLoadToFinish()
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
                expect($(firstNameFieldSel).getValue()).to.equal(newFirstName)
            })
            it('can be updated', () => {
                clickSubmitButtonAndWaitForLoadToFinish
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
                expect($(lastNameFieldSel).getValue()).to.equal(newLastName)
            })
            it('can be updated', () => {
                clickSubmitButtonAndWaitForLoadToFinish()
                expect($(lastNameFieldSel).getValue()).to.equal(newLastName)
            })
        })
        describe('Email field', () => {
            const emailFieldSel = '#email'

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
                clickSubmitButtonAndWaitForLoadToFinish()
                expect($(emailFieldSel).getValue()).to.equal(newEmail)
            })
        })
        describe('Telephone field', () => {
            const phoneNumFieldSel = 'input.qa-phoneNumber'
            const validUkPhoneNumber = '2078763306'
            const newGermanPhoneNumber = '15737885624'

            describe('Phone number field', () => {
                it('is displayed', () => {
                    $(phoneNumFieldSel).waitForDisplayed()
                })
                it(`is initially set to ${user.telephone}`, () => {
                    expect($(phoneNumFieldSel).getValue()).to.equal(user.telephone)
                })
                it(`can be set to ${newGermanPhoneNumber}`, () => {
                    // need to empty the field manually first,
                    // beause the setValue() method isn't emptying the elements value's automatically.
                    // probably related to the react elements' JS behaviour
                    emptyFieldUsingKeyboard(phoneNumFieldSel)
                    $(phoneNumFieldSel).setValue(newGermanPhoneNumber)
                    expect($(phoneNumFieldSel).getValue()).to.equal(newGermanPhoneNumber)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndWaitForLoadToFinish()
                    expect($(phoneNumFieldSel).getValue()).to.equal(newGermanPhoneNumber)
                })
            })

            describe('Dial Code field', () => {
                const dialCodeFieldValueSel = '.CustomPhoneNumberInput-dialCode-container > input'
                const ukDialCode = {
                    text: 'GB',
                    number: '44'
                }
                const germanDialCode = {
                    text: 'DE',
                    number: '49'
                }

                describe('Drop down', () => {
                    const dropDownSel = '.CustomPhoneNumberInput-country'
                    
                    it('is displayed', () => {
                        $(dropDownSel).waitForDisplayed()
                    })
                    it(`is initially set to DE dial code`, () => {
                        // seems to be a delay in the data being rendered here. needed to introduce a wait
                        browser.waitUntil(() => $(dialCodeFieldValueSel).getValue() === germanDialCode.number)
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(user.dialCode)
                    })
                    it(`can be set to UK dial code, when valid UK phone number is also used`, () => {
                        emptyFieldUsingKeyboard(phoneNumFieldSel)
                        $(phoneNumFieldSel).setValue(validUkPhoneNumber)
                        $(`${dropDownSel}-select option[value="${ukDialCode.text}"]`).click()
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(ukDialCode.number)
                    })
                    it('can be updated', () => {
                        clickSubmitButtonAndWaitForLoadToFinish()
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(ukDialCode.number)
                    })
                })
                describe('Text input', () => {
                    it('can be set to DE dial code, when valid German number is used', () => {
                        // same applies to the text input field of the dial code - 
                        // it ignores setValue() commands, so needs to be manually emptied,
                        // before being changed
                        emptyFieldUsingKeyboard(phoneNumFieldSel)
                        $(phoneNumFieldSel).setValue(newGermanPhoneNumber)
                        emptyFieldUsingKeyboard(dialCodeFieldValueSel)
                        $(dialCodeFieldValueSel).setValue(germanDialCode.number)
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(germanDialCode.number)
                    })
                    it('can be updated', () => {
                        // emptyFieldUsingKeyboard(phoneNumFieldSel)
                        // $(phoneNumFieldSel).setValue(newPhoneNumber)
                        clickSubmitButtonAndWaitForLoadToFinish()
                        expect($(dialCodeFieldValueSel).getValue()).to.equal(germanDialCode.number)
                    })
                })
            })
        })
        describe('Nationality field', () => {
            const nationalityFieldSel = 'select[name="nationality"]'
            const ghanaianNationality = {
                name: 'Ghana',
                code: 'GH'
            }
            const ghanaNationalitySel = `${nationalityFieldSel} option[value="${ghanaianNationality.code}"]`

            it('is displayed', () => {
                $(nationalityFieldSel).waitForDisplayed()
            })
            it(`is initially set to ${user.nationality.code}`, () => {
                expect($(nationalityFieldSel).getValue()).to.equal(user.nationality.code)
            })
            it(`can be set to Ghana`, () => {
                $(ghanaNationalitySel).click()
                expect($(ghanaNationalitySel).getProperty('selected')).to.equal(true)
            })
            it('can be updated', () => {
                clickSubmitButtonAndWaitForLoadToFinish()
                expect($(ghanaNationalitySel).getProperty('selected')).to.equal(true)
            })
        })
    })
})