# OpenGate.js

JavaScript client for the [OpenGate](https://www.amplia-iiot.com/) IoT platform, by Amplía Soluciones.

It wraps both platform APIs behind a fluent, promise-based interface, and it is [isomorphic](http://isomorphic.net/): the same code runs in Node.js and in the browser.

**📖 [Full reference documentation](https://documentation.opengate.es/libs/ogapi-docs/index.html)**

- [OpenGate North API](https://www.amplia-iiot.com/documentation/latest/api-north/opengate-api-north.html) (NAPI) — provisioning, search, operations.
- [OpenGate South API](https://www.amplia-iiot.com/documentation/latest/api-south/opengate-api-south.html) (SAPI) — data collection.

```bash
npm install opengate-js
```

## Quick start

```js
import OpenGateAPI from 'opengate-js';

const ogapi = new OpenGateAPI({
    url: 'https://opengate.example.com',
    apiKey: process.env.OPENGATE_API_KEY,
    timeout: 30000
});

const device = await ogapi.newDeviceFinder().findByOrganizationAndId('my-organization', 'my-device-id');
```

Every call returns a promise. A rejection carries the platform's own answer:

```js
try {
    await ogapi.newDeviceFinder().findByOrganizationAndId('my-organization', 'unknown');
} catch (error) {
    error.statusCode; // 404
    error.data; // the body OpenGate replied with
    error.headers;
}
```

Note that a rejection is a plain object today, not an `Error`. That is a known wart, on the list for the next major version.

## Configuration

| Option              | Meaning                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `url`               | Base URL of the North API. Required.                                                                                                |
| `apiKey`            | Sent as `X-ApiKey`.                                                                                                                 |
| `jwt`               | Sent as `Authorization: Bearer …`. **Takes precedence over `apiKey`** on North API calls.                                           |
| `timeout`           | Milliseconds. Defaults to `5000`; `-1` disables the timeout entirely.                                                               |
| `south.url`         | Base URL of the South API. Only needed if you call it — omitting it and then calling south throws `OGAPI_SOUTH_URL_NOT_CONFIGURED`. |
| `hooks.beforeStart` | Called before every request leaves.                                                                                                 |

## What it covers

The entry point exposes 51 factories, plus `ogapi.operations`, `ogapi.alarms` and `ogapi.entityBuilder`. Broadly:

- **Provisioning** — organizations, devices, entities, subscribers, subscriptions, tickets, areas, channels, domains, workgroups, users, device and organization plans.
- **Catalogue** — manufacturers, models, software, bundles, datamodels, datasets, countries, operation types.
- **Operations** — `ogapi.operations`, operation finders, periodicity actions, rule configuration.
- **Search** — `newFilterBuilder()` and `newSelectBuilder()` build the request body; `ogapi.EX` holds the expression helpers.
- **Time series** — finders, function catalogue and helpers.
- **Scheduling** — pipelines, REST requests, image executions and their history.
- **Bulk** — bulk builders, bulk executions, provision processors.
- **Security** — certificate finder and downloads.

Filters compose:

```js
const { EX } = ogapi;

EX.and(EX.eq('provision.device.identifier', 'dev-01'), EX.like('provision.device.name', 'gateway'));
// { and: [ { eq: { 'provision.device.identifier': 'dev-01' } }, { like: { … } } ] }
```

### The South API

`south.url` enables the collection endpoints that devices use to push data. Same client, same promise style:

```js
const ogapi = new OpenGateAPI({
    url: 'https://opengate.example.com',
    south: { url: 'https://opengate.example.com/south' },
    apiKey: process.env.OPENGATE_API_KEY
});
```

## In the browser

The package ships a browserified bundle that defines `window.OpenGateAPI`:

```html
<script src="node_modules/opengate-js/dist/opengate-api-bower-15.5.0.min.js"></script>
<script>
    var ogapi = new OpenGateAPI({ url: 'https://opengate.example.com', apiKey: '…' });
</script>
```

## TypeScript

Type declarations ship with the package and are generated from the JSDoc in `src/`, so they always describe the version you installed. No `@types/` package needed.

## Documentation

The published reference lives at **[documentation.opengate.es/libs/ogapi-docs](https://documentation.opengate.es/libs/ogapi-docs/index.html)**, and it is generated from this repository: the reference documentation **is** the JSDoc in `src/`. `tools/apidoc` turns it into a neutral API model and into the `.d.ts` files, so a wording fix belongs in `src/` and never downstream — see [tools/apidoc/README.md](tools/apidoc/README.md).

```bash
yarn apidoc          # build/api-model.json and types/
yarn docs:relearn    # Markdown for the documentation site
```

## Development

Requires **Node.js 20.19 or newer**. The package manager is pinned in `package.json`, so `corepack enable` gives you the same yarn CI uses.

```bash
corepack enable
yarn install --frozen-lockfile
yarn test
```

Dependencies come from the public npm registry. The repository deliberately ships no `.npmrc` or `.yarnrc`: if you want an internal mirror, configure it in your own `~/.npmrc` rather than committing it here.

| Command              | What it does                                                    |
| -------------------- | --------------------------------------------------------------- |
| `yarn test`          | Unit tests (vitest). No network, no OpenGate instance needed.   |
| `yarn test:watch`    | The same suite, in watch mode.                                  |
| `yarn test:coverage` | Unit tests with a coverage report in `coverage/`.               |
| `yarn lint`          | ESLint. Errors break the build; warnings are pre-existing debt. |
| `yarn lint:fix`      | ESLint with autofix.                                            |
| `yarn format`        | Prettier over the whole tree.                                   |
| `yarn format:check`  | Fails if anything is unformatted.                               |
| `yarn apidoc`        | Regenerates the API model and the type declarations.            |
| `yarn test:e2e`      | Cucumber acceptance suite; needs a real OpenGate.               |
| `gulp compile`       | Builds `dist/`.                                                 |

Every push and pull request runs lint, the unit tests and the API model generation on Node 20, 22 and 24.

### Layout

- `src/` — the library, one directory per domain.
- `test/unit/` — unit tests, including `regressions/`, which pins defects that already shipped.
- `features/` — Cucumber acceptance suite, run against a live OpenGate.
- `tools/apidoc/` — generates the API model and the declarations from the JSDoc.
- `dist/` — built artefacts. Generated; never edit by hand.

## Testing

```bash
yarn test
```

Unit tests run in milliseconds and are what CI gates on. New behaviour should arrive with them.

The Cucumber suite talks to a real OpenGate instance and reads `API_NORTH_INTERNAL`, `API_SOUTH_INTERNAL`, `API_KEY`, `YOUR_EMAIL` and `YOUR_PASSWORD` from the environment. Never commit those values.

```bash
gulp cucumber [--tags @tag]
```

## Releasing

Publication to [npm](https://www.npmjs.com/package/opengate-js) is driven by the tag and by nothing else:

1. Bump `version` in `package.json` and `bower.json` on `master`, and commit.
2. Tag that commit `vX.Y.Z`, matching the version exactly.
3. Push the tag.

`.github/workflows/release.yml` refuses to continue if the tag and `package.json` disagree, then lints, tests, regenerates the declarations through `prepack`, publishes with [provenance](https://docs.npmjs.com/generating-provenance-statements), and opens a GitHub release carrying `api-model.json`.

It needs one repository secret, `NPM_TOKEN`: an npm automation token with publish rights.

## Contributing

[AGENTS.md](AGENTS.md) carries the conventions: linting policy, commit format, and what a pull request should include.

## License

ISC. See [LICENSE](LICENSE).
