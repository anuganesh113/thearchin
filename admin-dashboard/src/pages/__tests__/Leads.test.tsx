import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LeadsTable } from '../../features/leads/LeadsTable'

function wrapper(ui: React.ReactElement) {
  const qc = new QueryClient()
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>)
}

it('renders empty state', async () => {
  localStorage.setItem('mock_db_leads', '[]')
  wrapper(<LeadsTable />)
  expect(await screen.findByText(/No leads yet/i)).toBeInTheDocument()
})
