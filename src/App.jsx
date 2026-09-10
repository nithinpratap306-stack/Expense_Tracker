import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AppLayout } from '@/components/layout/AppLayout'
import { AppPreferencesProvider } from '@/context/AppPreferencesContext'
import { ExpenseProvider } from '@/context/ExpenseContext'
import AddExpense from '@/pages/AddExpense'
import Analytics from '@/pages/Analytics'
import Budget from '@/pages/Budget'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import Settings from '@/pages/Settings'
import Transactions from '@/pages/Transactions'

export default function App() {
  return (
    <AppPreferencesProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="budget" element={<Budget />} />
              <Route path="add-expense" element={<AddExpense />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-center" closeButton />
      </ExpenseProvider>
    </AppPreferencesProvider>
  )
}
