// Token gaps (D19): dot/text colors are tech palette not yet in @theme.
// Placeholders use Tailwind arbitrary values pending Styles-layer addition.
export type StatusVariant = 'purple' | 'green' | 'red' | 'stopped';

const config: Record<StatusVariant, { dot: string; text: string; label: string }> = {
  purple:  { dot: 'bg-[#9747ff]', text: 'text-[#9747ff]', label: 'Rocket Growth' },
  green:   { dot: 'bg-[#00867b]', text: 'text-[#00867b]', label: 'On Track'      },
  red:     { dot: 'bg-[#cc0000]', text: 'text-[#cc0000]', label: 'Failing'        },
  stopped: { dot: 'bg-[#cbcbcb]', text: 'text-[#cbcbcb]', label: 'Failing'        },
};

interface StatusProps {
  variant?: StatusVariant;
  label?: string;
  className?: string;
}

export default function Status({ variant = 'purple', label, className = '' }: StatusProps) {
  const { dot, text, label: defaultLabel } = config[variant];
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      <span className={`shrink-0 size-[5px] rounded-full ${dot}`} aria-hidden="true" />
      <span className={`type-pixel tracking-[2px] uppercase whitespace-nowrap ${text}`}>
        {label ?? defaultLabel}
      </span>
    </div>
  );
}
