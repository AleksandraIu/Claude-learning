// Overlap uses negative margin. Token gap (D19): -8px overlap not in spacing tokens (space/neg-1 = -1px).
import Avatar, { type AvatarVariant } from '../avatar/Avatar';

interface AvatarItem {
  variant?: AvatarVariant;
  src?: string;
  alt?: string;
}

interface AvatarGroupProps {
  avatars?: AvatarItem[];
  className?: string;
}

const DEFAULT_AVATARS: AvatarItem[] = [
  { variant: 'katya' },
  { variant: 'petya' },
  { variant: 'dog'   },
];

export default function AvatarGroup({ avatars = DEFAULT_AVATARS, className = '' }: AvatarGroupProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {avatars.map((a, i) => (
        <Avatar
          key={i}
          variant={a.variant}
          src={a.src}
          alt={a.alt}
          className={i < avatars.length - 1 ? '-mr-[8px]' : ''}
        />
      ))}
    </div>
  );
}
