import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ThemePreference } from './types';

const FAVORITES = 'quotely.favorites';
const THEME = 'quotely.theme';
const REMINDER = 'quotely.reminder';

export async function loadFavorites(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FAVORITES);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export async function saveFavorites(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES, JSON.stringify(ids));
}

export async function loadTheme(): Promise<ThemePreference> {
  const value = await AsyncStorage.getItem(THEME);
  if (value === 'light' || value === 'dark' || value === 'system') return value;
  return 'system';
}

export async function saveTheme(theme: ThemePreference): Promise<void> {
  await AsyncStorage.setItem(THEME, theme);
}

export async function loadReminderEnabled(): Promise<boolean> {
  const value = await AsyncStorage.getItem(REMINDER);
  return value === '1';
}

export async function saveReminderEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(REMINDER, enabled ? '1' : '0');
}
