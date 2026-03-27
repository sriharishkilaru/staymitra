import { useState } from 'react';
import {
  ChevronLeft, MapPin, Star, Shield, Bed, Bath, Users, Wifi,
  Utensils, Car, Wind, Leaf, Tv, Award, Building2, Coffee,
  Globe, Zap, BookOpen, Check, CheckCircle, Home, Image as ImageIcon,
} from 'lucide-react';
import Stars from '../components/ui/Stars';
import VerifiedBadge from '../components/ui/VerifiedBadge';
import { T } from '../tokens';

const AMENITY_ICONS = {
  WiFi: <Wifi size={16} />, Kitchen: <Utensils size={16} />, Parking: <Car size={16} />,
  AC: <Wind size={16} />, Garden: <Leaf size={16} />, TV: <Tv size={16} />,
  Gym: <Award size={16} />, Rooftop: <Building2 size={16} />, Breakfast: <Coffee size={16} />,
  Pool: <Globe size={16} />, Fireplace: <Zap size={16} />, Workspace: <BookOpen size={16} />,
  Bar: <Coffee size={16} />, Concierge: <Shield size={16} />, Security: <Shield size={16} />,
  Courtyard: <Home size={16} />, Bonfire: <Zap size={16} />, BBQ: <Utensils size={16} />,
  'Beach Access': <Globe size={16} />, Washer: <Check size={16} />, Heating: <Zap size={16} />,
  'Mountain View': <Globe size={16} />,
};

