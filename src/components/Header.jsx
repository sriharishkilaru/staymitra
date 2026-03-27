import { useState, useEffect } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { T } from '../tokens';

export default function Header({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Homes',  action: () => setPage('home') },
    { label: 'Hotels', action: () => setPage('home') },
    { label: 'About',  action: () => setPage('about') },
  ];

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(250,246,239,0.97)' : 'rgba(250,246,239,0.82)',
        backdropFilter: 'blur(18px)',
        borderBottom: scrolled ? `1px solid ${T.border}` : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 70, gap: 32 }}>

          {/* Logo */}
          <button onClick={() => setPage('home')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 11,
              background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(58,102,71,0.3)',
            }}>
              <Home size={18} color="white" strokeWidth={2} />
            </div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 21, fontWeight: 700, color: T.charcoal, letterSpacing: '-0.3px',
            }}>
              stay<span style={{ color: T.green }}>मित्र</span>
            </span>
          </button>

          {/* Center Nav */}
          <nav className="hide-mobile" style={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'center' }}>
            {navLinks.map(n => (
              <button key={n.label} onClick={n.action} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 18px', borderRadius: 9,
                fontSize: 14, fontWeight: 500, color: T.gray,
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = T.green; e.currentTarget.style.background = T.greenPale; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.gray; e.currentTarget.style.background = 'transparent'; }}
              >{n.label}</button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hide-mobile" style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
            <button className="btn-outline" onClick={() => setPage('login')} style={{
              padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
            }}>Login</button>
            <button className="btn-green" onClick={() => setPage('signup')} style={{
              padding: '8px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            }}>Sign Up</button>
            <button className="btn-amber" onClick={() => setPage('host')} style={{
              padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            }}>Become Host</button>
          </div>

          {/* Mobile Hamburger */}
          <button className="show-mobile" onClick={() => setMobileOpen(true)} style={{
            background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', padding: 4,
          }}>
            <Menu size={24} color={T.charcoal} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              position: 'absolute', top: 0, right: 0,
              width: 290, height: '100%',
              background: T.white, padding: '24px 20px',
              animation: 'slideInRight 0.3s cubic-bezier(.22,1,.36,1)',
              display: 'flex', flexDirection: 'column', gap: 0,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: T.charcoal }}>
                stay<span style={{ color: T.green }}>मित्र</span>
              </span>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} color={T.gray} />
              </button>
            </div>

            {[
              { label: 'Homes', page: 'home' },
              { label: 'Hotels', page: 'home' },
              { label: 'About', page: 'home' },
              { label: 'Login', page: 'login' },
              { label: 'Sign Up', page: 'signup' },
              { label: 'Become a Host', page: 'host' },
            ].map(n => (
              <button key={n.label}
                onClick={() => { setPage(n.page); setMobileOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '15px 0', fontSize: 16, fontWeight: 500, color: T.charcoal,
                  borderBottom: `1px solid ${T.border}`,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = T.green}
                onMouseLeave={e => e.currentTarget.style.color = T.charcoal}
              >{n.label}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
