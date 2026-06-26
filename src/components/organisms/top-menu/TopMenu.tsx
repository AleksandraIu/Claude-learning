// TopMenu: app-level navigation bar (Hired & Wired HR app).
// Renders on dark/colored surface — uses white border-b.
import Button from '../../atoms/button/Button';
import MenuSwitch from '../menu-switch/MenuSwitch';

export type TopMenuTab = 'all' | 'templates' | 'off';

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
    <div className={`flex items-center justify-between px-m py-s border-b border-white w-full ${className}`}>
      {/* Left: logo + nav tabs */}
      <div className="flex items-center gap-xxl">
        <p className="type-h2 text-black whitespace-nowrap tracking-[-0.4px]">Hired &amp; Wired</p>

        <div className="flex items-center gap-m">
          <Button variant="secondary" onClick={onReport}>Generate report</Button>

          <div className="flex items-center gap-xxxs">
            <MenuSwitch active={activeTab === 'all'} onClick={() => onTabChange?.('all')}>
              All teams
            </MenuSwitch>
            <MenuSwitch active={activeTab === 'templates'} onClick={() => onTabChange?.('templates')}>
              All templates
            </MenuSwitch>
          </div>
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
