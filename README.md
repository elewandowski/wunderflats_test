# wunderflats_test

This is a test suite to test the account settings page on the Wunderflats website. Specifically, that all fields on the page can be updated successfully.

The suite uses WDIO in combination with Mocha and Chai.

## Install

#### Prerequisites
- Node.js & NPM
- Google Chrome

#### Instructions

1. Clone the *wunderflats_test* repository to a folder on your computer
2. Open a command prompt
3. Change directory to the parent directory of *wunderflats_test*
4. Run:

```
npm install
```
## Run
From the command line, run:
```
npm run test
```

## Test architecture overview

This is an overview of what the test script does:

- creates a new user via the signup page (as we don't have access to the database)
- navigates to the account page
- does the following for each field:
- - checks it is displayed
- - checks it contains the original expected content
- - checks the field can be changed - i.e. the value in the field is editable
- - checks the field can be updated - i.e. the page can submit the form to the backend, and that on page refresh, the new value is still present in the field.

I made the decision to test each field individually, instead of testing every field at once, even though every field is submitted at once to the backend by a single POST request. I did this for the sake of better user emulation, and test granularity (and hence better reporting).

Additionally, I would like to explain other design choices I have made.

#### Prequisite tests

In order to test our main feature (can fields be updated succesfully), it's best to test that prerequisite steps can achieved successfully. If we don't do this, we risk getting false-positives (i.e. the test tries to update a field, but the field is not even visible or editable). This is why I have the `is displayed` and `can be changed` tests for each field. The `contains original expected content` test isn't technically a prerequisite, but, in a complete account page test suite, would be necessary - so here I'm simply future-proofing myself.

#### Making accurate assertions

When designing tests, you need to be careful that your assertions are testing the correct value. e.g. In the `can be updated` test, I chose to refresh the page after submitting the form - using the `clickSubmitButtonAndRefresh()` method. Otherwise, the test would make an assumption that simply pressing the submit button makes a successful POST request. Refreshing the page and then checking the fields' content proves that the server has updated the field and that the POST request was succesful. 

However, there is the possiblity that the page caches variables over refreshes, making this assertion inaccurate, but to investigate this thoroughly, I would need more time.

#### Benefits of not writing DRY tests

It is often heard that programmers should write their code as DRY as possible - i.e. don't repeat yourself. However, in my experience, this is not always of benefit when writing automated tests, as this actually increases workload, when exceptions arise. If tests are written programmatically (i.e. repeating themselves), this allows for easier maintenance, when features change in the future.

However, in my signup script, I use an abstract method, as I didn't intend to test anything. I only intended to move through it as fast as possible.

#### The Mocha test design structure

The tests follow a parent-child structure, which is representative of the account page. I.e. elements and objects are tested in a hierachy, in order of largest to smallest. This allows for concise reporting and maintenance of tests.

#### CSS selectors

Ideally, I would have had access to the full codebase, and would be free to add/change HTML element ID's as necessary, to allow for accurate and fast element selection. As I don't have access to the codebase, some of my selectors are based on classes, which can potentially lead to conflicts if changes are introduced.

#### The Telephone element

This proved irritatingly tricky for me, as the telephone input seems to have some sort of JS interacting/modifying its expected behaviour. I was unable to delete the `<input>` elements value directly using WDIO commands, and instead had to use a work-around using the keyboard to delete the contents 'manually'.

Additionally, there is some validation on the phone number field, and so a German phone number is rejected, when a UK dial code is used. This had to be accounted for in the test. i.e. UK dial code, with valid UK phone number, and vice-versa for a German phone number. I believe the validation is simply phone number length, however.

#### CI

These tests would ideally be introduced into the CI pipeline and would be run on developers feature branches, before being allowed to merge to master. Obviously, if their new feature changes an old feature, then the approriate tests would need to be updated before merging to master.

#### Reporting

The test uses the `spec` reporter. This displays all succesful tests heirachically, along with any errors, if they occurred. If succesful, your test results should look like this: 

```
[chrome #0-0] Spec: /Users/emil/Documents/wunder/wunderflats_test/test/specs/account.js
[chrome #0-0] Running: chrome
[chrome #0-0]
[chrome #0-0] Account page
[chrome #0-0]     Account Settings Card
[chrome #0-0]         Language field
[chrome #0-0]            ✓ is displayed
[chrome #0-0]            ✓ is initially set to DE
[chrome #0-0]            ✓ can be set to English
[chrome #0-0]            ✓ can be updated
[chrome #0-0]
[chrome #0-0]         First Name field
[chrome #0-0]            ✓ is displayed
[chrome #0-0]            ✓ is initially set to Emil
[chrome #0-0]            ✓ can be set to John
[chrome #0-0]            ✓ can be updated
[chrome #0-0]
[chrome #0-0]         Last Name field
[chrome #0-0]            ✓ is displayed
[chrome #0-0]            ✓ is initially set to Lewandowski
[chrome #0-0]            ✓ can be set to Doe
[chrome #0-0]            ✓ can be updated
[chrome #0-0]
[chrome #0-0]         Email field
[chrome #0-0]            ✓ is displayed
[chrome #0-0]            ✓ is initially set to email+1548423755+16c16@test.de
[chrome #0-0]            ✓ can be set to new-test+1548423755+16c16@email.de
[chrome #0-0]            ✓ can be updated
[chrome #0-0]
[chrome #0-0]         Telephone field
[chrome #0-0]             Phone number field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially set to 15711561241
[chrome #0-0]                ✓ can be set to 15737885624
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]             Dial Code field
[chrome #0-0]                 Drop down
[chrome #0-0]                    ✓ is displayed
[chrome #0-0]                    ✓ is initially set to DE dial code
[chrome #0-0]                    ✓ can be set to UK dial code, when valid UK phone number is used
[chrome #0-0]                    ✓ can be updated
[chrome #0-0]
[chrome #0-0]                 Text input
[chrome #0-0]                    ✓ can be set to DE dial code, when valid German number is used
[chrome #0-0]                    ✓ can be updated
[chrome #0-0]
[chrome #0-0]         Nationality field
[chrome #0-0]            ✓ is displayed
[chrome #0-0]            ✓ is initially set to DE
[chrome #0-0]            ✓ can be set to Ghana
[chrome #0-0]            ✓ can be updated
[chrome #0-0]
[chrome #0-0]         Date of Birth field
[chrome #0-0]            ✓ is displayed
[chrome #0-0]            ✓ is initially blank
[chrome #0-0]            ✓ can be set to 01.02.1990
[chrome #0-0]            ✓ can be updated
[chrome #0-0]
[chrome #0-0]         Address field
[chrome #0-0]             First line field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially blank
[chrome #0-0]                ✓ can be set to 23 Main street
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]             Second line field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially blank
[chrome #0-0]                ✓ can be set to Second floor
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]             Zip Code field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially blank
[chrome #0-0]                ✓ can be set to 13322
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]             City field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially blank
[chrome #0-0]                ✓ can be set to Berlin
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]             Region field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially blank
[chrome #0-0]                ✓ can be set to Berlin
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]             Nationality field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially set to DE
[chrome #0-0]                ✓ can be set to Ghana
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]         Employment Details
[chrome #0-0]             Job Title field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially blank
[chrome #0-0]                ✓ can be set to Software Engineer
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0]             Company Name field
[chrome #0-0]                ✓ is displayed
[chrome #0-0]                ✓ is initially blank
[chrome #0-0]                ✓ can be set to wunderflats
[chrome #0-0]                ✓ can be updated
[chrome #0-0]
[chrome #0-0] 66 passing (26.2s)
```