// screen-all-teams-a — Figma node 357:58932
// Composition: Header(2-row) + CardHeader(variant2, All teams) + 4×MetricCard + 6×Team (2-col grid)
// D32: pt-[90px] off-scale (header h per Figma content-y=178, gap=90px)
// D34: Header now shows SecondRow (2 rows). MetricCard uses type prop. CardHeader full-bleed hero.
// D38: hero images localised. D39: hero lifted to screen level — always starts at y=0 regardless
//   of header height. CardHeader imageTopOffset={0} imageHeight={0} suppresses its built-in image.
import heroBase  from '../../assets/card-header_2.png';
import heroBlend from '../../assets/card-head_1.png';
import Header from '../../components/organisms/header/Header';
import CardHeader from '../../components/organisms/card-header/CardHeader';
import MetricCard, { MetricCardType } from '../../components/molecules/metric-card/MetricCard';
import Team from '../../components/molecules/team/Team';

const METRIC_CARDS: { title: string; label: string; type: MetricCardType }[] = [
  { title: 'Health',       label: 'Overall: Good',     type: 'red'    },
  { title: 'Productivity', label: '+12% This Month',   type: 'pink'   },
  { title: 'Distribution', label: '8 Teams Active',    type: 'violet' },
  { title: 'Hiring',       label: '15 Open Position',  type: 'yellow' },
];

const TEAMS = [
  { name: 'Engineering Team',  memberCount: 24, productivity: 89, weekHighlight: 'Petya was drinking too much tea this week',         extraCount: 21 },
  { name: 'Design Team',       memberCount: 8,  productivity: 72, weekHighlight: 'Sasha delivered the new icon set on time',          extraCount: 5  },
  { name: 'Product Team',      memberCount: 12, productivity: 81, weekHighlight: 'Team shipped new search feature 3 days early',      extraCount: 9  },
  { name: 'Marketing Team',    memberCount: 6,  productivity: 65, weekHighlight: 'Q4 campaign launched across all channels',          extraCount: 3  },
  { name: 'Data Team',         memberCount: 10, productivity: 94, weekHighlight: 'Pipeline migration completed ahead of schedule',    extraCount: 7  },
  { name: 'Infrastructure',    memberCount: 5,  productivity: 78, weekHighlight: 'Zero-downtime deployment successfully shipped',     extraCount: 2  },
];

export default function ScreenAllTeamsA() {
  return (
    // relative: anchors the hero absolute div. bg-bg-page: shows below/after hero area.
    <div className="relative min-h-screen bg-bg-page">

      {/* D39: Hero at SCREEN level — position absolute from top-0, always y=0 regardless of
          header height. This replaces the fragile top:-178px hack inside CardHeader which
          assumed the header was exactly 88px (measured actual: 125px → image was at y=37). */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: 632 }}
      >
        <div className="absolute inset-0 bg-bg-page" />
        <img src={heroBase}  alt="" className="absolute inset-0 size-full object-cover" />
        <img src={heroBlend} alt="" className="absolute inset-0 size-full object-cover mix-blend-plus-lighter" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-page" />
      </div>

      {/* Header: z-10, transparent, overlaid on hero from y=0 */}
      <Header activeTab="all" />

      {/* Content: relative z-10 ensures it paints above the hero absolute div */}
      <div className="relative z-10 pt-[90px] pb-xxl">
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs">

          {/* CardHeader: text/buttons/switch only — built-in image suppressed (imageHeight=0).
              The hero background comes from the screen-level div above. */}
          <CardHeader variant="variant2" imageTopOffset={0} imageHeight={0} />

          {/* 4 MetricCards — equal width, gap-xxs (4px), using Figma type names */}
          <div className="flex gap-xxs">
            {METRIC_CARDS.map(card => (
              <MetricCard
                key={card.title}
                title={card.title}
                label={card.label}
                type={card.type}
                className="flex-1"
              />
            ))}
          </div>

          {/* 6 Teams — 2-column grid, gap-xxs (4px) */}
          <div className="grid grid-cols-2 gap-xxs">
            {TEAMS.map((team) => (
              <Team
                key={team.name}
                name={team.name}
                memberCount={team.memberCount}
                productivity={team.productivity}
                weekHighlight={team.weekHighlight}
                extraCount={team.extraCount}
                className="!w-full"
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
