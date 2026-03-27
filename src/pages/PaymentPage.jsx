import { useState } from 'react';
import { ChevronLeft, Smartphone, CreditCard, Globe, Check, CheckCircle } from 'lucide-react';
import VerifiedBadge from '../components/ui/VerifiedBadge';
import { T } from '../tokens';

const METHODS = [
  { id: 'upi',        label: 'UPI Payment',          desc: 'Google Pay, PhonePe, Paytm, BHIM', icon: <Smartphone size={22} color={T.green} /> },
  { id: 'card',       label: 'Credit / Debit Card',  desc: 'Visa, Mastercard, RuPay, Amex',    icon: <CreditCard size={22} color={T.green} /> },
  { id: 'netbanking', label: 'Net Banking',           desc: 'All major Indian banks',            icon: <Globe size={22} color={T.green} /> },
];

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Yes Bank'];

export default function PaymentPage({ property, setPage }) {
  const [method,   setMethod]   = useState('upi');
  const [upiId,    setUpiId]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [paid,     setPaid]     = useState(false);
  const [bookingId] = useState(() => 'SM-' + Math.random().toString(36).substr(2, 8).toUpperCase());

  const nights = 2;
  const base   = (property?.price || 1800) * nights;
  const tax    = Math.round(base * 0.12);
  const total  = base + tax;

  const handlePay = () => { setLoading(true); setTimeout(() => { setLoading(false); setPaid(true); }, 2200); };

  if (paid) return (
    <div style={{ minHeight: '100vh', background: T.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{
        background: T.white, borderRadius: 28, padding: '56px 44px',
        maxWidth: 480, width: '100%', textAlign: 'center',
        boxShadow: '0 28px 72px rgba(0,0,0,0.09)',
      }}>
        <div className="anim-float" style={{
          width: 88, height: 88, borderRadius: '50%',
          background: `linear-gradient(135deg, ${T.green}, ${T.greenDark})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 12px 40px rgba(58,102,71,0.35)',
        }}>
          <Check size={42} color="white" strokeWidth={3} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: T.charcoal, marginBottom: 10 }}>
          Booking Confirmed!
        </h2>
        <p style={{ fontSize: 15, color: T.gray, marginBottom: 8, lineHeight: 1.7 }}>
          Your stay at <strong style={{ color: T.charcoal }}>{property?.title || 'the property'}</strong> has been confirmed.
        </p>
        <p style={{ fontSize: 14, color: T.gray, marginBottom: 36 }}>
          Booking ID: <strong style={{ color: T.green, fontWeight: 700 }}>{bookingId}</strong>
        </p>

        <div style={{ background: T.beigeCard, borderRadius: 16, padding: '20px 24px', marginBottom: 36, textAlign: 'left' }}>
          {[
            { label: 'Amount Paid', val: `₹${total.toLocaleString()}`, highlight: true },
            { label: 'Nights',      val: `${nights} nights` },
            { label: 'Method',      val: method.toUpperCase() },
            { label: 'Status',      val: 'Confirmed ✓' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${T.border}`, fontSize: 14 }}>
              <span style={{ color: T.gray }}>{r.label}</span>
              <span style={{ fontWeight: 700, color: r.highlight ? T.green : T.charcoal }}>{r.val}</span>
            </div>
          ))}
        </div>

        <button
          className="btn-green"
          onClick={() => { setPage('home'); window.scrollTo({ top: 0 }); }}
          style={{ padding: '14px 40px', borderRadius: 14, fontSize: 15, fontWeight: 700 }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.beige, paddingTop: 96, paddingBottom: 64, padding: '96px 16px 64px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>

        <button onClick={() => setPage('property')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: T.gray, display: 'flex', alignItems: 'center', gap: 5, marginBottom: 32 }}>
          <ChevronLeft size={16} strokeWidth={2.5} /> Back to property
        </button>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: T.charcoal, marginBottom: 36 }}>
          Complete Your Booking
        </h1>

        <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 32, alignItems: 'start' }}>

          {/* LEFT — Payment form */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: T.charcoal, marginBottom: 20 }}>Select Payment Method</h3>

            {/* Method selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
              {METHODS.map(m => (
                <label key={m.id} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: method === m.id ? T.greenPale : T.white,
                  border: `2px solid ${method === m.id ? T.green : T.border}`,
                  borderRadius: 18, padding: '18px 22px', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  <input type="radio" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} style={{ display: 'none' }} />
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: T.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {m.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.charcoal }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: T.gray, marginTop: 2 }}>{m.desc}</div>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: `2.5px solid ${method === m.id ? T.green : T.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'border-color 0.2s',
                  }}>
                    {method === m.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.green }} />}
                  </div>
                </label>
              ))}
            </div>

            {/* UPI form */}
            {method === 'upi' && (
              <div style={{ background: T.white, borderRadius: 18, padding: '26px 24px', border: `1px solid ${T.border}` }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 10 }}>Your UPI ID</label>
                <input className="input-field" placeholder="yourname@upi / phone@gpay / name@okicici" value={upiId} onChange={e => setUpiId(e.target.value)} />
                <p style={{ fontSize: 12, color: T.grayLight, marginTop: 8 }}>
                  You'll receive a payment request on your UPI app.
                </p>
                <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                  {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                    <div key={app} style={{ background: T.beigeCard, border: `1px solid ${T.border}`, borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, color: T.gray }}>
                      {app}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Card form */}
            {method === 'card' && (
              <div style={{ background: T.white, borderRadius: 18, padding: '26px 24px', border: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Card Number</label>
                  <input className="input-field" placeholder="1234  5678  9012  3456" maxLength={19} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Expiry Date</label>
                    <input className="input-field" placeholder="MM / YY" maxLength={7} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>CVV</label>
                    <input className="input-field" placeholder="•••" type="password" maxLength={4} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 9 }}>Cardholder Name</label>
                  <input className="input-field" placeholder="Name as on card" />
                </div>
              </div>
            )}

            {/* Net banking form */}
            {method === 'netbanking' && (
              <div style={{ background: T.white, borderRadius: 18, padding: '26px 24px', border: `1px solid ${T.border}` }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: T.charcoal, display: 'block', marginBottom: 10 }}>Select Your Bank</label>
                <select className="input-field">
                  {BANKS.map(b => <option key={b}>{b}</option>)}
                </select>
                <p style={{ fontSize: 12, color: T.grayLight, marginTop: 8 }}>
                  You'll be redirected to your bank's secure payment page.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT — Booking summary */}
          <div style={{
            background: T.white, borderRadius: 24, padding: 28,
            border: `1px solid ${T.border}`,
            boxShadow: '0 10px 48px rgba(0,0,0,0.07)',
            position: 'sticky', top: 88,
          }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: T.charcoal, marginBottom: 22 }}>Booking Summary</h3>

            {property && (
              <div style={{ display: 'flex', gap: 14, marginBottom: 22, paddingBottom: 22, borderBottom: `1px solid ${T.border}` }}>
                <img src={property.img} alt={property.title} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: T.charcoal, lineHeight: 1.4, marginBottom: 4 }}>{property.title}</p>
                  <p style={{ fontSize: 12, color: T.gray, marginBottom: 6 }}>{property.loc}</p>
                  {property.verified && <VerifiedBadge />}
                </div>
              </div>
            )}

            {[
              { label: `${nights} nights × ₹${(property?.price || 1800).toLocaleString()}`, val: `₹${base.toLocaleString()}` },
              { label: 'Platform fee', val: 'Free 🎉' },
              { label: 'GST (12%)', val: `₹${tax.toLocaleString()}` },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 14, color: T.gray, borderBottom: `1px solid ${T.border}` }}>
                <span>{r.label}</span>
                <span style={{ fontWeight: 500, color: T.charcoal }}>{r.val}</span>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0 0', fontSize: 18, fontWeight: 800, color: T.charcoal }}>
              <span>Total</span>
              <span style={{ color: T.green, fontFamily: "'Playfair Display', serif" }}>₹{total.toLocaleString()}</span>
            </div>

            <button
              className="btn-green"
              onClick={handlePay}
              disabled={loading}
              style={{ width: '100%', marginTop: 22, padding: '15px', borderRadius: 14, fontSize: 16, fontWeight: 700 }}
            >
              {loading
                ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Processing…
                  </span>
                : `Pay ₹${total.toLocaleString()}`
              }
            </button>

            <p style={{ textAlign: 'center', fontSize: 11, color: T.grayLight, marginTop: 12 }}>
              🔒 256-bit SSL secured payment
            </p>

            {/* Trust badges */}
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Free cancellation before check-in', 'Instant booking confirmation', '24/7 support available'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: T.gray }}>
                  <CheckCircle size={13} color={T.green} strokeWidth={2.5} /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
