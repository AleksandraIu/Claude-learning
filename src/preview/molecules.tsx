import {
  Profile, NodeCard, CampaignPreview, ProjectPreview, ExperiencePreview,
  Team, MetricCard, MetricCardTall, Attempt, Notify,
} from '../components/molecules';
import PreviewNav from './PreviewNav';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-xxl">
      <h2 className="type-h3 mb-m pb-xxs border-b border-gray-100">{title}</h2>
      <div className="flex flex-wrap gap-m items-start">{children}</div>
    </section>
  );
}

export default function MoleculesPreview() {
  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-5xl mx-auto">
        <PreviewNav />
        <h1 className="type-h1 mb-xxl">Molecules</h1>

        {/* PROFILE */}
        <Section title="Profile">
          <div className="w-full flex flex-col gap-m">
            <Profile variant="long" />
            <Profile variant="long" name="Michael Lee" role="Product Designer" barValue={62} />
          </div>
          <Profile variant="short" />
          <Profile variant="short-outlined" />
        </Section>

        {/* NODE CARD */}
        <Section title="Node Card">
          <NodeCard />
          <NodeCard title="Send Email" subtitle="Candidate notification sent" />
        </Section>

        {/* CAMPAIGN PREVIEW */}
        <Section title="Campaign Preview">
          <CampaignPreview className="max-w-3xl" />
        </Section>

        {/* PROJECT PREVIEW */}
        <Section title="Project Preview">
          <div className="w-full flex flex-col">
            <ProjectPreview />
            <ProjectPreview
              description="Mobile-first SaaS dashboard with real-time data and offline support"
              tags={['React Native', 'GraphQL', 'Redis']}
            />
          </div>
        </Section>

        {/* EXPERIENCE PREVIEW */}
        <Section title="Experience Preview">
          <div className="w-full flex flex-col">
            <ExperiencePreview />
            <ExperiencePreview
              dateRange="Mar 2019 — Dec 2021 (2 years)"
              role="Mid Frontend Developer"
              company="Design Studio"
              description="Built component library used across 12 products, reduced build time by 60%"
            />
          </div>
        </Section>

        {/* TEAM */}
        <Section title="Team">
          <Team />
          <Team name="Design Team" memberCount={8} productivity={72} weekHighlight="Sasha delivered the new icon set on time" extraCount={5} />
        </Section>

        {/* METRIC CARDS — D34: type prop (Figma: red/pink/violet/yellow/green) */}
        <Section title="Metric Card">
          <MetricCard type="red"    title="Health"       label="Overall: Good"    className="w-[190px]" />
          <MetricCard type="pink"   title="Productivity" label="+12% This Month"  className="w-[190px]" />
          <MetricCard type="violet" title="Distribution" label="8 Teams Active"   className="w-[190px]" />
          <MetricCard type="yellow" title="Hiring"       label="15 Open Position" className="w-[190px]" />
          <MetricCard type="green"  title="Health"       label="Overall: Good"    className="w-[190px]" />
        </Section>

        <Section title="Metric Card Tall">
          <MetricCardTall />
          <MetricCardTall title="Rejections" value={89} label="This month" />
        </Section>

        {/* ATTEMPT */}
        <Section title="Attempt">
          <div className="w-full flex flex-col gap-xxxs">
            <Attempt variant="first" />
            <Attempt variant="next" />
          </div>
        </Section>

        {/* NOTIFY */}
        <Section title="Notify">
          <Notify className="max-w-3xl" />
          <Notify
            text="Team shipped the new search feature 3 days ahead of schedule."
            showButton
            className="max-w-3xl"
          />
        </Section>
      </div>
    </div>
  );
}
