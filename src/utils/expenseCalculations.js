import { CATEGORIES } from "../data/categories.js";

/**
 * Filter expenses belonging to a specific month and year (e.g. 2026-09)
 * @param {Array} expenses
 * @param {number} year - full year, e.g. 2026
 * @param {number} month - 1-indexed month, 1 to 12
 * @returns {Array}
 */
export function filterExpensesByMonth(expenses = [], year = 2026, month = 9) {
  if (!Array.isArray(expenses)) return [];
  const monthStr = String(month).padStart(2, '0');
  const targetPrefix = `${year}-${monthStr}`;
  return expenses.filter(exp => exp.date && exp.date.startsWith(targetPrefix));
}

/**
 * Filter expenses by arbitrary date range preset ('week', 'month', 'last_month', 'year', 'all')
 */
export function filterExpensesByRange(expenses = [], range = 'month') {
  if (!Array.isArray(expenses)) return [];

  // Default reference date is Sep 2026 based on project context
  const refDate = new Date('2026-09-30T23:59:59');

  switch (range) {
    case 'week': {
      // Last 7 days in active mock range (e.g. Sep 21 - Sep 28)
      const weekStart = new Date('2026-09-21T00:00:00');
      return expenses.filter(exp => {
        const d = new Date(exp.date);
        return d >= weekStart && d <= refDate;
      });
    }
    case 'month':
    default:
      return filterExpensesByMonth(expenses, 2026, 9);
    case 'last_month':
      return filterExpensesByMonth(expenses, 2026, 8);
    case 'year':
      return expenses.filter(exp => exp.date && exp.date.startsWith('2026'));
  }
}

/**
 * Calculate total spent from an array of expenses
 * @param {Array} expenses
 * @returns {number}
 */
export function calculateTotalSpent(expenses = []) {
  if (!Array.isArray(expenses) || expenses.length === 0) return 0;
  return expenses.reduce((acc, curr) => {
    const val = Number(curr.amount) || 0;
    return acc + val;
  }, 0);
}

/**
 * Calculate remaining budget
 * @param {number} budgetLimit
 * @param {number} totalSpent
 * @returns {number} (positive if remaining, negative if over budget)
 */
export function calculateRemainingBudget(budgetLimit = 0, totalSpent = 0) {
  const limit = Number(budgetLimit) || 0;
  const spent = Number(totalSpent) || 0;
  return limit - spent;
}

/**
 * Calculate percentage safely (0 - 100+)
 * @param {number} part
 * @param {number} total
 * @returns {number}
 */
export function calculatePercentage(part = 0, total = 0) {
  const p = Number(part) || 0;
  const t = Number(total) || 0;
  if (t <= 0) return 0;
  const pct = (p / t) * 100;
  return Number(pct.toFixed(1));
}

/**
 * Calculate daily average spending
 * @param {Array} expenses
 * @param {number} [daysCount=30]
 * @returns {number}
 */
export function calculateDailyAverage(expenses = [], daysCount = 30) {
  const total = calculateTotalSpent(expenses);
  const days = Math.max(1, Number(daysCount) || 30);
  return Math.round(total / days);
}

/**
 * Calculate spending broken down by category
 * Returns array sorted descending by spent amount
 * @param {Array} expenses
 * @param {Object} [categoryBudgets={}]
 * @returns {Array<{category: string, amount: number, percentage: number, count: number, limit: number, emoji: string, color: string}>}
 */
export function calculateCategorySpending(expenses = [], categoryBudgets = {}) {
  const total = calculateTotalSpent(expenses);
  const map = {};

  // Initialize with all known categories to ensure complete map
  CATEGORIES.forEach(cat => {
    map[cat.id] = {
      category: cat.id,
      name: cat.name,
      emoji: cat.emoji,
      color: cat.color,
      bgColor: cat.bgColor,
      borderColor: cat.borderColor,
      amount: 0,
      count: 0,
      limit: categoryBudgets[cat.id] || 0,
    };
  });

  if (Array.isArray(expenses)) {
    expenses.forEach(item => {
      const catKey = item.category || 'Other';
      if (!map[catKey]) {
        map[catKey] = {
          category: catKey,
          name: catKey,
          emoji: '💡',
          color: '#64748B',
          bgColor: '#F8FAFC',
          borderColor: '#E2E8F0',
          amount: 0,
          count: 0,
          limit: categoryBudgets[catKey] || 0,
        };
      }
      map[catKey].amount += Number(item.amount) || 0;
      map[catKey].count += 1;
    });
  }

  return Object.values(map)
    .map(item => ({
      ...item,
      percentage: total > 0 ? calculatePercentage(item.amount, total) : 0,
      percentOfBudget: item.limit > 0 ? calculatePercentage(item.amount, item.limit) : 0,
      remaining: (item.limit || 0) - item.amount,
      isOverBudget: item.limit > 0 && item.amount > item.limit
    }))
    .sort((a, b) => b.amount - a.amount);
}

