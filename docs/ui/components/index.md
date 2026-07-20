# UI Component Catalog

Search by semantic capability when the exact component name is unknown:

```bash
rg -i "<component|capability|interaction>" docs/ui
```

| Component | Import | Purpose | Capabilities and boundaries | Status |
| --- | --- | --- | --- | --- |
| Button | `@/components/ui/button` | shadcn/ui action primitive | Variants, sizes, disabled/focus states; use for application actions. | Stable |
| Popover | `@/components/ui/popover` | shadcn/ui anchored non-modal overlay | Focus-aware trigger/content composition; use for compact pickers. | Stable |
| Dropdown menu | `@/components/ui/dropdown-menu` | shadcn/ui keyboard-accessible menu primitive | Menu, radio and checkbox selection; use when menu semantics fit. | Stable |
| Command | `@/components/ui/command` | shadcn/ui searchable selection list | Input, filtering and empty state; compose in a Popover for searchable pickers. | Stable |
| LanguageSelect | `@/components/language/language-select` | Language picker | Searchable persisted locale selection. | Stable |
| OriaThemeSelect | `@/components/oria/oria-theme-controls` | OriaTheme preset picker | Searches runtime custom themes and official presets; selected theme changes through OriaTheme. | Stable |
| OriaAppearanceSelect | `@/components/oria/oria-theme-controls` | Light/dark/system preference picker | Changes appearance through OriaTheme with an origin-aware transition. | Stable |
| ThemeEditor | `@/components/oria-theme-editor` | Generated OriaTheme editor component | Theme management, token editing, live preview, import/export, reset and save; editor chrome follows the active i18next locale. It remains mounted through the `/editor` route. | Stable |

## Shared rules

- Search this catalog before creating a component.
- Reuse or compose documented capabilities before extending the system.
- Keep page-specific UI in its page.
- Record each reusable component in this catalog only once.
