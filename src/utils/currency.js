const currencyFormatters = new Map()

function getFormatter(currency = 'INR', locale = 'en-IN') {
  const key = `${locale}:${currency}`
  if (!currencyFormatters.has(key)) {
    currencyFormatters.set(
      key,
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }),
    )
  }
  return currencyFormatters.get(key)
}

export function formatCurrency(amount, currency = 'INR') {
  const value = Number(amount)
  if (Number.isNaN(value)) return getFormatter(currency).format(0)
  return getFormatter(currency).format(value)
}

export function formatCurrencySigned(amount, currency = 'INR') {
  const value = Number(amount)
  if (Number.isNaN(value) || value === 0) return formatCurrency(0, currency)
  return `-${formatCurrency(Math.abs(value), currency)}`
}
