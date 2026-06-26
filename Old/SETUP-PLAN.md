# Design Systems in Claude Code — Setup Plan

_Audited on 2026-06-11. macOS._

Course goal: connect **Figma → Claude Code → React**. This file tracks setup
before Week 1 and keeps learning separate from work.

---

## Workspace separation

- **Learning lives here:** `~/Claude learning/`
  - `instructions.html` — the setup guide
  - `SETUP-PLAN.md` — this file
  - `projects/` — all course exercises and the Week 2 React project go here
- **Work stays where it already is** — never run course experiments inside a
  work repo, and don't point Figma write-back lessons at work files unless you
  mean to.

> ⚠️ **Do NOT keep course files in Desktop, Documents, or Downloads.**
> macOS privacy (TCC) blocks Claude Code from reading those folders — that's the
> exact error we hit with the original `instructions.html` on the Desktop.
> `~/Claude learning/` sits directly in your home folder and reads fine.

---

## Status

### ✅ Already done
- [x] git (2.50.1)
- [x] Homebrew (5.1.14)
- [x] Node.js (v24.16.0) + npm (11.13.0)  — course needs 18+, well past
- [x] Claude Code (2.1.159), installed & signed in
- [x] Figma desktop app installed

### ✅ All done — setup complete (2026-06-11)
- [x] **Install VS Code** (step 04) — v1.124.0 installed
- [x] **Install Figma plugin** (step 06) — v2.2.12, enabled
- [x] **Figma seat is paid** — confirmed (auth succeeded, no 403)
- [x] **Authorize Figma** (step 06) — `claude mcp list` shows ✔ Connected
- [x] **Verify** (step 07) — figma MCP connected

**Ready for Week 1.** Remember the cautions below (keep Figma desktop app open
for write-back lessons; redo /plugin auth if you switch Figma accounts).

---

## Where to be careful

1. **Right Figma account in the browser.** If you have more than one Figma
   login, the "Allow access" screen authorizes whichever account the *browser*
   is signed into. Sign into the paid account that holds your real files first.
2. **The connection is per-account.** Switch Figma accounts later → redo
   `/plugin` → figma → authorize.
3. **Never use `sudo`** on any install command. It breaks future updates. If
   something asks for it, stop.
4. **Keep the Figma desktop app open** during write-back lessons (Claude editing
   Figma / UI → Figma). The live read/write tools need it running.
5. **Open new terminal windows after installs** — `claude`, `node`, `brew` only
   appear in fresh shells.
6. **Work vs. learning accounts.** If your work Figma is a different account than
   your personal/course one, decide which seat you're authorizing — and don't
   accidentally let course exercises write into work files.

---

## Quick path (copy-paste, in order)

```sh
# 1. VS Code
brew install --cask visual-studio-code
# 2. Figma plugin
claude plugin install figma@claude-plugins-official
# 3. then inside Claude Code:  /plugin  → authorize figma in browser
# 4. verify:  claude doctor
```
