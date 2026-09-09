import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export function BudgetStatus({ status }) {
  if (!status) return null;

  const config = {
    good: {
      Icon: CheckCircle2,
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/70',
      textColor: 'text-emerald-900',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      iconColor: 'text-emerald-600',
    },
    warning: {
      Icon: AlertTriangle,
      border: 'border-amber-200',
      bg: 'bg-amber-50/70',
      textColor: 'text-amber-900',
      badgeBg: 'bg-amber-100 text-amber-800',
      iconColor: 'text-amber-600',
    },
    danger: {
      Icon: AlertOctagon,
      border: 'border-orange-200',
      bg: 'bg-orange-50/70',
      textColor: 'text-orange-900',
      badgeBg: 'bg-orange-100 text-orange-800',
      iconColor: 'text-orange-600',
    },
    exceeded: {
      Icon: AlertOctagon,
      border: 'border-rose-200',
      bg: 'bg-rose-50/70',
      textColor: 'text-rose-900',
      badgeBg: 'bg-rose-100 text-rose-800',
      iconColor: 'text-rose-600',
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
      <div className={cn("p-2 rounded-xl bg-white shadow-xs shrink-0", item.iconColor)}>
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
