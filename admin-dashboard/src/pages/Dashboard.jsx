import { DollarSign, Users, ShoppingCart, TrendingUp, Package, ArrowUpRight } from 'lucide-react'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      icon: DollarSign,
      trend: 'up',
      color: 'primary',
    },
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      icon: Users,
      trend: 'up',
      color: 'success',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.3%',
      icon: ShoppingCart,
      trend: 'up',
      color: 'warning',
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '-2.4%',
      icon: TrendingUp,
      trend: 'down',
      color: 'danger',
    },
  ]

  const revenueData = [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 198 },
    { month: 'Mar', revenue: 5000, orders: 300 },
    { month: 'Apr', revenue: 4500, orders: 278 },
    { month: 'May', revenue: 6000, orders: 389 },
    { month: 'Jun', revenue: 5500, orders: 349 },
  ]

  const categoryData = [
    { name: 'Electronics', value: 400, color: '#0ea5e9' },
    { name: 'Clothing', value: 300, color: '#22c55e' },
    { name: 'Food', value: 300, color: '#f59e0b' },
    { name: 'Books', value: 200, color: '#ef4444' },
  ]

  const topProducts = [
    { id: 1, name: 'Wireless Headphones', sales: 1234, revenue: '$24,680' },
    { id: 2, name: 'Smart Watch', sales: 1098, revenue: '$32,940' },
    { id: 3, name: 'Laptop Stand', sales: 876, revenue: '$17,520' },
    { id: 4, name: 'USB-C Hub', sales: 654, revenue: '$9,810' },
    { id: 5, name: 'Desk Lamp', sales: 543, revenue: '$5,430' },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: '$199', status: 'completed' },
    { id: 'ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: '$299', status: 'pending' },
    { id: 'ORD-003', customer: 'Bob Johnson', product: 'Laptop Stand', amount: '$49', status: 'processing' },
    { id: 'ORD-004', customer: 'Alice Brown', product: 'USB-C Hub', amount: '$79', status: 'completed' },
  ]

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'badge badge-success',
      pending: 'badge badge-warning',
      processing: 'badge badge-primary',
    }
    return badges[status] || 'badge'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card title="Revenue Overview">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card title="Sales by Category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card title="Top Products">
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                  <div className="flex items-center text-success-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{((index + 1) * 2.5).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Orders */}
        <Card title="Recent Orders">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 mb-1">{order.amount}</p>
                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
