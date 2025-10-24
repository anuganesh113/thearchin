import React from 'react'
import { twMerge } from 'tailwind-merge'

export function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={twMerge('relative z-10 w-full max-w-lg rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-card')}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
