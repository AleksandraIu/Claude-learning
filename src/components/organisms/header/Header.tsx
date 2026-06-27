// Header: full-page header composing TopMenu + SecondRow + pipeline Bar.
// Pipeline bar labels show recruitment stages (applied → offer).
import TopMenu, { TopMenuTab } from '../top-menu/TopMenu';
import SecondRow, { SecondRowType } from '../second-row/SecondRow';
import Bar from '../../atoms/bar/Bar';

const PIPELINE_STAGES = ['applied', 'screening', 'interviewed', 'testing', 'offered', 'onboarding', 'hired', 'onboarded'];

interface HeaderProps {
  activeTab?: TopMenuTab;
  secondRowType?: SecondRowType;
  showSecondRow?: boolean;
  pipelineValue?: number;
  className?: string;
}

export default function Header({
  activeTab = 'all',
  secondRowType = 'default',
  showSecondRow = true,
  pipelineValue = 75,
  className = '',
}: HeaderProps) {
  return (
    <div className={`flex flex-col items-start w-full bg-bg-page border-b border-border ${className}`}>
      <TopMenu activeTab={activeTab} />

      {showSecondRow && <SecondRow type={secondRowType} />}

      {/* Pipeline progress bar with stage labels — D26: pt=0 pb=0 per Figma 357:35619 Frame 1382 */}
      <div className="flex flex-col gap-xs px-m w-full">
        <Bar value={pipelineValue} size="big" className="w-full" />
        <div className="flex items-start justify-between w-full">
          {PIPELINE_STAGES.map(stage => (
            <span key={stage} className="type-caps tracking-[1.6px] uppercase text-[#979797]">{stage}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
