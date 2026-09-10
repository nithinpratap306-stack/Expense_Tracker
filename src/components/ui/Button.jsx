import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 active:scale-[0.98]",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-[0.98]",
  outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 active:scale-[0.98]",
  ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900",
  danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-[0.98]",
  subtleIndigo: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 active:scale-[0.98]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm font-medium rounded-xl gap-2",
  lg: "px-5 py-2.5 text-base font-medium rounded-xl gap-2.5",
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
