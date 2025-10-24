// React import not needed for React 17+ JSX runtime

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-card">
        <p className="text-sm text-muted">Configure application preferences and integrations.</p>
      </div>
    </div>
  )
}
