# DECISIONS.md — Every Naming & Structure Call
**Principle:** One convention, no deviations, rationale on every line.

---

## D0. Mode

| Decision | Rationale |
|---|---|
| **APPLY mode** (not plan-only) | `use_figma` present in MCP tools — write capability confirmed. Proceeding to rename in Figma, not just producing maps. |

---

## D1. Master Naming Convention

| Rule | Decision | Rationale |
|---|---|---|
| Token path separator | `/` (slash) | Standard design token format; matches Style Dictionary convention |
| Token segment casing | `lowercase` | Consistent with npm/CSS convention; no mixed-case ambiguity |
| Component name separator | `-` (hyphen / kebab-case) | Maps cleanly to React file names; no space or underscore edge cases |
| Component name casing | `all-lowercase-kebab` | React components use PascalCase in code; Figma names → file names → auto-PascalCase on import |
| Abbreviations | None except industry-standard | Self-documenting names reduce cognitive load for new contributors |
| Plurals in component names | Avoided | Component represents one instance; plural is the consumer's job |

---

## D2. Token Convention: `category/role/scale`

| Token type | Pattern | Examples |
|---|---|---|
| Color | `color/[role]` | `color/primary`, `color/background` |
| Font family | `font/family/[name]` | `font/family/serif`, `font/family/grotesk` |
| Font size | `font/size/[role]` | `font/size/h1`, `font/size/text-pixel` |
| Font line-height | `font/line-height/[role]` | `font/line-height/h1` |
| Font weight | `font/weight/[name]` | `font/weight/regular`, `font/weight/bold` |
| Spacing | `space/[scale]` | `space/xs`, `space/m` |
| Radius | `radius/[scale]` | `radius/l` |

**Decision: Rename `indents/*` → `space/*`** — "indents" is Figma-centric; "space" is standard in design tokens and Style Dictionary.

---

## D3. Font Family Variable Fixes

| Old variable | Action | New value | Rationale |
|---|---|---|---|
| `font/family/Antiqa` | **Delete** | — | Duplicate of `antiqa` with wrong casing |
| `font/family/antiqa` | Rename → `font/family/serif` + fix value | `Instrument Serif` | "antiqa" is opaque; "serif" is self-documenting |
| `font/family/grotesk` | Fix value | `Akkurat LL Cyrillic` | Was placeholder "Inter" |
| `font/family/pixel` | Fix value | `Pixform` | Was placeholder "Inter" |

**Decision: `antiqa` → `serif`** — The word "antiqa" is the old-style/antiqua serif classification; using the functional role "serif" is more universally understood.

---

## D4. Font Size Variable Renames

| Old name | New name | Rationale |
|---|---|---|
| `font/size/text - gr` | `font/size/text-grotesk` | Remove spaces; spell out abbreviation |
| `font/size/M` | `font/size/h4` | `M` clashes with spacing scale; H4 is the actual style using this size |

---

## D5. Spacing Token Rename

| Old prefix | New prefix | Rationale |
|---|---|---|
| `indents/*` | `space/*` | Industry standard; avoids Figma-specific terminology in exported tokens |

Scale mapping:
| Old | New |
|---|---|
| `indents/-1` | `space/-1` |
| `indents/XXXS` | `space/xxxs` |
| `indents/XXS` | `space/xxs` |
| `indents/XS` | `space/xs` |
| `indents/S (inner)` | `space/s` |
| `indents/M` | `space/m` |
| `indents/L` | `space/l` |
| `indents/XL` | `space/xl` |
| `indents/XXL (out)` | `space/xxl` |

---

## D6. Component Renames — Atoms

| Old name | New name | Rationale |
|---|---|---|
| `btn` | `button` | Full word; abbreviation inconsistent with all other atom names |
| `text_area` | `text-area` | Snake → kebab; consistent separator |
| `switch group` | `switch-group` | Space → hyphen |
| `avatars` | `avatar-group` | Plural → singular + role suffix; clarifies it's a composed group |

---

## D7. Component Renames — Molecules

| Old name | New name | Rationale |
|---|---|---|
| `campaign_preview` | `campaign-preview` | Snake → kebab |
| `project_preview` | `project-preview` | Snake → kebab |
| `experience_preview` | `experience-preview` | Snake → kebab |
| `card metric` | `metric-card` | Space → hyphen; noun-adjective reversed to noun-first (React component convention) |
| `Cards metrica` | `metric-card-tall` | Normalized; "tall" distinguishes the taller variant (201×349 vs 190×196); "metrica" removed (non-English) |
| `attemt` | `attempt` | Typo fix |

---

## D8. Component Renames — Organisms

| Old name | New name | Rationale |
|---|---|---|
| `canban` | `kanban` | Typo fix — standard English spelling |
| `topmenu` | `top-menu` | Word separator for readability |
| `card top` | `card-header` | Space → hyphen; "top" is positional, "header" is the role |
| `menu_switch` | `menu-switch` | Snake → kebab |

---

## D9. Design Screens (example-only, in `design` section)

Convention: `screen-[feature-area]-[variant]` where variant distinguishes duplicates.

| Old name | New name | Node ID |
|---|---|---|
| `Frame 1450` | `story-hire-flow-1` | 357:58710 |
| `Frame 1451` | `story-hire-flow-2` | 357:58719 |
| `Frame 1452` | `story-hire-flow-3` | 357:58726 |
| `Frame 1453` | `story-hire-flow-4` | 357:58734 |
| `::` | `story-hire-doc` | 357:58742 |
| `Hiring_campaign` (1st) | `screen-hiring-campaign-a` | 357:58749 |
| `Hiring_campaign` (2nd) | `screen-hiring-campaign-b` | 357:58759 |
| `All_teams_campaigns` (1st) | `screen-teams-campaigns-a` | 357:58769 |
| `All_teams_campaigns` (2nd) | `screen-teams-campaigns-b` | 357:58778 |
| `All_teams_campaigns` (3rd) | `screen-teams-campaigns-c` | 357:58787 |
| `Candidate` (1st) | `screen-candidate-a` | 357:58796 |
| `Negotiate` | `screen-negotiate` | 357:58848 |
| `Candidate_interviewed` | `screen-candidate-interviewed` | 357:58872 |
| `All_teams` (1st) | `screen-all-teams-a` | 357:58932 |
| `All_teams` (2nd) | `screen-all-teams-b` | 357:58948 |
| `All_teams` (3rd) | `screen-all-teams-c` | 357:58972 |
| `All_teams_one` | `screen-all-teams-single` | 357:58993 |
| `Candidate` (2nd) | `screen-candidate-b` | 357:59014 |
| `Hiring_campaign` (3rd) | `screen-hiring-campaign-c` | 357:59066 |
| `Hiring_campaign_add` | `screen-hiring-campaign-add` | 357:59085 |
| `Success` | `screen-success` | 357:59099 |
| `Automation_mail-editor` (1st) | `screen-automation-editor-a` | 357:59110 |
| `Automation_mail-editor` (2nd) | `screen-automation-editor-b` | 357:59152 |
| `Automation_mail-editor` (3rd) | `screen-automation-editor-c` | 357:59194 |
| `Hiring_campaign_wizard` | `screen-hiring-wizard` | 357:59234 |
| `Hiring_campaign_wizard--viewport` | `screen-hiring-wizard-viewport` | 357:59275 |
| `Frame 1454` | `story-hire-flow-5` | 357:59319 |

---

## D10. Other Frames

| Old name | New name | Node ID | Rationale |
|---|---|---|---|
| `Frame 1728` | `nav-phase` | 2002:14494 | Annotation bar labelling Prepare/Styles/Atoms phases |

---

## D11. Typography Label Renames (in styles board)

| Old name | New name | Node ID | Rationale |
|---|---|---|---|
| `Description` | `description` | 2001:19522 | Title-case → lowercase; consistent with all other labels |
| `text - pixel` | `text-pixel` | 2001:19525 | Remove spaces around hyphen |
| `text - grotesk` | `text-grotesk` | 2001:19526 | Remove spaces around hyphen |
| `text--b` | `text-bold` | 2001:19527 | Double dash + opaque `b` → explicit kebab |

---

## D12. Orphan Handling

| Node ID | Name | Decision | Rationale |
|---|---|---|---|
| 357:59098 | `Ellipse 12` | **Delete** | Floating stray ellipse in design section, not in any frame, no reference |
| 11 color swatches in styles/colors | `Ellipse 12–22` | **Rename to `color/swatch-N` placeholder** | Can't read fill hex via MCP; user fills real semantic names after |

---

## D13. Deferred to Later Phases

| Item | Deferred to | Rationale |
|---|---|---|
| `Property 1=Default/Variant2` renaming | Atoms/Molecules/Organisms phases | Requires understanding component semantics; don't rename blindly in Prepare |
| Adding missing token values (line-heights, weights, colors) | Styles phase | Token values belong in Styles, not Prepare |
| Color swatch semantic names | Styles phase | Need hex values; MCP returns rasters — user fills in |

---

## D14. Styles Phase — Token Layer

