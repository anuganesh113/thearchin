import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

export type Lead = {
  id: string
  name: string
  email: string
  phone?: string
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  createdAt: string
}

// Mock in-memory DB with localStorage persistence
const KEY = 'mock_db_leads'
function load(): Lead[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
function save(leads: Lead[]) {
  localStorage.setItem(KEY, JSON.stringify(leads))
}

export const leadsApi = {
  async list(): Promise<Lead[]> {
    await delay(400)
    return load()
  },
  async create(payload: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
    await delay(300)
    const lead: Lead = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...payload }
    const data = load()
    data.unshift(lead)
    save(data)
    return lead
  },
  async update(id: string, updates: Partial<Lead>): Promise<Lead> {
    await delay(300)
    const data = load()
    const idx = data.findIndex(l => l.id === id)
    if (idx === -1) throw new Error('Lead not found')
    data[idx] = { ...data[idx], ...updates }
    save(data)
    return data[idx]
  },
  async remove(id: string) {
    await delay(200)
    const data = load().filter(l => l.id !== id)
    save(data)
  }
}

function delay(ms: number) { return new Promise(res => setTimeout(res, ms)) }
