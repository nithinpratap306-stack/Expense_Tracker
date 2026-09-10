import { Pencil, Trash2 } from 'lucide-react'
import { getCategoryMeta } from '@/constants/expenses'
import { formatCurrencySigned } from '@/utils/currency'
import { formatExpenseDate } from '@/utils/expenseUtils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function ExpenseDetailsDialog({
  expense,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  currency = 'INR',
}) {
  if (!expense) return null

  const category = getCategoryMeta(expense.category)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Expense details</DialogTitle>
          <DialogDescription>Review, edit, or delete this expense.</DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-xl">
              {category.icon}
            </div>
            <div>
              <p className="font-semibold">{expense.title}</p>
              <p className="text-sm text-muted-foreground">{expense.category}</p>
            </div>
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Amount</dt>
              <dd className="font-semibold text-destructive">
                {formatCurrencySigned(expense.amount, currency)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Date</dt>
              <dd className="font-medium">{formatExpenseDate(expense.date)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Payment</dt>
              <dd className="font-medium">{expense.paymentMethod}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">Note</dt>
              <dd className="max-w-[60%] text-right font-medium">
                {expense.note?.trim() ? expense.note : '—'}
              </dd>
            </div>
          </dl>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
