// Step 6.19: Automation Node Library editor — React Flow canvas with our design system.
// Layout: Header | [Left sidebar | React Flow canvas | Right sidebar]
// React Flow = engine only; all visual styling via design system tokens.
import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../styles/reactflow.css';

import { Header } from '../../components/organisms';
import AutomationNode, { type AutomationNodeData } from '../../components/organisms/automation/AutomationNode';

/* ── Custom node registry ───────────────────────────────── */
const nodeTypes: NodeTypes = {
  automation: AutomationNode,
};

/* ── Initial graph state (matches Figma node-id 357:59175 canvas) ── */
const initialNodes: Node[] = [
  {
    id: 'screening',
    type: 'automation',
    position: { x: 133, y: 80 },
    data: { label: 'Applicant Screening', sublabel: 'Review resumes and applications', variant: 'pink' } satisfies AutomationNodeData,
  },
  {
    id: 'interview',
    type: 'automation',
    position: { x: 161, y: 380 },
    data: { label: 'Interview Stage', sublabel: 'Conduct initial interviews', variant: 'purple' } satisfies AutomationNodeData,
  },
  {
    id: 'decision',
    type: 'automation',
    position: { x: 490, y: 210 },
    data: { label: 'Final Decision', sublabel: 'Select candidate and extend offer', variant: 'rose' } satisfies AutomationNodeData,
  },
];

const initialEdges: Edge[] = [
  { id: 'e-screening-decision', source: 'screening', target: 'decision', type: 'smoothstep' },
  { id: 'e-interview-decision', source: 'interview', target: 'decision', type: 'smoothstep' },
];

/* ── Node library items (sidebar) ──────────────────────── */
type LibraryCategory = 'trigger' | 'olive' | 'blush' | 'purple';

const libraryBg: Record<LibraryCategory, string> = {
  trigger: 'bg-node-trigger',
  olive:   'bg-status-olive',
  blush:   'bg-node-blush',
  purple:  'bg-status-purple',
};

interface LibraryItemProps {
  label: string;
  sublabel: string;
  category: LibraryCategory;
}

function LibraryItem({ label, sublabel, category }: LibraryItemProps) {
  return (
    <div className={`w-full rounded-s p-s flex flex-col gap-xs ${libraryBg[category]} cursor-grab select-none`}>
      <p className="type-grotesk text-black">{label}</p>
      <p className="type-pixel text-black uppercase tracking-[2px]">{sublabel}</p>
    </div>
  );
}

const nodeLibraryItems: LibraryItemProps[] = [
  { label: 'Start Trigger',       sublabel: 'Initialize workflow',    category: 'trigger' },
  { label: 'Application Review',  sublabel: 'Screen candidates',      category: 'trigger' },
  { label: 'Interview',           sublabel: 'Schedule interviews',    category: 'trigger' },
  { label: 'Email Notification',  sublabel: 'Send automated emails',  category: 'olive'   },
  { label: 'Conditional Logic',   sublabel: 'Branch workflow paths',  category: 'olive'   },
  { label: 'Training Module',     sublabel: 'Assign learning paths',  category: 'blush'   },
  { label: 'Progress Tracker',    sublabel: 'Monitor development',    category: 'purple'  },
];

const templateTags = ['Hiring Funnel', 'Onboarding Flow', 'Development Plan'];

/* ── Input field ────────────────────────────────────────── */
function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-xs w-full">
      <p className="type-caps text-black uppercase tracking-[1.6px]">{label}</p>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-bg-subtle h-8 px-s py-xs rounded-s type-pixel uppercase tracking-[2px] text-black w-full focus:outline-none focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

/* ── Textarea field ─────────────────────────────────────── */
function FieldTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-xs w-full">
      <p className="type-caps text-black uppercase tracking-[1.6px]">{label}</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        className="bg-bg-subtle px-s py-xs rounded-s type-pixel uppercase tracking-[2px] text-black w-full resize-none focus:outline-none focus:ring-1 focus:ring-black"
        placeholder="TYPE SOMETHING HERE"
      />
    </div>
  );
}

