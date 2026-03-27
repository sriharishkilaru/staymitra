import { Shield, Tag, ThumbsUp, Award, Zap, MessageSquare } from 'lucide-react';
import { T } from '../tokens';

const ICONS = { shield: Shield, tag: Tag, 'thumbs-up': ThumbsUp, award: Award, zap: Zap, 'message-square': MessageSquare };

const FEATURES = [
  { icon: 'shield',       title: 'Verified Properties',  desc: 'Every listing is personally inspected and approved by our trust team before going live.' },
  { icon: 'tag',          title: 'Honest Pricing',        desc: 'No hidden charges. No surge pricing. What you see is exactly what you pay.' },
  { icon: 'thumbs-up',    title: 'Trusted Owners',        desc: 'All hosts undergo KYC verification and sign a comfort agreement with stayमित्र.' },
  { icon: 'award',        title: 'Comfort Guarantee',     desc: "We step in if anything isn't right. Your experience is our responsibility." },
  { icon: 'zap',          title: 'Instant Booking',       desc: 'No waiting for approvals. Book verified stays instantly, available 24/7.' },
  { icon: 'message-square', title: 'Dedicated Support',   desc: "Real humans, available round the clock. We're always just a message away." },
];

export default function WhyChoose() {
  return (
    <section className="section-pad" style={{ background: T.white }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: T.green, textTransform: 'uppercase', letterSpacing: '2.5px' }}>
            Our Promise
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: T.charcoal, marginTop: 10 }}>
            Why choose{' '}
            <em style={{ fontStyle: 'italic', color: T.green }}>stayमित्र?</em>
          </h2>
          <p style={{ color: T.gray, marginTop: 14, fontSize: 16, maxWidth: 500, margin: '14px auto 0', lineHeight: 1.7 }}>
            We're not just a booking platform. We're a comfort partner that travels with you — every step of the journey.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 24,
        }}>
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon] || Shield;
            return (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: T.beigeCard,
                  borderRadius: 22, padding: '28px 26px',
                  border: `1px solid ${T.border}`,
                  display: 'flex', flexDirection: 'column', gap: 14,
                }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: 15,
                  background: T.greenPale,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={22} color={T.green} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: T.charcoal }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: T.gray, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
