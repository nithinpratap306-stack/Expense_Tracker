import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useExpenses } from '@/context/ExpenseContext'
import { formatCurrency } from '@/utils/currency'

/**
 * Placeholder owned by the Dashboard developer.
 * Consumes shared ExpenseContext so integration stays ready.
 */
export default function Dashboard() {
  const { expenses } = useExpenses()
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Placeholder for the Dashboard module. Shared expense data is already wired.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Ready for Dashboard work</CardTitle>
          <CardDescription>
            {expenses.length} expenses available via ExpenseContext • {formatCurrency(total)} tracked
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/add-expense">Add Expense</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/transactions">View Transactions</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
