// Token gaps (D22): p-[30px] = indents/x no spacing token; rounded-[12px] = rounds/l discrepancy.
import Status from '../../atoms/status/Status';
import Button from '../../atoms/button/Button';

interface Stat {
  value: string | number;
  label: string;
}

interface CampaignPreviewProps {
  title?: string;
  stats?: Stat[];
  showStatus?: boolean;
  showButton?: boolean;
  className?: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: 142, label: 'applied' },
  { value: 89,  label: 'rejected' },
  { value: 282, label: 'in progress' },
  { value: 31,  label: 'final round' },
  { value: 4,   label: 'offers sent' },
];

export default function CampaignPreview({
  title = 'Senior DevOps',
  stats = DEFAULT_STATS,
  showStatus = true,
  showButton = true,
  className = '',
}: CampaignPreviewProps) {
  return (
    <div className={`bg-white flex flex-col gap-[90px] items-start p-[30px] rounded-[12px] w-full ${className}`}>
      <div className="flex items-center justify-between w-full">
        <p className="type-h2 text-black tracking-[-0.4px] whitespace-nowrap">{title}</p>
        <div className="flex gap-s items-center">
          {showStatus && <Status variant="green" />}
          {showButton && <Button variant="secondary">More info</Button>}
        </div>
      </div>
      <div className="flex flex-col gap-xs items-start w-full">
        <div className="flex items-start justify-between w-full">
          {stats.map((s, i) => (
            <p key={i} className="type-h1 text-black tracking-[-0.84px] leading-[0.9] flex-1">
              {s.value}
            </p>
          ))}
        </div>
        <div className="flex items-start justify-between w-full">
          {stats.map((s, i) => (
            <p key={i} className="type-caps tracking-[1.6px] uppercase text-black flex-1">
              {s.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
