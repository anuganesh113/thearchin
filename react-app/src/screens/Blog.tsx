// React import not required with jsx: 'react-jsx'

const posts = [
  { id: 1, title: 'Designing for Serene Living', excerpt: 'Principles behind calm, functional interiors.' },
  { id: 2, title: 'Amenities that Matter', excerpt: 'How to evaluate lifestyle features.' },
  { id: 3, title: 'Choosing the Right Floor Plan', excerpt: 'Aligning space with your routines.' },
];

export default function Blog() {
  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-serif">Blog</h1>
        <p className="text-slate-600">Insights and updates.</p>
      </header>
      <ul className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <li key={p.id} className="rounded-xl border p-6 bg-white shadow-card">
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
            <button className="mt-4 inline-flex items-center rounded-full px-4 py-2 border hover:bg-slate-50">Read more</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
