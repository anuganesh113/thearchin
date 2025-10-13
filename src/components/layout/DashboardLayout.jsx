/**
 * Dashboard Layout Component
 * Main layout wrapper for all dashboard pages
 * Includes sidebar navigation and header
 */

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';
import Button from '../common/Button';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on user role
  const navigationItems = {
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Students', path: '/admin/students', icon: Users },
      { name: 'Teachers', path: '/admin/teachers', icon: UserCircle },
      { name: 'Courses', path: '/admin/courses', icon: BookOpen },
      { name: 'Attendance', path: '/admin/attendance', icon: ClipboardList },
      { name: 'Announcements', path: '/admin/announcements', icon: Bell },
      { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
      { name: 'Reports', path: '/admin/reports', icon: TrendingUp },
    ],
    teacher: [
      { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
      { name: 'My Classes', path: '/teacher/classes', icon: BookOpen },
      { name: 'Students', path: '/teacher/students', icon: Users },
      { name: 'Assignments', path: '/teacher/assignments', icon: FileText },
      { name: 'Attendance', path: '/teacher/attendance', icon: ClipboardList },
      { name: 'Grades', path: '/teacher/grades', icon: TrendingUp },
      { name: 'Messages', path: '/teacher/messages', icon: MessageSquare },
      { name: 'Schedule', path: '/teacher/schedule', icon: Calendar },
    ],
    student: [
      { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      { name: 'My Courses', path: '/student/courses', icon: BookOpen },
      { name: 'Assignments', path: '/student/assignments', icon: FileText },
      { name: 'Grades', path: '/student/grades', icon: TrendingUp },
      { name: 'Attendance', path: '/student/attendance', icon: ClipboardList },
      { name: 'Schedule', path: '/student/schedule', icon: Calendar },
      { name: 'Messages', path: '/student/messages', icon: MessageSquare },
    ],
    parent: [
      { name: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
      { name: 'Children', path: '/parent/children', icon: Users },
      { name: 'Grades', path: '/parent/grades', icon: TrendingUp },
      { name: 'Attendance', path: '/parent/attendance', icon: ClipboardList },
      { name: 'Assignments', path: '/parent/assignments', icon: FileText },
      { name: 'Messages', path: '/parent/messages', icon: MessageSquare },
      { name: 'Events', path: '/parent/events', icon: Calendar },
    ],
  };

  const navItems = navigationItems[user?.role] || [];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-secondary-200">
            <div className="bg-primary-600 p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">EduManage</h1>
              <p className="text-xs text-secondary-600 capitalize">{user?.role} Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-secondary-700 hover:bg-secondary-100'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-secondary-200">
            <div className="flex items-center gap-3 mb-3 p-3 bg-secondary-50 rounded-lg">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">{user?.name}</p>
                <p className="text-xs text-secondary-600 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="danger"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex-1 lg:ml-0 ml-4">
              <h2 className="text-xl font-semibold text-secondary-900">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-sm text-secondary-600">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg hover:bg-secondary-100">
                <Bell className="w-6 h-6 text-secondary-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
