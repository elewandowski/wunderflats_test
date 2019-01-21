// describe('Login page', () => {
//     before(() => {
//         browser.url('https://en-master.wunderflats.xyz/login?redirect=/my/account')
//     })

//     describe('Login Modal', ()=> {
//         it('should be visible', () => {
//             const loginModal = $('.LoginModal')
//             loginModal.waitForDisplayed()
//         })
//         describe('Email field', () => {
//             // before(() => {
                
//             // })
//             it('should be visible', () => {
//                 const emailField = $('#email')

//                 emailField.waitForExist()
//             })
//             it('should allow text input', () => {
//                 const emailField = $('#email')
//                 const email = 'test@email.de'

//                 emailField.setValue(email)
//                 expect(emailField.getValue()).to.equal(email)
//             })
//         })
//     })
// })