| Decision | Rationale |
|---|---|
| **Two-tier tokens: primitives → semantic** | Semantic tokens reference primitives; changing a primitive cascades everywhere |
| **Color primitive names use Tailwind-style scale** (`gray-100`, `yellow-400`) | Self-documenting scale; matches CSS variable naming expectations |
| **Color semantic names use role not value** (`bg`, `text`, `border`, `primary`, `status-*`) | Role names survive redesigns; value names don't |
| **`--text-bold` omitted from @theme** | Same px as `--text-grotesk`; compose `text-grotesk font-bold` instead — avoids dead token |
| **`radius/over` = 9999px (not Figma's 4px)** | Figma variable is a placeholder; 9999px is the standard pill-shape value |
| **All `rounds/*` collapsed into 4 radius tokens** | Figma values are all identical (4px); keeping separate tokens preserves design intent |
| **Fonts served via Vite CSS url() from `../fonts/`** | Relative path in `styles/tokens.css` → Vite processes and copies to `dist/assets/`; no CDN |
| **Tailwind @theme overrides gray-100, yellow-400** | Design system owns the full palette; Tailwind defaults are replaced intentionally |
| **No dark mode** | Figma has no second variable collection; single `:root` context only |
| **Typography presets as `@layer components`** | Multi-property composite classes; not single-property utilities |
| **Preview router: BrowserRouter (not hash)** | Vite dev server handles all routes via fallback; BrowserRouter gives clean URLs |

---

## D15. Component Property Name Audit — Prepare Phase Finish (2026-06-23)

| Decision | Rationale |
|---|---|
| **`Property 1` on single-variant components: no action** | With only one variant, prop name has no functional impact on usage |
| **`Property 1` on multi-variant components: defer to build phases** | Renaming requires understanding component semantics; wrong rename corrupts instances throughout the design |
| **`Variant2` on attempt, task, card-header: defer to build phases** | Needs real semantic name (open/closed? expanded? loading?) — can't name blindly |
| **`second-row` variant `builider` → `builder`: APPLY NOW** | Pure typo; no semantic understanding needed |
| **`button` type="On color", `dropdown` Property 1="On color": defer** | Value has space, should be `on-color`; but rename requires variant property context to avoid breaking instances |

---

## D16. Color/* Semantic Variable Layer (2026-06-23)

| Decision | Rationale |
|---|---|
| **Leave all `Color/*` variables untouched** | These are the designer's internal Figma workspace layer — they feed component fills inside Figma but are NOT the token layer that feeds React code |
| **React code consumes `color/*` from tokens/primitives.ts, not Figma's `Color/*`** | Clean separation: Figma's `Color/*` = Figma-only; React's `color/*` = code-only |
| **`Color/superYellow` value fixed to #FFE900** | Was placeholder white — obvious mismatch with the name; fixed without semantic risk |
| **Most `Color/Background/*` left at #ffffff** | Designer's placeholder values — not our place to fill in; designer should connect these to swatch variables |

---

## D17. Internal Layer Auto-Names (Frame N, Rectangle N) (2026-06-23)

| Decision | Rationale |
|---|---|
| **Defer all internal Frame N / Rectangle N renames to build phases** | Internal names don't affect token export or component API; renaming blindly risks breaking layout constraints and nested instances |
| **Exception: `bar`'s 200+ Rectangle N are intentional** | The segmented progress bar is implemented as many small rectangles — this is architecture, not a naming bug |

---

## D18. Variable Fixes — Session 2 (2026-06-23)

| Variable | Fix | Rationale |
|---|---|---|
| `font/size/h4` (duplicate) | Deleted extra | Left over from two rename passes; keep one |
| `font/size/text - px` → `font/size/text-pixel` | Rename + value 11→10 | Spaces removed; value corrected (Pixform = 10px, not 11) |
| `font/size/h1` value: 44 → 84 | Fix | Wrong value; 84 is confirmed from type table |
| `font/size/h2` value: 30 → 40 | Fix | Wrong value; 40 is confirmed from type table |
| `size/base with` → `size/base-width` | Rename | Typo "with" → "width"; space removed |
| `radius/L` → `radius/l` | Rename | Lowercase per D1 convention |
| `rounds/S` → `radius/s` | Rename | Prefix normalized to `radius/*` for consistency |
| `rounds/M` → `radius/m` | Rename | Same |
| `rounds/Over` → `radius/over` | Rename | Same |
| `rounds/L` | Deleted | Duplicate of `radius/l` (same value = 4px) |
| `size=XXL (out):90` (styles board label) | Renamed → `size=XXL (out):60` | Stale label; live variable = 60px |

---

## D19. Atoms Phase — Token Gaps (Styles-layer additions needed)

Discovered while mapping Figma atom values to existing tokens. These are NOT in `@theme`. Atoms use Tailwind arbitrary values as documented placeholders; Styles phase must add them before production.

| Missing token | Figma variable | Hex | Used in | Temp workaround |
|---|---|---|---|---|
| `--color-status-purple` | `color/tech/purple` | `#9747ff` | Status (purple dot + text) | `text-[#9747ff]` / `bg-[#9747ff]` |
| `--color-status-green`  | `color/tech/green`  | `#00867b` | Status (green dot + text) | `text-[#00867b]` / `bg-[#00867b]` |
| `--color-status-red`    | `color/tech/red`    | `#cc0000` | Status (red), ErrorBanner | `text-[#cc0000]` / `bg-[#cc0000]` |
| `--color-status-gray`   | `color/tech/gray`   | `#cbcbcb` | Status (stopped), TextArea placeholder | `text-[#cbcbcb]` |
| `--color-text-secondary`| `color/text-&-icon/secondary` | `#979797` | Switch inactive, Dropdown placeholder, Graph bars | `text-[#979797]` / `bg-[#979797]` |
| `--color-bar-filled`    | `color/bar/on-base-filled` | `#b8c6c3` | Bar filled segments | `bg-[#b8c6c3]` |
| `--color-error-bg`      | `color/background/on-cads/red` | `#f7e0dd` | ErrorBanner bg, Button node bg | Mapped to `bg-peach-100` (#f5dedb, ≈2 hex steps) |
| `--tracking-pixel`      | n/a | `letter-spacing: 2px` | All Pixform (type-pixel) text | `tracking-[2px]` |
| `--tracking-caps`       | n/a | `letter-spacing: 1.6px` | All caps-grotesk labels | `tracking-[1.6px]` |
| Control height 32px     | n/a | `h-8` (Tailwind default 2rem) | Input, Switch, Dropdown, Button pill, List button | `h-8` |
| Bar dot sizes           | n/a | 5px (default) / 12px (big) | Bar component | Computed via `dotPx` variable in `style={{}}` |
| Graph max height        | n/a | 82px (relative to 100 unit) | Graph component | Computed via `maxH` constant in `style={{}}` |
| Avatar overlap          | `space/neg-1` = -1px | -8px | AvatarGroup | `-mr-[8px]` arbitrary |

---

## D20. Atoms Phase — Prop Naming Decisions

| Figma variant property | Mapped to prop | Rationale |
|---|---|---|
| `CTA?=yes/no` × `type=small/big` | `variant='cta-small'` / `variant='cta-big'` | Flattened to single `variant` string; CTA flag is context, not a separate prop |
| `type=On color` | `variant='on-color'` | Normalized to kebab per D1 |
| `type=node` | `variant='node'` | Direct from Figma name |
| `switch=on/off` | `active: boolean` | Semantic boolean replaces string enum |
| `Property 1=yes/no` (Flag) | `active: boolean` | Same pattern |
| `Property 1=katya/dog/petya` (Avatar) | `variant` prop + `src` override | Photos replaced with initial-letter placeholder; `src` prop accepts real image URL |
| `Error` component | `ErrorBanner` (TypeScript export name) | Avoids clash with built-in `Error` class |
| Bar `length=75%/20%` | `value: number` (0–100) | Generic numeric prop more reusable than fixed string enum |

---

## D21. Atoms Refine — Page Background Token (2026-06-24)

| Decision | Rationale |
|---|---|
| **Use existing `bg-bg` (= `color.bg.default` = white) as the page surface** | `color.bg.default = white` already maps to `bg-bg` Tailwind utility; no new token needed. Preview was using `bg-bg-subtle` (gray-100), same color as most component backgrounds — gray on gray. Switched to white so gray-100 components read as elevated. |
| **No new token added to semantic.ts** | Existing token is adequate. |

---

## D22. Atoms Refine + Molecules — New Token Gaps (2026-06-24)

Discovered while building atom interaction states and 10 molecule components.

| Missing token | Figma variable | Hex | Used in | Temp workaround |
|---|---|---|---|---|
| `--color-card-green` | `color/background/cards/green` | `#d4eee7` | MetricCard, Team, Notify bg | `bg-[#d4eee7]` |
| `--color-card-red` | `color/background/cards/red` | `#f5cfca` | NodeCard bg | `bg-[#f5cfca]` |
| `--color-tag-yellow` | `color/background/on-cads/yellow-dark` | `#fffd9e` | ProjectPreview tags | `bg-[#fffd9e]` |
| `--spacing-x` | `indents/x` | `30px` | All card molecule padding | `p-[30px]` |
| `--radius-l` value | `rounds/l` in Figma = **12px** | D18 incorrectly noted as 4px | All card borders | `rounded-[12px]`; fix primitives `radius.l = 12` |
| Button hover (secondary) | n/a | `#d4d4d4` | Button secondary hover | `hover:bg-[#d4d4d4]` |
| Input/TextArea hover | n/a | `#d4d4d4` | Input, TextArea hover bg | `hover:bg-[#d4d4d4]` |
| Notify text size | n/a | `30px` | Notify headline (between h3=20 and h2=40) | `text-[30px]` |

---

## D23. Atom Fixes 2 — Dropdown Color, Button Hover, Input Error (2026-06-24)

### Dropdown on-color empty state
| Aspect | Before | After | Rationale |
|---|---|---|---|
| Placeholder text (on-color, no selection) | `text-[#979797]` | `text-white/50` | Figma node 357:35401 shows `opacity-50 text-[color:var(--color/text-&-icon/on-color,white)]`. No secondary-text token exists in @theme → used `text-white/50` (Tailwind v4 opacity modifier, zero new hardcodes). |

### Button hover (cta-small, cta-big, node)
| Variant | Before | After | Rationale |
|---|---|---|---|
| `cta-small` (black pill) | `hover:opacity-85` | `hover:opacity-70` | 15% delta on pure black is nearly invisible; 30% delta is clearly perceptible. No Figma hover-state token exists for CTA buttons. Flagged as token gap. |
| `cta-big` (black card) | `hover:opacity-85` | `hover:opacity-70` | Same rationale. |
| `node` (peach card) | `hover:opacity-90` | `hover:opacity-75` | 10% delta on peach too subtle; 25% gives visible darkening without new token. |
| Token gap | — | Flagged | No `color/interactive/hover` token in @theme for CTA black or node variants. |

### Input error state — editable
| Aspect | Before | After | Rationale |
|---|---|---|---|
| Preview error demo | `value="bad input"` (controlled, read-only) | `defaultValue="bad input"` (uncontrolled) | React: controlled input without `onChange` is read-only. Error appearance must not block typing. Added `defaultValue` prop to Input.tsx; preview uses it so field stays editable while showing error styles. |

---

## D24. Atom/Molecule Fixes + Organisms Build (2026-06-25)

### PART 1 — Atom/molecule fixes

#### Button cta-big hover
| Aspect | Before | After | Rationale |
|---|---|---|---|
| cta-big hover | `hover:opacity-70` (black at 70% = medium gray #4d4d4d) | `hover:bg-black/90` (black at 90% opacity = dark charcoal ~#1a1a1a) | Task: "clearly still a dark button, NOT gray." Opacity on pure black against white always produces gray. `bg-black/90` uses existing `black` token with opacity modifier → renders as ~#1a1a1a. No new token. |

#### Dropdown option contrast (on-color variant)
| Aspect | Before | After | Rationale |
|---|---|---|---|
| Unselected options (on-color) | `text-[#979797]` (D19 gap, low contrast on gold bg) | `text-black/50` (50% black — readable on gold, distinct from selected `text-black`) | No secondary-text token exists. `black/50` uses existing `black` token + opacity modifier. Zero new hardcodes. |

#### ProjectPreview line-height
| Aspect | Before | After | Rationale |
|---|---|---|---|
| description `<p>` line-height | `type-h3` → `line-height: 18px` (less than font-size 20px → lines overlap in multiline text) | `type-h3 leading-[normal]` → `line-height: normal` (~1.2 × 20px = ~24px) | Figma node 357:35493 specifies `leading-[normal]`. Cannot change `--leading-h3` token (no-token-layer rule). `leading-[normal]` is a CSS keyword, not a hardcoded px value. |

#### Team bar green circles
| Aspect | Before | After | Rationale |
|---|---|---|---|
| Bar filled color (Team) | `bg-[#b8c6c3]` (default grayish-mint) | `bg-[#00867b]` (dark teal = `color/text-&-icon/green` D19 gap) | Figma node 357:35512 shows bar dots in `#00867b`. No token exists for this value. |
| Bar empty color (Team) | `bg-white` (invisible on white Team card) | `bg-mint-100` (`--color-mint-100 = #d4eee7` — TOKEN EXISTS in @theme) | Mint empty dots are visible on white card background. Token is `--color-mint-100` mapped to `bg-mint-100`. |
| Bar atom | No `color` prop | Added `color?: 'default' | 'green'` | Allows Team (and future green-context bars) to opt in to green color scheme. |

#### D22 gap cleanup — tokens found in @theme
Previously documented as D22 "no token" — tokens were in @theme all along:
| Component | Before (D22 workaround) | After (real token) |
|---|---|---|
| MetricCard bg | `bg-[#d4eee7]` | `bg-mint-100` (`--color-mint-100: #d4eee7`) |
| Notify bg | `bg-[#d4eee7]` + `p-[30px]` + `rounded-[12px]` | `bg-mint-100 p-xl rounded-[12px]` (`--spacing-xl: 30px`) |
| MetricCard padding | `p-[30px]` | `p-xl` (`--spacing-xl: 30px`) |
| NodeCard bg | `bg-[#f5cfca]` | `bg-pink-100` (`--color-pink-100: #f5cfca`) |

Note: `rounded-[12px]` still hardcoded — `--radius-l = 4px` in tokens doesn't match Figma 12px. D22 ongoing.

### PART 2 — Organisms (7 built)

| Organism | Variant props | Atoms/Molecules composed | Key token gaps |
|---|---|---|---|
| MenuSwitch | `active: boolean` | — | `p-[10px]` (D24: between xs=8 and s=14) |
| SecondRow | `type: 'default' \| 'builder'` | Button | `border-[#00867b]` back-button (D19) |
| TopMenu | `activeTab: 'all' \| 'templates' \| 'off'` | Button, MenuSwitch | — |
| Header | `activeTab, secondRowType, pipelineValue` | TopMenu, SecondRow, Bar | `text-[#979797]` stage labels (D19) |
| Kanban | `headline, columns[]` | Avatar | `gap-[50px]` (no token, xl=30/xxl=60), `pb-[84px]` (h1 size as padding), `rounded-[12px]` (D22), `text-[#cbcbcb]` count (D19) |
| Task | `variant: 'default' \| 'active'` | Flag, ErrorBanner, Button | `text-[#979797]` inactive text (D19) |
| CardHeader | `variant: 'default' \| 'variant2'` | Button, Dropdown, SwitchGroup | `bg-[#ffb700]` golden overlay (D24), `rounded-[12px]` (D22), photo URLs expire 7 days |

**D24 new gaps this session:**
- `#ffb700` — Figma `color/background/card-header-overlay` — golden hard-light tint for CardHeader photo. No token in @theme.
- `p-[10px]` — MenuSwitch horizontal padding (between `xs=8px` and `s=14px`). No token.
- `gap-[50px]` — Kanban section gap (between `xl=30` and `xxl=60`). No token.
- `pb-[84px]` — Kanban bottom padding (Figma uses `pb-[var(--font/size/h1)]`, repurposing font-size as spacing). No dedicated spacing token.

---

## D25. Preview Index Polish — /preview page only (2026-06-26)

| Decision | Rationale |
|---|---|
| **Eyebrow + subtitle contrast: `text-border` → `text-black/50`** | `text-border` = gray-100 (#eaeaea) on white = near-invisible. `text-black/50` = 50% opacity on `--color-black` → ~#808080 equivalent — clearly readable as secondary, not full-black. Uses existing `black` token + Tailwind v4 opacity modifier (established pattern from D23/D24). No new token. |
| **Badge labels: 'Live' → 'done' / 'in progress'** | "Live" conflates deployment status with build status. "done" reflects completion of that layer's component work. Organisms badge is "in progress" — organisms are built but the layer is still being iterated. |
| **Organisms status: 'done' → 'in-progress' badge styling** | Badge uses `bg-bg-subtle text-black/50` instead of `bg-primary text-black`. Visually distinguishes in-progress from done without new tokens. All 4 cards remain clickable (no `pointer-events-none`). |
| **Badge vertical padding: `py-xxxs` (2px) — kept as-is** | `--spacing-xxxs: 2px` already provides 2px top/bottom padding. No change needed — token was correct. |
| **Description line-height: `type-grotesk` default (10px) → + `leading-h3` (18px)** | `--leading-grotesk = 10px` on 11px font is tighter than 1× — barely breathes on multi-word descriptions. Added `leading-h3` utility (maps to `--leading-h3: 18px`, an existing token) to override. Looser, more legible. |
| **Description color: `style={{ color: '#6b6b6b' }}` → `text-black/50`** | Removed hardcoded hex. `text-black/50` visually matches intent (muted secondary) using existing `black` token. |
| **Layout: CSS grid with inline `gridTemplateColumns` → `flex flex-col gap-m`** | Removes the only remaining inline style (hardcoded grid template string). `flex flex-col` is a Tailwind utility; `gap-m` maps to `--spacing-m: 20px` (existing token). Each card now spans full width — one per row, 4 rows total. |

---

## D26. Refine — MenuSwitch reclassification + Figma-accuracy fixes (2026-06-26)

### 1. MenuSwitch: organism → atom

| Decision | Rationale |
|---|---|
| **MenuSwitch moved to `src/components/atoms/menu-switch/`** | Figma node 357:35722 is a single interactive pill button — no composition of other atoms. It is atomic by definition (one concern: active/inactive tab button). |
| **TopMenu import updated to `../../atoms/menu-switch/MenuSwitch`** | Follows new atom location. TopMenu remains an organism (composes MenuSwitch + Button). |
| **Organisms barrel removes MenuSwitch; Atoms barrel adds it** | Consistent with reclassification. |
| **Figma cross-page move: PENDING font fix** | Plugin sandbox cannot load "Akkurat LL Cyr TT" (same blocker as Step 1 Prepare). Cross-page `appendChild` requires `loadFontAsync` for all descendant text fonts. Must be done in Figma Desktop App with local fonts. |
| **MenuSwitch style unchanged** | Figma 357:35722: `h-[32px] p-[10px] rounded-[4px] type-grotesk text-black` + white border when active. Code matches. D24 gap `p-[10px]` unchanged — no token for 10px. |

### 2. TopMenu Generate Report button color

| Decision | Before | After | Token |
|---|---|---|---|
| **Generate Report fill** | `Button variant="secondary"` → `bg-gray-100` | Inline button with `bg-bg` (white) | `--color-bg: white` |
| **Reason** | Figma 357:35588: fill = `var(--color/bar/on-base-emty, white)` = white. `secondary` renders gray-100. | Matches Figma exactly. | Hover: `bg-bg-subtle` = `--color-bg-subtle: gray-100` |
| **Button atom not modified** | Modifying atom is out of task scope. | Inlined in TopMenu to avoid className override complexity. | — |
| **TopMenu Button import removed** | Button no longer used in TopMenu (both MenuSwitch and Generate Report are now inline). | Clean import. | — |

### 3. Header bar section spacing

| Decision | Before | After | Token |
|---|---|---|---|
| **Bar section vertical padding** | `py-s` (14px top + 14px bottom) | No vertical padding | Figma 357:35619 Frame 1382: `pt=0 pb=0` |
| **Gap bar → labels** | `gap-xs` (8px) | `gap-xs` (8px) — unchanged | Figma gap=8 = `--spacing-xs` ✓ |
| **Reason** | `py-s` created 14px whitespace above bar and below labels, making the bar float away from the content above/below it. Figma has zero vertical padding on that container. | — |

### 4. Bar atom rebuild — big variant

| Decision | Before | After |
|---|---|---|
| **Big variant dot structure** | Single 12×12px rounded circle per position | Two 5×5px circles stacked per column with `gap-xxxs` (2px) between rows |
| **Figma reference** | 357:34112 big variant: each column = `flex-col gap-[2px]` with 2 × `size-[5px]` dots. Total column height = 5+2+5 = 12px ✓ |
| **Dot size** | `dotPx = size === 'big' ? 12 : 5` | `DOT_PX = 5` (always 5px; D19 gap — no token for 5px) |
| **Default variant** | 1 row of `dotPx`-sized dots | 1 row of 5px dots (unchanged visually, structurally correct) |
| **Token gaps unchanged** | `rounded-[20px]`, `bg-[#b8c6c3]`, `bg-[#00867b]` | Same D19 documented gaps |

### 5. CardHeader — action buttons + "add" button

| Decision | Before | After | Token |
|---|---|---|---|
| **Action buttons (promote/negotiate/suspend/fire) in default variant** | `variant="on-color"` → `bg-white text-black` | `variant="cta-small"` → `bg-black text-white` | Figma 357:35712: `bg-[var(--color/black,black)]` |
| **"add" button color** | `Button variant="on-color"` → `bg-white text-black` | Inline `bg-gold-400 text-text-on-dark` | `--color-gold-400: #d1a63b`, `--color-text-on-dark: white` |
| **"add" button in variant2** | Missing | Added after action buttons | Same tokens as above |
| **Reason** | Figma 357:35695 = gold (#d1a63b) "add" button with white text. Must be DIFFERENT from action buttons (black) — gold vs black satisfies requirement. `on-color` variant = bg-white not gold — mismatch fixed. |
| **Button atom not modified** | No matching variant for `bg-gold-400 text-white`. Inlined in CardHeader using existing tokens only. | — |

### 6. Bar spacing from text (Header pipeline)

Already covered in D26 §3 (Header bar section vertical padding). Root cause: `py-s` = 14px extra padding above/below the bar+labels container. Fix: remove `py-s`.

### 7. Kanban text overflow

| Decision | Before | After |
|---|---|---|
| **Card text whitespace** | `whitespace-nowrap` on name and role → text overflows column bounds | Removed `whitespace-nowrap` — text wraps naturally |
| **Text column flex** | No `min-w-0` — flex child doesn't shrink below content width | Added `min-w-0` to text column and card container — allows shrink |
| **Reason** | Figma 357:35635: cards are `flex-1` columns in a responsive-width board. At viewport widths < 1440px, 20px grotesk names overflow. Wrapping gives correct behaviour. |

---

## D27. Step 5.3 — Transparency + transition fixes (2026-06-26)

### Figma MCP access blocker

All four Figma MCP tools (`get_design_context`, `get_screenshot`, `get_metadata`, `use_figma`) returned "no edit access" for file `H6GFjHHnvVhFGb9bqiYs8T`. Node 357:35619 (Header fill) could not be read. Item 4 (Header background) was inferred from the current preview rendering (bg-primary = #ffe900). Manual verification recommended: open Figma Desktop → select 357:35619 → check Fill → confirm it maps to `--color-yellow-400` / `bg-primary`.

### 1. MenuSwitch — transparent background

| Decision | Before | After | Token |
|---|---|---|---|
| **Component bg** | No bg class on button (already transparent) ✓ | No change needed | — |
| **Atoms preview container** | `bg-primary p-xs rounded-m` — yellow fill behind pills | `border border-gray-100 p-xs rounded-m` — outline only, no fill | `border-gray-100` = `--color-gray-100` |
| **Reason** | `bg-primary` in preview wrapper was misrepresenting the component as having a yellow background. Component is transparent; in real usage it inherits the Header's `bg-primary`. Outline border makes bounds visible without adding a fill. |

### 2. MenuSwitch — transition fix

| Decision | Before | After |
|---|---|---|
| **Transition on button** | `transition-all duration-150` — fires on BOTH the button gaining active and the button losing active → both buttons animate on every click | Removed entirely — active border snaps on/off instantly; no flash on deselected button |
| **Trade-off** | A sliding indicator (a single positioned element that moves) would animate ONLY motion, per spec, but requires DOM measurement or fixed-width pills — out of scope for this patch. Static active state (no transition) eliminates the deselect-flash bug with zero extra machinery. |

### 3. TopMenu — transparent background

| Decision | Before | After | Token |
|---|---|---|---|
| **Component bg** | No bg class on TopMenu container (already transparent) ✓ | No change needed | — |
| **Organisms preview wrapper** | `bg-primary rounded-s overflow-hidden` — yellow fill wrapping standalone TopMenu | `border border-gray-100 rounded-s overflow-hidden` — outline only | `border-gray-100` |
| **Reason** | Same as MenuSwitch: preview wrapper was making TopMenu appear filled. Component is transparent; full-context rendering (on yellow) is visible in the Header section of the same preview page. |

### 4. Header — background color

| Decision | Before | After | Token |
|---|---|---|---|
| **Background ownership** | No bg on Header component; preview wrapper provided `bg-primary` | `bg-primary` added to Header.tsx outer div — component owns its bg | `--color-primary: #ffe900` |
| **Organisms preview wrappers** | `bg-primary rounded-s overflow-hidden` (two instances) | `rounded-s overflow-hidden` (bg removed — Header provides it) | — |
| **Figma inference** | Could not read node 357:35619 fill directly (MCP access blocked). Color inferred as `bg-primary` from current preview rendering and TopMenu's `border-white` separator (indicates colored surface). Verify manually. |

---

## D28. Step 5.4 — MenuSwitch ON-state border (2026-06-26)

### Border properties — node 357:35723 (ON / active state) — verified from Figma

Read via `get_design_context` on file `zUJYCXcLeuUXDcCKkxpLR5` (shared copy with edit access). Figma output: `border border-solid border-white … rounded-[var(--space/xxs,4px)]`

| Property | Figma value | Token | Match |
|---|---|---|---|
| Border color | `border-white` / `--color/white` | `border-white` → `--color-white: #ffffff` | ✓ exact |
| Border width | `border` / 1px solid | Tailwind `border` utility (1px default) | ✓ exact |
| Border radius | `var(--space/xxs, 4px)` = 4px | `rounded-s` → `--radius-s: 4px` (on base button) | ✓ exact |

No new token gaps — all three properties map to existing tokens or Tailwind built-ins.

### Transition scope fix

| Decision | Before (5.3) | After (5.4) |
|---|---|---|
| `transition-all duration-150` location | Removed entirely (eliminated deselect flash but also lost enter animation) | Moved into `active` conditional — fires ONLY when becoming active |
| Mechanism | — | When active→inactive: CSS drops `transition` property at same tick border is removed → browser skips exit animation. When inactive→active: `transition-all` present when border is added → enters smoothly. |
| `duration-150` | Tailwind built-in (150ms) — no `--transition-*` token exists. Accepted as framework utility, not design token. |

---

## D30. Step 5.6 — MenuSwitch ON-state border not rendering (root cause + fix) (2026-06-26)

### Root cause

`border-white` (`--color-white: #ffffff`) on a white/transparent preview background = **zero contrast — invisible**. The border code was always correct. Step 5.3 changed the atoms preview wrapper from `bg-primary` (#ffe900 yellow) to `border border-gray-100` (gray outline on white page). White border on white background cannot be seen.

The component itself is designed to sit on `bg-primary` — in real app usage it is always inside Header which has `bg-primary`. The Figma node 357:35723 screenshot shows the white border against a dark/colored surface, confirming this is a context-dependent component.

### Fix

| File | Before | After |
|---|---|---|
| `src/preview/atoms.tsx` — MenuSwitch wrapper | `border border-gray-100 … w-fit` (gray outline, white bg) | `bg-primary p-xs rounded-m w-fit` (yellow context bg) |
| `MenuSwitch.tsx` | unchanged | unchanged — `border-white` / 1px / `rounded-s` correct throughout |

The component `<button>` retains no background class (transparent). Only the **preview wrapper** restores `bg-primary` to match the real usage context.

### Token audit (Step 5.3 decision revisited)

Step 5.3 intent: "menu-switch container must be transparent" — this referred to the COMPONENT having no fill (the button has no bg class ✓). It was misapplied to the preview context wrapper, stripping the yellow background that `border-white` requires for visibility. Preview context ≠ component fill.

---

## D29. Step 5.5 — CardHeader ADD button color verification (2026-06-26)

### Figma verification — node 357:35695

Read via `get_design_context` on file `zUJYCXcLeuUXDcCKkxpLR5`.

Figma output: `bg-[var(--color/controls/on-color/brown,#d1a63b)]` + `text-[color:var(--color/text-&-icon/on-color,white)]`

| Property | Figma value | Our token | Match |
|---|---|---|---|
| Background | `--color/controls/on-color/brown` = `#d1a63b` | `bg-gold-400` → `--color-gold-400: #d1a63b` | ✓ exact |
| Text | `--color/text-&-icon/on-color` = white | `text-text-on-dark` → `--color-text-on-dark: white` | ✓ exact |
| Radius | `var(--radius/over, 999px)` | `rounded-over` → `--radius-over: 9999px` | ✓ exact |

### Decision: NO CODE CHANGE

The ADD button is intentionally gold in Figma (`#d1a63b`), not black like the promote/negotiate/suspend/fire buttons (`cta-small` = black). The task's own condition applies: *"if ADD is intentionally a different variant in Figma, verify against Figma first; if Figma shows it black like the others, fix it."* Figma shows gold → current implementation (`bg-gold-400 text-text-on-dark`) is correct. No change made.

| Button | Figma color | Token | Status |
|---|---|---|---|
| promote / negotiate / suspend / fire | black | `cta-small` → `bg-black text-white` | ✓ correct (D26) |
| add | gold `#d1a63b` | `bg-gold-400 text-text-on-dark` | ✓ correct — intentionally different |

---

## D31. Step 5.8 — Layout, SwitchGroup migration, page bg + circle colors

### New tokens added (styles/tokens.css)

| Token | Type | Value | Rationale |
|---|---|---|---|
| `--color-gray-200` | primitive | `#f2f2f2` | Page background (#F2F2F2 per spec) |
| `--color-teal-500` | primitive | `#00867b` | Dark teal (bar green filled, team-strong); resolves D19 hardcoded gap |
| `--color-bg-page` | semantic | `var(--color-gray-200)` | Applied to all preview page outer divs |
| `--color-team-strong` | semantic | `var(--color-teal-500)` | Bar filled (green variant) + Team left circles |
| `--color-team-soft` | semantic | `var(--color-mint-100)` | Bar empty (green variant) + Team right circles; `mint-100` = `#d4eee7` already existed |

### 9 items resolved

| # | Item | Decision |
|---|---|---|
| 1 | PreviewNav font | `type-caps` (8px) → `type-grotesk uppercase` (11px). Tracking-[1.6px] kept explicitly (not in `type-grotesk` preset). |
| 2 | Styles page h1 | `<h1 className="type-h1 mb-xxl">Styles</h1>` added at top of content div (after sticky nav, before Colors section). |
| 3 | MenuSwitch migration | Deleted `src/components/atoms/menu-switch/` (MenuSwitch.tsx + index.ts). Removed from atoms/index.ts barrel. TopMenu.tsx: import replaced with `SwitchGroup`; two MenuSwitch instances → one `<SwitchGroup>` with controlled activeIndex. `TopMenuTab` type narrowed from `'all' \| 'templates' \| 'off'` to `'all' \| 'templates'`. Preview organisms.tsx: removed 'off' button, narrowed state type. atoms.tsx preview: removed MenuSwitch section + state. index.tsx: organisms desc updated (7→6, removed MenuSwitch from list). |
| 4 | All pages bg | `bg-bg` → `bg-bg-page` on all 5 preview page outer divs (atoms, molecules, organisms, styles, index). Styles sticky nav also updated. |
| 5 | Header bg + separator | `bg-primary` → `bg-bg-page border-b border-border`. TopMenu: `border-b border-white` → `border-b border-border` (white border invisible on #f2f2f2). |
| 6 | Profile Bar color | `<Bar>` in Profile (long variant): added `color="green"` prop. Figma node 357:35448 shows dark teal dots. |
| 7 | Bar.tsx tokenized | `bg-[#00867b]` → `bg-team-strong`; `bg-mint-100` → `bg-team-soft` (green empty branch). Default branch unchanged (still has D19 gap #b8c6c3 and bg-white). |
| 8 | CardHeader variant2 | Removed `<AddButton />` from variant2 action row. AddButton still present in default variant (both spots — teams row + access row). |
| 9 | Kanban layout | Board div: `w-full` → `min-w-[1100px]` (D31: no token for 1100px, hardcoded — between xxl=60px spacing; this is width, no spacing token applies). Headline: `w-[830px]` → `w-full`. Card names: added `whitespace-nowrap`. |

### Remaining D19 gaps NOT in scope for Step 5.8
`bg-[#00867b]` still appears in: Status.tsx (dot/text), Notify.tsx (headline text), SecondRow.tsx (back button border). These are tracked D19 gaps; only Bar.tsx was in scope.

---

## D32. Step 6 — Pages + Release Notes

### Screen names confirmed from Figma (file zUJYCXcLeuUXDcCKkxpLR5)

| Node | Expected | Confirmed |
|---|---|---|
| 357:58932 | screen-all-teams-a | ✓ screen-all-teams-a |
| 357:58993 | screen-all-teams-single | ✓ screen-all-teams-single |
| 357:59014 | screen-candidate-b | ✓ screen-candidate-b |

### Per-screen composition

| Screen | Components used |
|---|---|
| screen-all-teams-a | Header, CardHeader(default), MetricCard×4, Team×6 |
| screen-all-teams-single | Header, CardHeader(variant2), Notify, Profile(long)×10 |
| screen-candidate-b | Header, CardHeader(variant2), Notify, Bar, Button, Profile(short)×6 |

### Off-scale layout indents (sanctioned px exceptions)

| Value | Screen(s) | Reason |
|---|---|---|
| `pt-[90px]` | all 3 screens | Header h=88 (screens 1&2) or h=114 (screen 3), content y=178/204; gap=90px in both cases. Nearest token: xxl=60px. No 90px token. |
| `gap-[90px]` | screen-candidate-b (Reports section) | Figma `space/xxl=90px` ≠ our `--spacing-xxl=60px`. Reports-to/Mentoring sub-section gap. |
| `max-w-[830px]` | all 3 screens | Figma content frame width = 830px (node w=830); centered in 1440px viewport. No token for 830px width. |

Note: `rounded-[12px]` is pre-existing D22 gap, not new. `tracking-[-0.4px]`, `tracking-[1.6px]`, `tracking-[2px]` are pre-existing throughout codebase.

### Flagged missing tokens (no code invented, closest alternative used)

| Missing color | Figma token | Hex | Used in | Decision |
|---|---|---|---|---|
| (none) | `color/text-&-icon/yellow-dark` | `#646905` | Achievements section heading + item text | No token; using `text-black` |
| (none) | `color/controls/on-color/yellow-dark` | `#fffd9e` | Achievements button bg | No token; using `Button variant="secondary"` (bg-gray-100) |
| (none) | `color/background/on-cads/red` | `#f7e0dd` | Profile chip bg (Reports to) | No token; using `Profile variant="short"` (bg-peach-100 = #f5dedb, close) |
| (none) | `color/background/on-cads/pink` | `#ffe3f1` | Profile chip bg (Mentoring) | No token; using `Profile variant="short"` (bg-peach-100) |

### Component variant added

**MetricCard.tsx**: Added `bg` prop (string, defaults to `'bg-mint-100'`). Removed hardcoded `w-[190px]`; callers pass width via `className`. Required because screen-all-teams-a needs 4 MetricCards with different bg colors (pink-100, rose-100, purple-100, olive-100) — all existing tokens. molecules.tsx updated to pass `className="w-[190px]"` for existing usage.

### Release Notes

Auto-generated from `NOTES.md` via Vite `?raw` import. Parses `## [Step...]` entries into a styled timeline. Added `src/vite-env.d.ts` with `/// <reference types="vite/client" />` for raw import typing.

### Routes added

| Path | Component |
|---|---|
| `/preview/pages/screen-all-teams-a` | ScreenAllTeamsA |
| `/preview/pages/screen-all-teams-single` | ScreenAllTeamsSingle |
| `/preview/pages/screen-candidate-b` | ScreenCandidateB |
| `/preview/release-notes` | ReleaseNotes |

---

## D33. Step 6.1 — Screen accuracy: CardHeader, MetricCard colors, MenuSwitch, bar removal

### D33.1 CardHeader → variant2 in ScreenAllTeamsA

| Item | Before | After |
|---|---|---|
| `CardHeader` variant in ScreenAllTeamsA | `variant="default"` | `variant="variant2"` |

Figma 357:58935 shows the card-header instance as variant2 (light). `default` was used by mistake in Step 6 build.

---

### D33.2 MetricCard colors — confirmed correct, no change

Figma 357:58937–58940 confirmed MetricCard bg colors per card:

| Card | Figma token | Figma hex | React token | Match? |
|---|---|---|---|---|
| Health | `cards/red` | `#f5cfca` | `bg-pink-100` | ✓ exact |
| Productivity | `cards/pink` | `#fad5e7` | `bg-rose-100` | ✓ exact |
| Distribution | `cards/violet` | `#ddd6ef` | `bg-purple-100` | ✓ exact |
| Hiring | `cards/yellow` | `#e0e2a4` | `bg-olive-100` | ✓ exact |

All 4 colors already matched existing tokens. No new tokens needed. User perception "too muted" matches the actual Figma design — pastels are intentional. No color changes made.

Note: MetricCard component default `bg='bg-mint-100'` matches Figma component node 357:35524 (Default variant = Health in isolation). Screen instances override this per-card with the red/pink/violet/yellow variants above.

---

### D33.3 MenuSwitch — recreated at `atoms/menu-switch/`

Deleted in Step 5.8 when SwitchGroup replaced it. Recreated from Figma 357:35722:

| Property | Value | Token? |
|---|---|---|
| height | 32px = h-8 | ✓ |
| horizontal padding | 10px | ✗ — D24: off token scale, `px-[10px]` |
| border-radius | 4px = rounded-s | ✓ |
| ON-state border | 1px solid white | D28: `border-white`; subtle on F2F2F2 bg but matches Figma spec |
| OFF-state | no border | ✓ |
| transition | enter-only (ON state only gets `transition-all duration-150`) | ✓ prior fix |

TopMenu.tsx updated: SwitchGroup → two standalone MenuSwitch buttons with gap-m between them (matches Figma 357:35592 flex container). SwitchGroup unchanged everywhere else.

---

### D33.4 Header — pipeline bar removed

| Item | Before | After |
|---|---|---|
| `Bar` import | present | removed |
| `PIPELINE_STAGES` constant | 8 stages | removed |
| Pipeline bar div | present | removed |
| `pipelineValue` prop | present | removed |

Figma 357:35619 shows Header = TopMenu + optional SecondRow. No pipeline bar present. All callers updated (ScreenAllTeamsA, ScreenAllTeamsSingle, ScreenCandidateB, organisms.tsx).


---

## D34. Step 6.2 — Hero full-bleed, 2-row header, MetricCard types, CardHeader text

### D34.1 Hero image — full-bleed breakout

| Item | Before | After |
|---|---|---|
| CardHeader variant2 outer div | `overflow-hidden` | removed |
| Image wrapper | `absolute inset-0` (card-confined) | `absolute top-0 bottom-0 left-[calc(50%_-_50vw)] w-screen` (100vw breakout) |
| Photo layers | 1 photo | 2 layers: base + `mix-blend-plus-lighter` overlay (Figma 357:58935) |
| Base bg | `bg-bg` (#ffffff) | `bg-bg-page` (#f2f2f2) |
| Gradient | `from-transparent to-bg` | `from-transparent to-bg-page` |

Breakout formula: `left: calc(50% - 50vw)` assumes parent is horizontally centered (`mx-auto`). Correct for all screen pages (max-w-[830px] mx-auto).

Photo URLs: Figma MCP assets (expire 7 days). Exported as `PHOTO_PERSON` const for person-profile screen overrides.

---

### D34.2 Header — two rows

| Screen | Before | After |
|---|---|---|
| ScreenAllTeamsA | `showSecondRow={false}` (1 row, h≈43px) | removed prop (default=true, 2 rows, h≈88px) |
| ScreenAllTeamsSingle | `showSecondRow={false}` (1 row) | removed prop (default=true, 2 rows) |
| ScreenCandidateB | already showSecondRow=true | no change |

SecondRow reused — no new layout markup. `pt-[90px]` remains correct: header 88px + 90px gap = 178px content start (matches Figma 357:58933 y=178).

---

### D34.3 MetricCard — type prop

New `MetricCardType = 'red' | 'pink' | 'violet' | 'yellow' | 'green'` (matching Figma token names).

| Type | Figma token | Hex | React token | New token? |
|---|---|---|---|---|
| red | cards/red | #f5cfca | bg-pink-100 | No |
| pink | cards/pink | #fad5e7 | bg-rose-100 | No |
| violet | cards/violet | #ddd6ef | bg-purple-100 | No |
| yellow | cards/yellow | #e0e2a4 | bg-olive-100 | No |
| green | cards/green | #d4eee7 | bg-mint-100 | No |

All colors mapped to existing tokens. `bg` prop kept as fallback for overrides. ScreenAllTeamsA updated to use `type` prop. Molecules preview updated to show all 5 types.

---

### D34.4 CardHeader text — updated to Figma 357:58935

Variant2 defaults updated (per Figma 357:58935, All Teams A instance):

| Prop | Before | After |
|---|---|---|
| name | "Sarah Mitchell" | "All teams" |
| title | "Senior Software Engineer" | "Overview of all teams\nand their performance metrics" |
| actions | ['promote','negotiate','suspend','fire'] | ['add team'] |
| switchItems | [Team, Projects, Reviews] | [Overview, Employees, Report] |

`whitespace-pre-wrap` added to title `<p>` to render the `\n` line break.

ScreenCandidateB and ScreenAllTeamsSingle updated to pass explicit person-profile props (since defaults changed). No component structure changes — only defaults updated.


---

## D35. Step 6.3 — Hero behind header + metric-card graph colors

### D35.1 Hero behind header (layering fix)

**Root cause**: CardHeader variant2 image wrapper used `top-0` relative to card container
(at y=178). Image started at y=178, leaving a 178px gap of page bg above the hero. Header
had opaque `bg-bg-page` covering that gap.

**Figma geometry** (357:58935): image wrapper `top-[-178px] h-[632px]` — the image starts at
`card_y - 178 = 178 - 178 = 0` (viewport top). Header at y=0 to y=88 sits ON the image.

| File | Change | Rationale |
|---|---|---|
| Header.tsx | Removed `bg-bg-page`; added `relative z-10` | Transparent → hero shows through. z-10 + relative → header paints above extended image |
| CardHeader.tsx | Image wrapper: `top-0 bottom-0` → `style={{ top: imageTopOffset, height: imageHeight }}` | Matches Figma geometry |
| CardHeader.tsx | Added `imageTopOffset?: number` (default -178) and `imageHeight?: number` (default 632) props | Matches Figma; screens with different header heights can override |

Gap analysis:
- Before: header (88px, solid) + gap (90px) + image start → ~178px visible gap above hero
- After: header (transparent, z-10) + gap (90px) + card starts → image extends from y=0 behind header, gap invisible

### D35.2 Header spacing — confirmed correct

After layering fix: content still starts at y≈178 (header h≈88 + pt-[90px] = 178). Matches
Figma y=178. No additional indent change needed. pt-[90px] stays (flagged D32 as off-scale;
nearest token xxl=60px, but 90px is the Figma-accurate value).

### D35.3 Metric-card graph/bar colors per type

All 4 Figma card types (357:58937–58940) use identical bar color:
`var(--color/background/base, #f2f2f2)` = `bg-bg-page` + `mix-blend-multiply`.

| Type | Figma bar color | Token | Before | After | New token? |
|---|---|---|---|---|---|
| red (Health) | #f2f2f2 + multiply | bg-bg-page | bg-[#979797] | bg-bg-page | No |
| pink (Productivity) | #f2f2f2 + multiply | bg-bg-page | bg-[#979797] | bg-bg-page | No |
| violet (Distribution) | #f2f2f2 + multiply | bg-bg-page | bg-[#979797] | bg-bg-page | No |
| yellow (Hiring) | #f2f2f2 + multiply | bg-bg-page | bg-[#979797] | bg-bg-page | No |

Visual effect: mix-blend-multiply × card bg color = slightly darker, card-colored bars.
E.g. on pink-100 (#f5cfca): #f2f2f2 × #f5cfca ≈ #e9c5c0 (darker pink). Type-specific
appearance from a single token.

Graph atom: `barClassName` prop added (default: `bg-[#979797]` for standalone atoms preview on
white bg; `bg-bg-page` would be nearly invisible via multiply on white). MetricCard passes
`barClassName="bg-bg-page"` — fix applies to all screens using MetricCard. Atoms preview
unchanged.


---

## D36 — Hero behind header: re-diagnosis and fix (Step 6.4)

### Figma structure (357:58932 ScreenAllTeamsA)
- `header` instance: y=0–88 (SIBLING to card-header in screen layout, transparent overlay)
- `Frame 1356` (content container): y=178 starts
- `card-header` instance: x=0, y=0 WITHIN Frame 1356 → y=178 in screen
- Card-header image wrapper: `left: -306px; top: -178px; width: 1442px; height: 632px`
  → image starts at screen y=0 (178 + -178 = 0) ✓
- Figma header TopMenu border: `border-[var(--color/text-&-icon/on-color,white)]` = white (invisible over hero)
- Figma header outer div: NO border-b

### Root cause of Step 6.3 failure (three independent issues)
1. **Expired Figma MCP photo URLs** — Figma MCP assets expire after 7 days. PHOTO_V2_BASE
   and PHOTO_V2_BLEND from Step 6.2 had expired → hero rendered as plain bg-bg-page
   (#f2f2f2), visually identical to the page background → "image looks missing."
2. **`border-b border-border` on Header outer div** — our Header had a gray (#eaeaea)
   bottom border at y≈88 that read as a clear separator edge ("the white band"). Figma
   Header outer div has NO border-b.
3. **`border-b border-border` on TopMenu** — should be `border-white` per Figma. A gray
   border-bottom on TopMenu creates a visible horizontal line at y≈44 inside the header area.

### Changes (D36)
| File | Change |
|---|---|
| CardHeader.tsx | PHOTO_V2_BASE + PHOTO_V2_BLEND refreshed with 2026-06-28 Figma MCP URLs |
| Header.tsx | Removed `border-b border-border` from outer div (Figma has no border on header wrapper) |
| TopMenu.tsx | `border-b border-border` → `border-b border-white` (token: --color-white) |

### Tokens
No new tokens. `border-white` uses existing `--color-white: #ffffff`.

### Pre-existing flags (unchanged)
- D24: `bg-[#ffb700]` in CardHeader default variant
- D28: `px-[10px]` in MenuSwitch off token scale
- D32: `pt-[90px]` off token scale in ScreenAllTeamsA

### Verified
- Build: ✓ 0 errors
- Screenshot: hero 3D-object image visible from y=0; header nav overlaid transparently on top;
  no white/gray separator band; metric cards visible below hero

---

## D37 — Preview information hierarchy & readability (Step 6.6)

### Token change
| Token | Before | After | Why |
|---|---|---|---|
| `--color-gray-500` | (new primitive) | `#666666` | Muted text base — 4.5:1 contrast on bg-page (#f2f2f2) |
| `--color-text-subtle` | `var(--color-gray-100)` (#eaeaea — invisible as text) | `var(--color-gray-500)` (#666666) | One step darker; now legible |

All `text-[#979797]` and `text-black/50` in preview replaced with `text-text-subtle`.
`text-black/70` and `text-black/50` uses in release-notes body lines also replaced.

### Badge removal (index.tsx)
LayerCard previously always rendered a badge span. Changed: badge only renders when
`status !== 'done'`. All 4 layers are `'done'` → zero badges appear. Badge field removed
from data array; only 'in-progress' (when needed) would show.

### Pages card secondary styling (index.tsx)
Layer cards: full bordered card with type-h3 label (unchanged).
Pages section: compact border-l list — `border-l-2 border-border pl-m py-xs` with
label + desc inline. Visually subordinate. Pages heading: `type-h4 uppercase tracking-[1.6px]`
(smaller than layer heading) to reinforce "examples, not system layers" hierarchy.

### Breadcrumb restructure (PreviewNav.tsx)
| Before | After |
|---|---|
| Row 1: Design System / Styles / Atoms / Molecules / Organisms | Row 1: Design System / Styles / Atoms / Molecules / Organisms / Release Notes |
| Row 2: Pages / All Teams A / All Teams Single / Candidate B / Release Notes | Row 2: "Pages ›" + All Teams A · All Teams Single · Candidate B (type-caps, lighter) |

Release Notes moved to primary row (it's a system doc, not an example page).
Secondary row uses `type-caps` + `·` separators instead of `/` — visually subordinate.

### Organisms page composition order (organisms.tsx)
Section order changed to show composition:
1. SecondRow — "Used inside Header as the second row"
2. TopMenu — "Used inside Header as the first row"
3. Header — "Composes TopMenu (row 1) + SecondRow (row 2). Transparent with z-10 for hero overlay."
4. Task, CardHeader, Kanban (unchanged)

Section component gains optional `subtitle` prop for composition annotations.

### Hardcoded values report (D37)
No new hardcoded hex or px values introduced. Pre-existing:
- `tracking-[1.6px]` throughout preview (pre-existing, no token scale entry)
- `tracking-[2px]` in organisms tab buttons (pre-existing)
- `max-w-[830px]`, `w-[160px]` etc. in preview scaffold (pre-existing)

---

## D38 — Localize variant2 hero images (Step 6.7)

### Local file → component mapping
| Local file | Size | Maps to | Was (Figma URL) | Used in |
|---|---|---|---|---|
| `src/assets/card-header_2.png` | 547 KB | `PHOTO_V2_BASE` | `b0beb859-…` (exp. 2026-07-05) | CardHeader variant2 base layer |
| `src/assets/card-head_1.png` | 198 KB | `PHOTO_V2_BLEND` | `34c9c27a-…` (exp. 2026-07-05) | CardHeader variant2 plus-lighter overlay |

Both imported as Vite asset imports (`import heroBase from '../../../assets/card-header_2.png'`).
Vite hashes and copies to `dist/assets/` on build. No external fetch at runtime.

### Remaining Figma URLs (no local file — flagged, not touched)
| Constant | URL | Expires (approx.) | Status |
|---|---|---|---|
| `PHOTO_DEFAULT` (CardHeader.tsx) | `cad54573-…` | Earlier session | Likely expired |
| `PHOTO_PERSON` (CardHeader.tsx) | `dbf30515-…` | Earlier session | Likely expired |
| `katya` (Avatar.tsx) | `87f1a982-…` | Earlier session | Likely expired |
| `dog` (Avatar.tsx) | `46e6ff30-…` | Earlier session | Likely expired |
| `petya` (Avatar.tsx) | `bbd15a5c-…` | Earlier session | Likely expired |

These 5 are outside the scope of the 2 local files provided. Need local files or fresh Figma
reads to resolve. They do not affect ScreenAllTeamsA (hero works from local files).

### Verified
- Build: ✓ both PNGs bundled as `dist/assets/card-head_1-*.png` and `dist/assets/card-header_2-*.png`
- Screenshot: variant2 hero renders correctly (3D objects base + warm golden blend overlay)
- External URLs remaining for variant2 hero: 0
- Total external Figma URLs remaining (other assets): 5

## D39 — Hero image lifted to screen level (Step 6.8)

### Problem
`imageTopOffset = -178` in CardHeader was hardcoded assuming header height = 88px.
Measured actual header height: 125px. CardHeader starts at y = 125 + 90 = 215.
`215 - 178 = 37` → image started at y=37, not y=0. User saw the top bar (TopMenu row)
on a solid white background; image only started at the breadcrumb/SecondRow.

### Root cause
The negative-offset approach in CardHeader is inherently fragile — it depends on
knowing the exact pixel height of every ancestor above CardHeader. That height changes
with font loading, viewport, padding, and future layout changes.

### Fix
Lifted the hero image to ScreenAllTeamsA page level:
- Outer div: `relative` (stacking context)
- Hero div: `absolute inset-x-0 top-0 h-[632px]` — anchored to y=0, always
- Content div: `relative z-10` (paints above the absolute hero)
- CardHeader: `imageTopOffset={0} imageHeight={0}` — zero-height wrapper renders nothing
  (the `style={{ top: 0, height: 0 }}` div is invisible; no images painted by CardHeader)

### Changes
| File | Change |
|---|---|
| `src/preview/pages/ScreenAllTeamsA.tsx` | Import heroBase+heroBlend; add page-level hero div at top-0; add `relative` on outer, `relative z-10` on content div; pass `imageTopOffset={0} imageHeight={0}` to CardHeader |

### Tokens / hardcoded values
No new tokens. `h-[632px]` (hero height) retained from Figma spec — same value as D34.
`pt-[90px]` on content div retained (gap between header bottom and content top per Figma).

### Verified
- Build: ✓ (112 modules, 0 errors)
- Screenshot: hero texture visible at y=0, "Hired & Wired" logo + all nav items render
  directly on the image — no solid strip above the image anywhere in the 200px crop

## D40 — Remove hero yellow tint: replace wrong blend overlay asset (Step 6.9)

### Exact cause
| Element | Property | Value / Effect |
|---|---|---|
| `<img src={heroBlend}>` in ScreenAllTeamsA.tsx | `mix-blend-plus-lighter` | Adds pixel values of overlay to base |
| `card-head_1.png` (local file) | Image content | **Wrong file** — solid saturated-yellow monochromatic portrait (nearly R=1, G≈0.8, B=0 across most pixels) |
| Base image `card-header_2.png` | Color | Light gray (~0.9, 0.9, 0.9) 3D objects |

`plus-lighter` math: result = min(src + dst, 1). Adding near-black overlay (correct Figma file)
to a light gray base barely shifts the gray. Adding solid-yellow overlay to light gray raises
R and G channels toward 1, leaving B unchanged → yellow cast on every pixel of the hero.

The LOCAL file `card-head_1.png` was the wrong file — it was a yellow illustration portrait,
NOT the Figma Rectangle230 layer. Figma's Rectangle230 (`bcb63797-6e3b-4bfe-90fc-f5eb2c6d38fb`)
is a dark near-black teal noise/glitch texture (2884×1264, mostly 0–5% luminance). When
THAT dark image is plus-lightered over the light gray 3D objects, the result is nearly
unchanged (dark adds ~0 to the gray), matching Figma's gray-blue render.

### Fix
Replaced both local assets with freshly fetched Figma versions:
| File | Old | New |
|---|---|---|
| `src/assets/card-head_1.png` | Wrong: solid yellow portrait (198KB) | Correct: dark teal noise texture (1.8MB, from Rectangle230) |
| `src/assets/card-header_2.png` | Correct but lower-res (547KB) | Updated: higher-res same image (9.5MB, from Rectangle229) |

No code changes. Only the asset files were replaced. The Vite import path and component code
are unchanged — Vite re-hashes the new file automatically.

### Hardcoded values
None introduced. Assets are Vite-bundled PNGs; no URLs or hex values changed.

### Verified
- Build: ✓ 0 errors
- Screenshot: hero renders gray-blue/silver 3D objects with no yellow cast; matches Figma
  node 357:58935 screenshot exactly. Header legible over the neutral image.

## D41 — ATS Single hero + Candidate B hero + Profile margin (Step 6.10)

### Image mappings
| Local file | Screen | Role |
|---|---|---|
| `src/assets/all-team-single.png` | All Teams Single | Screen-level hero (single image, no blend overlay) |
| `src/assets/screen-candidate-b.png` | Candidate B | Screen-level hero (single image, no tint/blend overlay) + CardHeader default photo |
| `src/assets/card-head_1.png` | All Teams A | Existing blend overlay (dark teal noise, D40) — restored from git after user deleted it |

### All Teams Single hero fix
Same pattern as All Teams A (D39): screen-level `absolute inset-x-0 top-0 h-[632px]`, single base
image, gradient from transparent to bg-page. CardHeader `imageTopOffset={0} imageHeight={0}`
suppresses its built-in image. Content `relative z-10`.

### Candidate B hero fix + CardHeader variant change
Figma 357:59017 uses the **default** CardHeader variant (TEAMS/access labels, golden portrait
inside card, action buttons, team tags at bottom) — not variant2. Changed from `variant="variant2"`
to `variant="default"`.

Screen-level hero: `screen-candidate-b.png` (yellow portrait) behind full header from y=0, no
blend overlay, gradient fades to bg-page. CardHeader default also uses the same photo with its
built-in golden tint treatment (bg-black mix-blend-color + #ffb700 mix-blend-hard-light).

### Candidate B layout corrections
| Section | Fix | Figma source |
|---|---|---|
| Personal Development | Outer gap Next Level→Prediction: `gap-l`→`gap-s` (14px, Figma Frame 1378: y=36→y=50, gap=14px) | 357:59044/48 |
| Personal Development | Text "Febrary 2026" (Figma node name 357:59050 has typo; task says match Figma exactly) | 357:59050 |
| Reports/Mentoring | gap-[90px] retained (Figma space/xxl=90px; our --spacing-xxl=60px — flagged D32) | 357:59052 |

### Profile card colors (Figma 357:59055/59062)
Each profile card in Candidate B has a distinct background color per Figma:
| Position | Figma token/hex | React token | Exact match? |
|---|---|---|---|
| Reports to #1 | `--color/background/on-cads/red` #f7e0dd | `bg-peach-100` #f5cfca | ≠ (closest available) |
| Reports to #2 | `--color/background/on-cads/green` #d4eee7 | `bg-mint-100` #d4eee7 | ✓ exact |
| Reports to #3 | `--color/background/on-cads/pink` #ffe3f1 | `bg-rose-100` #fad5e7 | ≠ (closest available) |
| Mentoring #1 | `--color/background/on-cads/yellow` #e0e2a4 | `bg-olive-100` #e0e2a4 | ✓ exact |
| Mentoring #2 | `--color/background/on-cads/violet` #ddd6ef | `bg-purple-100` #ddd6ef | ✓ exact |
| Mentoring #3 | `--color/background/on-cads/red` #f7e0dd | `bg-peach-100` #f5cfca | ≠ (closest available) |

Added `bgClass?: string` prop to Profile molecule so callers can pass the background token class.
Default behaviour unchanged: short=bg-peach-100, short-outlined=bg-gray-100.

### Profile margin (357:35449)
Figma: `pl-[var(--space/s,14px)] pr-[16px] py-[var(--space/s,14px)]` (14px all except right=16px).
No 16px token exists (tokens: xs=8, s=14, m=20). Changed `p-s` → `pl-s pr-[16px] py-s`.
Logged as off-scale: `pr-[16px]` (flagged).

### Remaining external Figma URLs (pre-existing, unchanged)
5 URLs flagged in D38: PHOTO_DEFAULT + PHOTO_PERSON (CardHeader.tsx), katya + dog + petya (Avatar.tsx).
No new external URLs introduced in this step.

### Verified
- Build: ✓ 0 errors, all 4 images bundled
- All Teams Single: image (gray tunnel) at y=0, true colors, header overlaid ✓
- Candidate B: yellow portrait at y=0, header overlaid, card shows golden-tinted portrait ✓
- Profile cards: distinct bg colors per card ✓; 16px right padding visible ✓
- "Febrary 2026" typo matches Figma ✓

---

## D42. Step 6.11 — All Teams Single team list: bar overflow + per-member statuses + reorg (2026-06-29)

### Bug 1 — Progress bar overflow

| Aspect | Before | After |
|---|---|---|
| Bar in Profile long variant | `<Bar className="flex-1 min-w-0" />` — Bar rendered ~700px of `shrink-0` dots; flex container shrinks but dots overflow | `<Bar className="flex-1 min-w-0 overflow-hidden" />` — dots clipped at rendered container width |
| Root cause | Bar renders 100 × (5px dot + 2px gap) = ~700px via `shrink-0` spans. The flex parent shrinks to `flex-1` width but dots have `shrink-0` so they overflow the container bounds. | |
| Fix | `overflow-hidden` on Bar's root div clips overflowing dots at the container edge. Matches Figma `overflow-clip` on bar wrapper node 357:35448. | |
| Token? | No new token. `overflow-hidden` is a Tailwind utility. | |

### Bug 2 — All statuses hardcoded green

| Aspect | Before | After |
|---|---|---|
| Status in Profile long | `<Status variant="green" />` — hardcoded, same for every row | `<Status variant={statusVariant} />` — prop-driven |
| Prop added | `statusVariant?: StatusVariant` to Profile interface; default `'green'` (backward-compatible) | |
| Data source | Figma nodes 357:59004–59013 (10 profile rows). Sampled 7: 59004=green, 59005=purple, 59006=green, 59008=green, 59009=red, 59011=red, 59013=red. | |
| Inferred rows | Rows 3 (59007), 6 (59010), 8 (59012) not fetched. Pattern: rows 0–4 = green/purple block; rows 5–9 = red block. Inference: row3=green, row6=red, row8=red. Documented in screen file comment. | |
| Final assignment | Sarah Johnson=green, Michael Lee=purple, Emily Carter=green, David Smith=green, Jessica Martinez=green, Daniel Wilson=red, Laura Thompson=red, James Garcia=red, Anna Schmidt=red, Robert Brown=red | |

### Item 3 — Reorg assessment

| Finding | Decision |
|---|---|
| Profile `long` variant already is the team-member row molecule | No extraction needed. It composes Avatar + name/role text + Status + Bar — exactly one molecule already covers the pattern. No new file, no wrapper component. |

### Files changed

| File | Change |
|---|---|
| `src/components/molecules/profile/Profile.tsx` | Added `statusVariant?: StatusVariant` prop; `<Status variant="green">` → `<Status variant={statusVariant} />`; Bar className: `flex-1 min-w-0` → `flex-1 min-w-0 overflow-hidden` |
| `src/preview/pages/ScreenAllTeamsSingle.tsx` | Added `status: StatusVariant` to TEAM_MEMBERS array; `statusVariant={member.status}` passed to each Profile; StatusVariant import added; comment documents inference for rows 3/6/8 |

### Verified

- Build: ✓ `vite build` 0 errors, 0 type errors
- Visual screenshot: dev server headless environment — puppeteer-core not installed; screencapture blocked. Verification is TypeScript build + Figma node 357:59001 screenshot as reference.

---

## D43. Step 6.12 — Candidate B: remove screen-level hero (plain gray page bg) (2026-06-29)

### Root cause

`ScreenCandidateB.tsx` had a screen-level hero div (same D39/D41 pattern as All Teams A and Single) with `screen-candidate-b.png` (the yellow portrait) rendered as a full-bleed `absolute inset-x-0 top-0 h-[632px]` image behind the page. This was added in Step 6.10 under the assumption Candidate B should follow the same hero pattern — but Figma node 357:59014 shows a plain gray page background with NO hero image.

### Scope check — shared or screen-local?

The hero div was entirely local to `ScreenCandidateB.tsx`. All Teams A and All Teams Single each have their own screen-local hero divs. Removing it from Candidate B has zero effect on the other two screens.

### Fix

| File | Change |
|---|---|
| `src/preview/pages/ScreenCandidateB.tsx` | Removed hero `<div aria-hidden …>` block (lines 51-59 of prior version). Outer div: dropped `relative` (no longer needed for absolute positioning). Content div: dropped `relative z-10` (no stacking context needed). Page bg `bg-bg-page` retained. |

### First block unchanged

`<CardHeader variant="default" photo={candidateBHero} …>` is untouched. The import of `candidateBHero` is kept — it feeds the photo prop on the CardHeader (golden-tinted portrait inside the card, correct per Figma 357:59017).

### Regression check — All Teams A + Single

Both screens retain their screen-level hero divs (`absolute inset-x-0 top-0 pointer-events-none`). No shared organism modified. Confirmed by grep: hero class present in A+Single, absent in Candidate B.

### Tokens

No new tokens. `bg-bg-page` = `--color-bg-page: var(--color-gray-200)` = #f2f2f2 — existing semantic token.

### Verified

- Build: ✓ 0 errors
- External URL grep: 0 hits in all three screen files
- Absolute path grep: 0 hits
- Hero present in ScreenAllTeamsA.tsx: ✓ | ScreenAllTeamsSingle.tsx: ✓ | ScreenCandidateB.tsx: ✗ (correct)

---

## D44. Step 6.14 — Preview nav: layers-only breadcrumb + size bump (2026-06-29)

### Breadcrumb scope change

| Before | After |
|---|---|
| Primary row: Design System / Styles / Atoms / Molecules / Organisms / **Release Notes** | Primary row: Design System / Styles / Atoms / Molecules / Organisms |
| Secondary row: Pages › All Teams A · All Teams Single · Candidate B | **Removed entirely** |

Both rows were in `PreviewNav.tsx`. The secondary SCREENS row and its data array were deleted. Release Notes removed from the LAYERS array.

### Font-size bump

| Before | After | Tokens |
|---|---|---|
| `type-grotesk` = 11px (Akkurat) | `type-h4` = 15px (Akkurat) | Both are `font-grotesk`; one scale step up. No hardcoded px. |

Separator `/` updated from `type-grotesk` to `type-h4` to match. `tracking-[1.6px]` and `uppercase` retained — pre-existing flagged gaps, not new.

### Reachability — Pages + Release Notes

Pages (All Teams A, Single, Candidate B) were already linked from `/preview` index. Release Notes was NOT previously linked from the index — it was only in the breadcrumb. To prevent stranding, added Release Notes as a link section to `preview/index.tsx` (same compact border-l list style as Pages). Both are now accessible from `/preview` even with no breadcrumb links.

| Route | Path to it |
|---|---|
| `/preview/pages/screen-all-teams-a` | `/preview` → Pages → All Teams A ✓ |
| `/preview/pages/screen-all-teams-single` | `/preview` → Pages → All Teams Single ✓ |
| `/preview/pages/screen-candidate-b` | `/preview` → Pages → Candidate B ✓ |
| `/preview/release-notes` | `/preview` → Release Notes ✓ (newly added to index) |

### Files changed

| File | Change |
|---|---|
| `src/preview/PreviewNav.tsx` | Removed Release Notes from LAYERS; deleted SCREENS array + secondary nav div; `type-grotesk` → `type-h4` on links and separator; removed now-unused screen link style constants |
| `src/preview/index.tsx` | Added Release Notes section (border-l link, same style as Pages) so it remains reachable |

### Hardcoded values grep

0 new hardcoded hex or px values. Pre-existing `tracking-[1.6px]` in nav links — documented gap from D37.
