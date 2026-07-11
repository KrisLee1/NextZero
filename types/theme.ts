import { z } from "zod";

export const themeBaseStylePropsSchema = z.object({
  "logo-background": z.string(),
  "logo": z.string(),
  
  "content": z.string(),
  "background": z.string(),
  "foreground": z.string(),
  "card": z.string(),
  "card-foreground": z.string(),
  "popover": z.string(),
  "popover-foreground": z.string(),
  "primary": z.string(),
  "primary-foreground": z.string(),
  "secondary": z.string(),
  "secondary-foreground": z.string(),
  "muted": z.string(),
  "muted-foreground": z.string(),
  "accent": z.string(),
  "accent-foreground": z.string(),
  "destructive": z.string(),
  "destructive-foreground": z.string(),

  "border": z.string(),
  "input": z.string(),
  "ring": z.string(),
  "separator": z.string(),

  "chart-1": z.string(),
  "chart-2": z.string(),
  "chart-3": z.string(),
  "chart-4": z.string(),
  "chart-5": z.string(),

  "sidebar": z.string(),
  "sidebar-foreground": z.string(),
  "sidebar-primary": z.string(),
  "sidebar-primary-foreground": z.string(),
  "sidebar-accent": z.string(),
  "sidebar-accent-foreground": z.string(),
  "sidebar-border": z.string(),
  "sidebar-ring": z.string(),

  "shadow-highlight": z.string(),
  "shadow-2xs": z.string(),
  "shadow-xs": z.string(),
  "shadow-sm": z.string(),
  "shadow": z.string(),
  "shadow-md": z.string(),
  "shadow-lg": z.string(),
  "shadow-xl": z.string(),
  "shadow-2xl": z.string(),
});

export const themeSharedStylePropsSchema = z.object({
  "font-sans": z.string(),
  "font-serif": z.string(),
  "font-mono": z.string(),

  "radius": z.string(),
  "spacing": z.string(),
  "tracking-normal": z.string(),
});

export const themeStylesSchema = z.object({
  light: themeBaseStylePropsSchema.merge(themeSharedStylePropsSchema),
  dark: themeBaseStylePropsSchema,
});

export type ThemeBaseStyleProps = z.infer<typeof themeBaseStylePropsSchema>;
export type ThemeSharedStyleProps = z.infer<typeof themeSharedStylePropsSchema>;
export type ThemeStyles = z.infer<typeof themeStylesSchema>;

export type ThemePreset = {
  label: string;
  styles: {
    light: Partial<ThemeStyles['light']>;
    dark: Partial<ThemeStyles['dark']>;
  };
};

export type ThemeMode = "dark" | "light";
