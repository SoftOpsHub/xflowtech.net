# Deployment

The site is a static export (`next build` → `out/`) published to **GitHub Pages**
by GitHub Actions. There is no server and no hosting bill.

## Pipelines

| Workflow                                      | Trigger                           | What it does                                                                  |
| --------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------- |
| [`ci.yml`](../.github/workflows/ci.yml)       | every PR, pushes to `develop`     | lint, typecheck, unit tests; builds the export and runs Playwright against it |
| [`pages.yml`](../.github/workflows/pages.yml) | pushes to `main`, manual dispatch | re-runs the checks, builds, uploads the export, deploys to Pages              |

Both share [`.github/actions/setup`](../.github/actions/setup/action.yml), so the
toolchain and install step can never drift between them.

Tool versions are declared once and read by both CI and local dev:

- Node — `.nvmrc`
- pnpm — `packageManager` in `package.json` (works with `corepack`)

## Pages configuration

Pages is set to the **GitHub Actions** build type (not "deploy from a branch").
`pages.yml` is the only thing that can publish, and `actions/configure-pages`
runs with `enablement: true`, so the workflow re-enables Pages by itself if the
setting is ever lost.

The custom domain lives in the repository's Pages settings rather than a `CNAME`
file. With the Actions build type that setting is authoritative and survives
every deploy — a `CNAME` file in the artifact would be a second, competing
source of truth.

Because the site is served from the apex domain, the export needs no `basePath`
or `assetPrefix`: `/` on the domain is the root of `out/`.

## Custom domain and DNS

Custom domain: **xflowtech.net** (apex), with `www` redirecting to it.

DNS records to create at the domain registrar:

| Type            | Host / Name | Value                                                                                      |
| --------------- | ----------- | ------------------------------------------------------------------------------------------ |
| A               | `@`         | `185.199.108.153`                                                                          |
| A               | `@`         | `185.199.109.153`                                                                          |
| A               | `@`         | `185.199.110.153`                                                                          |
| A               | `@`         | `185.199.111.153`                                                                          |
| AAAA (optional) | `@`         | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME           | `www`       | `softopshub.github.io.`                                                                    |

If the registrar supports `ALIAS`/`ANAME`/flattened CNAME at the apex, a single
record pointing at `softopshub.github.io` is preferable to the four A records —
GitHub can then change its edge IPs without breaking the site.

After DNS resolves, enable **Enforce HTTPS** in Settings → Pages. GitHub issues
the Let's Encrypt certificate automatically; it can take up to an hour.

## Rolling back

Re-run an older successful `pages.yml` run from the Actions tab, or revert the
commit on `main`. Every deploy publishes a complete, self-contained `out/`, so
there is no partial state to unwind.
