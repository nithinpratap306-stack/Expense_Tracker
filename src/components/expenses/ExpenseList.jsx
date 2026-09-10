import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { ExpenseCard } from '@/components/expenses/ExpenseCard'
import { Button } from '@/components/ui/button'
import { groupExpensesByDate } from '@/utils/expenseUtils'

export function ExpenseList({
  expenses,
  onSelect,
  currency = 'INR',
  emptyTitle = 'No expenses yet.',
  emptyDescription = 'Add your first expense to start tracking your spending.',
  showEmptyAction = true,
}) {
  if (!expenses.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
        <h3 className="text-lg font-semibold text-foreground">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{emptyDescription}</p>
        {showEmptyAction ? (
          <Button asChild className="mt-5">
            <Link to="/add-expense">
              <Plus className="h-4 w-4" />
              Add Expense
            </Link>
          </Button>
        ) : null}
      </div>
    )
  }

  const groups = groupExpensesByDate(expenses)

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.key} aria-labelledby={`group-${group.key}`}>
          <h2
            id={`group-${group.key}`}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          >
            {group.label}
          </h2>
          <div className="space-y-2.5">
            {group.expenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                currency={currency}
                onClick={onSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
