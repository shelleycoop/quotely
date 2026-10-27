import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import type { Quote } from '../types';
import { fonts, radius } from '../theme';
import { categoryById } from '../data/categories';
import { useApp } from '../context/AppContext';
import { copyQuote, shareQuote } from '../share';

type Props = {
  quote: Quote;
  badge?: string;
  compact?: boolean;
};

export function QuoteCard({ quote, badge, compact }: Props) {
  const { colors, isFavorite, toggleFavorite } = useApp();
  const loved = isFavorite(quote.id);
  const category = categoryById[quote.category];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.line,
          padding: compact ? 18 : 24,
        },
      ]}
    >
      {badge ? (
        <Text style={[styles.badge, { color: colors.accent }]}>{badge}</Text>
      ) : null}
      <Text
        style={[
          styles.mark,
          { color: colors.accentSoft, fontSize: compact ? 42 : 64, marginTop: compact ? -8 : -16 },
        ]}
      >
        “
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: colors.ink,
            fontSize: compact ? 22 : 28,
            lineHeight: compact ? 30 : 38,
            marginTop: compact ? -18 : -28,
          },
        ]}
      >
        {quote.text}
      </Text>
      <Text style={[styles.author, { color: colors.muted }]}>— {quote.author}</Text>
      <View style={styles.row}>
        <View style={[styles.chip, { backgroundColor: colors.accentSoft }]}>
          <Text style={[styles.chipText, { color: colors.accent }]}>{category.label}</Text>
        </View>
        <View style={styles.actions}>
          <Icon
            name={loved ? 'heart' : 'heart-outline'}
            color={loved ? colors.accent : colors.muted}
            onPress={() => {
              void Haptics.selectionAsync();
              toggleFavorite(quote.id);
            }}
          />
          <Icon
            name="copy-outline"
            color={colors.muted}
            onPress={() => {
              void copyQuote(quote);
              void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }}
          />
          <Icon
            name="share-social-outline"
            color={colors.muted}
            onPress={() => {
              void shareQuote(quote);
            }}
          />
        </View>
      </View>
    </View>
  );
}

function Icon({
  name,
  color,
  onPress,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={styles.iconBtn}>
      <Ionicons name={name} size={22} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    shadowColor: '#1C1915',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  badge: {
    fontFamily: fonts.sansSemi,
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  mark: {
    fontFamily: fonts.serifBold,
    lineHeight: 72,
  },
  text: {
    fontFamily: fonts.serif,
  },
  author: {
    fontFamily: fonts.serifItalic,
    fontSize: 18,
    marginTop: 16,
  },
  row: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
