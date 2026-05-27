export const { format: formatNumber } = Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

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
