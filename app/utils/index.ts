export const { format: formatNumber } = Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 })

export const searchTextRegExp = function (query = '') {
  return new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')
}

export const formatDateByLocale = (locale: string, d: string | number | Date) => {
  return new Date(d).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}