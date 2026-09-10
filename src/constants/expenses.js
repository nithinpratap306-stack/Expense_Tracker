export const EXPENSE_CATEGORIES = [
  { id: 'Food', label: 'Food', icon: '🍔' },
  { id: 'Transport', label: 'Transport', icon: '🚌' },
  { id: 'Education', label: 'Education', icon: '📚' },
  { id: 'Entertainment', label: 'Entertainment', icon: '🎮' },
  { id: 'Shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'Subscriptions', label: 'Subscriptions', icon: '📱' },
  { id: 'Accommodation', label: 'Accommodation', icon: '🏠' },
  { id: 'Health', label: 'Health', icon: '💊' },
  { id: 'Other', label: 'Other', icon: '🧾' },
]

export const PAYMENT_METHODS = [
  'UPI',
  'Cash',
  'Debit Card',
  'Credit Card',
  'Bank Transfer',
  'Other',
]

export const DATE_FILTERS = [
  { id: 'all', label: 'All Dates' },
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'this-week', label: 'This Week' },
  { id: 'this-month', label: 'This Month' },
]

export function getCategoryMeta(category) {
  return (
    EXPENSE_CATEGORIES.find((item) => item.id === category) ?? {
      id: category || 'Other',
      label: category || 'Other',
      icon: '🧾',
    }
  )
}
