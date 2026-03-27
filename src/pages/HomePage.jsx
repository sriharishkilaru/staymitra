import { useState, useEffect } from 'react';
import {
  Search, Shield, ArrowRight, Star, X,
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import Carousel from '../components/Carousel';
import ViewCounter from '../components/ViewCounter';
import PriceComparison from '../components/PriceComparison';
import WhyChoose from '../components/WhyChoose';
import Stars from '../components/ui/Stars';
import { PROPERTIES } from '../data/properties';
import { TESTIMONIALS } from '../data/carousel';
import { T } from '../tokens';
import { getProperties, searchProperties } from '../lib/api';

// helper — map Supabase row → shape the PropertyCard expects
function mapProperty(p) {
  return {
    id:        p.id,
    title:     p.title,
    loc:       p.location,
    city:      p.city,
    price:     p.price,
    rating:    parseFloat(p.rating) || 0,
    reviews:   p.reviews || 0,
    img:       p.image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&fit=crop',
    imgs:      p.images?.length ? p.images : [p.image_url],
    verified:  p.verified,
    type:      p.type,
    desc:      p.description,
    amenities: p.amenities || [],
    beds:      p.beds || 1,
    baths:     p.baths || 1,
    guests:    p.guests || 2,
    status:    p.status,
    owner:     p.owner_name,
  };
}

export default function HomePage({ setPage, setSelectedProperty }) {
  const [properties,     setProperties]     = useState([]);
  const [loadingProps,   setLoadingProps]    = useState(true);
  const [searchResults,  setSearchResults]   = useState(null);
  const [searchQuery,    setSearchQuery]     = useState('');
  const [searchLoading,  setSearchLoading]   = useState(false);

  // Load properties from Supabase on mount
  useEffect(() => {
    getProperties()
      .then(data => setProperties(data.map(mapProperty)))
      .catch(() => {
        // fallback to mock data if Supabase fails
        setProperties(PROPERTIES);
      })
      .finally(() => setLoadingProps(false));
  }, []);

  const handleSearch = async ({ where }) => {
    setSearchQuery(where);
    if (!where.trim()) { setSearchResults(null); return; }
    setSearchLoading(true);
    try {
      const data = await searchProperties(where);
      setSearchResults(data.map(mapProperty));
    } catch {
      // fallback to local filter
      const q = where.toLowerCase();
      const res = properties.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.loc.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
      setSearchResults(res);
    } finally {
      setSearchLoading(false);
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handlePropertyClick = (p) => {
    setSelectedProperty(p);
    setPage('property');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skeleton loader for cards
  const Skeleton = () => (
    <div style={{ background: T.beigeCard, borderRadius: 22, overflow: 'hidden', border: `1px solid ${T.border}` }}>
      <div style={{ height: 224, background: `linear-gradient(90deg, ${T.beigeDeep} 25%, ${T.beige} 50%, ${T.beigeDeep} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '17px 19px 20px' }}>
        <div style={{ height: 18, background: T.beigeDeep, borderRadius: 6, marginBottom: 10, width: '70%' }} />
        <div style={{ height: 13, background: T.beigeDeep, borderRadius: 6, marginBottom: 16, width: '50%' }} />
        <div style={{ height: 16, background: T.beigeDeep, borderRadius: 6, width: '40%' }} />
      </div>
    </div>
  );

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: `linear-gradient(155deg, ${T.beige} 0%, ${T.beigeDeep} 100%)`,
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'visible',
        paddingTop: 70,
      }}>
        <div style={{ position: 'absolute', right: '-8%', top: '4%', width: 680, height: 680, borderRadius: '50%', background: `radial-gradient(circle, ${T.greenPale} 0%, transparent 68%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '-6%', bottom: '-8%', width: 440, height: 440, borderRadius: '50%', background: `radial-gradient(circle, ${T.amberLight} 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 56, paddingBottom: 80 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            <div style={{ animation: 'fadeUp 0.85s cubic-bezier(.22,1,.36,1)' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: T.greenLight, color: T.green,
                fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 20,
                marginBottom: 26,
              }}>
                <Shield size={13} strokeWidth={2.5} /> Verified Stays · Honest Prices · comfort comes with us
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 700, color: T.charcoal,
                lineHeight: 1.13, marginBottom: 22, letterSpacing: '-1.2px',
              }}>
                Find comfort<br />
                <em style={{ fontStyle: 'italic', color: T.green }}>that feels</em><br />
                personal.
              </h1>

              <p style={{ fontSize: 17, color: T.gray, lineHeight: 1.8, marginBottom: 38, maxWidth: 420 }}>
                stayमित्र — verified homes and hotels at honest prices, curated for travellers who value warmth over hype.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn-green"
                  onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Search size={17} /> Explore Stays
                </button>
                <button className="btn-outline"
                  onClick={() => setPage('host')}
                  style={{ padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600 }}
                >
                  Become a Host
                </button>
              </div>

              <div style={{ display: 'flex', gap: 28, marginTop: 44 }}>
                {[
                  { val: `${properties.length || '6,200'}+`, label: 'Verified Stays' },
                  { val: '48+',  label: 'Cities' },
                  { val: '4.8★', label: 'Avg Rating' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: T.charcoal }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image collage */}
            <div className="hide-mobile" style={{ position: 'relative', height: 520 }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '80%', height: '66%', borderRadius: 26, overflow: 'hidden', boxShadow: '0 28px 72px rgba(0,0,0,0.16)', animation: 'fadeIn 1s ease 0.15s both' }}>
                <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80&fit=crop" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '56%', height: '50%', borderRadius: 26, overflow: 'hidden', boxShadow: '0 20px 56px rgba(0,0,0,0.13)', animation: 'fadeIn 1s ease 0.35s both' }}>
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80&fit=crop" alt="Heritage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="anim-float" style={{ position: 'absolute', bottom: '28%', right: '-7%', background: T.white, borderRadius: 18, padding: '16px 20px', boxShadow: '0 16px 52px rgba(0,0,0,0.13)', display: 'flex', alignItems: 'center', gap: 13, zIndex: 2 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: T.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={20} color={T.green} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.charcoal }}>100% Verified</div>
                  <div style={{ fontSize: 11, color: T.gray, marginTop: 1 }}>All properties</div>
                </div>
              </div>
              <div className="anim-float" style={{ animationDelay: '1s', position: 'absolute', top: '16%', left: '-8%', background: T.white, borderRadius: 18, padding: '14px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: T.amberLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={18} fill={T.amber} color={T.amber} />
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: T.charcoal, lineHeight: 1 }}>4.9</div>
                  <div style={{ fontSize: 11, color: T.gray }}>avg rating</div>
                </div>
              </div>
            </div>
          </div>

          <div id="search-section" style={{ marginTop: 52 }}>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* ── SEARCH RESULTS ── */}
      {searchResults !== null && (
        <section id="search-results" style={{ background: T.white, padding: '44px 0', borderBottom: `1px solid ${T.border}` }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: T.charcoal }}>
                {searchLoading ? 'Searching…' : searchResults.length > 0
                  ? `${searchResults.length} stay${searchResults.length !== 1 ? 's' : ''} found`
                  : `No results for "${searchQuery}"`}
              </h2>
              <button onClick={() => setSearchResults(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: T.gray, display: 'flex', alignItems: 'center', gap: 5 }}>
                <X size={15} /> Clear
              </button>
            </div>
            {searchLoading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(295px, 1fr))', gap: 24 }}>
                {[1, 2, 3].map(i => <Skeleton key={i} />)}
              </div>
            ) : searchResults.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(295px, 1fr))', gap: 24 }}>
                {searchResults.map(p => <PropertyCard key={p.id} p={p} onClick={handlePropertyClick} />)}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 0', color: T.gray }}>
                <Search size={52} color={T.border} style={{ marginBottom: 18 }} />
                <p style={{ fontSize: 16, marginBottom: 6 }}>No stays matched your search.</p>
                <p style={{ fontSize: 14, color: T.grayLight }}>Try a city name, locality, or property type.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FEATURED PROPERTIES ── */}
      <section className="section-pad" style={{ background: T.beigeCard }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: T.green, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Handpicked for you</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: T.charcoal, marginTop: 8 }}>
                Featured <em style={{ fontStyle: 'italic', color: T.green }}>Stays</em>
              </h2>
            </div>
            <button className="btn-outline" style={{ padding: '10px 22px', borderRadius: 11, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              View All <ArrowRight size={14} />
            </button>
          </div>

          {loadingProps ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 26 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 26 }}>
              {properties.map(p => (
                <PropertyCard key={p.id} p={p} onClick={handlePropertyClick} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CAROUSEL ── */}
      <section className="section-pad" style={{ background: T.charcoal }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: T.greenLight, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Explore with us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: 'white', marginTop: 10 }}>
              Your next <em style={{ fontStyle: 'italic', color: T.greenLight }}>escape</em> awaits
            </h2>
          </div>
          <Carousel />
        </div>
      </section>

      {/* ── VIEW COUNTER ── */}
      <section style={{ padding: '52px 0', background: T.white }}>
        <div className="container"><ViewCounter /></div>
      </section>

      <PriceComparison />
      <WhyChoose />

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background: T.beige }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: T.green, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Guest Stories</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: T.charcoal, marginTop: 10 }}>
              Loved by <em style={{ fontStyle: 'italic', color: T.green }}>travellers</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: T.white, borderRadius: 22, padding: '28px 26px', border: `1px solid ${T.border}`, boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                <Stars rating={t.rating} size={15} />
                <p style={{ fontSize: 15, color: T.gray, lineHeight: 1.75, margin: '18px 0 22px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'white', fontWeight: 700 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.charcoal }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '88px 0', background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenDark} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 340, height: 340, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 46px)', fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: 18 }}>
            Your perfect stay is<br /><em style={{ fontStyle: 'italic' }}>one search away.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 40 }}>
            Join over 1.2 lakh happy travellers who trust stayमित्र for every trip.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('signup')} style={{ background: 'white', color: T.green, border: 'none', cursor: 'pointer', padding: '15px 36px', borderRadius: 14, fontSize: 16, fontWeight: 700, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get Started Free <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
            </button>
            <button onClick={() => setPage('host')} style={{ background: 'rgba(255,255,255,0.13)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer', padding: '15px 36px', borderRadius: 14, fontSize: 16, fontWeight: 600, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
            >
              List Your Property
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}