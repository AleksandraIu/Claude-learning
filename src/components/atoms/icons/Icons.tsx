export type IconName = 'play' | 'user' | 'more' | 'arrow-down' | 'close';

const paths: Record<IconName, React.ReactNode> = {
  play: (
    <polygon points="4,2 14,8 4,14" fill="currentColor" />
  ),
  user: (
    <>
      <circle cx="8" cy="5" r="3" fill="currentColor" />
      <path d="M2 15c0-3.314 2.686-6 6-6s6 2.686 6 6" fill="currentColor" />
    </>
  ),
  more: (
    <>
      <circle cx="3"  cy="8" r="1.5" fill="currentColor" />
      <circle cx="8"  cy="8" r="1.5" fill="currentColor" />
      <circle cx="13" cy="8" r="1.5" fill="currentColor" />
    </>
  ),
  'arrow-down': (
    <polyline points="3,5 8,11 13,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  close: (
    <>
      <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="3" x2="3"  y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
};

interface IconsProps {
  name?: IconName;
  className?: string;
  'aria-label'?: string;
}

export default function Icons({ name = 'play', className = '', 'aria-label': ariaLabel }: IconsProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-label={ariaLabel ?? name}
      aria-hidden={!ariaLabel}
      className={`shrink-0 ${className}`}
    >
      {paths[name]}
    </svg>
  );
}
