# AUDIT.md — Design System Before-State Inventory
**File:** design-system--forShare--Copy- | **Key:** zUJYCXcLeuUXDcCKkxpLR5
**Date:** 2026-06-23 | **Page:** Design (198:64)

---

## A. Connection & Capability

- **Connected:** Yes
- **File:** design-system--forShare--Copy-
- **Pages:** 1 — `Design` (198:64)
- **Write capability:** YES — `use_figma`, `generate_figma_design`, `upload_assets` all present
- **Mode:** APPLY (will rename in Figma via MCP, not just produce rename maps)

---

## B. Full Inventory

### B1. Page / Section Structure

| Node ID | Name | Type | Role |
|---|---|---|---|
| 357:33706 | `ds-atoms` | Section | Atoms component showcase |
| 357:35439 | `ds-molecules` | Section | Molecules component showcase |
| 357:35571 | `ds-organisms` | Section | Organisms component showcase |
| 357:58709 | `design` | Section | Application wireframe screens (example-only) |
| 2001:19512 | `styles` | Section | Token documentation board |
| 2002:14494 | `Frame 1728` | Frame | Phase navigation annotation bar |

### B2. Font Inventory — `/fonts` folder

| File | Family | Weight | Style | Format |
|---|---|---|---|---|
| `InstrumentSerif-Regular.ttf` | Instrument Serif | Regular | Normal | TTF |
| `InstrumentSerif-Italic.ttf` | Instrument Serif | Regular | Italic | TTF |
| `AkkuratLLCyrTT-Regular.ttf` | Akkurat LL Cyr | Regular | Normal | TTF |
| `AkkuratLLCyrTT-Bold.ttf` | Akkurat LL Cyr | Bold | Normal | TTF |
| `Pixform.otf` | Pixform | Regular | Normal | OTF |

**Total:** 5 files, 3 families, 5 weight/style combinations.

**Font → Token mapping:**

| Figma type style | Family in Figma | File in /fonts | Match? |
|---|---|---|---|
| H1 | Instrument Serif | InstrumentSerif-Regular.ttf | ✓ |
| H2 | Instrument Serif | InstrumentSerif-Regular.ttf | ✓ |
| Description | Pixform | Pixform.otf | ✓ |
| H3 | Akkurat LL Cyrillic | AkkuratLLCyrTT-Regular.ttf | ✓ (name differs: "Cyrillic" vs "Cyr") |
| H4 | Akkurat LL Cyrillic | AkkuratLLCyrTT-Regular.ttf | ✓ |
| text-pixel | Pixform | Pixform.otf | ✓ |
| text-grotesk | Akkurat LL Cyrillic | AkkuratLLCyrTT-Regular.ttf | ✓ |
| text-bold | Akkurat LL Cyrillic | AkkuratLLCyrTT-Bold.ttf | ✓ |
| caps | Akkurat LL Cyrillic | AkkuratLLCyrTT-Regular.ttf | ✓ |

**All 9 type styles have matching font files. No missing fonts.**

Note: Figma uses "Akkurat LL Cyrillic" but the file is "AkkuratLLCyrTT". Confirm Figma recognizes the loaded file under that name (usually fine if font is installed).

### B3. Token Variables (19 defined)

| Variable | Value | Group |
|---|---|---|
| `font/family/Antiqa` | Inter | font/family — DUPLICATE (wrong case) |
| `font/family/antiqa` | Inter | font/family — WRONG VALUE (should be Instrument Serif) |
| `font/family/grotesk` | Inter | font/family — WRONG VALUE (should be Akkurat LL Cyr) |
| `font/family/pixel` | Inter | font/family — WRONG VALUE (should be Pixform) |
| `font/size/text - gr` | 11 | font/size — BAD NAME (spaces) |
| `font/size/description` | 30 | font/size ✓ |
| `font/size/h3` | 20 | font/size ✓ |
| `font/size/M` | 15 | font/size — AMBIGUOUS NAME |
| `font/size/caps` | 8 | font/size ✓ |
| `radius/L` | 4 | radius ✓ |
| `indents/-1` | -1 | indents ✓ |
| `indents/XXXS` | 2 | indents ✓ |
| `indents/XXS` | 4 | indents ✓ |
| `indents/XS` | 8 | indents ✓ |
| `indents/S (inner)` | 14 | indents ✓ |
| `indents/M` | 20 | indents ✓ |
| `indents/L` | 24 | indents ✓ |
| `indents/XL` | 30 | indents ✓ |
| `indents/XXL (out)` | 60 | indents ✓ |

