# OpenGate.js API

**OpenGate.js** is an ES6 JavaScript library that helps you integrate **OpenGate** easily in your JavaScript projects. Although it's an ES6 project it compiles into compliant ES5 JavaScript thanks to [Babel](https://babeljs.io/) and [`gulp`](http://gulpjs.com/), therefore you can use **OpenGate.js** in your browser application and in your Node.js server.

## Features

- The library is [isomorphic](http://isomorphic.net/), therefore you can use it in both client and server sides.
- [OpenGate North API](https://www.amplia-iiot.com/documentation/latest/api-north/opengate-api-north.html) (NAPI) supported.
    - Provision
    - Searches
    - Operations
- [OpenGate South API](https://www.amplia-iiot.com/documentation/latest/api-south/opengate-api-south.html) (SAPI) supported.
- Fluent API design.

## Development

Requires **Node.js 20.19 or newer**. The package manager is pinned in `package.json`, so `corepack enable` gives you the same yarn CI uses.

```bash
corepack enable
yarn install --frozen-lockfile
```

Dependencies come from the public npm registry. The repository no longer carries a `.npmrc` or `.yarnrc`: if you want to go through an internal mirror, configure it in your own `~/.npmrc` rather than committing it here.

| Command              | What it does                                                                     |
| -------------------- | -------------------------------------------------------------------------------- |
| `yarn test`          | Unit tests (vitest). No network, no OpenGate instance needed.                    |
| `yarn test:watch`    | The same suite, in watch mode.                                                   |
| `yarn test:coverage` | Unit tests with a coverage report in `coverage/`.                                |
| `yarn lint`          | ESLint. Errors break the build; warnings are pre-existing debt.                  |
| `yarn lint:fix`      | ESLint with autofix.                                                             |
| `yarn format`        | Prettier over the whole tree.                                                    |
| `yarn format:check`  | Fails if anything is unformatted.                                                |
| `yarn apidoc`        | Regenerates `build/api-model.json` and the `types/` declarations from the JSDoc. |
| `yarn test:e2e`      | Cucumber acceptance suite; needs a real OpenGate (see below).                    |

Every push and pull request runs lint, the unit tests and the API model generation on Node 20, 22 and 24.

## Documentation

To generate the API documentation you can execute `gulp build` and open the generated HTML on: **documentation/index.html**

In order to generate the documentation in relearn format (always after last step):

```bash
yarn docs:relearn
```

You must copy the content from _ogapi-docs/_.md to the odm-documentation-hugo project in *content/libs/ogapi-docs folder.

## Releasing

Publication to [npm](https://www.npmjs.com/package/opengate-js) is driven by the tag, and by nothing else:

1. Bump `version` in `package.json` (and `bower.json`) on `master`, and commit.
2. Tag that commit as `vX.Y.Z`, matching the version exactly.
3. Push the tag.

Pushing the tag runs `.github/workflows/release.yml`, which refuses to continue if the tag and `package.json` disagree, then lints, tests, regenerates the type declarations through `prepack`, publishes to npm with [provenance](https://docs.npmjs.com/generating-provenance-statements), and opens a GitHub release carrying `api-model.json`.

It needs one repository secret: **`NPM_TOKEN`**, an npm automation token with publish rights on `opengate-js`.

Consumers update with:

```bash
yarn upgrade opengate-js@[version]
```

## Tests

### Unit tests

```bash
yarn test
```

They run in isolation, in milliseconds, and are what CI gates on. New code should arrive with them.

### Acceptance tests

The Cucumber suite talks to a real OpenGate instance. Before running it you must configure:

- features/support/world.js
  -- this.test_url_north
  -- this.test_url_south
  -- this.apikey - API_KEY of the user used to create the different entities in the test
  -- this.YOUR_EMAIL - email of the user used to create the different entities in the test. If it is not configured here, it must be configured in each of the features to be executed if necessary
  -- this.YOUR_PASSWORD - password of the user used to create the different entities in the test. If it is not configured here, it must be configured in each of the features to be executed if necessary

- features/feaures/**.feature
  -- require-real-apikey: API_KEY of the user used to create the different entities in the test
  -- YOUR_EMAIL: email of the user used to create the different entities in the test. If it is not configured here, it must be configured in features/suppport/world.js file
  -- YOUR_PASSWORD: password of the user used to create the different entities in the test. If it is not configured here, it must be configured in features/suppport/world.js file

Never commit those credentials. Supply them through the environment variables that `world.js` already reads.

You can run the tests by running the following command:

```bash
$ gulp cucumber [--tags @[tags]]
```
