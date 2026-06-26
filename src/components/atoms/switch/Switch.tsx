// Token gap (D19): inactive-big uses no bg (transparent). Secondary text #979797 not in tokens.
export interface SwitchProps {
  active?: boolean;
  size?: 'big' | 'small';
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function Switch({ active = true, size = 'big', label = 'Team', onClick, className = '' }: SwitchProps) {
  const isBig = size === 'big';
  const base = 'flex h-8 items-center justify-center rounded-s cursor-pointer select-none px-s py-xs';

  const bg =
    isBig && active  ? 'bg-white' :
    isBig && !active ? '' :           // transparent — no bg token needed (context-driven)
    'bg-gray-100';                    // small: always gray-100 bg

  const textClass =
    isBig  ? `type-pixel tracking-[2px] uppercase text-black` :
    active ? `type-caps text-black` :
             `type-caps text-[#979797]`;  // D19: secondary/muted not in tokens

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`${base} ${bg} ${className}`}
    >
      <span className={textClass}>{label}</span>
    </button>
  );
}
