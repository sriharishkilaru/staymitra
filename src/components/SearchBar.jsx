import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Users, ChevronDown, Calendar } from 'lucide-react';
import { T } from '../tokens';

const ORBS = [
  { w: 320, h: 320, top: '-18%', left: '-6%',  dur: 14, delay: 0,   opacity: 0.10 },
  { w: 240, h: 240, top: '30%',  left: '55%',  dur: 18, delay: 3,   opacity: 0.08 },
  { w: 180, h: 180, top: '60%',  left: '20%',  dur: 12, delay: 1.5, opacity: 0.07 },
  { w: 140, h: 140, top: '-10%', left: '80%',  dur: 20, delay: 5,   opacity: 0.06 },
  { w: 100, h: 100, top: '70%',  left: '70%',  dur: 10, delay: 2,   opacity: 0.09 },
];

const DOTS = Array.from({ length: 18 }, (_, i) => ({
  x: Math.round(5 + (i * 73) % 90),
  y: Math.round(5 + (i * 47) % 85),
  r: 1.5 + (i % 3) * 0.8,
  dur: 6 + (i % 5) * 2.2,
  delay: (i * 0.4) % 4,
}));

function BackgroundCanvas() {
  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-22px) scale(1.04); }
        }
        @keyframes dotDrift {
          0%   { transform: translate(0,0) scale(1);         opacity: 0.55; }
          33%  { transform: translate(6px,-8px) scale(1.15); opacity: 0.9;  }
          66%  { transform: translate(-5px,5px) scale(0.9);  opacity: 0.4;  }
          100% { transform: translate(0,0) scale(1);         opacity: 0.55; }
        }
        @keyframes ringPulse {
          0%,100% { opacity:0.06; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity:0.14; transform: translate(-50%,-50%) scale(1.07); }
        }
        @keyframes searchBarIn {
          from { opacity:0; transform:translateY(18px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes dropdownIn {
          from { opacity:0; transform:translateY(8px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .sb-date-input::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .sb-where-input::placeholder { color: #9ca3af; }
        .sb-where-input:focus { outline: none; }
        .sb-search-btn {
          background: linear-gradient(135deg, #3a6647 0%, #2a5035 50%, #3a6647 100%);
          background-size: 200% auto;
          transition: background-position 0.6s ease, transform 0.18s ease, box-shadow 0.2s ease;
        }
        .sb-search-btn:hover {
          background-position: right center;
          transform: scale(1.07) !important;
          box-shadow: 0 10px 32px rgba(58,102,71,0.50) !important;
        }
        .sb-search-btn:active { transform: scale(0.96) !important; }
        .sb-section {
          position: relative;
          z-index: 1;
          border-radius: 16px;
          transition: background 0.22s ease, box-shadow 0.22s ease;
        }
        .sb-section:hover {
          background: linear-gradient(135deg, #f0f5f1 0%, rgba(240,245,241,0.5) 100%);
          box-shadow: inset 0 0 0 1.5px rgba(58,102,71,0.18);
        }
        .sb-section.active {
          background: linear-gradient(135deg, #f0f5f1 0%, rgba(240,245,241,0.5) 100%);
          box-shadow: inset 0 0 0 1.5px rgba(58,102,71,0.25);
        }
        .sb-section .top-accent {
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3a6647, transparent);
          border-radius: 99px;
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .sb-section:hover .top-accent,
        .sb-section.active .top-accent { opacity: 0.4; }
        .guest-minus:hover:not(:disabled) {
          border-color: #3a6647 !important;
          color: #3a6647 !important;
        }
        .guest-plus:hover {
          background: #2a5035 !important;
          transform: scale(1.1) !important;
        }
        @media (max-width: 860px) {
          .sb-card-inner { flex-direction: column !important; }
          .sb-card-inner .sb-divider { display: none !important; }
          .sb-card-inner .sb-section {
            border-bottom: 1px solid #e5ddd0;
            border-radius: 0 !important;
          }
          .sb-guests-wrapper { width: 100% !important; }
          .sb-card-inner > div:last-child {
            padding: 12px 16px !important;
            border-bottom: none !important;
          }
          .sb-card-inner > div:last-child button {
            width: 100% !important;
            height: 50px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>

      <div style={{
        position: 'absolute', inset: 0, borderRadius: 22,
        overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        {ORBS.map((o, i) => (
          <div key={i} style={{
            position: 'absolute', top: o.top, left: o.left,
            width: o.w, height: o.h, borderRadius: '50%',
            background: 'radial-gradient(circle, #3a6647 0%, transparent 70%)',
            opacity: o.opacity,
            animation: `orbFloat ${o.dur}s ease-in-out ${o.delay}s infinite`,
          }} />
        ))}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '108%', height: '200%', borderRadius: 28,
          border: '2px solid #3a6647', opacity: 0.08,
          animation: 'ringPulse 5s ease-in-out infinite',
        }} />
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          preserveAspectRatio="none"
        >
          {DOTS.map((d, i) => (
            <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r}
              fill="#3a6647" opacity={0.45}
              style={{ animation: `dotDrift ${d.dur}s ease-in-out ${d.delay}s infinite` }}
            />
          ))}
        </svg>
      </div>
    </>
  );
}

function Divider() {
  return (
    <div className="sb-divider" style={{
      width: 1, alignSelf: 'stretch', margin: '10px 0', flexShrink: 0,
      background: 'linear-gradient(to bottom, transparent, #e5ddd0, transparent)',
    }} />
  );
}

export default function SearchBar({ onSearch }) {
  const [where,         setWhere]         = useState('');
  const [checkIn,       setCheckIn]       = useState('');
  const [checkOut,      setCheckOut]      = useState('');
  const [adults,        setAdults]        = useState(2);
  const [children,      setChildren]      = useState(0);
  const [pets,          setPets]          = useState(0);
  const [showGuests,    setShowGuests]    = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const checkInRef   = useRef(null);
  const checkOutRef  = useRef(null);
  const whereRef     = useRef(null);
  const guestBtnRef  = useRef(null);
  const guestDropRef = useRef(null);

  const totalGuests = adults + children + pets;

  /* ── Close on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      const inBtn  = guestBtnRef.current  && guestBtnRef.current.contains(e.target);
      const inDrop = guestDropRef.current && guestDropRef.current.contains(e.target);
      if (!inBtn && !inDrop) {
        setShowGuests(false);
        if (activeSection === 'guests') setActiveSection(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [activeSection]);

  const openDate = (ref, section) => {
    setActiveSection(section);
    if (ref.current) {
      ref.current.focus();
      try { ref.current.showPicker(); } catch (_) {}
    }
  };

  const formatDate = (val) => {
    if (!val) return null;
    try {
      return new Date(val + 'T00:00:00').toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    } catch (_) { return val; }
  };

  const toggleGuests = (e) => {
    e.stopPropagation();
    setShowGuests(prev => !prev);
    setActiveSection(prev => prev === 'guests' ? null : 'guests');
  };

  const changeCount = (setter, current, min, delta) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    setter(Math.max(min, current + delta));
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: 24,
      padding: '4px',
      background: 'linear-gradient(135deg, rgba(58,102,71,0.09) 0%, rgba(200,151,95,0.05) 100%)',
      animation: 'searchBarIn 0.7s cubic-bezier(.22,1,.36,1) both',
    }}>
      <BackgroundCanvas />

      {/* ── CARD ── */}
      <div
        className="sb-card-inner"
        style={{
          position: 'relative', zIndex: 2,
          background: 'rgba(255,254,249,0.97)',
          borderRadius: 20,
          backdropFilter: 'blur(14px)',
          boxShadow: '0 24px 80px rgba(58,102,71,0.16), 0 2px 6px rgba(0,0,0,0.03)',
          border: '1px solid rgba(229,221,208,0.75)',
          display: 'flex', alignItems: 'stretch',
        }}
      >
        {/* WHERE */}
        <div
          className={`sb-section${activeSection === 'where' ? ' active' : ''}`}
          style={{ flex: '1.5', padding: '20px 26px', cursor: 'text' }}
          onClick={() => { setActiveSection('where'); whereRef.current?.focus(); }}
        >
          <div className="top-accent" />
          <p style={{ fontSize: 10, fontWeight: 800, color: '#3a6647', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 5 }}>
            <MapPin size={11} strokeWidth={3} color="#3a6647" /> Where
          </p>
          <input
            ref={whereRef}
            className="sb-where-input"
            placeholder="City, locality or property…"
            value={where}
            onChange={e => setWhere(e.target.value)}
            onFocus={() => setActiveSection('where')}
            onBlur={() => setActiveSection(null)}
            style={{
              border: 'none', background: 'transparent',
              fontSize: 14, color: '#1a1a1e',
              width: '100%', fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            }}
          />
        </div>

        <Divider />

        {/* CHECK IN */}
        <div
          className={`sb-section${activeSection === 'checkin' ? ' active' : ''}`}
          style={{ flex: '1', padding: '20px 22px', cursor: 'pointer' }}
          onClick={() => openDate(checkInRef, 'checkin')}
        >
          <div className="top-accent" />
          <p style={{ fontSize: 10, fontWeight: 800, color: '#3a6647', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 5, pointerEvents: 'none' }}>
            <Calendar size={11} strokeWidth={3} color="#3a6647" /> Check In
          </p>
          <div style={{ position: 'relative', pointerEvents: 'none' }}>
            <span style={{ fontSize: 14, display: 'block', fontWeight: checkIn ? 600 : 400, color: checkIn ? '#1a1a1e' : '#9ca3af', fontFamily: "'DM Sans', sans-serif" }}>
              {formatDate(checkIn) || 'dd-mm-yyyy'}
            </span>
            <input
              ref={checkInRef}
              type="date"
              className="sb-date-input"
              value={checkIn}
              onChange={e => { setCheckIn(e.target.value); setActiveSection(null); }}
              onBlur={() => setActiveSection(null)}
              style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', border: 'none', background: 'transparent', cursor: 'pointer', pointerEvents: 'all' }}
            />
          </div>
        </div>

        <Divider />

        {/* CHECK OUT */}
        <div
          className={`sb-section${activeSection === 'checkout' ? ' active' : ''}`}
          style={{ flex: '1', padding: '20px 22px', cursor: 'pointer' }}
          onClick={() => openDate(checkOutRef, 'checkout')}
        >
          <div className="top-accent" />
          <p style={{ fontSize: 10, fontWeight: 800, color: '#3a6647', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 5, pointerEvents: 'none' }}>
            <Calendar size={11} strokeWidth={3} color="#3a6647" /> Check Out
          </p>
          <div style={{ position: 'relative', pointerEvents: 'none' }}>
            <span style={{ fontSize: 14, display: 'block', fontWeight: checkOut ? 600 : 400, color: checkOut ? '#1a1a1e' : '#9ca3af', fontFamily: "'DM Sans', sans-serif" }}>
              {formatDate(checkOut) || 'dd-mm-yyyy'}
            </span>
            <input
              ref={checkOutRef}
              type="date"
              className="sb-date-input"
              value={checkOut}
              onChange={e => { setCheckOut(e.target.value); setActiveSection(null); }}
              onBlur={() => setActiveSection(null)}
              style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', border: 'none', background: 'transparent', cursor: 'pointer', pointerEvents: 'all' }}
            />
          </div>
        </div>

        <Divider />

        {/* ── GUESTS — dropdown is position:absolute inside this wrapper ── */}
        <div
          className="sb-guests-wrapper"
          style={{
            flex: '0.85',
            position: 'relative',  /* ← dropdown anchors to THIS */
            zIndex: 50,            /* ← sits above card siblings */
          }}
        >
          {/* Trigger button */}
          <div
            ref={guestBtnRef}
            className={`sb-section${showGuests || activeSection === 'guests' ? ' active' : ''}`}
            style={{ padding: '20px 22px', height: '100%', cursor: 'pointer', userSelect: 'none' }}
            onClick={toggleGuests}
          >
            <div className="top-accent" />
            <p style={{ fontSize: 10, fontWeight: 800, color: '#3a6647', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 5 }}>
              <Users size={11} strokeWidth={3} color="#3a6647" /> Guests
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
              <Users size={14} color="#9ca3af" />
              <span style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1e', fontFamily: "'DM Sans', sans-serif" }}>
                {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
              </span>
              <ChevronDown
                size={13} color="#3a6647"
                style={{ transform: showGuests ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s cubic-bezier(.22,1,.36,1)', marginLeft: 2 }}
              />
            </div>
          </div>

          {/* ── DROPDOWN
               position:absolute so it scrolls WITH the page
               right:0 aligns it to the right edge of the guests button
               top:calc(100% + 10px) places it just below ── */}
          {showGuests && (
            <div
              ref={guestDropRef}
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: 270,
                background: '#fffef9',
                borderRadius: 20,
                border: '1px solid #e5ddd0',
                boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(58,102,71,0.1)',
                padding: '20px 20px 16px',
                zIndex: 9999,
                animation: 'dropdownIn 0.22s cubic-bezier(.22,1,.36,1) both',
              }}
            >
              {[
                { label: 'Adults',   sub: 'Age 13+',  val: adults,   set: setAdults,   min: 1 },
                { label: 'Children', sub: 'Under 13', val: children, set: setChildren, min: 0 },
                { label: 'Pets',     sub: 'Dogs, cats, etc.', val: pets, set: setPets, min: 0 },
              ].map((g, idx) => (
                <div
                  key={g.label}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '13px 0',
                    borderBottom: idx === 0 ? '1px solid #e5ddd0' : 'none',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1e' }}>{g.label}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{g.sub}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <button
                      className="guest-minus"
                      onMouseDown={changeCount(g.set, g.val, g.min, -1)}
                      disabled={g.val <= g.min}
                      style={{
                        width: 36, height: 36, borderRadius: '50%',
                        border: `1.5px solid ${g.val > g.min ? '#c8c0b4' : '#e8e8e8'}`,
                        background: '#ffffff',
                        cursor: g.val > g.min ? 'pointer' : 'not-allowed',
                        color: g.val > g.min ? '#1a1a1e' : '#d1d5db',
                        fontSize: 22, lineHeight: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'border-color 0.15s, color 0.15s',
                        flexShrink: 0, fontWeight: 300,
                      }}
                    >−</button>

                    <span style={{ fontSize: 18, fontWeight: 700, minWidth: 28, textAlign: 'center', color: '#1a1a1e', fontFamily: "'DM Sans', sans-serif" }}>
                      {g.val}
                    </span>

                    <button
                      className="guest-plus"
                      onMouseDown={changeCount(g.set, g.val, g.min, +1)}
                      style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: '#3a6647', border: 'none',
                        cursor: 'pointer', color: 'white',
                        fontSize: 24, lineHeight: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.15s, transform 0.15s',
                        flexShrink: 0, fontWeight: 300,
                      }}
                    >+</button>
                  </div>
                </div>
              ))}

              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setShowGuests(false);
                  setActiveSection(null);
                }}
                style={{
                  width: '100%', marginTop: 18, padding: '13px',
                  background: '#3a6647', color: 'white',
                  border: 'none', borderRadius: 12, cursor: 'pointer',
                  fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#2a5035'}
                onMouseLeave={e => e.currentTarget.style.background = '#3a6647'}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center' }}>
          <button
            className="sb-search-btn"
            onClick={() => {
              setActiveSection(null);
              setShowGuests(false);
              onSearch && onSearch({ where, checkIn, checkOut, adults, children, pets });
            }}
            style={{
              width: 56, height: 56, borderRadius: 16,
              border: 'none', cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 6px 22px rgba(58,102,71,0.38)',
            }}
          >
            <Search size={22} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}
