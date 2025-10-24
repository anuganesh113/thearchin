import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <p>Test Content</p>
      </Card>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <Card title="Test Title">
        <p>Content</p>
      </Card>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders with actions', () => {
    render(
      <Card
        title="Test"
        actions={<button>Action</button>}
      >
        <p>Content</p>
      </Card>
    )

    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Content</p>
      </Card>
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
