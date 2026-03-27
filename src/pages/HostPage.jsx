import { submitOwnerProperty } from '../lib/api';
import { useState } from 'react';
import { ChevronLeft, User, Phone, Mail, Home, MapPin, IndianRupee, Upload, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { T } from '../tokens';

export default function HostPage({ setPage }) {
  const [form, setForm] = useState({
    ownerName: '', phone: '', email: '',
    title: '', address: '', city: '', price: '',
    type: 'home', beds: '', guests: '', desc: '',
  });
  const [errors,    setErrors]    = useState({});
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imgFiles,  setImgFiles]  = useState([]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.ownerName.trim())  e.ownerName = 'Required';
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit number required';
    if (!form.email.includes('@')) e.email   = 'Valid email required';
    if (!form.title.trim())      e.title     = 'Required';
    if (!form.address.trim())    e.address   = 'Required';
    if (!form.city.trim())       e.city      = 'Required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 100) e.price = 'Enter a valid price (min ₹100)';
    if (!form.desc.trim())       e.desc      = 'Required';
    return e;
  };

 const handleSubmit = async () => {
  const e = validate();
  setErrors(e);
  if (Object.keys(e).length > 0) return;
  setLoading(true);
  try {
    await submitOwnerProperty({
      owner_name:  form.ownerName,
      phone:       form.phone,
      email:       form.email,
      title:       form.title,
      address:     form.address,
      city:        form.city,
      price:       parseInt(form.price),
      type:        form.type,
      beds:        parseInt(form.beds) || 1,
      guests:      parseInt(form.guests) || 2,
      description: form.desc,
      status:      'pending',
    });
    setSubmitted(true);
  } catch (e) {
    setErrors({ desc: e.message || 'Submission failed. Please try again.' });
  } finally {
    setLoading(false);
  }
};

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: T.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, paddingTop: 96 }}>
      <div style={{ background: T.white, borderRadius: 28, padding: '52px 44px', maxWidth: 520, width: '100%', textAlign: 'center', boxShadow: '0 28px 72px rgba(0,0,0,0.09)' }}>
        <div className="anim-float" style={{ width: 84, height: 84, borderRadius: '50%', background: T.amberLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <Clock size={40} color={T.amber} strokeWidth={1.8} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: T.charcoal, marginBottom: 16 }}>
          Submission Received!
        </h2>
        <div style={{ background: T.amberLight, borderRadius: 12, padding: '12px 20px', marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Clock size={15} color={T.amber} />
          <span style={{ fontSize: 14, fontWeight: 700, color: T.amber }}>Pending Admin Approval</span>
        </div>
        <p style={{ fontSize: 15, color: T.gray, marginBottom: 38, lineHeight: 1.8 }}>
          Thank you, <strong style={{ color: T.charcoal }}>{form.ownerName.split(' ')[0]}</strong>! Our trust team will review <em>"{form.title}"</em> within 24–48 hours. You'll receive a confirmation at {form.email} once approved.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-green" onClick={() => { setPage('home'); window.scrollTo({ top: 0 }); }} style={{ padding: '13px 30px', borderRadius: 13, fontSize: 15, fontWeight: 700 }}>
            Back to Home
          </button>
          <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ ownerName: '', phone: '', email: '', title: '', address: '', city: '', price: '', type: 'home', beds: '', guests: '', desc: '' }); }} style={{ padding: '13px 30px', borderRadius: 13, fontSize: 15, fontWeight: 600 }}>
            Submit Another
          </button>
        </div>
      </div>
    </div>
  );

  const Err = ({ k }) => errors[k] ? <p style={{ fontSize: 12, color: T.red, marginTop: 5 }}>{errors[k]}</p> : null;

  return (
    <div style={{ minHeight: '100vh', background: T.beige, paddingTop: 96, paddingBottom: 72 }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: T.gray, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 36 }}>
          <ChevronLeft size={16} strokeWidth={2.5} /> Back
        </button>

        <div style={{ marginBottom: 44 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: T.amber, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Host with stayमित्र</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: T.charcoal, marginTop: 10, marginBottom: 12 }}>
            List your property
          </h1>
          <p style={{ fontSize: 15, color: T.gray, lineHeight: 1.8, maxWidth: 520 }}>
            Join 2,000+ property owners co-managing with stayमित्र. We handle bookings, guests, and trust — you enjoy steady, transparent income.
          </p>
        </div>

        {/* Info banner */}
        <div style={{ background: T.amberLight, borderRadius: 14, padding: '14px 20px', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid rgba(200,151,95,0.2)` }}>
          <AlertCircle size={18} color={T.amber} strokeWidth={2} />
          <p style={{ fontSize: 14, color: T.amber, fontWeight: 500 }}>
            All submitted properties require admin review and approval before going live. This ensures quality for our guests.
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: <CheckCircle size={18} color={T.green} />, title: 'Free to list', desc: 'No upfront fees' },
            { icon: <Clock size={18} color={T.green} />, title: '24-48hr review', desc: 'Fast approval' },
            { icon: <IndianRupee size={18} color={T.green} />, title: 'Transparent payouts', desc: 'Monthly transfers' },
          ].map(f => (
            <div key={f.title} style={{ background: T.white, borderRadius: 14, padding: '16px 18px', border: `1px solid ${T.border}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.charcoal }}>{f.title}</div>
                <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: T.white, borderRadius: 26, padding: 44, boxShadow: '0 8px 48px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: T.charcoal, marginBottom: 28 }}>Owner Information</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
            {/* Owner name */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Owner Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className={`input-field${errors.ownerName ? ' error' : ''}`} placeholder="Your full legal name" value={form.ownerName} onChange={set('ownerName')} style={{ paddingLeft: 42 }} />
              </div>
              <Err k="ownerName" />
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Phone Number *</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className={`input-field${errors.phone ? ' error' : ''}`} placeholder="10-digit mobile number" type="tel" value={form.phone} onChange={set('phone')} style={{ paddingLeft: 42 }} />
              </div>
              <Err k="phone" />
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className={`input-field${errors.email ? ' error' : ''}`} placeholder="you@email.com" type="email" value={form.email} onChange={set('email')} style={{ paddingLeft: 42 }} />
              </div>
              <Err k="email" />
            </div>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: T.charcoal, marginBottom: 24 }}>Property Details</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Title */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Property Title *</label>
              <div style={{ position: 'relative' }}>
                <Home size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className={`input-field${errors.title ? ' error' : ''}`} placeholder="e.g., The Garden Villa, Skyline Apartment" value={form.title} onChange={set('title')} style={{ paddingLeft: 42 }} />
              </div>
              <Err k="title" />
            </div>

            {/* Address */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Street Address *</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className={`input-field${errors.address ? ' error' : ''}`} placeholder="Street, Locality, Area" value={form.address} onChange={set('address')} style={{ paddingLeft: 42 }} />
              </div>
              <Err k="address" />
            </div>

            {/* City */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>City *</label>
              <input className={`input-field${errors.city ? ' error' : ''}`} placeholder="e.g., Bengaluru, Mumbai, Jaipur" value={form.city} onChange={set('city')} />
              <Err k="city" />
            </div>

            {/* Type */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Property Type</label>
              <select className="input-field" value={form.type} onChange={set('type')}>
                <option value="home">Entire Home / Villa / Cottage</option>
                <option value="hotel">Hotel / Serviced Apartment</option>
                <option value="room">Private Room</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Price Per Night (₹) *</label>
              <div style={{ position: 'relative' }}>
                <IndianRupee size={16} color={T.grayLight} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className={`input-field${errors.price ? ' error' : ''}`} type="number" placeholder="e.g., 2500" min="100" value={form.price} onChange={set('price')} style={{ paddingLeft: 42 }} />
              </div>
              <Err k="price" />
            </div>

            {/* Beds */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Number of Bedrooms</label>
              <select className="input-field" value={form.beds} onChange={set('beds')}>
                <option value="">Select</option>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} bedroom{n>1?'s':''}</option>)}
              </select>
            </div>

            {/* Guests */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Max Guests</label>
              <select className="input-field" value={form.guests} onChange={set('guests')}>
                <option value="">Select</option>
                {[1,2,3,4,5,6,8,10,12].map(n => <option key={n} value={n}>{n} guest{n>1?'s':''}</option>)}
              </select>
            </div>

            {/* Description */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Property Description *</label>
              <textarea
                className={`input-field${errors.desc ? ' error' : ''}`}
                placeholder="Describe your property — unique features, surroundings, what makes it special, nearby attractions…"
                value={form.desc} onChange={set('desc')} rows={4}
              />
              <Err k="desc" />
            </div>

            {/* Image upload */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Property Photos</label>
              <div
                style={{
                  border: `2px dashed ${T.border}`, borderRadius: 16, padding: '36px',
                  textAlign: 'center', background: T.beigeCard, cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.green; e.currentTarget.style.background = T.greenPale; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.beigeCard; }}
                onClick={() => document.getElementById('img-upload').click()}
              >
                <Upload size={30} color={T.grayLight} style={{ marginBottom: 12 }} />
                <p style={{ fontSize: 14, fontWeight: 600, color: T.gray, marginBottom: 4 }}>Drop images here or click to upload</p>
                <p style={{ fontSize: 12, color: T.grayLight }}>JPEG, PNG up to 10MB each · Minimum 3 photos strongly recommended</p>
                <input id="img-upload" type="file" accept="image/*" multiple style={{ display: 'none' }}
                  onChange={e => setImgFiles(Array.from(e.target.files))} />
              </div>
              {imgFiles.length > 0 && (
                <p style={{ fontSize: 13, color: T.green, marginTop: 8, fontWeight: 500 }}>
                  ✓ {imgFiles.length} image{imgFiles.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 36 }}>
            <button
              className="btn-green"
              onClick={handleSubmit}
              disabled={loading}
              style={{ flex: 1, padding: '15px', borderRadius: 14, fontSize: 16, fontWeight: 700 }}
            >
              {loading ? 'Submitting for review…' : 'Submit for Approval'}
            </button>
            <button
              className="btn-outline"
              onClick={() => setPage('home')}
              style={{ padding: '15px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
