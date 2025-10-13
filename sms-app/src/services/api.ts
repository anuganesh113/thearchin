import { delay, generateId, getDb, setDb } from './db'
import type { Student, Announcement, Message } from '../types/models'

export const api = {
  // Students
  async listStudents(query?: string) {
    const db = getDb()
    const q = (query ?? '').toLowerCase()
    const items = db.students.filter((s) =>
      `${s.firstName} ${s.lastName} ${s.email} ${s.className}`.toLowerCase().includes(q)
    )
    return delay(items)
  },
  async createStudent(input: Omit<Student, 'id' | 'enrolledAt'>) {
    const created: Student = { id: generateId('stu'), enrolledAt: new Date().toISOString(), ...input }
    setDb((db) => db.students.push(created))
    return delay(created)
  },
  async updateStudent(id: string, changes: Partial<Student>) {
    let updated: Student | undefined
    setDb((db) => {
      const idx = db.students.findIndex((s) => s.id === id)
      if (idx !== -1) {
        db.students[idx] = { ...db.students[idx], ...changes }
        updated = db.students[idx]
      }
    })
    return delay(updated!)
  },
  async deleteStudent(id: string) {
    setDb((db) => {
      db.students = db.students.filter((s) => s.id !== id)
    })
    return delay({ ok: true })
  },

  // Courses
  async listCourses() {
    return delay(getDb().courses)
  },

  // Announcements
  async listAnnouncements() {
    return delay(getDb().announcements)
  },
  async createAnnouncement(input: Omit<Announcement, 'id' | 'createdAt'>) {
    const created: Announcement = { id: generateId('ann'), createdAt: new Date().toISOString(), ...input }
    setDb((db) => db.announcements.push(created))
    return delay(created)
  },

  // Messages (simple)
  async listMessages() {
    return delay(getDb().messages)
  },
  async sendMessage(input: Omit<Message, 'id' | 'createdAt' | 'readByRoles'>) {
    const created: Message = { id: generateId('msg'), createdAt: new Date().toISOString(), readByRoles: [], ...input }
    setDb((db) => db.messages.push(created))
    return delay(created)
  },
}
