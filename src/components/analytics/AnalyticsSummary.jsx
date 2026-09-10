import React from 'react';
import { IndianRupee, Calendar, Award, Receipt } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function AnalyticsSummary({
  totalSpent = 0,
  dailyAverage = 0,
  topCategory = {},
  largestExpense = null,
  periodLabel = 'This Month'
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Total Spending */}
      <Card className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500 mb-2">
            <span>Total Spending</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(totalSpent)}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Recorded across {periodLabel.toLowerCase()}
        </p>
      </Card>

      {/* 2. Daily Average */}
      <Card className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500 mb-2">
            <span>Daily Average</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(dailyAverage)}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Daily spend rate for student life
        </p>
      </Card>

      {/* 3. Top Category */}
      <Card className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500 mb-2">
            <span>Top Category</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl">{topCategory?.emoji || '🍔'}</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
              {topCategory?.name || 'Food'}
            </h3>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {formatCurrency(topCategory?.amount || 0)} ({formatPercent(topCategory?.percentage || 0)} of total)
        </p>
      </Card>

      {/* 4. Largest Expense */}
      <Card className="flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500 mb-2">
            <span>Largest Expense</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(largestExpense?.amount || 0)}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mt-2 truncate font-medium">
          {largestExpense?.title || 'No expenses logged'}
        </p>
      </Card>
    </div>
  );
}
