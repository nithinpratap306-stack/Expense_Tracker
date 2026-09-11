import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/utils/formatters';

export function CategoryAnalysis({ categories = [], totalSpent = 0 }) {
  const sorted = [...categories].sort((a, b) => b.amount - a.amount);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div>
          <CardTitle>Category Analysis</CardTitle>
          <CardDescription>Deep dive into your budget distribution</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {sorted.map((cat) => {
            const pctOfTotal = totalSpent > 0 ? (cat.amount / totalSpent) * 100 : 0;
            return (
              <div
                key={cat.category}
                className="p-3.5 rounded-xl border border-border hover:border-primary/30 transition-colors bg-card hover:bg-muted/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border border-border"
                      style={{ backgroundColor: cat.bgColor }}
                    >
                      {cat.emoji}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{cat.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{cat.count || 0} transactions</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-foreground">
                      {formatCurrency(cat.amount)}
                    </div>
                    <div className="text-xs font-semibold text-primary">
                      {formatPercent(pctOfTotal)} of total
                    </div>
                  </div>
                </div>

                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
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
      </CardContent>
    </Card>
  );
}
