import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency, formatPercent } from '@/utils/formatters';

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
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Budget Progress</CardTitle>
          <CardDescription>Pacing against your monthly allowance</CardDescription>
        </div>
        <Link
          to="/budget"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 group"
        >
          Manage <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      <CardContent className="space-y-5 pt-2">
        {/* Main Monthly Budget Progress */}
        <div className="p-4 rounded-xl bg-muted/60 border border-border">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-semibold text-foreground">Monthly Budget</span>
            <span className="font-bold text-foreground">
              {formatCurrency(totalSpent)} <span className="text-muted-foreground font-normal">/ {formatCurrency(monthlyBudget)}</span>
            </span>
          </div>
          <ProgressBar
            value={percentUsed}
            autoColor
            size="md"
            className="mb-1.5"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPercent(percentUsed)} used</span>
            <span>{formatCurrency(Math.max(0, monthlyBudget - totalSpent))} remaining</span>
          </div>
        </div>

        {/* Category Budgets */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Top Category Limits
          </p>

          {trackedCategories.map((cat) => {
            const isOver = cat.amount > cat.limit;
            const pct = cat.limit > 0 ? (cat.amount / cat.limit) * 100 : 0;

            return (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                    {isOver && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-destructive bg-destructive/10 px-1.5 py-0.5 rounded font-semibold border border-destructive/20">
                        <AlertTriangle className="w-3 h-3" /> Exceeded
                      </span>
                    )}
                  </div>
                  <div className="text-right font-medium">
                    <span className={isOver ? "text-destructive font-bold" : "text-foreground"}>
                      {formatCurrency(cat.amount)}
                    </span>
                    <span className="text-muted-foreground"> / {formatCurrency(cat.limit)}</span>
                  </div>
                </div>

                <ProgressBar
                  value={pct}
                  size="sm"
                  color={isOver ? "bg-destructive" : pct >= 85 ? "bg-amber-500" : "bg-primary"}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
