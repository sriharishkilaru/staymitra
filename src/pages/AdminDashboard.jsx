import { useState } from 'react';
import {
  LayoutDashboard, Building2, Users2, BookOpen, IndianRupee,
  Globe, Settings, LogOut, Bell, Home, Check, X, TrendingUp,
  CheckCircle, AlertCircle, Eye, EyeOff, Lock, User, Shield,
} from 'lucide-react';
import StatusPill from '../components/ui/StatusPill';
import { PROPERTIES, PENDING_PROPERTIES } from '../data/properties';
import { MOCK_USERS, MOCK_OWNERS } from '../data/users';
import { MOCK_BOOKINGS } from '../data/bookings';
import { T } from '../tokens';

// ============================================================
//  🔐 CHANGE THESE TO YOUR OWN CREDENTIALS
// ============================================================
const ADMIN_USERNAME = 'staymitra_admin';
const ADMIN_PASSWORD = 'Stay@2024#Mitra';
// ============================================================

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
  { id: 'properties', label: 'Properties', icon: <Building2 size={18} /> },
  { id: 'users',      label: 'Users',      icon: <Users2 size={18} /> },
  { id: 'owners',     label: 'Owners',     icon: <Home size={18} /> },
  { id: 'bookings',   label: 'Bookings',   icon: <BookOpen size={18} /> },
  { id: 'payments',   label: 'Payments',   icon: <IndianRupee size={18} /> },
];

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 999,
      background: toast.type === 'error' ? T.redLight : T.greenLight,
      color: toast.type === 'error' ? T.red : T.green,
      padding: '14px 20px', borderRadius: 16, fontSize: 14, fontWeight: 600,
      boxShadow: '0 10px 40px rgba(0,0,0,0.13)',
      display: 'flex', alignItems: 'center', gap: 9, maxWidth: 360,
      border: `1px solid ${toast.type === 'error' ? '#fecaca' : T.greenLight}`,
      animation: 'fadeUp 0.3s ease',
    }}>
      {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
      {toast.msg}
    </div>
  );
}

