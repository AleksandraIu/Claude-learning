import PreviewNav from './PreviewNav';

/* ── Color data ─────────────────────────────────────────── */
const primitiveColors = [
  { name: 'black',      hex: '#000000', tw: 'bg-black',      label: 'Black' },
  { name: 'gray-100',   hex: '#eaeaea', tw: 'bg-gray-100',   label: 'Gray 100' },
  { name: 'white',      hex: '#ffffff', tw: 'bg-white',       label: 'White', border: true },
  { name: 'yellow-400', hex: '#ffe900', tw: 'bg-yellow-400', label: 'Yellow 400' },
  { name: 'gold-400',   hex: '#d1a63b', tw: 'bg-gold-400',   label: 'Gold 400' },
  { name: 'pink-100',   hex: '#f5cfca', tw: 'bg-pink-100',   label: 'Pink 100' },
  { name: 'rose-100',   hex: '#fad5e7', tw: 'bg-rose-100',   label: 'Rose 100' },
  { name: 'purple-100', hex: '#ddd6ef', tw: 'bg-purple-100', label: 'Purple 100' },
  { name: 'olive-100',  hex: '#e0e2a4', tw: 'bg-olive-100',  label: 'Olive 100' },
  { name: 'mint-100',   hex: '#d4eee7', tw: 'bg-mint-100',   label: 'Mint 100' },
  { name: 'peach-100',  hex: '#f5dedb', tw: 'bg-peach-100',  label: 'Peach 100' },
];

const semanticColors = [
  { token: 'bg',            hex: '#ffffff', role: 'Page background' },
  { token: 'bg-subtle',     hex: '#eaeaea', role: 'Card, panel background' },
  { token: 'bg-ink',        hex: '#000000', role: 'Dark surface' },
  { token: 'text',          hex: '#000000', role: 'Body text' },
  { token: 'text-on-dark',  hex: '#ffffff', role: 'Text on dark bg' },
  { token: 'border',        hex: '#eaeaea', role: 'Dividers, outlines' },
  { token: 'primary',       hex: '#ffe900', role: 'CTA, active state' },
  { token: 'primary-hover', hex: '#d1a63b', role: 'CTA hover' },
  { token: 'status-pink',   hex: '#f5cfca', role: 'Status: pink' },
  { token: 'status-rose',   hex: '#fad5e7', role: 'Status: rose' },
  { token: 'status-purple', hex: '#ddd6ef', role: 'Status: purple' },
  { token: 'status-olive',  hex: '#e0e2a4', role: 'Status: olive' },
  { token: 'status-mint',   hex: '#d4eee7', role: 'Status: mint' },
  { token: 'status-peach',  hex: '#f5dedb', role: 'Status: peach' },
];

/* ── Typography data ────────────────────────────────────── */
const typeStyles = [
  { name: 'H1',           cls: 'type-h1',          sample: 'Heading One',           meta: 'Instrument Serif · 84/76 · Regular' },
  { name: 'H2',           cls: 'type-h2',          sample: 'Heading Two',           meta: 'Instrument Serif · 40/36 · Regular' },
  { name: 'Description',  cls: 'type-description', sample: 'Description text',      meta: 'Pixform · 30/27 · Regular' },
  { name: 'H3',           cls: 'type-h3',          sample: 'Section heading',       meta: 'Akkurat LL Cyrillic · 20/18 · Semibold' },
  { name: 'H4',           cls: 'type-h4',          sample: 'Sub-section heading',   meta: 'Akkurat LL Cyrillic · 15/14 · Semibold' },
  { name: 'Text Pixel',   cls: 'type-pixel',       sample: 'Pixel body text sample', meta: 'Pixform · 10/9 · Regular' },
  { name: 'Text Grotesk', cls: 'type-grotesk',     sample: 'Grotesk body text sample', meta: 'Akkurat LL Cyrillic · 11/10 · Regular' },
  { name: 'Text Bold',    cls: 'type-bold',        sample: 'Bold body text sample', meta: 'Akkurat LL Cyrillic · 11/10 · Bold' },
  { name: 'Caps',         cls: 'type-caps',        sample: 'caps label text',       meta: 'Akkurat LL Cyrillic · 8/7 · Regular · Uppercase' },
];

/* ── Spacing data ───────────────────────────────────────── */
const spacingScale = [
  { name: 'xxxs', value: '2px',  tw: 'w-xxxs' },
  { name: 'xxs',  value: '4px',  tw: 'w-xxs' },
  { name: 'xs',   value: '8px',  tw: 'w-xs' },
  { name: 's',    value: '14px', tw: 'w-s' },
  { name: 'm',    value: '20px', tw: 'w-m' },
  { name: 'l',    value: '24px', tw: 'w-l' },
  { name: 'xl',   value: '30px', tw: 'w-xl' },
  { name: 'xxl',  value: '60px', tw: 'w-xxl' },
  { name: 'neg-1', value: '-1px', tw: null },
];

