/**
 * Force a nuxt-og-image URL onto the static (`/_og/s/`) prefix.
 *
 * `getOgImagePath()` decides the prefix from `import.meta.prerender`: it returns
 * the static `/_og/s/` path at build time, but the runtime `/_og/d/` path when
 * called in the browser (e.g. when a reactive computed re-evaluates during
 * client-side navigation). This site is `ogImage.zeroRuntime: true` and deploys
 * statically to GitHub Pages, so only `/_og/s/` files exist — a `/_og/d/` URL
 * 404s. Normalising the prefix keeps the URL correct in every render context.
 *
 * Safe for our blog thumbnails because their minimal `{ title, category }` props
 * keep the URL in the non-hash form, where the static and dynamic variants share
 * an identical encoded segment and differ only by this prefix.
 */
export function toStaticOgPath(path: string): string {
  return path.replace('/_og/d/', '/_og/s/')
}
