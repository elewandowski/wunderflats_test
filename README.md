# wunderflats_test

This is a test suite written for a job application at Wunderflats. The specification was to test the [account page](https://wunderflats.com/my/account) and make sure all fields could be updated successfully. As I was not given access to the database, I could not prepopulate the database with a test user automatically, each time the tests were run. This meant that a user had to be created at the start of each test session. This is done automatically by the test suite, via the sign-up page on the website.

Installation

```
npm run install
```
Execution
```
npm run test
```