import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function CategoryAnalysis({ categories = [], totalSpent = 0 }) {
  // Sort descending by amount
  const sorted = [...categories].sort((a, b) => b.amount - a.amount);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div>
          <CardTitle>Category Analysis</CardTitle>
          <CardDescription>Deep dive into your budget distribution</CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
        {sorted.map((cat) => {
          const pctOfTotal = totalSpent > 0 ? (cat.amount / totalSpent) * 100 : 0;
          return (
            <div
              key={cat.category}
              className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-white hover:bg-slate-50/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border"
                    style={{ backgroundColor: cat.bgColor, borderColor: cat.borderColor }}
                  >
                    {cat.emoji}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{cat.name}</h4>
                    <p className="text-[11px] text-slate-500">{cat.count || 0} transactions</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">
                    {formatCurrency(cat.amount)}
                  </div>
                  <div className="text-xs font-semibold text-indigo-600">
                    {formatPercent(pctOfTotal)} of total
                  </div>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(0, pctOfTotal))}%`,
                    backgroundColor: cat.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
