import { describe, it, expect } from 'vitest'
import { extractDualModeSources } from '../../app/utils/colorModePicture'

// Plugin README banners use a GitHub <picture> with
// <source media="(prefers-color-scheme: ...)">. That media feature is OS-driven,
// but the site theme toggle is class-based (.dark on <html>), so the banner does
// not switch with the toggle. extractDualModeSources() pulls the light/dark image
// URLs out of the parsed <source>/<img> vnodes so a component can render two
// <img> toggled by Tailwind dark: classes instead.
//
// Inputs mirror the MDC/Vue vnode shape: { type, props, children }. Verified AST:
// <source> props are `srcSet` (camelCase) + `media` (lowercase).

const darkSource = {
  type: 'source',
  props: { media: '(prefers-color-scheme: dark)', srcSet: 'https://x/dark.svg' },
}
const lightSource = {
  type: 'source',
  props: {
    media: '(prefers-color-scheme: light)',
    srcSet: 'https://x/light.svg',
  },
}
const fallbackImg = {
  type: 'img',
  props: { alt: 'AA Logo', src: 'https://x/light.svg', width: '100%' },
}
// Interspersed whitespace text nodes, as MDC emits between elements.
const text = { type: Symbol('v-txt'), children: '\n  ' }

describe('extractDualModeSources', () => {
  it('extracts light + dark from prefers-color-scheme sources and the fallback img', () => {
    expect(
      extractDualModeSources([text, darkSource, text, lightSource, text, fallbackImg]),
    ).toEqual({
      light: 'https://x/light.svg',
      dark: 'https://x/dark.svg',
      alt: 'AA Logo',
      width: '100%',
      height: undefined,
    })
  })

  it('is order-independent (light source declared first)', () => {
    const r = extractDualModeSources([lightSource, darkSource, fallbackImg])
    expect(r?.light).toBe('https://x/light.svg')
    expect(r?.dark).toBe('https://x/dark.svg')
  })

  it('reads both srcSet (camelCase) and srcset (lowercase)', () => {
    const r = extractDualModeSources([
      { type: 'source', props: { media: '(prefers-color-scheme: dark)', srcset: 'd.svg' } },
      { type: 'source', props: { media: '(prefers-color-scheme: light)', srcSet: 'l.svg' } },
    ])
    expect(r).toEqual({ light: 'l.svg', dark: 'd.svg', alt: undefined, width: undefined, height: undefined })
  })

  it('takes the first URL token when srcset carries a descriptor', () => {
    const r = extractDualModeSources([
      { type: 'source', props: { media: '(prefers-color-scheme: dark)', srcSet: 'd.svg 2x, d@3.svg 3x' } },
      { type: 'source', props: { media: '(prefers-color-scheme: light)', srcSet: 'l.svg 1x' } },
    ])
    expect(r?.dark).toBe('d.svg')
    expect(r?.light).toBe('l.svg')
  })

  it('returns null when no source uses prefers-color-scheme', () => {
    expect(
      extractDualModeSources([
        { type: 'source', props: { media: '(min-width: 600px)', srcSet: 'wide.svg' } },
        fallbackImg,
      ]),
    ).toBeNull()
  })

  it('returns null when only a light source is present (no dark)', () => {
    expect(extractDualModeSources([lightSource, fallbackImg])).toBeNull()
  })

  it('returns null for an empty list', () => {
    expect(extractDualModeSources([])).toBeNull()
  })

  it('flattens nested arrays / fragment children', () => {
    const r = extractDualModeSources([
      [darkSource, lightSource],
      { type: Symbol('v-fgt'), children: [fallbackImg] },
    ])
    expect(r?.light).toBe('https://x/light.svg')
    expect(r?.dark).toBe('https://x/dark.svg')
  })
})
