# check-pr-fixes-issue

![Unit tests](https://github.com/DARMA-tasking/check-pr-fixes-issue/workflows/Unit%20tests/badge.svg)

The DARMA-tasking/check-pr-fixes-issue/ is a JavaScript action that checks if PR description contains phrase "Fixes #issue". It also checks if PR title, description and branch mention the same issue number.

## Workflow example

```yml
name: PR description check

on:
  pull_request:
    types: [opened, edited, reopened]

jobs:
  check:
    name: Check PR description
    runs-on: ubuntu-latest
    steps:
      - uses: DARMA-tasking/check-pr-fixes-issue@master
        with:
          pr_title: ${{ github.event.pull_request.title }}
          pr_description: ${{ github.event.pull_request.body }}
```

## Development

Install the dependencies

```bash
$ npm install
```

Run the tests

```bash
$ npm test

 PASS  tests/helpers.test.js
  checkPrBranch function
    ✓ checks if PR branch starts with an issue number (2 ms)
  checkPrTitle function
    ✓ checks if PR title starts with an issue number (3 ms)
  checkPrDescription function
    ✓ checks if PR description contains phrase "Fixes #issue" (2 ms)
  extractBranchIssue function
    ✓ extracts issue number from PR branch (1 ms)
  extractTitleIssue function
    ✓ extracts issue number from PR title (1 ms)
  ...
```

Run lint

```bash
$ npm run lint

> check-pr-fixes-issue@1.0.0 lint /home/strz/repos/darma/src/check-pr-fixes-issue
> eslint .
```

## Distribution

Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules. Packaging the action will create a packaged action in the `dist/` folder.

Run prepare

```bash
$ npm run prepare
```

Since the packaged index.js is run from the `dist/` folder, it needs to be added

```bash
$ git add dist/
```

GitHub Actions will run the entry point from the `action.yml`

```yml
runs:
  using: "node12"
  main: "dist/index.js" # <== entry point
```

To do everything at once (lint, prepare and test) do

```bash
$ npm run all
```
