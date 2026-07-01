// Step 6.20: Automation node editor — all interactions wired.
// Features: palette drag-drop, plug/unplug wires, node ⋯→delete menu,
//           template seeding, click-to-select + Node Properties panel.
// React Flow = engine; all visuals use our design system tokens.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type Node,
  type Edge,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../styles/reactflow.css';

import { Header } from '../../components/organisms';
import AutomationNode, {
  type AutomationNodeData,
  type AutomationNodeVariant,
  type MenuHandler,
  MenuHandlerContext,
} from '../../components/organisms/automation/AutomationNode';

/* ── Custom node registry (outside component — stable reference) ── */
const nodeTypes: NodeTypes = { automation: AutomationNode };

/* ── Unique node ID generator ───────────────────────────── */
let _uid = 0;
const uid = () => `nd-${++_uid}-${Math.floor(Math.random() * 10000)}`;

/* ── Helper: build an AutomationNode definition ─────────── */
const mkNode = (
  id: string,
  label: string,
  sublabel: string,
  variant: AutomationNodeVariant,
  x: number,
  y: number,
): Node => ({ id, type: 'automation', position: { x, y }, data: { label, sublabel, variant } });

/* ── Initial canvas (from Figma 357:59175) ──────────────── */
const initialNodes: Node[] = [
  mkNode('screening', 'Applicant Screening', 'Review resumes and applications', 'pink',   133, 80),
  mkNode('interview', 'Interview Stage',     'Conduct initial interviews',       'purple', 161, 380),
  mkNode('decision',  'Final Decision',      'Select candidate and extend offer','rose',   490, 210),
];
const initialEdges: Edge[] = [
  { id: 'e1', source: 'screening', target: 'decision', type: 'smoothstep' },
  { id: 'e2', source: 'interview', target: 'decision', type: 'smoothstep' },
];

/* ── Template definitions ────────────────────────────────── */
type TemplateDef = { nodes: Node[]; edges: Edge[] };

const TEMPLATES: Record<string, TemplateDef> = {
  'Hiring Funnel': {
    nodes: [
      mkNode('hf1', 'Start Trigger',      'Initialize workflow',          'trigger', 40,   150),
      mkNode('hf2', 'Application Review', 'Screen candidates',            'trigger', 380,  60),
      mkNode('hf3', 'Email Notification', 'Confirm application receipt',  'olive',   380,  260),
      mkNode('hf4', 'Interview',          'Schedule interviews',          'trigger', 720,  60),
      mkNode('hf5', 'Final Decision',     'Select and extend offer',      'rose',    1060, 150),
    ],
    edges: [
      { id: 'hfe1', source: 'hf1', target: 'hf2', type: 'smoothstep' },
      { id: 'hfe2', source: 'hf1', target: 'hf3', type: 'smoothstep' },
      { id: 'hfe3', source: 'hf2', target: 'hf4', type: 'smoothstep' },
      { id: 'hfe4', source: 'hf4', target: 'hf5', type: 'smoothstep' },
    ],
  },
  'Onboarding Flow': {
    nodes: [
      mkNode('of1', 'Start Trigger',     'New hire starts onboarding',  'trigger', 40,  150),
      mkNode('of2', 'Email Notification','Welcome email sent',           'olive',   380, 60),
      mkNode('of3', 'Training Module',   'Assign learning paths',        'blush',   380, 260),
      mkNode('of4', 'Progress Tracker',  'Monitor development',          'purple',  720, 150),
    ],
    edges: [
      { id: 'ofe1', source: 'of1', target: 'of2', type: 'smoothstep' },
      { id: 'ofe2', source: 'of1', target: 'of3', type: 'smoothstep' },
      { id: 'ofe3', source: 'of2', target: 'of4', type: 'smoothstep' },
      { id: 'ofe4', source: 'of3', target: 'of4', type: 'smoothstep' },
    ],
  },
  'Development Plan': {
    nodes: [
      mkNode('dp1', 'Application Review', 'Review background',              'trigger', 40,  150),
      mkNode('dp2', 'Interview',          'Technical assessment',            'trigger', 380, 60),
      mkNode('dp3', 'Conditional Logic',  'Pass / fail decision',           'olive',   380, 260),
      mkNode('dp4', 'Training Module',    'Assign development learning path','blush',   720, 60),
      mkNode('dp5', 'Email Notification', 'Notify candidate of outcome',    'olive',   720, 260),
    ],
    edges: [
      { id: 'dpe1', source: 'dp1', target: 'dp2', type: 'smoothstep' },
      { id: 'dpe2', source: 'dp1', target: 'dp3', type: 'smoothstep' },
      { id: 'dpe3', source: 'dp2', target: 'dp4', type: 'smoothstep' },
      { id: 'dpe4', source: 'dp3', target: 'dp4', type: 'smoothstep' },
      { id: 'dpe5', source: 'dp3', target: 'dp5', type: 'smoothstep' },
    ],
  },
};

