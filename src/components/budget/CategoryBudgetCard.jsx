import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency, formatPercent } from '@/utils/formatters';

export function CategoryBudgetCard({ category, onEditClick }) {
  const {
    name,
    emoji,
    amount,
    limit,
    percentOfBudget,
    remaining,
    isOverBudget,
    bgColor,
  } = category;

  const hasLimit = limit > 0;

  return (
    <Card className="flex flex-col justify-between hover:border-primary/40 transition-all p-5">
      <div>
        {/* Header with Emoji and Status Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border border-border shrink-0"
              style={{ backgroundColor: bgColor }}
            >
              {emoji}
            </span>
            <div>
              <h4 className="text-sm font-bold text-foreground">{name}</h4>
              <p className="text-[11px] text-muted-foreground">
                {hasLimit ? `Target: ${formatCurrency(limit)}` : 'No limit set'}
              </p>
            </div>
          </div>

          {hasLimit && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isOverBudget
                  ? 'bg-destructive/10 text-destructive border-destructive/20'
                  : percentOfBudget >= 85
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              }`}
            >
              {isOverBudget ? 'Exceeded' : `${formatPercent(percentOfBudget, 0)} used`}
            </span>
          )}
        </div>

        {/* Numbers Comparison */}
        <div className="my-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-foreground">
              {formatCurrency(amount)}
            </span>
            <span className="text-xs text-muted-foreground">
              of {hasLimit ? formatCurrency(limit) : '∞'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-2">
            <ProgressBar
              value={percentOfBudget}
              size="sm"
              color={
                isOverBudget
                  ? "bg-destructive"
                  : percentOfBudget >= 85
                  ? "bg-amber-500"
                  : "bg-primary"
              }
            />
          </div>
        </div>
      </div>

      {/* Footer Remaining / Over status */}
      <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
        {hasLimit ? (
          isOverBudget ? (
            <span className="text-destructive font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{formatCurrency(Math.abs(remaining))} over</span>
            </span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{formatCurrency(remaining)} left</span>
            </span>
          )
        ) : (
          <span className="text-muted-foreground">No cap set</span>
        )}

        {onEditClick && (
          <button
            type="button"
            onClick={() => onEditClick(category)}
            className="text-xs font-semibold text-primary hover:underline transition-colors cursor-pointer"
          >
            Adjust
          </button>
        )}
      </div>
    </Card>
  );
}
