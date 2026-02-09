import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './features/Login';
import { useEffect } from 'react';
import { useUIStore } from './store';

// Lazy load feature pages for performance (demonstrating code splitting)
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./features/Dashboard'));
const Analytics = lazy(() => import('./features/Analytics'));
const Team = lazy(() => import('./features/Team'));
const Settings = lazy(() => import('./features/Settings'));
const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-4">
    <h1 className="text-4xl font-bold">403 - Unauthorized</h1>
    <p>You do not have permission to view this page.</p>
  </div>
);

function App() {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    // Sync theme with document class for Tailwind's dark: mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/" element={
            <Suspense fallback={<div className="p-8 h-full animate-pulse bg-secondary rounded-xl" />}>
              <Dashboard />
            </Suspense>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute allowedRoles={['Supervisor', 'Admin']}>
              <Suspense fallback={<div className="p-8 h-full animate-pulse bg-secondary rounded-xl" />}>
                <Analytics />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/team" element={
            <ProtectedRoute allowedRoles={['Supervisor', 'Admin']}>
              <Suspense fallback={<div className="p-8 h-full animate-pulse bg-secondary rounded-xl" />}>
                <Team />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <Suspense fallback={<div className="p-8 h-full animate-pulse bg-secondary rounded-xl" />}>
              <Settings />
            </Suspense>
          } />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