export default function PropertyDetailPage({ property, setPage }) {
  const [nights, setNights]     = useState(2);
  const [checkIn, setCheckIn]   = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [activeImg, setActiveImg] = useState(0);

  if (!property) return null;

  const base  = property.price * nights;
  const tax   = Math.round(base * 0.12);
  const total = base + tax;

  return (
    <div style={{ paddingTop: 70, background: T.white, minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: 36, paddingBottom: 80 }}>

        {/* Back */}
        <button
          onClick={() => { setPage('home'); window.scrollTo({ top: 0 }); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: T.gray, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 28 }}
        >
          <ChevronLeft size={16} strokeWidth={2.5} /> Back to listings
        </button>

        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: T.charcoal, marginBottom: 10, lineHeight: 1.2 }}>
              {property.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Stars rating={property.rating} size={14} />
                <span style={{ fontSize: 14, fontWeight: 700, color: T.charcoal }}>{property.rating}</span>
                <span style={{ fontSize: 14, color: T.gray }}>({property.reviews} reviews)</span>
              </div>
              <span style={{ color: T.border }}>·</span>
              <span style={{ fontSize: 14, color: T.gray, display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={14} color={T.green} strokeWidth={2.5} /> {property.loc}
              </span>
              {property.verified && <VerifiedBadge />}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, height: 440, marginBottom: 48, borderRadius: 24, overflow: 'hidden' }}>
          {/* Main image */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
            <img
              src={property.imgs[activeImg]}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
            />
          </div>
          {/* Thumbs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                onClick={() => property.imgs[i] && setActiveImg(i)}
                style={{
                  borderRadius: 4, overflow: 'hidden',
                  background: T.beigeDeep, cursor: property.imgs[i] ? 'pointer' : 'default',
                  border: activeImg === i ? `3px solid ${T.green}` : '3px solid transparent',
                  transition: 'border-color 0.2s',
                }}
              >
                {property.imgs[i] ? (
                  <img src={property.imgs[i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImageIcon size={24} color={T.border} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content grid */}
        <div className="property-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 390px', gap: 52, alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 32, paddingBottom: 30, borderBottom: `1px solid ${T.border}`, marginBottom: 32, flexWrap: 'wrap' }}>
              {[
                { icon: <Bed size={18} color={T.green} />, val: `${property.beds} Bedroom${property.beds !== 1 ? 's' : ''}` },
                { icon: <Users size={18} color={T.green} />, val: `Up to ${property.guests} Guests` },
                { icon: <Home size={18} color={T.green} />, val: property.type === 'home' ? 'Entire Home' : 'Hotel Room' },
              ].map(s => (
                <div key={s.val} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  {s.icon}
                  <span style={{ fontSize: 14, fontWeight: 600, color: T.charcoal }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: T.charcoal, marginBottom: 14 }}>
                About this place
              </h2>
              <p style={{ fontSize: 15, color: T.gray, lineHeight: 1.85 }}>{property.desc}</p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: T.charcoal, marginBottom: 20 }}>
                What's included
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {property.amenities.map(a => (
                  <div key={a} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: T.beigeCard, borderRadius: 12, padding: '13px 16px',
                    border: `1px solid ${T.border}`,
                  }}>
                    <div style={{ color: T.green, flexShrink: 0 }}>{AMENITY_ICONS[a] || <Check size={16} />}</div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.charcoal }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: T.charcoal, marginBottom: 18 }}>
                House Policies
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Check-in', val: '2:00 PM – 10:00 PM' },
                  { label: 'Check-out', val: 'Before 11:00 AM' },
                  { label: 'Cancellation', val: 'Free cancellation before 48 hours' },
                  { label: 'Pets', val: 'Not allowed' },
                  { label: 'Smoking', val: 'Not allowed indoors' },
                ].map(p => (
                  <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${T.border}`, fontSize: 14 }}>
                    <span style={{ color: T.gray }}>{p.label}</span>
                    <span style={{ fontWeight: 500, color: T.charcoal }}>{p.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: T.charcoal, marginBottom: 20 }}>
                Location
              </h2>
              <div style={{
                height: 240, background: T.beigeDeep, borderRadius: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${T.border}`, overflow: 'hidden', position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=60&fit=crop") center/cover', opacity: 0.25 }} />
                <div style={{
                  background: T.white, borderRadius: 16, padding: '16px 22px',
                  boxShadow: '0 10px 36px rgba(0,0,0,0.13)',
                  display: 'flex', alignItems: 'center', gap: 10, zIndex: 1,
                }}>
                  <MapPin size={20} color={T.green} strokeWidth={2.5} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.charcoal }}>{property.loc}</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>Exact address shared after booking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Booking card */}
          <div style={{
            background: T.white, borderRadius: 26, padding: 30,
            border: `1px solid ${T.border}`,
            boxShadow: '0 20px 72px rgba(58,102,71,0.12)',
            position: 'sticky', top: 88,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: T.green }}>
                ₹{property.price.toLocaleString()}
              </span>
              <span style={{ fontSize: 14, color: T.gray }}>/night</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 26 }}>
              <Stars rating={property.rating} size={13} />
              <span style={{ fontSize: 13, color: T.gray }}>{property.reviews} reviews</span>
            </div>

            {/* Date & Nights picker */}
            <div style={{ borderRadius: 14, border: `1.5px solid ${T.border}`, overflow: 'hidden', marginBottom: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ padding: '14px 16px', borderRight: `1px solid ${T.border}` }}>
                  <p style={{ fontSize: 9, fontWeight: 800, color: T.green, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 5 }}>CHECK-IN</p>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: T.charcoal, fontFamily: "'DM Sans', sans-serif", width: '100%' }} />
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: 9, fontWeight: 800, color: T.green, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 5 }}>CHECK-OUT</p>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: T.charcoal, fontFamily: "'DM Sans', sans-serif", width: '100%' }} />
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: 9, fontWeight: 800, color: T.green, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 8 }}>NIGHTS</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <button onClick={() => setNights(Math.max(1, nights - 1))} style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${T.border}`, background: 'none', cursor: 'pointer', fontSize: 18, color: T.charcoal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{nights}</span>
                  <button onClick={() => setNights(nights + 1)} style={{ width: 32, height: 32, borderRadius: '50%', background: T.green, border: 'none', cursor: 'pointer', color: 'white', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div style={{ marginBottom: 22 }}>
              {[
                { label: `₹${property.price.toLocaleString()} × ${nights} nights`, val: `₹${base.toLocaleString()}` },
                { label: 'Platform fee',                                             val: 'Free 🎉' },
                { label: 'GST (12%)',                                                val: `₹${tax.toLocaleString()}` },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14, color: T.gray, borderBottom: `1px solid ${T.border}` }}>
                  <span>{r.label}</span>
                  <span style={{ fontWeight: 500, color: T.charcoal }}>{r.val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0', fontSize: 17, fontWeight: 800, color: T.charcoal }}>
                <span>Total</span>
                <span style={{ color: T.green, fontFamily: "'Playfair Display', serif" }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              className="btn-green"
              onClick={() => { setPage('payment'); window.scrollTo({ top: 0 }); }}
              style={{ width: '100%', padding: '16px', borderRadius: 15, fontSize: 16, fontWeight: 700 }}
            >
              Reserve Now
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: T.grayLight, marginTop: 12 }}>
              You won't be charged yet · Free cancellation
            </p>

            {/* Trust signals */}
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                'stayमित्र Verified property',
                '100% authentic reviews',
                '24/7 guest support',
              ].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: T.gray }}>
                  <CheckCircle size={14} color={T.green} strokeWidth={2.5} /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
