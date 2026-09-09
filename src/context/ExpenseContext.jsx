import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { expenseService } from '../services/expenseService';
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
} from '../utils/expenseCalculations';

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => expenseService.getExpenses());
  const [budgets, setBudgets] = useState(() => expenseService.getBudgets());
  const [user, setUser] = useState(() => expenseService.getUser());

  // Current active period is September 2026
  const currentYear = 2026;
  const currentMonth = 9;
  const currentPeriodLabel = "September 2026";

  // Filter current month expenses
  const currentMonthExpenses = useMemo(() => {
    return filterExpensesByMonth(expenses, currentYear, currentMonth);
  }, [expenses, currentYear, currentMonth]);

  // Filter previous month (August 2026) for comparisons
  const previousMonthExpenses = useMemo(() => {
    return filterExpensesByMonth(expenses, currentYear, currentMonth - 1);
  }, [expenses, currentYear, currentMonth]);

  // Key metrics for current month
  const totalSpent = useMemo(() => {
    return calculateTotalSpent(currentMonthExpenses);
  }, [currentMonthExpenses]);

  const monthlyBudget = budgets.monthlyLimit || 8000;

  const remainingBudget = useMemo(() => {
    return calculateRemainingBudget(monthlyBudget, totalSpent);
  }, [monthlyBudget, totalSpent]);

  const percentUsed = useMemo(() => {
    return calculatePercentage(totalSpent, monthlyBudget);
  }, [totalSpent, monthlyBudget]);

  const percentRemaining = useMemo(() => {
    return Math.max(0, Number((100 - percentUsed).toFixed(1)));
  }, [percentUsed]);

  const dailyAverage = useMemo(() => {
    // September has 30 days
    return calculateDailyAverage(currentMonthExpenses, 30);
  }, [currentMonthExpenses]);

  const monthlyComparison = useMemo(() => {
    return calculateMonthlyComparison(currentMonthExpenses, previousMonthExpenses);
  }, [currentMonthExpenses, previousMonthExpenses]);

  const categoryBreakdown = useMemo(() => {
    return calculateCategorySpending(currentMonthExpenses, budgets.categories);
  }, [currentMonthExpenses, budgets.categories]);

  const topCategory = useMemo(() => {
    return getTopCategory(currentMonthExpenses);
  }, [currentMonthExpenses]);

  const largestExpense = useMemo(() => {
    return getLargestExpense(currentMonthExpenses);
  }, [currentMonthExpenses]);

  const budgetStatus = useMemo(() => {
    return getBudgetStatus(percentUsed, remainingBudget);
  }, [percentUsed, remainingBudget]);

  const spendingInsight = useMemo(() => {
    return generateSpendingInsight(currentMonthExpenses, budgets);
  }, [currentMonthExpenses, budgets]);

  // Update Budgets
  const updateBudgets = (newBudgets) => {
    setBudgets(prev => {
      const updated = {
        ...prev,
        ...newBudgets,
        categories: {
          ...prev.categories,
          ...(newBudgets.categories || {})
        }
      };
      expenseService.saveBudgets(updated);
      return updated;
    });
  };

  // Add new expense (for integration if teammate or quick-add needs it)
  const addExpense = (expenseData) => {
    const newEntry = {
      id: `exp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'UPI',
      ...expenseData,
      amount: Number(expenseData.amount) || 0
    };
    setExpenses(prev => {
      const updated = [newEntry, ...prev];
      expenseService.saveExpenses(updated);
      return updated;
    });
  };

  // Reset to default sample state
  const resetToDefaults = () => {
    const defaults = expenseService.resetToDefaults();
    setExpenses(defaults.expenses);
    setBudgets(defaults.budgets);
    setUser(defaults.user);
  };

  const value = {
    user,
    expenses,
    budgets,
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
    addExpense,
    resetToDefaults,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
