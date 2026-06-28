// D33: Recreated from Figma 357:35722. Deleted in Step 5.8 when SwitchGroup was used.
// D28: px-[10px] off token scale; border-white ON-state (1px, rounded-s); enter-only transition.
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
