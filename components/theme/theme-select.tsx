"use client"

import { useMemo, useRef, useState, type PointerEvent } from "react";
import { getThemeStyles, themePresets } from "@/lib/theme-presets";
import { useTheme } from "next-themes"
import { ThemeMode } from "@/types/theme";
import { useThemeStore } from "@/store/theme-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { buttonVariants } from "../ui/button";
import { Check, SearchX, SwatchBook } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { setThemeTransitionOrigin } from "@/lib/theme-transition";

interface ColorBoxProps {
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color }) => (
  <div
    className="h-3 w-3 rounded-sm border border-muted"
    style={{ backgroundColor: color }}
  />
);

interface ThemeColorsProps {
  themeName: string;
  mode: ThemeMode;
}

const ThemeColors: React.FC<ThemeColorsProps> = ({ themeName, mode }) => {
  const styles = getThemeStyles(themeName)[mode];
  return (
    <div className="flex gap-0.5">
      <ColorBox color={styles.primary} />
      <ColorBox color={styles.accent} />
      <ColorBox color={styles.secondary} />
      <ColorBox color={styles.border} />
    </div>
  );
};

export function ThemeSelect({ 
  className,
  variant
}: { 
  className?: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { resolvedTheme } = useTheme();
  const themeSelectRef = useRef<HTMLButtonElement>(null);
  const transitionOriginRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const scrollPositionRef = useRef<{ x: number; y: number } | null>(null);
  const themeName = useThemeStore(s => s.themeName);
  const setThemeName = useThemeStore(s => s.setThemeName);
  const { t } = useTranslation();
  const themeNames = useMemo(() => {
    return Object.keys(themePresets).sort((a, b) => {
      return a.localeCompare(b);
    });
  }, []);

  // 过滤主题名称
  const filteredThemeNames = useMemo(() => {
    if (!searchQuery) return themeNames;
    return themeNames.filter(name => 
      themePresets[name].label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [themeNames, searchQuery]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setSearchQuery("");
      const scrollPosition = scrollPositionRef.current;

      if (scrollPosition) {
        requestAnimationFrame(() => {
          window.scrollTo(scrollPosition.x, scrollPosition.y);
          requestAnimationFrame(() => window.scrollTo(scrollPosition.x, scrollPosition.y));
        });
      }
    }
  }

  function captureScrollPosition() {
    scrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
  }

  function changeTheme(themeName: string) {
    setThemeTransitionOrigin(transitionOriginRef.current, themeSelectRef.current);
    transitionOriginRef.current = null;

    setThemeName(themeName);
  }

  function captureTransitionOrigin(event: PointerEvent) {
    transitionOriginRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        onMouseDown={(event) => event.preventDefault()}
        onPointerEnter={captureScrollPosition}
        onPointerDownCapture={captureScrollPosition}
        className={cn(
          buttonVariants({ variant, className }),
          "w-auto justify-between cursor-pointer select-none",
        )}
        ref={themeSelectRef}
      >
          <SwatchBook className="size-4.5" />
          {/* <ThemeColors themeName={themeName} mode={resolvedTheme as ThemeMode} /> */}
          {themeName
            ? themePresets[themeName].label
            : "Glass"}
      </PopoverTrigger>
      <PopoverContent initialFocus={false} finalFocus={false} className="w-auto p-0">
        <Command>
          <CommandInput 
            placeholder={t('theme-select.search-theme')} 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>
              <motion.div
                className='flex flex-col items-center text-center'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <SearchX className="mb-2 stroke-muted-foreground" />
                {t('theme-select.no-found')}
              </motion.div>
            </CommandEmpty>
            <CommandGroup>
              <motion.div
                layout
                className="flex flex-col"
              >
                <AnimatePresence>
                  {filteredThemeNames.map((_themeName, index) => (
                    <motion.div
                      key={_themeName}
                      initial={{ opacity: 0, x: -50, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: 1,
                        transition: { 
                          delay: index * 0.03,
                          type: "spring",
                          stiffness: 260,
                          damping: 20 
                        } 
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        x: -50,
                        transition: { duration: 0.2 }
                      }}
                      layout
                    >
                      <CommandItem
                        className="justify-between text-center"
                        value={themePresets[_themeName].label}
                        onPointerDown={captureTransitionOrigin}
                        onSelect={() => {
                          changeTheme(_themeName);
                          setOpen(false);
                        }}
                      >
                        <ThemeColors themeName={_themeName} mode={resolvedTheme as ThemeMode} />
                        {themePresets[_themeName].label}
                        <Check
                          className={cn(
                            "ml-2 h-4 w-4",
                            themeName === _themeName ? "opacity-100" : "opacity-0"
                          )}
                        />
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
