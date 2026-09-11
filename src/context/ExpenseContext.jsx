import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { expenseService } from '@/services/expenseService'
import { useAppPreferences } from '@/context/AppPreferencesContext'
import { sortExpensesNewestFirst } from '@/utils/expenseUtils'
import {
  filterExpensesByMonth,
  calculateTotalSpent,
  calculateRemainingBudget,
  calculatePercentage,
  calculateDailyAverage,
  calculateCategorySpending,
  calculateMonthlyComparison,
  getTopCategory,
  getLargestExpense,
  getBudgetStatus,
  generateSpendingInsight,
} from '@/utils/expenseCalculations'

const ExpenseContext = createContext(null)

export function ExpenseProvider({ children }) {
  const { profile, settings, updateSettings } = useAppPreferences()

  const [expenses, setExpenses] = useState(() => expenseService.getExpenses())
  const [budgets, setBudgets] = useState(() => expenseService.getBudgets())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Current active period is September 2026 based on project context
  const currentYear = 2026
  const currentMonth = 9
  const currentPeriodLabel = 'September 2026'

  const refreshExpenses = useCallback(() => {
    setLoading(true)
    setError(null)
    try {
      setExpenses(expenseService.getExpenses())
      setBudgets(expenseService.getBudgets())
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

  const updateBudgets = useCallback((newBudgets) => {
    setBudgets((prev) => {
      const updated = {
        ...prev,
        ...newBudgets,
        categories: {
          ...prev.categories,
          ...(newBudgets.categories || {}),
        },
      }
      expenseService.saveBudgets(updated)
      if (newBudgets.monthlyLimit !== undefined && updateSettings) {
        updateSettings({ monthlyBudget: Number(newBudgets.monthlyLimit) })
      }
      return updated
    })
  }, [updateSettings])

  const resetToDefaults = useCallback(() => {
    const defaults = expenseService.resetToDefaults()
    setExpenses(defaults.expenses)
    setBudgets(defaults.budgets)
    return defaults
  }, [])

  // Sorted list for Transactions page
  const sortedExpenses = useMemo(() => sortExpensesNewestFirst(expenses), [expenses])

  // Filter current month expenses (September 2026)
  const currentMonthExpenses = useMemo(() => {
    return filterExpensesByMonth(expenses, currentYear, currentMonth)
  }, [expenses, currentYear, currentMonth])

  // Filter previous month (August 2026) for comparisons
  const previousMonthExpenses = useMemo(() => {
    return filterExpensesByMonth(expenses, currentYear, currentMonth - 1)
  }, [expenses, currentYear, currentMonth])

  // Key metrics for current month
  const totalSpent = useMemo(() => {
    return calculateTotalSpent(currentMonthExpenses)
  }, [currentMonthExpenses])

  const monthlyBudget = Number(settings?.monthlyBudget) || budgets.monthlyLimit || 8000

  const remainingBudget = useMemo(() => {
    return calculateRemainingBudget(monthlyBudget, totalSpent)
  }, [monthlyBudget, totalSpent])

  const percentUsed = useMemo(() => {
    return calculatePercentage(totalSpent, monthlyBudget)
  }, [totalSpent, monthlyBudget])

  const percentRemaining = useMemo(() => {
    return Math.max(0, Number((100 - percentUsed).toFixed(1)))
  }, [percentUsed])

  const dailyAverage = useMemo(() => {
    return calculateDailyAverage(currentMonthExpenses, 30)
  }, [currentMonthExpenses])

  const monthlyComparison = useMemo(() => {
    return calculateMonthlyComparison(currentMonthExpenses, previousMonthExpenses)
  }, [currentMonthExpenses, previousMonthExpenses])

  const categoryBreakdown = useMemo(() => {
    return calculateCategorySpending(currentMonthExpenses, budgets.categories)
  }, [currentMonthExpenses, budgets.categories])

  const topCategory = useMemo(() => {
    return getTopCategory(currentMonthExpenses)
  }, [currentMonthExpenses])

  const largestExpense = useMemo(() => {
    return getLargestExpense(currentMonthExpenses)
  }, [currentMonthExpenses])

  const budgetStatus = useMemo(() => {
    return getBudgetStatus(percentUsed, remainingBudget)
  }, [percentUsed, remainingBudget])

  const spendingInsight = useMemo(() => {
    return generateSpendingInsight(currentMonthExpenses, {
      ...budgets,
      monthlyLimit: monthlyBudget,
    })
  }, [currentMonthExpenses, budgets, monthlyBudget])

  const value = useMemo(
    () => ({
      // Teammate integration API
      expenses: sortedExpenses,
      allExpenses: expenses,
      loading,
      error,
      refreshExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
      clearExpenses,

      // User & Preferences
      user: profile,
      currency: settings?.currency || 'INR',

      // Dashboard, Analytics & Budget API
      budgets: {
        ...budgets,
        monthlyLimit: monthlyBudget,
      },
      currentYear,
      currentMonth,
      currentPeriodLabel,
      currentMonthExpenses,
      previousMonthExpenses,
      totalSpent,
      monthlyBudget,
      remainingBudget,
      percentUsed,
      percentRemaining,
      dailyAverage,
      monthlyComparison,
      categoryBreakdown,
      topCategory,
      largestExpense,
      budgetStatus,
      spendingInsight,
      updateBudgets,
      resetToDefaults,
    }),
    [
      sortedExpenses,
      expenses,
      loading,
      error,
      refreshExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
      clearExpenses,
      profile,
      settings?.currency,
      budgets,
      monthlyBudget,
      currentYear,
      currentMonth,
      currentPeriodLabel,
      currentMonthExpenses,
      previousMonthExpenses,
      totalSpent,
      remainingBudget,
      percentUsed,
      percentRemaining,
      dailyAverage,
      monthlyComparison,
      categoryBreakdown,
      topCategory,
      largestExpense,
      budgetStatus,
      spendingInsight,
      updateBudgets,
      resetToDefaults,
    ],
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
