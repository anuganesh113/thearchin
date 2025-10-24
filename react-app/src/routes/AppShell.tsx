import React from 'react';
import { Outlet, ScrollRestoration, createRoutesFromElements, Route, Link, NavLink } from 'react-router-dom';
import { useUIStore } from '../store/ui';
import { ErrorBoundary } from 'react-error-boundary';

const LazyHome = React.lazy(() => import('../screens/Home'));
const LazyApartments = React.lazy(() => import('../screens/Apartments'));
const LazyLocation = React.lazy(() => import('../screens/Location'));
const LazyGallery = React.lazy(() => import('../screens/Gallery'));
const LazyBlog = React.lazy(() => import('../screens/Blog'));

function FallbackError() {
  return (
    <div role="alert" className="min-h-[60vh] grid place-items-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-slate-600">Please refresh the page and try again.</p>
      </div>
    </div>
  );
}

function Header() {
  const toggle = useUIStore((s) => s.toggleMobileMenu);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav aria-label="Main" className="container-responsive h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-xl">
            <span className="inline-block h-6 w-6 rounded bg-brand-600" aria-hidden />
            <span>Archin</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Home</NavLink>
          <NavLink to="/apartments" className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Apartments</NavLink>
          <NavLink to="/location" className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Location</NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Gallery</NavLink>
          <NavLink to="/blog" className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Blog</NavLink>
        </div>
        <div className="md:hidden">
          <button aria-label="Open menu" onClick={toggle} className="p-2 rounded hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-24">
      <div className="container-responsive py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-serif text-xl">Archin</div>
          <p className="mt-2 text-sm text-slate-600">Premium class apartments with five-star services.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-4">
          <a href="#apartments" className="text-slate-700 hover:text-brand-700">Apartments</a>
          <a href="#location" className="text-slate-700 hover:text-brand-700">Location</a>
          <a href="#gallery" className="text-slate-700 hover:text-brand-700">Gallery</a>
          <a href="#blog" className="text-slate-700 hover:text-brand-700">Blog</a>
        </nav>
        <div className="text-sm text-slate-600 md:text-right">© {new Date().getFullYear()} Archin. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function AppShell() {
  const isOpen = useUIStore((s) => s.mobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);
  return (
    <ErrorBoundary FallbackComponent={FallbackError}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isOpen}
        onClick={close}
      >
        <nav
          className={`absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl transition-transform duration-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-label="Mobile"
          onClick={(e) => e.stopPropagation()}
        >
          <button aria-label="Close menu" onClick={close} className="mb-6 p-2 rounded hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="space-y-4">
            <li><NavLink to="/" onClick={close} className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Home</NavLink></li>
            <li><NavLink to="/apartments" onClick={close} className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Apartments</NavLink></li>
            <li><NavLink to="/location" onClick={close} className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Location</NavLink></li>
            <li><NavLink to="/gallery" onClick={close} className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Gallery</NavLink></li>
            <li><NavLink to="/blog" onClick={close} className={({isActive}) => isActive ? 'text-brand-700 font-medium' : 'text-slate-700 hover:text-brand-700'}>Blog</NavLink></li>
          </ul>
        </nav>
      </div>
      <main id="main" className="container-responsive py-10">
        <React.Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
          <Outlet />
        </React.Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </ErrorBoundary>
  );
}

export const routes = createRoutesFromElements(
  <Route element={<AppShell />}>
    <Route index element={<LazyHome />} />
    <Route path="/apartments" element={<LazyApartments />} />
    <Route path="/location" element={<LazyLocation />} />
    <Route path="/gallery" element={<LazyGallery />} />
    <Route path="/blog" element={<LazyBlog />} />
  </Route>
);
