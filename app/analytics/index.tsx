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
import { ProgressBar } from '../../components/ui/ProgressBar';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_CATEGORIES, MOCK_SUMMARY } from '../../constants/mockData';
import { ArrowLeft, TrendingUp, AlertTriangle } from 'lucide-react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function AnalyticsScreen() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState('Sep');

  const total = MOCK_CATEGORIES.reduce((s, c) => s + c.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft color={COLORS.text} size={22} strokeWidth={1.8} />
        </TouchableOpacity>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Spending Analytics
        </Typography>
        {/* Month Picker */}
        <TouchableOpacity style={styles.monthPicker} activeOpacity={0.7}>
          <Typography variant="secondary" color={COLORS.text} style={styles.monthText}>
            {selectedMonth} ▾
          </Typography>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Total Spending Hero */}
        <View style={styles.heroCard}>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.heroLabel}>
            Total Spending
          </Typography>
          <View style={styles.heroAmountRow}>
            <Typography variant="h1" color={COLORS.text} style={styles.heroAmount}>
              ₹{total.toLocaleString('en-IN')}
            </Typography>
            <View style={styles.trendBadge}>
              <TrendingUp color={COLORS.error} size={13} strokeWidth={2} />
              <Typography variant="caption" color={COLORS.error} style={styles.trendText}>
                +12% vs last month
              </Typography>
            </View>
          </View>
        </View>

        {/* Donut + Legend */}
        <View style={styles.chartCard}>
          <Typography variant="cardHeading" color={COLORS.text} style={styles.chartTitle}>
            Category Breakdown
          </Typography>
          <View style={styles.chartRow}>
            {/* Simple Donut visual */}
            <View style={styles.donutWrapper}>
              <View style={styles.donutOuter}>
                <View style={styles.donutInner}>
                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.donutLabel}>
                    Total
                  </Typography>
                  <Typography variant="financial" color={COLORS.text} style={styles.donutValue}>
                    ₹{(total / 1000).toFixed(0)}K
                  </Typography>
                </View>
              </View>
            </View>

            {/* Legend */}
            <View style={styles.legend}>
              {MOCK_CATEGORIES.map((cat) => (
                <View key={cat.name} style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
                  <Typography variant="secondary" color={COLORS.text} style={styles.legendName} numberOfLines={1}>
                    {cat.name}
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.legendPct}>
                    {cat.percent}%
                  </Typography>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Category Bars */}
        <View style={styles.sectionCard}>
          <Typography variant="cardHeading" color={COLORS.text} style={styles.sectionTitle}>
            Spending by Category
          </Typography>
          <View style={styles.categoryList}>
            {MOCK_CATEGORIES.map((cat) => (
              <View key={cat.name} style={styles.catItem}>
                <View style={styles.catHeader}>
                  <Typography variant="bodyMedium" style={styles.catName}>{cat.name}</Typography>
                  <Typography variant="financial" color={COLORS.text} style={styles.catAmount}>
                    ₹{cat.amount.toLocaleString('en-IN')}
                  </Typography>
                </View>
                <ProgressBar percent={cat.percent} color={cat.color} height={6} />
              </View>
            ))}
          </View>
        </View>

        {/* Spending Insight Alert */}
        <View style={styles.insightCard}>
          <AlertTriangle color={COLORS.warning} size={18} strokeWidth={2} />
          <View style={styles.insightText}>
            <Typography variant="bodyMedium" color={COLORS.text} style={styles.insightTitle}>
              Spending Insight
            </Typography>
            <Typography variant="secondary" color={COLORS.textSecondary} style={styles.insightBody}>
              Shopping spending is 32% higher than your normal average this month.
            </Typography>
          </View>
        </View>

        {/* Month selector */}
        <View style={styles.monthSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthScroll}>
            {MONTHS.map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.monthChip, selectedMonth === m && styles.monthChipActive]}
                onPress={() => setSelectedMonth(m)}
                activeOpacity={0.75}
              >
                <Typography
                  variant="caption"
                  color={selectedMonth === m ? COLORS.white : COLORS.textSecondary}
                  style={styles.monthChipText}
                >
                  {m}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.detailLink} activeOpacity={0.7}>
          <Typography variant="bodyMedium" color={COLORS.gold} style={styles.detailLinkText}>
            View Detailed Analysis →
          </Typography>
        </TouchableOpacity>

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
  monthPicker: {
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: SIZES.smallRadius, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
  },
  monthText: { fontFamily: FONTS.bodySemiBold, fontSize: 13 },
  scroll: { paddingHorizontal: SPACING.xl, gap: SPACING.xl },

  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.heroRadius,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  heroLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  heroAmountRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, flexWrap: 'wrap' },
  heroAmount: { color: COLORS.white, fontSize: 32, lineHeight: 40 },
  trendBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(220,38,38,0.15)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  trendText: { fontSize: 11, fontFamily: FONTS.bodySemiBold },

  chartCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border,
  },
  chartTitle: { marginBottom: SPACING.base },
  chartRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.base },
  donutWrapper: { alignItems: 'center', justifyContent: 'center' },
  donutOuter: {
    width: 110, height: 110, borderRadius: 55,
    borderWidth: 14,
    borderColor: COLORS.primary,
    borderTopColor: COLORS.gold,
    borderRightColor: COLORS.success,
    borderBottomColor: '#2563EB',
    justifyContent: 'center', alignItems: 'center',
  },
  donutInner: { alignItems: 'center' },
  donutLabel: { fontSize: 10 },
  donutValue: { fontSize: 13 },
  legend: { flex: 1, gap: SPACING.sm },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendName: { flex: 1, fontSize: 12 },
  legendPct: { fontSize: 11, fontFamily: FONTS.bodySemiBold },

  sectionCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border,
  },
  sectionTitle: { marginBottom: SPACING.base },
  categoryList: { gap: SPACING.base },
  catItem: { gap: SPACING.xs },
  catHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catName: { fontSize: 13 },
  catAmount: { fontSize: 13 },

  insightCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md,
    backgroundColor: '#FEF3C7', borderRadius: SIZES.cardRadius,
    padding: SPACING.base, borderWidth: 1, borderColor: '#FDE68A',
  },
  insightText: { flex: 1, gap: 3 },
  insightTitle: { fontSize: 14 },
  insightBody: { fontSize: 13, lineHeight: 19 },

  monthSelector: {},
  monthScroll: { gap: SPACING.sm },
  monthChip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: SIZES.smallRadius,
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
  },
  monthChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  monthChipText: { fontSize: 12, fontFamily: FONTS.bodySemiBold },

  detailLink: { alignSelf: 'center', paddingVertical: SPACING.sm },
  detailLinkText: { fontFamily: FONTS.bodySemiBold },
});
