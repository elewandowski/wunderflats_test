const {user} = require('../data/user.js')

exports.signUp = (email) => {
    const signUpModal = $('.SignupModal')
    signUpModal.waitForDisplayed()  

    const firstNameField = $('#firstName')
    firstNameField.waitForExist()
    firstNameField.setValue(user.firstName)
    expect(firstNameField.getValue()).to.equal(user.firstName)

    const lastNameField = $('#lastName')
    lastNameField.waitForExist()
    lastNameField.setValue(user.lastName)
    expect(lastNameField.getValue()).to.equal(user.lastName)

    const emailField = $('#email')
    emailField.waitForExist()
    emailField.setValue(email)
    expect(emailField.getValue()).to.equal(email)

    const telephoneField = $('.CustomPhoneNumberInput-phoneNumber')
    telephoneField.waitForExist()
    telephoneField.setValue(user.telephone)
    expect(telephoneField.getValue()).to.equal(user.telephone)

    const passwordField = $('#password')
    passwordField.waitForExist()
    passwordField.setValue(user.password)
    expect(passwordField.getValue()).to.equal(user.password)

    const passwordConfirmationField = $('#passwordConfirmation')
    passwordConfirmationField.waitForExist()
    passwordConfirmationField.setValue(user.password)
    expect(passwordConfirmationField.getValue()).to.equal(user.password)

    const tosField = $('.tos-label input')
    tosField.waitForExist()
    tosField.click()
    expect(tosField.isSelected()).to.equal(true)

    const submitButtonField = $('.Button--primary')
    submitButtonField.waitForExist()
    submitButtonField.click()
}