import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, radius, space } from '@/constants/brand';
import { categories, vendors } from '@/data/catalog';
import { Chip } from '@/components/ui-kit';
import { VendorCard } from '@/components/VendorCard';

export default function BrowseScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ cat?: string }>();
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string | null>(params.cat ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((v) => {
      const matchesCat = !activeCat || v.categories.includes(activeCat);
      const matchesQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.cuisine.toLowerCase().includes(q) ||
        v.menu.some((m) => m.name.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat]);

  return (
    <View style={{ flex: 1, backgroundColor: Brand.bgMuted, paddingTop: insets.top + space.sm }}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse food</Text>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={Brand.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search kitchens or dishes"
            placeholderTextColor={Brand.textMuted}
            style={styles.input}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color={Brand.textMuted}
              onPress={() => setQuery('')}
            />
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catStrip}
        contentContainerStyle={{ paddingHorizontal: space.lg, gap: space.sm, alignItems: 'center' }}>
        <Chip label="All" selected={!activeCat} onPress={() => setActiveCat(null)} />
        {categories.map((c) => (
          <Chip
            key={c.id}
            label={c.name}
            icon={c.icon}
            selected={activeCat === c.id}
            onPress={() => setActiveCat(activeCat === c.id ? null : c.id)}
          />
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{ padding: space.lg, gap: space.md, paddingBottom: space.xxl }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.count}>
          {filtered.length} {filtered.length === 1 ? 'kitchen' : 'kitchens'}
          {activeCat ? ` · ${categories.find((c) => c.id === activeCat)?.name}` : ''}
        </Text>
        {filtered.map((v) => (
          <VendorCard key={v.id} vendor={v} wide />
        ))}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyText}>No kitchens match yet.</Text>
            <Text style={styles.emptySub}>Try another category or search term.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: space.lg, paddingBottom: space.sm },
  title: { color: Brand.text, fontSize: 26, fontWeight: '900', marginBottom: space.md },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    backgroundColor: Brand.card,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: Brand.border,
    paddingHorizontal: 16,
    height: 48,
  },
  input: { flex: 1, color: Brand.text, fontSize: 15 },
  catStrip: { maxHeight: 52, marginVertical: space.sm },
  count: { color: Brand.textMuted, fontSize: 13, fontWeight: '700' },
  empty: { alignItems: 'center', paddingVertical: space.xxl, gap: 6 },
  emptyEmoji: { fontSize: 40 },
  emptyText: { color: Brand.text, fontSize: 16, fontWeight: '800' },
  emptySub: { color: Brand.textMuted, fontSize: 14 },
});