// ============================================================
//  ADMIN LOGIN SCREEN
// ============================================================
function AdminLogin({ onSuccess }) {
  const [username,    setUsername]    = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [error,       setError]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [attempts,    setAttempts]    = useState(0);
  const [locked,      setLocked]      = useState(false);

  const handleLogin = () => {
    if (locked) return;
    setError('');

    if (!username.trim()) { setError('Please enter your username.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }

    setLoading(true);
    // Simulate a tiny delay for realism
    setTimeout(() => {
      setLoading(false);
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onSuccess();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 5) {
          setLocked(true);
          setError('Too many failed attempts. Access locked for this session.');
        } else {
          setError(`Invalid username or password. (${5 - newAttempts} attempts remaining)`);
        }
        setPassword('');
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(145deg, ${T.charcoal} 0%, #0f1a14 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, position: 'relative', overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${T.green}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${T.amber}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(255,254,249,0.04)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 28,
        padding: '52px 48px',
        width: '100%', maxWidth: 440,
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
            boxShadow: `0 12px 40px ${T.green}55`,
          }}>
            <Shield size={30} color="white" strokeWidth={1.8} />
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26, fontWeight: 700, color: 'white', marginBottom: 6,
          }}>
            Admin Access
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
            stay<span style={{ color: T.greenLight }}>मित्र</span> — Restricted Area
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(220,74,74,0.15)',
            border: '1px solid rgba(220,74,74,0.3)',
            color: '#f87171',
            borderRadius: 12, padding: '11px 14px',
            fontSize: 13, marginBottom: 22,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {/* Locked banner */}
        {locked && (
          <div style={{
            background: 'rgba(220,74,74,0.1)',
            border: '1px solid rgba(220,74,74,0.25)',
            color: '#f87171',
            borderRadius: 12, padding: '16px',
            fontSize: 13, marginBottom: 22, textAlign: 'center',
          }}>
            <Lock size={20} style={{ display: 'block', margin: '0 auto 8px' }} />
            Access locked due to too many failed attempts.<br />
            Please refresh the page to try again.
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: 18 }}>
          <label style={{
            fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase', letterSpacing: '1px',
            display: 'block', marginBottom: 9,
          }}>Username</label>
          <div style={{ position: 'relative' }}>
            <User size={16} color="rgba(255,255,255,0.3)"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              placeholder="Enter admin username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              disabled={locked}
              style={{
                width: '100%', border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 12, padding: '12px 14px 12px 42px',
                fontSize: 14, color: 'white',
                fontFamily: "'DM Sans', sans-serif",
                outline: 'none',
                transition: 'border-color 0.2s',
                opacity: locked ? 0.5 : 1,
              }}
              onFocus={e => e.target.style.borderColor = T.green}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 32 }}>
          <label style={{
            fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase', letterSpacing: '1px',
            display: 'block', marginBottom: 9,
          }}>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} color="rgba(255,255,255,0.3)"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              disabled={locked}
              style={{
                width: '100%', border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 12, padding: '12px 46px 12px 42px',
                fontSize: 14, color: 'white',
                fontFamily: "'DM Sans', sans-serif",
                outline: 'none',
                transition: 'border-color 0.2s',
                opacity: locked ? 0.5 : 1,
              }}
              onFocus={e => e.target.style.borderColor = T.green}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <button
              onClick={() => setShowPass(s => !s)}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.35)', padding: 0,
              }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading || locked}
          style={{
            width: '100%', padding: '14px',
            background: locked
              ? 'rgba(255,255,255,0.08)'
              : `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
            color: locked ? 'rgba(255,255,255,0.3)' : 'white',
            border: 'none', borderRadius: 14, cursor: locked ? 'not-allowed' : 'pointer',
            fontSize: 16, fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            transition: 'opacity 0.2s, transform 0.15s',
            boxShadow: locked ? 'none' : `0 8px 28px ${T.green}55`,
            opacity: loading ? 0.75 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
          onMouseEnter={e => { if (!locked && !loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {loading ? (
            <>
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '2.5px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                display: 'inline-block',
                animation: 'spin 0.7s linear infinite',
              }} />
              Verifying…
            </>
          ) : locked ? (
            <><Lock size={16} /> Locked</>
          ) : (
            'Sign In to Admin'
          )}
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 24 }}>
          Unauthorised access is strictly prohibited.
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ============================================================
//  MAIN ADMIN DASHBOARD
// ============================================================
export default function AdminDashboard({ setPage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tab,       setTab]       = useState('dashboard');
  const [allProps,  setAllProps]  = useState([...PROPERTIES, ...PENDING_PROPERTIES]);
  const [users,     setUsers]     = useState(MOCK_USERS);
  const [owners,    setOwners]    = useState(MOCK_OWNERS);
  const [bookings]                = useState(MOCK_BOOKINGS);
  const [toast,     setToast]     = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTab('dashboard');
    setPage('home');
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  const approveProperty = (id) => {
    setAllProps(p => p.map(x => x.id === id ? { ...x, status: 'approved', verified: true } : x));
    showToast('Property approved and listed! ✓');
  };
  const rejectProperty = (id) => {
    setAllProps(p => p.filter(x => x.id !== id));
    showToast('Property rejected and removed.', 'error');
  };
  const removeUser = (id) => {
    setUsers(u => u.filter(x => x.id !== id));
    showToast('User removed.');
  };
  const approveOwner = (id) => {
    setOwners(o => o.map(x => x.id === id ? { ...x, status: 'verified' } : x));
    showToast('Owner verified! ✓');
  };
  const rejectOwner = (id) => {
    setOwners(o => o.filter(x => x.id !== id));
    showToast('Owner request rejected.', 'error');
  };

  const pending      = allProps.filter(p => p.status === 'pending');
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((s, b) => s + b.total, 0);

  const STATS = [
    { label: 'Total Users',    val: users.length,    icon: <Users2 size={22} color={T.green} />,   trend: '+12 this week',  bg: T.greenLight },
    { label: 'Properties',     val: allProps.length, icon: <Building2 size={22} color={T.amber} />, trend: `${pending.length} pending`, bg: T.amberLight },
    { label: 'Total Bookings', val: bookings.length, icon: <BookOpen size={22} color={T.indigo} />, trend: '+5 today',       bg: T.indigoLight },
    { label: 'Revenue',        val: `₹${(totalRevenue / 1000).toFixed(0)}K`, icon: <IndianRupee size={22} color={T.emerald} />, trend: '+18% this month', bg: T.emeraldLight },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f3' }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 248, background: T.white,
        borderRight: `1px solid ${T.border}`,
        padding: '24px 14px',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        flexShrink: 0, overflowY: 'auto',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, padding: '0 4px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Home size={17} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: T.charcoal }}>
              stay<span style={{ color: T.green }}>मित्र</span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 800, color: T.grayLight, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 1 }}>
              Admin Panel
            </div>
          </div>
        </div>

        <p style={{ fontSize: 10, fontWeight: 800, color: T.grayLight, textTransform: 'uppercase', letterSpacing: '1.5px', padding: '0 8px', marginBottom: 8 }}>
          Main Menu
        </p>

        <nav style={{ flex: 1 }}>
          {NAV.map(n => (
            <div
              key={n.id}
              className={`admin-nav-item ${tab === n.id ? 'active' : ''}`}
              onClick={() => setTab(n.id)}
            >
              {n.icon}
              <span>{n.label}</span>
              {n.id === 'properties' && pending.length > 0 && (
                <span style={{
                  marginLeft: 'auto', background: T.amber, color: 'white',
                  fontSize: 10, fontWeight: 800, width: 20, height: 20,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{pending.length}</span>
              )}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
          <div className="admin-nav-item" onClick={() => setPage('home')}>
            <Globe size={18} /><span>View Website</span>
          </div>
          <div className="admin-nav-item">
            <Settings size={18} /><span>Settings</span>
          </div>
          <div
            className="admin-nav-item"
            onClick={handleLogout}
            style={{ color: T.red }}
            onMouseEnter={e => e.currentTarget.style.background = T.redLight}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={18} color={T.red} /><span>Logout</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflow: 'auto' }}>

        {/* Top bar */}
        <div style={{
          background: T.white, borderBottom: `1px solid ${T.border}`,
          padding: '0 32px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', height: 68,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: T.charcoal, textTransform: 'capitalize' }}>
            {tab === 'dashboard' ? 'Dashboard Overview' : tab}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} color={T.gray} />
              {pending.length > 0 && (
                <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderRadius: '50%', background: T.amber }} />
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, color: 'white', fontWeight: 700,
              }}>A</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.charcoal }}>Admin</div>
                <div style={{ fontSize: 11, color: T.grayLight }}>Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 32 }}>

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div>
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 28 }}>
                {STATS.map((s, i) => (
                  <div key={i} className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: T.charcoal, marginBottom: 4 }}>{s.val}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.gray, marginBottom: 8 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: T.green, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <TrendingUp size={12} strokeWidth={2.5} /> {s.trend}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Recent bookings */}
                <div style={{ background: T.white, borderRadius: 20, padding: 24, border: `1px solid ${T.border}` }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: T.charcoal, marginBottom: 20 }}>Recent Bookings</h3>
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${T.border}` }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.charcoal }}>{b.guest}</div>
                        <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{b.property} · {b.nights}n</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <StatusPill status={b.status} />
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.green, marginTop: 4 }}>₹{b.total.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pending approvals */}
                <div style={{ background: T.white, borderRadius: 20, padding: 24, border: `1px solid ${T.border}` }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: T.charcoal, marginBottom: 20 }}>
                    Pending Approvals
                    {pending.length > 0 && (
                      <span style={{ background: T.amber, color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, marginLeft: 8 }}>
                        {pending.length}
                      </span>
                    )}
                  </h3>
                  {pending.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '28px 0', color: T.grayLight }}>
                      <CheckCircle size={36} color={T.greenLight} style={{ marginBottom: 10 }} />
                      <p style={{ fontSize: 14 }}>All caught up!</p>
                    </div>
                  ) : pending.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <img src={p.img} alt={p.title} style={{ width: 46, height: 46, borderRadius: 10, objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.charcoal, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                          <div style={{ fontSize: 11, color: T.gray }}>{p.loc}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 7 }}>
                        <button onClick={() => approveProperty(p.id)} style={{ width: 30, height: 30, borderRadius: 8, background: T.greenLight, border: 'none', cursor: 'pointer', color: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={14} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => rejectProperty(p.id)} style={{ width: 30, height: 30, borderRadius: 8, background: T.redLight, border: 'none', cursor: 'pointer', color: T.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PROPERTIES ── */}
          {tab === 'properties' && (
            <div>
              <p style={{ fontSize: 14, color: T.gray, marginBottom: 22 }}>{allProps.length} total · {pending.length} pending review</p>
              <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, overflow: 'auto' }}>
                <table className="data-table">
                  <thead><tr>
                    {['Property','Owner','Location','Price / Night','Type','Status','Actions'].map(h => <th key={h}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {allProps.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img src={p.img} alt={p.title} style={{ width: 46, height: 46, borderRadius: 10, objectFit: 'cover' }} />
                            <div style={{ fontSize: 14, fontWeight: 600, color: T.charcoal, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                          </div>
                        </td>
                        <td style={{ color: T.gray }}>{p.owner}</td>
                        <td style={{ color: T.gray, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.loc}</td>
                        <td><span style={{ fontWeight: 700, color: T.green }}>₹{p.price.toLocaleString()}</span></td>
                        <td style={{ color: T.gray, textTransform: 'capitalize' }}>{p.type}</td>
                        <td><StatusPill status={p.status} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: 7 }}>
                            {p.status === 'pending' && (
                              <button onClick={() => approveProperty(p.id)} style={{ padding: '5px 12px', borderRadius: 8, background: T.greenLight, border: 'none', cursor: 'pointer', color: T.green, fontSize: 12, fontWeight: 700 }}>Approve</button>
                            )}
                            <button onClick={() => rejectProperty(p.id)} style={{ padding: '5px 12px', borderRadius: 8, background: T.redLight, border: 'none', cursor: 'pointer', color: T.red, fontSize: 12, fontWeight: 700 }}>Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {tab === 'users' && (
            <div>
              <p style={{ fontSize: 14, color: T.gray, marginBottom: 22 }}>{users.length} registered users</p>
              <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, overflow: 'auto' }}>
                <table className="data-table">
                  <thead><tr>
                    {['User','Email','Phone','Joined','Bookings','Status','Action'].map(h => <th key={h}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{u.name[0]}</div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: T.charcoal }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ color: T.gray }}>{u.email}</td>
                        <td style={{ color: T.gray }}>{u.phone}</td>
                        <td style={{ color: T.gray }}>{u.joined}</td>
                        <td style={{ fontWeight: 700, textAlign: 'center' }}>{u.bookings}</td>
                        <td><StatusPill status={u.status} /></td>
                        <td>
                          <button onClick={() => removeUser(u.id)} style={{ padding: '5px 12px', borderRadius: 8, background: T.redLight, border: 'none', cursor: 'pointer', color: T.red, fontSize: 12, fontWeight: 700 }}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── OWNERS ── */}
          {tab === 'owners' && (
            <div>
              <p style={{ fontSize: 14, color: T.gray, marginBottom: 22 }}>{owners.length} owner requests</p>
              <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, overflow: 'auto' }}>
                <table className="data-table">
                  <thead><tr>
                    {['Owner','Email','Phone','Properties','Joined','Status','Actions'].map(h => <th key={h}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {owners.map(o => (
                      <tr key={o.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${T.amber}, #a3714a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{o.name[0]}</div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: T.charcoal }}>{o.name}</span>
                          </div>
                        </td>
                        <td style={{ color: T.gray }}>{o.email}</td>
                        <td style={{ color: T.gray }}>{o.phone}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{o.properties}</td>
                        <td style={{ color: T.gray }}>{o.joined}</td>
                        <td><StatusPill status={o.status} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: 7 }}>
                            {o.status === 'pending' && (
                              <button onClick={() => approveOwner(o.id)} style={{ padding: '5px 12px', borderRadius: 8, background: T.greenLight, border: 'none', cursor: 'pointer', color: T.green, fontSize: 12, fontWeight: 700 }}>Approve</button>
                            )}
                            <button onClick={() => rejectOwner(o.id)} style={{ padding: '5px 12px', borderRadius: 8, background: T.redLight, border: 'none', cursor: 'pointer', color: T.red, fontSize: 12, fontWeight: 700 }}>Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {tab === 'bookings' && (
            <div>
              <p style={{ fontSize: 14, color: T.gray, marginBottom: 22 }}>{bookings.length} total bookings</p>
              <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, overflow: 'auto' }}>
                <table className="data-table">
                  <thead><tr>
                    {['Guest','Property','Dates','Nights','Guests','Total','Status'].map(h => <th key={h}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 600 }}>{b.guest}</td>
                        <td style={{ color: T.gray, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.property}</td>
                        <td style={{ color: T.gray, whiteSpace: 'nowrap' }}>{b.checkIn} → {b.checkOut}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{b.nights}</td>
                        <td style={{ textAlign: 'center' }}>{b.guests}</td>
                        <td><span style={{ fontWeight: 800, color: T.green }}>₹{b.total.toLocaleString()}</span></td>
                        <td><StatusPill status={b.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PAYMENTS ── */}
          {tab === 'payments' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 28 }}>
                {[
                  { label: 'Total Revenue',  val: `₹${totalRevenue.toLocaleString()}`, color: T.green,  bg: T.greenLight },
                  { label: 'This Month',      val: '₹48,200',                           color: T.amber,  bg: T.amberLight },
                  { label: 'Pending Payouts', val: '₹12,400',                           color: T.indigo, bg: T.indigoLight },
                ].map(s => (
                  <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: s.color, marginBottom: 8 }}>{s.val}</div>
                    <div style={{ fontSize: 14, color: T.gray }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: T.white, borderRadius: 20, border: `1px solid ${T.border}`, overflow: 'auto' }}>
                <table className="data-table">
                  <thead><tr>
                    {['Booking ID','Guest','Property','Date','Method','Amount','Status'].map(h => <th key={h}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id}>
                        <td style={{ color: T.green, fontWeight: 700 }}>SM-{String(b.id).padStart(4,'0')}</td>
                        <td style={{ fontWeight: 600 }}>{b.guest}</td>
                        <td style={{ color: T.gray, maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.property}</td>
                        <td style={{ color: T.gray }}>{b.checkIn}</td>
                        <td><span style={{ background: T.beigeDeep, color: T.charcoal, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 8 }}>{b.method}</span></td>
                        <td style={{ fontWeight: 800, color: T.green }}>₹{b.total.toLocaleString()}</td>
                        <td><StatusPill status={b.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}