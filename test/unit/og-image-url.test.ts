import { describe, it, expect } from 'vitest'
import { toStaticOgPath } from '../../app/utils/ogImage'

// nuxt-og-image's getOgImagePath() emits the runtime "/_og/d/" prefix whenever it
// is not prerendering (e.g. client-side navigation). On the static (zeroRuntime)
// GitHub Pages deploy only the prerendered "/_og/s/" files exist, so blog
// thumbnails built from that URL 404 until a hard refresh. toStaticOgPath()
// forces the static prefix so the URL is correct in every render context.
describe('toStaticOgPath', () => {
  it('rewrites the runtime /_og/d/ prefix to the static /_og/s/ prefix', () => {
    expect(
      toStaticOgPath('/litestar.dev-v2/_og/d/c_Blog,props_eyJ4IjoxfQ,p_x.png'),
    ).toBe('/litestar.dev-v2/_og/s/c_Blog,props_eyJ4IjoxfQ,p_x.png')
  })

  it('leaves an already-static /_og/s/ path unchanged', () => {
    expect(toStaticOgPath('/litestar.dev-v2/_og/s/c_Blog.png')).toBe(
      '/litestar.dev-v2/_og/s/c_Blog.png',
    )
  })

  it('does not touch a regular (frontmatter) image path', () => {
    expect(toStaticOgPath('/blog/cover.png')).toBe('/blog/cover.png')
  })
})
