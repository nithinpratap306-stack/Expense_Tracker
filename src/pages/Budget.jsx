import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppPreferences } from '@/context/AppPreferencesContext'
import { useExpenses } from '@/context/ExpenseContext'
import { formatCurrency } from '@/utils/currency'

/**
 * Placeholder owned by the Budget developer.
 */
export default function Budget() {
  const { expenses } = useExpenses()
  const { settings } = useAppPreferences()
  const spent = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Budget</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Placeholder for the Budget module.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Budget workspace</CardTitle>
          <CardDescription>
            Profile preference monthly budget: {formatCurrency(settings.monthlyBudget)} • Spent so far:{' '}
            {formatCurrency(spent)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Read expenses from ExpenseContext and monthly budget from AppPreferencesContext.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
