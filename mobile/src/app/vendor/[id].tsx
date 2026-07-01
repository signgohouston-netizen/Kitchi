import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, radius, space } from '@/constants/brand';
import { getVendor } from '@/data/catalog';
import { money, useCart } from '@/context/CartContext';
import { MetaRow, PrimaryButton, RemoteImage } from '@/components/ui-kit';

export default function VendorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { add, count, total } = useCart();
  const vendor = getVendor(id);

  if (!vendor) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Kitchen not found.</Text>
        <PrimaryButton label="Go back" onPress={() => router.back()} variant="outline" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Brand.bgMuted }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        <View>
          <RemoteImage uri={vendor.img} style={styles.hero} />
          <Pressable
            onPress={() => router.back()}
            style={[styles.back, { top: insets.top + 4 }]}
            hitSlop={8}>
            <Ionicons name="chevron-back" size={24} color={Brand.text} />
          </Pressable>
        </View>

        <View style={styles.head}>
          <Text style={styles.tag}>{vendor.tag}</Text>
          <Text style={styles.name}>{vendor.name}</Text>
          <Text style={styles.cuisine}>
            {vendor.cuisine} · {vendor.reviews} reviews
          </Text>
          <View style={{ marginTop: 6 }}>
            <MetaRow vendor={vendor} />
          </View>
          <Text style={styles.min}>{vendor.min}</Text>
        </View>

        <View style={styles.menu}>
          <Text style={styles.menuTitle}>Menu</Text>
          {vendor.menu.map((dish) => (
            <View key={dish.id} style={styles.dish}>
              <Text style={styles.dishEmoji}>{dish.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishDesc} numberOfLines={2}>
                  {dish.desc}
                </Text>
                <View style={styles.dishTags}>
                  {dish.tags.map((t) => (
                    <Text key={t} style={styles.dishTag}>
                      {t}
                    </Text>
                  ))}
                </View>
                <Text style={styles.dishPrice}>{money(dish.price)}</Text>
              </View>
              <Pressable
                style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.85 }]}
                onPress={() =>
                  add({
                    id: `${vendor.id}:${dish.id}`,
                    name: dish.name,
                    price: dish.price,
                    emoji: dish.emoji,
                    vendor: vendor.name,
                  })
                }>
                <Ionicons name="add" size={22} color={Brand.textInverse} />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      {count > 0 && (
        <View style={[styles.bar, { paddingBottom: insets.bottom + space.md }]}>
          <PrimaryButton
            label={`View cart · ${count} item${count > 1 ? 's' : ''} · ${money(total)}`}
            icon="cart"
            onPress={() => router.push('/cart')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 240 },
  back: {
    position: 'absolute',
    left: space.md,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Brand.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    backgroundColor: Brand.bg,
    marginTop: -20,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: space.lg,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: Brand.primaryTint,
    color: Brand.primaryDark,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  name: { color: Brand.text, fontSize: 24, fontWeight: '900', marginTop: space.sm },
  cuisine: { color: Brand.textMuted, fontSize: 14, marginTop: 2 },
  min: { color: Brand.textMuted, fontSize: 13, marginTop: 6, fontWeight: '600' },
  menu: { padding: space.lg, gap: space.md },
  menuTitle: { color: Brand.text, fontSize: 20, fontWeight: '900', marginBottom: 4 },
  dish: {
    flexDirection: 'row',
    gap: space.md,
    backgroundColor: Brand.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Brand.border,
    padding: space.md,
    alignItems: 'flex-start',
  },
  dishEmoji: { fontSize: 30 },
  dishName: { color: Brand.text, fontSize: 16, fontWeight: '800' },
  dishDesc: { color: Brand.textMuted, fontSize: 13, marginTop: 2, lineHeight: 18 },
  dishTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  dishTag: {
    backgroundColor: Brand.bgMuted,
    color: Brand.textMuted,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  dishPrice: { color: Brand.primary, fontSize: 16, fontWeight: '900', marginTop: 8 },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Brand.bg,
    borderTopWidth: 1,
    borderTopColor: Brand.border,
    padding: space.lg,
  },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.md, padding: space.xl },
  missingText: { color: Brand.text, fontSize: 18, fontWeight: '800' },
});
