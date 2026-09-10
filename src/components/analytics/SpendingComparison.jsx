import React from 'react';
import { TrendingDown, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function SpendingComparison({ comparison }) {
  const { current, previous, diffAmount, diffPercent, isDecrease } = comparison;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div>
          <CardTitle>Spending Comparison</CardTitle>
          <CardDescription>Month-over-month expenditure change</CardDescription>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
            isDecrease
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {isDecrease ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
          <span>{isDecrease ? `-${diffPercent}%` : `+${diffPercent}%`}</span>
        </span>
      </CardHeader>

      <div className="grid grid-cols-2 gap-4 my-2">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">September (Current)</p>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {formatCurrency(current)}
          </p>
          <span className="text-[11px] text-indigo-600 font-semibold mt-1 inline-block">
            Active Period
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">August (Last Month)</p>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {formatCurrency(previous)}
          </p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">
            Previous Cycle
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>
          {isDecrease ? (
            <>
              You have spent <strong className="text-slate-900">{formatCurrency(Math.abs(diffAmount))} less</strong> than last month. Outstanding discipline on campus expenses!
            </>
          ) : (
            <>
              You have spent <strong className="text-slate-900">{formatCurrency(Math.abs(diffAmount))} more</strong> than last month. Check your high-ticket categories.
            </>
          )}
        </span>
      </div>
    </Card>
  );
}
