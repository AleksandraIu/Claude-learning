// Task: a single to-do row in a task list.
// Figma: bookmark-flag + task text + optional error banner + optional action button.
// Variant2 = active (black text); Default = inactive (gray/secondary text).
import Flag from '../../atoms/flag/Flag';
import ErrorBanner from '../../atoms/error/ErrorBanner';
import Button from '../../atoms/button/Button';

export type TaskVariant = 'default' | 'active';

interface TaskProps {
  variant?: TaskVariant;
  title?: string;
  showError?: boolean;
  errorMessage?: string;
  showButton?: boolean;
  buttonLabel?: string;
  onButton?: () => void;
  className?: string;
}

export default function Task({
  variant = 'default',
  title = 'Define role requirements and job description',
  showError = true,
  errorMessage = 'Some field needs your attention',
  showButton = true,
  buttonLabel = 'job description',
  onButton,
  className = '',
}: TaskProps) {
  const isActive = variant === 'active';
  return (
    <div className={`border-b border-gray-100 flex gap-s items-start py-s w-full ${className}`}>
      <Flag active={isActive} className="shrink-0" />

      <div className="flex flex-col gap-[10px] items-start">
        <p className={`type-h3 tracking-[-0.4px] whitespace-nowrap ${isActive ? 'text-black' : 'text-[#979797]'}`}>
          {title}
        </p>
        {showError && (
          <ErrorBanner message={errorMessage} />
        )}
        {showButton && (
          <Button variant="secondary" onClick={onButton}>{buttonLabel}</Button>
        )}
      </div>
    </div>
  );
}
