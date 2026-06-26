// Token gap (D22): p-[30px] = indents/x — no spacing token. rounded-[12px] discrepancy.
interface MetricCardTallProps {
  title?: string;
  value?: string | number;
  label?: string;
  className?: string;
}

export default function MetricCardTall({
  title = 'Applications',
  value = 142,
  label = 'Total received',
  className = '',
}: MetricCardTallProps) {
  return (
    <div className={`bg-white flex flex-col gap-[90px] items-start p-[30px] rounded-[12px] w-[201px] ${className}`}>
      <p className="type-h2 text-black tracking-[-0.4px] w-full">{title}</p>
      <div className="flex flex-col gap-xs items-start w-full">
        <p className="type-h1 text-black tracking-[-0.84px] leading-[0.9] w-full">{value}</p>
        <p className="type-pixel tracking-[2px] uppercase text-black w-full">{label}</p>
      </div>
    </div>
  );
}
