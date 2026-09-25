import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_RECURRING, MOCK_TOTAL_RECURRING } from '../../constants/mockData';
import { ArrowLeft, Plus } from 'lucide-react-native';

export default function RecurringScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'active' | 'calendar'>('active');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft color={COLORS.text} size={22} strokeWidth={1.8} />
        </TouchableOpacity>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Recurring Payments
        </Typography>
      </View>

      {/* Tab Toggle */}
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {(['active', 'calendar'] as const).map((t) => (
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
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.summaryLabel}>
            Total Monthly Commitments
          </Typography>
          <Typography variant="h1" color={COLORS.text} style={styles.summaryAmount}>
            ₹{MOCK_TOTAL_RECURRING.toLocaleString('en-IN')}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary}>
            {MOCK_RECURRING.length} active recurring payments
          </Typography>
        </View>

        {/* Recurring Items */}
        <View style={styles.itemsCard}>
          {MOCK_RECURRING.map((item, idx) => (
            <View key={item.id}>
              <View style={styles.recurringRow}>
                <View style={[styles.emojiWrapper, { backgroundColor: item.color + '15' }]}>
                  <Typography variant="body" style={styles.emoji}>{item.icon}</Typography>
                </View>
                <View style={styles.itemInfo}>
                  <Typography variant="bodyMedium" style={styles.itemName}>{item.name}</Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>{item.frequency}</Typography>
                </View>
                <Typography variant="financial" color={COLORS.text} style={styles.itemAmount}>
                  ₹{item.amount.toLocaleString('en-IN')}
                </Typography>
              </View>
              {idx < MOCK_RECURRING.length - 1 && <View style={styles.rowDivider} />}
            </View>
          ))}
        </View>

        {/* Add Recurring */}
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.75}>
          <Plus color={COLORS.text} size={18} strokeWidth={2} />
          <Typography variant="bodyMedium" color={COLORS.text}>
            Add Recurring Payment
          </Typography>
        </TouchableOpacity>

        {/* Tip */}
        <View style={styles.tipCard}>
          <Typography variant="caption" style={styles.tipIcon}>💡</Typography>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.tipText}>
            2 of your subscriptions (Netflix + Spotify) could be reviewed. Saving potential: ₹948/month.
          </Typography>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.md,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { flex: 1, fontSize: 22, lineHeight: 30 },
  tabContainer: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.base },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: 3,
  },
  tabBtn: {
    flex: 1, paddingVertical: SPACING.sm + 1,
    borderRadius: SIZES.radius - 3, alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14 },
  scroll: { paddingHorizontal: SPACING.xl, gap: SPACING.xl },
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.heroRadius,
    padding: SPACING.lg,
    gap: SPACING.xs,
  },
  summaryLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  summaryAmount: { color: COLORS.white, fontSize: 34, lineHeight: 42 },
  itemsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1, borderColor: COLORS.border,
    overflow: 'hidden',
  },
  recurringRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  emojiWrapper: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  emoji: { fontSize: 20 },
  itemInfo: { flex: 1, gap: 2 },
  itemName: { fontSize: 14 },
  itemAmount: { fontSize: 15 },
  rowDivider: { height: 1, backgroundColor: COLORS.border, marginLeft: SPACING.base + 44 + SPACING.md },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    borderWidth: 1.5, borderColor: COLORS.border,
    paddingVertical: SPACING.base,
  },
  tipCard: {
    flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-start',
    backgroundColor: '#FFFBEB', borderRadius: SIZES.smallRadius,
    padding: SPACING.md, borderWidth: 1, borderColor: '#FDE68A',
  },
  tipIcon: { fontSize: 16 },
  tipText: { flex: 1, fontSize: 13, lineHeight: 19 },
});
