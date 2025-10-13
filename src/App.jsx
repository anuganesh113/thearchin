/**
 * Main App Component
 * Configures routing, context providers, and application structure
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsPage from './pages/admin/StudentsPage';
import AnnouncementsPage from './pages/admin/AnnouncementsPage';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';

// Shared Pages
import MessagesPage from './pages/shared/MessagesPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="students" element={<StudentsPage />} />
                      <Route path="teachers" element={<StudentsPage />} />
                      <Route path="courses" element={<StudentsPage />} />
                      <Route path="attendance" element={<StudentsPage />} />
                      <Route path="announcements" element={<AnnouncementsPage />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="reports" element={<AdminDashboard />} />
                      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Teacher Routes */}
            <Route
              path="/teacher/*"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<TeacherDashboard />} />
                      <Route path="classes" element={<TeacherDashboard />} />
                      <Route path="students" element={<StudentsPage />} />
                      <Route path="assignments" element={<TeacherDashboard />} />
                      <Route path="attendance" element={<TeacherDashboard />} />
                      <Route path="grades" element={<TeacherDashboard />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="schedule" element={<TeacherDashboard />} />
                      <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<StudentDashboard />} />
                      <Route path="courses" element={<StudentDashboard />} />
                      <Route path="assignments" element={<StudentDashboard />} />
                      <Route path="grades" element={<StudentDashboard />} />
                      <Route path="attendance" element={<StudentDashboard />} />
                      <Route path="schedule" element={<StudentDashboard />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Parent Routes */}
            <Route
              path="/parent/*"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<ParentDashboard />} />
                      <Route path="children" element={<ParentDashboard />} />
                      <Route path="grades" element={<ParentDashboard />} />
                      <Route path="attendance" element={<ParentDashboard />} />
                      <Route path="assignments" element={<ParentDashboard />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="events" element={<ParentDashboard />} />
                      <Route path="*" element={<Navigate to="/parent/dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
