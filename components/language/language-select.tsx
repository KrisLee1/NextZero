'use client'

import { useTranslation } from 'react-i18next';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from 'react';
import { Check, Languages, SearchX } from 'lucide-react';
import { languageList } from '@/config/i18n.config';
import { AnimatePresence, motion } from "motion/react";

export function LanguageSelect({ 
  className,
  variant
}: { 
  className?: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollPositionRef = useRef<{ x: number; y: number } | null>(null);
  
  function changeLanguage(lang: string) {
    window.localStorage.setItem('i18nextLng', lang);
    void i18n.changeLanguage(lang);
  }

  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return languageList;
    return languageList.filter(lang => 
      lang.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
          "cursor-pointer select-none whitespace-nowrap",
        )}
      >
          <Languages className="size-4.5" />
          <span className="min-w-0 truncate">
            {languageList.find((lang) => lang.code === i18n.language)?.label}
          </span>
      </PopoverTrigger>
      <PopoverContent initialFocus={false} finalFocus={false} className="w-[180px] p-0">
        <Command>
          <CommandInput 
            className='truncate' 
            placeholder={t('language-select.search-lang')} 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>
              <motion.div
                className='flex flex-col items-center p-2 text-center'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <SearchX className='mb-2 stroke-muted-foreground' />
                {t('language-select.no-found')}
              </motion.div>
            </CommandEmpty>
            <CommandGroup>
              <motion.div
                layout
                className="flex flex-col"
              >
                <AnimatePresence>
                  {filteredLanguages.map((lang, index) => (
                    <motion.div
                      key={lang.code}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { 
                          delay: index * 0.04,
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
                      <CommandItem
                        className='justify-between gap-2 whitespace-nowrap'
                        value={lang.label}
                        onSelect={() => {
                          changeLanguage(lang.code);
                          setOpen(false);
                        }}
                      >
                        <span className="min-w-0 flex-1 truncate">{lang.label}</span>
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0",
                            lang.code === i18n.language ? "opacity-100" : "opacity-0"
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
