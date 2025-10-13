/**
 * Student Dashboard Page
 * Shows student's courses, assignments, grades, and schedule
 */

import { BookOpen, FileText, TrendingUp, Calendar, Award, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { dashboardStats, courses, assignments, grades as allGrades, schedules } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const stats = dashboardStats.student;
  
  // Student's courses
  const myCourses = courses.filter(c => c.grade === '10');
  
  // Student's assignments
  const myAssignments = assignments.slice(0, 3);
  
  // Student's grades
  const myGrades = allGrades.filter(g => g.studentId === 'student1');
  
  // Performance trend data
  const trendData = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 87 },
    { month: 'Jun', score: 87.5 },
  ];

  // Subject performance radar
  const subjectPerformance = myGrades.map(g => ({
    subject: g.courseName,
    score: g.total,
  }));

  // Today's schedule
  const todaySchedule = schedules[0]?.periods.slice(0, 4) || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Student Dashboard</h1>
        <p className="text-secondary-600 mt-1">Track your academic progress and stay updated</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          color="primary"
        />
        <StatCard
          title="Pending Assignments"
          value={stats.pendingAssignments}
          icon={FileText}
          color="warning"
        />
        <StatCard
          title="Average Grade"
          value={stats.averageGrade}
          icon={TrendingUp}
          color="success"
          trend="up"
          trendValue="+2.5 points"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon={Award}
          color="info"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card title="Performance Trend" subtitle="Your progress over time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Subject Performance Radar */}
        <Card title="Subject Performance" subtitle="Performance across subjects">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={subjectPerformance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card title="Today's Classes" subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long' })}>
          <div className="space-y-3">
            {todaySchedule.map((period, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary-50 rounded-lg">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-secondary-900">{period.subject}</p>
                    <Badge variant="info" size="sm">{period.time}</Badge>
                  </div>
                  <p className="text-sm text-secondary-600">Teacher: {period.teacher}</p>
                  <p className="text-xs text-secondary-500">Room: {period.room}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Schedule
          </Button>
        </Card>

        {/* Upcoming Assignments */}
        <Card title="Upcoming Assignments" subtitle="Due soon">
          <div className="space-y-3">
            {myAssignments.map((assignment) => (
              <div key={assignment.id} className="p-3 border border-secondary-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-secondary-900">{assignment.title}</h4>
                  <Badge 
                    variant={new Date(assignment.dueDate) > new Date() ? 'warning' : 'danger'} 
                    size="sm"
                  >
                    Due Soon
                  </Badge>
                </div>
                <p className="text-xs text-secondary-600 mb-2">{assignment.courseName}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-secondary-500">Due: {assignment.dueDate}</p>
                  <p className="text-xs font-medium text-secondary-700">{assignment.totalMarks} marks</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full mt-4">
            Submit Assignment
          </Button>
        </Card>

        {/* Recent Grades */}
        <Card title="Recent Grades" subtitle="Latest evaluations">
          <div className="space-y-3">
            {myGrades.map((grade, index) => (
              <div key={index} className="p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-secondary-900">{grade.courseName}</h4>
                  <Badge 
                    variant={
                      grade.grade === 'A' || grade.grade === 'A+' ? 'success' :
                      grade.grade.startsWith('B') ? 'info' :
                      grade.grade.startsWith('C') ? 'warning' : 'danger'
                    }
                  >
                    {grade.grade}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600">Total Score</span>
                  <span className="font-medium text-secondary-900">{grade.total}/100</span>
                </div>
                <div className="mt-2 bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-success rounded-full h-2 transition-all duration-300"
                    style={{ width: `${grade.total}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Grades
          </Button>
        </Card>
      </div>

      {/* Course Overview */}
      <Card title="My Courses" subtitle={`${myCourses.length} active courses`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCourses.map((course) => (
            <div key={course.id} className="p-4 border border-secondary-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <Badge variant="success" size="sm">{course.credits} Credits</Badge>
              </div>
              <h4 className="font-semibold text-secondary-900 mb-1">{course.name}</h4>
              <p className="text-sm text-secondary-600 mb-2">{course.code}</p>
              <p className="text-xs text-secondary-500">{course.schedule}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;
