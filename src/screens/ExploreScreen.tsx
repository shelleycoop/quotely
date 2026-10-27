import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CATEGORIES, type Category } from '../data/categories';
import { QUOTES, searchQuotes } from '../data/quotes';
import { QuoteCard } from '../components/QuoteCard';
import { useApp } from '../context/AppContext';
import { fonts, radius } from '../theme';
import type { Quote } from '../types';
import type { ExploreStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ExploreStackParamList, 'ExploreHome'>;
type Row = Quote | Category;

function isQuote(item: Row): item is Quote {
  return 'text' in item;
}

export function ExploreScreen({ navigation }: Props) {
  const { colors } = useApp();
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchQuotes(query), [query]);
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const quote of QUOTES) {
      map[quote.category] = (map[quote.category] ?? 0) + 1;
    }
    return map;
  }, []);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={['top']}>
      <FlatList
        data={(query.trim() ? results : CATEGORIES) as Row[]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <Text style={[styles.title, { color: colors.ink }]}>Explore</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              {QUOTES.length} lines, ten rooms. Search an author or a feeling.
            </Text>
            <View
              style={[
                styles.search,
                { backgroundColor: colors.card, borderColor: colors.line },
              ]}
            >
              <Ionicons name="search" size={18} color={colors.faint} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search quotes or authors"
                placeholderTextColor={colors.faint}
                style={[styles.input, { color: colors.ink }]}
                autoCorrect={false}
              />
              {query.length > 0 ? (
                <Pressable onPress={() => setQuery('')}>
                  <Ionicons name="close-circle" size={18} color={colors.faint} />
                </Pressable>
              ) : null}
            </View>
            {query.trim() ? (
              <Text style={[styles.count, { color: colors.muted }]}>
                {results.length} match{results.length === 1 ? '' : 'es'}
              </Text>
            ) : (
              <Text style={[styles.count, { color: colors.muted }]}>Rooms</Text>
            )}
          </View>
        }
        renderItem={({ item }) => {
          if (isQuote(item)) {
            return (
              <View style={{ marginBottom: 12 }}>
                <QuoteCard quote={item} compact />
              </View>
            );
          }
          return (
            <Pressable
              onPress={() => navigation.navigate('Category', { categoryId: item.id })}
              style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.line }]}
            >
              <View style={[styles.dot, { backgroundColor: item.tint }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.tileTitle, { color: colors.ink }]}>{item.label}</Text>
                <Text style={[styles.tileBlurb, { color: colors.muted }]}>{item.blurb}</Text>
              </View>
              <Text style={[styles.tileCount, { color: colors.faint }]}>
                {counts[item.id] ?? 0}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.faint} />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          query.trim() ? (
            <Text style={[styles.empty, { color: colors.muted }]}>
              Nothing by that name. Try “Seneca” or “courage”.
            </Text>
          ) : undefined
        }
      />
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
  title: { fontFamily: fonts.serifBold, fontSize: 34 },
  sub: { fontFamily: fonts.sans, fontSize: 15, marginTop: 6, marginBottom: 16, lineHeight: 22 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 50,
  },
  input: { flex: 1, fontFamily: fonts.sans, fontSize: 16 },
  count: {
    fontFamily: fonts.sansSemi,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 22,
    marginBottom: 10,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  tileTitle: { fontFamily: fonts.sansSemi, fontSize: 16 },
  tileBlurb: { fontFamily: fonts.sans, fontSize: 13, marginTop: 2 },
  tileCount: { fontFamily: fonts.sansMedium, fontSize: 13 },
  empty: { fontFamily: fonts.sans, fontSize: 15, marginTop: 12, lineHeight: 22 },
});
