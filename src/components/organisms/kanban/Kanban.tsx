// Token gaps (D22): p-xl used for p-[30px] (xl=30px token ✓), rounded-[12px] = rounds/l discrepancy.
// D24: gap-[50px] between title and board — no token (xl=30, xxl=60; 50 is between them).
import Avatar from '../../atoms/avatar/Avatar';

interface KanbanCard {
  name: string;
  role: string;
}

interface KanbanColumn {
  title: string;
  count: number;
  cards: KanbanCard[];
}

interface KanbanProps {
  headline?: string;
  columns?: KanbanColumn[];
  className?: string;
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  {
    title: 'Applied', count: 4,
    cards: [
      { name: 'Michael Thompson', role: 'Product Manager' },
      { name: 'Emily Carter',     role: 'UX Designer' },
      { name: 'James Wilson',     role: 'Data Analyst' },
      { name: 'Olivia Brown',     role: 'Marketing Specialist' },
    ],
  },
  {
    title: 'Screening', count: 6,
    cards: [
      { name: 'Michael Thompson', role: 'Project Manager' },
      { name: 'Emily Davis',      role: 'UX Designer' },
      { name: 'David Garcia',     role: 'Data Analyst' },
      { name: 'Jessica Martinez', role: 'Marketing Specialist' },
      { name: 'Daniel Lee',       role: 'Systems Administrator' },
      { name: 'Laura Wilson',     role: 'Product Owner' },
    ],
  },
  {
    title: 'Interview', count: 3,
    cards: [
      { name: 'Michael Thompson', role: 'Product Manager' },
      { name: 'Jessica Williams', role: 'UI/UX Designer' },
      { name: 'David Brown',      role: 'Data Scientist' },
    ],
  },
  {
    title: 'Offer', count: 1,
    cards: [
      { name: 'Sophia Martinez', role: 'UX Designer' },
    ],
  },
];

export default function Kanban({ headline = 'Pipeline', columns = DEFAULT_COLUMNS, className = '' }: KanbanProps) {
  // D24: gap-[50px] not in tokens (xl=30, xxl=60); pb-[84px] = Figma pb-[var(--font/size/h1)]
  return (
    <div className={`flex flex-col items-center gap-[50px] pb-[84px] px-xl w-full ${className}`}>
      <p className="type-h1 text-black text-center tracking-[-0.84px] w-[830px] leading-[0.9]">{headline}</p>

      <div className="bg-white flex gap-l items-start p-xl rounded-[12px] w-full">
        {columns.map(col => (
          <div key={col.title} className="flex flex-col gap-m items-start flex-1 min-w-0">
            {/* Column header */}
            <div className="flex items-start justify-between w-full whitespace-nowrap">
              <span className="type-h2 text-black tracking-[-0.4px]">{col.title}</span>
              <span className="type-h2 text-[#cbcbcb] tracking-[-0.4px]">{col.count}</span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-xxxs items-start w-full">
              {col.cards.map((card, i) => (
                <div key={i} className="bg-gray-100 flex gap-s items-start p-s rounded-s w-full min-w-0">
                  <Avatar variant="katya" className="shrink-0" />
                  <div className="flex flex-col gap-xs items-start min-w-0">
                    <p className="type-h3 text-black tracking-[-0.4px]">{card.name}</p>
                    <p className="type-pixel tracking-[2px] uppercase text-black">{card.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
