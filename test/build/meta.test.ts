import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Resolves to the generated static deploy artifact. `nuxt generate` writes to
// `.output/public/`; the repo also ships a convenience `dist` symlink → same dir.
const DIST = new URL('../../.output/public/', import.meta.url).pathname

async function urlsAndBase(): Promise<{ urls: string[]; base: string }> {
  const xml = await readFile(join(DIST, 'sitemap.xml'), 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!)
  if (locs.length === 0) throw new Error('sitemap.xml has no <loc> entries')
  // Derive baseURL from the first <loc>: under GH Pages the path is prefixed
  // with `/litestar.dev-v2`; under a root deploy it's empty. Trailing slash dropped.
  const base = new URL(locs[0]).pathname.replace(/\/$/, '')
  const urls = locs.map((u) => {
    const p = new URL(u).pathname
    const stripped = base ? p.replace(new RegExp(`^${base}`), '') : p
    return stripped || '/'
  })
  return { urls, base }
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

const { urls, base } = await urlsAndBase()

describe('Built pages have required OG/SEO meta', () => {
  it.each(urls)('%s', async (url) => {
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
