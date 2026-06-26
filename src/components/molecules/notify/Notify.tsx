// D22 resolved: bg-mint-100 (token), p-xl (token). Remaining gaps: text-[30px] (D22), text-[#00867b] (D19).
// text-[#00867b] = D19 tech/green. p-[30px] = indents/x. rounded-[12px] discrepancy.
import Button from '../../atoms/button/Button';

interface NotifyProps {
  text?: string;
  showButton?: boolean;
  className?: string;
}

export default function Notify({
  text = 'Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.',
  showButton = false,
  className = '',
}: NotifyProps) {
  return (
    <div className={`bg-mint-100 flex flex-col gap-s items-start p-xl rounded-[12px] w-full ${className}`}>
      <p className="font-pixel text-[30px] uppercase text-[#00867b] tracking-[-0.9px] w-full">
        {text}
      </p>
      {showButton && (
        <Button variant="on-color">More info</Button>
      )}
    </div>
  );
}
