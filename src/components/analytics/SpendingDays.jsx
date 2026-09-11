import React from 'react';
import { Flame, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getHighestSpendingDays } from '@/utils/expenseCalculations';

export function SpendingDays({ expenses = [] }) {
  const peakDays = getHighestSpendingDays(expenses, 4);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <span>Highest Spending Days</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardTitle>
          <CardDescription>Days with notable expenditure peaks</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {peakDays.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-xs">
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
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/60 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: rankBadges[index] || '#64748B' }}
                    >
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        {formatDate(item.date, 'short')}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                        {sampleTitles}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-foreground">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      {item.items.length} {item.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
