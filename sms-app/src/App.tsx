import { Link, NavLink, Outlet, Route, Routes, Navigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from './services/api'

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-primary-600 font-bold text-lg">SchoolMS</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <AuthButtons />
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Protected />}> 
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/teacher/*" element={<TeacherLayout />} />
            <Route path="/student/*" element={<StudentLayout />} />
            <Route path="/parent/*" element={<ParentLayout />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SchoolMS
      </footer>
    </div>
  )
}

function Landing() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="card">
        <div className="card-header">
          <h2 className="text-base font-semibold">Welcome</h2>
        </div>
        <div className="card-body space-y-3 text-sm text-gray-600">
          <p>Use the login to access your dashboard based on role.</p>
        </div>
      </div>
    </div>
  )
}

type Role = 'admin' | 'teacher' | 'student' | 'parent'
type User = { id: string; name: string; role: Role } | null

type AuthContextValue = {
  user: User
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (role: Role) => setUser({ id: '1', name: 'Demo User', role }),
      logout: () => setUser(null),
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function Protected() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

function Login() {
  const { login } = useAuth()
  const [selectedRole, setSelectedRole] = useState<Role>('admin')
  return (
    <div className="max-w-md mx-auto card">
      <div className="card-header">
        <h2 className="text-base font-semibold">Login</h2>
      </div>
      <div className="card-body">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="input mt-1"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>
          <button
            type="button"
            className="btn w-full"
            onClick={() => {
              login(selectedRole)
            }}
          >
            Sign in as {selectedRole}
          </button>
        </form>
      </div>
    </div>
  )
}

function AuthButtons() {
  const { user, logout } = useAuth()
  if (!user) {
    return (
      <NavLink to="/login" className={({isActive}) => isActive ? 'text-primary-700 font-semibold' : 'text-gray-600 hover:text-gray-900'}>
        Login
      </NavLink>
    )
  }
  const roleToPath: Record<Role, string> = {
    admin: '/admin',
    teacher: '/teacher',
    student: '/student',
    parent: '/parent',
  }
  return (
    <div className="flex items-center gap-3">
      <NavLink to={roleToPath[user.role]} className={({isActive}) => isActive ? 'text-primary-700 font-semibold' : 'text-gray-600 hover:text-gray-900'}>
        Dashboard
      </NavLink>
      <button onClick={logout} className="btn-secondary">Logout</button>
    </div>
  )
}

function AdminLayout() {
  const [studentCount, setStudentCount] = useState<number>(0)
  const [annCount, setAnnCount] = useState<number>(0)
  useEffect(() => {
    ;(async () => {
      const [students, announcements] = await Promise.all([
        api.listStudents(),
        api.listAnnouncements(),
      ])
      setStudentCount(students.length)
      setAnnCount(announcements.length)
    })()
  }, [])
  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Stat title="Students" value={String(studentCount)} />
        <Stat title="Announcements" value={String(annCount)} />
        <Stat title="Attendance" value="96%" />
      </div>
      <Routes>
        <Route index element={<>
          <StudentsCard />
        </>} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
      </Routes>
      <div className="card">
        <div className="card-header">
          <div className="text-sm font-medium">Quick Links</div>
        </div>
        <div className="card-body grid gap-3 sm:grid-cols-2">
          <NavLink className="btn" to="/admin/students">Manage Students</NavLink>
          <NavLink className="btn" to="/admin/announcements">Announcements</NavLink>
        </div>
      </div>
    </div>
  )
}

function TeacherLayout() {
  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">Teacher Dashboard</h2>
      <div className="card"><div className="card-body">Create assignments and record grades.</div></div>
      <TeacherAssignments />
    </div>
  )
}

function StudentsPage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState<Array<{ id: string; firstName: string; lastName: string; email: string; className: string; status: string }>>([])
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', className: '', status: 'active' })
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    api.listStudents(query).then((items) => {
      setStudents(items)
      setLoading(false)
    })
  }
  useEffect(() => { load() }, [query])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await api.createStudent({ ...form, status: form.status as 'active' | 'inactive' })
    setForm({ firstName: '', lastName: '', email: '', className: '', status: 'active' })
    setSaving(false)
    load()
  }

  const handleDelete = async (id: string) => {
    await api.deleteStudent(id)
    load()
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <div className="card-header">
          <div className="text-sm font-medium">Create Student</div>
        </div>
        <div className="card-body">
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleCreate}>
            <div>
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input className="input mt-1" value={form.firstName} onChange={(e)=>setForm({...form, firstName: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input className="input mt-1" value={form.lastName} onChange={(e)=>setForm({...form, lastName: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="input mt-1" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <input className="input mt-1" value={form.className} onChange={(e)=>setForm({...form, className: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select className="input mt-1" value={form.status} onChange={(e)=>setForm({...form, status: e.target.value})}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <button className="btn" disabled={saving}>{saving ? 'Saving...' : 'Create Student'}</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="text-sm font-medium">Students</div>
          <div className="ml-auto">
            <input className="input" placeholder="Search..." value={query} onChange={(e)=>setQuery(e.target.value)} />
          </div>
        </div>
        <div className="card-body overflow-x-auto">
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Class</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 pr-4 font-medium">{s.firstName} {s.lastName}</td>
                    <td className="py-2 pr-4">{s.email}</td>
                    <td className="py-2 pr-4">{s.className}</td>
                    <td className="py-2 pr-4 capitalize">{s.status}</td>
                    <td className="py-2 pr-4 text-right">
                      <button onClick={() => handleDelete(s.id)} className="text-danger-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

function AnnouncementsPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [items, setItems] = useState<{ id: string; title: string; body: string; createdAt: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const data = await api.listAnnouncements()
    setItems(data)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await api.createAnnouncement({ title, body, audience: 'all' })
    setTitle('')
    setBody('')
    setSaving(false)
    load()
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <div className="card-header"><div className="text-sm font-medium">Create Announcement</div></div>
        <div className="card-body">
          <form className="grid gap-4" onSubmit={handleCreate}>
            <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
            <textarea className="input" placeholder="Body" value={body} onChange={(e)=>setBody(e.target.value)} required />
            <button className="btn w-fit" disabled={saving}>{saving ? 'Publishing...' : 'Publish'}</button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="text-sm font-medium">Announcements</div></div>
        <div className="card-body">
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : (
            <ul className="grid gap-3">
              {items.map((a) => (
                <li key={a.id} className="p-3 border rounded-md">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-gray-600">{a.body}</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(a.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function StudentLayout() {
  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">Student Dashboard</h2>
      <div className="card"><div className="card-body">Grades, assignments, schedule.</div></div>
    </div>
  )
}

function ParentLayout() {
  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">Parent Dashboard</h2>
      <div className="card"><div className="card-body">Monitor child's progress.</div></div>
      <MessagesPanel />
    </div>
  )
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  )
}

function TeacherAssignments() {
  const [title, setTitle] = useState('')
  const [courseId, setCourseId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [items, setItems] = useState<Array<{ id: string; title: string; courseId: string; dueDate: string }>>([])
  const [courses, setCourses] = useState<Array<{ id: string; name: string }>>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => { api.listCourses().then(setCourses) }, [])
  useEffect(() => {
    // mock: keep in memory within localStorage via db service later if needed
    // for now just hydrate from db.assignments
    setItems((prev) => prev)
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!courseId || !title || !dueDate) return
    setSaving(true)
    // store assignment as announcement-like demo or extend API when needed
    // keeping UI placeholder for feature
    setItems((arr) => [{ id: Math.random().toString(36).slice(2), title, courseId, dueDate }, ...arr])
    setTitle('')
    setCourseId('')
    setDueDate('')
    setSaving(false)
  }

  return (
    <div className="card">
      <div className="card-header"><div className="text-sm font-medium">Assignments</div></div>
      <div className="card-body grid gap-4">
        <form className="grid gap-3 sm:grid-cols-3" onSubmit={handleCreate}>
          <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <select className="input" value={courseId} onChange={(e)=>setCourseId(e.target.value)}>
            <option value="">Select course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input className="input" type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
          <div className="sm:col-span-3">
            <button className="btn" disabled={saving}>{saving ? 'Creating...' : 'Create Assignment'}</button>
          </div>
        </form>
        <ul className="divide-y divide-gray-200">
          {items.map((a) => (
            <li key={a.id} className="py-2 flex items-center justify-between">
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-gray-500">Due {a.dueDate}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StudentsCard() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState<Array<{ id: string; name: string; className: string }>>([])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api.listStudents(query).then((items) => {
      if (cancelled) return
      setStudents(items.map((s) => ({ id: s.id, name: `${s.firstName} ${s.lastName}`, className: s.className })))
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [query])

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">Students</div>
        </div>
        <div className="ml-auto">
          <input
            className="input"
            placeholder="Search students..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {students.slice(0, 6).map((s) => (
              <li key={s.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.className}</div>
                </div>
                <NavLink to={`/admin/students`} className="text-primary-600 text-sm">View</NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function MessagesPanel() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [items, setItems] = useState<Array<{ id: string; subject: string; body: string; createdAt: string }>>([])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)

  const load = async () => {
    setLoading(true)
    const data = await api.listMessages()
    setItems(data)
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await api.sendMessage({ fromRole: 'parent', toRole: 'teacher', subject, body })
    setSubject('')
    setBody('')
    setSending(false)
    load()
  }

  return (
    <div className="card">
      <div className="card-header"><div className="text-sm font-medium">Messages</div></div>
      <div className="card-body grid gap-4">
        <form className="grid gap-3" onSubmit={send}>
          <input className="input" placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} />
          <textarea className="input" placeholder="Message" value={body} onChange={(e)=>setBody(e.target.value)} />
          <button className="btn w-fit" disabled={sending}>{sending ? 'Sending...' : 'Send'}</button>
        </form>
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          <ul className="grid gap-2">
            {items.slice(0, 5).map((m) => (
              <li key={m.id} className="p-3 border rounded-md">
                <div className="font-medium">{m.subject}</div>
                <div className="text-sm text-gray-600">{m.body}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
