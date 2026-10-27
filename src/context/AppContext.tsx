import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import type { Colors, Quote, ThemePreference } from '../types';
import { darkColors, lightColors } from '../theme';
import {
  loadFavorites,
  loadReminderEnabled,
  loadTheme,
  saveFavorites,
  saveReminderEnabled,
  saveTheme,
} from '../storage';
import { disableDailyReminder, enableDailyReminder } from '../notifications';
import { getQuoteById } from '../data/quotes';

type AppContextValue = {
  ready: boolean;
  colors: Colors;
  isDark: boolean;
  themePreference: ThemePreference;
  setThemePreference: (value: ThemePreference) => void;
  favoriteIds: string[];
  favoriteQuotes: Quote[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  reminderOn: boolean;
  setReminderOn: (value: boolean) => Promise<boolean>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [ready, setReady] = useState(false);
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [reminderOn, setReminderState] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [theme, favorites, reminder] = await Promise.all([
        loadTheme(),
        loadFavorites(),
        loadReminderEnabled(),
      ]);
      if (cancelled) return;
      setThemePreferenceState(theme);
      setFavoriteIds(favorites);
      setReminderState(reminder);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isDark =
    themePreference === 'dark' ||
    (themePreference === 'system' && (systemScheme ?? Appearance.getColorScheme()) === 'dark');
  const colors = isDark ? darkColors : lightColors;

  const favoriteQuotes = useMemo(
    () =>
      favoriteIds
        .map((id) => getQuoteById(id))
        .filter((q): q is Quote => Boolean(q)),
    [favoriteIds],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      colors,
      isDark,
      themePreference,
      setThemePreference: (next) => {
        setThemePreferenceState(next);
        void saveTheme(next);
      },
      favoriteIds,
      favoriteQuotes,
      isFavorite: (id) => favoriteIds.includes(id),
      toggleFavorite: (id) => {
        setFavoriteIds((current) => {
          const next = current.includes(id)
            ? current.filter((item) => item !== id)
            : [id, ...current];
          void saveFavorites(next);
          return next;
        });
      },
      reminderOn,
      setReminderOn: async (next) => {
        if (next) {
          const ok = await enableDailyReminder();
          if (!ok) return false;
          setReminderState(true);
          await saveReminderEnabled(true);
          return true;
        }
        await disableDailyReminder();
        setReminderState(false);
        await saveReminderEnabled(false);
        return true;
      },
    }),
    [ready, colors, isDark, themePreference, favoriteIds, favoriteQuotes, reminderOn],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
