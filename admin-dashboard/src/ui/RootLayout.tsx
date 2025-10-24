import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Menu, ChartLine, Users2, Building2, CreditCard, Settings, LogOut, NotebookPen } from 'lucide-react'
import { useThemeStore } from '../stores/themeStore'

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const NAV = [
  { to: '/', label: 'Dashboard', icon: ChartLine },
  { to: '/leads', label: 'Leads', icon: NotebookPen },
  { to: '/bookings', label: 'Bookings', icon: NotebookPen },
  { to: '/properties', label: 'Properties', icon: Building2 },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/users', label: 'Users', icon: Users2 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function RootLayout() {
  const [open, setOpen] = React.useState(true)
  const dark = useThemeStore(s => s.dark)
  const toggleTheme = useThemeStore(s => s.toggle)
  const location = useLocation()

  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-[280px,1fr] bg-[rgb(var(--background))]">
      <aside className={classNames(
        'border-r border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-card transition-all duration-300',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="h-16 flex items-center gap-3 px-4 border-b border-[rgb(var(--border))]">
          <div className="size-8 rounded bg-primary-600" aria-hidden />
          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-sm text-muted">BB Nepal</p>
          </div>
        </div>
        <nav className="p-3">
          <ul className="space-y-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => classNames(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-offset-2',
                    'hover:bg-primary-50 focus-visible:ring-2 focus-visible:ring-primary-500',
                    isActive ? 'bg-primary-100 text-primary-700' : 'text-slate-700'
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="h-16 flex items-center justify-between gap-3 px-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
          <button className="lg:hidden p-2 rounded-md border hover:bg-primary-50" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="hidden sm:block">{location.pathname}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-pressed={dark}
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-primary-50"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-primary-50">
              <LogOut className="size-4" /> Logout
            </button>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