/* ── Palette item (draggable) ────────────────────────────── */
type LibraryCategory = 'trigger' | 'olive' | 'blush' | 'purple';

const categoryToVariant: Record<LibraryCategory, AutomationNodeVariant> = {
  trigger: 'trigger',
  olive:   'olive',
  blush:   'blush',
  purple:  'purple',
};

const libraryBg: Record<LibraryCategory, string> = {
  trigger: 'bg-node-trigger',
  olive:   'bg-status-olive',
  blush:   'bg-node-blush',
  purple:  'bg-status-purple',
};

interface PaletteItemDef {
  label: string;
  sublabel: string;
  category: LibraryCategory;
}

const paletteItems: PaletteItemDef[] = [
  { label: 'Start Trigger',      sublabel: 'Initialize workflow',   category: 'trigger' },
  { label: 'Application Review', sublabel: 'Screen candidates',     category: 'trigger' },
  { label: 'Interview',          sublabel: 'Schedule interviews',   category: 'trigger' },
  { label: 'Email Notification', sublabel: 'Send automated emails', category: 'olive'   },
  { label: 'Conditional Logic',  sublabel: 'Branch workflow paths', category: 'olive'   },
  { label: 'Training Module',    sublabel: 'Assign learning paths', category: 'blush'   },
  { label: 'Progress Tracker',   sublabel: 'Monitor development',   category: 'purple'  },
];

function PaletteItem({ label, sublabel, category }: PaletteItemDef) {
  const variant = categoryToVariant[category];

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      'application/rf-node',
      JSON.stringify({ label, sublabel, variant }),
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`w-full rounded-s p-s flex flex-col gap-xs ${libraryBg[category]} cursor-grab select-none active:cursor-grabbing`}
    >
      <p className="type-grotesk text-black">{label}</p>
      <p className="type-pixel text-black uppercase tracking-[2px]">{sublabel}</p>
    </div>
  );
}

