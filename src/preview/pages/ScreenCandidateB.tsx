// screen-candidate-b — Figma node 357:59014
// Composition: Header + screen-level hero + CardHeader(default, Sarah Mitchell) +
//   Notify + Achievements + Personal Development + Reports to / Mentoring
// D32: pt-[90px] off-scale (header h=88, content y=178, gap=90px)
// D41: Hero lifted to screen level — screen-candidate-b.png at y=0 (yellow portrait, no tint/blend).
//   CardHeader changed to variant="default" (matches Figma 357:59017 layout: TEAMS labels,
//   golden portrait inside card, action buttons, team tags at bottom).
// D41: Personal Development gap fixed: Next Level→Prediction gap = gap-s (14px per Figma),
//   not gap-l (24px). Text "Febrary 2026" matches Figma node 357:59050 exactly (Figma typo).
// D41: Profile bgClass per card (Figma uses different bg per card: red/green/pink + yellow/violet/red).
//   Token near-misses flagged: peach-100≠#f7e0dd (Figma "red"), rose-100≠#ffe3f1 (Figma "pink").
// D32: gap-[90px] in Reports/Mentoring card — Figma space/xxl=90px; our --spacing-xxl=60px.
// D32 flag: profile chip bg colors (#f7e0dd, #ffe3f1) — no exact token; using peach-100/rose-100.
import candidateBHero from '../../assets/screen-candidate-b.png';
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

// Profile bgClass per Figma 357:59055/59062 — each card has distinct bg
const REPORTS_TO = [
  { name: 'Michael Lee',   role: 'Product Manager', bgClass: 'bg-peach-100'  },
  { name: 'Emily Carter',  role: 'UX Designer',     bgClass: 'bg-mint-100'   },
  { name: 'David Smith',   role: 'Data Analyst',    bgClass: 'bg-rose-100'   },
];

const MENTORING = [
  { name: 'Michael Thompson', role: 'Project Manager', bgClass: 'bg-olive-100'  },
  { name: 'Emily Davis',      role: 'UX Designer',     bgClass: 'bg-purple-100' },
  { name: 'James Wilson',     role: 'Data Analyst',    bgClass: 'bg-peach-100'  },
];

export default function ScreenCandidateB() {
  return (
    <div className="relative min-h-screen bg-bg-page">

      {/* D41: Hero at screen level — yellow portrait at y=0, no blend overlay/tint.
          Gradient fades to bg-page at bottom. The CardHeader (default variant) also
          renders the same photo inside the card with golden tint treatment. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: 632 }}
      >
        <div className="absolute inset-0 bg-bg-page" />
        <img src={candidateBHero} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-page" />
      </div>

      <Header activeTab="all" />

      <div className="relative z-10 pt-[90px] pb-xxl">
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs">

          {/* CardHeader default variant — matches Figma 357:59017 layout exactly:
              TEAMS/access labels at top, name + title centered, action buttons, tags at bottom.
              photo=candidateBHero → golden-tinted portrait inside card (bg-black mix-blend-color
              + #ffb700 mix-blend-hard-light overlays applied by CardHeader default variant). */}
          <CardHeader
            variant="default"
            name="Sarah Mitchell"
            title="Senior Software Engineer"
            actions={['promote', 'negotiate', 'suspend', 'fire']}
            photo={candidateBHero}
          />

          <Notify text="Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip." />

          {/* Achievements — bg-olive-100 card, p-xl, gap-l between sections (Figma 357:59019) */}
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

          {/* Personal Development — white card, p-xl, gap-l between major sections (Figma 357:59035) */}
          <div className="bg-white flex flex-col gap-l items-start p-xl rounded-[12px]">
            <p className="type-h2 text-black tracking-[-0.4px]">Personal Development</p>
            {/* Bar + stage labels — gap-xs between bar and labels (Figma Frame 1381 h=26) */}
            <div className="flex flex-col gap-xs items-start w-full">
              <Bar value={65} size="default" className="w-full" />
              <div className="flex items-start justify-between w-full">
                {DEV_STAGES.map(s => (
                  <span key={s} className="type-caps tracking-[1.6px] uppercase text-black">{s}</span>
                ))}
              </div>
            </div>
            {/* Next Level + Prediction — gap-s (14px per Figma Frame 1378: 1377 h=36 → 1376 y=50, gap=14) */}
            <div className="flex flex-col gap-s items-start">
              <div className="flex flex-col gap-xs items-start">
                <p className="type-h4 text-black">Next Level</p>
                <p className="type-h4 text-black">Lead Software Engineer</p>
              </div>
              <div className="flex flex-col gap-xs items-start">
                <p className="type-caps tracking-[1.6px] uppercase text-black/50">Prediction:</p>
                {/* "Febrary" matches Figma node 357:59050 exactly (Figma typo, task: match exactly) */}
                <p className="type-h4 text-black">Febrary 2026</p>
              </div>
            </div>
            <Button variant="secondary">Plan</Button>
          </div>

          {/* Reports to + Mentoring — white card, p-xl, gap-[90px] between sections
              D32: gap-[90px] off-scale — Figma space/xxl=90px, our --spacing-xxl=60px */}
          <div className="bg-white flex flex-col gap-[90px] items-start p-xl rounded-[12px]">
            <div className="flex flex-col gap-l items-start">
              <p className="type-h2 text-black tracking-[-0.4px]">Reports to</p>
              <div className="flex gap-xxxs items-start flex-wrap">
                {REPORTS_TO.map(p => (
                  <Profile key={p.name} variant="short" name={p.name} role={p.role} bgClass={p.bgClass} />
                ))}
              </div>
              <Button variant="secondary">Org. chart</Button>
            </div>

            <div className="flex flex-col gap-l items-start">
              <p className="type-h2 text-black tracking-[-0.4px]">Mentoring:</p>
              <div className="flex gap-xxxs items-start flex-wrap">
                {MENTORING.map(p => (
                  <Profile key={p.name} variant="short" name={p.name} role={p.role} bgClass={p.bgClass} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
