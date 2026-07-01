// Custom React Flow node — automation/workflow editor.
// Three-dots calls MenuHandlerContext; selection shows outline border.
// Requires ReactFlow context (<ReactFlow> or <ReactFlowProvider>).
import React, { useContext } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export type AutomationNodeVariant = 'pink' | 'purple' | 'rose' | 'olive' | 'trigger' | 'blush';

export type AutomationNodeData = {
  label: string;
  sublabel: string;
  variant: AutomationNodeVariant;
  // per-node optional property fields (saved via Node Properties panel)
  letterHeadline?: string;
  mainText?: string;
  bodyText?: string;
  byeByeText?: string;
};

// Screen-level context so nodes can trigger the context menu without prop drilling.
export type MenuHandler = (nodeId: string, x: number, y: number) => void;
export const MenuHandlerContext = React.createContext<MenuHandler>(() => {});

const variantBg: Record<AutomationNodeVariant, string> = {
  pink:    'bg-status-pink',
  purple:  'bg-status-purple',
  rose:    'bg-status-rose',
  olive:   'bg-status-olive',
  trigger: 'bg-node-trigger',
  blush:   'bg-node-blush',
};

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
      <path d="M2 1.2L8.5 5 2 8.8V1.2z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor" aria-hidden>
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="8" cy="2" r="1.5" />
      <circle cx="14" cy="2" r="1.5" />
    </svg>
  );
}

export default function AutomationNode({ id, data, selected }: NodeProps) {
  const d = data as AutomationNodeData;
  const bg = variantBg[d.variant] ?? 'bg-status-pink';
  const onMenuClick = useContext(MenuHandlerContext);

  return (
    <div
      className={`relative w-[280px] rounded-[8px] p-s flex flex-col gap-l ${bg} transition-[outline-color] ${
        selected
          ? 'outline outline-2 outline-black'
          : 'outline outline-2 outline-transparent'
      }`}
    >
      {/* Target handle — input, left edge */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: 10, height: 10, background: 'var(--color-black)', border: 'none', borderRadius: '50%', minWidth: 0, minHeight: 0 }}
      />

      {/* Icon row: play + three-dots menu button */}
      <div className="flex items-start justify-between text-black">
        <PlayIcon />
        {/* nodrag class prevents the button click from starting a drag */}
        <button
          type="button"
          className="nodrag text-black cursor-pointer hover:opacity-60 transition-opacity leading-none"
          onClick={e => {
            e.stopPropagation();
            onMenuClick(id, e.clientX, e.clientY);
          }}
          aria-label="Node options"
        >
          <MoreIcon />
        </button>
      </div>

      {/* Label + sublabel */}
      <div className="flex flex-col gap-xs">
        <p className="type-grotesk text-black">{d.label}</p>
        <p className="type-pixel text-black uppercase tracking-[2px]">{d.sublabel}</p>
      </div>

      {/* Cosmetic handle row — matches Figma bottom-row dots */}
      <div className="flex items-center justify-between">
        <div className="w-[10px] h-[10px] rounded-full bg-black" aria-hidden />
        <div className="w-[10px] h-[10px] rounded-full bg-black" aria-hidden />
      </div>

      {/* Source handle — output, right edge */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: 10, height: 10, background: 'var(--color-black)', border: 'none', borderRadius: '50%', minWidth: 0, minHeight: 0 }}
      />
    </div>
  );
}
