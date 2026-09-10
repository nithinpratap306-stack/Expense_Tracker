import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/constants/expenses'
import { useAppPreferences } from '@/context/AppPreferencesContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/utils/cn'
import { validateExpenseInput } from '@/utils/expenseUtils'

function todayIso() {
  return format(new Date(), 'yyyy-MM-dd')
}

function buildInitialValues(initialValues, settings) {
  return {
    amount: initialValues?.amount?.toString() ?? '',
    title: initialValues?.title ?? '',
    category: initialValues?.category ?? settings.defaultCategory ?? 'Food',
    date: initialValues?.date ?? todayIso(),
    paymentMethod: initialValues?.paymentMethod ?? settings.defaultPaymentMethod ?? 'UPI',
    note: initialValues?.note ?? '',
  }
}

export function ExpenseForm({
  initialValues = null,
  onSubmit,
  submitLabel = 'Add Expense',
  compact = false,
  onCancel,
}) {
  const { settings } = useAppPreferences()
  const [values, setValues] = useState(() => buildInitialValues(initialValues, settings))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setValues(buildInitialValues(initialValues, settings))
    setErrors({})
  }, [initialValues, settings])

  const amountDisplay = useMemo(() => {
    if (!values.amount) return ''
    return values.amount
  }, [values.amount])

  function updateField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function handleAmountChange(event) {
    const next = event.target.value.replace(/[^\d.]/g, '')
    const parts = next.split('.')
    const sanitized =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : next
    updateField('amount', sanitized)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const result = validateExpenseInput(values)
    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(result.values)
      if (!initialValues) {
        setValues(buildInitialValues(null, settings))
        setErrors({})
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', compact && 'space-y-4')} noValidate>
      <div>
        <Label htmlFor="expense-amount">Amount</Label>
        <div
          className={cn(
            'flex items-center rounded-2xl border border-input bg-secondary/40 px-4 shadow-sm focus-within:ring-2 focus-within:ring-ring',
            compact ? 'h-16' : 'h-20',
          )}
        >
          <span className="mr-2 text-2xl font-semibold text-muted-foreground">₹</span>
          <input
            id="expense-amount"
            inputMode="decimal"
            value={amountDisplay}
            onChange={handleAmountChange}
            placeholder="0"
            aria-invalid={Boolean(errors.amount)}
            className={cn(
              'w-full bg-transparent font-semibold text-foreground outline-none placeholder:text-muted-foreground/60',
              compact ? 'text-3xl' : 'text-4xl',
            )}
          />
        </div>
        {errors.amount ? <p className="mt-1.5 text-sm text-destructive">{errors.amount}</p> : null}
      </div>

      <div>
        <Label htmlFor="expense-title">Expense Name</Label>
        <Input
          id="expense-title"
          value={values.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="What did you spend on?"
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title ? <p className="mt-1.5 text-sm text-destructive">{errors.title}</p> : null}
      </div>

      <div>
        <Label>Category</Label>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {EXPENSE_CATEGORIES.map((category) => {
            const selected = values.category === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => updateField('category', category.id)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition',
                  selected
                    ? 'border-primary bg-accent text-accent-foreground'
                    : 'border-border bg-card hover:bg-muted',
                )}
                aria-pressed={selected}
              >
                <span aria-hidden="true">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </button>
            )
          })}
        </div>
        {errors.category ? <p className="mt-1.5 text-sm text-destructive">{errors.category}</p> : null}
      </div>

      <div className={cn('grid gap-6', compact ? 'grid-cols-1' : 'sm:grid-cols-2')}>
        <div>
          <Label htmlFor="expense-date">Date</Label>
          <Input
            id="expense-date"
            type="date"
            value={values.date}
            onChange={(event) => updateField('date', event.target.value)}
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date ? <p className="mt-1.5 text-sm text-destructive">{errors.date}</p> : null}
        </div>

        <div>
          <Label>Payment Method</Label>
          <Select
            value={values.paymentMethod}
            onValueChange={(value) => updateField('paymentMethod', value)}
          >
            <SelectTrigger aria-label="Payment method">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.paymentMethod ? (
            <p className="mt-1.5 text-sm text-destructive">{errors.paymentMethod}</p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="expense-note">Note (optional)</Label>
        <Textarea
          id="expense-note"
          value={values.note}
          onChange={(event) => updateField('note', event.target.value)}
          placeholder="Add a note..."
          aria-invalid={Boolean(errors.note)}
        />
        {errors.note ? <p className="mt-1.5 text-sm text-destructive">{errors.note}</p> : null}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" size="lg" className="w-full flex-1" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="outline" size="lg" className="w-full flex-1" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  )
}
