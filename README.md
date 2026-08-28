# OpenGate.js

JavaScript client for the [OpenGate](https://www.amplia-iiot.com/) IoT platform, by Amplía Soluciones.

It wraps both platform APIs behind a fluent, promise-based interface, and it is [isomorphic](http://isomorphic.net/): the same code runs in Node.js and in the browser.

**📖 [Full reference documentation](https://documentation.opengate.es/libs/ogapi-docs/index.html)**

- [OpenGate North API](https://www.amplia-iiot.com/documentation/latest/api-north/opengate-api-north.html) (NAPI) — provisioning, search, operations.
- [OpenGate South API](https://www.amplia-iiot.com/documentation/latest/api-south/opengate-api-south.html) (SAPI) — data collection.

```bash
npm install opengate-js
```

Installing straight from the repository (a git dependency, or `yarn link` against a clone) works
too: `dist/` and `types/` are not committed, so the `prepare` script builds them at install time.
That needs the dev dependencies, so `--ignore-scripts` leaves the package without an entry point.

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

| Option                     | Meaning                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `url`                      | Base URL of the North API. Required.                                                                                                |
| `apiKey`                   | Sent as `X-ApiKey`.                                                                                                                 |
| `jwt`                      | Sent as `Authorization: Bearer …`. **Takes precedence over `apiKey`** on North API calls.                                           |
| `timeout`                  | Milliseconds. Defaults to `5000`; `-1` disables the timeout entirely.                                                               |
| `south.url`                | Base URL of the South API. Only needed if you call it — omitting it and then calling south throws `OGAPI_SOUTH_URL_NOT_CONFIGURED`. |
| `hooks.beforeStart`        | Called with each request just before it leaves — see [Transport](#transport).                                                       |
| `mocks`                    | Answers matching requests locally instead of calling OpenGate — see [Transport](#transport).                                        |
| `_internalCountriesFilter` | Required by `newCountriesCatalog()`; see its JSDoc. `{ organization, identifier, ds }`.                                             |
| `logger`                   | Where the library's own messages go. `false` silences it, `true` reports everything — see [Logging](#logging).                      |

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

With a bundler (Vite, webpack, Rollup, Nuxt), import the package by name. Nothing else is needed —
the same entry point serves the browser and the server:

```js
import OpenGateAPI from 'opengate-js';

const ogapi = new OpenGateAPI({ url: 'https://opengate.example.com', apiKey: '…' });
```

An application that expects the library on the global object needs one more line, and every other
file can keep using `window.OpenGateAPI` unchanged:

```js
import OpenGateAPI from 'opengate-js';
window.OpenGateAPI = OpenGateAPI;
```

Prefer this over importing the browser bundle by path: it tree-shakes, and the path does not change
with every release.

Without a bundler, the package ships a self-contained bundle that defines `window.OpenGateAPI`:

```html
<script src="node_modules/opengate-js/dist/opengate-api-bower-16.0.0.min.js"></script>
<script>
    var ogapi = new OpenGateAPI({ url: 'https://opengate.example.com', apiKey: '…' });
</script>
```

The bundle carries the version in its filename, so this path changes with every release.

It is built for `<script src>` only. Being an IIFE it exports nothing, and importing it from a module
— `import 'opengate-js/dist/opengate-api-bower-16.0.0.js'` — throws `RangeError: Maximum call stack
size exceeded` as it evaluates: the bundle contains a `require.resolve` call that reaches esbuild's
`__require` helper, a self-referencing Proxy whose getter re-enters itself. Because `import` is
hoisted, this happens before any line of the importing file runs, so it looks as though nothing
executed at all. Use the bare `import OpenGateAPI from 'opengate-js'` above instead, which is the
supported way to reach the library from a bundler.

## Transport

Requests go over **`fetch`**, which every supported runtime provides natively: Node.js 20.19+, and
any browser the bundle targets. There is no HTTP client dependency to install, and none to keep
patched.

One exception, deliberately kept: **upload progress**. `fetch` reports none, in any browser, and
progress is public API on `ManufacturerMedia`, `ModelMedia` and `DeploymentElement`. So when a
progress callback is supplied, a multipart upload goes over `XMLHttpRequest` in the browser, and
over a counted stream in Node. Either way the callback receives `{ direction, loaded, total,
percent }`.

```js
ogapi.newManufacturerMediaBuilder().withProgressEvent(event => console.log(`${event.percent.toFixed(0)}%`));
```

### hooks.beforeStart

The callback is handed the request that is about to leave, and may still change it:

```js
new OpenGateAPI({
    url: '…',
    apiKey: '…',
    hooks: {
        beforeStart: request => {
            request.method; // 'GET'
            request.url; // the whole URL, query string included
            request.set('X-Correlation-Id', correlationId()); // takes effect
        }
    }
});
```

The hook is process-wide — one callback for every client, last registration wins — which is what it
has always been.

### Provisioning a device

A device needs six fields before the platform will accept it, and it reports an omission one at a
time. The full set, and why it is not validated client-side, is documented on
`entityBuilder.devicesBuilder()`; the short version:

```js
const builder = await ogapi.entityBuilder.devicesBuilder('myorg');
await builder
    .with('provision.device.identifier', 'my-device')
    .with('provision.administration.identifier', 'my-device')
    .with('provision.administration.organization', 'myorg')
    .with('provision.administration.channel', 'default_channel')
    .with('provision.administration.plan', 'dev__100_per_day')
    .with('provision.administration.serviceGroup', 'emptyServiceGroup')
    .create();
```

`with()` warns and ignores a datastream the organization does not allow, so check the name if a value
does not arrive. `ogapi.newDevicePlansFinder().findByOrganization(org)` lists the valid plans.

## Logging

The library keeps quiet. Nothing reaches your console except a warning when a call has been misused —
a value outside an enum, a filter carrying both `and` and `or`, a response that would not parse.
Per-request logging exists but sits at `debug`/`info`, which are silent by default.

```js
new OpenGateAPI({ url, apiKey }); // warnings and errors only
new OpenGateAPI({ url, apiKey, logger: false }); // nothing at all
new OpenGateAPI({ url, apiKey, logger: true }); // everything, for debugging
new OpenGateAPI({ url, apiKey, logger: myLogger }); // { debug, info, warn, error }
```

A logger you supply is authoritative: levels it leaves out are silent rather than falling back to the
console. Like `hooks.beforeStart`, the setting is process-wide and the last one wins.

### mocks

`mocks` answers matching requests locally, which is how the acceptance suite covers paths a live
platform will not produce on demand. Handlers are keyed by verb and then by URL pattern, where
`:name` matches one path segment:

```js
new OpenGateAPI({
    url: 'https://opengate.example.com',
    mocks: {
        get: {
            '/north/v80/provision/organizations/:organization': request => ({
                statusCode: 200,
                body: { name: request.params.organization }
            })
        }
    }
});
```

**The pattern must spell out the whole path after the base URL**, `north/v80` included; it is
matched against the full URL, so a pattern that starts at `/provision/...` matches nothing and the
request reaches the platform. Like the hook, the registry is process-wide and routes accumulate for
the life of the process.

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

| Command                   | What it does                                                               |
| ------------------------- | -------------------------------------------------------------------------- |
| `yarn test`               | Unit tests (vitest). No network, no OpenGate instance needed.              |
| `yarn test:watch`         | The same suite, in watch mode.                                             |
| `yarn test:coverage`      | Unit tests with a coverage report in `coverage/`.                          |
| `yarn lint`               | ESLint. Errors break the build; warnings are pre-existing debt.            |
| `yarn lint:fix`           | ESLint with autofix.                                                       |
| `yarn format`             | Prettier over the whole tree.                                              |
| `yarn format:check`       | Fails if anything is unformatted.                                          |
| `yarn apidoc`             | Regenerates the API model and the type declarations.                       |
| `yarn test:e2e`           | Cucumber acceptance suite; needs a real OpenGate. **Writes and deletes.**  |
| `yarn smoke`              | Read-only checks against a live OpenGate, under Node. Needs `yarn build`.  |
| `yarn smoke:browser`      | The same checks inside a real browser, via Lightpanda over CDP.            |
| `yarn verify:browser`     | Transport checks in a real browser: progress, Blob, cancellation, hooks.   |
| `yarn e2e:coverage`       | Walks the client API against a live platform from a real browser.          |
| `yarn e2e:coverage:serve` | Serves the same page so you can drive it yourself.                         |
| `yarn build`              | Builds `dist/`: the CommonJS tree, the ESM entry and both browser bundles. |

Every push and pull request runs lint, the unit tests and the API model generation on Node 20, 22 and 24.

### Proving it against a live platform

`yarn test:e2e` creates and deletes real entities, so it belongs on a test instance and must never be
pointed at production. The smoke suite exists for the case where the real thing is the only
convincing proof: every check in `test/smoke/checks.js` is a read, and nothing may be added there
that is not.

```bash
yarn build
OGAPI_URL=https://opengate.example.com OGAPI_USER=… OGAPI_PASSWORD=… OGAPI_ORG=… yarn smoke
OGAPI_URL=… OGAPI_USER=… OGAPI_PASSWORD=… OGAPI_ORG=… yarn smoke:browser
```

Both runs execute the same checks, one under Node and one inside a browser engine, because a
transport change is only proven when the two runtimes agree.

### Verifying the transport in a browser

This library is the core of the OpenGate web GUI, so anything the transport does differently in a
browser is a production problem. `yarn verify:browser` runs `test/browser/transport-checks.js` inside
a real engine and covers what only a browser can answer: upload progress over `XMLHttpRequest`,
`asBlob` returning a real `Blob`, cancellation, timeouts, and the object `hooks.beforeStart` hands to
application code. The local fixtures it serves make all of that testable without writing to a
platform; the four checks that do talk to OpenGate are reads, and run only when the `OGAPI_*`
variables are set.

```bash
yarn build
yarn verify:browser                                  # real Chrome
OGAPI_BROWSER=obscura     yarn verify:browser
OGAPI_BROWSER=lightpanda  yarn verify:browser
OGAPI_BUNDLE=/tmp/previous-bundle.js yarn verify:browser   # compare against another build
```

`OGAPI_BUNDLE` is what makes it more than a pass or a fail: point it at a bundle built from the
previous revision and run both in the same engine. A check that fails on both is a limitation of the
engine, not a regression. Measured that way, real Chrome passes every check, while Obscura 0.2.1 and
Lightpanda emit no XHR upload-progress events and fail that one check on **either** build.

### Walking the API surface from a browser

`yarn verify:browser` proves the transport. It says nothing about the 51 search builders, 40 finders
and 4 catalogues hanging off the client, which is what actually needs checking before a release.
`yarn e2e:coverage` walks all of it — 120 checks — against a live platform from a real browser.

```bash
yarn build
OGAPI_URL=… OGAPI_USER=… OGAPI_PASSWORD=… OGAPI_ORG=… yarn e2e:coverage
OGAPI_E2E_SERVE=1 yarn e2e:coverage      # serve the page and drive it yourself
```

It authenticates the way an application does: `usersBuilder().login(email, password)` POSTs to
`provision/users/login`, and the run then carries the `jwt` from the response as
`Authorization: Bearer …`. `OGAPI_AUTH=apikey` switches to the `apiKey` that the same login returns,
because on this platform the two are **not** interchangeable — `/planner` only accepts the JWT,
`/scheduler` only the api key — and being able to measure that is the point.

Factories are discovered from the client rather than listed, so a new one is covered the day it is
added. Reads are chained: identifiers harvested from the search lane feed the finders that need one,
so the second tier runs against real devices, channels and datamodels rather than invented ids.

**Everything it runs by default is a read**, and each search is capped at one row. Two write lanes
exist and are **off** unless `OGAPI_ALLOW_WRITES=1`:

- an **Area** — create, read, update, read, delete, confirm gone. Metadata only: no device, no
  datastream, no collection.
- a **device**, which is the round trip the platform exists to do: provision it, find it by id, find
  it through a filtered search, **feed it a datapoint over the south API**, poll the searches, then
  remove it and confirm it is gone. Removal has a fallback that does not go through the builder,
  because a stray device in a production organization is not acceptable.

The south lane is why the client is built with both credentials: the transport sends the JWT north and
never south, so the api key from the same login is what makes `collect/iot` reachable.

Outcomes are finer than pass/fail on purpose, because "the platform has nothing there" and "the
library is broken" are different facts: `pass`, `empty` (204, or a 404 saying so), `denied` (401/403),
`absent` (endpoint not served here), `blocked`, `fail` and `skip`. Only `fail` is a defect.

`blocked` means the request never left the browser, which in practice is the CORS preflight. Several
OpenGate service paths — `north/v80/timeseries`, `north/v80/datasets`, `/scheduler`, `/planner` —
answer `OPTIONS` with 401 or 403, and a preflight carries no credentials by design, so **no browser
can reach them cross-origin**. Same-origin callers, which is how the web GUI is served, are
unaffected. To keep that separate from a real defect the runner then runs the identical suite under
Node, where there is no preflight, and reports only the checks where the two runtimes disagree.

### Layout

- `src/` — the library, one directory per domain.
- `test/unit/` — unit tests, including `regressions/`, which pins defects that already shipped.
- `features/` — Cucumber acceptance suite, run against a live OpenGate.
- `tools/apidoc/` — generates the API model and the declarations from the JSDoc.
- `dist/` — build output. **Not in the repository**: run `yarn build`, and `prepare` produces it on install and on publish.

## Testing

```bash
yarn test
```

Unit tests run in milliseconds and are what CI gates on. New behaviour should arrive with them.

The Cucumber suite talks to a real OpenGate instance and reads `API_NORTH_INTERNAL`, `API_SOUTH_INTERNAL`, `API_KEY`, `YOUR_EMAIL` and `YOUR_PASSWORD` from the environment. Never commit those values.

```bash
yarn build && yarn test:e2e [--tags @tag]
```

Certificate verification is disabled for that run, because test instances tend to carry self-signed
certificates. Set `OGAPI_E2E_STRICT_TLS=1` to keep it on.

## Releasing

Publication to [npm](https://www.npmjs.com/package/opengate-js) is driven by the tag and by nothing else:

1. Bump `version` in `package.json` on `develop`, and commit.
2. Tag that commit `vX.Y.Z`, matching the version exactly.
3. Push the tag.

Releases are tagged on `develop`. `master` is frozen at `14.15.0` and is not the release branch. There
is no `bower.json` any more, despite the name of the browser bundle.

`.github/workflows/release.yml` refuses to continue if the tag and `package.json` disagree, then lints, tests, regenerates the declarations through `prepare`, publishes with [provenance](https://docs.npmjs.com/generating-provenance-statements), and opens a GitHub release carrying `api-model.json`.

It needs one repository secret, `NPM_TOKEN`: an npm automation token with publish rights.

## Contributing

[AGENTS.md](AGENTS.md) carries the conventions: linting policy, commit format, and what a pull request should include.

## License

ISC. See [LICENSE](LICENSE).
