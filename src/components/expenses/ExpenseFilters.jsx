import { DATE_FILTERS, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/constants/expenses'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ExpenseFilters({ filters, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
      <Select
        value={filters.category}
        onValueChange={(value) => onChange({ ...filters, category: value })}
      >
        <SelectTrigger className="min-w-[10.5rem] sm:min-w-0" aria-label="Filter by category">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {EXPENSE_CATEGORIES.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.icon} {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.date}
        onValueChange={(value) => onChange({ ...filters, date: value })}
      >
        <SelectTrigger className="min-w-[10.5rem] sm:min-w-0" aria-label="Filter by date">
          <SelectValue placeholder="All Dates" />
        </SelectTrigger>
        <SelectContent>
          {DATE_FILTERS.map((filter) => (
            <SelectItem key={filter.id} value={filter.id}>
              {filter.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.paymentMethod}
        onValueChange={(value) => onChange({ ...filters, paymentMethod: value })}
      >
        <SelectTrigger className="min-w-[10.5rem] sm:min-w-0" aria-label="Filter by payment method">
          <SelectValue placeholder="All Payments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          {PAYMENT_METHODS.map((method) => (
            <SelectItem key={method} value={method}>
              {method}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
