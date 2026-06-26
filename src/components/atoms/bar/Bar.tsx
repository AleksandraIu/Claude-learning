// Bar: segmented progress indicator. Dots filled left-to-right.
// Figma 357:33708 (default): single row of 5×5px dots, gap-xxxs between columns.
// Figma 357:34112 (big): two 5×5px dots stacked per column (gap-xxxs between rows), same gap-xxxs between columns.
// Token gaps (D19): fill #b8c6c3 (bar/on-base-filled), green fill #00867b (text-icon-green),
//   dot size 5px (no spacing token), rounded-[20px] (no matching radius token).
// Green empty uses bg-mint-100 (token exists).
export type BarSize  = 'default' | 'big';
export type BarColor = 'default' | 'green';

interface BarProps {
  value?: number;   // 0–100
  size?: BarSize;
  color?: BarColor;
  total?: number;   // dot count; default 100
  className?: string;
}

const DOT_PX = 5; // D19 gap — no 5px spacing token

export default function Bar({ value = 75, size = 'default', color = 'default', total = 100, className = '' }: BarProps) {
  const filled = Math.round((Math.min(100, Math.max(0, value)) / 100) * total);
  const filledCls = color === 'green' ? 'bg-[#00867b]' : 'bg-[#b8c6c3]';
  const emptyCls  = color === 'green' ? 'bg-mint-100'  : 'bg-white';

  return (
    <div
      className={`flex gap-xxxs items-start ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex flex-col gap-xxxs shrink-0">
          <span
            className={`rounded-[20px] ${i < filled ? filledCls : emptyCls}`}
            style={{ width: DOT_PX, height: DOT_PX }}
          />
          {size === 'big' && (
            <span
              className={`rounded-[20px] ${i < filled ? filledCls : emptyCls}`}
              style={{ width: DOT_PX, height: DOT_PX }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
