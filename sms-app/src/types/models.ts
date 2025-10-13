export type Role = 'admin' | 'teacher' | 'student' | 'parent'

export type User = {
  id: string
  name: string
  role: Role
}

export type Student = {
  id: string
  firstName: string
  lastName: string
  email: string
  className: string
  enrolledAt: string // ISO date
  status: 'active' | 'inactive'
}

export type Course = {
  id: string
  name: string
  code: string
  teacherName: string
  className: string
}

export type Assignment = {
  id: string
  title: string
  description?: string
  courseId: string
  dueDate: string // ISO date
  createdAt: string // ISO date
  createdBy: string // teacher name
}

export type Submission = {
  id: string
  assignmentId: string
  studentId: string
  submittedAt: string
  content: string
  status: 'submitted' | 'graded'
}

export type Grade = {
  id: string
  studentId: string
  courseId: string
  assignmentId?: string
  score: number // 0..100
  letter: 'A' | 'B' | 'C' | 'D' | 'F'
  term: string
  gradedAt: string
}

export type AttendanceRecord = {
  id: string
  date: string // ISO date
  className: string
  presentByStudentId: Record<string, boolean>
}

export type Announcement = {
  id: string
  title: string
  body: string
  createdAt: string
  audience: 'all' | 'students' | 'teachers' | 'parents'
}

export type Message = {
  id: string
  fromRole: Role
  toRole: Role
  subject: string
  body: string
  createdAt: string
  readByRoles: Role[]
}

export type Notification = {
  id: string
  role: Role
  text: string
  url?: string
  createdAt: string
  read: boolean
}

export type DB = {
  students: Student[]
  courses: Course[]
  assignments: Assignment[]
  submissions: Submission[]
  grades: Grade[]
  attendance: AttendanceRecord[]
  announcements: Announcement[]
  messages: Message[]
  notifications: Notification[]
}
