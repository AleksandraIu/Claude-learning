// Token gap (D19): Figma 'static' bg is #f7e0dd. Mapped to bg-peach-100 (#f5dedb) — closest available.
export type TagVariant = 'control' | 'static';

interface TagProps {
  variant?: TagVariant;
  children?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export default function Tag({ variant = 'control', children = 'React', onRemove, className = '' }: TagProps) {
  const bg = variant === 'static' ? 'bg-peach-100' : 'bg-gray-100';

  return (
    <div className={`inline-flex items-center gap-[10px] h-6 px-xs rounded-s ${bg} ${className}`}>
      <span className="type-pixel tracking-[2px] uppercase text-black whitespace-nowrap">
        {children}
      </span>
      {variant === 'control' && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="shrink-0 size-4 flex items-center justify-center text-black leading-none"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
