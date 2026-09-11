import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/utils/formatters';

function DonutTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-lg text-xs border border-slate-800">
        <p className="font-semibold flex items-center gap-1.5">
          <span>{data.emoji}</span>
          <span>{data.name}</span>
        </p>
        <p className="text-slate-300 mt-1">
          {formatCurrency(data.amount)} ({formatPercent(data.percentage)})
        </p>
      </div>
    );
  }
  return null;
}

export function CategoryBreakdown({ categories = [] }) {
  const activeCategories = categories.filter(c => c.amount > 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Where your allowance went this month</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Donut Chart */}
          <div className="h-56 w-56 relative shrink-0 flex items-center justify-center mx-auto md:mx-0">
            {activeCategories.length === 0 ? (
              <div className="text-center text-xs text-muted-foreground">No category spends yet</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<DonutTooltip />} />
                    <Pie
                      data={activeCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="amount"
                    >
                      {activeCategories.map((entry) => (
                        <Cell
                          key={`cell-${entry.category}`}
                          fill={entry.color}
                          stroke="transparent"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-medium text-muted-foreground">Total</span>
                  <span className="text-base font-bold text-foreground">
                    {formatCurrency(activeCategories.reduce((s, c) => s + c.amount, 0))}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Legend and Itemized List */}
          <div className="flex-1 w-full space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {categories.filter(c => c.amount > 0).map((cat) => (
              <div
                key={cat.category}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 border border-border"
                    style={{ backgroundColor: cat.bgColor }}
                  >
                    {cat.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {cat.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(cat.amount)}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground min-w-[42px] text-center">
                    {formatPercent(cat.percentage, 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
