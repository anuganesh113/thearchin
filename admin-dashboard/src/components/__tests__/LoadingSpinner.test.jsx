import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders loading spinner', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    expect(screen.getByRole('status').firstChild).toHaveClass('w-4')

    rerender(<LoadingSpinner size="md" />)
    expect(screen.getByRole('status').firstChild).toHaveClass('w-8')

    rerender(<LoadingSpinner size="lg" />)
    expect(screen.getByRole('status').firstChild).toHaveClass('w-12')
  })

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has accessible label', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
