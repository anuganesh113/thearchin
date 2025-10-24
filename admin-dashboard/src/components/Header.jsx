import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import clsx from 'clsx'

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const userMenuRef = useRef(null)
  const notificationRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const notifications = [
    { id: 1, title: 'New order received', time: '5 minutes ago', unread: true },
    { id: 2, title: 'User registration', time: '1 hour ago', unread: true },
    { id: 3, title: 'Server maintenance', time: '2 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent border-none outline-none w-full text-sm"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger-500 rounded-full text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-slide-down z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={clsx(
                      'px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0',
                      { 'bg-blue-50': notification.unread }
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-900">{notification.title}</p>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="User menu"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-slide-down z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  navigate('/settings')
                  setShowUserMenu(false)
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => {
                  navigate('/settings')
                  setShowUserMenu(false)
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <div className="border-t border-gray-200 my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-danger-600 hover:bg-danger-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
