import { useState } from 'react'
import { Plus, Edit, Trash2, Mail, Phone } from 'lucide-react'
import Card from '../components/Card'
import Table from '../components/Table'
import Modal from '../components/Modal'
import { useNotification } from '../context/NotificationContext'

const Users = () => {
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const { showSuccess, showError } = useNotification()

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      role: 'User',
      status: 'Active',
      joinDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1234567892',
      role: 'User',
      status: 'Inactive',
      joinDate: '2024-03-10',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      phone: '+1234567893',
      role: 'Manager',
      status: 'Active',
      joinDate: '2024-04-05',
    },
  ])

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(value)}&background=0ea5e9&color=fff`}
            alt={value}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: false,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <span className="badge badge-primary">{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={value === 'Active' ? 'badge badge-success' : 'badge badge-danger'}>
          {value}
        </span>
      ),
    },
    {
      key: 'joinDate',
      label: 'Join Date',
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
            aria-label="Edit user"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
            aria-label="Delete user"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const handleEdit = (user) => {
    setEditingUser(user)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== id))
      showSuccess('User deleted successfully')
    }
  }

  const handleSaveUser = (e) => {
    e.preventDefault()
    // Add logic to save user
    setShowModal(false)
    setEditingUser(null)
    showSuccess(editingUser ? 'User updated successfully' : 'User created successfully')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage your user accounts</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null)
            setShowModal(true)
          }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {users.filter((u) => u.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Phone className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {users.filter((u) => u.status === 'Inactive').length}
              </p>
            </div>
            <div className="p-3 bg-danger-100 rounded-lg">
              <Phone className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <Table columns={columns} data={users} />
      </Card>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingUser(null)
        }}
        title={editingUser ? 'Edit User' : 'Add New User'}
        footer={
          <>
            <button
              onClick={() => {
                setShowModal(false)
                setEditingUser(null)
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleSaveUser} className="btn btn-primary">
              {editingUser ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              defaultValue={editingUser?.name}
              className="input"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue={editingUser?.email}
              className="input"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue={editingUser?.phone}
              className="input"
              placeholder="+1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select defaultValue={editingUser?.role} className="input">
              <option>User</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select defaultValue={editingUser?.status} className="input">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Users
