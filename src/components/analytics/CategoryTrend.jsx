import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

function CategoryTrendTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg text-xs border border-slate-800 space-y-1.5 min-w-[140px]">
        <p className="text-slate-400 font-semibold border-b border-slate-800 pb-1">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-bold text-white">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function CategoryTrend({ expenses = [], categories = [] }) {
  const topCategories = useMemo(() => {
    return [...categories]
      .filter(c => c.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [categories]);

  const timelineData = useMemo(() => {
    const weeks = [
      { week: 'Week 1', start: 1, end: 7 },
      { week: 'Week 2', start: 8, end: 14 },
      { week: 'Week 3', start: 15, end: 21 },
      { week: 'Week 4', start: 22, end: 30 },
    ];

    return weeks.map(w => {
      const row = { week: w.week };
      topCategories.forEach(cat => {
        row[cat.name] = 0;
      });

      expenses.forEach(exp => {
        if (!exp.date) return;
        const day = parseInt(exp.date.split('-')[2], 10);
        if (day >= w.start && day <= w.end) {
          if (row[exp.category] !== undefined) {
            row[exp.category] += Number(exp.amount) || 0;
          }
        }
      });

      return row;
    });
  }, [expenses, topCategories]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div>
          <CardTitle>Category Trend Over Time</CardTitle>
          <CardDescription>
            Comparing weekly trajectory for top student expense categories
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timelineData}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CategoryTrendTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 12, fontSize: 12 }}
            />
            {topCategories.map(cat => (
              <Line
                key={cat.name}
                type="monotone"
                dataKey={cat.name}
                stroke={cat.color}
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
