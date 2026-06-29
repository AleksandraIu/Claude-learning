// screen-all-teams-single — Figma node 357:58993
// Composition: Header(2-row) + CardHeader(variant2, Engineering Team) + Notify + 10×Profile (long)
// D32: pt-[90px] off-scale (header h=88, content y=178, gap=90px)
// D34: Header shows SecondRow. CardHeader uses explicit content.
// D41: Hero lifted to screen level (same as All Teams A, D39) — all-team-single.png at y=0,
//   CardHeader imageTopOffset={0} imageHeight={0} suppresses built-in image.
import heroSingle from '../../assets/all-team-single.png';
import Header from '../../components/organisms/header/Header';
import CardHeader from '../../components/organisms/card-header/CardHeader';
import Notify from '../../components/molecules/notify/Notify';
import Profile from '../../components/molecules/profile/Profile';

const TEAM_MEMBERS = [
  { name: 'Sarah Johnson',    role: 'Senior Developer',      barValue: 37 },
  { name: 'Michael Lee',      role: 'Product Manager',       barValue: 62 },
  { name: 'Emily Carter',     role: 'UX Designer',           barValue: 55 },
  { name: 'David Smith',      role: 'Data Analyst',          barValue: 48 },
  { name: 'Jessica Martinez', role: 'Marketing Specialist',  barValue: 71 },
  { name: 'Daniel Wilson',    role: 'Systems Administrator', barValue: 83 },
  { name: 'Laura Thompson',   role: 'Product Owner',         barValue: 44 },
  { name: 'James Garcia',     role: 'Frontend Engineer',     barValue: 68 },
  { name: 'Anna Schmidt',     role: 'Backend Engineer',      barValue: 59 },
  { name: 'Robert Brown',     role: 'DevOps Engineer',       barValue: 76 },
];

export default function ScreenAllTeamsSingle() {
  return (
    <div className="relative min-h-screen bg-bg-page">

      {/* D41: Hero at screen level — same pattern as All Teams A (D39).
          Single image, no blend overlay. Gradient fades hero to bg-page. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: 632 }}
      >
        <div className="absolute inset-0 bg-bg-page" />
        <img src={heroSingle} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-page" />
      </div>

      <Header activeTab="all" />

      <div className="relative z-10 pt-[90px] pb-xxl">
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs">

          {/* CardHeader: imageTopOffset/Height=0 suppresses built-in hero; text/switch remain */}
          <CardHeader
            variant="variant2"
            name="Engineering Team"
            title="Team overview and member performance"
            actions={['add member']}
            switchItems={[{ label: 'Overview' }, { label: 'Members' }, { label: 'Projects' }]}
            imageTopOffset={0}
            imageHeight={0}
          />

          <Notify text="Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip." />

          {/* Team member list — white card with heading + 10 Profile (long) */}
          <div className="bg-white rounded-[12px] p-xl">
            <p className="type-h3 text-black tracking-[-0.4px] mb-l">Team</p>
            <div className="flex flex-col">
              {TEAM_MEMBERS.map(member => (
                <Profile
                  key={member.name}
                  variant="long"
                  name={member.name}
                  role={member.role}
                  barValue={member.barValue}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
