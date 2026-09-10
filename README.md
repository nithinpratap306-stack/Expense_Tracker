# CampusSpend — Student Expense Tracker

Modern expense tracker for college students. Built with React, Vite, Tailwind CSS, and shadcn-style UI primitives.

## Team ownership

| Module | Owner |
| --- | --- |
| Add Expense, Transactions, Profile, Settings, expense shared UI | Expenses developer |
| Dashboard, Analytics, Budget | Dashboard developer |

Shared expense data is provided by `ExpenseContext` + `expenseService` (localStorage-backed).

## Quick start

```bash
npm install
npm run dev
```

## Routes

- `/dashboard` — placeholder for Dashboard team
- `/analytics` — placeholder for Analytics team
- `/budget` — placeholder for Budget team
- `/add-expense`
- `/transactions`
- `/profile`
- `/settings`

## Reusable expense APIs

```jsx
import { useExpenses } from '@/context/ExpenseContext'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'

const { expenses, addExpense, updateExpense, deleteExpense, clearExpenses } = useExpenses()
```

`ExpenseModal` can be opened from Dashboard later without modifying the expense form.
