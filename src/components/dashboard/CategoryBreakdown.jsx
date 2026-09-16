import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/utils/formatters';

export function CategoryBreakdown({ categories = [] }) {
  const activeCategories = categories.filter(c => c.amount > 0);
  const totalAmount = activeCategories.reduce((s, c) => s + c.amount, 0);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Where your allowance went this month</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-2 flex-1 flex flex-col space-y-4">
        {/* Centered Donut Chart */}
        <div className="h-44 w-44 relative shrink-0 flex items-center justify-center mx-auto my-1">
          {activeCategories.length === 0 ? (
            <div className="text-center text-xs text-muted-foreground">No category spends yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="amount"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {activeCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.category}`}
                        fill={entry.color}
                        stroke="transparent"
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.45}
                        className="transition-all duration-200 cursor-pointer"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total</span>
                <span className="text-base font-extrabold text-foreground">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Clean, detailed category itemized list */}
        <div className="w-full flex-1 border-t border-border pt-3">
          {activeCategories.length === 0 ? (
            <p className="text-xs text-muted-foreground italic text-center py-4">Add expenses to see categories</p>
          ) : (
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {activeCategories.map((cat, index) => {
                const isHovered = activeIndex === index;
                return (
                  <div
                    key={cat.category}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className={`p-2.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                      isHovered
                        ? 'bg-muted/80 border-primary/40 shadow-xs translate-x-0.5'
                        : 'border-border/60 bg-card/60 hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      {/* Left: Emoji Badge + Name */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 border border-border/50 bg-muted/60 dark:bg-slate-800/80 shadow-2xs"
                        >
                          {cat.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {cat.name}
                          </p>
                          {cat.count > 0 && (
                            <p className="text-[10px] text-muted-foreground">
                              {cat.count} {cat.count === 1 ? 'expense' : 'expenses'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Amount & Percent Pill */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-foreground">
                          {formatCurrency(cat.amount)}
                        </span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[36px] text-center"
                          style={{
                            backgroundColor: `${cat.color}18`,
                            color: cat.color,
                          }}
                        >
                          {formatPercent(cat.percentage, 0)}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar line */}
                    <div className="w-full bg-muted/80 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, Math.max(0, cat.percentage))}%`,
                          backgroundColor: cat.color
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