/**
 * Calculate month-over-month comparison
 * @param {Array} currentMonthExpenses
 * @param {Array} previousMonthExpenses
 * @returns {{current: number, previous: number, diffAmount: number, diffPercent: number, isDecrease: boolean}}
 */
export function calculateMonthlyComparison(currentMonthExpenses = [], previousMonthExpenses = []) {
  const current = calculateTotalSpent(currentMonthExpenses);
  const previous = calculateTotalSpent(previousMonthExpenses);
  const diffAmount = current - previous;
  let diffPercent = 0;

  if (previous > 0) {
    diffPercent = Number((((current - previous) / previous) * 100).toFixed(1));
  } else if (current > 0) {
    diffPercent = 100;
  }

  return {
    current,
    previous,
    diffAmount,
    diffPercent: Math.abs(diffPercent),
    isDecrease: diffAmount < 0,
    rawDiffPercent: diffPercent
  };
}

/**
 * Find top spending category
 * @param {Array} expenses
 * @returns {{category: string, amount: number, percentage: number, emoji: string}}
 */
export function getTopCategory(expenses = []) {
  const breakdown = calculateCategorySpending(expenses);
  const top = breakdown.find(c => c.amount > 0);
  if (!top) {
    return { category: "None", amount: 0, percentage: 0, emoji: "🏷️" };
  }
  return top;
}

/**
 * Find largest single expense transaction
 * @param {Array} expenses
 * @returns {Object|null}
 */
export function getLargestExpense(expenses = []) {
  if (!Array.isArray(expenses) || expenses.length === 0) return null;
  return expenses.reduce((max, curr) => {
    const currAmount = Number(curr.amount) || 0;
    const maxAmount = max ? Number(max.amount) || 0 : 0;
    return currAmount > maxAmount ? curr : max;
  }, null);
}

/**
 * Determine budget status tier and message based on percentage used
 * @param {number} percentUsed
 * @param {number} remaining
 * @returns {{status: 'good'|'warning'|'danger'|'exceeded', label: string, message: string, color: string, badgeBg: string}}
 */
export function getBudgetStatus(percentUsed = 0, remaining = 0) {
  if (percentUsed >= 100 || remaining < 0) {
    return {
      status: 'exceeded',
      label: 'Budget Exceeded',
      message: `🚨 You've exceeded your monthly budget by ₹${Math.abs(remaining).toLocaleString('en-IN')}. Pause non-essential spends!`,
      color: '#EF4444',
      badgeBg: 'bg-red-50 text-red-700 border-red-200'
    };
  }

  if (percentUsed >= 90) {
    return {
      status: 'danger',
      label: 'Nearly Exhausted',
      message: `🚨 You're at ${percentUsed.toFixed(1)}% of your monthly budget. Only ₹${remaining.toLocaleString('en-IN')} remaining!`,
      color: '#F97316',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200'
    };
  }

  if (percentUsed >= 70) {
    return {
      status: 'warning',
      label: 'Approaching Limit',
      message: `⚠️ You've used ${percentUsed.toFixed(1)}% of your monthly budget. Watch out for weekend treats!`,
      color: '#F59E0B',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
    };
  }

  return {
    status: 'good',
    label: 'On Track',
    message: `🎯 You're doing great! You still have ${(100 - percentUsed).toFixed(1)}% (₹${remaining.toLocaleString('en-IN')}) of your budget left.`,
    color: '#22C55E',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };
}

/**
 * Get days with the highest total spending
 * @param {Array} expenses
 * @param {number} limit
 * @returns {Array<{date: string, formattedDate: string, amount: number, items: Array}>}
 */
