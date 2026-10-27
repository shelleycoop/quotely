export type CategoryId =
  | 'wisdom'
  | 'courage'
  | 'love'
  | 'work'
  | 'life'
  | 'stoic'
  | 'humor'
  | 'growth'
  | 'peace'
  | 'nature';

export type Quote = {
  id: string;
  text: string;
  author: string;
  category: CategoryId;
};

export type ThemePreference = 'light' | 'dark' | 'system';

export type Colors = {
  bg: string;
  bgElevated: string;
  card: string;
  ink: string;
  muted: string;
  faint: string;
  accent: string;
  accentSoft: string;
  onAccent: string;
  line: string;
  tabBar: string;
  overlay: string;
};
