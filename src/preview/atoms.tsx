import { useState } from 'react';
import {
  Status, Switch, Tag, ErrorBanner, Flag, Avatar, AvatarGroup,
  Icons, Graph, Bar, Input, TextArea, Dropdown, Button, SwitchGroup, List, MenuSwitch,
} from '../components/atoms';
import PreviewNav from './PreviewNav';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-xxl">
      <h2 className="type-h3 mb-m pb-xxs border-b border-gray-100">{title}</h2>
      <div className="flex flex-wrap gap-m items-start">{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="type-caps text-[#979797] tracking-[1.6px] mb-xs">{children}</p>;
}

function Swatch({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-xxs items-start">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export default function AtomsPreview() {
  const [menuActive, setMenuActive] = useState(0);
  return (
    <div className="min-h-screen bg-bg text-text p-xxl">
      <div className="max-w-5xl mx-auto">
        <PreviewNav />
        <h1 className="type-h1 mb-xxl">Atoms</h1>

        {/* MENU SWITCH */}
        <Section title="MenuSwitch">
          <div className="w-full">
            <Label>on / off (interactive)</Label>
            <div className="flex items-center gap-xs p-xs rounded-m w-fit border border-gray-100">
              {['All teams', 'All templates'].map((label, i) => (
                <MenuSwitch key={label} active={menuActive === i} onClick={() => setMenuActive(i)}>
                  {label}
                </MenuSwitch>
              ))}
            </div>
          </div>
        </Section>

        {/* BUTTON */}
        <Section title="Button">
          <Swatch label="secondary"><Button variant="secondary">More info</Button></Swatch>
          <Swatch label="on-color"><Button variant="on-color">More info</Button></Swatch>
          <Swatch label="cta-small"><Button variant="cta-small">More info</Button></Swatch>
          <Swatch label="cta-big"><Button variant="cta-big">More info</Button></Swatch>
          <Swatch label="node">
            <Button variant="node" subLabel="more info">More info</Button>
          </Swatch>
          <Swatch label="disabled">
            <Button variant="secondary" disabled>Disabled</Button>
          </Swatch>
        </Section>

        {/* INPUT */}
        <Section title="Input">
          <Swatch label="default">
            <Input label="Head Line" placeholder="Michael Lee" className="w-[160px]" />
          </Swatch>
          <Swatch label="no label">
            <Input showLabel={false} placeholder="Value" className="w-[160px]" />
          </Swatch>
          <Swatch label="error">
            <Input label="Head Line" defaultValue="bad input" error errorMessage="Required field" className="w-[160px]" />
          </Swatch>
          <Swatch label="disabled">
            <Input label="Head Line" placeholder="Disabled" disabled className="w-[160px]" />
          </Swatch>
        </Section>

        {/* TEXTAREA */}
        <Section title="Text Area">
          <Swatch label="default">
            <TextArea label="Head Line" placeholder="Type something here" className="w-[200px]" />
          </Swatch>
          <Swatch label="error">
            <TextArea label="Head Line" error className="w-[200px]" />
          </Swatch>
          <Swatch label="disabled">
            <TextArea label="Head Line" disabled className="w-[200px]" />
          </Swatch>
        </Section>

        {/* DROPDOWN */}
        <Section title="Dropdown">
          <Swatch label="default (interactive)"><Dropdown variant="default" /></Swatch>
          <Swatch label="default · empty"><Dropdown variant="default" filled={false} /></Swatch>
          <Swatch label="on-color (interactive)"><Dropdown variant="on-color" /></Swatch>
          <Swatch label="on-color · empty"><Dropdown variant="on-color" filled={false} /></Swatch>
        </Section>

        {/* TAG */}
        <Section title="Tag">
          <Swatch label="control"><Tag variant="control">React</Tag></Swatch>
          <Swatch label="control + remove">
            <Tag variant="control" onRemove={() => {}}>React</Tag>
          </Swatch>
          <Swatch label="static"><Tag variant="static">React</Tag></Swatch>
        </Section>

        {/* STATUS */}
        <Section title="Status">
          <Swatch label="purple"><Status variant="purple" /></Swatch>
          <Swatch label="green"><Status variant="green" /></Swatch>
          <Swatch label="red"><Status variant="red" /></Swatch>
          <Swatch label="stopped"><Status variant="stopped" /></Swatch>
        </Section>

        {/* SWITCH */}
        <Section title="Switch">
          <Swatch label="big · active"><Switch size="big" active={true} label="Team" /></Swatch>
          <Swatch label="big · inactive"><Switch size="big" active={false} label="Team" /></Swatch>
          <Swatch label="small · active"><Switch size="small" active={true} label="Team" /></Swatch>
          <Swatch label="small · inactive"><Switch size="small" active={false} label="Team" /></Swatch>
        </Section>

        {/* SWITCH-GROUP */}
        <Section title="Switch Group">
          <Swatch label="interactive (click me)">
            <SwitchGroup items={[{ label: 'Team' }, { label: 'All' }, { label: 'Mine' }]} />
          </Swatch>
        </Section>

        {/* ERROR */}
        <Section title="Error">
          <Swatch label="default">
            <ErrorBanner message="Something went wrong" />
          </Swatch>
        </Section>

        {/* FLAG */}
        <Section title="Flag">
          <Swatch label="inactive"><Flag active={false} /></Swatch>
          <Swatch label="active"><Flag active={true} /></Swatch>
        </Section>

        {/* AVATAR */}
        <Section title="Avatar">
          <Swatch label="katya"><Avatar variant="katya" /></Swatch>
          <Swatch label="dog"><Avatar variant="dog" /></Swatch>
          <Swatch label="petya"><Avatar variant="petya" /></Swatch>
        </Section>

        {/* AVATAR-GROUP */}
        <Section title="Avatar Group">
          <Swatch label="default"><AvatarGroup /></Swatch>
        </Section>

        {/* ICONS */}
        <Section title="Icons">
          {(['play', 'user', 'more', 'arrow-down', 'close'] as const).map(name => (
            <Swatch key={name} label={name}><Icons name={name} /></Swatch>
          ))}
        </Section>

        {/* BAR */}
        <Section title="Bar">
          <div className="w-full flex flex-col gap-m">
            <Swatch label="default · 75%"><Bar value={75} size="default" className="w-[400px]" /></Swatch>
            <Swatch label="default · 20%"><Bar value={20} size="default" className="w-[400px]" /></Swatch>
            <Swatch label="big · 75%"><Bar value={75} size="big" className="w-[400px]" /></Swatch>
            <Swatch label="big · 20%"><Bar value={20} size="big" className="w-[400px]" /></Swatch>
          </div>
        </Section>

        {/* GRAPH */}
        <Section title="Graph">
          <Swatch label="default"><Graph /></Swatch>
          <Swatch label="3 bars">
            <Graph bars={[{ value: 100 }, { value: 60 }, { value: 40 }]} />
          </Swatch>
        </Section>

        {/* LIST */}
        <Section title="List">
          <div className="w-full flex flex-col">
            <List name="Sarah Johnson" type="Document" createdBy="Created by Alan" date="24.05.2025" />
            <List name="Michael Lee" type="Contract" createdBy="Created by Kate" date="12.03.2025" />
            <List name="Anna Schmidt" type="Report" createdBy="Created by Tom" date="01.06.2025" />
          </div>
        </Section>
      </div>
    </div>
  );
}
