import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, radius, space } from '@/constants/brand';
import type { Vendor } from '@/data/catalog';
import { Card, MetaRow, RemoteImage } from '@/components/ui-kit';

export function VendorCard({ vendor, wide }: { vendor: Vendor; wide?: boolean }) {
  return (
    <Link href={`/vendor/${vendor.id}`} asChild>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, wide && { width: '100%' }]}>
        <Card style={wide ? undefined : styles.card}>
          <RemoteImage uri={vendor.img} style={styles.img} />
          <View style={styles.body}>
            <View style={styles.tagRow}>
              <Text style={styles.tag}>{vendor.tag}</Text>
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {vendor.name}
            </Text>
            <Text style={styles.cuisine} numberOfLines={1}>
              {vendor.cuisine} · {vendor.reviews} reviews
            </Text>
            <MetaRow vendor={vendor} />
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { width: 260 },
  img: { width: '100%', height: 140 },
  body: { padding: space.md, gap: 4 },
  tagRow: { flexDirection: 'row' },
  tag: {
    backgroundColor: Brand.primaryTint,
    color: Brand.primaryDark,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  name: { color: Brand.text, fontSize: 16, fontWeight: '800', marginTop: 2 },
  cuisine: { color: Brand.textMuted, fontSize: 13 },
});
