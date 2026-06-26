// Token gaps — D24: p-[10px] horizontal padding (between xs=8 and s=14, no exact token).
// D28: border-white (--color-white) / 1px (border utility) / rounded-s (--radius-s: 4px).
// Transition only on active state: transition-all in active branch only — enter animates in,
// exit is instant (CSS drops transition property at the same tick the border is removed).
interface MenuSwitchProps {
  active?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function MenuSwitch({ active = false, children = 'All teams', onClick, className = '' }: MenuSwitchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 items-center justify-center px-[10px] rounded-s type-grotesk text-black whitespace-nowrap
        ${active ? 'border border-white transition-all duration-150' : ''}
        ${className}`}
    >
      {children}
    </button>
  );
}