**Missing tokens (hardcoded in typography table, not in variables):**
- `font/size/h1` = 84
- `font/size/h2` = 40
- `font/size/text-pixel` = 10
- `font/line-height/*` — all 9 values missing
- `font/weight/*` — all 3 values missing
- `color/*` — 0 color variables despite 11 swatches
- `radius/S`, `radius/M`, `radius/XL` — likely missing (only L defined)

### B4. Atoms (16 component sets in `ds-atoms`)

| Node ID | Current name | Variants |
|---|---|---|
| 357:33707 | `bar` | Default, big × 75%, 20% |
| 357:35315 | `avatar` | katya, dog, petya |
| 357:35322 | `status` | purple, green, red, stopped |
| 357:35335 | `icons` | play, user, more, arrow-down, close |
| 357:35346 | `switch` | on/off × big/small |
| 357:35355 | `flag` | no, yes |
| 357:35360 | `tag` | control, static |
| 357:35366 | `error` | Default |
| 357:35370 | `avatars` | Default |
| 357:35375 | `list` | Default |
| 357:35382 | `text_area` | Default |
| 357:35387 | `input` | Default |
| 357:35392 | `dropdown` | On color filled/unfilled, default filled/unfilled |
| 357:35417 | `graph` | Default |
| 357:35421 | `switch group` | Default |
| 357:35428 | `btn` | CTA×no/yes, type×secondary/On color/small/big/node |

### B5. Molecules (10 component sets in `ds-molecules`)

| Node ID | Current name | Variants |
|---|---|---|
| 357:35441 | `profile` | long, short, short-outlined |
| 357:35460 | `node` | Default |
| 357:35472 | `campaign_preview` | Default |
| 357:35492 | `project_preview` | Default |
| 357:35500 | `experience_preview` | Default |
| 357:35508 | `team` | Default |
| 357:35524 | `card metric` | Default |
| 357:35530 | `Cards metrica` | Default |
| 357:35536 | `attemt` | Default, Variant2 |
| 357:35568 | `notify` | Default |

### B6. Organisms (7 component sets in `ds-organisms`)

| Node ID | Current name | Variants |
|---|---|---|
| 357:35573 | `second-row` | Default, builder |
| 357:35589 | `topmenu` | all, templates, off |
| 357:35620 | `header` | default |
| 357:35635 | `canban` | (single instance) |
| 357:35672 | `task` | Default, Variant2 |
| 357:35685 | `card top` | Default, Variant2 |
| 357:35723 | `menu_switch` | on, off |

### B7. Design / Example Screens (25 frames in `design` section)

| Node ID | Name | Count | Notes |
|---|---|---|---|
| 357:58710 | `Frame 1450` | 1 | Generic name — UX story flow |
| 357:58719 | `Frame 1451` | 1 | Generic name — UX story flow |
| 357:58726 | `Frame 1452` | 1 | Generic name — UX story flow |
| 357:58734 | `Frame 1453` | 1 | Generic name — UX story flow |
| 357:58742 | `::` | 1 | Non-name — UX story |
| 357:58749 | `Hiring_campaign` | 1 | snake_case + capital |
| 357:58759 | `Hiring_campaign` | 1 | DUPLICATE NAME |
| 357:58769 | `All_teams_campaigns` | 1 | snake_case + capital |
| 357:58778 | `All_teams_campaigns` | 1 | DUPLICATE NAME |
| 357:58787 | `All_teams_campaigns` | 1 | DUPLICATE NAME |
| 357:58796 | `Candidate` | 1 | capital |
| 357:58848 | `Negotiate` | 1 | OK name |
| 357:58872 | `Candidate_interviewed` | 1 | snake_case + capital |
| 357:58932 | `All_teams` | 1 | snake_case + capital |
| 357:58948 | `All_teams` | 1 | DUPLICATE NAME |
| 357:58972 | `All_teams` | 1 | DUPLICATE NAME |
| 357:58993 | `All_teams_one` | 1 | snake_case + capital |
| 357:59014 | `Candidate` | 1 | DUPLICATE NAME |
| 357:59066 | `Hiring_campaign` | 1 | DUPLICATE NAME |
| 357:59085 | `Hiring_campaign_add` | 1 | snake_case + capital |
| 357:59099 | `Success` | 1 | OK name |
| 357:59110 | `Automation_mail-editor` | 1 | Mixed snake+kebab |
| 357:59152 | `Automation_mail-editor` | 1 | DUPLICATE NAME |
| 357:59194 | `Automation_mail-editor` | 1 | DUPLICATE NAME |
| 357:59234 | `Hiring_campaign_wizard` | 1 | snake_case + capital |
| 357:59275 | `Hiring_campaign_wizard--viewport` | 1 | Mixed snake+double-kebab |
| 357:59319 | `Frame 1454` | 1 | Generic name — UX story flow |

