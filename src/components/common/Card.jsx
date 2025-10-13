/**
 * Reusable Card Component
 * Container component for grouping related content
 */

const Card = ({ children, className = '', title, subtitle, action }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-secondary-200 flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>}
            {subtitle && <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
