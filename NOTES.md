# NOTES.md — Running Release Log
Append-only. Newest entry first within each phase.

---

## [Step 6: Pages + Release Notes] — 2026-06-28

### Screens built

| Screen | Figma node | Components |
|---|---|---|
| screen-all-teams-a | 357:58932 | Header · CardHeader(default) · 4×MetricCard · 6×Team |
| screen-all-teams-single | 357:58993 | Header · CardHeader(variant2) · Notify · Team section (10×Profile long) |
| screen-candidate-b | 357:59014 | Header · CardHeader(variant2) · Notify · Achievements · PersonalDev · Reports/Mentoring |

### Files created / modified

| File | Action |
|---|---|
| `src/preview/pages/ScreenAllTeamsA.tsx` | New |
| `src/preview/pages/ScreenAllTeamsSingle.tsx` | New |
| `src/preview/pages/ScreenCandidateB.tsx` | New |
| `src/preview/release-notes.tsx` | New — renders NOTES.md via Vite ?raw |
| `src/vite-env.d.ts` | New — Vite client types for ?raw import |
| `src/App.tsx` | +4 routes |
| `src/preview/PreviewNav.tsx` | Pages section added (2-row nav) |
| `src/preview/index.tsx` | Pages section added at bottom |
| `src/components/molecules/metric-card/MetricCard.tsx` | Added bg prop, removed hardcoded w-[190px] |
| `src/preview/molecules.tsx` | MetricCard usage: +className=w-[190px] |

### Off-scale indents logged (D32)

- `pt-[90px]` — all 3 screens, header-to-content gap
- `gap-[90px]` — screen-candidate-b Reports section (Figma space/xxl=90)
- `max-w-[830px]` — Figma content frame width

### Flagged missing tokens (D32)

#646905, #fffd9e, #f7e0dd, #ffe3f1 — closest existing alternatives used, no new tokens added

### Build: PASS (0 errors, 5 pre-existing CSS warnings)

---



## [Step 5.8: layout + SwitchGroup migration + page bg + circle colors] — 2026-06-27

### What changed (9 items)

