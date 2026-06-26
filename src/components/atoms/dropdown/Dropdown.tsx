// Token gaps (D19): placeholder #979797 not in @theme.
import { useState, useRef, useEffect } from 'react';
import Icons from '../icons/Icons';

export type DropdownVariant = 'default' | 'on-color';

const DEFAULT_OPTIONS = ['frontend-team', 'backend-team', 'design-team', 'devops-team'];

interface DropdownProps {
  variant?: DropdownVariant;
  label?: string;
  showLabel?: boolean;
  defaultValue?: string;
  options?: string[];
  onChange?: (value: string) => void;
  className?: string;
  // legacy compat: filled=false → empty selection
  filled?: boolean;
}

export default function Dropdown({
  variant = 'default',
  label = 'Head Line',
  showLabel = true,
  defaultValue,
  options = DEFAULT_OPTIONS,
  onChange,
  filled = true,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    defaultValue ?? (filled ? options[0] : '')
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const isOnColor = variant === 'on-color';
  const containerBg = isOnColor ? 'bg-gold-400' : 'bg-gray-100';
  const labelColor  = isOnColor ? 'text-gold-400' : 'text-black';
  // Figma 357:35401: on-color empty = text-white opacity-50 (not secondary gray).
  // Default empty = #979797 (D19 gap: secondary text token missing).
  const textColor   = selected
    ? (isOnColor ? 'text-white' : 'text-black')
    : (isOnColor ? 'text-white/50' : 'text-[#979797]');

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-xs items-start w-[143px] ${className}`}>
      {showLabel && (
        <span className={`type-caps tracking-[1.6px] uppercase whitespace-nowrap ${labelColor}`}>
          {label}
        </span>
      )}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className={`flex items-center justify-between px-s py-xs w-full
            ${containerBg} ${open ? 'rounded-t-s' : 'rounded-s'}
            transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black`}
        >
          <span className={`type-pixel tracking-[2px] uppercase whitespace-nowrap ${textColor}`}>
            {selected || 'select…'}
          </span>
          <div className="flex items-center pl-xs">
            <span className={`transition-transform duration-150 inline-flex ${open ? 'rotate-180' : ''}`}>
              <Icons name="arrow-down" />
            </span>
          </div>
        </button>
        {open && (
          <div className={`absolute top-full left-0 right-0 z-20 ${containerBg} rounded-b-s border-t border-black/10`}>
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-left px-s py-xs type-pixel tracking-[2px] uppercase
                  transition-colors duration-100 hover:bg-black/5
                  ${opt === selected
                    ? 'text-black'
                    : (isOnColor ? 'text-black/50' : 'text-[#979797]')}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
