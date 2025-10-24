import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatCard from '../StatCard'
import { TrendingUp } from 'lucide-react'

describe('StatCard', () => {
  it('renders stat card with all props', () => {
    render(
      <StatCard
        title="Total Revenue"
        value="$45,231"
        change="+20.1%"
        icon={TrendingUp}
        trend="up"
        color="primary"
      />
    )

    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('$45,231')).toBeInTheDocument()
    expect(screen.getByText('+20.1%')).toBeInTheDocument()
  })

  it('renders with down trend', () => {
    render(
      <StatCard
        title="Test Metric"
        value="100"
        change="-5%"
        icon={TrendingUp}
        trend="down"
        color="danger"
      />
    )

    expect(screen.getByText('-5%')).toBeInTheDocument()
  })

  it('renders without change prop', () => {
    render(
      <StatCard
        title="Test Metric"
        value="100"
        icon={TrendingUp}
        color="primary"
      />
    )

    expect(screen.getByText('Test Metric')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })
})
