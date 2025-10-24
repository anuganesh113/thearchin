import { createContext, useContext, useState, useCallback } from 'react'
import Notification from '../components/Notification'

const NotificationContext = createContext(null)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    setNotifications(prev => [...prev, { id, message, type, duration }])
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }, [])

  const showSuccess = useCallback((message, duration) => {
    addNotification(message, 'success', duration)
  }, [addNotification])

  const showError = useCallback((message, duration) => {
    addNotification(message, 'error', duration)
  }, [addNotification])

  const showWarning = useCallback((message, duration) => {
    addNotification(message, 'warning', duration)
  }, [addNotification])

  const showInfo = useCallback((message, duration) => {
    addNotification(message, 'info', duration)
  }, [addNotification])

  return (
    <NotificationContext.Provider value={{ 
      addNotification, 
      showSuccess, 
      showError, 
      showWarning, 
      showInfo 
    }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notif => (
          <Notification
            key={notif.id}
            message={notif.message}
            type={notif.type}
            onClose={() => removeNotification(notif.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