---

## C. Issues

### C1. Naming — abbreviations and truncations

| Node ID | Name | Issue |
|---|---|---|
| 357:35428 | `btn` | Abbreviation — inconsistent with other full-word names |
| 357:35530 | `Cards metrica` | "metrica" is not English; unclear semantic |
| 357:35536 | `attemt` | Typo — should be `attempt` |
| 357:35571 (organisms) | `canban` | Typo — should be `kanban` |

### C2. Naming — casing / separator inconsistency

| Node ID | Name | Issue |
|---|---|---|
| 357:35382 | `text_area` | snake_case — others are lowercase no-separator |
| 357:35421 | `switch group` | Space in name |
| 357:35428 | `btn` | Abbreviation |
| 357:35472 | `campaign_preview` | snake_case |
| 357:35492 | `project_preview` | snake_case |
| 357:35500 | `experience_preview` | snake_case |
| 357:35524 | `card metric` | Space in name |
| 357:35530 | `Cards metrica` | Capital, plural, space |
| 357:35723 | `menu_switch` | snake_case |
| 357:35635 | `canban` | (see typo above) |
| 357:35589 | `topmenu` | No separator |
| 357:35685 | `card top` | Space in name |
| All design screens | `Hiring_campaign` etc. | Capital + snake_case |
| 357:59110 | `Automation_mail-editor` | Mixed snake + kebab in same name |

### C3. Duplicate screen names in `design` section

| Name | Count | Node IDs |
|---|---|---|
| `Hiring_campaign` | 3 | 357:58749, 357:58759, 357:59066 |
| `All_teams_campaigns` | 3 | 357:58769, 357:58778, 357:58787 |
| `All_teams` | 3 | 357:58932, 357:58948, 357:58972 |
| `Candidate` | 2 | 357:58796, 357:59014 |
| `Automation_mail-editor` | 3 | 357:59110, 357:59152, 357:59194 |

### C4. Generic auto-names

| Node ID | Name | Location |
|---|---|---|
| 357:58710 | `Frame 1450` | design section |
| 357:58719 | `Frame 1451` | design section |
| 357:58726 | `Frame 1452` | design section |
| 357:58734 | `Frame 1453` | design section |
| 357:59319 | `Frame 1454` | design section |
| 2002:14494 | `Frame 1728` | root — phase nav bar |
| 357:58742 | `::` | design section — non-name |
| 2001:19574–84 | `Ellipse 12–22` | styles/colors — 11 swatches |

### C5. Orphan elements

| Node ID | Name | Location | Issue |
|---|---|---|---|
| 357:59098 | `Ellipse 12` | design section (floating, not in any frame) | Stray element — not part of any component or screen |

### C6. Structural / property naming

| Component | Issue |
|---|---|
| Most atoms | First property still named `Property 1` (Figma default) — semantic rename deferred to Atoms phase |
| `task` variants | `Property 1=Default`, `Property 1=Variant2` — Variant2 is meaningless |
| `card top` variants | `Property 1=Default`, `Property 1=Variant2` — same |

### C7. Missing tokens (hardcoded values)

See B3 above. Total missing variables: ~27
- 3 font-size tokens
- 9 line-height tokens
- 3 weight tokens
- 11 color tokens (swatches unnamed)
- 1 variable duplicate to delete
- 4 variables with wrong values (all "Inter")

### C8. Issues count summary

| Category | Count |
|---|---|
| Typos | 2 (canban, attemt) |
| Abbreviations | 1 (btn) |
| Naming inconsistencies (sep/case) | 13 |
| Duplicate screen names | 5 sets (14 frames) |
| Generic auto-names (Frame N) | 6 |
| Non-names | 1 (::) |
| Orphan elements | 1 |
| Missing token variables | ~27 |
| Wrong variable values | 4 |
| Duplicate variables | 1 |
| Deferred (Property 1 renames) | multiple — Atoms/Molecules/Organisms phases |
| **Total issues** | **~70** |

---

## D. Reconciliation — Session 2 (2026-06-23)

### D1. Decisions D3–D12 — DONE / NOT DONE

