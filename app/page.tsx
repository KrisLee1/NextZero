"use client";

import {
  ArrowRight,
  Check,
  Code2,
  ExternalLink,
  Globe2,
  GitBranch,
  Layers3,
  Palette,
  SlidersHorizontal,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "@/components/language/language-select";
import { OriaAppearanceSelect, OriaThemeSelect } from "@/components/oria/oria-theme-controls";

const featureIcons = [Globe2, Palette, Layers3];

export default function Home() {
  const { t } = useTranslation();
  const features = [0, 1, 2].map((index) => ({
    icon: featureIcons[index],
    title: t(`landing.features.items.${index}.title`),
    description: t(`landing.features.items.${index}.description`),
  }));

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <title>{`${t("meta.home")} | NextZero`}</title>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden">
        <div className="absolute left-[8%] top-[-12rem] size-[26rem] rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute right-[-8rem] top-20 size-[22rem] rounded-full bg-chart-2/15 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 border-border/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="text-base font-bold tracking-tight sm:text-lg" aria-label="NextZero">
            Next<span className="text-primary">Zero</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label={t("landing.navigation")}>
            <a className="transition-colors hover:text-foreground" href="/docs">{t("landing.nav.docs")}</a>
            <a className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground" href="/editor">{t("landing.nav.editor")} <SlidersHorizontal className="size-3.5" /></a>
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              href="https://github.com/KrisLee1/NextZero"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <GitBranch className="size-3.5" />
            </a>
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
              href="https://theme.oria.org.cn"
              target="_blank"
              rel="noreferrer"
            >
              OriaTheme <ExternalLink className="size-3.5" />
            </a>
          </nav>

          <div className="theme-elevation-sm flex items-center rounded-xl border border-border/70 bg-card/70 p-1 backdrop-blur-md">
            <OriaThemeSelect variant="ghost" className="h-8 bg-transparent px-2 text-xs hover:shadow-none sm:px-2.5" />
            <LanguageSelect variant="ghost" className="h-8 bg-transparent px-2 text-xs hover:shadow-none sm:px-2.5" />
            <OriaAppearanceSelect
              variant="ghost"
              className="size-8 p-1 hover:shadow-none"
            />
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pt-40">
        <section className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="theme-elevation-xs mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/75 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              {t("landing.eyebrow")}
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {t("landing.hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {t("landing.hero.description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/docs" className="theme-elevation-sm inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                {t("landing.hero.primaryCta")}
                <ArrowRight className="size-4" />
              </a>
              <a href="https://github.com/KrisLee1/NextZero" target="_blank" rel="noreferrer" className="theme-elevation-sm inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card/70 px-4 text-sm font-semibold transition-colors hover:bg-muted">
                {t("landing.hero.secondaryCta")}
                <GitBranch className="size-4" />
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-border/70 pt-6">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {t(`landing.stats.${index}.value`)}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{t(`landing.stats.${index}.label`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="demo" className="relative mx-auto w-full max-w-[31rem]">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/15 blur-2xl" />
            <div className="theme-elevation-md overflow-hidden rounded-2xl border border-border bg-card/90 p-3 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-border px-2 pb-3">
                <div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-destructive" /><span className="size-2.5 rounded-full bg-chart-1" /><span className="size-2.5 rounded-full bg-chart-2" /></div>
                <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">nextzero.app</span>
              </div>
              <div className="space-y-4 p-3 pt-5">
                <div className="theme-elevation-xs rounded-xl bg-background p-4 ring-1 ring-border/70">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t("landing.demo.kicker")}</p>
                      <p className="mt-1 text-lg font-semibold tracking-tight">{t("landing.demo.title")}</p>
                    </div>
                    <span className="rounded-lg bg-primary/15 p-2 text-primary"><WandSparkles className="size-4" /></span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
                  <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>{t("landing.demo.progressStart")}</span><span>{t("landing.demo.progressEnd")}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-background p-3">
                    <Globe2 className="size-4 text-chart-2" />
                    <p className="mt-4 text-xs font-semibold">{t("landing.demo.language")}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t("landing.demo.languages")}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-3">
                    <Palette className="size-4 text-primary" />
                    <p className="mt-4 text-xs font-semibold">{t("landing.demo.theme")}</p>
                    <div className="mt-2 flex gap-1"><span className="size-3 rounded-full bg-primary" /><span className="size-3 rounded-full bg-chart-2" /><span className="size-3 rounded-full bg-chart-4" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-8 pt-28 sm:pt-36">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-primary">{t("landing.features.eyebrow")}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{t("landing.features.title")}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{t("landing.features.description")}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="theme-elevation-card group rounded-2xl border border-border bg-card/75 p-6 hover:-translate-y-1">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary"><Icon className="size-5" /></span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="scroll-mt-8 py-28 sm:py-36">
          <div className="theme-elevation-md rounded-3xl border border-border bg-card/80 p-6 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-primary">{t("landing.workflow.eyebrow")}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{t("landing.workflow.title")}</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{t("landing.workflow.description")}</p>
                <a href="#top" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  {t("landing.workflow.cta")} <ArrowRight className="size-4" />
                </a>
              </div>
              <ol className="space-y-3">
                {[0, 1, 2].map((index) => (
                  <li key={index} className="theme-elevation-xs flex gap-4 rounded-xl border border-border/80 bg-background/70 p-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">0{index + 1}</span>
                    <div><p className="font-semibold">{t(`landing.workflow.steps.${index}.title`)}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{t(`landing.workflow.steps.${index}.description`)}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t border-border/70 py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">{t("landing.footer")}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {["i18n", "theme", "system"].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-primary" />{t(`landing.footerItems.${item}`)}</span>)}
              <span className="inline-flex items-center gap-1.5"><Code2 className="size-3.5 text-primary" />Next.js</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