/* ── Form fields ─────────────────────────────────────────── */
function FieldInput({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
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

function FieldTextarea({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-xs w-full">
      <p className="type-caps text-black uppercase tracking-[1.6px]">{label}</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        placeholder="TYPE SOMETHING HERE"
        className="bg-bg-subtle px-s py-xs rounded-s type-pixel uppercase tracking-[2px] text-black w-full resize-none focus:outline-none focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

/* ── Context menu ────────────────────────────────────────── */
type ContextMenuState = { nodeId: string; x: number; y: number };

interface ContextMenuProps {
  menu: ContextMenuState;
  onDelete: (id: string) => void;
  onClose: () => void;
}

function ContextMenu({ menu, onDelete, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{ position: 'fixed', left: menu.x, top: menu.y, zIndex: 9999 }}
      className="bg-bg border border-border rounded-s overflow-hidden min-w-[120px]"
      role="menu"
    >
      <button
        type="button"
        role="menuitem"
        onClick={() => onDelete(menu.nodeId)}
        className="w-full text-left px-s py-xs type-grotesk text-black hover:bg-bg-subtle transition-colors"
      >
        Delete
      </button>
    </div>
  );
}

/* ── Inner editor (must be inside ReactFlowProvider context) ── */
function NodeLibraryEditor() {
  const rfInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // UI state
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [automationName, setAutomationName] = useState('Marketing Funnel');
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [propsTab, setPropsTab] = useState<'parameters' | 'custom'>('parameters');

  // Node Properties panel fields (local; committed via Save)
  const [panelLabel,          setPanelLabel]         = useState('');
  const [panelLetterHeadline, setPanelLetterHeadline] = useState('');
  const [panelMainText,       setPanelMainText]       = useState('');
  const [panelBodyText,       setPanelBodyText]       = useState('');
  const [panelByeByeText,     setPanelByeByeText]     = useState('');

  const selectedNode = nodes.find(n => n.selected) ?? null;
  const selectedId   = selectedNode?.id;

  // Sync panel fields whenever the selected node changes
  useEffect(() => {
    if (!selectedNode) return;
    const d = selectedNode.data as AutomationNodeData;
    setPanelLabel(d.label);
    setPanelLetterHeadline(d.letterHeadline ?? '');
    setPanelMainText(d.mainText ?? '');
    setPanelBodyText(d.bodyText ?? '');
    setPanelByeByeText(d.byeByeText ?? '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  /* ── Handlers ────────────────────────────────────────── */

  // Context menu — open from three-dots button
  const openMenu = useCallback<MenuHandler>((nodeId, x, y) => {
    setContextMenu({ nodeId, x, y });
  }, []);

  const closeMenu = useCallback(() => setContextMenu(null), []);

  // Delete node (via context menu) + its connected edges
  const deleteNode = useCallback((nodeId: string) => {
    setNodes(nds => nds.filter(n => n.id !== nodeId));
    setEdges(eds => eds.filter(e => e.source !== nodeId && e.target !== nodeId));
    setContextMenu(null);
  }, [setNodes, setEdges]);

  // Edge creation
  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges],
  );

  // Drag-from-palette: allow drop
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  // Drag-from-palette: create node at drop position
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const json = e.dataTransfer.getData('application/rf-node');
    if (!json) return;
    const nodeData: AutomationNodeData = JSON.parse(json);
    const position = rfInstance.screenToFlowPosition({ x: e.clientX, y: e.clientY });
    setNodes(nds => [...nds, {
      id: uid(),
      type: 'automation',
      position,
      data: nodeData,
    }]);
  }, [rfInstance, setNodes]);

  // Template: replace canvas with preset nodes + edges
  const loadTemplate = useCallback((name: string) => {
    const tpl = TEMPLATES[name];
    if (!tpl) return;
    setActiveTemplate(name);
    setNodes(tpl.nodes);
    setEdges(tpl.edges);
    // Fit view after state propagates
    setTimeout(() => rfInstance.fitView({ padding: 0.2, duration: 300 }), 60);
  }, [rfInstance, setNodes, setEdges]);

  // Save panel fields → node data
  const saveNodeProps = useCallback(() => {
    if (!selectedId) return;
    setNodes(nds => nds.map(n => n.id === selectedId
      ? {
          ...n,
          data: {
            ...n.data,
            label:          panelLabel,
            letterHeadline: panelLetterHeadline,
            mainText:       panelMainText,
            bodyText:       panelBodyText,
            byeByeText:     panelByeByeText,
          },
        }
      : n,
    ));
  }, [selectedId, panelLabel, panelLetterHeadline, panelMainText, panelBodyText, panelByeByeText, setNodes]);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <MenuHandlerContext.Provider value={openMenu}>
      <div className="h-screen flex flex-col bg-bg-page overflow-hidden">
        <Header activeTab="all" secondRowType="builder" />

        <div className="flex flex-1 overflow-hidden gap-xs p-xl pt-xs">

          {/* ── Left sidebar ─────────────────────────────── */}
          {/* overflow-x-hidden contains any template pill overflow (bug fix #0) */}
          <div className="w-[350px] shrink-0 overflow-y-auto overflow-x-hidden">
            <div className="bg-bg rounded-[12px] p-xl flex flex-col gap-l min-h-full">

              <p className="type-h2 text-black tracking-[-0.4px]">Automation</p>

              <FieldInput
                label="Automation name"
                value={automationName}
                onChange={setAutomationName}
              />

              {/* Node palette — drag items onto canvas */}
              <div className="flex flex-col gap-s">
                <p className="type-h3 text-black tracking-[-0.4px]">Node library</p>
                <div className="flex flex-col gap-xxxs">
                  {paletteItems.map(item => (
                    <PaletteItem key={item.label} {...item} />
                  ))}
                </div>
              </div>

              {/* Templates — click to seed canvas */}
              <div className="flex flex-col gap-s">
                <p className="type-h3 text-black tracking-[-0.4px]">Templates</p>
                {/* flex-wrap contained by overflow-x-hidden on parent; max-w-full on each button */}
                <div className="flex flex-wrap gap-xxxs">
                  {Object.keys(TEMPLATES).map(name => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => loadTemplate(name)}
                      className={`max-w-full h-8 px-s py-xs rounded-over type-pixel uppercase tracking-[2px] transition-colors ${
                        activeTemplate === name
                          ? 'bg-black text-text-on-dark'
                          : 'bg-bg-subtle text-black hover:bg-border'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── Canvas ───────────────────────────────────── */}
          <div
            className="flex-1 rf-canvas rounded-s overflow-hidden"
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
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
              onPaneClick={() => {
                setContextMenu(null);
              }}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={24}
                size={1}
                color="var(--color-border)"
              />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>

          {/* ── Node Properties — visible only when a node is selected ── */}
          {selectedNode && (
            <div className="w-[350px] shrink-0 overflow-y-auto">
              <div className="bg-bg rounded-[12px] p-xl flex flex-col gap-l">
                <p className="type-h2 text-black tracking-[-0.4px]">Node Properties</p>

                <div className="flex flex-col gap-s">
                  <FieldInput
                    label="Node name"
                    value={panelLabel}
                    onChange={setPanelLabel}
                  />

                  {/* Tab switcher */}
                  <div className="flex gap-xxxs">
                    {(['parameters', 'custom'] as const).map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setPropsTab(tab)}
                        className={`h-8 px-s py-xs rounded-s type-caps uppercase tracking-[1.6px] transition-colors ${
                          propsTab === tab
                            ? 'bg-bg-subtle text-black'
                            : 'bg-bg-subtle text-text-subtle hover:text-black'
                        }`}
                      >
                        {tab === 'parameters' ? 'parametrs' : 'custom code'}
                      </button>
                    ))}
                  </div>

                  {propsTab === 'parameters' && (
                    <>
                      <FieldTextarea label="letter headline" value={panelLetterHeadline} onChange={setPanelLetterHeadline} />
                      <FieldTextarea label="main text"       value={panelMainText}       onChange={setPanelMainText}       />
                      <FieldTextarea label="body text"       value={panelBodyText}        onChange={setPanelBodyText}       />
                      <FieldTextarea label="bye-bye text"    value={panelByeByeText}      onChange={setPanelByeByeText}     />
                    </>
                  )}

                  {propsTab === 'custom' && (
                    <div className="bg-bg-subtle rounded-s p-s">
                      <p className="type-grotesk text-text-subtle">Custom code editor</p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={saveNodeProps}
                  className="bg-black h-8 px-s py-xs rounded-over type-pixel uppercase tracking-[2px] text-text-on-dark self-start hover:opacity-80 transition-opacity"
                >
                  save
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Context menu — screen-level fixed position, avoids z-index/stacking issues */}
      {contextMenu && (
        <ContextMenu
          menu={contextMenu}
          onDelete={deleteNode}
          onClose={closeMenu}
        />
      )}
    </MenuHandlerContext.Provider>
  );
}

/* ── Root export: ReactFlowProvider enables useReactFlow in child ── */
export default function ScreenNodeLibrary() {
  return (
    <ReactFlowProvider>
      <NodeLibraryEditor />
    </ReactFlowProvider>
  );
}
