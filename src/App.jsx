import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import HostPage from './pages/HostPage';
import AdminDashboard from './pages/AdminDashboard';
import { PROPERTIES } from './data/properties';
import { supabase } from './lib/supabase';

supabase.from('properties').select('count').then(({ data, error }) => {
  if (error) console.error('❌ Supabase NOT connected:', error.message);
  else console.log('✅ Supabase IS connected!', data);
});

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]);

  const isAdmin = page === 'admin';
  const hideLayout = ['login', 'signup', 'admin'].includes(page);

  const navigate = (p) => {
    setPage(p);
    if (!['payment', 'property'].includes(p)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hideLayout && (
        <Header page={page} setPage={navigate} />
      )}

      <main style={{ flex: 1 }}>
        {page === 'home' && (
          <HomePage
            setPage={navigate}
            setSelectedProperty={setSelectedProperty}
          />
        )}
        {page === 'property' && (
          <PropertyDetailPage
            property={selectedProperty}
            setPage={navigate}
          />
        )}
        {page === 'login' && (
          <LoginPage setPage={navigate} />
        )}
        {page === 'signup' && (
          <SignupPage setPage={navigate} />
        )}
        {page === 'payment' && (
          <PaymentPage
            property={selectedProperty}
            setPage={navigate}
          />
        )}
        {page === 'host' && (
          <HostPage setPage={navigate} />
        )}
        {page === 'admin' && (
          <AdminDashboard setPage={navigate} />
        )}
      </main>

      {!isAdmin && !['login', 'signup'].includes(page) && (
        <Footer setPage={navigate} />
      )}
    </div>
  );
}
