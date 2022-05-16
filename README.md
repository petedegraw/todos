# Todo App

A todo app built using HTML, CSS, and JavaScript. Includes testing via Cypress.

## Development

- install dependencies, run `yarn install`
- local server, run `yarn start`
- testing, run `yarn start`, then `yarn test` ([video recording of Cypress running](https://www.dropbox.com/s/16bemoyi95eh8yj/Cypress%20Recording%20Sep-02-2021%2014-55-14.mp4?dl=0))

## Testing

`yarn playwright test`
Runs the end-to-end tests.

`yarn playwright test --project=chromium`
Runs the tests only on Desktop Chrome.

`yarn playwright test example.spec.ts`
Runs the tests in the specific file.

`yarn playwright test --debug`
Runs the tests in debug mode.

We suggest that you begin by typing:
`yarn playwright test`

To open last HTML report run:
`npx playwright show-report`