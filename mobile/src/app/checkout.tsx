import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, radius, space } from '@/constants/brand';
import { money, useCart } from '@/context/CartContext';
import { PrimaryButton } from '@/components/ui-kit';

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, clear } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [placed, setPlaced] = useState(false);

  const canPlace = name.trim() && address.trim() && phone.trim() && items.length > 0;

  function placeOrder() {
    // Demo order flow — a later phase wires this to the backend + Stripe.
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <View style={[styles.done, { paddingTop: insets.top }]}>
        <View style={styles.check}>
          <Ionicons name="checkmark" size={44} color={Brand.textInverse} />
        </View>
        <Text style={styles.doneTitle}>Order placed! 🎉</Text>
        <Text style={styles.doneSub}>
          Thanks, {name.split(' ')[0] || 'friend'}. Your home cook is getting started. You'll get
          updates as your food is prepared and delivered.
        </Text>
        <PrimaryButton label="Back to home" icon="home" onPress={() => router.replace('/')} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Brand.bgMuted }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ padding: space.lg, paddingBottom: space.xxl, gap: space.lg }}>
        <View>
          <Text style={styles.section}>Delivery details</Text>
          <Field label="Full name" value={name} onChangeText={setName} placeholder="Jane Doe" />
          <Field
            label="Delivery address"
            value={address}
            onChangeText={setAddress}
            placeholder="123 Main St, Houston, TX"
          />
          <Field
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="(713) 555-0142"
            keyboardType="phone-pad"
          />
        </View>

        <View>
          <Text style={styles.section}>Order summary</Text>
          <View style={styles.summary}>
            {items.map((i) => (
              <View key={i.id} style={styles.sumItem}>
                <Text style={styles.sumItemName} numberOfLines={1}>
                  {i.emoji} {i.qty}× {i.name}
                </Text>
                <Text style={styles.sumItemPrice}>{money(i.price * i.qty)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <Row label="Subtotal" value={money(subtotal)} />
            <Row label="Delivery" value={money(deliveryFee)} />
            <Row label="Total" value={money(total)} bold />
          </View>
        </View>

        <PrimaryButton
          label={`Place order · ${money(total)}`}
          icon="lock-closed"
          disabled={!canPlace}
          onPress={placeOrder}
        />
        <Text style={styles.note}>
          Demo checkout — no payment is taken. Card, Apple Pay & Google Pay come in a later phase.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={{ marginTop: space.md }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={Brand.textMuted}
        style={styles.input}
      />
    </View>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.rowBold]}>{label}</Text>
      <Text style={[styles.rowVal, bold && styles.rowBold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { color: Brand.text, fontSize: 18, fontWeight: '900', marginBottom: 4 },
  label: { color: Brand.textMuted, fontSize: 13, fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 50,
    fontSize: 15,
    color: Brand.text,
  },
  summary: {
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
    borderRadius: radius.lg,
    padding: space.md,
    marginTop: space.sm,
  },
  sumItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  sumItemName: { color: Brand.text, fontSize: 14, flex: 1, marginRight: space.sm },
  sumItemPrice: { color: Brand.text, fontSize: 14, fontWeight: '700' },
  divider: { height: 1, backgroundColor: Brand.border, marginVertical: space.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  rowLabel: { color: Brand.textMuted, fontSize: 14 },
  rowVal: { color: Brand.text, fontSize: 14, fontWeight: '700' },
  rowBold: { color: Brand.text, fontSize: 17, fontWeight: '900' },
  note: { color: Brand.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18 },
  done: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.md, padding: space.xl },
  check: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneTitle: { color: Brand.text, fontSize: 24, fontWeight: '900' },
  doneSub: { color: Brand.textMuted, fontSize: 15, textAlign: 'center', lineHeight: 22 },
});
