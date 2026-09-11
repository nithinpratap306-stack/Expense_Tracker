import React from 'react';
import { TrendingDown, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

export function SpendingComparison({ comparison }) {
  const { current, previous, diffAmount, diffPercent, isDecrease } = comparison;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Spending Comparison</CardTitle>
          <CardDescription>Month-over-month expenditure change</CardDescription>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
            isDecrease
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
          }`}
        >
          {isDecrease ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
          <span>{isDecrease ? `-${diffPercent}%` : `+${diffPercent}%`}</span>
        </span>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        <div className="grid grid-cols-2 gap-4 my-1">
          <div className="p-4 rounded-xl bg-muted/60 border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-1">September (Current)</p>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">
              {formatCurrency(current)}
            </p>
            <span className="text-[11px] text-primary font-semibold mt-1 inline-block">
              Active Period
            </span>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-1">August (Last Month)</p>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">
              {formatCurrency(previous)}
            </p>
            <span className="text-[11px] text-muted-foreground font-medium mt-1 inline-block">
              Previous Cycle
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-border flex items-start gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            {isDecrease ? (
              <>
                You have spent <strong className="text-foreground">{formatCurrency(Math.abs(diffAmount))} less</strong> than last month. Outstanding discipline on campus expenses!
              </>
            ) : (
              <>
                You have spent <strong className="text-foreground">{formatCurrency(Math.abs(diffAmount))} more</strong> than last month. Check your high-ticket categories.
              </>
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
