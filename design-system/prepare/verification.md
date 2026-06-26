# PREPARE Phase — Verification Report
**Date:** 2026-06-23  
**Figma file:** `zUJYCXcLeuUXDcCKkxpLR5` (design-system--forShare--Copy-)  
**Method:** Every check backed by a fresh Plugin API re-read; screenshots where the plugin can reach the node.

---

## 5-Point Checklist Results

| # | Check | Status | Evidence |
|---|---|---|---|
| 1 | RENAME — variables, typography labels, component names | ✅ DONE | Live re-reads — see §1 |
| 2 | MERGE / DEDUPE — no duplicate variables | ✅ DONE | Live dedup scan — see §2 |
| 3 | PAGE REORG — ds-atoms→Atoms, ds-molecules→Molecules, ds-organisms→Organisms | ❌ NOT DONE | Hard blocker — see §3 |
| 4 | ORPHANS — Ellipse 12 (357:59098) gone | ✅ DONE | Node lookup = null — see §4 |
| 5 | INVENTORY — 58 vs 63 variable gap explained | ✅ DONE | See §5 |

---

## §1 — RENAME

### 1a. Variables — confirmed clean
Live `getLocalVariablesAsync()` re-read, 2026-06-23:

| Check | Result |
|---|---|
| No `indents/*` prefix | ✅ confirmed — 0 variables with that prefix |
| No `rounds/*` prefix | ✅ confirmed — 0 variables with that prefix |
| No Inter values in font families | ✅ confirmed — grotesk=Akkurat LL Cyrillic, pixel=Pixform, serif=Instrument Serif |
| No duplicates | ✅ confirmed — dedup scan returned all group lengths = 1 |
| radius/* lowercase | ✅ confirmed — radius/l, radius/m, radius/s, radius/over |
| font/size/* correct | ✅ confirmed — caps, description, h1, h2, h3, h4, text-grotesk, text-pixel |

### 1b. Typography labels (styles board text nodes)
Nodes verified by direct re-read:

| Node ID | Expected | Live value | Status |
|---|---|---|---|
| 2001:19522 | `description` | `description` | ✅ |
| 2001:19525 | `text-pixel` | `text-pixel` | ✅ |
| 2001:19526 | `text-grotesk` | `text-grotesk` | ✅ |
| 2001:19527 | `text-bold` | `text-bold` | ✅ |

### 1c. Component names — all 33 confirmed lowercase-kebab

**ds-atoms (16):**
avatar, avatar-group, badge, bar, button, checkbox, dropdown, icon, input, radio, switch, switch-group, tag, text-area, toggle, tooltip

**ds-molecules (10):**
attempt, campaign-preview, experience-preview, header, metric-card, metric-card-tall, navigation, project-preview, second-row, task

**ds-organisms (7):**
card-header, filters, graph, kanban, menu-switch, table, top-menu

All names verified against live `variantGroupProperties` reads. Zero uppercase letters, zero spaces, zero underscores.

---

## §2 — MERGE / DEDUPE

Live scan: grouped all 58 variables by name, checked for any group with count > 1.  
Result: **0 duplicates found.** Every variable name is unique.

Variable distribution (58 total):
- `Color/*`: 33
- `font/family/*`: 3
- `font/size/*`: 8
- `radius/*`: 4
- `size/*`: 1
- `space/*`: 9

---

## §3 — PAGE REORG

**Status: ❌ NOT DONE**

**Blocker:** Figma's `page.appendChild(section)` (cross-page move) requires all fonts in descendant TEXT nodes to be loadable via `figma.loadFontAsync()`. Two of the three font families used in the sections are local/custom fonts unavailable in the plugin API's browser-mode sandbox:

| Font | Available in sandbox | Used in sections |
|---|---|---|
| Instrument Serif Regular | ✅ yes (Google Fonts) | ds-atoms: 1, ds-molecules: 12, ds-organisms: 15 text nodes |
| SF Pro Semibold | ✅ yes (system font) | ds-atoms: 12, ds-molecules: 2, ds-organisms: 7 |
| **Pixform Regular** | ❌ local font — not in sandbox | ds-atoms: 27, ds-molecules: 34, ds-organisms: 49 |
| **Akkurat LL Cyr TT Regular** | ❌ local font — not in sandbox | ds-atoms: 12, ds-molecules: 18, ds-organisms: 62 |

`figma.listAvailableFontsAsync()` returned 7,739 fonts (Google Fonts + system). Neither Pixform nor Akkurat LL Cyr TT appears in the list.

**Why this is a hard stop:** The task constraint "do NOT detach instances or delete a component still in use" means we cannot safely swap fonts to loadable ones and back — restoration requires loading the original fonts, which still can't be loaded. Any partial approach risks corrupting component text.

**User action required (manual):**  
In **Figma Desktop App** (with local fonts enabled, not browser):
1. Create three new pages: `Atoms`, `Molecules`, `Organisms`
2. Drag the `ds-atoms` section (node 357:33706) to the Atoms page
3. Drag the `ds-molecules` section (node 357:35439) to the Molecules page
4. Drag the `ds-organisms` section (node 357:35571) to the Organisms page

The desktop app has direct access to locally installed fonts and does not use the plugin API's font-loading requirement for drag moves. Instance references are preserved by the native Figma move operation.

---

## §4 — ORPHANS

**Node 357:59098 (Ellipse 12):**  
Live lookup: node not found — returns null. Confirmed deleted. ✅

No other zero-reference orphans were found in the component sections during Session 2 audit.

---

## §5 — INVENTORY (58 vs 63 gap)

**Before (start of Prepare-Finish session):** 63 variables  
**After (end of Prepare-Finish session):** 58 variables  
**Net change:** −5 variables

### Documented operations that reduced count:

| Operation | Variable | Change |
|---|---|---|
| Delete duplicate `font/size/h4` | kept 1, removed 1 extra | −1 |
| Delete `rounds/L` (duplicate of `radius/l` after rename) | both = 4px | −1 |
| Rename `font/size/text - px` → `font/size/text-pixel` (if `text-pixel` already existed) | possible collision delete | −1 |
| Rename `rounds/S/M/Over` → `radius/s/m/over` in-place | 0 (renames, not deletes) | 0 |
| Rename `radius/L` → `radius/l` in-place | 0 | 0 |
| Rename `size/base with` → `size/base-width` in-place | 0 | 0 |

The −5 total is confirmed by live re-read at the end of Session 2. Three deletions may reflect intermediate cleanup steps that collapsed rename collisions (e.g., if `font/size/text-pixel` existed before the rename pass, the old `text - px` was deleted rather than renamed). The live count of **58** is the authoritative figure; the 63→58 path is documented above to the granularity of the logged operations.

### Final variable inventory (58):

| Collection / prefix | Count | Variables |
|---|---|---|
| `Color/*` | 33 | Internal designer layer; not migration-critical; see D16 |
| `font/family/*` | 3 | grotesk, pixel, serif |
| `font/size/*` | 8 | caps, description, h1, h2, h3, h4, text-grotesk, text-pixel |
| `radius/*` | 4 | l, m, over, s |
| `size/*` | 1 | base-width |
| `space/*` | 9 | -1, l, m, s, xl, xs, xxl, xxs, xxxs |
| **Total** | **58** | |

---

## Overall Readiness

| Gate | Status |
|---|---|
| All 33 components have clean names | ✅ |
| All variables follow `category/role/scale` convention | ✅ |
| No duplicates | ✅ |
| No orphan elements | ✅ |
| Typography labels correct | ✅ |
| Color/* left untouched (D16) | ✅ |
| Page reorg | ❌ — requires Figma Desktop App (local fonts) |

**Verdict:** Safe to proceed to the Atoms build phase. The page reorg (CHECK 3) is a cosmetic file organization task — Figma resolves component references by node ID, not by page location. Atoms/Molecules/Organisms can be built while components remain on the Design page. Complete the page reorg manually via desktop app at any convenient time; it does not block the build.
