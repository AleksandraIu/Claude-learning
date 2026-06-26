// Bar: segmented progress indicator. Dots filled left-to-right.
// Token gaps: fill #b8c6c3 (bar/on-base-filled D19), green fill #00867b (text-icon-green D19).
// Dot sizes: default=5px, big=12px. Green empty uses bg-mint-100 (token exists).
export type BarSize  = 'default' | 'big';
export type BarColor = 'default' | 'green';

interface BarProps {
  value?: number;   // 0–100
  size?: BarSize;
  color?: BarColor;
  total?: number;   // dot count; default 100
  className?: string;
}

export default function Bar({ value = 75, size = 'default', color = 'default', total = 100, className = '' }: BarProps) {
  const dotPx  = size  === 'big'   ? 12 : 5;
  const filled = Math.round((Math.min(100, Math.max(0, value)) / 100) * total);
  // green: filled=dark-teal (#00867b D19), empty=mint-100 (token).
  // default: filled=#b8c6c3 (D19), empty=white.
  const filledCls = color === 'green' ? 'bg-[#00867b]' : 'bg-[#b8c6c3]';
  const emptyCls  = color === 'green' ? 'bg-mint-100'  : 'bg-white';

  return (
    <div
      className={`flex gap-xxxs items-center ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`shrink-0 rounded-[20px] ${i < filled ? filledCls : emptyCls}`}
          style={{ width: dotPx, height: dotPx }}
        />
      ))}
    </div>
  );
}
