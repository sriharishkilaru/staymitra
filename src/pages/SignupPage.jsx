import { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Home, CheckCircle, ArrowRight } from 'lucide-react';
import { T } from '../tokens';
import { signUp } from '../lib/api';

export default function SignupPage({ setPage }) {
  const [form,     setForm]     = useState({ name: '', email: '', phone: '', password: '' });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())         e.name     = 'Full name is required.';
    if (!form.email.includes('@'))  e.email    = 'Please enter a valid email.';
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit number.';
    if (form.password.length < 8)  e.password = 'Minimum 8 characters.';
    return e;
  };

  const handleSignup = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    try {
      await signUp({ email: form.email, password: form.password, fullName: form.name, phone: form.phone });
      setSuccess(true);
    } catch (e) {
      setErrors({ email: e.message || 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={{ minHeight: '100vh', background: T.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: T.white, borderRadius: 28, padding: '52px 44px', maxWidth: 460, width: '100%', textAlign: 'center', boxShadow: '0 28px 72px rgba(0,0,0,0.09)' }}>
        <div className="anim-float" style={{ width: 80, height: 80, borderRadius: '50%', background: T.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <CheckCircle size={40} color={T.green} strokeWidth={2} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: T.charcoal, marginBottom: 12 }}>Welcome to stayमित्र!</h2>
        <p style={{ fontSize: 15, color: T.gray, marginBottom: 12, lineHeight: 1.75 }}>
          Account created for <strong style={{ color: T.charcoal }}>{form.name.split(' ')[0]}</strong>!
        </p>
        <p style={{ fontSize: 13, color: T.grayLight, marginBottom: 36 }}>
          Please check your email <strong>{form.email}</strong> to confirm your account before signing in.
        </p>
        <button className="btn-green" onClick={() => { setPage('login'); window.scrollTo({ top: 0 }); }} style={{ padding: '14px 36px', borderRadius: 13, fontSize: 15, fontWeight: 700 }}>
          Go to Login <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
        </button>
      </div>
    </div>
  );

  const FIELDS = [
    { key: 'name',     label: 'Full Name',       placeholder: 'Your full name',         type: 'text',  icon: <User size={16} color={T.grayLight} /> },
    { key: 'email',    label: 'Email Address',   placeholder: 'you@email.com',          type: 'email', icon: <Mail size={16} color={T.grayLight} /> },
    { key: 'phone',    label: 'Phone Number',    placeholder: '10-digit mobile number', type: 'tel',   icon: <Phone size={16} color={T.grayLight} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px', paddingTop: 96 }}>
      <div style={{ background: T.white, borderRadius: 30, padding: '52px 48px', maxWidth: 500, width: '100%', boxShadow: '0 32px 90px rgba(0,0,0,0.11)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Home size={18} color="white" />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: T.charcoal }}>
            stay<span style={{ color: T.green }}>मित्र</span>
          </span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: T.charcoal, marginTop: 18, marginBottom: 6 }}>Create your account</h2>
        <p style={{ fontSize: 14, color: T.gray, marginBottom: 34 }}>
          Already have an account?{' '}
          <button onClick={() => setPage('login')} style={{ background: 'none', border: 'none', color: T.green, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Sign in</button>
        </p>

        {FIELDS.map(f => (
          <div key={f.key} style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>{f.label}</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>{f.icon}</span>
              <input className={`input-field${errors[f.key] ? ' error' : ''}`} type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={set(f.key)} style={{ paddingLeft: 42 }} />
            </div>
            {errors[f.key] && <p style={{ fontSize: 12, color: T.red, marginTop: 5 }}>{errors[f.key]}</p>}
          </div>
        ))}

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input className={`input-field${errors.password ? ' error' : ''}`} type={showPass ? 'text' : 'password'} placeholder="Minimum 8 characters" value={form.password} onChange={set('password')} style={{ paddingLeft: 42, paddingRight: 46 }} />
            <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.grayLight }}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p style={{ fontSize: 12, color: T.red, marginTop: 5 }}>{errors.password}</p>}
        </div>

        <p style={{ fontSize: 12, color: T.grayLight, marginBottom: 26, lineHeight: 1.7 }}>
          By signing up you agree to stayमित्र's{' '}
          <span style={{ color: T.green, cursor: 'pointer', fontWeight: 600 }}>Terms</span> and{' '}
          <span style={{ color: T.green, cursor: 'pointer', fontWeight: 600 }}>Privacy Policy</span>.
        </p>

        <button className="btn-green" onClick={handleSignup} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: 14, fontSize: 16, fontWeight: 700 }}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </div>
    </div>
  );
}