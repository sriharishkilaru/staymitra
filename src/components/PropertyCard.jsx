import { useState } from 'react';
import { MapPin, Star, Heart, Bed, Users } from 'lucide-react';
import VerifiedBadge from './ui/VerifiedBadge';
import { T } from '../tokens';

export default function PropertyCard({ p, onClick }) {
  const [liked, setLiked] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  return (
    <div
      className="card-hover"
      onClick={() => onClick(p)}
      style={{
        background: T.beigeCard,
        borderRadius: 22,
        border: `1px solid ${T.border}`,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 224, overflow: 'hidden' }}>
        <img
          src={p.img}
          alt={p.title}
          className="img-zoom"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Type tag */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(6px)',
          padding: '3px 10px', borderRadius: 8,
          fontSize: 11, fontWeight: 700, color: T.gray,
          textTransform: 'uppercase', letterSpacing: '0.6px',
        }}>{p.type}</div>

        {/* Heart */}
        <button
          onClick={e => { e.stopPropagation(); setLiked(!liked); }}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart
            size={15}
            fill={liked ? T.red : 'none'}
            color={liked ? T.red : T.gray}
            strokeWidth={liked ? 0 : 2}
          />
        </button>

        {/* Verified bottom-left */}
        {p.verified && (
          <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
            <VerifiedBadge />
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '17px 19px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16, fontWeight: 600, color: T.charcoal,
            lineHeight: 1.3, flex: 1, marginRight: 8,
          }}>{p.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
            <Star size={13} fill={T.amber} color={T.amber} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.charcoal }}>{p.rating}</span>
          </div>
        </div>

        <p style={{ fontSize: 13, color: T.gray, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 13 }}>
          <MapPin size={13} color={T.green} strokeWidth={2.5} />
          {p.loc}
        </p>

        <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: T.gray, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Bed size={12} color={T.grayLight} /> {p.beds} beds
          </span>
          <span style={{ fontSize: 12, color: T.gray, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Users size={12} color={T.grayLight} /> {p.guests} guests
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 21, fontWeight: 700, color: T.green,
            }}>₹{p.price.toLocaleString()}</span>
            <span style={{ fontSize: 12, color: T.gray }}> /night</span>
          </div>
          <button
            className="btn-green"
            onClick={e => { e.stopPropagation(); onClick(p); }}
            style={{ padding: '7px 16px', borderRadius: 9, fontSize: 13, fontWeight: 600 }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
