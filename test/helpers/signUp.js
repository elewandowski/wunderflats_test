const {user} = require('../data/user.js')

exports.signUp = (email) => {
    /* 
        This script automates the signup of a user
     */

    const signUpModal = $('.SignupModal')
    signUpModal.waitForDisplayed()

    const fillField = (selector, input) => {
        $(selector).waitForDisplayed()
        $(selector).setValue(input)
    }

    const loginFields = [
        {
            name: 'First Name',
            selector: '#firstName',
            input: user.firstName
        },
        {
            name: 'Last Name',
            selector: '#lastName',
            input: user.lastName
        },
        {
            name: 'Email',
            selector: '#email',
            input: email
        },
        {
            name: 'Phone Number',
            selector: '.qa-phoneNumber',
            input: user.telephone
        },
        {
            name: 'Password',
            selector: '#password',
            input: user.password
        },
        {
            name: 'Password Confirmation',
            selector: '#passwordConfirmation',
            input: user.password
        }
    ]

    loginFields.forEach((field) => {
        fillField(field.selector, field.input)
    })

    const tosField = $('.tos-label input')
    tosField.waitForExist()
    tosField.click()
    
    const submitButtonField = $('.Button--primary')
    submitButtonField.waitForExist()
    submitButtonField.click()
}