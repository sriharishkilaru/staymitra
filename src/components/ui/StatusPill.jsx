import { T } from '../../tokens';

const STATUS_MAP = {
  confirmed:  { bg: T.greenLight,   color: T.green,   label: 'Confirmed' },
  pending:    { bg: T.amberLight,   color: T.amber,   label: 'Pending' },
  cancelled:  { bg: T.redLight,     color: T.red,     label: 'Cancelled' },
  approved:   { bg: T.greenLight,   color: T.green,   label: 'Approved' },
  active:     { bg: T.greenLight,   color: T.green,   label: 'Active' },
  inactive:   { bg: '#f3f4f6',      color: T.gray,    label: 'Inactive' },
  verified:   { bg: T.greenLight,   color: T.green,   label: 'Verified' },
  rejected:   { bg: T.redLight,     color: T.red,     label: 'Rejected' },
};

export default function StatusPill({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{
      display: 'inline-block',
      background: s.bg,
      color: s.color,
      fontSize: 12,
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: 20,
      letterSpacing: '0.2px',
    }}>
      {s.label}
    </span>
  );
}
