# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains domain-specific modules (alarms, operations, provisioning, timeseries, etc.) and shared utilities; entry points `opengate-api-npm.js` and `opengate-api-bower.js` assemble exports from here.
- `dist/` holds the build output and is not in the repository. It used to be committed, and for years it lagged behind its own source.
- `scripts/` holds the build (`build.mjs`), the acceptance runner (`e2e.mjs`) and the documentation generators; `manual/` contains product guidance.
- `tools/apidoc/` derives the API model and the TypeScript declarations from the JSDoc in `src/`; both outputs are generated, never committed.
- Unit tests live in `test/unit/`; acceptance tests in `features/`. `test/client/` holds browser mocha specs, dead since 2021 and not linted or run.

## Build, Test, and Development Commands

- Requires Node >= 20.19. Run `corepack enable`, then `yarn install --frozen-lockfile`.
- `yarn test` runs the vitest unit suite; `yarn test:watch` and `yarn test:coverage` are the usual variants.
- `yarn lint` runs ESLint, `yarn format` runs Prettier. Both are gated in CI.
- `yarn apidoc` regenerates `build/api-model.json` and the `types/` declarations.
- `yarn build` produces `dist/` with esbuild. `dist/` is **not committed**; `prepack` builds it on publish.
- Acceptance suite: `yarn test:e2e --tags '@tag1 and not @ignore'` after a `yarn build`; quick WIP pass: `yarn test-wip`; add `--report` for the HTML report.

## Coding Style & Naming Conventions

- Use CommonJS modules with ES6 syntax; follow existing fluent API patterns and promise-based flows.
- Prettier owns formatting: 4-space indent, single quotes, no trailing commas, 140-column lines. `.editorconfig` mirrors it.
- The existing sources have **not** been reformatted wholesale, so do not reformat a file you are only partly touching; that would bury the real change.
- Keep folder names lower-case domain terms. Keep public builders and entry points documented: the published documentation _is_ the JSDoc, so a wording fix belongs in `src/`.

## Testing Guidelines

- New behaviour arrives with unit tests in `test/unit/`, named `*.test.js`. They must not need a network or an OpenGate instance.
- `test/unit/regressions/` holds tests pinning defects that already shipped. Add to it whenever you fix one.
- Features: `features/features/**/*.feature`; steps: `features/step_definitions`; shared hooks/config: `features/support/world.js`.
- Set `this.test_url_north`, `this.test_url_south`, `this.apikey`, `YOUR_EMAIL`, and `YOUR_PASSWORD` through environment variables before executing acceptance tests; never commit secrets.

## Linting Policy

- Correctness rules are **errors** and break the build. `no-undef` in particular: it caught five identifiers that were used but never declared, each an unconditional `ReferenceError` in shipped code.
- Rules that only describe accumulated untidiness (`no-unused-vars`, `no-useless-escape`, …) are **warnings**. That count is a backlog: it should fall, never rise.
- `features/**` keeps `no-undef` at warning level because some mock handlers reference response bodies declared nowhere. Those are real defects awaiting someone who knows what each mock should answer.

## Documentation

- **README.md is kept current. This is not optional.** It had drifted for years: it pointed at a Jenkins
  job for releases that no longer describes how anything is published, told readers to run `gulp`
  against Node 4, and never once showed how to construct the client. A reader's first impression of
  this library is that file.
- Any change to the public surface updates it in the **same** pull request: a new option, a renamed
  factory, a different error shape, a changed command, a moved output path. "I will document it later"
  is how it got into that state.
- Every code sample in it must have been run. They are what people copy first, and a sample that does
  not work costs more trust than no sample at all.
- The published reference at https://documentation.opengate.es/libs/ogapi-docs/index.html is generated
  from the JSDoc in `src/`, so prose about a specific class or method belongs there and not in README.
  README covers what the library is, how to install it, how to configure it and how to work on it.

## Commit & Pull Request Guidelines

- Follow history conventions: `OUW-1234 short summary` for work tied to tickets; `release minor version:x.y.z` for release bumps.
- PRs should include a concise description, tests executed, and documentation updates when public behavior changes; link related issues/tickets.
- Add screenshots or sample payloads when modifying responses or fluent builders that affect consumers.

## Releasing

- Publishing to npm is triggered solely by pushing a `vX.Y.Z` tag, which must match `package.json`. See `.github/workflows/release.yml`.
- The workflow needs the `NPM_TOKEN` repository secret.

## Security & Configuration Tips

- Do not hardcode API keys or endpoints; supply them via environment variables.
- Registry credentials belong in your own `~/.npmrc`. The repository deliberately ships no `.npmrc` or `.yarnrc`; it once carried Nexus tokens in a committed `.npmrc`, and `.gitignore` now blocks that file.
- Keep browser bundles clean of Node-only dependencies. `scripts/build.mjs` declares the shims browserify used to inject silently (path, buffer, assert, util, process, and an empty fs); after changing `opengate-api-bower.js`, run `yarn build` and load the bundle to verify it.
