// React import not required with jsx: 'react-jsx'

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-4">
          <p className="uppercase tracking-widest text-brand-600 text-sm">The new highlight in the city</p>
          <h1 className="text-4xl md:text-6xl font-serif">The Archin</h1>
          <p className="text-slate-600 max-w-prose">Premium class apartments with five-star hotel services in your home. Enjoy thoughtful amenities, timeless design, and seamless living.</p>
          <div className="flex gap-3">
            <a href="#apartments" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">Explore Apartments</a>
            <a href="#video" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 border border-slate-300 hover:bg-slate-50">Watch Video</a>
          </div>
        </div>
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card">
            <img
              src="/assets/img/home5/header2.jpg"
              alt="Modern residence hero"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section id="about" className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-serif">About</h2>
          <p className="mt-2 text-slate-600">Exclusive hospitality-inspired living. A thousand and one ways to treat yourself and the ones you love.</p>
        </div>
        <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-6 shadow-card">
            <h3 className="font-medium">Fitness, Pool and Spa</h3>
            <p className="mt-2 text-sm text-slate-600">Wellness amenities for everyday rejuvenation.</p>
          </div>
          <div className="rounded-xl border p-6 shadow-card">
            <h3 className="font-medium">Gastronomy</h3>
            <p className="mt-2 text-sm text-slate-600">On-premise dining and curated experiences.</p>
          </div>
          <div className="rounded-xl border p-6 shadow-card">
            <h3 className="font-medium">Entertainment</h3>
            <p className="mt-2 text-sm text-slate-600">Spaces to gather, celebrate, and unwind.</p>
          </div>
          <div className="rounded-xl border p-6 shadow-card">
            <h3 className="font-medium">Services</h3>
            <p className="mt-2 text-sm text-slate-600">Attentive staff and hotel-grade conveniences.</p>
          </div>
        </div>
      </section>

      <section id="numbers" className="grid gap-6 md:grid-cols-3">
        {[{n:5265,l:'Square meter areas'},{n:924,l:'Spacious & modern apartments'},{n:1264,l:'Car parking slots'}].map((it) => (
          <div key={it.l} className="rounded-xl border p-6 text-center">
            <div className="text-4xl font-serif">{it.n.toLocaleString()}</div>
            <div className="mt-2 text-slate-600">{it.l}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
