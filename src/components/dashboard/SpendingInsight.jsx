import React from 'react';
import { Lightbulb, AlertTriangle, Sparkles, Compass } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

export function SpendingInsight({ insight }) {
  if (!insight) return null;

  const styleMap = {
    positive: {
      bg: 'bg-emerald-50/70 border-emerald-200/80',
      iconBg: 'bg-emerald-500 text-white shadow-emerald-200',
      title: 'text-emerald-900',
      badge: 'bg-emerald-100/70 text-emerald-800',
      Icon: Sparkles,
    },
    warning: {
      bg: 'bg-amber-50/70 border-amber-200/80',
      iconBg: 'bg-amber-500 text-white shadow-amber-200',
      title: 'text-amber-900',
      badge: 'bg-amber-100/70 text-amber-800',
      Icon: AlertTriangle,
    },
    info: {
      bg: 'bg-indigo-50/70 border-indigo-200/80',
      iconBg: 'bg-indigo-600 text-white shadow-indigo-200',
      title: 'text-indigo-900',
      badge: 'bg-indigo-100/70 text-indigo-800',
      Icon: Lightbulb,
    }
  };

  const currentStyle = styleMap[insight.type] || styleMap.info;
  const { Icon } = currentStyle;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5 flex items-start gap-3.5 transition-all shadow-xs",
        currentStyle.bg
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md",
          currentStyle.iconBg
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Smart Spending Insight
          </span>
          <span
            className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full",
              currentStyle.badge
            )}
          >
            {insight.type === 'positive' ? 'Healthy Pace' : insight.type === 'warning' ? 'Budget Notice' : 'Spending Fact'}
          </span>
        </div>
        <h4 className={cn("text-sm sm:text-base font-bold", currentStyle.title)}>
          {insight.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          {insight.text}
        </p>
      </div>
    </div>
  );
}
