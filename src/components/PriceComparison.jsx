import { Check, ArrowRight } from 'lucide-react';
import { PRICE_COMPARISON } from '../data/carousel';
import { T } from '../tokens';

export default function PriceComparison() {
  return (
    <section className="section-pad" style={{ background: T.beige }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: T.amber, textTransform: 'uppercase', letterSpacing: '2.5px' }}>
            Price Transparency
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: T.charcoal, marginTop: 10, lineHeight: 1.15 }}>
            Always the{' '}
            <em style={{ fontStyle: 'italic', color: T.green }}>best price.</em>
          </h2>
          <p style={{ color: T.gray, marginTop: 14, fontSize: 16, maxWidth: 480, margin: '14px auto 0', lineHeight: 1.7 }}>
            We compare so you don't have to. stayमित्र consistently offers the lowest verified rates — guaranteed.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 20, maxWidth: 920, margin: '0 auto',
          alignItems: 'end',
        }}>
          {PRICE_COMPARISON.map((d, i) => (
            <div
              key={i}
              className={d.best ? '' : 'card-hover'}
              style={{
                borderRadius: 22, padding: d.best ? '32px 26px' : '26px 22px',
                background: d.best
                  ? `linear-gradient(145deg, ${T.green} 0%, ${T.greenDark} 100%)`
                  : T.white,
                border: d.best ? 'none' : `1px solid ${T.border}`,
                boxShadow: d.best
                  ? '0 24px 60px rgba(58,102,71,0.30)'
                  : '0 2px 16px rgba(0,0,0,0.04)',
                position: 'relative',
                transform: d.best ? 'scale(1.05)' : 'none',
              }}
            >
              {/* Badge */}
              {d.best && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: T.amber, color: 'white',
                  fontSize: 11, fontWeight: 800,
                  padding: '5px 16px', borderRadius: 20,
                  letterSpacing: '0.5px', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(200,151,95,0.4)',
                }}>⭐ BEST PRICE</div>
              )}

              <p style={{
                fontSize: 14, fontWeight: 600,
                color: d.best ? 'rgba(255,255,255,0.85)' : T.gray,
                marginBottom: 16,
              }}>{d.name}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 14 }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 38, fontWeight: 700,
                  color: d.best ? 'white' : T.charcoal,
                }}>
                  ₹{d.price.toLocaleString()}
                </span>
                <span style={{ fontSize: 13, color: d.best ? 'rgba(255,255,255,0.65)' : T.gray }}>/night</span>
              </div>

              {d.best ? (
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Check size={14} strokeWidth={3} /> Save up to 30% vs others
                </p>
              ) : (
                <p style={{ fontSize: 13, color: T.red, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ArrowRight size={13} style={{ transform: 'rotate(-45deg)' }} />
                  ₹{(d.price - 1800).toLocaleString()} more per night
                </p>
              )}
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: T.grayLight, marginTop: 32 }}>
          * Sample comparison for a standard 2-bedroom home. Prices vary by property, location and season. Updated weekly.
        </p>
      </div>
    </section>
  );
}
