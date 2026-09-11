import React, { useState, useMemo } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import { AnalyticsSummary } from '@/components/analytics/AnalyticsSummary';
import { SpendingTrend } from '@/components/analytics/SpendingTrend';
import { CategoryAnalysis } from '@/components/analytics/CategoryAnalysis';
import { SpendingComparison } from '@/components/analytics/SpendingComparison';
import { SpendingDays } from '@/components/analytics/SpendingDays';
import { CategoryTrend } from '@/components/analytics/CategoryTrend';
import {
  filterExpensesByRange,
  calculateTotalSpent,
  calculateDailyAverage,
  calculateCategorySpending,
  getTopCategory,
  getLargestExpense,
} from '@/utils/expenseCalculations';

export function Analytics() {
  const { expenses, monthlyComparison, budgets } = useExpenses();
  const [selectedRange, setSelectedRange] = useState('month'); // 'week' | 'month' | 'last_month' | 'year'

  // Filter expenses according to chosen range
  const filteredExpenses = useMemo(() => {
    return filterExpensesByRange(expenses, selectedRange);
  }, [expenses, selectedRange]);

  const totalSpent = useMemo(() => {
    return calculateTotalSpent(filteredExpenses);
  }, [filteredExpenses]);

  const daysCountMap = {
    week: 7,
    month: 30,
    last_month: 31,
    year: 270 // ~9 months through September
  };

  const dailyAverage = useMemo(() => {
    return calculateDailyAverage(filteredExpenses, daysCountMap[selectedRange] || 30);
  }, [filteredExpenses, selectedRange]);

  const categoryBreakdown = useMemo(() => {
    return calculateCategorySpending(filteredExpenses, budgets?.categories || {});
  }, [filteredExpenses, budgets]);

  const topCategory = useMemo(() => {
    return getTopCategory(filteredExpenses);
  }, [filteredExpenses]);

  const largestExpense = useMemo(() => {
    return getLargestExpense(filteredExpenses);
  }, [filteredExpenses]);

  const rangeOptions = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'last_month', label: 'Last Month' },
    { id: 'year', label: 'This Year' },
  ];

  const currentPeriodText = {
    week: 'This Week (Sep 21-28)',
    month: 'September 2026',
    last_month: 'August 2026',
    year: 'Year 2026'
  }[selectedRange] || 'Selected Period';

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8 animate-fade-in">
      {/* Analytics Header & Date-Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Analytics
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Understand where your money goes.
          </p>
        </div>

        {/* Date-Range Selector Controls */}
        <div className="inline-flex p-1 bg-card border border-border rounded-2xl shadow-xs self-start sm:self-auto flex-wrap">
          {rangeOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedRange(opt.id)}
              className={`px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                selectedRange === opt.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Analytics Summary Cards */}
      <AnalyticsSummary
        totalSpent={totalSpent}
        dailyAverage={dailyAverage}
        topCategory={topCategory}
        largestExpense={largestExpense}
        periodLabel={currentPeriodText}
      />

      {/* 2. Spending Trend & 3. Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingTrend expenses={filteredExpenses} />
        </div>
        <div className="lg:col-span-1">
          <CategoryAnalysis
            categories={categoryBreakdown}
            totalSpent={totalSpent}
          />
        </div>
      </div>

      {/* 4. Spending Comparison & 5. Highest Spending Days */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingComparison comparison={monthlyComparison} />
        <SpendingDays expenses={filteredExpenses} />
      </div>

      {/* 6. Category Trend Over Time */}
      <CategoryTrend
        expenses={filteredExpenses}
        categories={categoryBreakdown}
      />
    </div>
  );
}

export default Analytics;
