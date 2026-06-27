import Avatar from '../../atoms/avatar/Avatar';
import Status from '../../atoms/status/Status';
import Bar from '../../atoms/bar/Bar';

export type ProfileVariant = 'long' | 'short' | 'short-outlined';

interface ProfileProps {
  variant?: ProfileVariant;
  name?: string;
  role?: string;
  barValue?: number;
  className?: string;
}

export default function Profile({
  variant = 'long',
  name = 'Sarah Johnson',
  role = 'Senior Developer',
  barValue = 37,
  className = '',
}: ProfileProps) {
  if (variant === 'short' || variant === 'short-outlined') {
    const bg = variant === 'short' ? 'bg-peach-100' : 'bg-gray-100';
    return (
      <div className={`flex gap-s items-center ${bg} p-s rounded-s ${className}`}>
        <Avatar variant="katya" className="shrink-0" />
        <div className="flex flex-col gap-xs items-start">
          <p className="type-h3 text-black tracking-[-0.4px] whitespace-nowrap">{name}</p>
          <p className="type-pixel tracking-[2px] uppercase text-black whitespace-nowrap">{role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-s items-start border-b border-gray-100 py-s w-full ${className}`}>
      <Avatar variant="katya" className="shrink-0" />
      <div className="flex items-start justify-between w-[333px] shrink-0">
        <div className="flex flex-col gap-xs items-start">
          <p className="type-h3 text-black tracking-[-0.4px] whitespace-nowrap">{name}</p>
          <p className="type-pixel tracking-[2px] uppercase text-black whitespace-nowrap">{role}</p>
        </div>
        <Status variant="green" />
      </div>
      <Bar value={barValue} size="default" color="green" className="flex-1 min-w-0" />
    </div>
  );
}
