// Token gap (D19): bar color #979797 (secondary) not in tokens.
interface GraphBar {
  value: number; // 0–100, relative height percentage
}

interface GraphProps {
  bars?: GraphBar[];
  className?: string;
}

const DEFAULT_BARS: GraphBar[] = [{ value: 100 }, { value: 58 }];

export default function Graph({ bars = DEFAULT_BARS, className = '' }: GraphProps) {
  const maxH = 82; // px — matches Figma proportions
  return (
    <div className={`flex gap-xxxs items-end w-[143px] ${className}`}>
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 min-w-0 rounded-s bg-[#979797] mix-blend-multiply"
          style={{ height: `${Math.round((bar.value / 100) * maxH)}px` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
