import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { X, ChevronDown, Calendar } from 'lucide-react-native';

const CATEGORIES = [
  '🍽️ Food & Dining', '🛍️ Shopping', '🚗 Transport',
  '📺 Subscriptions', '⚡ Bills & Utilities', '🎬 Entertainment',
  '🛒 Groceries', '🏠 Housing', '💊 Health', '📚 Education', '✈️ Travel', '💰 Income',
];

const METHODS = ['UPI', 'Cash', 'Card', 'Bank'];

export default function AddTransactionScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('');
  const [method, setMethod] = useState('UPI');
  const [note, setNote] = useState('');

  const isIncome = tab === 'income';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} activeOpacity={0.7}>
            <X color={COLORS.text} size={22} strokeWidth={1.8} />
          </TouchableOpacity>
          <Typography variant="h3" color={COLORS.text} style={styles.headerTitle}>
            Add Transaction
          </Typography>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Expense / Income Toggle */}
          <View style={styles.tabRow}>
            {(['expense', 'income'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
                onPress={() => setTab(t)}
                activeOpacity={0.75}
              >
                <Typography
                  variant="bodyMedium"
                  color={tab === t ? COLORS.white : COLORS.textSecondary}
                  style={styles.tabText}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>

          {/* Amount */}
          <View style={styles.amountSection}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.amountLabel}>
              Amount
            </Typography>
            <View style={styles.amountRow}>
              <Typography variant="h1" color={isIncome ? COLORS.success : COLORS.text} style={styles.rupee}>
                ₹
              </Typography>
              <TextInput
                style={[styles.amountInput, { color: isIncome ? COLORS.success : COLORS.text }]}
                placeholder="0"
                placeholderTextColor={COLORS.border}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                autoFocus
              />
            </View>
            <View style={styles.amountUnderline} />
          </View>

          {/* Fields */}
          <View style={styles.formSection}>
            <FormRow
              label="Merchant / Description"
              placeholder="e.g. Zomato, ATM, Rent"
              value={merchant}
              onChangeText={setMerchant}
            />

            {/* Category */}
            <View style={styles.fieldWrapper}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.fieldLabel}>
                Category
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
                {CATEGORIES.slice(0, isIncome ? 1 : CATEGORIES.length - 1).map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.catChip, category === cat && styles.catChipActive]}
                    onPress={() => setCategory(cat)}
                    activeOpacity={0.75}
                  >
                    <Typography
                      variant="caption"
                      color={category === cat ? COLORS.white : COLORS.text}
                      style={styles.catText}
                    >
                      {cat}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Date */}
            <View style={styles.fieldWrapper}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.fieldLabel}>
                Date
              </Typography>
              <View style={styles.inputRow}>
                <Typography variant="body" color={COLORS.text} style={styles.dateText}>
                  13 Sep 2026
                </Typography>
                <Calendar color={COLORS.textSecondary} size={18} strokeWidth={1.8} />
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.fieldWrapper}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.fieldLabel}>
                Payment Method
              </Typography>
              <View style={styles.methodRow}>
                {METHODS.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.methodChip, method === m && styles.methodChipActive]}
                    onPress={() => setMethod(m)}
                    activeOpacity={0.75}
                  >
                    <Typography
                      variant="caption"
                      color={method === m ? COLORS.white : COLORS.text}
                      style={styles.methodText}
                    >
                      {m}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Note */}
            <FormRow
              label="Note (optional)"
              placeholder="Add a note..."
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveBtn, isIncome && styles.saveBtnIncome]}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Typography variant="bodyMedium" color={COLORS.white} style={styles.saveBtnText}>
              Save Transaction
            </Typography>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function FormRow({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
}) {
  return (
    <View style={styles.fieldWrapper}>
      <Typography variant="caption" color={COLORS.textSecondary} style={styles.fieldLabel}>
        {label}
      </Typography>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.fieldInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  closeBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 17 },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    gap: SPACING.xl,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: SIZES.radius - 3,
    alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14 },

  amountSection: { alignItems: 'center', gap: SPACING.sm },
  amountLabel: { fontSize: 11, letterSpacing: 0.3 },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rupee: { fontSize: 36, lineHeight: 44 },
  amountInput: {
    fontFamily: FONTS.bodyBold,
    fontSize: 52,
    lineHeight: 60,
    minWidth: 80,
  },
  amountUnderline: {
    width: '60%', height: 2,
    backgroundColor: COLORS.border,
    borderRadius: 1,
  },

  formSection: { gap: SPACING.xl },
  fieldWrapper: { gap: SPACING.sm },
  fieldLabel: { fontSize: 11, letterSpacing: 0.3, fontFamily: FONTS.bodySemiBold },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: SPACING.base, height: 50,
  },
  fieldInput: {
    flex: 1, fontFamily: FONTS.body, fontSize: 15, color: COLORS.text,
  },
  dateText: { fontSize: 15 },

  catRow: { gap: SPACING.sm },
  catChip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: SIZES.smallRadius,
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
  },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { fontSize: 12 },

  methodRow: { flexDirection: 'row', gap: SPACING.sm },
  methodChip: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: SIZES.smallRadius,
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center',
  },
  methodChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  methodText: { fontSize: 13 },

  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.base + 2,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  saveBtnIncome: { backgroundColor: COLORS.success },
  saveBtnText: { fontSize: 16, fontFamily: FONTS.bodySemiBold },
});
