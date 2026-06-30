// Custom React Flow node for the automation/workflow editor.
// Renders a colored card with title, subtitle, and connection handles.
// Handles are visible 10px circles styled via tokens (D49).
// Requires ReactFlow context — render only inside a <ReactFlow> provider.
import { Handle, Position, type NodeProps } from '@xyflow/react';

export type AutomationNodeVariant = 'pink' | 'purple' | 'rose' | 'olive' | 'trigger' | 'blush';

export type AutomationNodeData = {
  label: string;
  sublabel: string;
  variant: AutomationNodeVariant;
};

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

export default function AutomationNode({ data, selected }: NodeProps) {
  const d = data as AutomationNodeData;
  const bg = variantBg[d.variant] ?? 'bg-status-pink';

  return (
    <div
      className={`relative w-[280px] rounded-[8px] p-s flex flex-col gap-l ${bg} ${
        selected ? 'ring-1 ring-black ring-offset-0' : ''
      }`}
    >
      {/* Target handle — input, left edge, center */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: 10, height: 10, background: 'var(--color-black)', border: 'none', borderRadius: '50%', minWidth: 0, minHeight: 0 }}
      />

      {/* Node content */}
      <div className="flex flex-col gap-s">
        {/* Icon row */}
        <div className="flex items-start justify-between text-black">
          <PlayIcon />
          <MoreIcon />
        </div>
        {/* Label + sublabel */}
        <div className="flex flex-col gap-xs">
          <p className="type-grotesk text-black">{d.label}</p>
          <p className="type-pixel text-black uppercase tracking-[2px]">{d.sublabel}</p>
        </div>
      </div>

      {/* Visual handle row — cosmetic circles matching Figma's bottom-row dots */}
      <div className="flex items-center justify-between">
        <div className="w-[10px] h-[10px] rounded-full bg-black" aria-hidden />
        <div className="w-[10px] h-[10px] rounded-full bg-black" aria-hidden />
      </div>

      {/* Source handle — output, right edge, center */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: 10, height: 10, background: 'var(--color-black)', border: 'none', borderRadius: '50%', minWidth: 0, minHeight: 0 }}
      />
    </div>
  );
}
