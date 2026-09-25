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
import { SparklineChart } from '../../components/ui/SparklineChart';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import {
  MOCK_CASHFLOW_POINTS,
  MOCK_FORECAST_POINTS,
  MOCK_PROJECTED_BALANCE,
  MOCK_CASHFLOW_PRESSURE_DATE,
} from '../../constants/mockData';
import { ArrowLeft, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react-native';

export default function CashflowScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'overview' | 'calendar'>('overview');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft color={COLORS.text} size={22} strokeWidth={1.8} />
        </TouchableOpacity>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Cash Flow & Forecast
        </Typography>
      </View>

      {/* Tab */}
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {(['overview', 'calendar'] as const).map((t) => (
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
        {/* Projected Balance Hero */}
        <View style={styles.heroCard}>
          <Typography variant="caption" style={styles.heroLabel}>
            Projected Balance (Next 30 days)
          </Typography>
          <Typography variant="h1" color={COLORS.white} style={styles.heroAmount}>
            ₹{MOCK_PROJECTED_BALANCE.toLocaleString('en-IN')}
          </Typography>
          <Typography variant="caption" style={styles.heroDate}>
            on 30 Sep 2026
          </Typography>

          {/* Pressure Warning */}
          <View style={styles.warningBanner}>
            <AlertTriangle color={COLORS.warning} size={15} strokeWidth={2} />
            <Typography variant="caption" color={COLORS.warning} style={styles.warningText}>
              Cash-flow pressure predicted around {MOCK_CASHFLOW_PRESSURE_DATE}.
            </Typography>
          </View>
        </View>

        {/* Trend Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Typography variant="cardHeading" color={COLORS.text}>Balance Trend</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>Last 6 months</Typography>
          </View>
          <SparklineChart
            data={MOCK_CASHFLOW_POINTS}
            width={320}
            height={80}
            color={COLORS.gold}
          />
          <View style={styles.monthLabels}>
            {MOCK_CASHFLOW_POINTS.map((p) => (
              <Typography key={p.month} variant="caption" color={COLORS.textSecondary} style={styles.monthLabel}>
                {p.month}
              </Typography>
            ))}
          </View>
        </View>

        {/* Upcoming Payments */}
        <View style={styles.upcomingSection}>
          <Typography variant="cardHeading" color={COLORS.text} style={styles.upcomingTitle}>
            Upcoming Payments
          </Typography>
          <View style={styles.upcomingCard}>
            {MOCK_FORECAST_POINTS.slice(1).map((point, idx) => {
              const isInflow = point.type === 'inflow';
              return (
                <View key={idx}>
                  <View style={styles.upcomingRow}>
                    <View style={[styles.upcomingIconWrapper, isInflow ? styles.inflowIcon : styles.outflowIcon]}>
                      {isInflow
                        ? <TrendingUp color={COLORS.success} size={14} strokeWidth={2} />
                        : <TrendingDown color={COLORS.error} size={14} strokeWidth={2} />
                      }
                    </View>
                    <View style={styles.upcomingInfo}>
                      <Typography variant="bodyMedium" style={styles.upcomingLabel}>
                        {point.label}
                      </Typography>
                      <Typography variant="caption" color={COLORS.textSecondary}>
                        {point.date}
                      </Typography>
                    </View>
                    <Typography
                      variant="financial"
                      color={isInflow ? COLORS.success : COLORS.error}
                      style={styles.upcomingAmount}
                    >
                      {isInflow ? '+' : ''}₹{Math.abs(point.amount).toLocaleString('en-IN')}
                    </Typography>
                  </View>
                  {idx < MOCK_FORECAST_POINTS.length - 2 && <View style={styles.rowDivider} />}
                </View>
              );
            })}
          </View>
        </View>

        {/* Current → Projected */}
        <View style={styles.flowCard}>
          <View style={styles.flowItem}>
            <Typography variant="caption" color={COLORS.textSecondary}>Current Balance</Typography>
            <Typography variant="financial" color={COLORS.text} style={styles.flowValue}>₹1,24,500</Typography>
          </View>
          <Typography variant="h3" color={COLORS.textSecondary} style={styles.flowArrow}>→</Typography>
          <View style={styles.flowItem}>
            <Typography variant="caption" color={COLORS.textSecondary}>After Obligations</Typography>
            <Typography variant="financial" color={COLORS.warning} style={styles.flowValue}>₹39,300</Typography>
          </View>
          <Typography variant="h3" color={COLORS.textSecondary} style={styles.flowArrow}>→</Typography>
          <View style={styles.flowItem}>
            <Typography variant="caption" color={COLORS.textSecondary}>After Salary</Typography>
            <Typography variant="financial" color={COLORS.success} style={styles.flowValue}>₹1,09,300</Typography>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.xl, paddingTop: SPACING.base, paddingBottom: SPACING.md,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { flex: 1, fontSize: 22, lineHeight: 30 },
  tabContainer: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.base },
  tabRow: {
    flexDirection: 'row', backgroundColor: COLORS.border,
    borderRadius: SIZES.radius, padding: 3,
  },
  tabBtn: {
    flex: 1, paddingVertical: SPACING.sm + 1,
    borderRadius: SIZES.radius - 3, alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14 },
  scroll: { paddingHorizontal: SPACING.xl, gap: SPACING.xl },

  heroCard: {
    backgroundColor: COLORS.primary, borderRadius: SIZES.heroRadius,
    padding: SPACING.lg, gap: SPACING.sm,
  },
  heroLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  heroAmount: { color: COLORS.white, fontSize: 36, lineHeight: 44 },
  heroDate: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  warningBanner: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: 'rgba(217,119,6,0.15)', borderRadius: 10,
    padding: SPACING.sm + 2, marginTop: SPACING.sm,
  },
  warningText: { flex: 1, fontSize: 12 },

  chartCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border,
  },
  chartHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  monthLabels: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 4, paddingHorizontal: 4,
  },
  monthLabel: { fontSize: 10 },

  upcomingSection: { gap: SPACING.md },
  upcomingTitle: {},
  upcomingCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  upcomingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, gap: SPACING.md,
  },
  upcomingIconWrapper: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  inflowIcon: { backgroundColor: '#DCFCE7' },
  outflowIcon: { backgroundColor: '#FEE2E2' },
  upcomingInfo: { flex: 1 },
  upcomingLabel: { fontSize: 14 },
  upcomingAmount: { fontSize: 15 },
  rowDivider: { height: 1, backgroundColor: COLORS.border, marginLeft: SPACING.base + 32 + SPACING.md },

  flowCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border,
    flexWrap: 'wrap', gap: SPACING.xs,
  },
  flowItem: { alignItems: 'center', gap: 3, flex: 1 },
  flowValue: { fontSize: 13, textAlign: 'center' },
  flowArrow: { fontSize: 20, color: COLORS.border },
});
