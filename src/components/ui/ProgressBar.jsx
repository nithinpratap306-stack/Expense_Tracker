import React from 'react';
import { cn } from '../../utils/cn';

export function ProgressBar({
  value = 0,
  max = 100,
  color,
  autoColor = false,
  size = 'md',
  className,
  showLabel = false,
}) {
  const numericValue = Number(value) || 0;
  const clampedPercent = Math.min(100, Math.max(0, numericValue));
  const isOverBudget = numericValue > 100;

  // Auto color determination if autoColor is enabled
  let barColorClass = color || "bg-indigo-600";
  if (autoColor) {
    if (numericValue >= 100) {
      barColorClass = "bg-rose-500";
    } else if (numericValue >= 85) {
      barColorClass = "bg-amber-500";
    } else if (numericValue >= 70) {
      barColorClass = "bg-yellow-500";
    } else {
      barColorClass = "bg-emerald-500";
    }
  }

  const heights = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full bg-slate-100 rounded-full overflow-hidden relative",
          heights[size] || heights.md
        )}
        role="progressbar"
        aria-valuenow={numericValue}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            barColorClass
          )}
          style={{ width: `${clampedPercent}%` }}
        />
        {isOverBudget && (
          <div className="absolute inset-0 bg-rose-500/20 animate-pulse pointer-events-none rounded-full" />
        )}
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
          <span>{numericValue.toFixed(1)}% used</span>
          {isOverBudget && <span className="text-rose-600 font-medium">Limit exceeded!</span>}
        </div>
      )}
    </div>
  );
}
