import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export function EmptyState({
  icon: Icon = Sparkles,
  title = "No expenses yet",
  description = "Add your first expense to start seeing your spending insights and budget progress.",
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-10 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-800 mb-1">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
