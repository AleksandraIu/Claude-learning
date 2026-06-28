// D22 resolved: bg-mint-100 (--color-mint-100=#d4eee7 token exists). p-xl (--spacing-xl=30px).
// D32: added `bg` prop for custom class. D34: added `type` prop (Figma names: red/pink/violet/yellow/green).
// D35: Graph barClassName="bg-bg-page" (Figma: var(--color/background/base,#f2f2f2) + mix-blend-multiply).
// Width removed from default; pass className="w-[190px]" where a fixed width is needed.
import Graph from '../../atoms/graph/Graph';

export type MetricCardType = 'red' | 'pink' | 'violet' | 'yellow' | 'green';

const TYPE_BG: Record<MetricCardType, string> = {
  red:    'bg-pink-100',    // Figma cards/red   = #f5cfca
  pink:   'bg-rose-100',    // Figma cards/pink  = #fad5e7
  violet: 'bg-purple-100',  // Figma cards/violet= #ddd6ef
  yellow: 'bg-olive-100',   // Figma cards/yellow= #e0e2a4
  green:  'bg-mint-100',    // Figma cards/green = #d4eee7 (default)
};

interface MetricCardProps {
  type?: MetricCardType;
  title?: string;
  label?: string;
  bars?: { value: number }[];
  bg?: string;
  className?: string;
}

export default function MetricCard({
  type,
  title = 'Health',
  label = 'Overall: Good',
  bars = [{ value: 100 }, { value: 59 }],
  bg = 'bg-mint-100',
  className = '',
}: MetricCardProps) {
  const resolvedBg = type ? TYPE_BG[type] : bg;
  return (
    <div className={`${resolvedBg} flex flex-col gap-l items-start p-xl rounded-[12px] ${className}`}>
      <p className="type-h3 text-black tracking-[-0.4px] w-full">{title}</p>
      <div className="flex flex-col gap-xs items-start w-full">
        <Graph bars={bars} barClassName="bg-bg-page" />
        <p className="type-pixel tracking-[2px] uppercase text-black w-full">{label}</p>
      </div>
    </div>
  );
}
