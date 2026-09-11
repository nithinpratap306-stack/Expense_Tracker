import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/data/categories';
import { formatCurrency } from '@/utils/formatters';

export function BudgetEditModal({ isOpen, onClose, currentBudgets, onSave }) {
  const [monthlyLimit, setMonthlyLimit] = useState(8000);
  const [categoryLimits, setCategoryLimits] = useState({});

  useEffect(() => {
    if (currentBudgets) {
      setMonthlyLimit(currentBudgets.monthlyLimit || 8000);
      setCategoryLimits(currentBudgets.categories || {});
    }
  }, [currentBudgets, isOpen]);

  const handleCategoryChange = (catId, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setCategoryLimits(prev => ({
      ...prev,
      [catId]: num
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      monthlyLimit: Math.max(0, Number(monthlyLimit) || 0),
      categories: categoryLimits
    });
    onClose();
  };

  const totalAllocated = Object.values(categoryLimits).reduce((s, v) => s + (Number(v) || 0), 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adjust Budget Limits"
      description="Set overall monthly allowance and category limits. Saved to localStorage."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Monthly Budget Input */}
        <div className="p-4 rounded-xl bg-accent/60 border border-border">
          <label className="block text-xs font-bold uppercase tracking-wider text-accent-foreground mb-1.5">
            Total Monthly Budget (₹)
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <span className="font-bold">₹</span>
            </div>
            <input
              type="number"
              min="0"
              step="100"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary text-base font-bold text-foreground bg-card"
              required
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Your maximum planned expenditure across all expenses for this month.
          </p>
        </div>

        {/* Category Budget Inputs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Category Allocations
            </h4>
            <span className="text-xs text-muted-foreground font-medium">
              Allocated: <strong className="text-foreground">{formatCurrency(totalAllocated)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="p-3 rounded-xl border border-border bg-card flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg shrink-0">{cat.emoji}</span>
                  <span className="text-xs font-semibold text-foreground truncate">{cat.name}</span>
                </div>

                <div className="relative w-28 shrink-0">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-xs text-muted-foreground font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={categoryLimits[cat.id] ?? ''}
                    onChange={(e) => handleCategoryChange(cat.id, e.target.value)}
                    placeholder="0"
                    className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary text-xs font-bold text-foreground bg-muted/40 text-right"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Budget</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
