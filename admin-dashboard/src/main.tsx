import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import './index.css'

const RootLayout = React.lazy(() => import('./ui/RootLayout'))
const Protected = React.lazy(() => import('./ui/Protected'))

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Leads = React.lazy(() => import('./pages/Leads'))
const Bookings = React.lazy(() => import('./pages/Bookings'))
const Properties = React.lazy(() => import('./pages/Properties'))
const Payments = React.lazy(() => import('./pages/Payments'))
const Users = React.lazy(() => import('./pages/Users'))
const Settings = React.lazy(() => import('./pages/Settings'))
const Login = React.lazy(() => import('./pages/Login'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<div className="p-6">Loading...</div>}>
        <Protected>
          <RootLayout />
        </Protected>
      </React.Suspense>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'leads', element: <Leads /> },
      { path: 'bookings', element: <Bookings /> },
      { path: 'properties', element: <Properties /> },
      { path: 'payments', element: <Payments /> },
      { path: 'users', element: <Users /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '/login', element: <Login /> },
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors expand={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
