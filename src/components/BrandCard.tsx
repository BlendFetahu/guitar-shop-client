import './BrandCard.scss';
import { useState } from 'react';
import { brandSlug } from '../utils/slug';

type Props = {
  name: string;
  onClick: () => void;
};

export default function BrandCard({ name, onClick }: Props) {
  const [failed, setFailed] = useState(false);
  const slug = brandSlug(name);
  const src = `/brands/${slug}.png`; // from public folder

  return (
    <button className="brand-card" onClick={onClick}>
      {!failed ? (
        <img src={src} alt={`${name} logo`} onError={() => setFailed(true)} />
      ) : (
        <span className="brand-fallback">{name}</span>
      )}
    </button>
  );
}
