import React from 'react';
import { Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export function SpendingInsight({ insight }) {
  if (!insight) return null;

  const styleMap = {
    positive: {
      bg: 'bg-emerald-50/70 border-emerald-200/80 dark:bg-emerald-950/30 dark:border-emerald-800/60',
      iconBg: 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none',
      title: 'text-emerald-900 dark:text-emerald-300',
      text: 'text-emerald-800/90 dark:text-emerald-200/80',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      Icon: Sparkles,
    },
    warning: {
      bg: 'bg-amber-50/70 border-amber-200/80 dark:bg-amber-950/30 dark:border-amber-800/60',
      iconBg: 'bg-amber-500 text-white shadow-amber-200 dark:shadow-none',
      title: 'text-amber-900 dark:text-amber-300',
      text: 'text-amber-800/90 dark:text-amber-200/80',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      Icon: AlertTriangle,
    },
    info: {
      bg: 'bg-accent/60 border-border',
      iconBg: 'bg-primary text-primary-foreground shadow-primary/20',
      title: 'text-foreground',
      text: 'text-muted-foreground',
      badge: 'bg-primary/10 text-primary',
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
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
        <p className={cn("text-xs sm:text-sm mt-1 leading-relaxed", currentStyle.text)}>
          {insight.text}
        </p>
      </div>
    </div>
  );
}
