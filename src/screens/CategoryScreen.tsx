import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QuoteCard } from '../components/QuoteCard';
import { useApp } from '../context/AppContext';
import { categoryById } from '../data/categories';
import { quotesByCategory } from '../data/quotes';
import { fonts } from '../theme';
import type { ExploreStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ExploreStackParamList, 'Category'>;

export function CategoryScreen({ route }: Props) {
  const { colors } = useApp();
  const category = categoryById[route.params.categoryId];
  const quotes = quotesByCategory(route.params.categoryId);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.title, { color: colors.ink }]}>{category.label}</Text>
            <Text style={[styles.sub, { color: colors.muted }]}>{category.blurb}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <QuoteCard quote={item} compact />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 28,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  title: { fontFamily: fonts.serifBold, fontSize: 30 },
  sub: { fontFamily: fonts.sans, fontSize: 15, marginTop: 4 },
});
