import React from 'react';
import {
  Wallet,
  TrendingDown,
  Target,
  Calendar,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExpenses } from '@/context/ExpenseContext';
import { Button } from '@/components/ui/button';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { SpendingOverview } from '@/components/dashboard/SpendingOverview';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { BudgetProgress } from '@/components/dashboard/BudgetProgress';
import { RecentSpending } from '@/components/dashboard/RecentSpending';
import { SpendingInsight } from '@/components/dashboard/SpendingInsight';
import { formatCurrency, formatPercent } from '@/utils/formatters';

export function Dashboard() {
  const {
    user,
    currentPeriodLabel,
    totalSpent,
    monthlyBudget,
    remainingBudget,
    percentUsed,
    percentRemaining,
    dailyAverage,
    monthlyComparison,
    currentMonthExpenses,
    categoryBreakdown,
    spendingInsight
  } = useExpenses();

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Hey, {user?.name || 'Nithin'} 👋
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Here's how your money is looking this month.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border shadow-xs text-xs font-semibold text-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{currentPeriodLabel}</span>
          </div>

          <Button asChild size="sm" className="shadow-sm">
            <Link to="/add-expense" className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Money Left */}
        <SummaryCard
          title="Money Left"
          value={formatCurrency(remainingBudget)}
          subtitle="remaining to spend"
          icon={Wallet}
          badge={`${formatPercent(percentRemaining)} left`}
          badgeType={remainingBudget > 0 ? "positive" : "negative"}
          valueClassName={remainingBudget >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}
        />

        {/* Card 2: Spent This Month */}
        <SummaryCard
          title="Spent This Month"
          value={formatCurrency(totalSpent)}
          subtitle={monthlyComparison.isDecrease ? "less than last month" : "more than last month"}
          icon={TrendingDown}
          badge={`${monthlyComparison.diffPercent}% ${monthlyComparison.isDecrease ? '↓' : '↑'}`}
          badgeType={monthlyComparison.isDecrease ? "positive" : "warning"}
        />

        {/* Card 3: Monthly Budget */}
        <SummaryCard
          title="Monthly Budget"
          value={formatCurrency(monthlyBudget)}
          subtitle={`${formatCurrency(totalSpent)} used`}
          icon={Target}
          progress={percentUsed}
          badge={`${formatPercent(percentUsed)}`}
          badgeType={percentUsed <= 80 ? "indigo" : percentUsed <= 100 ? "warning" : "negative"}
        />

        {/* Card 4: Daily Average */}
        <SummaryCard
          title="Daily Average"
          value={formatCurrency(dailyAverage)}
          subtitle="per day this month"
          icon={Calendar}
          badge="30 days active"
          badgeType="neutral"
        />
      </div>

      {/* 7. Spending Insight Banner */}
      <SpendingInsight insight={spendingInsight} />

      {/* 3. Spending Overview Chart + 4. Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingOverview expenses={currentMonthExpenses} />
        </div>
        <div className="lg:col-span-1">
          <CategoryBreakdown categories={categoryBreakdown} />
        </div>
      </div>

      {/* 5. Budget Progress + 6. Recent Spending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetProgress
          totalSpent={totalSpent}
          monthlyBudget={monthlyBudget}
          percentUsed={percentUsed}
          categories={categoryBreakdown}
        />
        <RecentSpending expenses={currentMonthExpenses} maxItems={5} />
      </div>
    </div>
  );
}

export default Dashboard;
