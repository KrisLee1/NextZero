import { ThemeMode } from "@/types/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  themeName: string;
  themeMode: ThemeMode;
  setThemeName: (newThemeName: string) => void;
  setThemeMode: (newThemeMode: ThemeMode) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeName: "default",
      themeMode: "light",
      setThemeName: (newThemeName: string) => set({ themeName: newThemeName }),
      setThemeMode: (newMode: ThemeMode) => set({ themeMode: newMode }),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if(state) {
          state.setHasHydrated(true);
        }
      }
    }
  )
);