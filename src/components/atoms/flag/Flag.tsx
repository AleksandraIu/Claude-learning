interface FlagProps {
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Flag({ active = false, onClick, className = '' }: FlagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? 'Flagged' : 'Flag'}
      aria-pressed={active}
      className={`flex items-center justify-center p-xxxs w-[26px] ${className}`}
    >
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
        <path
          d="M3 1v16M3 1h10l-3 5 3 5H3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? 'currentColor' : 'none'}
          className={active ? 'text-black' : 'text-black'}
        />
      </svg>
    </button>
  );
}
