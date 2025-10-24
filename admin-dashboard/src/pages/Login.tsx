import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/'

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    localStorage.setItem('auth_token', 'mock')
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-dvh grid place-items-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-card">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" type="email" required className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="password">Password</label>
          <input id="password" type="password" required className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500" />
        </div>
        <button type="submit" className="w-full rounded-md bg-primary-600 px-3 py-2 text-white hover:bg-primary-700">Sign in</button>
        <p className="text-xs text-muted">Use any email and password to continue.</p>
      </form>
    </div>
  )
}
