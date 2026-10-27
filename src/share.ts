import * as Clipboard from 'expo-clipboard';
import { Share } from 'react-native';
import type { Quote } from './types';

export function formatQuote(quote: Quote): string {
  return `"${quote.text}"\n— ${quote.author}`;
}

export async function copyQuote(quote: Quote): Promise<void> {
  await Clipboard.setStringAsync(formatQuote(quote));
}

export async function shareQuote(quote: Quote): Promise<void> {
  await Share.share({
    message: `${formatQuote(quote)}\n\n— via Quotely`,
    title: 'Share a quote',
  });
}
