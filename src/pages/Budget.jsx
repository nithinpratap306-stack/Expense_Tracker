import React, { useState } from 'react';
import { Target, Calendar, Plus, SlidersHorizontal } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { OverallBudget } from '../components/budget/OverallBudget';
import { BudgetStatus } from '../components/budget/BudgetStatus';
import { CategoryBudgetCard } from '../components/budget/CategoryBudgetCard';
import { BudgetEditModal } from '../components/budget/BudgetEditModal';
import { BudgetRecommendations } from '../components/budget/BudgetRecommendations';
import { Button } from '../components/ui/Button';

export function Budget() {
  const {
    currentPeriodLabel,
    monthlyBudget,
    totalSpent,
    remainingBudget,
    percentUsed,
    budgetStatus,
    categoryBreakdown,
    budgets,
    updateBudgets
  } = useExpenses();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Budget
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Plan your spending and stay in control.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>{currentPeriodLabel}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1.5 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Set Monthly Budget</span>
          </Button>
        </div>
      </div>

      {/* 1. Overall Budget Hero Card */}
      <OverallBudget
        monthlyBudget={monthlyBudget}
        totalSpent={totalSpent}
        remainingBudget={remainingBudget}
        percentUsed={percentUsed}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* 2. Budget Status Notification */}
      <BudgetStatus status={budgetStatus} />

      {/* 3. Category Budgets Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Category Budgets</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Allocated limits for each student expense category
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            Adjust Limits →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categoryBreakdown.map((cat) => (
            <CategoryBudgetCard
              key={cat.category}
              category={cat}
              onEditClick={() => setIsEditModalOpen(true)}
            />
          ))}
        </div>
      </div>

      {/* 5. Budget Recommendations */}
      <BudgetRecommendations
        categories={categoryBreakdown}
        monthlyBudget={monthlyBudget}
        totalSpent={totalSpent}
      />

      {/* 4. Budget Creation / Editing Modal */}
      <BudgetEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentBudgets={budgets}
        onSave={updateBudgets}
      />
    </div>
  );
}
