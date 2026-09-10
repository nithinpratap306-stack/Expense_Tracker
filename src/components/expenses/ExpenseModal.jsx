import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ExpenseForm } from '@/components/expenses/ExpenseForm'

export function ExpenseModal({
  open,
  onOpenChange,
  title = 'Add Expense',
  description = 'Log a spend in a few seconds.',
  initialValues = null,
  submitLabel = 'Add Expense',
  onSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ExpenseForm
            compact
            initialValues={initialValues}
            submitLabel={submitLabel}
            onCancel={() => onOpenChange(false)}
            onSubmit={async (values) => {
              await onSubmit(values)
              onOpenChange(false)
            }}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
