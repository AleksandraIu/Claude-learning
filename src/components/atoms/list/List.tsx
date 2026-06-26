import Button from '../button/Button';

interface ListProps {
  name?: string;
  type?: string;
  createdBy?: string;
  date?: string;
  onEdit?: () => void;
  className?: string;
}

export default function List({
  name = 'Sarah Johnson',
  type = 'Document',
  createdBy = 'Created by Alan',
  date = '24.05.2025',
  onEdit,
  className = '',
}: ListProps) {
  return (
    <div className={`flex gap-s items-center py-s border-b border-gray-100 w-full ${className}`}>
      <p className="flex-1 min-w-0 type-h3 text-black tracking-[-0.4px]">{name}</p>
      <p className="type-pixel tracking-[2px] uppercase text-black w-[114px] shrink-0">{type}</p>
      <p className="type-pixel tracking-[2px] uppercase text-black w-[162px] shrink-0">{createdBy}</p>
      <p className="type-pixel tracking-[2px] uppercase text-black text-right w-[74px] shrink-0">{date}</p>
      <Button variant="secondary" onClick={onEdit} className="shrink-0">
        Edit
      </Button>
    </div>
  );
}
