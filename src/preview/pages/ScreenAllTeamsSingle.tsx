// screen-all-teams-single — Figma node 357:58993
// Composition: Header(2-row) + CardHeader(variant2, Engineering Team) + Notify + Team section (10×Profile long)
// D32: pt-[90px] off-scale (same as screen-all-teams-a)
// D34: Header shows SecondRow. CardHeader gets explicit content (defaults changed to All teams).
import Header from '../../components/organisms/header/Header';
import CardHeader, { PHOTO_PERSON } from '../../components/organisms/card-header/CardHeader';
import Notify from '../../components/molecules/notify/Notify';
import Profile from '../../components/molecules/profile/Profile';

const TEAM_MEMBERS = [
  { name: 'Sarah Johnson',    role: 'Senior Developer',     barValue: 37 },
  { name: 'Michael Lee',      role: 'Product Manager',      barValue: 62 },
  { name: 'Emily Carter',     role: 'UX Designer',          barValue: 55 },
  { name: 'David Smith',      role: 'Data Analyst',         barValue: 48 },
  { name: 'Jessica Martinez', role: 'Marketing Specialist', barValue: 71 },
  { name: 'Daniel Wilson',    role: 'Systems Administrator',barValue: 83 },
  { name: 'Laura Thompson',   role: 'Product Owner',        barValue: 44 },
  { name: 'James Garcia',     role: 'Frontend Engineer',    barValue: 68 },
  { name: 'Anna Schmidt',     role: 'Backend Engineer',     barValue: 59 },
  { name: 'Robert Brown',     role: 'DevOps Engineer',      barValue: 76 },
];

export default function ScreenAllTeamsSingle() {
  return (
    <div className="min-h-screen bg-bg-page">
      <Header activeTab="all" />

      {/* D32: pt-[90px] off-scale — header h=88, content y=178, gap=90px */}
      <div className="pt-[90px] pb-xxl">
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs">

          <CardHeader
            variant="variant2"
            name="Engineering Team"
            title="Team overview and member performance"
            actions={['add member']}
            switchItems={[{ label: 'Overview' }, { label: 'Members' }, { label: 'Projects' }]}
            photo={PHOTO_PERSON}
            photoOverlay={undefined}
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
