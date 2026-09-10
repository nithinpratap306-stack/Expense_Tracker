import {
  isToday,
  isYesterday,
  parseISO,
  format,
  startOfDay,
  isValid,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from 'date-fns'

export function toDate(value) {
  if (!value) return null
  if (value instanceof Date) return isValid(value) ? value : null
  const parsed = parseISO(value)
  return isValid(parsed) ? parsed : null
}

export function formatExpenseDate(value) {
  const date = toDate(value)
  if (!date) return ''
  return format(date, 'dd MMM yyyy')
}

export function formatExpenseDateTime(value) {
  const date = toDate(value)
  if (!date) return ''
  return format(date, 'dd MMM yyyy • hh:mm a')
}

export function getDateGroupLabel(value) {
  const date = toDate(value)
  if (!date) return 'Unknown'
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return format(date, 'EEEE, dd MMM yyyy')
}

export function getDateGroupKey(value) {
  const date = toDate(value)
  if (!date) return 'unknown'
  return format(startOfDay(date), 'yyyy-MM-dd')
}

export function groupExpensesByDate(expenses) {
  const groups = new Map()

  expenses.forEach((expense) => {
    const key = getDateGroupKey(expense.date)
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: getDateGroupLabel(expense.date),
        expenses: [],
      })
    }
    groups.get(key).expenses.push(expense)
  })

  return Array.from(groups.values())
}

export function matchesDateFilter(expenseDate, filter) {
  if (!filter || filter === 'all') return true
  const date = toDate(expenseDate)
  if (!date) return false

  const now = new Date()

  if (filter === 'today') return isToday(date)
  if (filter === 'yesterday') return isYesterday(date)
  if (filter === 'this-week') {
    return isWithinInterval(date, {
      start: startOfWeek(now, { weekStartsOn: 1 }),
      end: endOfWeek(now, { weekStartsOn: 1 }),
    })
  }
  if (filter === 'this-month') {
    return isWithinInterval(date, {
      start: startOfMonth(now),
      end: endOfMonth(now),
    })
  }
  return true
}

export function filterExpenses(expenses, { search = '', category = 'all', paymentMethod = 'all', date = 'all' } = {}) {
  const query = search.trim().toLowerCase()

  return expenses.filter((expense) => {
    const matchesSearch =
      !query ||
      expense.title?.toLowerCase().includes(query) ||
      expense.category?.toLowerCase().includes(query) ||
      expense.paymentMethod?.toLowerCase().includes(query) ||
      expense.note?.toLowerCase().includes(query)

    const matchesCategory = category === 'all' || expense.category === category
    const matchesPayment = paymentMethod === 'all' || expense.paymentMethod === paymentMethod
    const matchesDate = matchesDateFilter(expense.date, date)

    return matchesSearch && matchesCategory && matchesPayment && matchesDate
  })
}

export function sortExpensesNewestFirst(expenses) {
  return [...expenses].sort((a, b) => {
    const dateA = toDate(a.date)?.getTime() ?? 0
    const dateB = toDate(b.date)?.getTime() ?? 0
    if (dateB !== dateA) return dateB - dateA
    return String(b.id).localeCompare(String(a.id))
  })
}

export function validateExpenseInput(input) {
  const errors = {}
  const amount = Number(input.amount)
  const title = String(input.title ?? '').trim()
  const category = String(input.category ?? '').trim()
  const paymentMethod = String(input.paymentMethod ?? '').trim()
  const date = String(input.date ?? '').trim()
  const note = String(input.note ?? '').trim()

  if (!input.amount && input.amount !== 0) {
    errors.amount = 'Amount is required'
  } else if (Number.isNaN(amount) || !Number.isFinite(amount)) {
    errors.amount = 'Enter a valid amount'
  } else if (amount <= 0) {
    errors.amount = 'Amount must be greater than 0'
  }

  if (!title) {
    errors.title = 'Expense name is required'
  } else if (title.length < 2) {
    errors.title = 'Name must be at least 2 characters'
  } else if (title.length > 80) {
    errors.title = 'Name must be under 80 characters'
  }

  if (!category) {
    errors.category = 'Category is required'
  }

  if (!paymentMethod) {
    errors.paymentMethod = 'Payment method is required'
  }

  const parsedDate = toDate(date)
  if (!date) {
    errors.date = 'Date is required'
  } else if (!parsedDate) {
    errors.date = 'Enter a valid date'
  }

  if (note.length > 280) {
    errors.note = 'Note must be under 280 characters'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: {
      title,
      amount,
      category,
      paymentMethod,
      date: parsedDate ? format(parsedDate, 'yyyy-MM-dd') : date,
      note,
    },
  }
}

export function expensesToCsv(expenses) {
  const headers = ['Date', 'Expense', 'Category', 'Amount', 'Payment Method', 'Note']
  const escape = (value) => {
    const text = String(value ?? '')
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
      return `"${text.replaceAll('"', '""')}"`
    }
    return text
  }

  const rows = sortExpensesNewestFirst(expenses).map((expense) =>
    [
      expense.date,
      expense.title,
      expense.category,
      expense.amount,
      expense.paymentMethod,
      expense.note ?? '',
    ]
      .map(escape)
      .join(','),
  )

  return [headers.join(','), ...rows].join('\n')
}

export function downloadCsv(filename, csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
