"use client";

import { useMemo, useRef, useState, type PointerEvent } from "react";
import { Check, Monitor, MoonStar, Palette, SearchX, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useOriaTheme } from "@oriatheme/react";
import { oriaPresetCatalog } from "@oriatheme/presets";
import type { AppearanceMode, ThemeDefinition, TokenPath } from "@oriatheme/core";
import { buttonVariants } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

type ButtonVariant = "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;

type ThemeControlProps = {
  className?: string;
  variant?: ButtonVariant;
};

const palettePaths = ["color.primary", "color.secondary", "color.accent", "color.selection", "color.info"] as const;
const paletteRotations = [-32, -16, 0, 16, 32];

function transitionOrigin(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function ThemePalette({ theme, mode }: { theme: ThemeDefinition; mode: "light" | "dark" }) {
  return (
    <span className="relative block size-5 shrink-0" aria-hidden="true">
      {palettePaths.map((path, index) => {
        const value = theme.modes[mode][path as TokenPath];

        return <i key={path} className="absolute bottom-px left-1/2 h-4 w-2 rounded-sm border border-black/10 shadow-sm" style={{ zIndex: palettePaths.length - index, backgroundColor: typeof value === "string" ? value : "transparent", transform: `translateX(-50%) rotate(${paletteRotations[index]}deg)`, transformOrigin: "50% 88%" }} />;
      })}
    </span>
  );
}

export function OriaThemeSelect({ className, variant }: ThemeControlProps) {
  const { t } = useTranslation();
  const { snapshot, setTheme } = useOriaTheme();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const themes = useMemo(
    () => [...snapshot.customThemes, ...oriaPresetCatalog.map(({ theme }) => theme)],
    [snapshot.customThemes],
  );
  const activeTheme = themes.find((theme) => theme.id === snapshot.preference.activeThemeId) ?? themes[0];
  const filteredThemes = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return query ? themes.filter((theme) => theme.name.toLocaleLowerCase().includes(query)) : themes;
  }, [searchQuery, themes]);

  if (!activeTheme) return null;

  function selectTheme(theme: ThemeDefinition, event: PointerEvent<HTMLDivElement>) {
    setTheme(theme.id, { animate: true, origin: transitionOrigin(triggerRef.current ?? event.currentTarget) });
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={triggerRef}
        role="combobox"
        aria-label={activeTheme.name}
        aria-expanded={open}
        className={cn(buttonVariants({ variant, className }), "w-auto cursor-pointer justify-between whitespace-nowrap")}
      >
        <Palette className="size-4" />
        <span className="hidden max-w-28 truncate sm:inline">{activeTheme.name}</span>
      </PopoverTrigger>
      <PopoverContent initialFocus={false} finalFocus={false} className="w-[18rem] p-0">
        <Command>
          <CommandInput placeholder={t("theme-select.search-theme")} value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList>
            <CommandEmpty>
              <motion.div
                className="flex flex-col items-center p-3 text-center text-sm text-muted-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <SearchX className="mb-2 size-4" />
                {t("theme-select.no-found")}
              </motion.div>
            </CommandEmpty>
            <CommandGroup>
              <motion.div layout className="flex flex-col">
                <AnimatePresence>
                  {filteredThemes.map((theme, index) => (
                    <motion.div
                      key={theme.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.04,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        y: -10,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <CommandItem
                        value={theme.name}
                        className="justify-between gap-3"
                        onPointerDown={(event) => selectTheme(theme, event)}
                      >
                        <ThemePalette theme={theme} mode={snapshot.resolvedMode} />
                        <span className="min-w-0 flex-1 truncate">{theme.name}</span>
                        <Check className={cn("size-4 shrink-0", theme.id === activeTheme.id ? "opacity-100" : "opacity-0")} />
                      </CommandItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function OriaAppearanceSelect({ className, variant }: ThemeControlProps) {
  const { t } = useTranslation();
  const { snapshot, setAppearance } = useOriaTheme();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modes: Array<{ value: AppearanceMode; icon: typeof Sun; label: string }> = [
    { value: "system", icon: Monitor, label: t("theme-mode-toggle.auto") },
    { value: "light", icon: Sun, label: t("theme-mode-toggle.light") },
    { value: "dark", icon: MoonStar, label: t("theme-mode-toggle.dark") },
  ];
  const selected = modes.find((mode) => mode.value === snapshot.preference.appearance) ?? modes[0];
  const Icon = selected.icon;

  return (
    <Popover>
      <PopoverTrigger
        ref={triggerRef}
        aria-label={selected.label}
        title={selected.label}
        className={cn(buttonVariants({ variant, className }), "cursor-pointer")}
      >
        <Icon className="size-4" />
        <span className="sr-only">{selected.label}</span>
      </PopoverTrigger>
      <PopoverContent initialFocus={false} finalFocus={false} className="w-44 p-1">
        <div role="group" aria-label={t("theme-mode-toggle.auto")}>
          <motion.div layout className="space-y-1">
            <AnimatePresence>
              {modes.map(({ value, icon: ModeIcon, label }, index) => (
                <motion.div
                  key={value}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      delay: index * 0.04,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
                    aria-pressed={snapshot.preference.appearance === value}
                    onClick={(event) => setAppearance(value, { animate: true, origin: transitionOrigin(triggerRef.current ?? event.currentTarget) })}
                  >
                    <ModeIcon className="size-4" />
                    <span className="flex-1">{label}</span>
                    {snapshot.preference.appearance === value ? <Check className="size-4" /> : null}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
