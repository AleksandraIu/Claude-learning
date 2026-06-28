// screen-all-teams-a — Figma node 357:58932
// Composition: Header(2-row) + CardHeader(variant2, All teams) + 4×MetricCard + 6×Team (2-col grid)
// D32: pt-[90px] off-scale (header h=88 with SecondRow, content y=178, gap=90px)
// D34: Header now shows SecondRow (2 rows). MetricCard uses type prop. CardHeader full-bleed hero.
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
    <div className="min-h-screen bg-bg-page">
      {/* D34: SecondRow now shown (header h≈88 with 2 rows, matching Figma 357:58933) */}
      <Header activeTab="all" />

      {/* D32: pt-[90px] off-scale — header h=88, content y=178, gap=90px */}
      <div className="pt-[90px] pb-xxl">
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs">

          {/* D34: full-bleed hero (CardHeader variant2 image breaks to 100vw) */}
          {/* Content: "All teams" + description + "add team" + [Overview/Employees/Report] */}
          <CardHeader variant="variant2" />

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
