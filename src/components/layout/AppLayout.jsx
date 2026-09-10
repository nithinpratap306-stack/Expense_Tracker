import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  PieChart,
  Wallet,
  PlusCircle,
  Receipt,
  UserRound,
  Settings,
} from 'lucide-react'
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
            ? 'bg-accent text-accent-foreground'
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
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen w-full">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card px-4 py-6 lg:flex lg:flex-col">
          <div className="mb-8 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">CampusSpend</p>
            <h1 className="mt-1 text-xl font-semibold text-foreground">Expense Tracker</h1>
            <p className="mt-1 text-sm text-muted-foreground">Student money, made simple.</p>
          </div>

          <nav className="flex flex-1 flex-col gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>

          <nav className="mt-4 flex flex-col gap-1 border-t border-border pt-4" aria-label="Account">
            {SECONDARY_ITEMS.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
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

          <main className="flex-1 px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:pb-8">
            <Outlet />
          </main>
        </div>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 py-2 backdrop-blur lg:hidden"
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
