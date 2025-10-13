/**
 * Reusable Stat Card Component
 * Display statistics and metrics on dashboards
 */

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) => {
  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-secondary-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`${colors[color]} p-3 rounded-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
