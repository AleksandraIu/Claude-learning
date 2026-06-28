import { Link, useLocation } from 'react-router-dom';

const LAYERS = [
  { path: '/preview/styles',    label: 'Styles' },
  { path: '/preview/atoms',     label: 'Atoms' },
  { path: '/preview/molecules', label: 'Molecules' },
  { path: '/preview/organisms', label: 'Organisms' },
];

const PAGES = [
  { path: '/preview/pages/screen-all-teams-a',      label: 'All Teams A' },
  { path: '/preview/pages/screen-all-teams-single', label: 'All Teams Single' },
  { path: '/preview/pages/screen-candidate-b',      label: 'Candidate B' },
  { path: '/preview/release-notes',                 label: 'Release Notes' },
];

const activeCls = 'text-black font-bold underline underline-offset-2';
const inactiveCls = 'text-[#979797] hover:text-black';
const linkBase = 'type-grotesk uppercase tracking-[1.6px] transition-colors duration-150 whitespace-nowrap';

export default function PreviewNav() {
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col gap-xs mb-xxl">
      {/* Layer breadcrumb */}
      <div className="flex items-center gap-xs flex-wrap">
        <Link to="/preview" className={`${linkBase} ${pathname === '/preview' ? activeCls : inactiveCls}`}>
          Design System
        </Link>
        {LAYERS.map(({ path, label }) => (
          <span key={path} className="flex items-center gap-xs">
            <span className="type-grotesk text-[#979797]">/</span>
            <Link to={path} className={`${linkBase} ${pathname === path ? activeCls : inactiveCls}`}>
              {label}
            </Link>
          </span>
        ))}
      </div>

      {/* Pages section */}
      <div className="flex items-center gap-xs flex-wrap">
        <span className={`${linkBase} text-[#979797]`}>Pages</span>
        {PAGES.map(({ path, label }) => (
          <span key={path} className="flex items-center gap-xs">
            <span className="type-grotesk text-[#979797]">/</span>
            <Link to={path} className={`${linkBase} ${pathname === path ? activeCls : inactiveCls}`}>
              {label}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  );
}
