exports.uniqueifyEmail = (origEmail) => {
    function unixTimestamp () { return Math.round((new Date()).getTime() / 1000) }
    const splitEmail = origEmail.split('@')
    const finalEmail = `${splitEmail[0].split('+')[0]}+${unixTimestamp()}+${browser.sessionId.slice(0,5)}@${splitEmail[1]}`
    return finalEmail
  }

exports.emptyFieldUsingKeyboard = (fieldSel) => {
  // Start at the beginning of the text input, and delete from the start.
  // I had problems calculating the end of the text string, so this method, removes 
  // the requirement of deleting from the end of the text
  $(fieldSel).moveTo(2, 2)
  browser.positionClick()
  let fieldContent = $(fieldSel).getValue().split('')
  fieldContent.forEach(() => { browser.keys('Delete') })
  expect($(fieldSel).getValue()).to.equal('')
}