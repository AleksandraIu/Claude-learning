// D19: bar color #979797 not in tokens (default for standalone Graph atom).
// D35: barClassName prop added — MetricCard passes bg-bg-page per Figma 357:58937-58940
//   (all types use var(--color/background/base, #f2f2f2) + mix-blend-multiply).
//   mix-blend-multiply always applied; on white bg #979797*white=#979797 (no visual change).
interface GraphBar {
  value: number; // 0–100, relative height percentage
}

interface GraphProps {
  bars?: GraphBar[];
  barClassName?: string;
  className?: string;
}

const DEFAULT_BARS: GraphBar[] = [{ value: 100 }, { value: 58 }];

export default function Graph({ bars = DEFAULT_BARS, barClassName, className = '' }: GraphProps) {
  const barCls = barClassName ?? 'bg-[#979797]';
  const maxH = 82; // px — matches Figma proportions
  return (
    <div className={`flex gap-xxxs items-end w-[143px] ${className}`}>
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`flex-1 min-w-0 rounded-s ${barCls} mix-blend-multiply`}
          style={{ height: `${Math.round((bar.value / 100) * maxH)}px` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
