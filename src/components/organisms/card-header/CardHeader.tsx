// CardHeader: full hero card. Two variants.
// Default: golden/yellow tinted photo bg + name + role (gold text) + black action pills + gold "add" buttons.
// Variant2: full-bleed hero bg (breaks out of card to 100vw) + centered content + SwitchGroup.
// D26: action buttons = cta-small (black). "add" = bg-gold-400 text-text-on-dark.
// D34: variant2 hero is now full-bleed (left: calc(50%−50vw), w-screen). No overflow-hidden on outer div.
//   bg changed from bg-bg → bg-bg-page. Gradient from-transparent to-bg-page.
//   Two-photo composition matches Figma 357:58935 (base + mix-blend-plus-lighter overlay).
//   Defaults updated to "All teams" content per Figma 357:58935.
// Photo URLs from Figma MCP expire after 7 days — replace with permanent assets in production.
import Button from '../../atoms/button/Button';
import Dropdown from '../../atoms/dropdown/Dropdown';
import SwitchGroup from '../../atoms/switch-group/SwitchGroup';

const PHOTO_DEFAULT  = 'https://www.figma.com/api/mcp/asset/cad54573-1c04-43d4-ae95-0f644364ba4d';
// D36: URLs refreshed 2026-06-28 (Figma MCP assets expire after 7 days).
const PHOTO_V2_BASE  = 'https://www.figma.com/api/mcp/asset/b0beb859-194e-4a6a-b8bd-4a8f1a87523e';
const PHOTO_V2_BLEND = 'https://www.figma.com/api/mcp/asset/34c9c27a-b984-4834-8fa9-b13f876628b3';
// Person profile photo (for screens that override variant2 with person content):
export const PHOTO_PERSON = 'https://www.figma.com/api/mcp/asset/dbf30515-2c4d-4842-aac5-47224e43f4c6';

export type CardHeaderVariant = 'default' | 'variant2';

interface CardHeaderProps {
  variant?: CardHeaderVariant;
  name?: string;
  title?: string;
  accessLevel?: string;
  teamTags?: string[];
  switchItems?: { label: string }[];
  actions?: string[];
  photo?: string;
  photoOverlay?: string;
  /** D35: px above card top the image extends (matches Figma top-[-178px]; = header+gap height) */
  imageTopOffset?: number;
  /** D35: full image height in px (matches Figma h-[632px]) */
  imageHeight?: number;
  className?: string;
}

function AddButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 items-center justify-center px-s py-xs rounded-over bg-gold-400 hover:opacity-90 transition-all duration-150 ease-in-out"
    >
      <span className="type-pixel tracking-[2px] uppercase whitespace-nowrap text-text-on-dark">add</span>
    </button>
  );
}

export default function CardHeader({
  variant = 'default',
  name = 'All teams',
  title = 'Overview of all teams\nand their performance metrics',
  accessLevel = 'LEVEL 4 (CODE RED)',
  teamTags = ['frontend-team', 'Innovation Lab', 'Lead Developer', 'Member'],
  switchItems = [{ label: 'Overview' }, { label: 'Employees' }, { label: 'Report' }],
  actions = ['add team'],
  photo,
  photoOverlay,
  imageTopOffset = -178,
  imageHeight = 632,
  className = '',
}: CardHeaderProps) {
  const isDefault = variant === 'default';

  if (isDefault) {
    const imgSrc = photo ?? PHOTO_DEFAULT;
    return (
      <div className={`relative flex flex-col h-[480px] p-xl rounded-[12px] overflow-hidden items-start justify-between ${className}`}>
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px] overflow-hidden">
          <img src={imgSrc} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-black mix-blend-color" />
          {/* D24: #ffb700 not in tokens — golden tint overlay */}
          <div className="absolute inset-0 bg-[#ffb700] mix-blend-hard-light" />
        </div>

        <div className="relative flex items-start justify-between w-full">
          <span className="type-pixel tracking-[2px] uppercase text-gold-400">TEAMS</span>
          <span className="type-pixel tracking-[2px] uppercase text-gold-400">access</span>
        </div>

        <div className="relative flex flex-col gap-xl items-center w-full text-center">
          <div className="flex flex-col gap-xl items-start w-full">
            <p className="type-h1 text-black w-full text-center leading-[0.9] tracking-[-0.84px]">{name}</p>
            <p className="type-description uppercase text-gold-400 w-full text-center tracking-[-0.9px]">{title}</p>
          </div>
          <div className="flex items-center gap-xxxs">
            {actions.map(a => (
              <Button key={a} variant="cta-small">{a}</Button>
            ))}
          </div>
        </div>

        <div className="relative flex items-start justify-between w-full">
          <div className="flex flex-wrap gap-xxxs items-center">
            {teamTags.map(tag => (
              <Dropdown key={tag} variant="on-color" showLabel={false} defaultValue={tag} className="w-auto" />
            ))}
            <AddButton />
          </div>
          <div className="flex flex-wrap gap-xxxs items-center justify-end">
            <Dropdown variant="on-color" showLabel={false} defaultValue={accessLevel} className="w-auto" />
            <AddButton />
          </div>
        </div>
      </div>
    );
  }

  // Variant 2: full-bleed hero (image breaks out to 100vw), centered content + SwitchGroup
  const imgSrc     = photo        ?? PHOTO_V2_BASE;
  const imgOverlay = photoOverlay ?? PHOTO_V2_BLEND;
  return (
    <div className={`relative flex flex-col h-[480px] p-xl rounded-[12px] gap-[160px] items-center justify-end ${className}`}>
      {/* Full-bleed photo bg: breaks out to 100vw AND extends up to viewport top */}
      {/* D35: top=-178px (card starts at y=178; image extends behind header to y=0) */}
      {/* D35: h=632px per Figma. imageTopOffset/imageHeight props for per-screen override. */}
      <div
        aria-hidden
        className="absolute pointer-events-none w-screen left-[calc(50%_-_50vw)]"
        style={{ top: imageTopOffset, height: imageHeight }}
      >
        <div className="absolute inset-0 bg-bg-page" />
        <img src={imgSrc} alt="" className="absolute inset-0 size-full object-cover" />
        <img src={imgOverlay} alt="" className="absolute inset-0 size-full object-cover mix-blend-plus-lighter" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-page" />
      </div>

      {/* Centered text + CTA */}
      <div className="relative flex flex-col gap-xl items-center w-full text-center">
        <div className="flex flex-col gap-xl items-start w-full">
          <p className="type-h1 text-black w-full text-center leading-[0.9] tracking-[-0.84px]">{name}</p>
          <p className="type-description uppercase text-black w-full text-center tracking-[-0.9px] whitespace-pre-wrap">{title}</p>
        </div>
        <div className="flex items-center gap-xxxs">
          {actions.map(a => (
            <Button key={a} variant="cta-small">{a}</Button>
          ))}
        </div>
      </div>

      {/* SwitchGroup — yellow pill tabs at bottom */}
      <SwitchGroup items={switchItems} />
    </div>
  );
}
