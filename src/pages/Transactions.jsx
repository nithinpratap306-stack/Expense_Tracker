import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { DeleteExpenseDialog } from '@/components/expenses/DeleteExpenseDialog'
import { ExpenseDetailsDialog } from '@/components/expenses/ExpenseDetailsDialog'
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters'
import { ExpenseList } from '@/components/expenses/ExpenseList'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { ExpenseSearch } from '@/components/expenses/ExpenseSearch'
import { Button } from '@/components/ui/button'
import { useAppPreferences } from '@/context/AppPreferencesContext'
import { useExpenses } from '@/context/ExpenseContext'
import { filterExpenses } from '@/utils/expenseUtils'
import { formatCurrency } from '@/utils/currency'

const DEFAULT_FILTERS = {
  category: 'all',
  date: 'all',
  paymentMethod: 'all',
}

export default function Transactions() {
  const { expenses, updateExpense, deleteExpense } = useExpenses()
  const { settings } = useAppPreferences()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const filteredExpenses = useMemo(
    () =>
      filterExpenses(expenses, {
        search,
        category: filters.category,
        date: filters.date,
        paymentMethod: filters.paymentMethod,
      }),
    [expenses, search, filters],
  )

  const hasActiveQuery =
    Boolean(search.trim()) ||
    filters.category !== 'all' ||
    filters.date !== 'all' ||
    filters.paymentMethod !== 'all'

  function openDetails(expense) {
    setSelectedExpense(expense)
    setDetailsOpen(true)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            All your expenses in one place.
          </p>
        </div>
        <Button asChild>
          <Link to="/add-expense">
            <Plus className="h-4 w-4" />
            Add Expense
          </Link>
        </Button>
      </header>

      <div className="space-y-3">
        <ExpenseSearch value={search} onChange={setSearch} />
        <ExpenseFilters filters={filters} onChange={setFilters} />
      </div>

      <ExpenseList
        expenses={filteredExpenses}
        currency={settings.currency}
        onSelect={openDetails}
        emptyTitle={hasActiveQuery ? 'No matching expenses found.' : 'No expenses yet.'}
        emptyDescription={
          hasActiveQuery
            ? 'Try a different search or clear your filters.'
            : 'Add your first expense to start tracking your spending.'
        }
        showEmptyAction={!hasActiveQuery}
      />

      <ExpenseDetailsDialog
        expense={selectedExpense}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        currency={settings.currency}
        onEdit={() => {
          setDetailsOpen(false)
          setEditOpen(true)
        }}
        onDelete={() => {
          setDetailsOpen(false)
          setDeleteOpen(true)
        }}
      />

      <ExpenseModal
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Expense"
        description="Update the details for this expense."
        submitLabel="Save Changes"
        initialValues={selectedExpense}
        onSubmit={(values) => {
          const updated = updateExpense(selectedExpense.id, values)
          setSelectedExpense(updated)
          toast.success(`Updated ${updated.title}`)
        }}
      />

      <DeleteExpenseDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          if (!selectedExpense) return
          deleteExpense(selectedExpense.id)
          toast.success(`Deleted ${selectedExpense.title} (${formatCurrency(selectedExpense.amount)})`)
          setSelectedExpense(null)
        }}
      />
    </div>
  )
}
