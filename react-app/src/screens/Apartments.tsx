// React import not required with jsx: 'react-jsx'

type Apartment = {
  id: string;
  area: string;
  rooms: number;
  price: number;
};

const apartments: Apartment[] = [
  { id: '15.06', area: '65.2 m²', rooms: 3, price: 168500 },
  { id: '12.02', area: '52.8 m²', rooms: 2, price: 129900 },
  { id: '05.10', area: '78.4 m²', rooms: 4, price: 219500 },
];

export default function Apartments() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif">Select Apartments</h1>
        <p className="text-slate-600">Browse featured floor plans with transparent details.</p>
      </header>

      <div className="hidden md:grid grid-cols-12 text-xs uppercase text-slate-500 tracking-widest">
        <div className="col-span-2">Room</div>
        <div className="col-span-3">Information</div>
        <div className="col-span-3">Features</div>
        <div className="col-span-2">Plan</div>
        <div className="col-span-2 text-right">Price</div>
      </div>

      <div className="rounded-xl border overflow-hidden divide-y">
        {apartments.map((a, idx) => (
          <details key={a.id} className="group">
            <summary className="grid cursor-pointer grid-cols-1 md:grid-cols-12 items-center gap-4 p-4 marker:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
              <div className="md:col-span-2 text-2xl font-serif">{a.id}</div>
              <div className="md:col-span-3">
                <div className="font-medium">{a.area}</div>
                <div className="text-sm text-slate-600">{a.rooms} rooms</div>
              </div>
              <div className="md:col-span-3 text-sm text-slate-600">Basic interior finishing · City view</div>
              <div className="md:col-span-2">
                <img src={`/assets/img/home5/apartments/plan${idx === 0 ? 1 : idx === 1 ? 2 : 3}.svg`} alt={`Plan ${a.id}`} className="h-16 w-16 object-contain" />
              </div>
              <div className="md:col-span-2 md:text-right">
                <div className="text-xl font-medium">${a.price.toLocaleString()}</div>
                <span className="mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs border text-slate-600 group-open:hidden">View details</span>
              </div>
            </summary>
            <div className="px-4 pb-6">
              <div className="grid gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-8 grid grid-cols-12 items-end gap-4">
                  <div className="col-span-2">
                    <img src="/assets/img/home5/apartments/floor.svg" alt="Floor" className="w-full" />
                  </div>
                  <div className="col-span-8">
                    <img src={`/assets/img/home5/apartments/plan${idx === 0 ? 1 : idx === 1 ? 2 : 3}.svg`} alt="Plan" className="w-full" />
                  </div>
                  <div className="col-span-2">
                    <img src="/assets/img/home5/apartments/dial.png" alt="Dial" className="w-full" />
                  </div>
                </div>
                <div className="md:col-span-4 md:ps-6">
                  <div className="rounded-xl border p-4">
                    <small className="text-slate-600">Mortgage from</small>
                    <div className="text-3xl font-serif">10.3%</div>
                    <div className="mt-4 flex gap-3">
                      <a href="#" className="inline-flex items-center rounded-full px-4 py-2 border hover:bg-slate-50">Download PDF</a>
                      <a href="#" className="inline-flex items-center rounded-full px-4 py-2 border bg-brand-700 text-white hover:bg-brand-800">Schedule a visit</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
