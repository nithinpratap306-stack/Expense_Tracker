import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  default: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  warning: "bg-amber-50 text-amber-800 border-amber-200/60",
  danger: "bg-red-50 text-red-700 border-red-200/60",
  info: "bg-sky-50 text-sky-700 border-sky-200/60",
  purple: "bg-purple-50 text-purple-700 border-purple-200/60",
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
};

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
