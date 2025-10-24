import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function Protected({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAuthed = Boolean(localStorage.getItem('auth_token'))
  if (!isAuthed) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <>{children}</>
}
