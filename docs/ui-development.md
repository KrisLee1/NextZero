# UI Development

Read this file before changing the interface. Discover reusable UI through the [component catalog](ui/components/index.md); do not rescan the whole UI without evidence that this index is stale.

## Stack summary

| Area | Choice | Evidence |
| --- | --- | --- |
| Framework/runtime | Next.js 16 App Router with React 19 | `package.json`, `app/` |
| Language | TypeScript | `tsconfig.json` |
| Styling/theme | Tailwind CSS 4 and OriaTheme CSS tokens | `app/globals.css`, `components/providers.tsx` |
| UI components | shadcn/ui components generated locally, using Base UI primitives; OriaTheme's generated theme editor | `components.json`, `components/ui/`, `components/oria-theme-editor/` |
| Icons | Lucide React | `package.json`, UI imports |
| Motion | Motion and CSS transitions | `package.json`, component imports |
| Package manager | npm | `package-lock.json` |

## Global constraints

- Theme state, persistence, mode resolution and transitions are owned by OriaTheme; do not add a parallel theme store or `next-themes`.
- Install and update OriaTheme through npm; do not use local `file:` dependencies for it.
- Install the editor through `npm exec --yes --package=@oriatheme/cli@latest -- oria add theme-editor --framework react --yes`; use the generated component in `components/oria-theme-editor/` rather than copying the example application.
- Reuse local primitives and Lucide icons; controls must preserve keyboard access and visible focus states.

## UI architecture

| Layer | Location | Ownership rule |
| --- | --- | --- |
| Shared primitives | `components/ui/` | Reuse these generated shadcn/ui components before adding another primitive. |
| Shared patterns | `components/oria/`, `components/language/` | Add app-wide controls here; the OriaTheme editor composition and token contract live in `components/oria/`. |
| Feature UI | `app/**` | Pages compose shared controls and remain responsible for content/layout. |
| Tokens/theme | `app/globals.css`, `components/providers.tsx` | CSS maps UI tokens; OriaTheme owns runtime theme state. |
| Public exports | Direct component paths | No shared barrel file exists. |

## Documentation routing

| Need | Read |
| --- | --- |
| Discover a reusable component | [UI component catalog](ui/components/index.md) |
| Change theme controls or runtime | [UI component catalog](ui/components/index.md) |

If the category or component name is unclear, search by capability:

```bash
rg -i "<component|capability|interaction>" docs/ui
```

## Component decision order

1. Reuse a documented component.
2. Compose documented primitives and patterns.
3. Add from the approved UI library.
4. Select a compatible dependency only when policy permits and a concrete gap exists.
5. Implement with native platform features and project code when dependencies are unnecessary.

## Validation

| Check | Command or procedure |
| --- | --- |
| Type checking | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Tests | No project test script configured. |
| Build | `npm run build` |
| Component/visual review | Run `npm run dev`, then inspect light, dark and system appearance plus theme selection at mobile and desktop widths. |

## Maintenance contract

Update this documentation and the owning component catalog when reusable UI capabilities, dependencies, canonical paths, or validation commands change. Do not catalog page-private layout fragments or duplicate type-level prop details.