| Decision | Item | Status |
|---|---|---|
| D3 | `font/family/Antiqa` deleted | ✅ DONE |
| D3 | `font/family/antiqa` → `font/family/serif`, value = Instrument Serif | ✅ DONE |
| D3 | `font/family/grotesk` value = Akkurat LL Cyrillic | ✅ DONE |
| D3 | `font/family/pixel` value = Pixform | ✅ DONE |
| D4 | `font/size/text - gr` → `font/size/text-grotesk` | ✅ DONE |
| D4 | `font/size/M` → `font/size/h4` | ✅ DONE |
| D5 | All `indents/*` → `space/*` | ✅ DONE |
| D6 | `btn`→`button`, `text_area`→`text-area`, `switch group`→`switch-group`, `avatars`→`avatar-group` | ✅ DONE |
| D7 | All 6 molecule renames | ✅ DONE |
| D8 | All 4 organism renames | ✅ DONE |
| D9 | All 27 design screen renames | ✅ DONE |
| D10 | `Frame 1728` → `nav-phase` | ✅ DONE |
| D11 | Typography labels: description, text-pixel, text-grotesk, text-bold | ✅ DONE |
| D12 | Orphan `Ellipse 12` (357:59098) deleted | ✅ DONE |
| D12 | Color swatches → `color/swatch-1…11` | ✅ DONE |

**All 15 decision groups from Session 1 confirmed applied in Figma.**

### D2. New Issues Found — Session 2

| Issue | Action | Status |
|---|---|---|
| `font/size/h4` duplicate variable | Deleted duplicate | ✅ APPLIED |
| `font/size/text - px` (spaces, value=11) | Renamed → `font/size/text-pixel`, value fixed → 10 | ✅ APPLIED |
| `font/size/h1` value=44 (wrong) | Fixed → 84 | ✅ APPLIED |
| `font/size/h2` value=30 (wrong) | Fixed → 40 | ✅ APPLIED |
| `size/base with` (typo: "with" vs "width") | Renamed → `size/base-width` | ✅ APPLIED |
| `radius/L` (uppercase) | Renamed → `radius/l` | ✅ APPLIED |
| `rounds/S`, `rounds/M`, `rounds/Over` (inconsistent prefix) | Renamed → `radius/s`, `radius/m`, `radius/over` | ✅ APPLIED |
| `rounds/L` (duplicate of radius/l) | Deleted | ✅ APPLIED |
| `Color/superYellow` value=white (wrong) | Fixed → #FFE900 | ✅ APPLIED |
| `second-row` variant `type=builider` (typo) | Renamed → `type=builder` | ✅ APPLIED |
| Styles board `size=XXL (out):90` label (stale) | Renamed → `size=XXL (out):60` | ✅ APPLIED |

**11 additional issues found and applied. 0 errors.**

### D3. Component Property Audit — All 33 Components

