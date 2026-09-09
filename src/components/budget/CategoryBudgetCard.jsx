import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function CategoryBudgetCard({ category, onEditClick }) {
  const {
    name,
    emoji,
    amount,
    limit,
    percentage,
    percentOfBudget,
    remaining,
    isOverBudget,
    bgColor,
    borderColor
  } = category;

  const hasLimit = limit > 0;
  const clampedPercent = hasLimit ? Math.min(100, percentOfBudget) : 0;

  return (
    <Card className="flex flex-col justify-between hover:border-slate-300 transition-all p-5">
      <div>
        {/* Header with Emoji and Status Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border shrink-0"
              style={{ backgroundColor: bgColor, borderColor: borderColor }}
            >
              {emoji}
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{name}</h4>
              <p className="text-[11px] text-slate-400">
                {hasLimit ? `Target: ${formatCurrency(limit)}` : 'No limit set'}
              </p>
            </div>
          </div>

          {hasLimit && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isOverBudget
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : percentOfBudget >= 85
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isOverBudget ? 'Exceeded' : `${formatPercent(percentOfBudget, 0)} used`}
            </span>
          )}
        </div>

        {/* Numbers Comparison */}
        <div className="my-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900">
              {formatCurrency(amount)}
            </span>
            <span className="text-xs text-slate-400">
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
                  ? "bg-rose-500"
                  : percentOfBudget >= 85
                  ? "bg-amber-500"
                  : "bg-indigo-600"
              }
            />
          </div>
        </div>
      </div>

      {/* Footer Remaining / Over status */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {hasLimit ? (
          isOverBudget ? (
            <span className="text-rose-600 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{formatCurrency(Math.abs(remaining))} over budget</span>
            </span>
          ) : (
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{formatCurrency(remaining)} remaining</span>
            </span>
          )
        ) : (
          <span className="text-slate-400">No cap configured</span>
        )}

        {onEditClick && (
          <button
            type="button"
            onClick={() => onEditClick(category)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            Adjust
          </button>
        )}
      </div>
    </Card>
  );
}
