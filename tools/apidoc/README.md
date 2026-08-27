# apidoc — the API model and the type declarations

Everything needed to describe this library's API lives here, so that a given version of
`opengate-js` is enough to regenerate both the documentation and editor completion. No external
script, no artifact committed into the repository.

```bash
npm run apidoc          # both outputs
npm run apidoc:model    # build/api-model.json
npm run apidoc:types    # types/**/*.d.ts
```

Both `build/` and `types/` are gitignored on purpose: they are derived from `src/` and go stale the
moment the source moves. `types/` is regenerated on `prepack`, so the published package always ships
declarations matching its own source, and `build/api-model.json` is attached to the GitHub release
by the release workflow — never commit either.

## The two outputs

**`build/api-model.json`** — a neutral description of the API: classes, their members, each
parameter with its type and description, and each return type, all read from the JSDoc. It carries
the library version, so a consumer knows exactly what it is looking at.

```json
{
    "library": "opengate-js",
    "version": "14.15.0",
    "classCount": 217,
    "memberCount": 1471,
    "classes": [
        {
            "name": "AreaFinder",
            "file": "src/areas/AreaFinder.js",
            "extends": "ProvisionGenericFinder",
            "description": "This class allows making GET requests to the area resource in the OpenGate North API.",
            "members": [
                {
                    "kind": "method",
                    "name": "findByOrganizationAndIdentifier",
                    "description": "Downloads a specific area by its organization and identifier…",
                    "params": [{ "name": "organization", "type": "string", "optional": false, "description": "area organization ." }],
                    "returns": { "type": "Promise", "description": "" }
                }
            ]
        }
    ]
}
```

Nothing in the model knows about Hugo, front matter or any particular site: rendering is the
consumer's business. The documentation site turns this into its pages; anything else can read it
too.

**`types/**/*.d.ts`** — TypeScript declarations emitted from the same JSDoc. Editors consume
these natively, which is what gives completion and inline documentation for code written against
`$api` — no custom parser on the consumer's side.

## Why the JSDoc is the source of truth

The documentation pages published for this library **are** its JSDoc rendered: the page body is a
class or method `description`, the parameter table is its `@param` tags, and the return block is
`@return`. So a wording fix belongs in `src/`. Correcting it downstream, in the documentation
repository, is undone by the next regeneration — which is exactly what happened between July 9th
and July 24th 2026, when a re-import silently reverted 262 page descriptions. See OUW-4880.

## Options

```
node tools/apidoc/extract.mjs [--out <file>] [--src <dir>] [--version <v>]
```

`--version` stamps a version other than `package.json`'s, which is what a release pipeline needs
when it generates before the version bump lands.

## Notes for whoever maintains this

- Members whose name starts with `_` are internal and are not documented downstream; the model
  still lists them, and filtering is the renderer's decision.
- A constructor often carries only `@param` tags and no description. Renderers should supply their
  own label rather than print an empty heading.
- `@test` blocks are kept in the model under `tags`, so a renderer may show them as examples.
- The declarations are emitted from `opengate-api-npm.js`, the npm entry point, so what they cover
  is exactly what a consumer of the package can reach.
