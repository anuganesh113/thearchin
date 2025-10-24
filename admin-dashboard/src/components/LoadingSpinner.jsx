import clsx from 'clsx'

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div
        className={clsx(
          'border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin',
          sizes[size]
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
