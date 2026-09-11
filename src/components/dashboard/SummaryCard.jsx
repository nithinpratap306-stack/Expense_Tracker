import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/utils/cn';

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
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60',
    negative: 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/60',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60',
    neutral: 'bg-muted text-muted-foreground border-border',
    indigo: 'bg-accent text-accent-foreground border-border',
  };

  return (
    <Card className={cn("flex flex-col justify-between h-full relative overflow-hidden p-5 sm:p-6", className)}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-xl bg-muted/80 flex items-center justify-center text-foreground">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="mt-1">
          <h2 className={cn("text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight", valueClassName)}>
            {value}
          </h2>
        </div>
      </div>

      <div className="mt-3">
        {progress !== undefined && (
          <div className="mb-2">
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
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
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
