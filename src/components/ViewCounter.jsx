import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { T } from '../tokens';

const STATS = [
  { val: '6,200+', label: 'Verified Properties' },
  { val: '48+',    label: 'Cities Covered' },
  { val: '1.2L+',  label: 'Happy Guests' },
];

export default function ViewCounter() {
  const [count, setCount] = useState(12000);
  const TARGET = 12847;

  useEffect(() => {
    const start    = 12000;
    const duration = 2200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (TARGET - start) * ease));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => requestAnimationFrame(tick), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenDark} 100%)`,
      borderRadius: 24, padding: '36px 44px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: 28,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: -30, bottom: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

      {/* Live counter */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', animation: 'pulseGlow 1.8s infinite' }} />
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500 }}>
            Live activity right now
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 54, fontWeight: 700, color: 'white', letterSpacing: '-1.5px',
            lineHeight: 1,
          }}>
            {count.toLocaleString()}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, fontWeight: 500 }}>
            people exploring stays
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: 'white', lineHeight: 1 }}>
              {s.val}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 5, fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
