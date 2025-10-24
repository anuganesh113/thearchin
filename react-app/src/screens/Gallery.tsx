// React import not required with jsx: 'react-jsx'

export default function Gallery() {
  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-serif">Gallery</h1>
        <p className="text-slate-600">A curated selection of visuals.</p>
      </header>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" />
        ))}
      </div>
    </section>
  );
}
