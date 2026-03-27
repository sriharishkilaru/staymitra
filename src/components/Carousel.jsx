import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CAROUSEL_SLIDES } from '../data/carousel';
import { T } from '../tokens';

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const go = (index) => {
    setCurrent((index + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % CAROUSEL_SLIDES.length), 4500);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % CAROUSEL_SLIDES.length), 4500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleNav = (dir) => { go(current + dir); resetTimer(); };

  return (
    <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', height: 460 }}>
      {/* Slides */}
      {CAROUSEL_SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0, zIndex: i === current ? 1 : 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          <img
            src={s.url}
            alt={s.label}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
          }} />

          {/* Label */}
          {i === current && (
            <div style={{
              position: 'absolute', bottom: 40, left: 44, zIndex: 2,
              animation: 'fadeUp 0.7s cubic-bezier(.22,1,.36,1)',
            }}>
              <span style={{
                display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.75)',
                textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: 6,
              }}>{s.sublabel}</span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 38, fontWeight: 700, color: 'white', lineHeight: 1.1,
              }}>{s.label}</h3>
            </div>
          )}
        </div>
      ))}

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.2)', zIndex: 10,
      }}>
        <div style={{
          height: '100%', background: 'white',
          width: `${((current + 1) / CAROUSEL_SLIDES.length) * 100}%`,
          transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Arrows */}
      {[
        { dir: -1, side: 'left', icon: <ChevronLeft size={20} color={T.charcoal} /> },
        { dir:  1, side: 'right', icon: <ChevronRight size={20} color={T.charcoal} /> },
      ].map(btn => (
        <button
          key={btn.side}
          onClick={() => handleNav(btn.dir)}
          style={{
            position: 'absolute', [btn.side]: 18, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
            border: 'none', cursor: 'pointer', zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
        >
          {btn.icon}
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{
        position: 'absolute', bottom: 20, right: 24, zIndex: 5,
        display: 'flex', gap: 7,
      }}>
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { go(i); resetTimer(); }}
            style={{
              width: i === current ? 24 : 8, height: 8,
              borderRadius: 4,
              background: i === current ? 'white' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.35s ease, background 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: 'absolute', top: 20, right: 24, zIndex: 5,
        background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
        padding: '4px 12px', borderRadius: 20,
        fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
      }}>
        {current + 1} / {CAROUSEL_SLIDES.length}
      </div>
    </div>
  );
}
