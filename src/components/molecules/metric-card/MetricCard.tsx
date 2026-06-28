// D22 resolved: bg-mint-100 (--color-mint-100=#d4eee7 token exists). p-xl (--spacing-xl=30px).
// Graph bars on green card use bg-[#f2f2f2] in Figma; our Graph atom uses #979797 — acceptable close.
// D32: added `bg` prop so screens can pass different card colors (pink-100, rose-100, etc.) — all existing tokens.
// Width removed from default; pass className="w-[190px]" where a fixed width is needed.
import Graph from '../../atoms/graph/Graph';

interface MetricCardProps {
  title?: string;
  label?: string;
  bars?: { value: number }[];
  bg?: string;
  className?: string;
}

export default function MetricCard({
  title = 'Health',
  label = 'Overall: Good',
  bars = [{ value: 100 }, { value: 59 }],
  bg = 'bg-mint-100',
  className = '',
}: MetricCardProps) {
  return (
    <div className={`${bg} flex flex-col gap-l items-start p-xl rounded-[12px] ${className}`}>
      <p className="type-h3 text-black tracking-[-0.4px] w-full">{title}</p>
      <div className="flex flex-col gap-xs items-start w-full">
        <Graph bars={bars} />
        <p className="type-pixel tracking-[2px] uppercase text-black w-full">{label}</p>
      </div>
    </div>
  );
}
