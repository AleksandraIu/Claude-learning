// TopMenu: app-level navigation bar (Hired & Wired HR app).
// D31: bg-bg-page (F2F2F2) — border-b border-border replaces white border.
// D26: Generate Report bg = bg-bg (white per Figma 357:35588), not gray-100 (secondary).
import SwitchGroup from '../../atoms/switch-group/SwitchGroup';

export type TopMenuTab = 'all' | 'templates';

interface TopMenuProps {
  activeTab?: TopMenuTab;
  onTabChange?: (tab: TopMenuTab) => void;
  onReport?: () => void;
  onProfile?: () => void;
  onLogout?: () => void;
  className?: string;
}

export default function TopMenu({
  activeTab = 'all',
  onTabChange,
  onReport,
  onProfile,
  onLogout,
  className = '',
}: TopMenuProps) {
  return (
    <div className={`flex items-center justify-between px-m py-s border-b border-border w-full ${className}`}>
      {/* Left: logo + nav tabs */}
      <div className="flex items-center gap-xxl">
        <p className="type-h2 text-black whitespace-nowrap tracking-[-0.4px]">Hired &amp; Wired</p>

        <div className="flex items-center gap-m">
          <button
            type="button"
            onClick={onReport}
            className="inline-flex h-8 items-center justify-center px-s py-xs rounded-over bg-bg hover:bg-bg-subtle transition-all duration-150 ease-in-out"
          >
            <span className="type-pixel tracking-[2px] uppercase whitespace-nowrap text-text">Generate report</span>
          </button>

          <SwitchGroup
            items={[{ label: 'All teams' }, { label: 'All templates' }]}
            activeIndex={activeTab === 'all' ? 0 : 1}
            onSelect={(i) => onTabChange?.(i === 0 ? 'all' : 'templates')}
          />
        </div>
      </div>

      {/* Right: user links */}
      <div className="flex items-center gap-xs">
        <button type="button" onClick={onProfile} className="type-grotesk text-black hover:opacity-70 transition-opacity duration-150 whitespace-nowrap">
          Profile
        </button>
        <button type="button" onClick={onLogout} className="type-grotesk text-black hover:opacity-70 transition-opacity duration-150 whitespace-nowrap">
          Log out
        </button>
      </div>
    </div>
  );
}
