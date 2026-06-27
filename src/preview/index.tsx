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
    badge: 'in progress',
    status: 'in-progress' as const,
    desc: '6 organisms — SecondRow, TopMenu, Header, Kanban, Task, CardHeader',
  },
];

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-4xl mx-auto">
        <p className="type-caps text-black/50 mb-m tracking-widest">Design System</p>
        <h1 className="type-h1 mb-xxs">Preview</h1>
        <p className="type-grotesk text-black/50 mb-xxl">Select a layer to inspect tokens and components.</p>

        <div className="flex flex-col gap-m">
          {layers.map(({ path, label, badge, status, desc }) => (
            <Link
              key={path}
              to={path}
              className="block border border-border rounded-l p-l transition-all duration-150 hover:border-black hover:shadow-sm cursor-pointer"
            >
              <div className="flex items-center justify-between mb-xs">
                <span className="type-h3">{label}</span>
                <span
                  className={[
                    'type-caps px-xs py-xxxs rounded-over',
                    status === 'done'
                      ? 'bg-primary text-black'
                      : 'bg-bg-subtle text-black/50',
                  ].join(' ')}
                >
                  {badge}
                </span>
              </div>
              <p className="type-grotesk leading-h3 text-black/50">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
