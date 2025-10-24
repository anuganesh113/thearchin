import { create } from 'zustand'

interface ThemeState {
  dark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  dark: false,
  toggle: () => {
    const next = !get().dark
    set({ dark: next })
    const root = document.documentElement
    if (next) root.classList.add('dark')
    else root.classList.remove('dark')
  },
}))
