import { MOCK_EXPENSES, DEFAULT_USER } from '../data/mockExpenses';
import { DEFAULT_BUDGETS } from '../data/mockBudgets';

const EXPENSES_STORAGE_KEY = 'campusspend_expenses_v1';
const BUDGETS_STORAGE_KEY = 'campusspend_budgets_v1';
const USER_STORAGE_KEY = 'campusspend_user_v1';

export const expenseService = {
  /**
   * Get all expenses (from localStorage or default mock)
   */
  getExpenses() {
    try {
      const stored = localStorage.getItem(EXPENSES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read expenses from localStorage, using mock data', e);
    }
    return MOCK_EXPENSES;
  },

  /**
   * Save expenses
   */
  saveExpenses(expenses) {
    try {
      localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to persist expenses to localStorage', e);
    }
  },

  /**
   * Get budgets (monthly & categories)
   */
  getBudgets() {
    try {
      const stored = localStorage.getItem(BUDGETS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read budgets from localStorage, using default', e);
    }
    return DEFAULT_BUDGETS;
  },

  /**
   * Update budget settings
   */
  saveBudgets(budgets) {
    try {
      localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify(budgets));
    } catch (e) {
      console.error('Failed to persist budgets to localStorage', e);
    }
  },

  /**
   * Get current user profile
   */
  getUser() {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read user profile from localStorage', e);
    }
    return DEFAULT_USER;
  },

  /**
   * Reset data back to defaults (useful for demo & testing)
   */
  resetToDefaults() {
    try {
      localStorage.removeItem(EXPENSES_STORAGE_KEY);
      localStorage.removeItem(BUDGETS_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset storage', e);
    }
    return {
      expenses: MOCK_EXPENSES,
      budgets: DEFAULT_BUDGETS,
      user: DEFAULT_USER
    };
  }
};
