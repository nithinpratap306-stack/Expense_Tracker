import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function BudgetProgress({
  totalSpent = 0,
  monthlyBudget = 8000,
  percentUsed = 0,
  categories = []
}) {
  // Show key categories (top 4 or those with limits)
  const trackedCategories = categories.filter(c => c.limit > 0).slice(0, 4);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Budget Progress</CardTitle>
          <CardDescription>Pacing against your monthly allowance</CardDescription>
        </div>
        <Link
          to="/budget"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
        >
          Manage <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      {/* Main Monthly Budget Progress */}
      <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 mb-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-slate-800">Monthly Budget</span>
          <span className="font-bold text-slate-900">
            {formatCurrency(totalSpent)} <span className="text-slate-400 font-normal">/ {formatCurrency(monthlyBudget)}</span>
          </span>
        </div>
        <ProgressBar
          value={percentUsed}
          autoColor
          size="md"
          className="mb-1.5"
        />
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{formatPercent(percentUsed)} used</span>
          <span>{formatCurrency(Math.max(0, monthlyBudget - totalSpent))} remaining</span>
        </div>
      </div>

      {/* Category Budgets */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Top Category Limits
        </p>

        {trackedCategories.map((cat) => {
          const isOver = cat.amount > cat.limit;
          const pct = cat.limit > 0 ? (cat.amount / cat.limit) * 100 : 0;

          return (
            <div key={cat.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-800">
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                  {isOver && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded font-semibold border border-rose-200">
                      <AlertTriangle className="w-3 h-3" /> Exceeded
                    </span>
                  )}
                </div>
                <div className="text-right font-medium">
                  <span className={isOver ? "text-rose-600 font-bold" : "text-slate-900"}>
                    {formatCurrency(cat.amount)}
                  </span>
                  <span className="text-slate-400"> / {formatCurrency(cat.limit)}</span>
                </div>
              </div>

              <ProgressBar
                value={pct}
                size="sm"
                color={isOver ? "bg-rose-500" : pct >= 85 ? "bg-amber-500" : "bg-indigo-600"}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
