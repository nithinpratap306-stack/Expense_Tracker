import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';
import { getDailySpendingTimeline, getWeeklySpendingTimeline } from '@/utils/expenseCalculations';

// Custom Tooltip component for clean fintech look
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-lg text-xs border border-slate-800">
        <p className="text-slate-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-bold text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          {formatCurrency(data.value)}
        </p>
      </div>
    );
  }
  return null;
}

export function SpendingOverview({ expenses = [] }) {
  const [viewMode, setViewMode] = useState('month'); // 'week' | 'month'

  const chartData = useMemo(() => {
    if (viewMode === 'week') {
      return getWeeklySpendingTimeline(expenses);
    }
    // Month daily view
    return getDailySpendingTimeline(expenses, 30);
  }, [expenses, viewMode]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <CardTitle>Spending Overview</CardTitle>
          <CardDescription>Visualizing your daily and weekly expenditure pace</CardDescription>
        </div>

        {/* View Switcher Controls */}
        <div className="inline-flex p-1 bg-muted rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('week')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'week'
                ? 'bg-card text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'month'
                ? 'bg-card text-primary shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Month
          </button>
        </div>
      </CardHeader>

      <CardContent className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis
              dataKey={viewMode === 'week' ? 'week' : 'day'}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              interval={viewMode === 'month' ? 4 : 0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6366F1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#spendingGradient)"
              activeDot={{ r: 5, fill: "#4F46E5", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
