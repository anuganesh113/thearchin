import React from 'react'
import { TrendingUp, Users2, Wallet, ClipboardList } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 600 },
  { name: 'May', value: 800 },
  { name: 'Jun', value: 700 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={<TrendingUp className="size-5" />} label="Revenue" value="$128,240" trend="↑ 12% MoM" />
        <KPI icon={<Users2 className="size-5" />} label="New Leads" value="312" trend="↑ 8% MoM" />
        <KPI icon={<ClipboardList className="size-5" />} label="Bookings" value="96" trend="↓ 2% MoM" />
        <KPI icon={<Wallet className="size-5" />} label="Payments" value="$45,210" trend="↑ 5% MoM" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-card">
          <h2 className="text-lg font-medium mb-2">Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-card" role="region" aria-label="Recent activity">
          <h2 className="text-lg font-medium mb-2">Recent Activity</h2>
          <ul className="space-y-2 text-sm">
            <li>New lead: John Doe</li>
            <li>Payment received: $1,200</li>
            <li>Booking confirmed: Apt 301</li>
            <li>User invited: jane@bbnepal.com</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

function KPI({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div className="size-10 rounded-full bg-primary-100 text-primary-700 grid place-items-center" aria-hidden>
          {icon}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">{trend}</p>
    </div>
  )
}
