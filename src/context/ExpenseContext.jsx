import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { expenseService } from '@/services/expenseService'
import { sortExpensesNewestFirst } from '@/utils/expenseUtils'

const ExpenseContext = createContext(null)

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => expenseService.getExpenses())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refreshExpenses = useCallback(() => {
    setLoading(true)
    setError(null)
    try {
      setExpenses(expenseService.getExpenses())
    } catch (err) {
      setError(err?.message || 'Failed to load expenses')
    } finally {
      setLoading(false)
    }
  }, [])

  const addExpense = useCallback((input) => {
    const expense = expenseService.addExpense(input)
    setExpenses(expenseService.getExpenses())
    return expense
  }, [])

  const updateExpense = useCallback((id, input) => {
    const expense = expenseService.updateExpense(id, input)
    setExpenses(expenseService.getExpenses())
    return expense
  }, [])

  const deleteExpense = useCallback((id) => {
    expenseService.deleteExpense(id)
    setExpenses(expenseService.getExpenses())
    return true
  }, [])

  const clearExpenses = useCallback(() => {
    expenseService.clearExpenses()
    setExpenses([])
    return []
  }, [])

  const value = useMemo(
    () => ({
      expenses: sortExpensesNewestFirst(expenses),
      loading,
      error,
      refreshExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
      clearExpenses,
    }),
    [expenses, loading, error, refreshExpenses, addExpense, updateExpense, deleteExpense, clearExpenses],
  )

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export function useExpenses() {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider')
  }
  return context
}
