// screen-candidate-b — Figma node 357:59014
// Composition: Header(with SecondRow) + CardHeader(variant2) + Notify +
//   Achievements section + Personal Development section + Reports/Mentoring section
// D32: pt-[90px] off-scale (header h=114, content y=204, gap=90px)
// D32: gap-[90px] off-scale in Reports card (Figma space/xxl=90px ≠ our --spacing-xxl=60px)
// D32 flags: #646905 (yellow-dark text) → text-black; #fffd9e (btn bg) → Button secondary;
//   #f7e0dd/#ffe3f1 (profile chip bg) → Profile short (bg-peach-100, closest available)
import Header from '../../components/organisms/header/Header';
import CardHeader from '../../components/organisms/card-header/CardHeader';
import Notify from '../../components/molecules/notify/Notify';
import Bar from '../../components/atoms/bar/Bar';
import Button from '../../components/atoms/button/Button';
import Profile from '../../components/molecules/profile/Profile';

const ACHIEVEMENTS = [
  { title: 'Top performer', period: 'Q4 2024' },
  { title: 'Team player',   period: 'Q4 2024' },
  { title: 'Innovator',     period: 'Q4 2023' },
  { title: 'Mentor',        period: 'Q4 2025' },
];

const DEV_STAGES = ['onboarding', 'adapting', 'performing', 'ready'];

const REPORTS_TO = [
  { name: 'Michael Lee',   role: 'Product Manager' },
  { name: 'Emily Carter',  role: 'UX Designer'     },
  { name: 'David Smith',   role: 'Data Analyst'    },
];

const MENTORING = [
  { name: 'Michael Thompson', role: 'Project Manager' },
  { name: 'Emily Davis',      role: 'UX Designer'     },
  { name: 'James Wilson',     role: 'Data Analyst'    },
];

export default function ScreenCandidateB() {
  return (
    <div className="min-h-screen bg-bg-page">
      <Header activeTab="all" />

      {/* D32: pt-[90px] off-scale — header h=114, content y=204, gap=90px */}
      <div className="pt-[90px] pb-xxl">
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs">

          <CardHeader variant="variant2" />

          <Notify text="Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip." />

          {/* Achievements — bg-olive-100 card */}
          {/* D32: Figma text color #646905 (yellow-dark) — no token, using text-black */}
          <div className="bg-olive-100 flex flex-col gap-l items-start p-xl rounded-[12px]">
            <p className="type-h2 text-black tracking-[-0.4px]">Achievements</p>
            <div className="flex items-start justify-between w-full py-s">
              {ACHIEVEMENTS.map(a => (
                <div key={a.title} className="flex flex-col gap-xs items-start">
                  <p className="type-h3 text-black tracking-[-0.4px]">{a.title}</p>
                  <p className="type-pixel tracking-[2px] uppercase text-black">{a.period}</p>
                </div>
              ))}
            </div>
            {/* D32: Figma button bg #fffd9e (yellow-light) — no token, using Button secondary */}
            <Button variant="secondary">All Achievements</Button>
          </div>

          {/* Personal Development — white card */}
          <div className="bg-white flex flex-col gap-l items-start p-xl rounded-[12px]">
            <p className="type-h2 text-black tracking-[-0.4px]">Personal Development</p>
            <div className="flex flex-col gap-xs items-start w-full">
              <Bar value={65} size="default" className="w-full" />
              <div className="flex items-start justify-between w-full">
                {DEV_STAGES.map(s => (
                  <span key={s} className="type-caps tracking-[1.6px] uppercase text-black">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-l items-start">
              <div className="flex flex-col gap-xs items-start">
                <p className="type-h4 text-black">Next Level</p>
                <p className="type-h4 text-black">Lead Software Engineer</p>
              </div>
              <div className="flex flex-col gap-xs items-start">
                <p className="type-caps tracking-[1.6px] uppercase text-black/50">Prediction:</p>
                <p className="type-h4 text-black">February 2026</p>
              </div>
            </div>
            <Button variant="secondary">Plan</Button>
          </div>

          {/* Reports to + Mentoring — white card */}
          {/* D32: gap-[90px] off-scale (Figma space/xxl=90px, our --spacing-xxl=60px) */}
          {/* D32: profile chip bg colors (#f7e0dd, #d4eee7, #ffe3f1) — no exact tokens for all; */}
          {/*   using Profile short (bg-peach-100) as closest available */}
          <div className="bg-white flex flex-col gap-[90px] items-start p-xl rounded-[12px]">
            <div className="flex flex-col gap-l items-start">
              <p className="type-h2 text-black tracking-[-0.4px]">Reports to</p>
              <div className="flex gap-xxxs items-start flex-wrap">
                {REPORTS_TO.map(p => (
                  <Profile key={p.name} variant="short" name={p.name} role={p.role} />
                ))}
              </div>
              <Button variant="secondary">Org. chart</Button>
            </div>

            <div className="flex flex-col gap-l items-start">
              <p className="type-h2 text-black tracking-[-0.4px]">Mentoring:</p>
              <div className="flex gap-xxxs items-start flex-wrap">
                {MENTORING.map(p => (
                  <Profile key={p.name} variant="short" name={p.name} role={p.role} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
