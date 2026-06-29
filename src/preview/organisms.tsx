import { useState } from 'react';
import PreviewNav from './PreviewNav';
import {
  SecondRow, TopMenu, Header,
  Kanban, Task, CardHeader,
} from '../components/organisms';

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mb-xxl">
      <div className="mb-m pb-xxs border-b border-gray-100">
        <h2 className="type-h3">{title}</h2>
        {subtitle && <p className="type-grotesk text-text-subtle mt-xxxs">{subtitle}</p>}
      </div>
      <div className="flex flex-col gap-m">{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="type-caps text-text-subtle tracking-[1.6px] mb-xs">{children}</p>;
}

export default function OrganismsPreview() {
  const [activeTab, setActiveTab] = useState<'all' | 'templates'>('all');

  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-5xl mx-auto">
        <PreviewNav />
        <h1 className="type-h1 mb-xxl">Organisms</h1>

        {/* SECOND ROW — part of Header composition */}
        <Section title="SecondRow" subtitle="Used inside Header as the second row (breadcrumb / builder bar)">
          <div>
            <Label>default (breadcrumb)</Label>
            <div className="border border-gray-100 rounded-s overflow-hidden">
              <SecondRow type="default" />
            </div>
          </div>
          <div>
            <Label>builder (save + deploy)</Label>
            <div className="border border-gray-100 rounded-s overflow-hidden">
              <SecondRow type="builder" />
            </div>
          </div>
        </Section>

        {/* TOP MENU — part of Header composition */}
        <Section title="TopMenu" subtitle="Used inside Header as the first row (logo + navigation + user links)">
          <div>
            <Label>all tabs / templates / off</Label>
            <div className="rounded-s overflow-hidden border border-gray-100">
              <TopMenu activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div className="mt-xs flex gap-xs">
              {(['all', 'templates'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`type-pixel tracking-[2px] uppercase px-xs py-xxxs rounded-s text-black transition-colors
                    ${activeTab === tab ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-100/50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* HEADER — composes TopMenu + SecondRow */}
        <Section title="Header" subtitle="Composes TopMenu (row 1) + SecondRow (row 2). Transparent with z-10 for hero overlay.">
          <div>
            <Label>default — TopMenu + SecondRow (breadcrumb)</Label>
            <div className="rounded-s overflow-hidden">
              <Header activeTab="all" />
            </div>
          </div>
          <div>
            <Label>builder mode — TopMenu + SecondRow (save / deploy)</Label>
            <div className="rounded-s overflow-hidden">
              <Header activeTab="templates" secondRowType="builder" />
            </div>
          </div>
        </Section>

        {/* TASK */}
        <Section title="Task">
          <div>
            <Label>default (inactive)</Label>
            <Task variant="default" />
          </div>
          <div>
            <Label>active (Variant2)</Label>
            <Task variant="active" showError={false} />
          </div>
          <div>
            <Label>active + error</Label>
            <Task variant="active" />
          </div>
        </Section>

        {/* CARD HEADER */}
        {/* D46: !overflow-visible on default — overrides component's overflow-hidden so dropdowns
            aren't clipped. Image layers still clipped by their own inner overflow-hidden div.
            variant2 gets imageTopOffset=0 so its image doesn't bleed 178px into the default
            card above; imageHeight=480 matches the card height so no bleed below either. */}
        <Section title="CardHeader">
          <div>
            <Label>default (golden hero)</Label>
            <CardHeader variant="default" className="max-w-[830px] !overflow-visible" />
          </div>
          <div>
            <Label>variant2 (full-bleed light hero — used in all 3 screens)</Label>
            <CardHeader variant="variant2" className="max-w-[830px]" imageTopOffset={0} imageHeight={480} />
          </div>
        </Section>

        {/* KANBAN */}
        <Section title="Kanban">
          <div>
            <Label>pipeline board (4 columns)</Label>
            <div className="overflow-x-auto">
              <Kanban />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
