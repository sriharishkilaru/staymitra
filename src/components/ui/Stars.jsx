import { Star } from 'lucide-react';
import { T } from '../../tokens';

export default function Stars({ rating, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? T.amber : 'none'}
          color={i <= Math.round(rating) ? T.amber : T.grayLight}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
