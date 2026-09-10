import { SEED_EXPENSES } from '@/data/mockExpenses'
import { validateExpenseInput } from '@/utils/expenseUtils'

const STORAGE_KEY = 'student-expense-tracker:expenses'
const SEED_FLAG_KEY = 'student-expense-tracker:seeded'

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `expense-${crypto.randomUUID()}`
  }
  return `expense-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function writeRaw(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

function ensureSeeded() {
  const existing = readRaw()
  if (existing) return existing

  const alreadySeeded = localStorage.getItem(SEED_FLAG_KEY) === 'true'
  if (alreadySeeded) {
    writeRaw([])
    return []
  }

  writeRaw(SEED_EXPENSES)
  localStorage.setItem(SEED_FLAG_KEY, 'true')
  return [...SEED_EXPENSES]
}

function normalizeExpense(expense) {
  return {
    id: expense.id,
    title: expense.title,
    amount: Number(expense.amount),
    category: expense.category,
    date: expense.date,
    paymentMethod: expense.paymentMethod,
    note: expense.note ?? '',
    createdAt: expense.createdAt ?? new Date().toISOString(),
    updatedAt: expense.updatedAt ?? new Date().toISOString(),
  }
}

export const expenseService = {
  getExpenses() {
    return ensureSeeded().map(normalizeExpense)
  },

  addExpense(input) {
    const { valid, errors, values } = validateExpenseInput(input)
    if (!valid) {
      const error = new Error('Invalid expense')
      error.validation = errors
      throw error
    }

    const expenses = this.getExpenses()
    const now = new Date().toISOString()
    const expense = normalizeExpense({
      id: generateId(),
      ...values,
      createdAt: now,
      updatedAt: now,
    })

    writeRaw([expense, ...expenses])
    return expense
  },

  updateExpense(id, input) {
    const { valid, errors, values } = validateExpenseInput(input)
    if (!valid) {
      const error = new Error('Invalid expense')
      error.validation = errors
      throw error
    }

    const expenses = this.getExpenses()
    const index = expenses.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Expense not found')
    }

    const updated = normalizeExpense({
      ...expenses[index],
      ...values,
      id,
      updatedAt: new Date().toISOString(),
    })

    const next = [...expenses]
    next[index] = updated
    writeRaw(next)
    return updated
  },

  deleteExpense(id) {
    const expenses = this.getExpenses()
    const next = expenses.filter((item) => item.id !== id)
    if (next.length === expenses.length) {
      throw new Error('Expense not found')
    }
    writeRaw(next)
    return true
  },

  clearExpenses() {
    writeRaw([])
    localStorage.setItem(SEED_FLAG_KEY, 'true')
    return []
  },
}
