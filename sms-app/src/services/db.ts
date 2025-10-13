import type { DB } from '../types/models'

const STORAGE_KEY = 'sms-db'

function uid(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`
}

function readDb(): DB | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as DB
  } catch {
    return null
  }
}

function writeDb(db: DB) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

function seedDb(): DB {
  const now = new Date().toISOString()
  const students = Array.from({ length: 8 }).map((_, i) => ({
    id: uid('stu'),
    firstName: ['Ava', 'Noah', 'Sophia', 'Liam', 'Mia', 'Ethan', 'Emma', 'Lucas'][i],
    lastName: ['Johnson','Smith','Brown','Davis','Miller','Wilson','Moore','Taylor'][i],
    email: `student${i + 1}@school.edu`,
    className: ['Grade 9A','Grade 9B','Grade 10A','Grade 10B'][i % 4],
    enrolledAt: now,
    status: 'active' as const,
  }))
  const courses = [
    { id: uid('crs'), name: 'Mathematics', code: 'MATH-101', teacherName: 'Mr. Adams', className: 'Grade 9A' },
    { id: uid('crs'), name: 'Science', code: 'SCI-101', teacherName: 'Ms. Baker', className: 'Grade 9B' },
    { id: uid('crs'), name: 'History', code: 'HIS-201', teacherName: 'Mr. Clark', className: 'Grade 10A' },
  ]
  const announcements = [
    { id: uid('ann'), title: 'Welcome Back!', body: 'New term starts next Monday.', createdAt: now, audience: 'all' as const },
  ]
  const db: DB = {
    students,
    courses,
    assignments: [],
    submissions: [],
    grades: [],
    attendance: [],
    announcements,
    messages: [],
    notifications: [],
  }
  writeDb(db)
  return db
}

export function ensureDb(): DB {
  return readDb() ?? seedDb()
}

export function getDb(): DB {
  return ensureDb()
}

export function setDb(mutator: (db: DB) => void): DB {
  const db = ensureDb()
  mutator(db)
  writeDb(db)
  return db
}

export function generateId(prefix?: string) {
  return uid(prefix)
}

export async function delay<T>(value: T, ms: number = 250): Promise<T> {
  await new Promise((res) => setTimeout(res, ms))
  return value
}
