import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  PieChart,
  Wallet,
  PlusCircle,
  Receipt,
  UserRound,
  Settings,
  RotateCcw,
} from 'lucide-react'
import { useAppPreferences } from '@/context/AppPreferencesContext'
import { useExpenses } from '@/context/ExpenseContext'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
  { to: '/add-expense', label: 'Add', icon: PlusCircle, emphasize: true },
  { to: '/analytics', label: 'Analytics', icon: PieChart },
  { to: '/budget', label: 'Budget', icon: Wallet },
]

const SECONDARY_ITEMS = [
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function NavItem({ to, label, icon: Icon, emphasize = false, compact = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
          compact && 'flex-col gap-1 px-2 py-2 text-[11px]',
          isActive
            ? 'bg-accent text-accent-foreground font-semibold shadow-xs'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          emphasize && !isActive && 'text-primary',
        )
      }
    >
      <Icon className={cn('h-5 w-5', compact && 'h-5 w-5')} />
      <span>{label}</span>
    </NavLink>
  )
}

export function AppLayout() {
  const { profile } = useAppPreferences()
  const { resetToDefaults } = useExpenses()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card px-4 py-6 lg:flex lg:flex-col justify-between">
          <div>
            <div className="mb-8 px-2">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">CampusSpend</p>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-1.5 py-0.5 rounded border border-border">
                  PRO
                </span>
              </div>
              <h1 className="mt-1 text-xl font-bold text-foreground tracking-tight">Expense Tracker</h1>
              <p className="mt-1 text-xs text-muted-foreground">Student money, made simple.</p>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </nav>

            <nav className="mt-6 flex flex-col gap-1 border-t border-border pt-4" aria-label="Account">
              <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Account & Preferences
              </p>
              {SECONDARY_ITEMS.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </nav>
          </div>

          {/* Sidebar Footer: Reset Demo Data & Profile Widget */}
          <div className="pt-4 border-t border-border space-y-3">
            <button
              type="button"
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors cursor-pointer border border-border"
              title="Reset expenses and budgets to original student demo dataset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-3 p-2 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs">
                {profile?.avatarInitials || 'NP'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {profile?.name || 'Nithin Pratap'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.course || 'CS Undergrad'}
                </p>
              </div>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile Header */}
          <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">CampusSpend</p>
                <p className="text-sm font-semibold text-foreground">Expense Tracker</p>
              </div>
              <div className="flex items-center gap-1">
                {SECONDARY_ITEMS.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    aria-label={label}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground',
                        isActive && 'bg-accent text-accent-foreground',
                      )
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </NavLink>
                ))}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8 w-full min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 py-2 backdrop-blur lg:hidden shadow-lg"
        aria-label="Mobile"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} compact />
          ))}
        </div>
      </nav>
    </div>
  )
}
