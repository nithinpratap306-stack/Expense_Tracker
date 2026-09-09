import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import { AppLayout } from './components/layout/AppLayout';

// Our Primary Responsibility Pages
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Budget } from './pages/Budget';

// Teammate Placeholders (Respecting Team Boundaries)
import { Transactions } from './pages/Transactions';
import { AddExpense } from './pages/AddExpense';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <ExpenseProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/budget" element={<Budget />} />
            
            {/* Teammate Routes */}
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ExpenseProvider>
  );
}

export default App;
