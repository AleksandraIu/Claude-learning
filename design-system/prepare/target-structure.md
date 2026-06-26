# Target Structure — React Project Layout

Derived from the full Figma audit (2026-06-23).

---

## Tokens → `src/tokens/`

| Token group | Figma variables | File |
|---|---|---|
| Color | 11 swatches (names TBD) | `colors.ts` |
| Typography — families | `font/family/serif`, `font/family/grotesk`, `font/family/pixel` | `typography.ts` |
| Typography — sizes | `font/size/h1–h4`, `font/size/description`, `font/size/text-grotesk`, `font/size/text-grotesk`, `font/size/text-pixel`, `font/size/caps` | `typography.ts` |
| Typography — line-heights | 9 values (none tokenized yet — add in Styles phase) | `typography.ts` |
| Typography — weights | regular, semibold, bold (none tokenized yet) | `typography.ts` |
| Spacing | `space/xxxs` (2) through `space/xxl` (90), `space/-1` | `spacing.ts` |
| Radius | `radius/l` = 4; others TBD | `radii.ts` |

---

## Atoms → `src/components/atoms/`

| Figma component | React folder | Notes |
|---|---|---|
| `bar` | `Bar/` | Progress bar; 2 sizes × 2 lengths |
| `avatar` | `Avatar/` | 3 variants (katya, dog, petya) → will become image prop |
| `status` | `Status/` | 4 states: purple, green, red, stopped |
| `icons` | `Icon/` | 5 icons; likely SVG sprite → single component with `name` prop |
| `switch` | `Switch/` | on/off × big/small |
| `flag` | `Flag/` | yes/no |
| `tag` | `Tag/` | control, static |
| `error` | `ErrorMessage/` | single variant |
| `avatar-group` | `AvatarGroup/` | composed group of avatars |
| `list` | `ListItem/` | single variant |
| `text-area` | `TextArea/` | single variant |
| `input` | `Input/` | single variant |
| `dropdown` | `Dropdown/` | on-color/default × filled/unfilled |
| `graph` | `Graph/` | single variant |
| `switch-group` | `SwitchGroup/` | single variant |
| `button` | `Button/` | CTA flag × type (secondary, on-color, small, big, node) |

---

## Molecules → `src/components/molecules/`

| Figma component | React folder | Notes |
|---|---|---|
| `profile` | `Profile/` | long, short, short-outlined |
| `node` | `AutomationNode/` | single variant (automation canvas node) |
| `campaign-preview` | `CampaignPreview/` | single variant |
| `project-preview` | `ProjectPreview/` | single variant |
| `experience-preview` | `ExperiencePreview/` | single variant |
| `team` | `Team/` | single variant |
| `metric-card` | `MetricCard/` | compact version (190×196) |
| `metric-card-tall` | `MetricCardTall/` | taller version (201×349) |
| `attempt` | `Attempt/` | 2 variants |
| `notify` | `Notify/` | notification banner |

---

## Organisms → `src/components/organisms/`

| Figma component | React folder | Notes |
|---|---|---|
| `second-row` | `SecondRow/` | sub-navigation row |
| `top-menu` | `TopMenu/` | all/templates/off states |
| `header` | `Header/` | page header |
| `kanban` | `Kanban/` | full kanban board |
| `task` | `Task/` | 2 variants |
| `card-header` | `CardHeader/` | 2 variants (was "card top") |
| `menu-switch` | `MenuSwitch/` | on/off |

---

## Examples → `src/examples/`

25 application wireframe screens in the `design` section.
Grouped by feature area:

| Feature | Screens |
|---|---|
| UX story flows | story-hire-flow-1…5, story-hire-doc |
| All Teams | screen-all-teams-a/b/c, screen-all-teams-single |
| All Teams Campaigns | screen-teams-campaigns-a/b/c |
| Hiring Campaign | screen-hiring-campaign-a/b/c, screen-hiring-campaign-add, screen-hiring-wizard, screen-hiring-wizard-viewport |
| Candidate | screen-candidate-a/b, screen-candidate-interviewed |
| Negotiate | screen-negotiate |
| Automation | screen-automation-editor-a/b/c |
| Success | screen-success |

---

## Font files → `fonts/` (already on disk)

| File | Maps to token |
|---|---|
| `InstrumentSerif-Regular.ttf` | `font/family/serif` |
| `InstrumentSerif-Italic.ttf` | `font/family/serif` (italic variant) |
| `AkkuratLLCyrTT-Regular.ttf` | `font/family/grotesk` (Regular) |
| `AkkuratLLCyrTT-Bold.ttf` | `font/family/grotesk` (Bold) |
| `Pixform.otf` | `font/family/pixel` |
