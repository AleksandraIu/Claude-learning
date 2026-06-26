// Token gap (D24): p-[10px] horizontal padding — between xs(8) and s(14), no exact token.
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
      className={`flex h-8 items-center justify-center px-[10px] rounded-s type-grotesk text-black
        transition-all duration-150 whitespace-nowrap
        ${active ? 'border border-white' : ''}
        ${className}`}
    >
      {children}
    </button>
  );
}
