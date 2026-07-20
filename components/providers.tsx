"use client";

import { OriaThemeProvider } from "@oriatheme/react";
import { oriaPresetThemes } from "@oriatheme/presets";
import { I18nProvider } from "@/components/language/i18n-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OriaThemeProvider
      config={{
        presets: oriaPresetThemes,
        defaultThemeId: "oria-default",
        transition: { type: "view-transition", duration: 480 },
      }}
    >
      <I18nProvider>{children}</I18nProvider>
    </OriaThemeProvider>
  );
}
