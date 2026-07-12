"use client";

import { useMemo, type CSSProperties, type MouseEvent } from "react";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { getThemeStyles, themePresets } from "@/lib/theme-presets";
import { setThemeTransitionOrigin } from "@/lib/theme-transition";
import { useThemeStore } from "@/store/theme-store";
import type { ThemeMode } from "@/types/theme";
import { cn } from "@/lib/utils";

type ThemeCardProps = {
  name: string;
  isDuplicate?: boolean;
  selected: boolean;
  mode: ThemeMode;
  onSelect: (name: string, event: MouseEvent<HTMLButtonElement>) => void;
};

function ThemeCard({ name, isDuplicate = false, selected, mode, onSelect }: ThemeCardProps) {
  const { t } = useTranslation();
  const styles = getThemeStyles(name)[mode];
  const label = themePresets[name].label;

  return (
    <button
      type="button"
      className={cn(
        "group relative w-48 shrink-0 overflow-hidden rounded-2xl border p-2 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-56",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
      style={{ backgroundColor: styles.background, borderColor: styles.border } as CSSProperties}
      onClick={(event) => onSelect(name, event)}
      aria-label={t("landing.themeGallery.choose", { theme: label })}
      aria-pressed={selected}
      aria-hidden={isDuplicate || undefined}
      tabIndex={isDuplicate ? -1 : undefined}
    >
      <div
        className="rounded-xl border p-3 shadow-sm"
        style={{ backgroundColor: styles.card, borderColor: styles.border, color: styles.foreground } as CSSProperties}
      >
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-12 rounded-full opacity-70" style={{ backgroundColor: styles.muted }} />
          <span className="size-5 rounded-md" style={{ backgroundColor: styles.primary }} />
        </div>
        <div className="mt-5 h-2.5 w-4/5 rounded-full" style={{ backgroundColor: styles.foreground, opacity: 0.84 }} />
        <div className="mt-2 h-2 w-3/5 rounded-full" style={{ backgroundColor: styles.muted }} />
        <div className="mt-5 flex gap-2">
          <span className="h-7 flex-1 rounded-md" style={{ backgroundColor: styles.primary }} />
          <span className="h-7 w-10 rounded-md" style={{ backgroundColor: styles.secondary }} />
        </div>
      </div>
      <span className="mt-3 flex items-center justify-between px-1 text-xs font-semibold" style={{ color: styles.foreground }}>
        <span className="truncate">{label}</span>
        {selected && <Check className="size-4 shrink-0" aria-label={t("landing.themeGallery.selected")} />}
      </span>
    </button>
  );
}

function ThemeRow({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const mode: ThemeMode = resolvedTheme === "dark" ? "dark" : "light";
  const themeName = useThemeStore((state) => state.themeName);
  const setThemeName = useThemeStore((state) => state.setThemeName);

  function selectTheme(name: string, event: MouseEvent<HTMLButtonElement>) {
    const origin = event.detail === 0 ? null : { clientX: event.clientX, clientY: event.clientY };
    setThemeTransitionOrigin(origin, event.currentTarget);
    event.currentTarget.blur();
    setThemeName(name);
  }

  return (
    <div className="theme-marquee" aria-label={t("landing.themeGallery.ariaLabel")}>
      <div className={cn("theme-marquee-track", reverse && "theme-marquee-track-reverse")}>
        {[false, true].map((isDuplicate) => (
          <div className="theme-marquee-group" key={String(isDuplicate)} aria-hidden={isDuplicate || undefined}>
            {names.map((name) => (
              <ThemeCard
                key={`${name}-${isDuplicate ? "duplicate" : "original"}`}
                name={name}
                mode={mode}
                selected={themeName === name}
                isDuplicate={isDuplicate}
                onSelect={selectTheme}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThemeCarousel() {
  const { t } = useTranslation();
  const themeNames = useMemo(
    () => Object.keys(themePresets).sort((a, b) => themePresets[a].label.localeCompare(themePresets[b].label)),
    [],
  );
  const midpoint = Math.ceil(themeNames.length / 2);

  return (
    <section id="themes" className="scroll-mt-24 pt-28 sm:pt-36" aria-labelledby="theme-gallery-title">
      <div className="mx-auto mb-9 max-w-2xl text-center">
        <p className="text-sm font-semibold text-primary">{t("landing.themeGallery.eyebrow")}</p>
        <h2 id="theme-gallery-title" className="mt-3 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          {t("landing.themeGallery.title")}
        </h2>
        <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">{t("landing.themeGallery.description")}</p>
      </div>
      <div className="space-y-4">
        <ThemeRow names={themeNames.slice(0, midpoint)} />
        <ThemeRow names={themeNames.slice(midpoint)} reverse />
      </div>
    </section>
  );
}
