// Token gap (D24): back-button green border = #00867b (text-icon-green, D19).
import Button from '../../atoms/button/Button';

export type SecondRowType = 'default' | 'builder';

interface SecondRowProps {
  type?: SecondRowType;
  breadcrumb?: string[];
  onBack?: () => void;
  onSave?: () => void;
  onDeploy?: () => void;
  className?: string;
}

export default function SecondRow({
  type = 'default',
  breadcrumb = ['Home', 'Something', 'Something'],
  onBack,
  onSave,
  onDeploy,
  className = '',
}: SecondRowProps) {
  return (
    <div className={`flex items-center justify-between px-m py-s w-full ${className}`}>
      <div className="flex items-center gap-m">
        {/* Back button: white pill with green border (D19: #00867b) */}
        <Button
          variant="on-color"
          onClick={onBack}
          className="border border-[#00867b]"
        >
          Back
        </Button>

        {type === 'default' && (
          <div className="flex items-center gap-xs">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-xs">
                {i > 0 && <span className="type-grotesk text-black">•</span>}
                <span className="type-grotesk text-black">{crumb}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {type === 'builder' && (
        <div className="flex items-center gap-xs">
          <Button variant="secondary" onClick={onSave}>save</Button>
          <Button variant="cta-small" onClick={onDeploy}>deploy</Button>
        </div>
      )}
    </div>
  );
}
