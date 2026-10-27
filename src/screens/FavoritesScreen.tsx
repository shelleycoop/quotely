import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuoteCard } from '../components/QuoteCard';
import { useApp } from '../context/AppContext';
import { fonts } from '../theme';

export function FavoritesScreen() {
  const { colors, favoriteQuotes } = useApp();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={['top']}>
      <FlatList
        data={favoriteQuotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.title, { color: colors.ink }]}>Kept</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>
              Quotes you want to return to. Stored only on this device.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <QuoteCard quote={item} compact />
          </View>
        )}
        ListEmptyComponent={
          <View style={[styles.empty, { borderColor: colors.line, backgroundColor: colors.card }]}>
            <Text style={[styles.emptyTitle, { color: colors.ink }]}>Nothing kept yet</Text>
            <Text style={[styles.emptyBody, { color: colors.muted }]}>
              Tap the heart on a quote you want to keep. It will wait here, offline, whenever you
              need it.
            </Text>
          </View>
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
    flexGrow: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  title: { fontFamily: fonts.serifBold, fontSize: 34 },
  sub: { fontFamily: fonts.sans, fontSize: 15, marginTop: 6, lineHeight: 22 },
  empty: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 24,
    padding: 22,
  },
  emptyTitle: { fontFamily: fonts.serifBold, fontSize: 22 },
  emptyBody: { fontFamily: fonts.sans, fontSize: 15, marginTop: 8, lineHeight: 22 },
});
