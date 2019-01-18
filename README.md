# RxJS Examples

The example RxJS tests are in the ```src/app/specs``` folder. As seen in the talk, they cover:
- Observables
- Subjects
- Operators

<hr>

Run the ```npm install``` from the root folder to install all dependencies.

This Angular application was created using the ```ng``` CLI command ```ng new rxjs-examples``` and the ```src/app/specs``` folder was subsequently added along with the example tests.

The ```karma.conf.js``` **browsers** option was change to *ChromeHeadless* so that the browser does not have to spin up in order for the tests to run.

To run all the tests in the app, open the terminal and run ```npm test``` from the app root folder.
