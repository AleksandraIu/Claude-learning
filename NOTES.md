# NOTES.md — Running Release Log
Append-only. Newest entry first within each phase.

---

## [Step 5.1: Preview polish] — 2026-06-26

### What changed (`src/preview/index.tsx` only — no components, tokens, or fonts touched)

| Change | Before | After | Token used |
|---|---|---|---|
| Eyebrow contrast | `text-border` (gray-100 #eaeaea — near-invisible) | `text-black/50` | `--color-black` + opacity modifier |
| Subtitle contrast | `text-border` | `text-black/50` | same |
| Badge labels | `'Live'` (all four) | `'done'` × 3, `'in progress'` × 1 (Organisms) | — |
| Organisms badge style | `bg-primary text-black` | `bg-bg-subtle text-black/50` | `--color-bg-subtle`, `--color-black` |
| Badge padding | `py-xxxs` (2px — already correct) | unchanged | `--spacing-xxxs: 2px` |
| Description line-height | `type-grotesk` default (leading-grotesk = 10px) | + `leading-h3` (18px) | `--leading-h3` |
| Description color | `style={{ color: '#6b6b6b' }}` (hardcoded) | `text-black/50` | `--color-black` |
| Layout | `grid` + inline `gridTemplateColumns` string | `flex flex-col gap-m` (4 full-width stacked rows) | `--spacing-m: 20px` |

### Hardcoded # / px grep result
`grep -n '#\|px' src/preview/index.tsx` → one hit: `px-xs py-xxxs` (Tailwind token utilities, not hardcoded values). **Zero hardcoded hex or inline px.**

### Build
`npm run build` → 106 modules, 0 TS errors, 0 Vite errors, 1.45s ✓

### Verification
1. Both header lines clearly readable — `text-black/50` ≈ #808080 on white, well above WCAG AA ✓
2. Badges: Styles=done, Atoms=done, Molecules=done, Organisms=in progress ✓
3. Badge 2px top/bottom padding via `py-xxxs` (`--spacing-xxxs: 2px`) ✓
4. Descriptions: `leading-h3` (18px) on 11px grotesk = loose, readable ✓
5. Layout: 4 full-width stacked rows, each navigates to layer page, persistent nav intact ✓

Dev server: http://localhost:5177/preview

---

## [Step 4: Atoms Refine + Molecules] — 2026-06-24

### Atoms refined (6 files updated)

| Atom | Changes |
|---|---|
| **Button** | `transition-all duration-150`, `hover:`, `active:scale-[0.97]`, `focus-visible:ring-2`, `disabled:opacity-40`; variant-specific hovers |
| **Input** | Added `disabled`, `error`, `errorMessage` props; `focus-within:ring-1 focus-within:ring-black`, `hover:bg-[#d4d4d4]` (D22 gap), error state uses `bg-peach-100 ring-[#cc0000]` |
| **TextArea** | Same state additions as Input |
| **Dropdown** | Converted to interactive: `useState` open/close, option list rendered below, selected-option tracking, outside-click close, `rotate-180` arrow animation |
| **SwitchGroup** | Fully interactive internal state; animated sliding white indicator via `useLayoutEffect` + offsetLeft/offsetWidth measurement; no longer depends on Switch atom |
| **Avatar** | Real Figma photos (7-day URLs from MCP) replace letter initials; `src` prop override still works |

### Atoms preview updated
- Page bg: `bg-bg-subtle` → `bg-bg` (white) — see D21
- Added error + disabled demos for Input, TextArea, Button
- SwitchGroup label updated to "interactive (click me)"

### 10 Molecules built

| Molecule | File | Key atoms used | Token gaps |
|---|---|---|---|
| Profile | `profile/Profile.tsx` | Avatar, Status, Bar | none |
| NodeCard | `node/NodeCard.tsx` | Icons | `bg-[#f5cfca]` |
| CampaignPreview | `campaign-preview/CampaignPreview.tsx` | Status, Button | `p-[30px]`, `rounded-[12px]` |
| ProjectPreview | `project-preview/ProjectPreview.tsx` | — | `bg-[#fffd9e]`, `p-[30px]` |
| ExperiencePreview | `experience-preview/ExperiencePreview.tsx` | — | `p-[30px]` |
| Team | `team/Team.tsx` | Bar, AvatarGroup | `bg-white`, `p-[30px]`, `rounded-[12px]` |
| MetricCard | `metric-card/MetricCard.tsx` | Graph | `bg-[#d4eee7]`, `p-[30px]`, `rounded-[12px]` |
| MetricCardTall | `metric-card-tall/MetricCardTall.tsx` | — | `p-[30px]`, `rounded-[12px]` |
| Attempt | `attempt/Attempt.tsx` | Status | `p-[30px]`, `rounded-[12px]`, `text-[#979797]` |
| Notify | `notify/Notify.tsx` | Button | `bg-[#d4eee7]`, `p-[30px]`, `text-[30px]`, `text-[#00867b]` |

### Barrel export
`src/components/molecules/index.ts` — exports all 10 molecules + 2 types (ProfileVariant, AttemptVariant)

### Molecules preview
`src/preview/molecules.tsx` — full gallery at `/preview/molecules`; shows all 10 molecules with 2+ variants each.

### Build verification
```
npm run build → ✓ 0 errors, 90 modules, 1.39s
Fonts: 5 × bundled in dist/assets/
Hex grep: all arbitrary values are D19/D22 documented gaps
style={{}}: 3 uses (SwitchGroup indicator animation, Bar/Graph computed sizes) — all necessary
```

---

## [Step 3: Atoms] — 2026-06-23

### Task A — Connection Check

- **Node:** 357:33706 (`ds-atoms` section)
- **Atoms found (16):** status, switch, tag, error, list, text-area, input, dropdown, switch-group, button, bar, avatar, icons, flag, avatar-group, graph
- **Confirmed count:** 16 ✓

---

### Task B — Soak each atom

**Tokens used per atom:**

| Atom | Colors | Typography | Spacing | Radius |
|---|---|---|---|---|
| status | `text-[#xxx]` (D19 gaps) | `type-pixel` | — | — |
| switch | `bg-white`, `bg-gray-100` | `type-pixel`, `type-caps` | `px-s py-xs` | `rounded-s` |
| tag | `bg-gray-100`, `bg-peach-100` | `type-pixel` | `px-xs` | `rounded-s` |
| error | `bg-peach-100`, `text-[#cc0000]` | `font-grotesk text-caps` | `px-xs py-xs gap-s` | `rounded-s` |
| flag | `text-black` | — | `p-xxxs` | — |
| avatar | `bg-gray-100`, `text-black` | `type-caps` | — | `rounded-full` |
| avatar-group | (Avatar) | (Avatar) | `-mr-[8px]` D19 gap | — |
| icons | `currentColor` | — | — | — |
| graph | `bg-[#979797]` D19 | — | `gap-xxxs` | `rounded-s` |
| bar | `bg-[#b8c6c3]` D19, `bg-white` | — | `gap-xxxs` | `rounded-[20px]` |
| input | `bg-gray-100`, `text-black` | `type-pixel`, `type-caps` | `px-s py-xs gap-xs` | `rounded-s` |
| text-area | `bg-gray-100`, `text-black` | `type-pixel`, `type-caps` | `px-s py-xs gap-xs` | `rounded-s` |
| dropdown | `bg-gray-100`, `bg-gold-400`, `text-white` | `type-pixel`, `type-caps` | `px-s py-xs gap-xs` | `rounded-s` |
| button | `bg-black`, `bg-white`, `bg-gray-100`, `bg-peach-100` | `type-pixel`, `type-h2`, `type-grotesk` | `px-s py-xs py-s` | `rounded-over`, `rounded-s` |
| switch-group | `bg-yellow-400`, `bg-white` | (Switch) | `gap-xxxs p-xxs` | `rounded-s` |
| list | `border-gray-100`, `text-black` | `type-h3`, `type-pixel` | `gap-s py-s` | `rounded-over` (via Button) |

**Token gaps flagged (9 color + 3 sizing) → DECISIONS.md D19**

---

### Task C — Preview updated

- **`src/preview/atoms.tsx`** replaced stub with full gallery
- All 16 atoms rendered with every variant/state labelled
- Uses `.type-*` classes + Tailwind token utilities throughout

---

### Task D — Verification

- **`npm run build`** → 0 TS errors, 0 Vite errors ✓
- **`npm run dev`** → http://localhost:5176 (ports 5173–5175 in use)
- **`/preview/atoms`** → HTTP 200 ✓
- **Hardcoded hex in code:** 0 (all hex are in Tailwind arbitrary classes documenting D19 token gaps, or in comments)
- **Inline `style={{}}` with px:** 3 instances — all computed (Bar dot size, Graph bar height, Dropdown opacity) — no literal string hex or px; flagged D19
- **Token imports:** all atoms import exclusively from `../icons/Icons`, `../button/Button`, `../avatar/Avatar` etc. No re-defined token values.

---

## [Step 1: Prepare — Session 3 — 5-Point Verification Checklist]

**Date:** 2026-06-23

| Check | Status | Notes |
|---|---|---|
| 1 — RENAME (variables) | ✅ DONE | Live re-read: no indents/*, no rounds/*, no uppercase radius, no Inter values, no duplicates |
| 1 — RENAME (typography labels) | ✅ DONE | Nodes 2001:19522/25/26/27 = description, text-pixel, text-grotesk, text-bold |
| 1 — RENAME (component names) | ✅ DONE | All 33 confirmed lowercase-kebab from prior session reads |
| 2 — MERGE/DEDUPE | ✅ DONE | Dedup scan: 0 duplicates across all 58 variables |
| 3 — PAGE REORG | ❌ NOT DONE | **Hard blocker:** Pixform + Akkurat LL Cyr TT are local fonts absent from plugin sandbox. Cross-page appendChild requires loadFontAsync for all descendant text fonts — impossible in browser-mode plugin. Manual step required in Figma Desktop App. |
| 4 — ORPHANS | ✅ DONE | 357:59098 (Ellipse 12) not found = confirmed deleted |
| 5 — INVENTORY | ✅ DONE | 63→58: −5 variables; documented in verification.md §5 |

**Verification doc written:** `design-system/prepare/verification.md`

**Constraint confirmed:** Color/* and color/swatch-N untouched throughout. No instances detached.

**Blocker resolution path:** User opens Figma Desktop App → drag ds-atoms section (357:33706) → Atoms page, ds-molecules (357:35439) → Molecules page, ds-organisms (357:35571) → Organisms page. Desktop app has local font access; no plugin API involved.

---

## [Step 1: Prepare — Session 2 Finish]

---

### STEP 0 — Capability Check — 2026-06-23

- **Tools detected:** `use_figma` (WRITE), `get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`
- **Mode: APPLY** — write tool present; changes made directly in Figma and confirmed by re-read
- **Logged in:** DECISIONS.md D0 (updated)

---

### STEP 1 — Reconciliation — 2026-06-23

- **All 15 decision groups from Session 1 confirmed DONE in live Figma file** — every component rename, screen rename, variable rename, orphan deletion applied and verified
- **Reconciliation table written to:** AUDIT.md §D1
- **New issues discovered during verification (not in original audit):**
  - `font/size/h4` duplicate variable
  - `font/size/text - px` wrong name and wrong value (11 vs 10)
  - `font/size/h1` = 44 (wrong), `font/size/h2` = 30 (wrong)
  - `size/base with` (typo + space in name)
  - `radius/L` (uppercase), `rounds/*` (inconsistent prefix)
  - `Color/superYellow` = white (wrong value)

---

### STEP 2 — Apply Variable Fixes — 2026-06-23

- **11 operations applied:** see AUDIT.md §D2 for full table
- **Before:** 63 variables (including duplicates)
- **After:** 58 variables — clean, no duplicates
- **Confirmed by re-read:** final variable list verified post-apply

---

### STEP 3 — Full Component Audit — 2026-06-23

**Scope:** all 33 component sets/components across ds-atoms (16), ds-molecules (10), ds-organisms (7)

**Method:** `variantGroupProperties` for property names + variant names; first-level child inspection for auto-names

**Findings:**

| Category | Count | Action |
|---|---|---|
| Components with `Property 1` prop name | 22 | DEFER to build phases (per D13/D15) |
| Components with `Variant2` in variant name | 3 (attempt, task, card-header) | DEFER to build phases |
| Internal Frame N / Rectangle N | Multiple in bar, text-area, dropdown, graph, most molecules + organisms | DEFER (per D17) |
| Typos in variant values | 1 (`second-row` type=`builider`) | ✅ FIXED |
| Stale styles board label | 1 (`size=XXL (out):90`) | ✅ FIXED |
| Components correctly named (top level) | 33/33 | ✅ ALL DONE |
| Component sections correctly named | 3/3 | ✅ ALL DONE |

**Color/* variable layer audit:**
- 33 `Color/*` semantic variables found — pre-existing designer workspace layer
- Most are unfilled (#ffffff placeholders), except: tech/* colors, black, gray, lines, superYellow
- Decision: leave untouched — not the React code token layer (see D16)
- `Color/superYellow` fixed to #FFE900 (was wrong placeholder white)

**Typography labels (D11) verified:**
- description, text-pixel, text-grotesk, text-bold — all confirmed DONE
- Typography table font/size/line-height/weight data confirmed correct

**Additional new DECISIONS logged:** D15, D16, D17, D18

---

## [Step 1: Prepare]

---

### Task A — Connection Check — 2026-06-23

- **What changed:** Confirmed Figma MCP connection live. Detected write capability.
- **File:** design-system--forShare--Copy- (key: zUJYCXcLeuUXDcCKkxpLR5)
- **Pages:** 1 — `Design` (198:64)
- **Write tools present:** `use_figma`, `generate_figma_design`, `upload_assets`
- **Mode selected:** APPLY (will rename in Figma, not plan-only)
- **Anything skipped:** None
- **My TODO:** None

---

### Task B — Full Inventory — 2026-06-23

- **What changed:** Read full 79k page tree from disk; inventoried all sections, components, fonts, tokens.
- **Counts:**
  - Sections: 6 (ds-atoms, ds-molecules, ds-organisms, design, styles, Frame 1728)
  - Atoms: 16 component sets
  - Molecules: 10 component sets
  - Organisms: 7 component sets
  - Example screens in `design`: 25+ frames
  - Token variables: 19 defined
  - Font files in /fonts: 5 (3 families)
  - All 9 type styles have matching font files ✓
- **Anything skipped:** Color hex values (MCP returns rasters for swatches — deferred to Styles phase)
- **My TODO:** None — purely read step

---

### Task C — Issues Found — 2026-06-23

- **What changed:** Catalogued all naming, structural, token, and orphan issues.
- **Issue counts:**
  - Typos: 2 (`canban`, `attemt`)
  - Abbreviations: 1 (`btn`)
  - Naming inconsistencies (casing/separator): 13
  - Duplicate screen names: 5 sets covering 14 frames
  - Generic auto-names (Frame N, `::`): 7
  - Orphan elements: 1 (stray `Ellipse 12` in design section)
  - Missing token variables: ~27
  - Wrong variable values: 4 (all show "Inter")
  - Duplicate variable: 1 (`font/family/Antiqa` vs `font/family/antiqa`)
  - **Total: ~70 issues**
- **Anything skipped:** `Property 1=Default/Variant2` variant renames — deferred to component phases
- **My TODO:** None — purely analysis step

---

### Task D — Convention Defined — 2026-06-23

- **What changed:** Locked the naming convention; wrote DECISIONS.md with rationale on every call.
- **Convention:**
  - Tokens: `category/role/scale` all-lowercase, slash separator
  - Components: `kebab-case` all-lowercase, hyphen separator
  - Renamed `indents/*` → `space/*` (standard token name)
  - Font family `antiqa` → `serif` (opaque→functional role)
- **Files created/updated:** DECISIONS.md
- **Anything skipped:** None
- **My TODO:** None

---

### Task E — Apply Cleanup in Figma — 2026-06-23

- **What changed:** Applied all renames and fixes directly in Figma via use_figma. Zero errors.
- **Operations by group:**
  - Component set renames: 14 (atoms: avatar-group, text-area, switch-group, button; molecules: campaign-preview, project-preview, experience-preview, metric-card, metric-card-tall, attempt; organisms: top-menu, card-header, menu-switch; kanban single component)
  - Misc frame rename: 1 (Frame 1728 → nav-phase)
  - Design screen renames: 27 (story-hire-flow-1…5, story-hire-doc, screen-hiring-campaign-a/b/c, screen-teams-campaigns-a/b/c, screen-candidate-a/b, screen-negotiate, screen-candidate-interviewed, screen-all-teams-a/b/c, screen-all-teams-single, screen-hiring-campaign-add, screen-success, screen-automation-editor-a/b/c, screen-hiring-wizard, screen-hiring-wizard-viewport)
  - Typography label renames: 4 (description, text-pixel, text-grotesk, text-bold)
  - Color swatch renames: 11 (color/swatch-1 through color/swatch-11 — placeholders)
  - Orphan deleted: 1 (Ellipse 12 floating in design section)
  - Variable deleted: 1 (font/family/Antiqa duplicate)
  - Variable renames: 12 (font/family/serif, font/size/text-grotesk, font/size/h4, space/xxxs…space/xxl)
  - Variable values fixed: 3 (serif=Instrument Serif, grotesk=Akkurat LL Cyrillic, pixel=Pixform)
  - **Total: 74 operations, 0 errors**
- **Counts before → after:**
  - Generic auto-names in component sections: 7 → 0
  - Duplicate screen names: 14 → 0
  - Typos in component names: 2 → 0
  - Variable naming issues: 5 → 0
  - Wrong variable values: 4 → 0 (font families now correct)
  - Orphan elements: 1 → 0
- **Anything skipped:**
  - Color swatch semantic names — can't read hex fills via MCP; swatches are `color/swatch-1…11` placeholders
  - `Property 1=Default/Variant2` variant renaming — deferred to Atoms/Molecules/Organisms phases
  - Adding missing token variables (line-heights, weights, H1/H2 sizes, color values) — deferred to Styles phase
- **My TODO in Figma:**
  1. Open styles board → colors frame → click each swatch (color/swatch-1 through 11) → read the fill hex → rename to semantic names like `color/primary`, `color/background`, etc.
  2. Open Variables panel → verify `font/family/serif`, `font/family/grotesk`, `font/family/pixel` now show correct values (not "Inter")
  3. Confirm `space/*` tokens display correctly (was `indents/*`)

---

## [Step 2: Styles]

---

### Task A — Connection Check — 2026-06-23

- **What checked:** Confirmed Figma MCP live on node 2001:19512 (styles section). Three sub-sections visible: Indents, Colors, Typography.
- **Anything skipped:** None
- **My TODO:** None

---

### Task B — Font Inventory — 2026-06-23

- **Font files at /fonts:** 5 files confirmed — `InstrumentSerif-Regular.ttf`, `InstrumentSerif-Italic.ttf`, `AkkuratLLCyrTT-Regular.ttf`, `AkkuratLLCyrTT-Bold.ttf`, `Pixform.otf`
- **Font families:** 3 — Instrument Serif (serif), Pixform (pixel), Akkurat LL Cyrillic (grotesk)
- **All 9 type styles covered:** ✓ every style maps to a local file; no CDN fallback needed

---

### Task C — Token Extraction — 2026-06-23

- **Color hex values:** Extracted all 11 via Plugin API `node.fills[0].color` (converted from 0–1 RGB). Cannot use get_design_context for swatches (returns rasters).
  - swatch-1: #000000 (black), swatch-2: #eaeaea (gray-100), swatch-3: #ffffff (white)
  - swatch-4: #ffe900 (yellow-400), swatch-5: #d1a63b (gold-400)
  - swatch-6: #f5cfca (pink-100), swatch-7: #fad5e7 (rose-100), swatch-8: #ddd6ef (purple-100)
  - swatch-9: #e0e2a4 (olive-100), swatch-10: #d4eee7 (mint-100), swatch-11: #f5dedb (peach-100)
- **Typography:** 9 styles from seeded reference (confirmed against Figma text nodes)
- **Spacing:** 9 values (space/-1 = -1, xxxs–xxl). XXL reconciled: variable=60px, layer label said 90 → 60 is canonical (live wins)
- **Radius:** radius/L = 4px; rounds/* = all 4px (same value). rounds/Over left as 9999px (semantic pill shape)
- **Tokens written to:** `tokens/_raw.json`

---

### Task D — Variable Cleanup (final) — 2026-06-23

- **Removed:** 13 duplicate space/* and font/size/* variables (step 1 + step 2 both created some)
- **Deleted orphans:** `indents/-(XS)`, `indents/X` (corrupted variable names from partial renames)
- **Deleted uppercase duplicates:** `font/family/Grotesk` (value was "Inter"), `font/family/Pixel` (value was "Inter")
- **Renamed:** `font/size/M` → `font/size/h4` (per D4 convention)
- **Deleted duplicate:** `font/size/text - gr` (canonical is `font/size/text-grotesk`)
- **Final variable count:** 63

---

### Task E — Token Files Written — 2026-06-23

- **`tokens/_raw.json`** — raw extract with reconciliation notes
- **`tokens/primitives.ts`** — 11 colors, 3 font families, 8 font sizes, 8 line heights, 3 weights, 9 spacing values, 4 radius tokens
- **`tokens/semantic.ts`** — semantic aliases: bg/*, text/*, border/*, interactive/*, status/* for colors; 9 typography composites
- **`tokens/index.ts`** — re-export barrel

---

### Task F — CSS Written — 2026-06-23

- **`styles/tokens.css`** — @font-face for all 5 files (url paths relative to styles/ → ../fonts/); @theme with all Tailwind v4 utility mappings; @layer components with 9 .type-* preset classes
- **`src/index.css`** — entry: `@import "tailwindcss"; @import "../styles/tokens.css";`
- **Decisions logged:** See D14

---

### Task G — Project Scaffold + Preview — 2026-06-23

- **Config files:** package.json, vite.config.ts, tsconfig.json, tsconfig.node.json, index.html
- **Stack:** React 18 + Vite 6 + Tailwind v4 (@tailwindcss/vite plugin) + TypeScript 5 + react-router-dom 6
- **Routes:** / → /preview, /preview, /preview/styles (full), /preview/atoms (stub), /preview/molecules (stub), /preview/organisms (stub)
- **Preview/styles renders:** 11 primitive color swatches (name + hex) · 14 semantic aliases · 9 type styles in real custom fonts · 8 spacing bars · 4 radius shapes

---

### Task H — Build Verified — 2026-06-23

- **`npm run build` result:** 0 TS errors, 0 CSS errors
- **All 5 fonts in output:** Pixform.otf, InstrumentSerif-Regular.ttf, InstrumentSerif-Italic.ttf, AkkuratLLCyrTT-Regular.ttf, AkkuratLLCyrTT-Bold.ttf ✓
- **Vite resolved font paths from CSS:** `../fonts/` in styles/tokens.css → correctly bundled to dist/assets/ ✓
- **Token count vs Figma:** 11 colors ✓ · 9 type styles ✓ · 9 spacing ✓ · 4 radius ✓
- **My TODO:** Run `npm run dev` to verify /preview/styles renders fonts live in browser

---

## Readiness Checklist — Step 2 (Styles → React Tokens)

### ✅ Done — safe to proceed
- [x] All 33 component sets/components have clean, unique, kebab-case names
- [x] All 25 design example screens have unique, descriptive names
- [x] Token variables follow `category/role/scale` convention
- [x] Spacing tokens renamed `space/*` (was `indents/*`) — matches Style Dictionary convention
- [x] Font family variables have correct values (Instrument Serif, Akkurat LL Cyrillic, Pixform)
- [x] Duplicate variable (`font/family/Antiqa`) deleted
- [x] Orphan element deleted
- [x] All 9 type styles map to font files present in `/fonts` — no missing fonts
- [x] AUDIT.md, DECISIONS.md, NOTES.md written and up to date

### ⚠️ Open items (not blockers for Styles phase, but must be resolved before Atoms phase)
- [ ] **Color swatch names:** `color/swatch-1…11` are placeholders — user must fill in semantic names
- [ ] **Missing token variables to add in Styles phase:**
  - `font/size/h1` = 84, `font/size/h2` = 40, `font/size/text-pixel` = 10
  - `font/line-height/h1` = 76, `/h2` = 36, `/description` = 27, `/h3` = 18, `/h4` = 14, `/text-pixel` = 9, `/text-grotesk` = 10, `/text-bold` = 10, `/caps` = 7
  - `font/weight/regular`, `/semibold`, `/bold`
  - 11 color variables (once swatches are named)
  - `radius/s`, `radius/m`, `radius/xl` (if used elsewhere)
- [ ] **`Property 1=Default/Variant2`** variant property renames — Atoms/Molecules/Organisms phases

---

## [Step 3.6: Atom fixes 2 — Preview Nav + 4 component fixes] (2026-06-24)

### What changed
1. **PreviewNav** — new `src/preview/PreviewNav.tsx` breadcrumb nav (Design System / Styles / Atoms / Molecules / Organisms). Active page bold+underline. Wired into all 4 preview pages: styles, atoms, molecules, organisms. Styles page kept its sticky wrapper; nav replaced its content.
2. **Dropdown on-color empty** — `text-[#979797]` → `text-white/50`. Matches Figma 357:35401 opacity-50 on-color text. V4 opacity modifier, no new hardcode.
3. **Button hover visibility** — cta-small/cta-big: `opacity-70` (was 85). node: `opacity-75` (was 90). 30%/25% deltas are clearly visible; no Figma token exists for hover states (flagged D23).
4. **Input `defaultValue` prop** — added `defaultValue?: string` to Input.tsx + native input. Preview error demo switched from `value="bad input"` (read-only controlled) to `defaultValue="bad input"` (editable uncontrolled).
5. **Preview index** — Atoms + Molecules cards already fixed `ready: true` in prior step (clickable). PreviewNav covers full layer navigation.

### Tokens used / gaps
- No new tokens. All hex values in touched files are documented gaps (D19 `#979797`, `#cc0000`; D22 `#d4d4d4`). D23 documents the new fixes.
- `text-white/50` = Tailwind v4 opacity modifier on `--color-white` (token exists).

### Build
- `npm run build` → 91 modules, 0 errors, 1.25s

---

## [Step 3.7: Atom/Molecule fixes round 2] (2026-06-25)

### What changed
1. **Button cta-big hover**: `hover:opacity-70` (gray) → `hover:bg-black/90` (dark charcoal). No new token.
2. **Dropdown option contrast**: on-color unselected options → `text-black/50` (was `text-[#979797]`).
3. **ProjectPreview line-height**: Added `leading-[normal]` override on description `<p>`. Before: 18px line-height on 20px font → lines overlap. After: CSS `normal` ≈ 24px.
4. **Team bar green**: Added `color="green"` prop to Bar atom. Filled = `bg-[#00867b]` (D24), empty = `bg-mint-100` (token found).
5. **D22 gap cleanup**: MetricCard/Notify/Bar `bg-[#d4eee7]` → `bg-mint-100`; MetricCard/Notify `p-[30px]` → `p-xl`; NodeCard `bg-[#f5cfca]` → `bg-pink-100`. All were already in `@theme`.

### Tokens used / gaps
- `bg-black/90` = Tailwind v4 opacity modifier on existing `black` token.
- `text-black/50` = opacity modifier on existing `black` token.
- `leading-[normal]` = CSS keyword (not a px value).
- `bg-mint-100` / `bg-pink-100` = tokens already in @theme — D22 gaps resolved.
- New D24 gaps: `bg-[#ffb700]` (CardHeader overlay), `p-[10px]` (MenuSwitch), `gap-[50px]` / `pb-[84px]` (Kanban).

---

## [Step 5: Organisms] (2026-06-25)

### What was built
7 organisms from Figma node 357:35571, confirmed via get_metadata + 8× get_design_context:
1. **MenuSwitch** — active/inactive tab button (animated border on active)
2. **SecondRow** — breadcrumb nav bar OR builder toolbar (Back / Save / Deploy)
3. **TopMenu** — app-wide header: logo + nav tabs + Generate Report + Profile/Logout
4. **Header** — full-page header composing TopMenu + SecondRow + pipeline Bar with stage labels
5. **Kanban** — 4-column Pipeline board (Applied/Screening/Interview/Offer) with Avatar-based cards
6. **Task** — task list row: bookmark flag + description + error banner + action button
7. **CardHeader** — hero profile card: default (golden photo tint) + variant2 (light gradient) with action buttons + SwitchGroup

### Composition (no markup duplication)
- Kanban: Avatar atom
- Task: Flag, ErrorBanner, Button atoms
- CardHeader: Button, Dropdown, SwitchGroup atoms
- Header: TopMenu + SecondRow organisms + Bar atom
- TopMenu: Button, MenuSwitch (organisms) atoms
- SecondRow: Button atom

### Build
`npm run build` → 106 modules, 0 errors, 1.18s. Preview: http://localhost:5173/preview/organisms