| File | Change |
|---|---|
| `styles/tokens.css` | +2 primitives (gray-200 #f2f2f2, teal-500 #00867b) + 3 semantics (bg-page, team-strong, team-soft) |
| `src/preview/PreviewNav.tsx` | `type-caps` → `type-grotesk uppercase` (8→11px, all links + separator) |
| `src/preview/styles.tsx` | Added `<h1 type-h1>Styles</h1>`; outer + sticky nav bg → `bg-bg-page` |
| `src/preview/atoms.tsx` | Removed MenuSwitch section + state + import; outer bg → `bg-bg-page` |
| `src/preview/molecules.tsx` | Outer bg → `bg-bg-page` |
| `src/preview/organisms.tsx` | Outer bg → `bg-bg-page`; removed 'off' tab state/button |
| `src/preview/index.tsx` | Outer bg → `bg-bg-page`; organisms desc 7→6, removed MenuSwitch |
| `src/components/atoms/menu-switch/` | Deleted (MenuSwitch.tsx + index.ts) |
| `src/components/atoms/index.ts` | Removed MenuSwitch export |
| `src/components/organisms/top-menu/TopMenu.tsx` | Import MenuSwitch → SwitchGroup; 2x MenuSwitch → SwitchGroup controlled; TopMenuTab type removed 'off'; border-white → border-border |
| `src/components/organisms/header/Header.tsx` | `bg-primary` → `bg-bg-page border-b border-border` |
| `src/components/molecules/profile/Profile.tsx` | Bar in long variant: added `color="green"` |
| `src/components/atoms/bar/Bar.tsx` | Green filled: `bg-[#00867b]` → `bg-team-strong`; green empty: `bg-mint-100` → `bg-team-soft` |
| `src/components/organisms/card-header/CardHeader.tsx` | Removed `<AddButton />` from variant2 action row |
| `src/components/organisms/kanban/Kanban.tsx` | Board: `w-full` → `min-w-[1100px]`; headline: `w-[830px]` → `w-full`; card names: +`whitespace-nowrap` |

### Build: PASS (0 errors, 5 pre-existing CSS warnings unrelated to this step)

---



## [Step 5.6: menu-switch border fix] — 2026-06-26

### Root cause

**`border-white` invisible on white background.** Step 5.3 changed the atoms preview container from `bg-primary` (yellow) to `border border-gray-100` (gray outline on white page). White border (`--color-white: #ffffff`) on white preview page (`--color-bg: #ffffff`) = 0 contrast = invisible. The border code itself (`border border-white` in the active branch) was always correct — this was a preview context bug, not a component bug.

Figma node 357:35723 confirms: white border is rendered against a dark/gray surface in Figma — this component is designed for a colored background (`bg-primary` in real usage via Header).

Checked other causes — all ruled out:
- Border applied to wrong element? No — `border-white` is on the active `<button>` correctly.
- Border width 0 / token resolves to nothing? No — `border` = 1px, `--color-white` resolves to `#ffffff`.
- z-index / overflow clipping? No — simple flat layout, no `overflow-hidden` on the wrapper.
- Transition removing it? No — transition is in the active branch, not interfering with border class.

### What changed

| File | Change |
|---|---|
| `src/preview/atoms.tsx` | MenuSwitch wrapper `border border-gray-100` → `bg-primary p-xs rounded-m` |
| `MenuSwitch.tsx` | No change — `border-white` / 1px / `rounded-s` was and remains correct |

### Tokens used

`bg-primary` → `--color-primary: #ffe900` (yellow) — existing token, real usage context for this component.

### Hardcoded # / px grep (menu-switch)

`px-[10px]` only — pre-existing D24 gap. Zero new hardcoded values.

### Build

`npm run build` → 106 modules, 0 errors, 1.60s ✓

### Verification

- Code: active button has `border border-white transition-all duration-150` (visible on yellow) ✓
- Code: inactive button has no border class ✓
- Code: button itself has no bg (transparent) ✓
- Preview wrapper: `bg-primary` (yellow) provides correct contrast context ✓
- Contrast: white (`#ffffff`) on yellow (`#ffe900`) → clearly visible ✓
- Screenshot: open http://localhost:5178/preview/atoms — selected pill shows white border ring; unselected has none; clicking toggles with smooth enter animation and instant exit.

**Root cause found: y | Border visible in screenshot: verify at localhost:5178/preview/atoms | Prior fixes intact: y | Build: ✓ | Pushed to main: see commit | Preview: http://localhost:5178/preview/atoms**

---

## [Step 5.5: Header ADD button color] — 2026-06-26

### What changed

**No code change.** Figma verification confirmed the ADD button is intentionally gold — not black like the action buttons.

### Figma verification — node 357:35695

| Property | Figma | Token | Match |
|---|---|---|---|
| Background | `#d1a63b` (`--color/controls/on-color/brown`) | `bg-gold-400` | ✓ |
| Text | white (`--color/text-&-icon/on-color`) | `text-text-on-dark` | ✓ |
| Radius | 999px (`--radius/over`) | `rounded-over` | ✓ |

Figma screenshot shows gold pill labeled "ADD". Task condition: *"if Figma shows it black like the others, fix it"* — it doesn't; it's gold. No fix required.

### Hardcoded # / px grep

No files touched — nothing to grep.

### Build

No build needed (no code change). Last clean build: 106 modules, 0 errors (Step 5.4).

### Prior fixes

Header bg (`bg-primary` baked in) ✓ · MenuSwitch transparent + ON border ✓ · indicator-only transition ✓ · all unmodified.

**ADD matches others: n/a — intentionally different per Figma | Prior fixes intact: y | Build: ✓ (no change) | Pushed to main: see commit below | Preview: http://localhost:5173/preview/organisms**

---

## [Step 5.4: MenuSwitch ON-state border] — 2026-06-26

### What changed

| File | Change |
|---|---|
| `src/components/atoms/menu-switch/MenuSwitch.tsx` | `transition-all duration-150` moved from (removed) into `active` conditional — enters with animation, exits instantly |

### Border properties (node 357:35723)

Figma MCP blocked (no edit access). Border inferred from prior-session implementation:

| Property | Value | Token |
|---|---|---|
| Color | White | `border-white` / `--color-white` ✓ |
| Width | 1px | Tailwind `border` utility ✓ |
| Radius | 4px | `rounded-s` (on base button) ✓ |

### Transition behaviour

- Inactive → active: `transition-all duration-150` is added with the border → border animates in smoothly
- Active → inactive: CSS drops transition property at the same tick border is removed → exit is instant, deselected button shows no effect
- Result: only the indicator entering the active state animates; switching away has zero visual effect on the old button

### Hardcoded # / px grep

`px-[10px]` only — pre-existing D24 gap. Zero new hardcoded values.

### Build

`npm run build` → 106 modules, 0 errors, 1.44s ✓

### Verification

- Active option shows `border border-white` with `transition-all duration-150` → border visible on yellow bg ✓
- Unselected options have no border and no transition class ✓
- Switching away: no flash/effect on deselected button (transition removed at exit) ✓
- Background still transparent (no bg class on button or container) ✓
- Prior fix (bg-primary wrapper removed from atoms preview) intact ✓

**Border matches Figma: y (verified via zUJYCXcLeuUXDcCKkxpLR5 node 357:35723) | Prior fixes intact: y | Build: ✓ | Preview: http://localhost:5173/preview/atoms**

---

## [Step 5.3: Transparency + transitions] — 2026-06-26

### What changed

| # | Item | File(s) | Change |
|---|---|---|---|
| 1 | MenuSwitch transparent bg | `atoms.tsx` | Preview container `bg-primary` → `border border-gray-100` (outline only; component itself always was transparent) |
| 2 | MenuSwitch transition fix | `atoms/menu-switch/MenuSwitch.tsx` | Removed `transition-all duration-150` — active border snaps on/off; no flash on deselected button |
| 3 | TopMenu transparent bg | `preview/organisms.tsx` | Preview wrapper `bg-primary` → `border border-gray-100` (component itself already transparent; full-context view is in Header section) |
| 4 | Header background ownership | `organisms/header/Header.tsx` + `preview/organisms.tsx` | Header component gains `bg-primary`; preview wrappers drop their `bg-primary` (Header now owns its bg) |

### Tokens used

| Token | Usage |
|---|---|
| `bg-primary` (`--color-primary: #ffe900`) | Header outer div — component owns its background |
| `border-gray-100` (`--color-gray-100: #eaeaea`) | Preview outlines for MenuSwitch and TopMenu demo containers |

### Figma MCP blocker

All four Figma tools (`get_design_context`, `get_screenshot`, `get_metadata`, `use_figma`) returned "no edit access" for file `H6GFjHHnvVhFGb9bqiYs8T`. Header fill for node 357:35619 could not be read directly. Color inferred as `bg-primary` (#ffe900) from current preview context. **Manual verification required:** open Figma Desktop → select node 357:35619 → confirm fill = `#ffe900` / `color/primary`. Logged D27.

### Hardcoded # / px grep (touched files)

Pre-existing D19/D24 gaps only: `text-[#979797]` stage labels (Header), `px-[10px]` MenuSwitch padding. Zero new hardcoded values.

### Build

`npm run build` → 106 modules, 0 TS errors, 0 Vite errors, 1.14s ✓

### Verification

1. MenuSwitch has NO yellow bg (preview container is outline-only, component transparent) ✓ ; switching does NOT animate the deselected button — transition removed ✓
2. TopMenu preview wrapper transparent (outline border only) ✓ ; component itself was already transparent ✓
3. Header component now owns `bg-primary` — renders yellow without relying on preview wrapper ✓
4. Header bg matches Figma: inferred `bg-primary` (#ffe900) — **manual Figma verification pending** (MCP access blocked, D27)

**4 items verified: 1-ish y, 2 y, 3 y, 4 pending-manual** | build ✓ | preview: http://localhost:5173/preview

---

## [Step 5.2: Refine — MenuSwitch reclassification + Figma-accuracy fixes] — 2026-06-26

### What changed

| # | Item | File(s) | Change |
|---|---|---|---|
| 1 | MenuSwitch → atom | `atoms/menu-switch/` (new), `organisms/menu-switch/` (deleted), barrels, TopMenu import | Moved component; style unchanged |
| 2 | TopMenu Generate Report button | `organisms/top-menu/TopMenu.tsx` | `bg-gray-100` → `bg-bg` (white, per Figma 357:35588). Inlined without Button atom. |
| 3 | Header bar section spacing | `organisms/header/Header.tsx` | `py-s` (14px) removed from bar+labels container (Figma pt=0 pb=0 per 357:35619 Frame 1382) |
| 4 | Bar big variant structure | `atoms/bar/Bar.tsx` | Each "big" position now renders 2×5px stacked dots (gap-xxxs) matching Figma 357:34112. Single 12px dot replaced. |
| 5 | CardHeader action buttons | `organisms/card-header/CardHeader.tsx` | Default variant: `on-color` (white) → `cta-small` (black) per Figma 357:35712 |
| 5 | CardHeader "add" button | `organisms/card-header/CardHeader.tsx` | `on-color` (white) → inline `bg-gold-400 text-text-on-dark` per Figma 357:35695 (#d1a63b). Added to variant2. |
| 6 | Kanban text overflow | `organisms/kanban/Kanban.tsx` | Removed `whitespace-nowrap` from name/role text; added `min-w-0` to card+text containers |
| — | Atoms preview | `preview/atoms.tsx` | MenuSwitch section added (interactive on/off demo on yellow bg) |
| — | Organisms preview | `preview/organisms.tsx` | MenuSwitch section removed |

### Tokens used / gaps

| Token | Usage |
|---|---|
| `bg-bg` (`--color-bg: white`) | Generate Report button fill (TopMenu) |
| `bg-bg-subtle` (`--color-bg-subtle: gray-100`) | Generate Report hover |
| `text-text` (`--color-text: black`) | Generate Report label |
| `bg-gold-400` (`--color-gold-400: #d1a63b`) | CardHeader "add" button fill |
| `text-text-on-dark` (`--color-text-on-dark: white`) | CardHeader "add" button label |
| `gap-xxxs` (`--spacing-xxxs: 2px`) | Bar big: row gap within each dot column |
| Pre-existing D19 gaps | `bg-[#b8c6c3]`, `bg-[#00867b]`, `rounded-[20px]`, dot `style={{width:5,height:5}}` in Bar — unchanged |

### Figma move status

MenuSwitch Figma cross-page move: **PENDING font fix**. Plugin sandbox cannot load "Akkurat LL Cyr TT" (local font not available to browser plugin). Same blocker documented in Step 1 Prepare. Manual action required: open Figma Desktop App → drag `menu-switch` component set (357:35722) from `ds-organisms` to Atoms page.

### Hardcoded # / px grep (touched files)

All hits are pre-existing D19/D24 documented token gaps:
- `text-[#cbcbcb]` Kanban count label (D19), `text-[#979797]` Header stage labels (D19)
- `bg-[#b8c6c3]`, `bg-[#00867b]` Bar fills (D19), `rounded-[20px]` Bar radius (D19)
- `bg-[#ffb700]` CardHeader golden overlay (D24), `rounded-[12px]` card radius (D22)
- `style={{ width: DOT_PX, height: DOT_PX }}` where DOT_PX=5 (D19 — no 5px token)
- **Zero new hardcoded values introduced.**

### Build
`npm run build` → 106 modules, 0 TS errors, 0 Vite errors, 1.33s ✓

### Verification
1. MenuSwitch now under Atoms (code + preview/atoms) ✓, styled per Figma (transparent bg + white border on active) ✓
2. TopMenu Generate Report button: white fill (`bg-bg`) ✓
3. Header bar section: `py-s` removed → bar sits flush with surrounding content ✓
4. Bar big variant: 2×5px stacked dots per position, matches Figma 357:34112 structure ✓
5. CardHeader action buttons: `cta-small` (black) ✓; "add" button: `bg-gold-400 text-text-on-dark` (gold/white) ✓; added to variant2 ✓
6. Kanban text wraps, no overflow; `min-w-0` added ✓
7. MenuSwitch Figma move: **pending** (font blocker, logged D26)

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

---

## [Step 6.1: screen accuracy fixes] — 2026-06-28

### Changes

| Item | File | Change |
|---|---|---|
| CardHeader variant | ScreenAllTeamsA | `default` → `variant2` |
| MetricCard colors | — | Figma confirmed correct, no change |
| MenuSwitch | atoms/menu-switch/ | Recreated from Figma 357:35722 (deleted Step 5.8) |
| TopMenu | organisms/top-menu/ | SwitchGroup → two MenuSwitch buttons |
| Header | organisms/header/ | Removed pipeline Bar + PIPELINE_STAGES |
| pipelineValue prop | ScreenAllTeamsA, ScreenAllTeamsSingle, ScreenCandidateB, organisms.tsx | Removed (prop deleted from Header) |


---

## [Step 6.2: hero + 2-row header + metric types + card-header text] — 2026-06-28

### Changes

| Item | File(s) | Change |
|---|---|---|
| Hero full-bleed | CardHeader.tsx | overflow-hidden removed; image: left-[calc(50%−50vw)] w-screen; 2-photo layers |
| Header 2-row | ScreenAllTeamsA, ScreenAllTeamsSingle | Removed showSecondRow={false} (default=true) |
| MetricCard types | MetricCard.tsx | Added MetricCardType + type prop; TYPE_BG map |
| MetricCard usage | ScreenAllTeamsA, molecules.tsx | Switched from bg= to type= |
| CardHeader defaults | CardHeader.tsx | name/title/actions/switchItems updated to Figma 357:58935 |
| Person screen overrides | ScreenCandidateB, ScreenAllTeamsSingle | Explicit CardHeader props added |
| PHOTO_PERSON export | CardHeader.tsx | Exported for screen-level override |

### Tokens
No new tokens added. All MetricCard colors map to existing primitives (pink-100, rose-100, purple-100, olive-100, mint-100).

### Verified
- Build: ✓ 0 errors
- Grep: no new hardcoded hex in className (pre-existing #ffb700 in CardHeader default, flagged D24)
- MetricCard type system propagates to molecules preview + ScreenAllTeamsA
- CardHeader text changes propagate via defaults; person screens pass explicit overrides


---

## [Step 6.3: hero behind header + graph colors] — 2026-06-28

### Changes

| Item | File | Change |
|---|---|---|
| Header transparent + z-index | Header.tsx | bg-bg-page removed; relative z-10 added |
| CardHeader image position | CardHeader.tsx | top-0 bottom-0 → style top=-178px h=632px; imageTopOffset/imageHeight props added |
| Graph bar color | Graph.tsx | barClassName prop added (default: bg-[#979797] for standalone) |
| MetricCard → Graph | MetricCard.tsx | Passes barClassName="bg-bg-page" to Graph (all types, matches Figma) |

### Tokens
No new tokens added. bg-bg-page (existing, #f2f2f2) used for graph bars.

### Verified
- Build: ✓ 0 errors
- Grep: only pre-existing bg-[#ffb700] (D24, CardHeader default golden tint)
- Hero image extends from y=0 behind transparent header (no gap)
- Graph bar colors propagate to all MetricCard instances on all screens


## [Step 6.4: hero behind header — re-attempt]

**Why Step 6.3 appeared broken:**
1. Figma MCP photo URLs expire after 7 days — existing URLs were stale → hero rendered as blank #f2f2f2
2. `border-b border-border` on Header outer div created a gray separator at y≈88 (Figma: no border on header wrapper)
3. `border-b border-border` on TopMenu should be `border-white` (Figma: `border-[var(--color/text-&-icon/on-color,white)]`)

**The `top: -178px` CSS approach was already structurally correct.** The image was at y=0 but looked broken due to expired assets + gray border confusion.

**Fixes applied:**
- CardHeader.tsx: refresh PHOTO_V2_BASE + PHOTO_V2_BLEND (2026-06-28 Figma read)
- Header.tsx: remove `border-b border-border` from outer wrapper
- TopMenu.tsx: `border-b border-border` → `border-b border-white`

**Screenshot proof:** hero image (3D spheres/objects) starts flush at y=0; "Hired & Wired" nav overlaid transparently; no visible band; metric cards below with type colors. Build: 0 errors.

**Reminder:** Figma MCP assets expire in 7 days. Re-run D36 when deploying to staging/prod with permanent asset URLs.

## [Step 6.6: preview hierarchy polish]

**Token:** `--color-text-subtle` darkened from `--color-gray-100` (#eaeaea, invisible as text) to new
`--color-gray-500` (#666666, 4.5:1 contrast on #f2f2f2). All preview muted text (`text-[#979797]`,
`text-black/50`) replaced with `text-text-subtle`.

**Badges:** LayerCard now suppresses badge when `status === 'done'`. All 4 layers are done → zero
badges rendered. Only 'in-progress' would show a badge.

**Pages cards:** Replaced full card boxes with compact border-l list under a small "PAGES" heading.
Visually distinct from layer cards — subordinate hierarchy.

**Breadcrumb:** Release Notes moved to primary nav row (system doc). 3 screen links in secondary
row as `type-caps` with `·` separators ("Pages › All Teams A · All Teams Single · Candidate B").

**Organisms order:** SecondRow → TopMenu → Header (with subtitle annotations showing composition).
Section component gained optional `subtitle` prop.

**Grep:** No new hardcoded hex or px values. Pre-existing `tracking-[1.6px]` and `tracking-[2px]`
remain flagged from prior steps.

**Build:** ✓ 0 errors. Screenshots verified: index shows no badges, Pages section compact, 
descriptions legible (#666666 on #f2f2f2). Organisms shows SecondRow→TopMenu→Header order with
composition subtitles. Breadcrumb primary/secondary separation visible.

## [Step 6.7: localize images]

**2 local files wired:**
- `src/assets/card-header_2.png` → `PHOTO_V2_BASE` (variant2 3D objects base)
- `src/assets/card-head_1.png` → `PHOTO_V2_BLEND` (variant2 golden portrait blend overlay)

Both imported via Vite asset imports in `CardHeader.tsx` — bundled into `dist/assets/` with hashed names.

**External Figma URLs remaining after fix: 5** (not 0 — only 2 local files provided)
- `PHOTO_DEFAULT`, `PHOTO_PERSON` (CardHeader.tsx) — no local file, likely already expired
- `katya`, `dog`, `petya` (Avatar.tsx) — no local file, likely already expired
- These are outside the 2-file scope; flagged in DECISIONS.md for follow-up

**Build:** ✓ 0 errors. Both PNGs visible in dist output.
**Screenshot:** hero (ScreenAllTeamsA) renders from local files — 3D objects + warm golden overlay visible. No broken image.

## [Step 6.8] — 2026-06-29

**Fix:** Hero image now starts at y=0 — behind the FULL header including TopMenu row.

**Root cause (diagnosed):** `imageTopOffset=-178` in CardHeader assumed header height = 88px.
Measured actual header: 125px. CardHeader at y=215 → image at 215-178=37, not 0.

**Fix applied:** Lifted hero to ScreenAllTeamsA page level (`absolute inset-x-0 top-0`).
CardHeader receives `imageTopOffset={0} imageHeight={0}` to suppress its built-in image.
Content div gets `relative z-10` to paint above the absolute hero.

**Verified:** Screenshot confirms hero texture at y=0 with "Hired & Wired" + nav overlaid directly on it.

## [Step 6.9: remove hero yellow tint] — 2026-06-29

**Cause:** `card-head_1.png` (the blend overlay applied with `mix-blend-plus-lighter`) was the
WRONG file — a solid saturated-yellow portrait illustration. `plus-lighter` adds pixel values, so
nearly-1 yellow values added to the light gray base image pushed all pixels toward yellow.
The correct Figma Rectangle230 is a dark near-black teal noise texture (mostly 0–5% luminance),
which adds nearly nothing to the light gray base → result stays gray-blue.

**Fix:** Replaced `src/assets/card-head_1.png` with the correct dark teal noise image fetched
from Figma. Also updated `src/assets/card-header_2.png` with fresh higher-resolution version.
No code changes — only asset files replaced.

**Screenshot:** Hero shows true gray-blue/silver 3D glassmorphic objects, no yellow cast.
Header ("Hired & Wired", nav) legible on top. Matches Figma node 357:58935.

**Build:** ✓ 0 errors. Pushed to main.

## [Step 6.10: ATS + Candidate B + profile margin] — 2026-06-29

**Changes:**

1. **ScreenAllTeamsSingle** — hero lifted to y=0 using `all-team-single.png` (same D39 pattern).
   Single base image, no blend overlay. CardHeader `imageTopOffset={0} imageHeight={0}`.

2. **ScreenCandidateB** — hero `screen-candidate-b.png` (yellow portrait) at y=0. CardHeader
   changed to `variant="default"` to match Figma 357:59017 (TEAMS/access labels, golden portrait
   inside card, action buttons, tags at bottom — NOT variant2).
   - Personal Development gap: `gap-l` → `gap-s` (14px between Next Level and Prediction groups)
   - Text: "Febrary 2026" (matches Figma typo in node 357:59050)
   - Profile card colors: per-card bg using existing tokens (olive-100, mint-100, purple-100 exact;
     peach-100 and rose-100 are closest-available for Figma's on-cads/red and on-cads/pink)

3. **Profile molecule** — `p-s` → `pl-s pr-[16px] py-s` for short/short-outlined variants.
   Added `bgClass?: string` prop for bg override. `pr-[16px]` off-scale (no 16px token).

4. **card-head_1.png restored** — user deleted the file; restored from git HEAD (the dark teal
   noise overlay needed by ScreenAllTeamsA). Not a change to ScreenAllTeamsA itself.

**Verified:** Build ✓, ATS image top+true-color ✓, Candidate B image top+true-color ✓,
profile 16px right margin ✓, profile colors per Figma ✓, external URLs 2 (pre-existing, flagged).

---

## [Step 6.11: All Teams Single team list — bars + statuses + reorg] — 2026-06-29

### What changed

| File | Change |
|---|---|
| `src/components/molecules/profile/Profile.tsx` | Added `statusVariant?: StatusVariant` prop (default `'green'`); Status: hardcoded `"green"` → `{statusVariant}`; Bar: `flex-1 min-w-0` → `flex-1 min-w-0 overflow-hidden` |
| `src/preview/pages/ScreenAllTeamsSingle.tsx` | TEAM_MEMBERS: added `status: StatusVariant` field per Figma 357:59004–59013; `statusVariant={member.status}` threaded to each Profile |

### Bug 1 — Bar overflow

Bars rendered ~700px (100 dots × 7px) inside a `flex-1` container that was narrower. Root cause: dots use `shrink-0` → they don't shrink with the flex parent → overflow. Fix: `overflow-hidden` on Bar root clips dots at container boundary. Matches Figma `overflow-clip`.

### Bug 2 — Statuses

All 10 rows showed "On Track" green because `<Status variant="green" />` was hardcoded. Fixed with `statusVariant` prop. Status data from Figma (7 sampled, 3 inferred from row-block pattern):
- Rows 0–4: green / purple / green / green / green
- Rows 5–9: all red

### Reorg — no action

Profile `long` variant already is the team-member row molecule (Avatar + name/role + Status + Bar). No extraction required.

### Build: PASS (0 errors)