| Component | Section | Properties | Notes |
|---|---|---|---|
| `bar` | atoms | `Property 1` (Default/big), `length` (75%/20%) | `Property 1` → deferred; `length` ✓ |
| `avatar` | atoms | `Property 1` (katya/dog/petya) | Content variants — deferred |
| `status` | atoms | `Property 1` (green/red/purple/stopped) | Rename prop → `color` — deferred |
| `icons` | atoms | `Property 1` (play/user/more/arrow-down/close) | Rename prop → `icon` — deferred |
| `switch` | atoms | `switch` (on/off), `size` (big/small) | ✅ Both props correctly named |
| `flag` | atoms | `Property 1` (no/yes) | Rename prop → `flagged` — deferred |
| `tag` | atoms | `Property 1` (control/static) | Rename prop → `type` — deferred |
| `error` | atoms | `Property 1` (Default) | Single variant — deferred |
| `avatar-group` | atoms | `Property 1` (Default) | Single variant — deferred |
| `list` | atoms | `Property 1` (Default) | Single variant — deferred |
| `text-area` | atoms | `Property 1` (Default) | Single variant — deferred |
| `input` | atoms | `Property 1` (Default) | Single variant — deferred |
| `dropdown` | atoms | `Property 1` (On color/default), `filled` (on/off) | `Property 1`→`context`, "On color"→`on-color` — deferred |
| `graph` | atoms | `Property 1` (Default) | Single variant — deferred |
| `switch-group` | atoms | `Property 1` (Default) | Single variant — deferred |
| `button` | atoms | `CTA?` (no/yes), `type` (small/node/big/secondary/On color) | `type` ✓; "On color"→`on-color` deferred |
| `profile` | molecules | `Property 1` (long/short/short-outlined) | Rename prop → `size` — deferred |
| `node` | molecules | `Property 1` (Default) | Single variant — deferred |
| `campaign-preview` | molecules | `Property 1` (Default) | Single variant — deferred |
| `project-preview` | molecules | `Property 1` (Default) | Single variant — deferred |
| `experience-preview` | molecules | `Property 1` (Default) | Single variant — deferred |
| `team` | molecules | `Property 1` (Default) | Single variant — deferred |
| `metric-card` | molecules | `Property 1` (Default) | Single variant — deferred |
| `metric-card-tall` | molecules | `Property 1` (Default) | Single variant — deferred |
| `attempt` | molecules | `Property 1` (Default/**Variant2**) | ⚠️ Variant2 meaningless — deferred |
| `notify` | molecules | `type` (Default) | ✅ Prop name correct |
| `second-row` | organisms | `type` (Default/builder) | ✅ Typo fixed this session |
| `top-menu` | organisms | `Property 1` (all/templates/off) | Rename prop → `view` — deferred |
| `header` | organisms | `type` (default) | ✅ Prop name correct |
| `kanban` | organisms | — (single component, no variants) | ✅ No prop issues |
| `task` | organisms | `Property 1` (Default/**Variant2**) | ⚠️ Variant2 meaningless — deferred |
| `card-header` | organisms | `Property 1` (Default/**Variant2**) | ⚠️ Variant2 meaningless — deferred |
| `menu-switch` | organisms | `menu` (on/off) | ✅ Prop name correct |

**Props correctly named:** 8 / 33 components  
**`Property 1` deferred:** 22 components  
**`Variant2` to resolve in build phase:** 3 components (attempt, task, card-header)

### D4. Color/* Variable Layer Audit

33 semantic color variables exist in file (were pre-existing, not visible in original audit B3).

| Variable group | Count | Values | Notes |
|---|---|---|---|
| `Color/Background/*` | 9 | Most = #ffffff (unfilled placeholders) | Designer's semantic layer — not code migration target |
| `Color/Text & icon/*` | 6 | Primary/Secondary = #000; On color = #fff; others = #fff placeholders | Partially filled |
| `Color/Controls/*` | 4 | Secondary/default = #ececec; others = #fff | Partially filled |
| `Color/Bar/*` | 2 | Both = #ffffff (unfilled) | Unfilled |
| `Color/tech/*` | 4 | gray=#cbcbcb, green=#1cbd37, purple=#9747ff, red=#cc0000 | All filled — utility colors |
| `Color/black` | 1 | #000000 | ✅ Filled |
| `Color/gray` | 1 | #cbcbcb | ✅ Filled |
| `Color/lines` | 1 | #ececec | ✅ Filled |
| `Color/superYellow` | 1 | #ffe900 (fixed this session) | ✅ Now correct |

**Decision (D16): Leave Color/* untouched.** These are the designer's internal Figma workspace layer — not aliases for my `color/*` React token layer. The React code consumes `color/*` primitives/semantics defined in `tokens/primitives.ts`.

### D5. Internal Layer Auto-Names (Frame N, Rectangle N)

| Component | Issue | Decision |
|---|---|---|
| `bar` | ~200 Rectangle N + Frame N (segmented bar implementation) | DEFER — implementation detail of the bar visualization |
| `text-area`, `dropdown` | Frame 1455, 1456 at top level | DEFER — Atoms build phase will restructure |
| `graph` | Rectangle 24, 25 | DEFER — chart element shapes |
| Most molecules | Frame NNNN at top level | DEFER — Molecules build phase |
| `top-menu`, `card-header` | Frame NNNN at top level | DEFER — Organisms build phase |

**Decision (D17): Internal Frame N / Rectangle N names inside components are deferred to their respective build phases.** They do not affect component-level naming or the token layer. Renaming without understanding the component structure risks breaking nested instances.

### D6. Final Variable State (post Session 2)

**Total: 58 variables**

| Group | Count | Status |
|---|---|---|
| `Color/*` | 33 | Designer's semantic layer — mostly unfilled; `superYellow` fixed |
| `font/family/*` | 3 | ✅ All correct (grotesk, pixel, serif) |
| `font/size/*` | 8 | ✅ All correct (caps, description, h1, h2, h3, h4, text-grotesk, text-pixel) |
| `radius/*` | 4 | ✅ All correct (l, m, over, s) |
| `size/*` | 1 | ✅ base-width (was "base with") |
| `space/*` | 9 | ✅ All correct (-1, l, m, s, xl, xs, xxl, xxs, xxxs) |

**Non-Color variables: 25** — matches expected token set from Styles phase.
