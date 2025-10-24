import clsx from 'clsx'
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatCard = ({ title, value, change, icon: Icon, trend = 'up', color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
    danger: 'bg-danger-100 text-danger-600',
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-success-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-danger-600 mr-1" />
              )}
              <span
                className={clsx('text-sm font-medium', {
                  'text-success-600': trend === 'up',
                  'text-danger-600': trend === 'down',
                })}
              >
                {change}
              </span>
              <span className="text-sm text-gray-600 ml-1">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx('p-3 rounded-lg', colorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
