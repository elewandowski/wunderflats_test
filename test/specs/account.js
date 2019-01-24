const {user} = require('../data/user.js')
const {signUp} = require('../helpers/signUp')
const {uniqueifyEmail, emptyFieldUsingKeyboard} = require('../helpers/generic.js')


describe('Account page', () => {

    const submitButtonSel = 'button[type="submit"]'
    const originalEmail = uniqueifyEmail(user.email)
    const newEmail = uniqueifyEmail('new-test@email.de')

    const clickSubmitButtonAndRefreshPage = () => {
        $(submitButtonSel).click()
        // pause here to wait for the submit POST request to succeed
        browser.pause(300)
        browser.refresh()
    }

    before(() => {
        // start url contains redirect to account page, to save click-through from landing page to settings page
        browser.url('https://en-master.wunderflats.xyz/signup?redirect=/my/account')
        signUp(originalEmail)
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
                clickSubmitButtonAndRefreshPage()
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
                clickSubmitButtonAndRefreshPage
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
                clickSubmitButtonAndRefreshPage()
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
                clickSubmitButtonAndRefreshPage()
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
                    clickSubmitButtonAndRefreshPage()
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
                        clickSubmitButtonAndRefreshPage()
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
                        clickSubmitButtonAndRefreshPage()
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
                clickSubmitButtonAndRefreshPage()
                expect($(ghanaNationalitySel).getProperty('selected')).to.equal(true)
            })
        })
        describe('Date of Birth field', () => {
            const dobSel = '.DateTextInput-inputs'
            const daySel = `${dobSel} .DateTextInput-day`
            const monthSel = `${dobSel} .DateTextInput-month`
            const yearSel = `${dobSel} .DateTextInput-year`

            const dobObjectToString = (dob) => (
                `${dob.day}.${dob.month}.${dob.year}`
            )
            const getDobValue = () => {
                return {
                    day: $(daySel).getValue(),
                    month: $(monthSel).getValue(),
                    year: $(yearSel).getValue()
                }
            }
            const setDobValue = (dob) => {
                $(daySel).setValue(dob.day)
                $(monthSel).setValue(dob.month)
                $(yearSel).setValue(dob.year)
            }

            it('is displayed', () => {
                $(dobSel).waitForDisplayed()
            })
            it(`is initially blank`, () => {
                const blankDob = {
                    day: '',
                    month: '',
                    year: ''
                }
                expect(getDobValue()).to.deep.equal(blankDob)
            })
            it(`can be set to ${dobObjectToString(user.dob)}`, () => {
                setDobValue(user.dob)
                expect(getDobValue()).to.deep.equal(user.dob)
            })
            it('can be updated', () => {
                clickSubmitButtonAndRefreshPage()
                expect(getDobValue()).to.deep.equal(user.dob)
            })
        })
        describe('Address field', () => {
            describe('First line field', () => {
                const line1Sel = '#addressLine1'

                it('is displayed', () => {
                    $(line1Sel).waitForDisplayed()
                })
                it(`is initially blank`, () => {
                    expect($(line1Sel).getValue()).to.equal('')
                })
                it(`can be set to ${user.address.line1}`, () => {
                    $(line1Sel).setValue(user.address.line1)
                    expect($(line1Sel).getValue()).to.equal(user.address.line1)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(line1Sel).getValue()).to.equal(user.address.line1)
                })
            })
            describe('Second line field', () => {
                const line2Sel = '#addressLine2'

                it('is displayed', () => {
                    $(line2Sel).waitForDisplayed()
                })
                it(`is initially blank`, () => {
                    expect($(line2Sel).getValue()).to.equal('')
                })
                it(`can be set to ${user.address.line2}`, () => {
                    $(line2Sel).setValue(user.address.line2)
                    expect($(line2Sel).getValue()).to.equal(user.address.line2)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(line2Sel).getValue()).to.equal(user.address.line2)
                })
            })
            describe('Zip Code field', () => {
                const zipCodeSel = '#zipCode'

                it('is displayed', () => {
                    $(zipCodeSel).waitForDisplayed()
                })
                it(`is initially blank`, () => {
                    expect($(zipCodeSel).getValue()).to.equal('')
                })
                it(`can be set to ${user.address.zipCode}`, () => {
                    $(zipCodeSel).setValue(user.address.zipCode)
                    expect($(zipCodeSel).getValue()).to.equal(user.address.zipCode)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(zipCodeSel).getValue()).to.equal(user.address.zipCode)
                })
            })
            describe('City field', () => {
                const citySel = '#city'

                it('is displayed', () => {
                    $(citySel).waitForDisplayed()
                })
                it(`is initially blank`, () => {
                    expect($(citySel).getValue()).to.equal('')
                })
                it(`can be set to ${user.address.city}`, () => {
                    $(citySel).setValue(user.address.city)
                    expect($(citySel).getValue()).to.equal(user.address.city)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(citySel).getValue()).to.equal(user.address.city)
                })
            })
            describe('Region field', () => {
                const regionSel = '#region'

                it('is displayed', () => {
                    $(regionSel).waitForDisplayed()
                })
                it(`is initially blank`, () => {
                    expect($(regionSel).getValue()).to.equal('')
                })
                it(`can be set to ${user.address.region}`, () => {
                    $(regionSel).setValue(user.address.region)
                    expect($(regionSel).getValue()).to.equal(user.address.region)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(regionSel).getValue()).to.equal(user.address.region)
                })
            })
            describe('Nationality field', () => {
                const countryFieldSel = '#addressCountry'
                const ghanaianNationality = {
                    name: 'Ghana',
                    code: 'GH'
                }
                const ghanaCountrySel = `${countryFieldSel} option[value="${ghanaianNationality.code}"]`
    
                it('is displayed', () => {
                    $(countryFieldSel).waitForDisplayed()
                })
                it(`is initially set to ${user.nationality.code}`, () => {
                    expect($(countryFieldSel).getValue()).to.equal(user.address.country.code)
                })
                it(`can be set to Ghana`, () => {
                    $(ghanaCountrySel).click()
                    expect($(countryFieldSel).getValue()).to.equal(ghanaianNationality.code)
                    expect($(ghanaCountrySel).getProperty('selected')).to.equal(true)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(countryFieldSel).getValue()).to.equal(ghanaianNationality.code)
                    expect($(ghanaCountrySel).getProperty('selected')).to.equal(true)
                })
            })
        })
        describe('Employment Details', () => {
            describe('Job Title field', () => {
                const jobTitleSel = '#jobTitle'

                it('is displayed', () => {
                    $(jobTitleSel).waitForDisplayed()
                })
                it(`is initially blank`, () => {
                    expect($(jobTitleSel).getValue()).to.equal('')
                })
                it(`can be set to ${user.jobTitle}`, () => {
                    $(jobTitleSel).setValue(user.jobTitle)
                    expect($(jobTitleSel).getValue()).to.equal(user.jobTitle)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(jobTitleSel).getValue()).to.equal(user.jobTitle)
                })
            })
            describe('Company Name field', () => {
                const companyNameSel = '#companyName'

                it('is displayed', () => {
                    $(companyNameSel).waitForDisplayed()
                })
                it(`is initially blank`, () => {
                    expect($(companyNameSel).getValue()).to.equal('')
                })
                it(`can be set to ${user.companyName}`, () => {
                    $(companyNameSel).setValue(user.companyName)
                    expect($(companyNameSel).getValue()).to.equal(user.companyName)
                })
                it('can be updated', () => {
                    clickSubmitButtonAndRefreshPage()
                    expect($(companyNameSel).getValue()).to.equal(user.companyName)
                })
            })
        })
    })
})