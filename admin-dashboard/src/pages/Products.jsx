import { useState } from 'react'
import { Plus, Edit, Trash2, Package, DollarSign, TrendingUp } from 'lucide-react'
import Card from '../components/Card'
import Table from '../components/Table'
import Modal from '../components/Modal'
import { useNotification } from '../context/NotificationContext'

const Products = () => {
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { showSuccess } = useNotification()

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '$199.99',
      stock: 45,
      status: 'In Stock',
      sales: 1234,
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      price: '$299.99',
      stock: 23,
      status: 'In Stock',
      sales: 1098,
    },
    {
      id: 3,
      name: 'Laptop Stand',
      category: 'Accessories',
      price: '$49.99',
      stock: 0,
      status: 'Out of Stock',
      sales: 876,
    },
    {
      id: 4,
      name: 'USB-C Hub',
      category: 'Accessories',
      price: '$79.99',
      stock: 67,
      status: 'In Stock',
      sales: 654,
    },
    {
      id: 5,
      name: 'Desk Lamp',
      category: 'Furniture',
      price: '$39.99',
      stock: 12,
      status: 'Low Stock',
      sales: 543,
    },
  ])

  const columns = [
    {
      key: 'name',
      label: 'Product',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{row.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{value} units</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const statusColors = {
          'In Stock': 'badge badge-success',
          'Low Stock': 'badge badge-warning',
          'Out of Stock': 'badge badge-danger',
        }
        return <span className={statusColors[value]}>{value}</span>
      },
    },
    {
      key: 'sales',
      label: 'Sales',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Edit product"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
            aria-label="Delete product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((product) => product.id !== id))
      showSuccess('Product deleted successfully')
    }
  }

  const handleSaveProduct = (e) => {
    e.preventDefault()
    setShowModal(false)
    setEditingProduct(null)
    showSuccess(editingProduct ? 'Product updated successfully' : 'Product created successfully')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null)
            setShowModal(true)
          }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$124,350</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4,405</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <Table columns={columns} data={products} />
      </Card>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingProduct(null)
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        footer={
          <>
            <button
              onClick={() => {
                setShowModal(false)
                setEditingProduct(null)
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleSaveProduct} className="btn btn-primary">
              {editingProduct ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              defaultValue={editingProduct?.name}
              className="input"
              placeholder="Enter product name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select defaultValue={editingProduct?.category} className="input">
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Furniture</option>
                <option>Clothing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                defaultValue={editingProduct?.price}
                className="input"
                placeholder="$0.00"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                defaultValue={editingProduct?.stock}
                className="input"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select defaultValue={editingProduct?.status} className="input">
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="input"
              rows="4"
              placeholder="Enter product description"
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Products
