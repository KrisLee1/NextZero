"use client";

import { I18nProvider } from "@/components/language/i18n-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="theme-mode"
      enableSystem
    >
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
