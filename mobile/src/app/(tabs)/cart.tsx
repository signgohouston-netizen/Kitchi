import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, radius, space } from '@/constants/brand';
import { money, useCart } from '@/context/CartContext';
import { Card, PrimaryButton, QtyStepper } from '@/components/ui-kit';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, setQty, remove, count } = useCart();

  if (count === 0) {
    return (
      <View style={[styles.empty, { paddingTop: insets.top }]}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySub}>Add some homemade dishes to get started.</Text>
        <PrimaryButton label="Browse food" icon="search" onPress={() => router.push('/browse')} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Brand.bgMuted }}>
      <ScrollView
        contentContainerStyle={{
          padding: space.lg,
          paddingTop: insets.top + space.md,
          paddingBottom: 220,
          gap: space.md,
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your cart</Text>
        {items.map((i) => (
          <Card key={i.id} style={styles.row}>
            <Text style={styles.emoji}>{i.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name} numberOfLines={1}>
                {i.name}
              </Text>
              <Text style={styles.vendor} numberOfLines={1}>
                {i.vendor}
              </Text>
              <Text style={styles.price}>{money(i.price)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: space.sm }}>
              <Pressable onPress={() => remove(i.id)} hitSlop={8}>
                <Ionicons name="trash-outline" size={18} color={Brand.textMuted} />
              </Pressable>
              <QtyStepper
                qty={i.qty}
                onDec={() => setQty(i.id, i.qty - 1)}
                onInc={() => setQty(i.id, i.qty + 1)}
              />
            </View>
          </Card>
        ))}
      </ScrollView>

      {/* Summary bar */}
      <View style={[styles.summary, { paddingBottom: insets.bottom + space.md }]}>
        <View style={styles.sumRow}>
          <Text style={styles.sumLabel}>Subtotal</Text>
          <Text style={styles.sumVal}>{money(subtotal)}</Text>
        </View>
        <View style={styles.sumRow}>
          <Text style={styles.sumLabel}>Delivery</Text>
          <Text style={styles.sumVal}>{money(deliveryFee)}</Text>
        </View>
        <View style={[styles.sumRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalVal}>{money(total)}</Text>
        </View>
        <PrimaryButton
          label={`Checkout · ${money(total)}`}
          icon="arrow-forward"
          onPress={() => router.push('/checkout')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: Brand.text, fontSize: 26, fontWeight: '900', marginBottom: space.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md },
  emoji: { fontSize: 32 },
  name: { color: Brand.text, fontSize: 15, fontWeight: '800' },
  vendor: { color: Brand.textMuted, fontSize: 12, marginTop: 1 },
  price: { color: Brand.primary, fontSize: 15, fontWeight: '800', marginTop: 4 },
  summary: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Brand.bg,
    borderTopWidth: 1,
    borderTopColor: Brand.border,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: space.lg,
    gap: 6,
  },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between' },
  sumLabel: { color: Brand.textMuted, fontSize: 14 },
  sumVal: { color: Brand.text, fontSize: 14, fontWeight: '700' },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Brand.border,
    paddingTop: space.sm,
    marginTop: 4,
    marginBottom: space.sm,
  },
  totalLabel: { color: Brand.text, fontSize: 17, fontWeight: '900' },
  totalVal: { color: Brand.primary, fontSize: 20, fontWeight: '900' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.md, padding: space.xl },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { color: Brand.text, fontSize: 22, fontWeight: '900' },
  emptySub: { color: Brand.textMuted, fontSize: 15, textAlign: 'center', marginBottom: space.sm },
});
