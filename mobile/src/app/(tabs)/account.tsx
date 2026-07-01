import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, radius, space } from '@/constants/brand';
import { Card } from '@/components/ui-kit';

type Row = { icon: keyof typeof Ionicons.glyphMap; label: string; sub?: string };

const sections: { title: string; rows: Row[] }[] = [
  {
    title: 'Food Lover',
    rows: [
      { icon: 'star-outline', label: 'Premium membership', sub: '$2.99/mo — free delivery & perks' },
      { icon: 'calendar-outline', label: 'My meal plans' },
      { icon: 'receipt-outline', label: 'Order history' },
      { icon: 'heart-outline', label: 'Saved kitchens' },
    ],
  },
  {
    title: 'Cook & Sell',
    rows: [
      { icon: 'restaurant-outline', label: 'Become a vendor', sub: 'Start free — first 50 vendors free' },
      { icon: 'car-outline', label: 'Deliver with KitchiKitchi' },
    ],
  },
  {
    title: 'Support',
    rows: [
      { icon: 'help-circle-outline', label: 'Help & FAQ' },
      { icon: 'information-circle-outline', label: 'About KitchiKitchi' },
      { icon: 'shield-checkmark-outline', label: 'Privacy & terms' },
    ],
  },
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: Brand.bgMuted }}
      contentContainerStyle={{ paddingBottom: space.xxl }}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: insets.top + space.lg }]}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={30} color={Brand.primary} />
        </View>
        <View>
          <Text style={styles.name}>Welcome, food lover</Text>
          <Text style={styles.email}>Sign in to sync your orders</Text>
        </View>
      </View>

      {sections.map((s) => (
        <View key={s.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{s.title}</Text>
          <Card>
            {s.rows.map((r, idx) => (
              <View
                key={r.label}
                style={[styles.row, idx < s.rows.length - 1 && styles.rowBorderBottom]}>
                <View style={styles.rowIcon}>
                  <Ionicons name={r.icon} size={20} color={Brand.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>{r.label}</Text>
                  {r.sub && <Text style={styles.rowSub}>{r.sub}</Text>}
                </View>
                <Ionicons name="chevron-forward" size={18} color={Brand.textMuted} />
              </View>
            ))}
          </Card>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.disclaimer}>
          Medical-diet meals are prepared to your stated preferences. KitchiKitchi does not provide
          medical advice — consult a healthcare professional before changing your diet.
        </Text>
        <Text style={styles.version}>KitchiKitchi · v1.0 · {Brand.city}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Brand.primary,
    paddingHorizontal: space.lg,
    paddingBottom: space.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Brand.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { color: Brand.textInverse, fontSize: 20, fontWeight: '900' },
  email: { color: '#dcfce7', fontSize: 13, marginTop: 2 },
  section: { paddingHorizontal: space.lg, marginTop: space.lg },
  sectionTitle: {
    color: Brand.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: space.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md },
  rowBorderBottom: { borderBottomWidth: 1, borderBottomColor: Brand.border },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Brand.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { color: Brand.text, fontSize: 15, fontWeight: '700' },
  rowSub: { color: Brand.textMuted, fontSize: 12, marginTop: 1 },
  disclaimer: {
    color: Brand.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: space.sm,
  },
  version: { color: Brand.textMuted, fontSize: 12, textAlign: 'center', marginTop: space.lg },
});
