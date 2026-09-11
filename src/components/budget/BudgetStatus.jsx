import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { cn } from '@/utils/cn';

export function BudgetStatus({ status }) {
  if (!status) return null;

  const config = {
    good: {
      Icon: CheckCircle2,
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/10',
      textColor: 'text-emerald-900 dark:text-emerald-300',
      badgeBg: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-200',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    warning: {
      Icon: AlertTriangle,
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/10',
      textColor: 'text-amber-900 dark:text-amber-300',
      badgeBg: 'bg-amber-500/20 text-amber-800 dark:text-amber-200',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    danger: {
      Icon: AlertOctagon,
      border: 'border-orange-500/20',
      bg: 'bg-orange-500/10',
      textColor: 'text-orange-900 dark:text-orange-300',
      badgeBg: 'bg-orange-500/20 text-orange-800 dark:text-orange-200',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    exceeded: {
      Icon: AlertOctagon,
      border: 'border-destructive/20',
      bg: 'bg-destructive/10',
      textColor: 'text-destructive-foreground dark:text-destructive',
      badgeBg: 'bg-destructive/20 text-destructive',
      iconColor: 'text-destructive',
    }
  };

  const item = config[status.status] || config.good;
  const { Icon } = item;

  return (
    <div
      className={cn(
        "flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl border shadow-xs transition-all",
        item.bg,
        item.border
      )}
    >
      <div className={cn("p-2 rounded-xl bg-card shadow-xs shrink-0 border border-border", item.iconColor)}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn("text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md", item.badgeBg)}>
            {status.label}
          </span>
        </div>
        <p className={cn("text-xs sm:text-sm font-semibold", item.textColor)}>
          {status.message}
        </p>
      </div>
    </div>
  );
}
