import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, radius, space } from '@/constants/brand';
import { categories, plans, vendors } from '@/data/catalog';
import { Card, SectionHeader } from '@/components/ui-kit';
import { VendorCard } from '@/components/VendorCard';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={{ backgroundColor: Brand.bgMuted }}
      contentContainerStyle={{ paddingBottom: space.xxl }}
      showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={[styles.hero, { paddingTop: insets.top + space.lg }]}>
        <Text style={styles.brand}>
          Kitchi<Text style={{ color: Brand.accent }}>Kitchi</Text>
        </Text>
        <Text style={styles.location}>
          <Ionicons name="location-sharp" size={13} color={Brand.textInverse} /> {Brand.city}
        </Text>
        <Text style={styles.heroTitle}>Homemade food, made with love — just for you</Text>
        <Text style={styles.heroSub}>{Brand.tagline}</Text>

        <Pressable style={styles.search} onPress={() => router.push('/browse')}>
          <Ionicons name="search" size={18} color={Brand.textMuted} />
          <Text style={styles.searchText}>Search halal, keto, biryani…</Text>
        </Pressable>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <SectionHeader eyebrow="BROWSE BY NEED" title="Find food that fits your life" />
        <View style={styles.catGrid}>
          {categories.map((c) => (
            <Link key={c.id} href={`/browse?cat=${c.id}`} asChild>
              <Pressable style={({ pressed }) => [styles.cat, pressed && { opacity: 0.85 }]}>
                <Text style={styles.catIcon}>{c.icon}</Text>
                <Text style={styles.catName} numberOfLines={2}>
                  {c.name}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* Featured vendors */}
      <View style={styles.section}>
        <SectionHeader
          eyebrow="NEAR YOU"
          title="Featured kitchens"
          action={
            <Link href="/browse" style={styles.link}>
              See all
            </Link>
          }
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: space.lg, gap: space.md }}>
        {vendors.map((v) => (
          <VendorCard key={v.id} vendor={v} />
        ))}
      </ScrollView>

      {/* Plans teaser */}
      <View style={[styles.section, { marginTop: space.xl }]}>
        <SectionHeader eyebrow="SUBSCRIPTIONS" title="Meal plans" />
        <View style={{ gap: space.md }}>
          {plans.map((p) => (
            <Card
              key={p.name}
              style={[styles.plan, p.featured && { borderColor: Brand.primary, borderWidth: 2 }]}>
              <Text style={styles.planEmoji}>{p.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.planName}>{p.name}</Text>
                <Text style={styles.planDesc} numberOfLines={2}>
                  {p.desc}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.planPrice}>{p.price}</Text>
                <Text style={styles.planPer}>{p.per}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      {/* Become a cook */}
      <View style={styles.section}>
        <Card style={styles.cook}>
          <Text style={styles.cookTitle}>👩‍🍳 Cook with KitchiKitchi</Text>
          <Text style={styles.cookText}>
            Turn your kitchen into a business. Reach food lovers near you and earn on your schedule.
          </Text>
          <Link href="/account" style={styles.cookLink}>
            Become a vendor →
          </Link>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: Brand.primary,
    paddingHorizontal: space.lg,
    paddingBottom: space.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  brand: { color: Brand.textInverse, fontSize: 26, fontWeight: '900' },
  location: { color: '#dcfce7', fontSize: 13, fontWeight: '600', marginTop: 2 },
  heroTitle: {
    color: Brand.textInverse,
    fontSize: 24,
    fontWeight: '900',
    marginTop: space.md,
    lineHeight: 30,
  },
  heroSub: { color: '#eafff1', fontSize: 14, marginTop: 6 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    backgroundColor: Brand.bg,
    borderRadius: radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: space.lg,
  },
  searchText: { color: Brand.textMuted, fontSize: 15 },
  section: { paddingHorizontal: space.lg, marginTop: space.xl },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  cat: {
    width: '31%',
    backgroundColor: Brand.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: Brand.border,
    paddingVertical: space.md,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 6,
    minHeight: 92,
    justifyContent: 'center',
  },
  catIcon: { fontSize: 26 },
  catName: { color: Brand.text, fontSize: 12, fontWeight: '700', textAlign: 'center' },
  link: { color: Brand.primary, fontWeight: '700', fontSize: 14 },
  plan: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md },
  planEmoji: { fontSize: 30 },
  planName: { color: Brand.text, fontSize: 16, fontWeight: '800' },
  planDesc: { color: Brand.textMuted, fontSize: 13, marginTop: 2 },
  planPrice: { color: Brand.primary, fontSize: 20, fontWeight: '900' },
  planPer: { color: Brand.textMuted, fontSize: 12 },
  cook: { padding: space.lg, backgroundColor: Brand.accentTint, borderColor: Brand.accentTint },
  cookTitle: { color: '#9a3412', fontSize: 18, fontWeight: '900' },
  cookText: { color: '#7c2d12', fontSize: 14, marginTop: 6, lineHeight: 20 },
  cookLink: { color: Brand.accent, fontWeight: '800', fontSize: 15, marginTop: space.md },
});
