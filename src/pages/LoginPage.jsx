import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Home, Shield, Tag, Award, AlertCircle } from 'lucide-react';
import { T } from '../tokens';
import { signIn } from '../lib/api';

export default function LoginPage({ setPage }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const validate = () => {
    if (!email.trim())        return 'Please enter your email address.';
    if (!email.includes('@')) return 'Please enter a valid email address.';
    if (!password)            return 'Please enter your password.';
    if (password.length < 6)  return 'Password must be at least 6 characters.';
    return '';
  };

  const handleLogin = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await signIn({ email, password });
      setPage('home');
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(e.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: T.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
      <div className="auth-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 920, width: '100%', borderRadius: 30, overflow: 'hidden', boxShadow: '0 32px 90px rgba(0,0,0,0.13)' }}>

        {/* Left panel */}
        <div className="hide-mobile" style={{ background: `linear-gradient(145deg, ${T.green} 0%, ${T.greenDark} 100%)`, padding: '52px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -50, top: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Home size={20} color="white" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'white' }}>stayमित्र</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: 'white', lineHeight: 1.25, marginBottom: 18 }}>
              Welcome back<br />to <em style={{ fontStyle: 'italic' }}>comfort.</em>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
              Your trusted companion for verified stays across India.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
            {[{ icon: <Shield size={18} />, label: 'Verified' }, { icon: <Tag size={18} />, label: 'Best Price' }, { icon: <Award size={18} />, label: 'Trusted' }].map(b => (
              <div key={b.label} style={{ background: 'rgba(255,255,255,0.13)', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: 'white', flex: 1 }}>
                {b.icon}
                <span style={{ fontSize: 11, fontWeight: 700 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ background: T.white, padding: '52px 48px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: T.charcoal, marginBottom: 6 }}>Sign in</h2>
          <p style={{ fontSize: 14, color: T.gray, marginBottom: 34 }}>
            Don't have an account?{' '}
            <button onClick={() => setPage('signup')} style={{ background: 'none', border: 'none', color: T.green, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Sign up free</button>
          </p>

          {error && (
            <div style={{ background: T.redLight, color: T.red, borderRadius: 11, padding: '11px 14px', fontSize: 14, marginBottom: 22, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={15} /> {error}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input className="input-field" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ paddingLeft: 42 }} />
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ paddingLeft: 42, paddingRight: 46 }} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.grayLight }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 30 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: T.green, fontWeight: 600 }}>Forgot password?</button>
          </div>

          <button className="btn-green" onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: 14, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 16px' }}>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ fontSize: 13, color: T.grayLight }}>or</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>

          <button onClick={() => setPage('admin')} style={{ width: '100%', padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 600, background: T.beigeCard, border: `1px solid ${T.border}`, cursor: 'pointer', color: T.gray, transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = T.beigeDeep}
            onMouseLeave={e => e.currentTarget.style.background = T.beigeCard}
          >
            🔐 Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}