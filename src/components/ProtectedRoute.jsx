/**
 * Protected Route Component
 * Restricts access to routes based on authentication and user roles
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './common/LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  // Show loading while checking authentication
  if (isAuthenticated === undefined) {
    return <LoadingSpinner fullScreen />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user role
    const redirectPaths = {
      admin: '/admin/dashboard',
      teacher: '/teacher/dashboard',
      student: '/student/dashboard',
      parent: '/parent/dashboard',
    };
    return <Navigate to={redirectPaths[user?.role] || '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
