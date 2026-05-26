/**
 * Extract light/dark image URLs from the children of a GitHub-style
 * `<picture>` banner so it can be rendered as two `<img>` toggled by Tailwind
 * `dark:` classes instead of the OS-driven `prefers-color-scheme` media query.
 *
 * Plugin READMEs (e.g. Advanced Alchemy) ship:
 *
 *   <picture>
 *     <source media="(prefers-color-scheme: dark)"  srcset="…dark.svg">
 *     <source media="(prefers-color-scheme: light)" srcset="…light.svg">
 *     <img src="…light.svg" …>
 *   </picture>
 *
 * `prefers-color-scheme` follows the OS theme, but the site toggle is
 * class-based (`.dark` on `<html>`), so the banner never switches with the
 * toggle. This pure helper reads the parsed MDC/Vue vnodes — `<source>` props
 * are `srcSet` (camelCase) + `media` (lowercase), verified against the parser —
 * and returns the light/dark URLs (light falling back to the `<img>` src).
 *
 * Returns `null` unless BOTH a light and a dark URL resolve, so non-dual-mode
 * `<picture>` elements (responsive `media`, single image) can fall back to
 * their native rendering untouched.
 */
export interface DualModeSources {
  light: string
  dark: string
  alt?: string
  width?: string | number
  height?: string | number
}

interface VNodeLike {
  type?: unknown
  props?: Record<string, unknown> | null
  children?: unknown
}

function flatten(nodes: unknown[]): VNodeLike[] {
  const out: VNodeLike[] = []
  for (const node of nodes) {
    if (Array.isArray(node)) {
      out.push(...flatten(node))
      continue
    }
    if (!node || typeof node !== 'object') continue
    const vnode = node as VNodeLike
    out.push(vnode)
    if (Array.isArray(vnode.children)) out.push(...flatten(vnode.children))
  }
  return out
}

function firstUrl(srcset: unknown): string | undefined {
  if (typeof srcset !== 'string') return undefined
  const url = srcset.split(',')[0]?.trim().split(/\s+/)[0]
  return url || undefined
}

export function extractDualModeSources(
  nodes: unknown[],
): DualModeSources | null {
  let light: string | undefined
  let dark: string | undefined
  let fallback: string | undefined
  let alt: string | undefined
  let width: string | number | undefined
  let height: string | number | undefined

  for (const node of flatten(nodes)) {
    const props = node.props ?? {}

    if (node.type === 'source') {
      const url = firstUrl(props.srcSet ?? props.srcset)
      if (!url) continue
      const media = String(props.media ?? '')
      if (/dark/i.test(media)) dark ??= url
      else if (/light/i.test(media)) light ??= url
      continue
    }

    // The fallback <img> (rendered natively or via a component override).
    if (typeof props.src === 'string') {
      fallback ??= props.src
      alt ??= props.alt as string | undefined
      width ??= props.width as string | number | undefined
      height ??= props.height as string | number | undefined
    }
  }

  light ??= fallback
  if (!light || !dark) return null

  return { light, dark, alt, width, height }
}
