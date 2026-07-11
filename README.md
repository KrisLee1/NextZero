# NextZero

NextZero is a Next.js starter for projects that need internationalization, theme presets, and user-controlled appearance preferences from the beginning.

## Included

- Internationalization structure built with i18next: language resources and the language picker are ready to adapt to the languages your product supports.
- 26 theme presets driven by semantic CSS variables.
- Three appearance preferences: follow the system, light, or dark.
- Persistent language, theme, and appearance selections in browser storage.
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
components/          Language, theme, and UI components
config/              i18next configuration and language list
lib/theme-presets.ts Theme tokens and preset definitions
public/locales/      Translation resources
store/               Persistent client-side theme state
```

## Customize languages

1. Add a language to `languageList` and `languages` in `config/i18n.config.ts`.
2. Add its translation resource in `public/locales/<language>/common.json`.
3. Import the resource and register it in the `resources` object in `config/i18n.config.ts`.

The language picker stores the chosen language in the browser and restores it on the next visit.

## Customize themes

Edit or add presets in `lib/theme-presets.ts`. Each preset defines semantic tokens for light and dark appearances, including colors, borders, shadows, and radii. The homepage reads the preset count from this file automatically.

## Quality checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## License

Private project. Add a license before publishing or distributing the project.
