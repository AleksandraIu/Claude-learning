// Animated sliding indicator: measures button offsets via refs, transitions left+width.
import { useState, useRef, useLayoutEffect } from 'react';

interface SwitchGroupItem {
  label: string;
}

interface SwitchGroupProps {
  items?: SwitchGroupItem[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

const DEFAULT_ITEMS: SwitchGroupItem[] = [
  { label: 'Team' },
  { label: 'All' },
  { label: 'Mine' },
];

export default function SwitchGroup({
  items = DEFAULT_ITEMS,
  activeIndex: externalActive,
  onSelect,
  className = '',
}: SwitchGroupProps) {
  const [internal, setInternal] = useState(externalActive ?? 0);
  const active = externalActive !== undefined ? externalActive : internal;
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const btn = buttonRefs.current[active];
    if (btn) setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active, items.length]);

  const handleClick = (i: number) => {
    if (externalActive === undefined) setInternal(i);
    onSelect?.(i);
  };

  return (
    <div
      role="tablist"
      className={`relative flex items-center bg-yellow-400 p-xxs rounded-s ${className}`}
    >
      <div
        className="absolute top-xxs bottom-xxs bg-white rounded-s pointer-events-none transition-all duration-200 ease-in-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {items.map((item, i) => (
        <button
          key={i}
          ref={el => { buttonRefs.current[i] = el; }}
          role="tab"
          aria-selected={i === active}
          onClick={() => handleClick(i)}
          className={`relative z-10 h-8 px-s flex items-center justify-center transition-colors duration-200 whitespace-nowrap`}
        >
          <span className={`type-pixel tracking-[2px] uppercase ${i === active ? 'text-black' : 'text-black/50'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
