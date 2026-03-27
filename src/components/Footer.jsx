import { Home, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { T } from '../tokens';

const SOCIALS = [Instagram, Twitter, Facebook, Linkedin];

const COLS = [
  {
    title: 'Company',
    links: ['About Us', 'How It Works', 'Careers', 'Press Kit', 'Blog'],
  },
  {
    title: 'Support',
    links: ['Help Centre', 'Safety Info', 'Cancellation Policy', 'Contact Us', 'Report Issue'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'],
  },
];

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: T.charcoal, color: 'white', paddingTop: 68, paddingBottom: 32 }}>
      <div className="container">
        <div
          className="footer-grid"
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }}
        >
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Home size={19} color="white" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'white' }}>
                stay<span style={{ color: T.greenLight }}>मित्र</span>
              </span>
            </div>

            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, maxWidth: 280, marginBottom: 24 }}>
              <em>comfort comes with us.</em> A curated accommodation platform built on trust, affordability, and genuine warmth — across India.
            </p>

            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map((Icon, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.09)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = T.green; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Icon size={16} color="white" />
                </div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.38)',
                textTransform: 'uppercase', letterSpacing: '1.8px', marginBottom: 20,
              }}>{col.title}</h4>
              {col.links.map(link => (
                <p key={link} style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.65)',
                  marginBottom: 11, cursor: 'pointer',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                >{link}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>
            © 2024 stayमित्र Technologies Pvt. Ltd. Made with ♡ in India.
          </p>
          <button
            onClick={() => setPage('admin')}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: 'none', color: 'rgba(255,255,255,0.38)',
              fontSize: 12, padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
          >
            ⚙ Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
}
