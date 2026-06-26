// CardHeader: full hero card for a person profile.
// Default: golden/yellow tinted photo bg + name + role (gold text) + white action pills + dropdown tags.
// Variant2: light photo bg with gradient + black name/role + cta-small action pills + SwitchGroup.
// Token gaps: D22 rounded-[12px] (rounds/l), D24 #ffb700 (mix-blend overlay), D19 gold-400 text.
// Photo URLs from Figma MCP expire after 7 days — replace with permanent asset URLs in production.
import Button from '../../atoms/button/Button';
import Dropdown from '../../atoms/dropdown/Dropdown';
import SwitchGroup from '../../atoms/switch-group/SwitchGroup';

const PHOTO_DEFAULT = 'https://www.figma.com/api/mcp/asset/cad54573-1c04-43d4-ae95-0f644364ba4d';
const PHOTO_VARIANT2 = 'https://www.figma.com/api/mcp/asset/dbf30515-2c4d-4842-aac5-47224e43f4c6';

export type CardHeaderVariant = 'default' | 'variant2';

interface CardHeaderProps {
  variant?: CardHeaderVariant;
  name?: string;
  title?: string;
  accessLevel?: string;
  teamTags?: string[];
  levelTag?: string;
  switchItems?: { label: string }[];
  actions?: string[];
  photo?: string;
  className?: string;
}

export default function CardHeader({
  variant = 'default',
  name = 'Sarah Mitchell',
  title = 'Senior Software Engineer',
  accessLevel = 'LEVEL 4 (CODE RED)',
  teamTags = ['frontend-team', 'Innovation Lab', 'Lead Developer', 'Member'],
  switchItems = [{ label: 'Team' }, { label: 'Projects' }, { label: 'Reviews' }],
  actions = ['promote', 'negotiate', 'suspend', 'fire'],
  photo,
  className = '',
}: CardHeaderProps) {
  const isDefault = variant === 'default';
  const imgSrc = photo ?? (isDefault ? PHOTO_DEFAULT : PHOTO_VARIANT2);

  if (isDefault) {
    return (
      <div className={`relative flex flex-col h-[480px] p-xl rounded-[12px] overflow-hidden items-start justify-between ${className}`}>
        {/* Photo bg + color overlays */}
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px] overflow-hidden">
          <img src={imgSrc} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-black mix-blend-color" />
          {/* D24: #ffb700 not in tokens — golden tint overlay */}
          <div className="absolute inset-0 bg-[#ffb700] mix-blend-hard-light" />
        </div>

        {/* Top labels */}
        <div className="relative flex items-start justify-between w-full">
          <span className="type-pixel tracking-[2px] uppercase text-gold-400">TEAMS</span>
          <span className="type-pixel tracking-[2px] uppercase text-gold-400">access</span>
        </div>

        {/* Center: name + role + actions */}
        <div className="relative flex flex-col gap-xl items-center w-full text-center">
          <div className="flex flex-col gap-xl items-start w-full">
            <p className="type-h1 text-black w-full text-center leading-[0.9] tracking-[-0.84px]">{name}</p>
            <p className="type-description uppercase text-gold-400 w-full text-center tracking-[-0.9px]">{title}</p>
          </div>
          <div className="flex items-center gap-xxxs">
            {actions.map(a => (
              <Button key={a} variant="on-color">{a}</Button>
            ))}
          </div>
        </div>

        {/* Bottom: tag dropdowns */}
        <div className="relative flex items-start justify-between w-full">
          <div className="flex flex-wrap gap-xxxs items-center">
            {teamTags.map(tag => (
              <Dropdown key={tag} variant="on-color" showLabel={false} defaultValue={tag} className="w-auto" />
            ))}
            <Button variant="on-color">add</Button>
          </div>
          <div className="flex flex-wrap gap-xxxs items-center justify-end">
            <Dropdown variant="on-color" showLabel={false} defaultValue={accessLevel} className="w-auto" />
            <Button variant="on-color">add</Button>
          </div>
        </div>
      </div>
    );
  }

  // Variant 2: light/grayscale
  return (
    <div className={`relative flex flex-col h-[480px] p-xl rounded-[12px] overflow-hidden gap-[160px] items-center justify-end ${className}`}>
      {/* Light photo bg with fade gradient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-bg" />
        <img src={imgSrc} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* Name + role */}
      <div className="relative flex flex-col gap-xl items-start w-full text-center">
        <p className="type-h1 text-black w-full text-center leading-[0.9] tracking-[-0.84px]">{name}</p>
        <p className="type-description uppercase text-black w-full text-center tracking-[-0.9px]">{title}</p>
      </div>

      {/* CTA actions */}
      <div className="relative flex flex-col gap-xl items-center">
        <div className="flex items-center gap-xxxs">
          {actions.map(a => (
            <Button key={a} variant="cta-small">{a}</Button>
          ))}
        </div>
        <SwitchGroup items={switchItems} />
      </div>
    </div>
  );
}
