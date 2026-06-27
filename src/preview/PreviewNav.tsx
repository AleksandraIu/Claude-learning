import { Link, useLocation } from 'react-router-dom';

const LAYERS = [
  { path: '/preview/styles',    label: 'Styles' },
  { path: '/preview/atoms',     label: 'Atoms' },
  { path: '/preview/molecules', label: 'Molecules' },
  { path: '/preview/organisms', label: 'Organisms' },
];

export default function PreviewNav() {
  const { pathname } = useLocation();
  return (
    <nav className="flex items-center gap-xs flex-wrap mb-xxl">
      <Link
        to="/preview"
        className="type-grotesk uppercase tracking-[1.6px] text-[#979797] hover:text-black transition-colors duration-150 whitespace-nowrap"
      >
        Design System
      </Link>
      {LAYERS.map(({ path, label }) => (
        <span key={path} className="flex items-center gap-xs">
          <span className="type-grotesk text-[#979797]">/</span>
          <Link
            to={path}
            className={`type-grotesk uppercase tracking-[1.6px] transition-colors duration-150 whitespace-nowrap ${
              pathname === path
                ? 'text-black font-bold underline underline-offset-2'
                : 'text-[#979797] hover:text-black'
            }`}
          >
            {label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
