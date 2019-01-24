# wunderflats_test

This is a test suite written for a job application at Wunderflats. I have used WDIO in combination with Mocha (a test structure framework) and Chai (an assertion library). The specification was to test the account page and make sure all fields could be updated successfully. As I was not given access to the database, I could not prepopulate the database with a test user automatically, each time the tests were run. This meant that a user had to be created at the start of each test session. This is done automatically by the test suite, via the sign-up page on the website.

## Install

1. If you don't already have Node.js and NPM installed, install them. NPM comes installed with Node.js, so you only need to install Node.js.
2. Install Google Chrome, if you don't already have it installed
2. Checkout this repository to a folder on your computer
3. Open a command prompt
4. Change directory to the parent directory of *wunderflats_test*
5. Run:

```
npm install
```
## Run
From the command line, run:
```
npm run test
```

## Test architecture

There are multiple things that need to be considered when designing tests.

#### Tests need to truly assert the things they are testing

i.e. I needed to assert that changes to the users' profile were actually updated on the backend, and not merely on the frontend. Without access to the database, the best way I can do this is by refreshing the page, after each field has been updated. This ensures that the data is re-requested from the backend, and we can assert that the data shown is also present in the backend. The alternative to this is simply checking the field value, after the submit button has been pressed. This does not, however, check that data has been updated on the backend (this may merely be a frontend update). Ideally, I would have access to the database, and would be able to check the values have been updated there, instead of having to refresh the page, after each field update, because a) this method is slower b) it is possible the front-end data is cached somehow.

#### Benefits of not writing DRY tests

It is often heard that programmers should write their code as DRY as possible - i.e. Don't repeat yourself. However, in my experience writing automated tests, this is not always of benefit, as this actually increases workload, when exceptions arise. If tests are written programmatically (i.e. repeating themselves), this allows for easier maintenance, when no features, or variations in elements arise. e.g. it's easier to change one block of code, rather than having to refactor an abstraction, and making sure the abstraction works with all other areas of code it is supposed to work with. A problem with automated e2e tests is that they are bulky and cumbersome to maintain - new features are added or changed all the time, and they need to reflect the current production state as fast as possible.

#### The tests follow the Mocha test design structure

So, follow a parent-child structure, which is as representative of the page as possible. I.e. elements and objects are tested in a hierachy, in order of largest to smallest. This allows for concise reporting and maintenance of tests.

#### Folder Structure

There are three folders inside the *test* folder. One for test specifications called *spec*, one for helper functions called *helpers*, and one for data called *data*.

#### Element test structure

Even though the scope of this project was only to test whether fields could be updated successfully, I have made it habit to always test for the following things:
- element is displayed
- element contains expected content
- element is interactable

Testing these assertions, before other tests take place, allows for clearer reporting, and hence faster debugging, and hence faster project development.

i.e. If I try to update a field which isn't displayed, the test will return a failure, but in the test titled 'element can be updated', when actually the problem is that the element is not visible. This is, therefor, a false-positive, and should be avoided by testing for the other assertions first.

#### CSS selectors

Ideally, I would have access to the full codebase, and would be free to add/change HTML element ID's as necessary, to allow for accurate and fast element selection. As I don't have access to the codebase, some of my selectors are based on classes, which can potentially lead to conflicts if changes are introduced.

#### The Telephone element
This proved irritatingly tricky for me, as the telephone input seems to have some sort of JS interacting/modifying its expected behaviour. I was unable to delete the \<input\> elements value directly using WDIO commands, and instead had to use a work-around using the keyboard to delete the contents 'manually'.

Additionally, there is some validation on the phone number field, and so a German phone number is rejected, when a UK dial code is used. This had to be accounted for in the test. i.e. UK dial code, with valid UK phone number, and vice-versa for a German phone number. I believe the validation is simply phone number length, however.
