/**
 * Admin Dashboard Page
 * Displays system overview with analytics, statistics, and quick actions
 */

import { Users, GraduationCap, BookOpen, TrendingUp, DollarSign, UserCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { dashboardStats, students, announcements } from '../../data/mockData';

const AdminDashboard = () => {
  const stats = dashboardStats.admin;

  // Sample chart data
  const enrollmentData = [
    { month: 'Jan', students: 720 },
    { month: 'Feb', students: 740 },
    { month: 'Mar', students: 765 },
    { month: 'Apr', students: 790 },
    { month: 'May', students: 810 },
    { month: 'Jun', students: 856 },
  ];

  const gradeDistribution = [
    { grade: 'Grade 9', count: 180 },
    { grade: 'Grade 10', count: 220 },
    { grade: 'Grade 11', count: 245 },
    { grade: 'Grade 12', count: 211 },
  ];

  const performanceData = [
    { name: 'A+', value: 180, color: '#10b981' },
    { name: 'A', value: 240, color: '#3b82f6' },
    { name: 'B', value: 220, color: '#f59e0b' },
    { name: 'C', value: 140, color: '#ef4444' },
  ];

  const recentStudents = students.slice(0, 5);
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
        <p className="text-secondary-600 mt-1">Complete overview of your school management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="primary"
          trend="up"
          trendValue="+5.2% from last month"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={GraduationCap}
          color="success"
        />
        <StatCard
          title="Total Classes"
          value={stats.totalClasses}
          icon={BookOpen}
          color="warning"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon={UserCheck}
          color="info"
          trend="up"
          trendValue="+2.1%"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <Card title="Student Enrollment Trend" subtitle="Last 6 months">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Grade Distribution */}
        <Card title="Students by Grade Level" subtitle="Current academic year">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Additional Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Distribution */}
        <Card title="Performance Overview" subtitle="Grade distribution">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {performanceData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-secondary-700">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Students */}
        <Card title="Recently Enrolled" subtitle="Latest student registrations">
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 truncate">{student.name}</p>
                  <p className="text-xs text-secondary-600">{student.class}</p>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Announcements */}
        <Card title="Recent Announcements" subtitle="Latest updates">
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 border border-secondary-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-secondary-900">{announcement.title}</h4>
                  <Badge 
                    variant={announcement.priority === 'high' ? 'danger' : announcement.priority === 'medium' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-xs text-secondary-600 line-clamp-2">{announcement.content}</p>
                <p className="text-xs text-secondary-500 mt-2">{announcement.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-secondary-600 mb-2">New Enrollments</p>
            <p className="text-3xl font-bold text-primary-600">{stats.newEnrollments}</p>
            <p className="text-xs text-secondary-500 mt-1">This month</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-secondary-600 mb-2">Pending Approvals</p>
            <p className="text-3xl font-bold text-warning">{stats.pendingApprovals}</p>
            <p className="text-xs text-secondary-500 mt-1">Requires action</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-secondary-600 mb-2">Active Announcements</p>
            <p className="text-3xl font-bold text-info">{stats.activeAnnouncements}</p>
            <p className="text-xs text-secondary-500 mt-1">Currently visible</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-secondary-600 mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-success">{stats.totalRevenue}</p>
            <p className="text-xs text-secondary-500 mt-1">This academic year</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
