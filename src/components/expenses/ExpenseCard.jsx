import { getCategoryMeta } from '@/constants/expenses'
import { formatCurrencySigned } from '@/utils/currency'
import { formatExpenseDate } from '@/utils/expenseUtils'
import { cn } from '@/utils/cn'

export function ExpenseCard({ expense, onClick, currency = 'INR' }) {
  const category = getCategoryMeta(expense.category)

  return (
    <button
      type="button"
      onClick={() => onClick?.(expense)}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-left shadow-sm transition hover:border-primary/30 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg"
        aria-hidden="true"
      >
        {category.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{expense.title}</p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {expense.category} • {expense.paymentMethod}
            </p>
          </div>
          <p className="shrink-0 font-semibold text-destructive">
            {formatCurrencySigned(expense.amount, currency)}
          </p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{formatExpenseDate(expense.date)}</p>
      </div>
    </button>
  )
}
