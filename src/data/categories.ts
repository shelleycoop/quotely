import type { CategoryId } from '../types';

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
  tint: string;
};

export const CATEGORIES: Category[] = [
  { id: 'wisdom', label: 'Wisdom', blurb: 'Clear thinking, long view', tint: '#C45C26' },
  { id: 'stoic', label: 'Stoic', blurb: 'Calm under pressure', tint: '#3D5A45' },
  { id: 'courage', label: 'Courage', blurb: 'Start, stay, begin again', tint: '#8B3A2A' },
  { id: 'growth', label: 'Growth', blurb: 'Become, not arrive', tint: '#B0892C' },
  { id: 'love', label: 'Love', blurb: 'People, tenderness, home', tint: '#A64B63' },
  { id: 'work', label: 'Work', blurb: 'Craft, focus, making', tint: '#3E5A7A' },
  { id: 'life', label: 'Life', blurb: 'Ordinary days, well lived', tint: '#6B5344' },
  { id: 'peace', label: 'Peace', blurb: 'Quiet mind, slower pulse', tint: '#4F6F6A' },
  { id: 'nature', label: 'Nature', blurb: 'Weather, woods, wonder', tint: '#2F6A4A' },
  { id: 'humor', label: 'Humor', blurb: 'Wit with a little bite', tint: '#B86A2B' },
];

export const categoryById = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;
