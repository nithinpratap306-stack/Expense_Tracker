import React from 'react';
import { Target, Edit3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercent } from '@/utils/formatters';

export function OverallBudget({
  monthlyBudget = 8000,
  totalSpent = 0,
  remainingBudget = 3240,
  percentUsed = 59.5,
  onOpenEditModal
}) {
  const isOver = remainingBudget < 0;

  // SVG Circular Ring calculations
  const radius = 64;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const clampedPercent = Math.min(100, Math.max(0, percentUsed));
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  let ringColor = "#6366F1"; // indigo
  if (percentUsed >= 100) ringColor = "#EF4444";
  else if (percentUsed >= 85) ringColor = "#F59E0B";
  else if (percentUsed >= 70) ringColor = "#EAB308";
  else ringColor = "#10B981";

  return (
    <Card className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-card border border-border">
      {/* Metric details */}
      <div className="space-y-4 flex-1 text-center md:text-left w-full">
        <div className="flex items-center justify-between md:justify-start gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold border border-border">
            <Target className="w-3.5 h-3.5" />
            <span>September Monthly Budget</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenEditModal}
            className="flex items-center gap-1.5 shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Limits</span>
          </Button>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Total Monthly Allowance
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-0.5">
            {formatCurrency(monthlyBudget)}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 max-w-sm mx-auto md:mx-0">
          <div className="p-3 rounded-xl bg-muted/60 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground block">Total Spent</span>
            <span className="text-base sm:text-lg font-bold text-foreground">
              {formatCurrency(totalSpent)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-muted/60 border border-border">
            <span className="text-[11px] font-semibold text-muted-foreground block">
              {isOver ? "Over Budget" : "Remaining"}
            </span>
            <span className={`text-base sm:text-lg font-bold ${isOver ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
              {formatCurrency(Math.abs(remainingBudget))}
            </span>
          </div>
        </div>
      </div>

      {/* Circular Progress Ring */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            stroke="rgba(148, 163, 184, 0.2)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Active progress */}
          <circle
            stroke={ringColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-xl sm:text-2xl font-black text-foreground">
            {formatPercent(percentUsed, 0)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Used
          </span>
        </div>
      </div>
    </Card>
  );
}
