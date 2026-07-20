# NextZero

NextZero is a Next.js starter for projects that need internationalization, theme presets, and user-controlled appearance preferences from the beginning.

## Included

- Internationalization structure built with i18next: language resources and the language picker are ready to adapt to the languages your product supports.
- 26 theme presets driven by semantic CSS variables.
- Three appearance preferences: follow the system, light, or dark.
- Persistent language, theme, and appearance selections in browser storage.
- A persistent `/editor` workspace for live OriaTheme token editing, import/export, and saving custom themes.
- Responsive, accessible UI primitives and a documentation page.

## Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
app/                 Routes and global styles
components/          OriaTheme, language, and UI components
config/              i18next configuration and language list
public/locales/      Translation resources
```

## Customize languages

1. Add a language to `languageList` and `languages` in `config/i18n.config.ts`.
2. Add its translation resource in `public/locales/<language>/common.json`.
3. Import the resource and register it in the `resources` object in `config/i18n.config.ts`.

The language picker stores the chosen language in the browser and restores it on the next visit.

## Customize themes

Configure the `OriaThemeProvider` in `components/providers.tsx` and use the presets exported by `@oriatheme/presets`. OriaTheme manages the semantic tokens for light and dark appearances, and the built-in picker reads its preset catalog automatically.

## Quality checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## License

This project is licensed under the [MIT License](./LICENSE).

## Third-party notices

This project uses [OriaTheme](https://theme.oria.org.cn) packages, which are
licensed under Apache-2.0. See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
for the applicable notice and license text.
