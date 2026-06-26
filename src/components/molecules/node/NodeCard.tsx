// D22 resolved: bg-pink-100 (--color-pink-100=#f5cfca token exists). rounded-m ✓.
import Icons from '../../atoms/icons/Icons';

interface NodeCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function NodeCard({
  title = 'Start Trigger',
  subtitle = 'New Application received',
  className = '',
}: NodeCardProps) {
  return (
    <div className={`bg-pink-100 flex flex-col gap-l items-start p-s rounded-m w-[280px] ${className}`}>
      <div className="flex flex-col gap-s items-start w-full">
        <div className="flex items-start justify-between w-full">
          <Icons name="play" />
          <Icons name="more" />
        </div>
        <div className="flex flex-col gap-xs items-start">
          <p className="type-grotesk text-black">{title}</p>
          <p className="type-pixel tracking-[2px] uppercase text-black">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="size-[10px] rounded-full bg-[#cbcbcb]" />
        <div className="size-[10px] rounded-full bg-black" />
      </div>
    </div>
  );
}
