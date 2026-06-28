// screen-all-teams-a — Figma node 357:58932
// Composition: Header + CardHeader(variant2) + 4×MetricCard + 6×Team (2-col grid)
// D32: pt-[90px] is off-scale (header h=88, content y=178, gap=90px; nearest token: xxl=60px)
import Header from '../../components/organisms/header/Header';
import CardHeader from '../../components/organisms/card-header/CardHeader';
import MetricCard from '../../components/molecules/metric-card/MetricCard';
import Team from '../../components/molecules/team/Team';

const METRIC_CARDS = [
  { title: 'Health',       label: 'Overall: Good',      bg: 'bg-pink-100'   },
  { title: 'Productivity', label: '+12% This Month',    bg: 'bg-rose-100'   },
  { title: 'Distribution', label: '8 Teams Active',     bg: 'bg-purple-100' },
  { title: 'Hiring',       label: '15 Open Positions',  bg: 'bg-olive-100'  },
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
      <Header activeTab="all" showSecondRow={false} />

      {/* D32: pt-[90px] off-scale — header h=88, content y=178, gap=90px */}
      <div className="pt-[90px] pb-xxl">
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs">

          <CardHeader variant="variant2" />

          {/* 4 MetricCards — equal width, gap-xxs (4px) */}
          <div className="flex gap-xxs">
            {METRIC_CARDS.map(card => (
              <MetricCard
                key={card.title}
                title={card.title}
                label={card.label}
                bg={card.bg}
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
