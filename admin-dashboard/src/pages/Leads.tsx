import React from 'react'
import { LeadsTable } from '../features/leads/LeadsTable'
import { NewLeadModal } from '../features/leads/NewLeadModal'
import { Button } from '../ui/components/Button'

export default function Leads() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <Button onClick={() => setOpen(true)}>New Lead</Button>
      </div>
      <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-card">
        <LeadsTable />
      </div>
      <NewLeadModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
