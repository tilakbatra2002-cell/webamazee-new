import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/Layout';
import { PageLoader } from './components/ui';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { InvoicesPage } from './pages/InvoicesPage';
import { InvoiceEditorPage } from './pages/InvoiceEditorPage';
import { InvoiceViewPage } from './pages/InvoiceViewPage';
import { CustomersPage } from './pages/CustomersPage';
import { CustomerDetailPage } from './pages/CustomerDetailPage';
import { SettingsPage } from './pages/SettingsPage';

/** Everything behind the login wall renders inside the dashboard shell. */
function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageLoader label="Loading workspace…" />
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return (
    <SettingsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="invoices/new" element={<InvoiceEditorPage mode="create" />} />
          <Route path="invoices/:id" element={<InvoiceViewPage />} />
          <Route path="invoices/:id/edit" element={<InvoiceEditorPage mode="edit" />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/:id" element={<CustomerDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </SettingsProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ProtectedRoutes />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
