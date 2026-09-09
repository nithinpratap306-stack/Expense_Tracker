import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PieChart,
  Target,
  Receipt,
  PlusCircle,
  User,
  Settings,
  GraduationCap,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { cn } from '../../utils/cn';

export function Sidebar({ className }) {
  const { user, resetToDefaults } = useExpenses();

  const mainNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/analytics', label: 'Analytics', icon: PieChart },
    { to: '/budget', label: 'Budget', icon: Target },
  ];

  const teammateNavItems = [
    { to: '/transactions', label: 'Transactions', icon: Receipt },
    { to: '/add-expense', label: 'Add Expense', icon: PlusCircle },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-screen sticky top-0 px-4 py-6 select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">CampusSpend</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200/60">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500">Student Expense Tracker</p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          <div>
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Main Overview
            </p>
            <nav className="space-y-1">
              {mainNavItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-semibold shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Management
              </p>
              <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                Teammate
              </span>
            </div>
            <nav className="space-y-1">
              {teammateNavItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer / User Badge & Demo Reset */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <button
          onClick={resetToDefaults}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Reset expenses and budgets back to sample student dataset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {user?.name?.[0] || 'N'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {user?.name || 'Nithin'}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.role || 'CS Undergrad'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
