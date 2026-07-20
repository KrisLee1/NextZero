"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { useOriaTheme } from "@oriatheme/react";
import { oriaPresetCatalog } from "@oriatheme/presets";
import { createThemeEditorIdentity } from "@oriatheme/editor-core";
import { ThemeEditor } from "@/components/oria-theme-editor";
import { LanguageSelect } from "@/components/language/language-select";
import { OriaAppearanceSelect, OriaThemeSelect } from "@/components/oria/oria-theme-controls";
import { ThemeTokenContract } from "@/components/oria/theme-token-contract";

function transitionOrigin(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export function ThemeEditorPage() {
  const { t } = useTranslation();
  const { runtime, snapshot, setAppearance, setTheme } = useOriaTheme();
  const activeTheme = snapshot.customThemes.find((theme) => theme.id === snapshot.preference.activeThemeId)
    ?? oriaPresetCatalog.find(({ theme }) => theme.id === snapshot.preference.activeThemeId)?.theme
    ?? oriaPresetCatalog[0]?.theme;
  const options = useMemo(() => {
    if (!activeTheme) return undefined;

    return activeTheme.kind === "preset"
      ? { source: activeTheme, identity: createThemeEditorIdentity(activeTheme, [...snapshot.presets, ...snapshot.customThemes]) }
      : { source: activeTheme };
  }, [activeTheme, snapshot.customThemes, snapshot.presets]);

  if (!activeTheme || !options) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <title>{t("editor.pageTitle")}</title>
      <header className="editor-topbar sticky top-0 z-40 h-14">
        <div className="mx-auto flex h-full w-full max-w-[96rem] items-center justify-between gap-3 px-5 sm:px-8">
          <Link href="/" className="group inline-flex items-baseline text-base font-bold tracking-tight transition-transform duration-150 active:scale-[0.98] sm:text-lg">Next<span className="text-primary transition-colors group-hover:text-primary/80">Zero</span></Link>
          <div className="flex items-center gap-2">
            <Link href="/docs" className="hidden h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-muted/75 hover:text-foreground active:scale-[0.98] sm:inline-flex"><SlidersHorizontal className="size-3.5" />{t("editor.documentation")}</Link>
            <div className="editor-control-cluster flex items-center rounded-xl p-1">
              <OriaThemeSelect variant="ghost" className="h-8 bg-transparent px-2 text-xs hover:shadow-none sm:px-2.5" />
              <LanguageSelect variant="ghost" className="h-8 bg-transparent px-2 text-xs hover:shadow-none sm:px-2.5" />
              <OriaAppearanceSelect variant="ghost" className="size-8 p-1 hover:shadow-none" />
            </div>
          </div>
        </div>
      </header>

      <div className="editor-page-grid mx-auto grid w-full max-w-[96rem] items-start lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:gap-5">
        <ThemeTokenContract />
        <aside className="editor-shell order-first border-b border-border/70 lg:order-last lg:flex lg:border-b-0 lg:border-l">
          <ThemeEditor
            key={activeTheme.id}
            options={options}
            runtime={runtime}
            mode={snapshot.resolvedMode}
            onModeChange={(mode, origin) => setAppearance(mode, { animate: true, origin: transitionOrigin(origin) })}
            previewFollowsAppearance
            onSave={(result) => { if (result.ok) setTheme(result.theme.id); }}
          />
        </aside>
      </div>
    </div>
  );
}
