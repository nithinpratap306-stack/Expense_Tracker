import React from 'react';
import { Flame, Calendar, Tag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getHighestSpendingDays } from '../../utils/expenseCalculations';

export function SpendingDays({ expenses = [] }) {
  const peakDays = getHighestSpendingDays(expenses, 4);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <span>Highest Spending Days</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardTitle>
          <CardDescription>Days with notable expenditure peaks</CardDescription>
        </div>
      </CardHeader>

      {peakDays.length === 0 ? (
        <div className="text-center py-6 text-slate-400 text-xs">
          No daily records found
        </div>
      ) : (
        <div className="space-y-3">
          {peakDays.map((item, index) => {
            const rankBadges = ['#EF4444', '#F97316', '#F59E0B', '#64748B'];
            const sampleTitles = item.items.map(i => i.title).slice(0, 2).join(' + ');

            return (
              <div
                key={item.date}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: rankBadges[index] || '#64748B' }}
                  >
                    #{index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(item.date, 'short')}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {sampleTitles}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-slate-900">
                    {formatCurrency(item.amount)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {item.items.length} {item.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
