import { existsSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

// Resolves to the generated static deploy artifact. `nuxt generate` writes to
// `.output/public/`; the repo also ships a convenience `dist` symlink → same dir.
const DIST = new URL('../../.output/public/', import.meta.url).pathname

type PageEntry = { url: string; loc: string }

async function pagesAndBase(): Promise<{ pages: PageEntry[]; base: string }> {
  const xml = await readFile(join(DIST, 'sitemap.xml'), 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!)
  if (locs.length === 0) throw new Error('sitemap.xml has no <loc> entries')
  // Derive baseURL from the first <loc>: under GH Pages the path is prefixed
  // with `/litestar.dev-v2`; under a root deploy it's empty. Trailing slash dropped.
  const base = new URL(locs[0]).pathname.replace(/\/$/, '')
  const pages = locs.map((loc) => {
    const p = new URL(loc).pathname
    const stripped = base ? p.replace(new RegExp(`^${base}`), '') : p
    return { url: stripped || '/', loc }
  })
  return { pages, base }
}

// Strip one trailing slash. The sitemap emits the home `<loc>` without one
// (e.g. `https://host/litestar.dev-v2`), but `joinURL(host, baseURL, '/')`
// produces a trailing slash. Both forms point at the same resource — compare
// modulo trailing slash so the test isn't tripped by that single discrepancy.
function stripTrailingSlash(u: string): string {
  return u.replace(/\/$/, '')
}

function htmlPath(p: string): string {
  return p === '/' ? join(DIST, 'index.html') : join(DIST, p, 'index.html')
}

function meta(html: string, sel: { property?: string; name?: string }) {
  const k = sel.property ? `property="${sel.property}"` : `name="${sel.name!}"`
  return (
    html.match(new RegExp(`<meta[^>]*${k}[^>]*content="([^"]*)"`))?.[1] ?? null
  )
}

const { pages, base } = await pagesAndBase()

describe('Built pages have required OG/SEO meta', () => {
  it.each(pages)('$url', async ({ url, loc }) => {
    const html = await readFile(htmlPath(url), 'utf8')

    expect(html.match(/<title>([^<]+)<\/title>/)?.[1], 'title').toBeTruthy()
    expect(meta(html, { name: 'description' }), 'description').toBeTruthy()
    expect(meta(html, { property: 'og:title' }), 'og:title').toBeTruthy()
    expect(
      meta(html, { property: 'og:description' }),
      'og:description',
    ).toBeTruthy()
    expect(meta(html, { property: 'og:site_name' }), 'og:site_name').toBe(
      'Litestar',
    )
    expect(meta(html, { name: 'twitter:card' }), 'twitter:card').toBe(
      'summary_large_image',
    )
    expect(meta(html, { property: 'og:image:width' }), 'og:image:width').toBe(
      '1200',
    )
    expect(meta(html, { property: 'og:image:height' }), 'og:image:height').toBe(
      '600',
    )

    // Canonical absolute URL for the page — must equal the sitemap <loc> for
    // this same route (modulo trailing slash on `/`). This catches host drift
    // (someone hardcoding the wrong domain), path typos, and baseURL mismatch
    // in a single assertion. Both URLs are derived from the same `site.url +
    // app.baseURL` at build time, so they're guaranteed to agree if the SEO
    // wiring is correct.
    const ogUrl = meta(html, { property: 'og:url' })
    expect(ogUrl, 'og:url').toBeTruthy()
    expect(stripTrailingSlash(ogUrl!), 'og:url matches sitemap loc').toBe(
      stripTrailingSlash(loc),
    )

    // Twitter falls back to og:* when missing, but explicit text tags are stronger
    // and we want a hard guarantee they exist. Require equality with og:title /
    // og:description so a future divergence (e.g. a typo) is caught here too.
    expect(meta(html, { name: 'twitter:title' }), 'twitter:title').toBe(
      meta(html, { property: 'og:title' }),
    )
    expect(
      meta(html, { name: 'twitter:description' }),
      'twitter:description',
    ).toBe(meta(html, { property: 'og:description' }))

    const img = meta(html, { property: 'og:image' })
    expect(img, 'og:image').toBeTruthy()
    if (img!.match(/\/_og\/s\/.+\.png$/)) {
      // Strip protocol + host + baseURL to map https://host/baseURL/_og/s/x.png
      // → dist/_og/s/x.png. Asserts the static OG PNG was actually emitted.
      const local = join(
        DIST,
        img!.replace(new RegExp(`^https?://[^/]+${base}`), ''),
      )
      expect(existsSync(local), `OG image PNG exists at ${local}`).toBe(true)
    }
  })
})

// Catches the class of bug where a consumer (listing <img>, JSON-LD image, etc.)
// predicts an /_og/s/o_<hash>.png URL that the producer never wrote — i.e. the
// hash inputs drifted between defineOgImage and the predictor. nuxt-og-image
// logs "Skipped N orphaned OG image hash URL" during prerender for these, but
// doesn't fail the build. This test does.
async function walkHtml(dir: string): Promise<string[]> {
  const out: string[] = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walkHtml(p)))
    else if (entry.name.endsWith('.html')) out.push(p)
  }
  return out
}

function extractStaticOgRefs(html: string, base: string): string[] {
  const refs = new Set<string>()
  // Any quoted attribute carrying an /_og/s/o_<hash>.png path (covers <img src>,
  // <link href>, <meta content>, srcset entries, etc.).
  for (const m of html.matchAll(/["']([^"']*\/_og\/s\/o_[^"']+\.png)["']/g)) {
    refs.add(m[1]!)
  }
  // JSON-LD blocks — walk every string field looking for the same prefix.
  for (const m of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    let data: unknown
    try {
      data = JSON.parse(m[1]!)
    } catch {
      // Malformed JSON-LD is its own bug; not this test's job.
      continue
    }
    JSON.stringify(data, (_, v) => {
      if (typeof v === 'string' && v.includes('/_og/s/o_')) refs.add(v)
      return v
    })
  }
  // Strip the absolute prefix (host + baseURL) so we can resolve against DIST.
  return [...refs].map((u) =>
    u.replace(new RegExp(`^https?://[^/]+${base}`), ''),
  )
}

const htmlFiles = await walkHtml(DIST)
const orphanCases: Array<{ html: string; ref: string }> = []
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  for (const ref of extractStaticOgRefs(html, base)) {
    orphanCases.push({ html: relative(DIST, file), ref })
  }
}

describe('Built pages: every static OG image URL resolves to a file', () => {
  // Sanity: if this is empty, the test is silently passing because no OG hash
  // URLs exist anywhere in the dist (would mean an OG-image regression of its
  // own). We expect at least the per-post meta to surface one.
  it('finds at least one /_og/s/o_*.png reference to validate', () => {
    expect(orphanCases.length).toBeGreaterThan(0)
  })

  it.each(orphanCases)('$html → $ref exists', ({ ref }) => {
    expect(existsSync(join(DIST, ref)), `${ref} not in dist/`).toBe(true)
  })
})
