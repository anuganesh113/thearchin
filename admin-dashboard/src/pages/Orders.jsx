import { useState } from 'react'
import { Eye, Download, ShoppingCart, DollarSign, Package } from 'lucide-react'
import Card from '../components/Card'
import Table from '../components/Table'
import Modal from '../components/Modal'

const Orders = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      product: 'Wireless Headphones',
      quantity: 2,
      amount: '$399.98',
      status: 'Completed',
      date: '2024-10-20',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      product: 'Smart Watch',
      quantity: 1,
      amount: '$299.99',
      status: 'Pending',
      date: '2024-10-21',
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      product: 'Laptop Stand',
      quantity: 3,
      amount: '$149.97',
      status: 'Processing',
      date: '2024-10-22',
    },
    {
      id: 'ORD-004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      product: 'USB-C Hub',
      quantity: 1,
      amount: '$79.99',
      status: 'Completed',
      date: '2024-10-23',
    },
    {
      id: 'ORD-005',
      customer: 'Charlie Wilson',
      email: 'charlie@example.com',
      product: 'Desk Lamp',
      quantity: 2,
      amount: '$79.98',
      status: 'Cancelled',
      date: '2024-10-24',
    },
  ]

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      render: (value) => <span className="font-medium text-primary-600">{value}</span>,
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'product',
      label: 'Product',
      sortable: true,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => <span className="font-semibold text-gray-900">{value}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const statusColors = {
          Completed: 'badge badge-success',
          Pending: 'badge badge-warning',
          Processing: 'badge badge-primary',
          Cancelled: 'badge badge-danger',
        }
        return <span className={statusColors[value]}>{value}</span>
      },
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <button
          onClick={() => {
            setSelectedOrder(row)
            setShowModal(true)
          }}
          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          aria-label="View order details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage customer orders</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {orders.filter((o) => o.status === 'Completed').length}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Package className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {orders.filter((o) => o.status === 'Pending').length}
              </p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Package className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$1,009.91</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <Table columns={columns} data={orders} />
      </Card>

      {/* Order Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedOrder(null)
        }}
        title="Order Details"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Order Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Order ID:</span>
                    <span className="ml-2 text-sm font-medium text-gray-900">{selectedOrder.id}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="ml-2 text-sm font-medium text-gray-900">{selectedOrder.date}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="ml-2">
                      <span className={
                        selectedOrder.status === 'Completed' ? 'badge badge-success' :
                        selectedOrder.status === 'Pending' ? 'badge badge-warning' :
                        selectedOrder.status === 'Processing' ? 'badge badge-primary' :
                        'badge badge-danger'
                      }>
                        {selectedOrder.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Customer Information</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="ml-2 text-sm font-medium text-gray-900">{selectedOrder.customer}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="ml-2 text-sm font-medium text-gray-900">{selectedOrder.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Product Details</h4>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{selectedOrder.product}</p>
                    <p className="text-sm text-gray-600">Quantity: {selectedOrder.quantity}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedOrder.amount}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 btn btn-primary">Update Status</button>
              <button className="flex-1 btn btn-secondary">Print Invoice</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Orders
