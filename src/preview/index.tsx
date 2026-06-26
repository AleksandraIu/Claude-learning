import { Link } from 'react-router-dom';

const layers = [
  {
    path: '/preview/styles',
    label: 'Styles',
    badge: 'Live',
    desc: 'Colors · Typography · Spacing · Radius',
    ready: true,
  },
  {
    path: '/preview/atoms',
    label: 'Atoms',
    badge: 'Live',
    desc: '16 atoms — Button, Input, Dropdown, Avatar, Tag, Status…',
    ready: true,
  },
  {
    path: '/preview/molecules',
    label: 'Molecules',
    badge: 'Live',
    desc: '10 molecules — Profile, Campaign, Team, Attempt, Notify…',
    ready: true,
  },
  {
    path: '/preview/organisms',
    label: 'Organisms',
    badge: 'Live',
    desc: '7 organisms — MenuSwitch, SecondRow, TopMenu, Header, Kanban, Task, CardHeader',
    ready: true,
  },
];

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-bg text-text p-xxl">
      <div className="max-w-4xl mx-auto">
        <p className="type-caps text-border mb-m tracking-widest">Design System</p>
        <h1 className="type-h1 mb-xxs">Preview</h1>
        <p className="type-grotesk text-border mb-xxl">Select a layer to inspect tokens and components.</p>

        <div className="grid gap-m" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {layers.map(({ path, label, badge, desc, ready }) => (
            <Link
              key={path}
              to={path}
              className={[
                'block border border-border rounded-l p-l transition-all duration-150',
                ready
                  ? 'hover:border-black hover:shadow-sm cursor-pointer'
                  : 'opacity-40 pointer-events-none select-none',
              ].join(' ')}
            >
              <div className="flex items-center justify-between mb-xs">
                <span className="type-h3">{label}</span>
                <span
                  className={[
                    'type-caps px-xs py-xxxs rounded-over',
                    ready ? 'bg-primary text-black' : 'bg-bg-subtle text-border',
                  ].join(' ')}
                >
                  {badge}
                </span>
              </div>
              <p className="type-grotesk" style={{ color: '#6b6b6b' }}>{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
