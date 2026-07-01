import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Brand, radius, shadow, space } from '@/constants/brand';

/** Filled brand button. */
export function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  loading,
  style,
}: {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'accent' | 'outline';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const isOutline = variant === 'outline';
  const bg = isOutline ? 'transparent' : variant === 'accent' ? Brand.accent : Brand.primary;
  const fg = isOutline ? Brand.primary : Brand.textInverse;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        isOutline && { borderWidth: 1.5, borderColor: Brand.primary },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.btnRow}>
          {icon && <Ionicons name={icon} size={18} color={fg} />}
          <Text style={[styles.btnText, { color: fg }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

/** Rounded card surface. */
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/** Small pill chip; `selected` fills it with brand color. */
export function Chip({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon?: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? { backgroundColor: Brand.primary, borderColor: Brand.primary } : null,
        pressed && { opacity: 0.8 },
      ]}>
      {icon ? <Text style={styles.chipIcon}>{icon}</Text> : null}
      <Text style={[styles.chipText, selected && { color: Brand.textInverse }]}>{label}</Text>
    </Pressable>
  );
}

/** +/- quantity stepper. */
export function QtyStepper({
  qty,
  onDec,
  onInc,
}: {
  qty: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <View style={styles.stepper}>
      <Pressable onPress={onDec} hitSlop={8} style={styles.stepBtn}>
        <Ionicons name="remove" size={18} color={Brand.primary} />
      </Pressable>
      <Text style={styles.stepQty}>{qty}</Text>
      <Pressable onPress={onInc} hitSlop={8} style={styles.stepBtn}>
        <Ionicons name="add" size={18} color={Brand.primary} />
      </Pressable>
    </View>
  );
}

/** Small star + rating + distance row. */
export function MetaRow({ vendor }: { vendor: { rating: string; distance: string; delivery: string } }) {
  return (
    <View style={styles.metaRow}>
      <Ionicons name="star" size={13} color={Brand.star} />
      <Text style={styles.metaText}>{vendor.rating}</Text>
      <Text style={styles.metaDot}>·</Text>
      <Text style={styles.metaText}>{vendor.distance.replace('📍 ', '')}</Text>
      <Text style={styles.metaDot}>·</Text>
      <Text style={styles.metaText}>{vendor.delivery.replace('🛵 ', '')}</Text>
    </View>
  );
}

export function RemoteImage({ uri, style }: { uri: string; style?: ViewStyle }) {
  return (
    <Image
      source={{ uri }}
      style={style as object}
      contentFit="cover"
      transition={200}
      placeholder={{ blurhash: 'L6Pj0^jE.AyE_3t7t7R**0o#DgR4' }}
    />
  );
}

export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {action}
    </View>
  );
}

const textStyle: TextStyle = { color: Brand.text };

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  btnText: { fontSize: 16, fontWeight: '700' },
  card: {
    backgroundColor: Brand.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: Brand.border,
    overflow: 'hidden',
    ...shadow.card,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: Brand.border,
    backgroundColor: Brand.bg,
  },
  chipIcon: { fontSize: 15 },
  chipText: { ...textStyle, fontSize: 14, fontWeight: '600' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: Brand.border,
    borderRadius: radius.pill,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Brand.primaryTint,
  },
  stepQty: { ...textStyle, fontSize: 16, fontWeight: '700', minWidth: 18, textAlign: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: Brand.textMuted, fontSize: 13, fontWeight: '600' },
  metaDot: { color: Brand.textMuted, fontSize: 13 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: space.md,
  },
  eyebrow: {
    color: Brand.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  sectionTitle: { ...textStyle, fontSize: 20, fontWeight: '800' },
});
