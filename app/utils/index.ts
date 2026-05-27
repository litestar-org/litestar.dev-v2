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
