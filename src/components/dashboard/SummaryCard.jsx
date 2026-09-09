import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

export function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeType = 'neutral',
  progress,
  className,
  valueClassName
}) {
  const badgeColors = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    negative: 'bg-rose-50 text-rose-700 border-rose-200/60',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  };

  return (
    <Card className={cn("flex flex-col justify-between h-full relative overflow-hidden", className)}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs sm:text-sm font-medium text-slate-500">{title}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-xl bg-slate-100/80 flex items-center justify-center text-slate-600">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="mt-1">
          <h2 className={cn("text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight", valueClassName)}>
            {value}
          </h2>
        </div>
      </div>

      <div className="mt-3">
        {progress !== undefined && (
          <div className="mb-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {badge && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                badgeColors[badgeType] || badgeColors.neutral
              )}
            >
              {badge}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-slate-500">{subtitle}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
