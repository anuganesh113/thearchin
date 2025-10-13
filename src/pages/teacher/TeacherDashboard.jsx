/**
 * Teacher Dashboard Page
 * Shows teacher's classes, students, assignments, and schedule overview
 */

import { Users, BookOpen, FileText, Calendar, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { dashboardStats, courses, assignments, students } from '../../data/mockData';

const TeacherDashboard = () => {
  const stats = dashboardStats.teacher;
  
  // Teacher's courses
  const myCourses = courses.filter(c => c.teacherId === 'teacher1');
  
  // Teacher's assignments
  const myAssignments = assignments.filter(a => a.teacherId === 'teacher1').slice(0, 3);
  
  // Class performance data
  const performanceData = [
    { class: '10-A', average: 85 },
    { class: '10-B', average: 78 },
    { class: '11-A', average: 82 },
    { class: '11-B', average: 80 },
  ];

  // Today's schedule
  const todaySchedule = [
    { time: '9:00 AM', subject: 'Mathematics', class: '10-A', room: '101' },
    { time: '11:00 AM', subject: 'Physics', class: '10-B', room: '102' },
    { time: '2:00 PM', subject: 'Mathematics', class: '11-A', room: '101' },
  ];

  // Recent students
  const recentStudents = students.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Teacher Dashboard</h1>
        <p className="text-secondary-600 mt-1">Manage your classes, assignments, and student progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="My Classes"
          value={stats.totalClasses}
          icon={BookOpen}
          color="success"
        />
        <StatCard
          title="Pending Assignments"
          value={stats.pendingAssignments}
          icon={FileText}
          color="warning"
        />
        <StatCard
          title="Average Attendance"
          value={`${stats.averageAttendance}%`}
          icon={TrendingUp}
          color="info"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card title="Today's Schedule" subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long' })}>
          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary-50 rounded-lg">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-secondary-900">{item.subject}</p>
                    <Badge variant="info" size="sm">{item.time}</Badge>
                  </div>
                  <p className="text-sm text-secondary-600">Class: {item.class}</p>
                  <p className="text-xs text-secondary-500">Room: {item.room}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Schedule
          </Button>
        </Card>

        {/* My Courses */}
        <Card title="My Courses" subtitle={`${myCourses.length} active courses`}>
          <div className="space-y-3">
            {myCourses.map((course) => (
              <div key={course.id} className="p-3 border border-secondary-200 rounded-lg hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-secondary-900">{course.name}</h4>
                    <p className="text-sm text-secondary-600">{course.code}</p>
                  </div>
                  <Badge variant="success" size="sm">{course.credits} Credits</Badge>
                </div>
                <p className="text-xs text-secondary-500">{course.schedule}</p>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full mt-4">
            Manage Courses
          </Button>
        </Card>

        {/* Pending Assignments */}
        <Card title="Recent Assignments" subtitle="Manage student submissions">
          <div className="space-y-3">
            {myAssignments.map((assignment) => (
              <div key={assignment.id} className="p-3 border border-secondary-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-secondary-900">{assignment.title}</h4>
                  <Badge 
                    variant={new Date(assignment.dueDate) > new Date() ? 'success' : 'danger'} 
                    size="sm"
                  >
                    {assignment.submissions?.length || 0} Submitted
                  </Badge>
                </div>
                <p className="text-xs text-secondary-600 mb-2">{assignment.courseName}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-secondary-500">Due: {assignment.dueDate}</p>
                  <p className="text-xs text-secondary-500">{assignment.totalMarks} marks</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="primary" className="w-full mt-4">
            View All Assignments
          </Button>
        </Card>
      </div>

      {/* Performance & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance */}
        <Card title="Class Performance" subtitle="Average scores by class">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Student List */}
        <Card title="My Students" subtitle="Recent student activity">
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-secondary-900">{student.name}</p>
                  <p className="text-sm text-secondary-600">{student.class} • Roll No: {student.rollNumber}</p>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Students
          </Button>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary" className="flex flex-col items-center justify-center h-24">
            <FileText className="w-6 h-6 mb-2" />
            Create Assignment
          </Button>
          <Button variant="success" className="flex flex-col items-center justify-center h-24">
            <Calendar className="w-6 h-6 mb-2" />
            Mark Attendance
          </Button>
          <Button variant="info" className="flex flex-col items-center justify-center h-24">
            <TrendingUp className="w-6 h-6 mb-2" />
            Enter Grades
          </Button>
          <Button variant="warning" className="flex flex-col items-center justify-center h-24">
            <Users className="w-6 h-6 mb-2" />
            View Students
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
