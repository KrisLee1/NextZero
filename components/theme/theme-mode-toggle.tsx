"use client"

import { useEffect, useRef, type PointerEvent } from "react"
import { Monitor, MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { buttonVariants } from "../ui/button"
import { ThemeMode } from "@/types/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useThemeStore } from "@/store/theme-store"
import { getThemeStyles } from "@/lib/theme-presets"
import { applyThemeToElement } from "@/lib/apply-theme"
import { setThemeTransitionOrigin } from "@/lib/theme-transition"

interface ThemeModeToggleProps {
  variant?: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | null | undefined;
  align?: "end" | "center" | "start" | undefined;
  tooltipSide?: "left" | "top" | "right" | "bottom" | undefined;
  tooltip?: string;
  className?: string;
}

export function ThemeModeToggle({ variant, align, tooltipSide, tooltip, className }: ThemeModeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const modeToggleRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const themeName = useThemeStore(s => s.themeName);
  const _hasHydrated = useThemeStore(s => s._hasHydrated);
  const setThemeMode = useThemeStore(s => s.setThemeMode);
  const isTransitioning = useRef(false);
  const transitionOriginRef = useRef<{ clientX: number; clientY: number } | null>(null);
  
  const items = [
    { value: "system", icon: <Monitor />, label: t('theme-mode-toggle.auto') },
    { value: "light", icon: <Sun />, label: t('theme-mode-toggle.light') },
    { value: "dark", icon: <MoonStar />, label: t('theme-mode-toggle.dark') }
  ];

  useEffect(() => {
    if(!resolvedTheme) return;
    setThemeMode(resolvedTheme as ThemeMode);
    
    if(!_hasHydrated) return;

    const themeStyles = getThemeStyles(themeName);
    const applyTheme = () => applyThemeToElement(themeStyles, resolvedTheme as ThemeMode);

    if (document.startViewTransition) {
      if(isTransitioning.current) return;

      isTransitioning.current = true;
      document.startViewTransition(() => {
        applyTheme();
      }).finished.finally(() => {
        isTransitioning.current = false;
      });
    }else{
      applyTheme();
    }
  },[_hasHydrated, resolvedTheme, themeName]);

  function toggleMode(mode: string) {
    if(mode === theme) {
      return;
    }

    setThemeTransitionOrigin(transitionOriginRef.current, modeToggleRef.current);
    transitionOriginRef.current = null;

    setTheme(mode);
  }

  function captureTransitionOrigin(event: PointerEvent) {
    transitionOriginRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        ref={modeToggleRef}
        aria-label={tooltip || "Toggle theme"}
        title={tooltip}
        className={cn(buttonVariants({ variant, size: "icon", className }), "cursor-pointer")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuRadioGroup value={theme} onValueChange={toggleMode}>
          <AnimatePresence>
            <motion.div layout className="flex flex-col gap-1">
              {items.map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 260,
                      damping: 20 
                    } 
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  layout
                >
                  <DropdownMenuRadioItem
                    value={item.value}
                    onPointerDown={captureTransitionOrigin}
                  >
                    {item.icon}
                    {item.label}
                  </DropdownMenuRadioItem>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
