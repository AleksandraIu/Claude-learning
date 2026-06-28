// Header: full-page header composing TopMenu + optional SecondRow.
// D33: Pipeline Bar + PIPELINE_STAGES removed — Figma 357:35619 shows no bar in header.
// D35: bg-bg-page removed (transparent), relative z-10 added — hero image renders behind header.
import TopMenu, { TopMenuTab } from '../top-menu/TopMenu';
import SecondRow, { SecondRowType } from '../second-row/SecondRow';

interface HeaderProps {
  activeTab?: TopMenuTab;
  secondRowType?: SecondRowType;
  showSecondRow?: boolean;
  className?: string;
}

export default function Header({
  activeTab = 'all',
  secondRowType = 'default',
  showSecondRow = true,
  className = '',
}: HeaderProps) {
  return (
    <div className={`relative z-10 flex flex-col items-start w-full border-b border-border ${className}`}>
      <TopMenu activeTab={activeTab} />
      {showSecondRow && <SecondRow type={secondRowType} />}
    </div>
  );
}
