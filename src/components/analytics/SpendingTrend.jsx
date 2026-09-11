import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';
import { getDailySpendingTimeline, getWeeklySpendingTimeline } from '@/utils/expenseCalculations';

function CustomBarTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-lg text-xs border border-slate-800">
        <p className="text-slate-400 font-medium mb-1">{label}</p>
        <p className="text-sm font-bold text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          {formatCurrency(data.value)}
        </p>
      </div>
    );
  }
  return null;
}

export function SpendingTrend({ expenses = [] }) {
  const [granularity, setGranularity] = useState('daily'); // 'daily' | 'weekly'

  const data = useMemo(() => {
    if (granularity === 'weekly') {
      return getWeeklySpendingTimeline(expenses);
    }
    return getDailySpendingTimeline(expenses, 30);
  }, [expenses, granularity]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <CardTitle>Spending Trend</CardTitle>
          <CardDescription>Breakdown of spending volume across the billing cycle</CardDescription>
        </div>

        {/* Toggle Switch */}
        <div className="inline-flex p-1 bg-muted rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setGranularity('daily')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              granularity === 'daily'
                ? 'bg-card text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Daily
          </button>
          <button
            type="button"
            onClick={() => setGranularity('weekly')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              granularity === 'weekly'
                ? 'bg-card text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Weekly
          </button>
        </div>
      </CardHeader>

      <CardContent className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis
              dataKey={granularity === 'weekly' ? 'week' : 'day'}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              interval={granularity === 'daily' ? 4 : 0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              fill="#6366F1"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`bar-${index}`}
                  fill={entry.amount > 600 ? '#4F46E5' : '#818CF8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
