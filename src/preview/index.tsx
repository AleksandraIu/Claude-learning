import { Link } from 'react-router-dom';

const layers = [
  {
    path: '/preview/styles',
    label: 'Styles',
    status: 'done' as const,
    desc: 'Colors · Typography · Spacing · Radius',
  },
  {
    path: '/preview/atoms',
    label: 'Atoms',
    status: 'done' as const,
    desc: '16 atoms — Button, Input, Dropdown, Avatar, Tag, Status…',
  },
  {
    path: '/preview/molecules',
    label: 'Molecules',
    status: 'done' as const,
    desc: '10 molecules — Profile, Campaign, Team, Attempt, Notify…',
  },
  {
    path: '/preview/organisms',
    label: 'Organisms',
    status: 'done' as const,
    desc: '6 organisms — SecondRow, TopMenu, Header, Kanban, Task, CardHeader',
  },
];

const pages = [
  {
    path: '/preview/pages/screen-all-teams-a',
    label: 'All Teams A',
    desc: 'Header · CardHeader(variant2) · 4×MetricCard · 6×Team',
  },
  {
    path: '/preview/pages/screen-all-teams-single',
    label: 'All Teams Single',
    desc: 'Header · CardHeader(variant2) · Notify · Team list (10×Profile)',
  },
  {
    path: '/preview/pages/screen-candidate-b',
    label: 'Candidate B',
    desc: 'Header · CardHeader(variant2) · Notify · Achievements · Personal Dev · Reports',
  },
];

function LayerCard({ path, label, status, desc }: typeof layers[0]) {
  return (
    <Link
      to={path}
      className="block border border-border rounded-l p-l transition-all duration-150 hover:border-black hover:shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between mb-xs">
        <span className="type-h3">{label}</span>
        {/* Badge only for exceptions — hidden when done */}
        {status !== 'done' && (
          <span className="type-caps px-xs py-xxxs rounded-over bg-bg-subtle text-text-subtle">
            in progress
          </span>
        )}
      </div>
      <p className="type-h4 text-text-subtle leading-h3">{desc}</p>
    </Link>
  );
}

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-4xl mx-auto">
        <p className="type-caps text-text-subtle mb-m tracking-widest">Design System</p>
        <h1 className="type-h1 mb-xxs">Preview</h1>
        <p className="type-grotesk text-text-subtle mb-xxl">Select a layer to inspect tokens and components.</p>

        <div className="flex flex-col gap-m mb-xxl">
          {layers.map(layer => <LayerCard key={layer.path} {...layer} />)}
        </div>

        {/* Pages — secondary hierarchy: examples, not system layers */}
        <h2 className="type-h4 text-text-subtle mb-m pb-xxs border-b border-border uppercase tracking-[1.6px]">Pages</h2>
        <div className="flex flex-col gap-xxs mb-xxl">
          {pages.map(({ path, label, desc }) => (
            <Link
              key={path}
              to={path}
              className="flex items-baseline gap-m border-l-2 border-border pl-m py-xs hover:border-black transition-colors duration-150 cursor-pointer group"
            >
              <span className="type-h4 text-black group-hover:underline whitespace-nowrap shrink-0">{label}</span>
              <span className="type-grotesk text-text-subtle leading-h3">{desc}</span>
            </Link>
          ))}
        </div>

        {/* Release Notes — system doc, reachable from index since removed from breadcrumb nav */}
        <h2 className="type-h4 text-text-subtle mb-m pb-xxs border-b border-border uppercase tracking-[1.6px]">Release Notes</h2>
        <Link
          to="/preview/release-notes"
          className="flex items-baseline gap-m border-l-2 border-border pl-m py-xs hover:border-black transition-colors duration-150 cursor-pointer group"
        >
          <span className="type-h4 text-black group-hover:underline whitespace-nowrap shrink-0">Release Notes</span>
          <span className="type-grotesk text-text-subtle leading-h3">Running log of every step, decision, and change in this migration</span>
        </Link>
      </div>
    </div>
  );
}