/* ── Sections ───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="type-h3 mb-l border-b border-border pb-xs">{children}</h2>;
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="type-h4 mb-m mt-l" style={{ color: '#6b6b6b' }}>{children}</h3>;
}

export default function StylesPreview() {
  return (
    <div className="min-h-screen bg-bg-page text-text p-xxl">
      <div className="max-w-5xl mx-auto">
        <PreviewNav />
        <h1 className="type-h1 mb-xxl">Styles</h1>

        {/* ── COLORS ── */}
        <section className="mb-xxl">
          <SectionLabel>Colors</SectionLabel>

          <SubLabel>Primitive palette — 11 tokens</SubLabel>
          <div
            className="grid gap-m mb-l"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
          >
            {primitiveColors.map(({ name, hex, tw, label, border }) => (
              <div key={name}>
                <div
                  className={[
                    'h-xxl rounded-l mb-xxs',
                    tw,
                    border ? 'border border-border' : '',
                  ].join(' ')}
                />
                <p className="type-grotesk font-bold">{label}</p>
                <p className="type-grotesk" style={{ color: '#6b6b6b' }}>{hex}</p>
                <p className="type-caps text-border mt-xxxs">{name}</p>
              </div>
            ))}
          </div>

          <SubLabel>Semantic aliases — 14 tokens</SubLabel>
          <div className="space-y-xxs">
            {semanticColors.map(({ token, hex, role }) => (
              <div key={token} className="flex items-center gap-m">
                <div
                  className="w-m h-m rounded-l shrink-0 border border-border"
                  style={{ background: hex }}
                />
                <div className="flex-1 grid gap-xs" style={{ gridTemplateColumns: '200px 1fr 80px' }}>
                  <span className="type-grotesk font-bold">color/{token}</span>
                  <span className="type-grotesk" style={{ color: '#6b6b6b' }}>{role}</span>
                  <span className="type-grotesk text-right" style={{ color: '#6b6b6b' }}>{hex}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TYPOGRAPHY ── */}
        <section className="mb-xxl">
          <SectionLabel>Typography</SectionLabel>
          <div className="space-y-l">
            {typeStyles.map(({ name, cls, sample, meta }) => (
              <div key={name} className="border-b border-border pb-l last:border-0">
                <div className="flex items-baseline justify-between mb-xs">
                  <span className="type-caps text-border">{name}</span>
                  <span className="type-grotesk" style={{ color: '#6b6b6b', fontSize: '10px' }}>{meta}</span>
                </div>
                <p className={cls}>{sample}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SPACING ── */}
        <section className="mb-xxl">
          <SectionLabel>Spacing</SectionLabel>
          <div className="space-y-xs">
            {spacingScale.map(({ name, value, tw }) => (
              <div key={name} className="flex items-center gap-m">
                <span className="type-grotesk font-bold w-xxl shrink-0">space/{name}</span>
                <span className="type-grotesk w-s shrink-0" style={{ color: '#6b6b6b' }}>{value}</span>
                {tw ? (
                  <div className="bg-primary rounded-s" style={{ width: value, height: '16px', minWidth: '2px' }} />
                ) : (
                  <span className="type-grotesk italic" style={{ color: '#6b6b6b' }}>negative offset</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── RADIUS ── */}
        <section className="mb-xxl">
          <SectionLabel>Radius</SectionLabel>
          <div className="flex gap-l flex-wrap">
            {[
              { name: 'radius/l', value: '4px', cls: 'rounded-l' },
              { name: 'radius/m', value: '4px', cls: 'rounded-m' },
              { name: 'radius/s', value: '4px', cls: 'rounded-s' },
              { name: 'radius/over', value: '9999px', cls: 'rounded-over' },
            ].map(({ name, value, cls }) => (
              <div key={name} className="flex flex-col items-center gap-xs">
                <div
                  className={['w-xxl h-xxl bg-primary border border-yellow-400', cls].join(' ')}
                />
                <p className="type-grotesk font-bold">{name}</p>
                <p className="type-grotesk" style={{ color: '#6b6b6b' }}>{value}</p>
              </div>
            ))}
          </div>
          <p className="type-grotesk mt-m" style={{ color: '#6b6b6b' }}>
            Note: all Figma rounds/* variables = 4px. radius/over uses 9999px for pill shape (semantic override).
          </p>
        </section>

      </div>
    </div>
  );
}

