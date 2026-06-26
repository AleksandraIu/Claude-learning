// Token gap (D19): secondary text #979797 not in tokens. (D22): p-[30px], rounded-[12px].
import Status from '../../atoms/status/Status';

export type AttemptVariant = 'first' | 'next';

interface SalaryColumn {
  salary: string;
  perks: string[];
}

interface AttemptProps {
  variant?: AttemptVariant;
  left?: SalaryColumn;
  right?: SalaryColumn;
  className?: string;
}

const FIRST_LEFT: SalaryColumn = {
  salary: '$8 750',
  perks: ['Lead Role', 'Cookies', 'Free Education'],
};
const FIRST_RIGHT: SalaryColumn = {
  salary: '$12 750',
  perks: ['Lead Role', 'Remote-work', 'Gym'],
};
const NEXT_LEFT: SalaryColumn = {
  salary: '$?',
  perks: ['Lead Role', 'Cookies', 'Gym'],
};
const NEXT_RIGHT: SalaryColumn = {
  salary: '$?',
  perks: ['Lead Role', 'Cookies', 'Gym'],
};

function SalaryCol({ salary, perks }: SalaryColumn) {
  return (
    <div className="flex flex-col gap-s items-start w-[290px]">
      <p className="type-h2 text-black tracking-[-0.4px] w-full">{salary}</p>
      <div className="flex flex-col gap-xs items-start w-full">
        {perks.map(p => (
          <p key={p} className="type-pixel tracking-[2px] uppercase text-[#979797] w-full">{p}</p>
        ))}
      </div>
    </div>
  );
}

export default function Attempt({
  variant = 'first',
  left,
  right,
  className = '',
}: AttemptProps) {
  const isFirst = variant === 'first';
  const l = left  ?? (isFirst ? FIRST_LEFT  : NEXT_LEFT);
  const r = right ?? (isFirst ? FIRST_RIGHT : NEXT_RIGHT);

  return (
    <div className={`bg-white flex flex-col gap-l items-start p-[30px] rounded-[12px] w-full ${className}`}>
      <p className="type-pixel tracking-[2px] uppercase text-black whitespace-nowrap">
        {isFirst ? 'first attempt' : 'next attempt'}
      </p>
      <div className="flex items-start justify-between w-full">
        <SalaryCol {...l} />
        {isFirst && <Status variant="red" />}
        <SalaryCol {...r} />
      </div>
    </div>
  );
}
