import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/constants/expenses'
import { useAppPreferences } from '@/context/AppPreferencesContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Profile() {
  const { profile, settings, updateProfile, updateSettings } = useAppPreferences()
  const [form, setForm] = useState(profile)
  const [preferences, setPreferences] = useState({
    currency: settings.currency,
    defaultPaymentMethod: settings.defaultPaymentMethod,
    defaultCategory: settings.defaultCategory,
    monthlyBudget: String(settings.monthlyBudget ?? ''),
  })

  useEffect(() => {
    setForm(profile)
  }, [profile])

  useEffect(() => {
    setPreferences({
      currency: settings.currency,
      defaultPaymentMethod: settings.defaultPaymentMethod,
      defaultCategory: settings.defaultCategory,
      monthlyBudget: String(settings.monthlyBudget ?? ''),
    })
  }, [settings])

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSaveProfile(event) {
    event.preventDefault()
    if (!form.name.trim()) {
      toast.error('Name is required')
      return
    }
    updateProfile(form)
    toast.success('Profile updated')
  }

  function handleSavePreferences(event) {
    event.preventDefault()
    const budget = Number(preferences.monthlyBudget)
    if (Number.isNaN(budget) || budget < 0) {
      toast.error('Enter a valid monthly budget')
      return
    }

    updateSettings({
      currency: preferences.currency,
      defaultPaymentMethod: preferences.defaultPaymentMethod,
      defaultCategory: preferences.defaultCategory,
      monthlyBudget: budget,
    })
    toast.success('Preferences saved')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Your student identity and spending defaults.
        </p>
      </header>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground"
            aria-hidden="true"
          >
            {profile.avatarInitials}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
            {profile.email ? <p className="mt-1 text-sm text-muted-foreground">{profile.email}</p> : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile information</CardTitle>
          <CardDescription>Update the basics used across the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSaveProfile}>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="college">College/University</Label>
              <Input
                id="college"
                value={form.college}
                onChange={(event) => updateField('college', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={form.course}
                onChange={(event) => updateField('course', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Input
                id="year"
                value={form.yearOfStudy}
                onChange={(event) => updateField('yearOfStudy', event.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Save Profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial preferences</CardTitle>
          <CardDescription>
            Defaults for new expenses. Budget management lives on the Budget page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSavePreferences}>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, currency: value }))
                }
              >
                <SelectTrigger aria-label="Currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-budget">Monthly budget</Label>
              <Input
                id="monthly-budget"
                inputMode="numeric"
                value={preferences.monthlyBudget}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    monthlyBudget: event.target.value.replace(/[^\d]/g, ''),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Default payment method</Label>
              <Select
                value={preferences.defaultPaymentMethod}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, defaultPaymentMethod: value }))
                }
              >
                <SelectTrigger aria-label="Default payment method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Default expense category</Label>
              <Select
                value={preferences.defaultCategory}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, defaultCategory: value }))
                }
              >
                <SelectTrigger aria-label="Default category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
