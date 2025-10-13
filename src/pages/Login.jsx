/**
 * Login Page Component
 * Handles user authentication for all roles
 * Provides role-based credential examples
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Redirect based on user role
      const role = result.user.role;
      const redirectPaths = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
        parent: '/parent/dashboard',
      };
      navigate(redirectPaths[role] || '/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const quickLogin = (role) => {
    const credentials = {
      admin: { email: 'admin@school.edu', password: 'admin123' },
      teacher: { email: 'teacher@school.edu', password: 'teacher123' },
      student: { email: 'student@school.edu', password: 'student123' },
      parent: { email: 'parent@school.edu', password: 'parent123' },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-600 p-3 rounded-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-secondary-900">EduManage</h1>
                <p className="text-secondary-600">School Management System</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="bg-success/10 p-2 rounded-lg mt-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Comprehensive Management</h3>
                  <p className="text-sm text-secondary-600">Handle students, teachers, courses, and more in one place</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-warning/10 p-2 rounded-lg mt-1">
                  <div className="w-2 h-2 bg-warning rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Real-time Analytics</h3>
                  <p className="text-sm text-secondary-600">Track performance and attendance with detailed insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-info/10 p-2 rounded-lg mt-1">
                  <div className="w-2 h-2 bg-info rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Seamless Communication</h3>
                  <p className="text-sm text-secondary-600">Connect teachers, students, and parents effortlessly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Welcome Back!</h2>
            <p className="text-secondary-600">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-sm text-secondary-600 mb-3 text-center">Quick Login (Demo)</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin')}
              >
                Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('teacher')}
              >
                Teacher
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('student')}
              >
                Student
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('parent')}
              >
                Parent
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-secondary-500">
              Demo credentials are pre-filled above. Click any role button to auto-fill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
