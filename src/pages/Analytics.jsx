import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useExpenses } from '@/context/ExpenseContext'

/**
 * Placeholder owned by the Analytics developer.
 */
export default function Analytics() {
  const { expenses } = useExpenses()

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Placeholder for the Analytics module.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Charts coming soon</CardTitle>
          <CardDescription>
            {expenses.length} expenses are available from the shared expense store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use `useExpenses()` from ExpenseContext when building this page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
