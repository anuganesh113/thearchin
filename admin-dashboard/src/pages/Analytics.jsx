import { TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Analytics = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$125,430',
      change: '+18.2%',
      icon: DollarSign,
      trend: 'up',
      color: 'primary',
    },
    {
      title: 'Conversion Rate',
      value: '3.42%',
      change: '+5.1%',
      icon: TrendingUp,
      trend: 'up',
      color: 'success',
    },
    {
      title: 'Total Customers',
      value: '8,234',
      change: '+12.8%',
      icon: Users,
      trend: 'up',
      color: 'warning',
    },
    {
      title: 'Avg Order Value',
      value: '$142.50',
      change: '-3.2%',
      icon: ShoppingBag,
      trend: 'down',
      color: 'danger',
    },
  ]

  const monthlyData = [
    { month: 'Jan', revenue: 45000, orders: 320, customers: 280 },
    { month: 'Feb', revenue: 52000, orders: 380, customers: 340 },
    { month: 'Mar', revenue: 48000, orders: 350, customers: 310 },
    { month: 'Apr', revenue: 61000, orders: 420, customers: 390 },
    { month: 'May', revenue: 58000, orders: 400, customers: 370 },
    { month: 'Jun', revenue: 70000, orders: 480, customers: 450 },
    { month: 'Jul', revenue: 68000, orders: 460, customers: 430 },
    { month: 'Aug', revenue: 75000, orders: 510, customers: 480 },
    { month: 'Sep', revenue: 72000, orders: 490, customers: 460 },
    { month: 'Oct', revenue: 82000, orders: 550, customers: 520 },
  ]

  const categoryPerformance = [
    { category: 'Electronics', sales: 45000, profit: 12000 },
    { category: 'Clothing', sales: 38000, profit: 9500 },
    { category: 'Home & Garden', sales: 32000, profit: 8000 },
    { category: 'Sports', sales: 28000, profit: 7000 },
    { category: 'Books', sales: 22000, profit: 5500 },
  ]

  const trafficSources = [
    { source: 'Organic Search', visitors: 12450, conversion: 4.2 },
    { source: 'Direct', visitors: 8900, conversion: 5.8 },
    { source: 'Social Media', visitors: 6700, conversion: 3.1 },
    { source: 'Referral', visitors: 4300, conversion: 6.5 },
    { source: 'Email', visitors: 3200, conversion: 7.2 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your business performance and growth</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Revenue & Orders Trend */}
      <Card title="Revenue & Orders Trend">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="orders" stroke="#22c55e" fillOpacity={1} fill="url(#colorOrders)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Performance & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card title="Category Performance">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#6b7280" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#0ea5e9" />
              <Bar dataKey="profit" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Traffic Sources */}
        <Card title="Traffic Sources">
          <div className="space-y-4">
            {trafficSources.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.source}</p>
                    <p className="text-xs text-gray-600">{item.visitors.toLocaleString()} visitors</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary-600">{item.conversion}%</p>
                    <p className="text-xs text-gray-600">conversion</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(item.visitors / 12450) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Customer Growth */}
      <Card title="Customer Growth">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="customers" stroke="#a855f7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default Analytics
