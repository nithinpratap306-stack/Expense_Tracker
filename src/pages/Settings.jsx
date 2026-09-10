import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteExpenseDialog } from '@/components/expenses/DeleteExpenseDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAppPreferences } from '@/context/AppPreferencesContext'
import { useExpenses } from '@/context/ExpenseContext'
import { downloadCsv, expensesToCsv } from '@/utils/expenseUtils'
import { cn } from '@/utils/cn'

const THEME_OPTIONS = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
]

export default function Settings() {
  const { settings, updateSettings } = useAppPreferences()
  const { expenses, clearExpenses } = useExpenses()
  const [clearOpen, setClearOpen] = useState(false)

  function setTheme(theme) {
    updateSettings({ theme })
    toast.success(`Theme set to ${theme}`)
  }

  function toggleNotification(key) {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    })
  }

  function handleExport() {
    if (!expenses.length) {
      toast.error('No expenses to export')
      return
    }
    downloadCsv('expenses.csv', expensesToCsv(expenses))
    toast.success('Exported expenses.csv')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Appearance, reminders, and your local expense data.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how CampusSpend looks on this device.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {THEME_OPTIONS.map((option) => {
              const active = settings.theme === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTheme(option.id)}
                  className={cn(
                    'rounded-xl border px-3 py-3 text-sm font-medium transition',
                    active
                      ? 'border-primary bg-accent text-accent-foreground'
                      : 'border-border bg-card hover:bg-muted',
                  )}
                  aria-pressed={active}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stored locally for now — no backend required.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="budget-alerts">Budget alerts</Label>
              <p className="text-sm text-muted-foreground">Get nudged when you near your monthly limit.</p>
            </div>
            <Switch
              id="budget-alerts"
              checked={settings.notifications.budgetAlerts}
              onCheckedChange={() => toggleNotification('budgetAlerts')}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="spending-reminders">Spending reminders</Label>
              <p className="text-sm text-muted-foreground">Gentle prompts to log daily spends.</p>
            </div>
            <Switch
              id="spending-reminders"
              checked={settings.notifications.spendingReminders}
              onCheckedChange={() => toggleNotification('spendingReminders')}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="weekly-summary">Weekly summary</Label>
              <p className="text-sm text-muted-foreground">A weekly wrap of where money went.</p>
            </div>
            <Switch
              id="weekly-summary"
              checked={settings.notifications.weeklySummary}
              onCheckedChange={() => toggleNotification('weeklySummary')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data</CardTitle>
          <CardDescription>Export or reset expenses stored in this browser.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={handleExport}>
            Export Expenses
          </Button>
          <Button variant="destructive" onClick={() => setClearOpen(true)}>
            Clear All Data
          </Button>
        </CardContent>
      </Card>

      <DeleteExpenseDialog
        open={clearOpen}
        onOpenChange={setClearOpen}
        title="Delete all expenses?"
        description="This will permanently remove all stored expense data."
        confirmLabel="Delete Everything"
        onConfirm={() => {
          clearExpenses()
          toast.success('All expenses cleared')
        }}
      />
    </div>
  )
}
