// Token gaps (D19): 'node' bg #f7e0dd → bg-peach-100.
// Hover gap (D22): secondary hover #d4d4d4 not in tokens → arbitrary value.
export type ButtonVariant = 'secondary' | 'on-color' | 'cta-small' | 'cta-big' | 'node';

interface ButtonProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  subLabel?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const BASE = 'transition-all duration-150 ease-in-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed';

export default function Button({
  variant = 'secondary',
  children = 'More info',
  subLabel,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  if (variant === 'node') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex flex-col gap-xs items-start bg-peach-100 rounded-s p-s text-left hover:opacity-75 ${BASE} ${className}`}
      >
        <span className="type-grotesk text-black">{children}</span>
        {subLabel && (
          <span className="type-pixel tracking-[2px] uppercase text-black">{subLabel}</span>
        )}
      </button>
    );
  }

  if (variant === 'cta-big') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center bg-black rounded-over py-s px-s hover:bg-black/90 ${BASE} ${className}`}
      >
        <span className="type-h2 text-white tracking-[-0.4px] whitespace-nowrap">{children}</span>
      </button>
    );
  }

  // pill variants: secondary, on-color, cta-small
  const bg =
    variant === 'cta-small' ? 'bg-black' :
    variant === 'on-color'  ? 'bg-white' :
                              'bg-gray-100';

  // D23: no Figma hover token for cta-small/on-color; opacity-70 chosen for clear visibility.
  const hover =
    variant === 'cta-small' ? 'hover:opacity-70' :
    variant === 'on-color'  ? 'hover:bg-gray-100' :
                              'hover:bg-[#d4d4d4]';

  const textColor = variant === 'cta-small' ? 'text-white' : 'text-black';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-8 items-center justify-center px-s py-xs rounded-over ${bg} ${hover} ${BASE} ${className}`}
    >
      <span className={`type-pixel tracking-[2px] uppercase whitespace-nowrap ${textColor}`}>
        {children}
      </span>
    </button>
  );
}
