// Token gaps (D22): bg #d4eee7 = cards/green — no token. p-[30px] = indents/x.
// rounded-[12px] = rounds/l discrepancy (D22).
import Bar from '../../atoms/bar/Bar';
import AvatarGroup from '../../atoms/avatar-group/AvatarGroup';

interface TeamProps {
  name?: string;
  memberCount?: number;
  productivity?: number;
  weekHighlight?: string;
  extraCount?: number;
  className?: string;
}

export default function Team({
  name = 'Engineering Team',
  memberCount = 24,
  productivity = 89,
  weekHighlight = 'Petya was drinking too much tea this week',
  extraCount = 21,
  className = '',
}: TeamProps) {
  return (
    <div className={`bg-white flex flex-col gap-l items-start p-[30px] rounded-[12px] w-[462px] ${className}`}>
      <div className="flex items-end justify-between w-full">
        <p className="type-h3 text-black tracking-[-0.4px] whitespace-nowrap">{name}</p>
        <p className="type-pixel tracking-[2px] uppercase text-black whitespace-nowrap">{memberCount} people</p>
      </div>

      <div className="flex flex-col gap-xs items-start w-full overflow-hidden">
        <div className="flex items-start justify-between w-full">
          <p className="type-caps tracking-[1.6px] uppercase text-[#cbcbcb]">Productivity</p>
          <p className="type-caps tracking-[1.6px] uppercase text-black">{productivity}%</p>
        </div>
        <Bar value={productivity} size="default" color="green" className="w-full" />
      </div>

      <div className="flex flex-col gap-xs items-start w-[246px]">
        <p className="type-caps tracking-[1.6px] uppercase text-[#cbcbcb]">Week highlight:</p>
        <p className="type-pixel tracking-[2px] uppercase text-black">{weekHighlight}</p>
      </div>

      <div className="flex gap-s items-center">
        <AvatarGroup />
        <p className="type-pixel tracking-[2px] uppercase text-black whitespace-nowrap">+{extraCount} more</p>
      </div>
    </div>
  );
}
