import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Receipt } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { getCategoryMeta } from '../../data/categories';
import { formatCurrency, formatDate } from '../../utils/formatters';

export function RecentSpending({ expenses = [], maxItems = 5 }) {
  const recentList = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, maxItems);

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Spending</CardTitle>
            <CardDescription>Your latest student purchases</CardDescription>
          </div>
          <Link
            to="/transactions"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </CardHeader>

        {recentList.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No recent transactions found
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentList.map((item) => {
              const meta = getCategoryMeta(item.category);
              return (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-3 group hover:bg-slate-50/70 px-1 -mx-1 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border"
                      style={{
                        backgroundColor: meta.bgColor,
                        borderColor: meta.borderColor,
                      }}
                    >
                      {meta.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{formatDate(item.date, 'short')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(item.amount)}
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {item.paymentMethod || 'UPI'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100">
        <Link
          to="/transactions"
          className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>View all transactions →</span>
        </Link>
      </div>
    </Card>
  );
}
