import { Link, useLocation } from 'react-router-dom';

// Primary nav: design system layers only
const LAYERS = [
  { path: '/preview/styles',    label: 'Styles' },
  { path: '/preview/atoms',     label: 'Atoms' },
  { path: '/preview/molecules', label: 'Molecules' },
  { path: '/preview/organisms', label: 'Organisms' },
];

const activeCls   = 'text-black font-bold underline underline-offset-2';
const inactiveCls = 'text-text-subtle hover:text-black';
// D44: bumped from type-grotesk (11px) → type-h4 (15px); both grotesk family, one step up
const linkBase    = 'type-h4 uppercase tracking-[1.6px] transition-colors duration-150 whitespace-nowrap';

export default function PreviewNav() {
  const { pathname } = useLocation();
  return (
    <nav className="mb-xxl">
      <div className="flex items-center gap-xs flex-wrap">
        <Link
          to="/preview"
          className={`${linkBase} ${pathname === '/preview' ? activeCls : inactiveCls}`}
        >
          Design System
        </Link>
        {LAYERS.map(({ path, label }) => (
          <span key={path} className="flex items-center gap-xs">
            <span className="type-h4 text-text-subtle">/</span>
            <Link to={path} className={`${linkBase} ${pathname === path ? activeCls : inactiveCls}`}>
              {label}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  );
}
