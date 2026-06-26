// Real photos from Figma (expire after 7 days from session; swap in production assets).
export type AvatarVariant = 'katya' | 'dog' | 'petya';

const PHOTOS: Record<AvatarVariant, string> = {
  katya: 'https://www.figma.com/api/mcp/asset/87f1a982-ca0a-429f-8fc1-20d9613b73ec',
  dog:   'https://www.figma.com/api/mcp/asset/46e6ff30-b36e-4bd0-86b8-2d769b935114',
  petya: 'https://www.figma.com/api/mcp/asset/bbd15a5c-d392-499f-9a0c-11cf1a3b7e90',
};

interface AvatarProps {
  variant?: AvatarVariant;
  src?: string;
  alt?: string;
  className?: string;
}

export default function Avatar({ variant = 'katya', src, alt, className = '' }: AvatarProps) {
  return (
    <img
      src={src ?? PHOTOS[variant]}
      alt={alt ?? variant}
      className={`size-[30px] rounded-full object-cover shrink-0 ${className}`}
    />
  );
}