/* ── Main screen ────────────────────────────────────────── */
export default function ScreenNodeLibrary() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges],
  );

  // Node properties panel state
  const [automationName, setAutomationName] = useState('Marketing Funnel');
  const [nodeName, setNodeName]         = useState('Welcome letter');
  const [propsTab, setPropsTab]         = useState<'parameters' | 'custom'>('parameters');
  const [letterHeadline, setLetterHeadline] = useState('');
  const [mainText, setMainText]         = useState('');
  const [bodyText, setBodyText]         = useState('');
  const [byeByeText, setByeByeText]     = useState('');

  return (
    <div className="h-screen flex flex-col bg-bg-page overflow-hidden">
      {/* Header — re-uses our shared organism (TopMenu + SecondRow builder mode) */}
      <Header activeTab="all" secondRowType="builder" />

      {/* Three-column workspace */}
      <div className="flex flex-1 overflow-hidden gap-xs p-xl pt-xs">

        {/* ── Left sidebar: Automation config + Node Library ── */}
        <div className="w-[350px] shrink-0 overflow-y-auto">
          <div className="bg-bg rounded-[12px] p-xl flex flex-col gap-l h-full">
            {/* Title */}
            <p className="type-h2 text-black tracking-[-0.4px]">Automation</p>

            {/* Automation name input */}
            <FieldInput label="Automation name" value={automationName} onChange={setAutomationName} />

            {/* Node Library */}
            <div className="flex flex-col gap-s">
              <p className="type-h3 text-black tracking-[-0.4px]">Node library</p>
              <div className="flex flex-col gap-xxxs">
                {nodeLibraryItems.map(item => (
                  <LibraryItem key={item.label} {...item} />
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="flex flex-col gap-s">
              <p className="type-h3 text-black tracking-[-0.4px]">Templates</p>
              <div className="flex flex-wrap gap-xxxs">
                {templateTags.map(t => (
                  <button
                    key={t}
                    className="bg-bg-subtle h-8 px-s py-xs rounded-over type-pixel uppercase tracking-[2px] text-black cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Center: React Flow canvas ── */}
        <div className="flex-1 rf-canvas rounded-s overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            deleteKeyCode="Delete"
            defaultEdgeOptions={{ type: 'smoothstep' }}
            style={{ background: 'var(--color-bg-page)' }}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--color-border)" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        {/* ── Right sidebar: Node Properties ── */}
        <div className="w-[350px] shrink-0 overflow-y-auto">
          <div className="bg-bg rounded-[12px] p-xl flex flex-col gap-l">
            <p className="type-h2 text-black tracking-[-0.4px]">Node Properties</p>

            <div className="flex flex-col gap-s">
              <FieldInput label="Node name" value={nodeName} onChange={setNodeName} />

              {/* Tab switcher */}
              <div className="flex gap-xxxs">
                {(['parameters', 'custom'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setPropsTab(tab)}
                    className={`h-8 px-s py-xs rounded-s type-caps uppercase tracking-[1.6px] transition-colors ${
                      propsTab === tab
                        ? 'bg-bg-subtle text-black'
                        : 'bg-bg-subtle text-text-subtle'
                    }`}
                  >
                    {tab === 'parameters' ? 'parametrs' : 'custom code'}
                  </button>
                ))}
              </div>

              {propsTab === 'parameters' && (
                <>
                  <FieldTextarea label="letter headline" value={letterHeadline} onChange={setLetterHeadline} />
                  <FieldTextarea label="main text"       value={mainText}       onChange={setMainText}       />
                  <FieldTextarea label="body text"       value={bodyText}       onChange={setBodyText}       />
                  <FieldTextarea label="bye-bye text"    value={byeByeText}     onChange={setByeByeText}     />
                </>
              )}
              {propsTab === 'custom' && (
                <div className="bg-bg-subtle rounded-s p-s">
                  <p className="type-grotesk text-text-subtle">Custom code editor</p>
                </div>
              )}
            </div>

            <button className="bg-black h-8 px-s py-xs rounded-over type-pixel uppercase tracking-[2px] text-white self-start hover:opacity-80 transition-opacity">
              save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
