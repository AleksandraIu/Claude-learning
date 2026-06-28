import { Link } from 'react-router-dom';

const layers = [
  {
    path: '/preview/styles',
    label: 'Styles',
    badge: 'done',
    status: 'done' as const,
    desc: 'Colors · Typography · Spacing · Radius',
  },
  {
    path: '/preview/atoms',
    label: 'Atoms',
    badge: 'done',
    status: 'done' as const,
    desc: '16 atoms — Button, Input, Dropdown, Avatar, Tag, Status…',
  },
  {
    path: '/preview/molecules',
    label: 'Molecules',
    badge: 'done',
    status: 'done' as const,
    desc: '10 molecules — Profile, Campaign, Team, Attempt, Notify…',
  },
  {
    path: '/preview/organisms',
    label: 'Organisms',
    badge: 'done',
    status: 'done' as const,
    desc: '6 organisms — SecondRow, TopMenu, Header, Kanban, Task, CardHeader',
  },
];

const pages = [
  {
    path: '/preview/pages/screen-all-teams-a',
    label: 'All Teams A',
    desc: 'Header · CardHeader(default) · 4×MetricCard · 6×Team',
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
  {
    path: '/preview/release-notes',
    label: 'Release Notes',
    desc: 'Auto-rendered from NOTES.md — full step history',
  },
];

function LayerCard({ path, label, badge, status, desc }: typeof layers[0]) {
  return (
    <Link
      to={path}
      className="block border border-border rounded-l p-l transition-all duration-150 hover:border-black hover:shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between mb-xs">
        <span className="type-h3">{label}</span>
        <span
          className={[
            'type-caps px-xs py-xxxs rounded-over',
            status === 'done' ? 'bg-primary text-black' : 'bg-bg-subtle text-black/50',
          ].join(' ')}
        >
          {badge}
        </span>
      </div>
      <p className="type-grotesk leading-h3 text-black/50">{desc}</p>
    </Link>
  );
}

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-4xl mx-auto">
        <p className="type-caps text-black/50 mb-m tracking-widest">Design System</p>
        <h1 className="type-h1 mb-xxs">Preview</h1>
        <p className="type-grotesk text-black/50 mb-xxl">Select a layer to inspect tokens and components.</p>

        <div className="flex flex-col gap-m mb-xxl">
          {layers.map(layer => <LayerCard key={layer.path} {...layer} />)}
        </div>

        <h2 className="type-h3 text-black mb-m pb-xxs border-b border-border">Pages</h2>
        <div className="flex flex-col gap-m">
          {pages.map(({ path, label, desc }) => (
            <Link
              key={path}
              to={path}
              className="block border border-border rounded-l p-l transition-all duration-150 hover:border-black hover:shadow-sm cursor-pointer"
            >
              <p className="type-h3 mb-xs">{label}</p>
              <p className="type-grotesk leading-h3 text-black/50">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
