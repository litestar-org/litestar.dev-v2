# Contribution guide

> This guide applies to **litestar.dev** — the marketing and community website
> for the Litestar framework. To contribute to the framework itself, see
> [`litestar-org/litestar/CONTRIBUTING.rst`](https://github.com/litestar-org/litestar/blob/main/CONTRIBUTING.rst).

## Setup

1. Install [Node.js 24](https://nodejs.org/).
2. Enable Corepack so the pinned `pnpm` version is used: `corepack enable`.
3. Install dependencies: `pnpm install`.

## Workflow

1. Fork and clone the repo, then create a branch.
2. `pnpm dev` — dev server at http://localhost:3000.
3. `pnpm format && pnpm lint && pnpm test-all` before pushing (mirrors CI).
4. Open a PR with a descriptive title referencing any related issue.

## Tests

| Project | Command           | Purpose                                                       |
| ------- | ----------------- | ------------------------------------------------------------- |
| `unit`  | `pnpm test-unit`  | Pure-function tests (helpers, composables)                    |
| `nuxt`  | `pnpm test-nuxt`  | Tests needing the Nuxt runtime                                |
| `build` | `pnpm test-build` | Post-build smoke tests — run **after** `pnpm generate-github` |

`pnpm test-all` runs `unit` + `nuxt`.

## Content

Drop a Markdown / YAML file in the right place — `nuxt generate` picks it up.

| Add                | Where                                            |
| ------------------ | ------------------------------------------------ |
| Blog post          | `content/blog/`                                  |
| Sponsor            | `content/sponsors/`                              |
| Starter / template | `content/starters/` or `content/templates/`      |
| Page copy          | `content/*.yml` (schemas in `content.config.ts`) |

## UI changes

For anything visual, run `pnpm dev` and check dark mode + mobile width. Run
`pnpm generate-github` to catch SSR / prerender / OG-image errors that only
appear at build time.
