import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext'

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides auth context', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current).toHaveProperty('user')
    expect(result.current).toHaveProperty('login')
    expect(result.current).toHaveProperty('logout')
    expect(result.current).toHaveProperty('updateUser')
  })

  it('login sets user and stores in localStorage', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    await waitFor(() => {
      expect(result.current.user).toBeTruthy()
      expect(result.current.user.email).toBe('test@example.com')
      expect(localStorage.getItem('user')).toBeTruthy()
    })
  })

  it('logout clears user and localStorage', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    await waitFor(() => {
      expect(result.current.user).toBeTruthy()
    })

    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('updateUser updates user data', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })

    await waitFor(() => {
      expect(result.current.user).toBeTruthy()
    })

    act(() => {
      result.current.updateUser({ name: 'Updated Name' })
    })

    expect(result.current.user.name).toBe('Updated Name')
  })

  it('restores user from localStorage on mount', () => {
    const userData = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    }
    localStorage.setItem('user', JSON.stringify(userData))

    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })

    waitFor(() => {
      expect(result.current.user).toEqual(userData)
    })
  })
})
