import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ExpenseForm } from '@/components/expenses/ExpenseForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useExpenses } from '@/context/ExpenseContext'
import { formatCurrency } from '@/utils/currency'

export default function AddExpense() {
  const { addExpense } = useExpenses()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Add Expense</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Keep track of where your money goes.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>New expense</CardTitle>
          <CardDescription>
            Log amount, category, and payment method in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm
            onSubmit={(values) => {
              const expense = addExpense(values)
              toast.success(`Added ${expense.title} for ${formatCurrency(expense.amount)}`)
              navigate('/transactions')
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
