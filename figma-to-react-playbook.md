# Figma → React: My Migration Playbook

A simple, repeatable guide for turning a Figma design system into React code,
using Claude Code with the Figma connector. Written from real runs, including
the mistakes I hit and how to avoid them next time.

---

## 1. The big picture (in plain words)

I have a design system drawn in **Figma** (colors, fonts, buttons, cards, whole
screens). I'm turning those drawings into real, reusable **React** code.

I do it in **five stages, smallest pieces first**:

1. **Prepare** – clean up the Figma file (fix names, kill duplicates, organize).
2. **Styles** – turn colors, fonts, and spacing into code "tokens."
3. **Atoms** – build the tiny pieces (button, input, tag…).
4. **Molecules** – combine atoms into bigger pieces (card, profile row…).
5. **Organisms** – combine those into full sections (header, kanban, task list…).

**Claude Code reads Figma and writes the code. I review after each stage.**

> Why smallest-first? Each stage builds on the one before. Tokens use nothing.
> Atoms use tokens. Molecules use atoms. Organisms use molecules. Build them out
> of order and you redo work.

---

## 2. The golden rules (the things I got wrong before)

These are the corrections from earlier runs. Keep them in front of me every time.

### Rule 1 — The Figma connector reads the OPEN TAB, not the link
The connector does **not** fetch a file from a share URL. It reads whatever file
and node is **active/selected in the Figma desktop app** right now.
**Before each run: open the right file in the desktop app and select the node.**
If I get "no node could be found," that's the cause — the tab isn't active/selected.

### Rule 2 — Pick the RIGHT node as the entry point
Node IDs matter. From my file:
- `198:64` = the whole **Design page** ✅ (correct entry point — contains everything)
- `2001:19512` = the **styles section** (right for the Styles stage)
- `2001:19522` = a single **text cell** ❌ (I used this by mistake once — too small)

**Use the page/section root, not a tiny element inside it.**

### Rule 3 — Read-only vs write-capable connector
Some Figma connectors can only **read** (get info). Some can also **write**
(rename, delete, reorganize inside Figma).
**Always check capability first.** If it's read-only, Claude Code produces a
*plan* (a rename map) that I apply in Figma by hand. If it can write, it applies
changes directly. Don't assume — detect it.

### Rule 4 — Tailwind v4 is CSS-first
Use **Tailwind v4 with `@theme` in CSS**, **not** a `tailwind.config.js` file.
Tokens live in CSS variables that `@theme` turns into utility classes.

### Rule 5 — Two-tier tokens: primitives → semantic
- **Primitives** = raw values (e.g. the actual hex of a color).
- **Semantic** = meaningful names that *point at* primitives (e.g. `bg/default`).
Components use semantic names. This makes re-theming clean later.

### Rule 6 — Fonts come from the local /fonts folder only
My custom fonts (**Instrument Serif, Akkurat LL Cyrillic, Pixform**) live in
`./fonts/`. Load them with `@font-face` from those files. **Never Google Fonts /
CDN.** Watch the spelling — "Akkurat" is sometimes mistyped "Accurat."

### Rule 7 — Single mode (for this file)
This design system has **one mode** — no light/dark. So **no `[data-theme="dark"]`
scaffolding.** (If a future file has modes, add it back.)

### Rule 8 — One stage at a time, review in between
Don't bundle stages into one giant prompt. Run Prepare, review, *then* Styles, etc.
The review checkpoint is the whole point of the log files (below).

### Rule 9 — Build /preview immediately, one page per layer
A `/preview` route with `/preview/styles`, `/preview/atoms`, `/preview/molecules`,
`/preview/organisms`. Build the current stage's page fully; stub the rest. This is
my living styleguide to see the work render.

### Rule 10 — Verify nothing got dropped
At the end of each stage: count what came out of Figma vs what landed in code.
Confirm they match.

---

## 3. The three log files (keep these every stage)

| File | What it's for | How it grows |
|------|----------------|--------------|
| `AUDIT.md` | Before-state inventory + list of issues found | Rewritten per stage |
| `DECISIONS.md` | Every naming/mapping choice + one-line reason | Appended |
| `NOTES.md` | Human-readable release log, one entry per task | **Append only — never rewrite** |

**`NOTES.md` entry format:**
```
## [Step N: StageName] — <task> — <timestamp>
- What landed (plain language)
- Counts: before → after
- Anything flagged or skipped
```
This lets me review progress task-by-task without opening Figma.

---

## 4. The repeatable recipe (every stage)

1. **Open + select** the right node in Figma desktop. (Rule 1, 2)
2. **Connection check** — confirm the connector responds and whether it can write. (Rule 3)
3. **Read** the node (extract names, values, structure).
4. **Find problems / normalize** — duplicates, bad names, hardcoded values.
5. **Decide the convention**, log it in `DECISIONS.md`.
6. **Produce output** — a cleanup plan (Prepare) or code (Styles onward).
7. **Build/update `/preview`** for this stage. (Rule 9)
8. **Verify** counts match. (Rule 10)
9. **Append to `NOTES.md`**, then stop and review before the next stage. (Rule 8)

---

## 5. Prompt skeleton (fill in per stage)

```
# <STAGE NAME> — <one-line goal>

Figma node: <URL with the correct node-id>     ← Rule 2
MCP: connected Figma MCP. Reads the active desktop tab.   ← Rule 1
Fonts: Instrument Serif, Akkurat LL Cyrillic, Pixform — from ./fonts/ only.  ← Rule 6
Stack: React + Tailwind v4 (CSS-first @theme, NOT tailwind.config.js).  ← Rule 4
Single mode — no dark/light.  ← Rule 7

FULL GAS, NO QUESTIONS: make every call yourself, log each in DECISIONS.md,
run to completion. The ONE allowed stop is a failed connection or a missing
font / missing write capability. Continue the NOTES.md log — append, never rewrite.

TASKS
A. Connection check (+ detect read-only vs write).   ← Rule 3
B. Read / extract the node.
C. Find problems / normalize (two-tier tokens where relevant).  ← Rule 5
D. Decide the convention, log to DECISIONS.md.
E. Produce output (plan or code).
F. Build /preview for this stage, stub the others.   ← Rule 9
G. Verify counts; append to NOTES.md.   ← Rule 10

FALLBACK: if reads are incomplete, export the node to JSON via dev mode and
parse that; note the switch in DECISIONS.md + NOTES.md.

OUTPUT: <files for this stage> + the readiness checklist for the next stage.
```

---

## 6. Where I am / what's next

- [x] **Prepare** — audited, cleaned names, killed duplicates, locked convention.
- [ ] **Styles** — tokens (colors/type/spacing) → Tailwind v4 @theme + /preview/styles.
- [ ] **Atoms** — build each `ds-atoms` component against tokens → /preview/atoms.
- [ ] **Molecules** — combine atoms (card, profile…) → /preview/molecules.
- [ ] **Organisms** — combine molecules (header, kanban…) → /preview/organisms.

**Next stage handoff:** when Styles is done and /preview/styles renders, the Atoms
prompt is "build each atom from `ds-atoms` using the locked tokens, fill /preview/atoms."

---

## Quick glossary

- **Design system** – the reusable set of colors, fonts, and components a product is built from.
- **Token** – a named value (a color, a size) used everywhere instead of a raw number.
- **Atom / Molecule / Organism** – sizes of UI piece: tiny → medium → large section.
- **MCP / connector** – the bridge that lets Claude Code read (and maybe write) Figma.
- **@theme (Tailwind v4)** – where tokens are declared in CSS so they become utility classes.
