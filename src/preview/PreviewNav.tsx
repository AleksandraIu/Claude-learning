import { Link, useLocation } from 'react-router-dom';

// Primary nav: design system layers + release notes
const LAYERS = [
  { path: '/preview/styles',         label: 'Styles' },
  { path: '/preview/atoms',          label: 'Atoms' },
  { path: '/preview/molecules',      label: 'Molecules' },
  { path: '/preview/organisms',      label: 'Organisms' },
  { path: '/preview/release-notes',  label: 'Release Notes' },
];

// Secondary nav: example screens only (not peers to layers)
const SCREENS = [
  { path: '/preview/pages/screen-all-teams-a',      label: 'All Teams A' },
  { path: '/preview/pages/screen-all-teams-single', label: 'All Teams Single' },
  { path: '/preview/pages/screen-candidate-b',      label: 'Candidate B' },
];

const activeCls   = 'text-black font-bold underline underline-offset-2';
const inactiveCls = 'text-text-subtle hover:text-black';
const linkBase    = 'type-grotesk uppercase tracking-[1.6px] transition-colors duration-150 whitespace-nowrap';

// Lighter style for secondary screen links
const screenActiveCls   = 'text-black underline underline-offset-2';
const screenInactiveCls = 'text-text-subtle hover:text-black';
const screenLinkBase    = 'type-caps tracking-[1.6px] transition-colors duration-150 whitespace-nowrap';

export default function PreviewNav() {
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col gap-xxs mb-xxl">
      {/* Primary: layers + release notes */}
      <div className="flex items-center gap-xs flex-wrap">
        <Link
          to="/preview"
          className={`${linkBase} ${pathname === '/preview' ? activeCls : inactiveCls}`}
        >
          Design System
        </Link>
        {LAYERS.map(({ path, label }) => (
          <span key={path} className="flex items-center gap-xs">
            <span className="type-grotesk text-text-subtle">/</span>
            <Link to={path} className={`${linkBase} ${pathname === path ? activeCls : inactiveCls}`}>
              {label}
            </Link>
          </span>
        ))}
      </div>

      {/* Secondary: example screens — visually subordinate */}
      <div className="flex items-center gap-xs flex-wrap pl-0">
        <span className="type-caps tracking-[1.6px] text-text-subtle">Pages ›</span>
        {SCREENS.map(({ path, label }, i) => (
          <span key={path} className="flex items-center gap-xs">
            {i > 0 && <span className="type-caps text-text-subtle">·</span>}
            <Link
              to={path}
              className={`${screenLinkBase} ${pathname === path ? screenActiveCls : screenInactiveCls}`}
            >
              {label}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  );
}
