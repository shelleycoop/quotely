import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { QuoteCard } from '../components/QuoteCard';
import { useApp } from '../context/AppContext';
import { dailyQuote, randomQuote } from '../data/quotes';
import { fonts, radius } from '../theme';

export function TodayScreen() {
  const { colors } = useApp();
  const today = useMemo(() => dailyQuote(), []);
  const [shown, setShown] = useState(today);
  const isToday = shown.id === today.id;
  const now = new Date();
  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.kicker, { color: colors.accent }]}>Quotely</Text>
        <Text style={[styles.title, { color: colors.ink }]}>A quiet word for today</Text>
        <Text style={[styles.date, { color: colors.muted }]}>{dateLabel}</Text>
        <QuoteCard quote={shown} badge={isToday ? 'Today’s quote' : 'Another for you'} />
        <View style={styles.actions}>
          {!isToday ? (
            <Pressable
              onPress={() => setShown(today)}
              style={[styles.secondary, { borderColor: colors.line, backgroundColor: colors.card }]}
            >
              <Ionicons name="sunny-outline" size={18} color={colors.ink} />
              <Text style={[styles.secondaryText, { color: colors.ink }]}>Back to today</Text>
            </Pressable>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <Pressable
            onPress={() => setShown(randomQuote(shown.id))}
            style={[styles.primary, { backgroundColor: colors.accent }]}
          >
            <Ionicons name="shuffle-outline" size={18} color={colors.onAccent} />
            <Text style={[styles.primaryText, { color: colors.onAccent }]}>Discover another</Text>
          </Pressable>
        </View>
        <Text style={[styles.hint, { color: colors.faint }]}>
          {today.id === shown.id
            ? 'This one is yours until midnight. Save it, share it, or wander the shelves.'
            : 'Today’s quote is waiting if you want to return.'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  kicker: {
    fontFamily: fonts.sansSemi,
    letterSpacing: 2,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 34,
    marginTop: 6,
    lineHeight: 40,
  },
  date: {
    fontFamily: fonts.sans,
    fontSize: 15,
    marginTop: 6,
    marginBottom: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  primary: {
    flex: 1.2,
    height: 52,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryText: {
    fontFamily: fonts.sansSemi,
    fontSize: 15,
  },
  secondary: {
    flex: 1,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
  },
  hint: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 18,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
});
