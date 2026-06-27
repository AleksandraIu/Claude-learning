import { useState } from 'react';
import PreviewNav from './PreviewNav';
import {
  SecondRow, TopMenu, Header,
  Kanban, Task, CardHeader,
} from '../components/organisms';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-xxl">
      <h2 className="type-h3 mb-m pb-xxs border-b border-gray-100">{title}</h2>
      <div className="flex flex-col gap-m">{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="type-caps text-[#979797] tracking-[1.6px] mb-xs">{children}</p>;
}

export default function OrganismsPreview() {
  const [activeTab, setActiveTab] = useState<'all' | 'templates'>('all');

  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-5xl mx-auto">
        <PreviewNav />
        <h1 className="type-h1 mb-xxl">Organisms</h1>

        {/* SECOND ROW */}
        <Section title="SecondRow">
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

        {/* TOP MENU */}
        <Section title="TopMenu">
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

        {/* HEADER */}
        <Section title="Header">
          <div>
            <Label>default (TopMenu + SecondRow + pipeline bar)</Label>
            <div className="rounded-s overflow-hidden">
              <Header activeTab="all" pipelineValue={62} />
            </div>
          </div>
          <div>
            <Label>builder mode</Label>
            <div className="rounded-s overflow-hidden">
              <Header activeTab="templates" secondRowType="builder" pipelineValue={40} />
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
        <Section title="CardHeader">
          <div>
            <Label>default (golden hero)</Label>
            <CardHeader variant="default" className="max-w-[830px]" />
          </div>
          <div>
            <Label>variant2 (light)</Label>
            <CardHeader variant="variant2" className="max-w-[830px]" />
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
