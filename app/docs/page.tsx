"use client";

import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileCode2,
  Globe2,
  GitBranch,
  MoonStar,
  Palette,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "@/components/language/language-select";
import { OriaAppearanceSelect, OriaThemeSelect } from "@/components/oria/oria-theme-controls";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-muted/55 p-4 text-xs leading-6 text-foreground sm:text-sm">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  const { t } = useTranslation();
  const sections = [
    ["quick-start", t("docs.nav.quickStart")],
    ["switchers", t("docs.nav.switchers")],
    ["customize", t("docs.nav.customize")],
    ["themes", t("docs.nav.themes")],
    ["languages", t("docs.nav.languages")],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <title>{`${t("meta.docs")} | NextZero`}</title>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-base font-bold tracking-tight sm:text-lg" aria-label="NextZero home">
            Next<span className="text-primary">Zero</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex">
              <ArrowLeft className="size-4" /> {t("docs.backHome")}
            </Link>
            <Link href="/editor" className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:inline-flex">
              <SlidersHorizontal className="size-4" /> {t("docs.themeEditor")}
            </Link>
            <a href="https://github.com/KrisLee1/NextZero" target="_blank" rel="noreferrer" className="hidden size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:grid" aria-label="NextZero on GitHub">
              <GitBranch className="size-4" />
            </a>
            <div className="theme-elevation-sm flex items-center rounded-xl border border-border/70 bg-card/70 p-1 backdrop-blur-md">
              <OriaThemeSelect variant="ghost" className="h-8 bg-transparent px-2 text-xs hover:shadow-none sm:px-2.5" />
              <LanguageSelect variant="ghost" className="h-8 bg-transparent px-2 text-xs hover:shadow-none sm:px-2.5" />
              <OriaAppearanceSelect variant="ghost" className="size-8 p-1 hover:shadow-none" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:pt-36">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1 border-l border-border pl-4" aria-label={t("docs.navigation")}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("docs.navigation")}</p>
            {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <div className="theme-elevation-xs inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-primary">
            <FileCode2 className="size-3.5" /> {t("docs.badge")}
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{t("docs.title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {t("docs.introduction")}
          </p>

          <section id="quick-start" className="scroll-mt-28 pt-16">
            <SectionTitle icon={Code2} eyebrow="01 · START" title={t("docs.quickStart.title")} description={t("docs.quickStart.description")} />
            <CodeBlock>{"npm install\nnpm run dev"}</CodeBlock>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                [t("docs.quickStart.cards.theme.title"), t("docs.quickStart.cards.theme.description")],
                [t("docs.quickStart.cards.language.title"), t("docs.quickStart.cards.language.description")],
                [t("docs.quickStart.cards.mode.title"), t("docs.quickStart.cards.mode.description")],
              ].map(([title, description]) => (
                <div key={title} className="theme-elevation-xs rounded-xl border border-border bg-card/70 p-4">
                  <CheckCircle2 className="size-4 text-primary" />
                  <p className="mt-3 font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="switchers" className="scroll-mt-28 pt-20">
            <SectionTitle icon={Settings2} eyebrow="02 · COMPONENTS" title={t("docs.switchers.title")} description={t("docs.switchers.description")} />
            <div className="space-y-4">
              <DocCard icon={Palette} title="OriaThemeSelect">
                {t("docs.switchers.theme")}
                <CodeBlock>{'<OriaThemeSelect variant="ghost" className="h-8" />'}</CodeBlock>
              </DocCard>
              <DocCard icon={Globe2} title="LanguageSelect">
                {t("docs.switchers.language")}
                <CodeBlock>{'<LanguageSelect variant="ghost" className="h-8" />'}</CodeBlock>
              </DocCard>
              <DocCard icon={MoonStar} title="OriaAppearanceSelect">
                {t("docs.switchers.mode")}
                <CodeBlock>{'<OriaAppearanceSelect variant="ghost" className="size-8" />'}</CodeBlock>
              </DocCard>
            </div>
          </section>

          <section id="customize" className="scroll-mt-28 pt-20">
            <SectionTitle icon={Settings2} eyebrow="03 · CUSTOMIZE" title={t("docs.customize.title")} description={t("docs.customize.description")} />
            <CodeBlock>{`<OriaThemeSelect
  variant="outline"
  className="w-full justify-start"
/>

<LanguageSelect
  variant="secondary"
  className="h-9"
/>

<OriaAppearanceSelect
  variant="ghost"
  className="size-8"
/>`}</CodeBlock>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t("docs.customize.note")} <code>components/oria</code>、<code>components/language</code>、<code>components/ui/popover.tsx</code> 与 <code>components/ui/command.tsx</code>。
            </p>
          </section>

          <section id="themes" className="scroll-mt-28 pt-20">
            <SectionTitle icon={Palette} eyebrow="04 · THEMES" title={t("docs.themes.title")} description={t("docs.themes.description")} />
            <CodeBlock>{`import { OriaThemeProvider } from "@oriatheme/react";
import { oriaPresetThemes } from "@oriatheme/presets";

<OriaThemeProvider config={{
  presets: oriaPresetThemes,
  defaultThemeId: "oria-default",
}} />`}</CodeBlock>
            <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/8 p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div><p className="font-semibold">{t("docs.themes.oriaTitle")}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{t("docs.themes.oriaDescription")}</p></div>
                <a href="https://theme.oria.org.cn" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                  {t("docs.themes.oriaButton")} <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
            <ol className="mt-5 space-y-2 text-sm leading-6 text-muted-foreground">
              {[1, 2, 3].map((step) => <li key={step}><strong className="text-foreground">{step}.</strong> {t(`docs.themes.steps.${step}`)}</li>)}
            </ol>
          </section>

          <section id="languages" className="scroll-mt-28 pt-20">
            <SectionTitle icon={Globe2} eyebrow="05 · LOCALES" title={t("docs.languages.title")} description={t("docs.languages.description")} />
            <CodeBlock>{`// config/i18n.config.ts
const languages = ["en", "zh", "zh-Hant", "ja", "ko", "de", "ru", "fr", "es"];

export const languageList = [
  { code: "es", label: "Español" },
];`}</CodeBlock>
            <CodeBlock>{`// public/locales/es/common.json
{
  "language-select": {
    "search-lang": "Buscar idioma",
    "no-found": "No se encontró ningún idioma"
  },
  "landing": {
    "hero": { "title": "Tu título localizado" }
  }
}`}</CodeBlock>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t("docs.languages.note")} <code>languages</code>、<code>languageList</code> 与 <code>public/locales/locale/common.json</code>。{t("docs.languages.fallback")} <code>public/locales/en/common.json</code>。
            </p>
          </section>

          <section className="mt-20 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">{t("docs.outro")}</p>
          </section>
        </article>
      </main>
    </div>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title, description }: { icon: typeof Code2; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary"><Icon className="size-3.5" /> {eyebrow}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}

function DocCard({ icon: Icon, title, children }: { icon: typeof Code2; title: string; children: React.ReactNode }) {
  return (
    <div className="theme-elevation-card rounded-2xl border border-border bg-card/70 p-5">
      <div className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span>{title}</div>
      <div className="mt-3 text-sm leading-6 text-muted-foreground">{children}</div>
    </div>
  );
}
