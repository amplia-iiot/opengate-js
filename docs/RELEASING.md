# Releasing opengate-js

A release is a `vX.Y.Z` tag pushed to GitHub. The tag triggers `.github/workflows/release.yml`, which
publishes `X.Y.Z` to npm and opens a GitHub release. Nothing else publishes: merging to `master` does
not, and nobody runs `npm publish` by hand.

```
feature branch ──PR──▶ develop (green) ──ff-only──▶ master ──tag vX.Y.Z──▶ npm
```

## Before you start

- `develop` is **green**. Check it: `gh run list --branch develop -L 3`. A red `develop` is not
  released, and a pull request is not merged while its CI is red — fix it on the branch first.
- Your clone is up to date: `git fetch origin --tags`.
- Pick the version by [semver](https://semver.org): patch for fixes, minor for new behaviour that
  breaks nobody, major when consumers have to change code. A version published on npm can **never** be
  reused, not even after unpublishing it.

## Steps

### 1. Bump the version on `develop`

This is the one commit that goes straight onto `develop`, without a pull request.

```bash
git checkout develop && git pull
npm version minor --no-git-tag-version   # or patch / major; edits package.json only
git commit -am "release minor version:16.2.0"
git push origin develop
```

`--no-git-tag-version` matters: without it `npm version` also creates a tag, on `develop`, before CI
has seen the commit.

Wait for CI on that commit to go green: `gh run watch` or `gh run list --branch develop -L 1`.

### 2. Fast-forward `master`

```bash
git checkout master && git pull
git merge --ff-only develop
git push origin master
```

If `--ff-only` refuses, `master` carries a commit `develop` does not. Stop and sort that out; never
replace it with a plain merge.

### 3. Tag and push the tag

```bash
git tag -a v16.2.0 -m "release 16.2.0"
git push origin v16.2.0
```

Push the tag **by name**. A plain `git push` sends no tags at all, and `git push --follow-tags` only
sends annotated ones (`-a`): a lightweight tag stays on your machine without any error, and nothing is
published.

The tag must be exactly `v` + the `version` in `package.json`, on the commit `master` points at.

### 4. Check that it shipped

```bash
git ls-remote --tags origin v16.2.0          # the tag is on GitHub
gh run list --workflow release.yml -L 1      # the Release workflow ran, and passed
npm view opengate-js version                 # npm serves the new version
```

The GitHub release, with `api-model.json` attached, appears under
<https://github.com/amplia-iiot/opengate-js/releases>.

## When something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| The tag is not on GitHub, the workflow never ran | The tag was not pushed: lightweight tag with `--follow-tags`, or a plain `git push` | `git push origin vX.Y.Z` |
| Release fails at *Check that the tag matches package.json* | Tag and `version` disagree, or the tag sits on the wrong commit | Delete the tag (`git push origin :refs/tags/vX.Y.Z && git tag -d vX.Y.Z`), fix, tag again. Safe: nothing was published |
| Release fails at *Lint* or *Unit tests* | The tagged commit is broken — it should never have left a red `develop` | Same as above: delete the tag, fix through a pull request, release again |
| Release fails at *Publish* with "cannot publish over the previously published version" | That version is already on npm | Bump to the next patch and release that. npm versions are never reused |
| Publish passed, *Create the GitHub release* failed | npm already has the package | Do **not** retag. Create the release by hand: `gh release create vX.Y.Z --generate-notes build/api-model.json` after `yarn apidoc:model` |
| `git merge --ff-only develop` refuses | `master` and `develop` have diverged | Ask before touching `master`; do not merge or force-push it on your own |

The workflow needs the `NPM_TOKEN` repository secret: an npm automation token with publish rights.
