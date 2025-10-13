/**
 * Parent Dashboard Page
 * Shows parent's children information, grades, attendance, and communications
 */

import { Users, TrendingUp, Calendar, FileText, Award, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { dashboardStats, students, grades as allGrades, assignments, events, messages as allMessages } from '../../data/mockData';

const ParentDashboard = () => {
  const stats = dashboardStats.parent;
  
  // Parent's children
  const myChildren = students.filter(s => s.parentId === 'parent1');
  const child = myChildren[0]; // For this demo, showing first child
  
  // Child's grades
  const childGrades = allGrades.filter(g => g.studentId === child.id);
  
  // Performance trend
  const performanceTrend = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 86 },
    { month: 'Mar', score: 84 },
    { month: 'Apr', score: 87 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 87.5 },
  ];

  // Subject scores
  const subjectScores = childGrades.map(g => ({
    subject: g.courseName.split(' ')[0],
    score: g.total,
  }));

  // Upcoming assignments
  const upcomingAssignments = assignments.slice(0, 3);
  
  // Upcoming events
  const upcomingEvents = events.slice(0, 3);
  
  // Recent messages
  const recentMessages = allMessages.filter(m => m.to === 'parent1' || m.from === 'parent1').slice(0, 3);

  // Attendance data (last 7 days)
  const attendanceData = [
    { day: 'Mon', status: 'Present' },
    { day: 'Tue', status: 'Present' },
    { day: 'Wed', status: 'Absent' },
    { day: 'Thu', status: 'Present' },
    { day: 'Fri', status: 'Present' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Parent Dashboard</h1>
        <p className="text-secondary-600 mt-1">Monitor your child's academic progress and activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Children"
          value={stats.children}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Average Grade"
          value={stats.averageGrade}
          icon={TrendingUp}
          color="success"
          trend="up"
          trendValue="+1.5 points"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon={Award}
          color="info"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          icon={Calendar}
          color="warning"
        />
      </div>

      {/* Child Profile Card */}
      <Card title="Child Profile">
        <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
          <img src={child.avatar} alt={child.name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-secondary-900">{child.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div>
                <p className="text-xs text-secondary-600">Student ID</p>
                <p className="font-medium text-secondary-900">{child.studentId}</p>
              </div>
              <div>
                <p className="text-xs text-secondary-600">Class</p>
                <p className="font-medium text-secondary-900">{child.class}</p>
              </div>
              <div>
                <p className="text-xs text-secondary-600">Roll Number</p>
                <p className="font-medium text-secondary-900">{child.rollNumber}</p>
              </div>
              <div>
                <p className="text-xs text-secondary-600">Status</p>
                <Badge variant="success">{child.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card title="Academic Performance" subtitle="Monthly average scores">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Subject-wise Performance */}
        <Card title="Subject-wise Performance" subtitle="Current semester">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grades Overview */}
        <Card title="Current Grades" subtitle="Latest evaluations">
          <div className="space-y-3">
            {childGrades.map((grade, index) => (
              <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-secondary-900">{grade.courseName}</h4>
                  <Badge 
                    variant={
                      grade.grade === 'A' || grade.grade === 'A+' ? 'success' :
                      grade.grade.startsWith('B') ? 'info' :
                      'warning'
                    }
                  >
                    {grade.grade}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-secondary-600">Midterm</p>
                    <p className="font-medium">{grade.midterm}</p>
                  </div>
                  <div>
                    <p className="text-secondary-600">Final</p>
                    <p className="font-medium">{grade.final}</p>
                  </div>
                  <div>
                    <p className="text-secondary-600">Total</p>
                    <p className="font-medium">{grade.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Detailed Report
          </Button>
        </Card>

        {/* Attendance Overview */}
        <Card title="Attendance Record" subtitle="Last 5 days">
          <div className="space-y-3">
            {attendanceData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}`} />
                  <span className="font-medium text-secondary-900">{record.day}</span>
                </div>
                <Badge variant={record.status === 'Present' ? 'success' : 'danger'} size="sm">
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-success/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-700">Overall Rate</span>
              <span className="text-lg font-bold text-success">{stats.attendanceRate}%</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Record
          </Button>
        </Card>

        {/* Upcoming Assignments */}
        <Card title="Assignments" subtitle="Monitor submissions">
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="p-3 border border-secondary-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-secondary-900">{assignment.title}</h4>
                  <Badge variant="warning" size="sm">Pending</Badge>
                </div>
                <p className="text-xs text-secondary-600 mb-2">{assignment.courseName}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-secondary-500">Due: {assignment.dueDate}</p>
                  <p className="text-xs font-medium text-secondary-700">{assignment.totalMarks} marks</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Assignments
          </Button>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card title="Upcoming Events" subtitle="School calendar">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-secondary-50 rounded-lg">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-secondary-900">{event.title}</h4>
                    <Badge variant="info" size="sm">{event.type}</Badge>
                  </div>
                  <p className="text-xs text-secondary-600">{event.description}</p>
                  <p className="text-xs text-secondary-500 mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Messages */}
        <Card title="Recent Messages" subtitle="Communications">
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div key={message.id} className="p-3 border border-secondary-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-secondary-900">{message.subject}</h4>
                  {!message.read && <Badge variant="danger" size="sm">New</Badge>}
                </div>
                <p className="text-xs text-secondary-600 mb-2">From: {message.fromName}</p>
                <p className="text-xs text-secondary-500">{message.date}</p>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full mt-4">
            View All Messages
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
