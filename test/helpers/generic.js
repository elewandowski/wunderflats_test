exports.uniqueifyEmail = (origEmail) => {
    function unixTimestamp () { return Math.round((new Date()).getTime() / 1000) }
    const splitEmail = origEmail.split('@')
    const finalEmail = `${splitEmail[0]}+${unixTimestamp()}+${browser.sessionId}@${splitEmail[1]}`
    return finalEmail
  }