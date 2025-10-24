// React import not required with jsx: 'react-jsx'

const points = [
  { minutes: 5, label: 'Manhattan Center Park' },
  { minutes: 15, label: 'Walmart Mall' },
  { minutes: 20, label: 'Mestson Lake' },
  { minutes: 17, label: 'Orlando Museum of Art' },
];

export default function Location() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif">Prime Location</h1>
        <p className="text-slate-600">Everyday essentials within minutes.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {points.map((p) => (
          <div key={p.label} className="rounded-xl border p-6 bg-white shadow-card">
            <div className="text-4xl font-serif text-brand-700">{p.minutes}</div>
            <div className="uppercase tracking-widest text-xs mt-1 text-slate-500">minutes</div>
            <h3 className="mt-3 font-medium">{p.label}</h3>
          </div>
        ))}
      </div>

      <div className="aspect-[16/9] rounded-2xl bg-slate-200 grid place-items-center text-slate-600">
        Interactive map coming soon
      </div>
    </section>
  );
}
