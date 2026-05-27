const _numberFormatter = Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

// Node and browser ICU data differ in compact-suffix casing ("1.5k" vs "1.5K"),
// which causes hydration mismatches on the static build. Normalise to uppercase.
export const formatNumber = (value: number): string =>
  _numberFormatter.format(value).replace(/([kmb])$/i, (m) => m.toUpperCase())

export const searchTextRegExp = function (query = '') {
  return new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')
}

/**
 * Whether a content entry should be published (and therefore crawled,
 * prerendered, and listed in sitemap.xml). Draft entries are hidden in the
 * production build; they remain visible in dev so authors can preview them.
 */
export const isPublished = (entry: { draft?: boolean }): boolean => {
  return !entry.draft
}

export const formatDateByLocale = (
  locale: string,
  d: string | number | Date,
) => {
  return new Date(d).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
