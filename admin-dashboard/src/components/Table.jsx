import { useState } from 'react'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'
import clsx from 'clsx'

const Table = ({ columns, data, searchable = true, pagination = true, itemsPerPage = 10 }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter data based on search
  const filteredData = searchable
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data

  // Sort data
  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1
        }
        return aVal < bVal ? 1 : -1
      })
    : filteredData

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + itemsPerPage)
    : sortedData

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchable && (
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 max-w-md">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="ml-2 bg-transparent border-none outline-none w-full text-sm"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider',
                    { 'cursor-pointer hover:bg-gray-100': column.sortable }
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={clsx('w-3 h-3 -mb-1', {
                            'text-primary-600': sortColumn === column.key && sortDirection === 'asc',
                            'text-gray-400': sortColumn !== column.key || sortDirection !== 'asc',
                          })}
                        />
                        <ChevronDown
                          className={clsx('w-3 h-3', {
                            'text-primary-600': sortColumn === column.key && sortDirection === 'desc',
                            'text-gray-400': sortColumn !== column.key || sortDirection !== 'desc',
                          })}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, sortedData.length)}</span> of{' '}
            <span className="font-medium">{sortedData.length}</span> results
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={clsx(
                  'px-3 py-1 rounded-lg text-sm font-medium',
                  {
                    'bg-primary-600 text-white': currentPage === page,
                    'border border-gray-300 text-gray-700 hover:bg-gray-50': currentPage !== page,
                  }
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table