export function getHighestSpendingDays(expenses = [], limit = 4) {
  if (!Array.isArray(expenses)) return [];

  const grouped = {};
  expenses.forEach(exp => {
    if (!exp.date) return;
    if (!grouped[exp.date]) {
      grouped[exp.date] = {
        date: exp.date,
        amount: 0,
        items: []
      };
    }
    grouped[exp.date].amount += Number(exp.amount) || 0;
    grouped[exp.date].items.push(exp);
  });

  return Object.values(grouped)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

/**
 * Generate deterministic student spending insight based on expenses & budgets
 * @param {Array} expenses
 * @param {Object} budgets
 * @returns {{type: 'positive'|'warning'|'info'|'tip', icon: string, title: string, text: string}}
 */
export function generateSpendingInsight(expenses = [], budgets = {}) {
  const totalSpent = calculateTotalSpent(expenses);
  const monthlyLimit = Number(budgets?.monthlyLimit) || 8000;
  const categoryBudgets = budgets?.categories || {};
  const remaining = monthlyLimit - totalSpent;
  const percentUsed = calculatePercentage(totalSpent, monthlyLimit);
  const categories = calculateCategorySpending(expenses, categoryBudgets);

  // Check if any category exceeded
  const exceededCategory = categories.find(c => c.isOverBudget);
  if (exceededCategory) {
    const overAmt = exceededCategory.amount - exceededCategory.limit;
    return {
      type: 'warning',
      icon: '⚠️',
      title: `${exceededCategory.name} Budget Exceeded`,
      text: `You've spent ₹${overAmt.toLocaleString('en-IN')} over your ₹${exceededCategory.limit.toLocaleString('en-IN')} limit for ${exceededCategory.name}. Consider shifting funds from other categories.`
    };
  }

  // Check if food is nearing budget
  const food = categories.find(c => c.category === 'Food');
  if (food && food.percentOfBudget >= 70 && food.percentOfBudget < 100) {
    return {
      type: 'warning',
      icon: '🍔',
      title: 'Food Budget Watch',
      text: `Your food spending is at ${food.percentOfBudget}% (₹${food.amount}/₹${food.limit}). Reducing canteen snacks by ₹100/week will keep you safely on track.`
    };
  }

  // Check if entertainment nearing budget
  const entertainment = categories.find(c => c.category === 'Entertainment');
  if (entertainment && entertainment.percentOfBudget >= 70) {
    return {
      type: 'warning',
      icon: '🎮',
      title: 'Entertainment Alert',
      text: `Your entertainment budget is ${entertainment.percentOfBudget}% used up. Save group movie plans for after exams!`
    };
  }

  // Check if pace is great
  if (percentUsed < 65 && remaining > 2500) {
    return {
      type: 'positive',
      icon: '🎯',
      title: 'Healthy Budget Pace',
      text: `You're on track to stay under your monthly budget with ₹${remaining.toLocaleString('en-IN')} (${(100 - percentUsed).toFixed(1)}%) still available.`
    };
  }

  // General positive fallback
  return {
    type: 'info',
    icon: '💡',
    title: 'Smart Spending Tip',
    text: `Your daily average of ₹${calculateDailyAverage(expenses)} is well within your daily allowance of ₹${Math.round(monthlyLimit / 30)}.`
  };
}

/**
 * Prepare daily spending series for Recharts
 * @param {Array} expenses
 * @param {number} daysInMonth
 * @returns {Array<{day: string, date: string, amount: number, cumulative: number}>}
 */
export function getDailySpendingTimeline(expenses = [], daysInMonth = 30) {
  const dailyMap = {};
  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = String(d).padStart(2, '0');
    const dateStr = `2026-09-${dayStr}`;
    dailyMap[dateStr] = {
      day: `Sep ${d}`,
      date: dateStr,
      amount: 0,
      cumulative: 0
    };
  }

  if (Array.isArray(expenses)) {
    expenses.forEach(exp => {
      if (exp.date && dailyMap[exp.date]) {
        dailyMap[exp.date].amount += Number(exp.amount) || 0;
      }
    });
  }

  let runningTotal = 0;
  return Object.values(dailyMap).map(item => {
    runningTotal += item.amount;
    return {
      ...item,
      cumulative: runningTotal
    };
  });
}

/**
 * Prepare weekly aggregated spending series for Recharts
 * @param {Array} expenses
 * @returns {Array<{week: string, amount: number}>}
 */
export function getWeeklySpendingTimeline(expenses = []) {
  const weeks = [
    { week: 'Week 1 (Sep 1-7)', amount: 0, start: 1, end: 7 },
    { week: 'Week 2 (Sep 8-14)', amount: 0, start: 8, end: 14 },
    { week: 'Week 3 (Sep 15-21)', amount: 0, start: 15, end: 21 },
    { week: 'Week 4 (Sep 22-30)', amount: 0, start: 22, end: 30 },
  ];

  if (Array.isArray(expenses)) {
    expenses.forEach(exp => {
      if (!exp.date) return;
      const day = parseInt(exp.date.split('-')[2], 10);
      if (isNaN(day)) return;

      const w = weeks.find(item => day >= item.start && day <= item.end);
      if (w) {
        w.amount += Number(exp.amount) || 0;
      }
    });
  }

  return weeks.map(w => ({ week: w.week, amount: w.amount }));
}
