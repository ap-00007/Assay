import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { TransactionRow } from '../../components/ui/TransactionRow';
import { HealthScoreGauge } from '../../components/ui/HealthScoreGauge';
import { SparklineChart } from '../../components/ui/SparklineChart';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import {
  MOCK_HEALTH_SCORE,
  MOCK_SUMMARY,
  MOCK_TRANSACTIONS,
  MOCK_CASHFLOW_POINTS,
} from '../../constants/mockData';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Bell,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react-native';

const fmt = (n: number) =>
  `₹${Math.abs(n).toLocaleString('en-IN')}`;

export default function DashboardScreen() {
  const router = useRouter();
  const recentTxns = MOCK_TRANSACTIONS.slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Typography variant="secondary" color={COLORS.textSecondary}>
            Good morning,
          </Typography>
          <Typography variant="h3" color={COLORS.text} style={styles.userName}>
            Harshal 👋
          </Typography>
        </View>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <Bell color={COLORS.text} size={22} strokeWidth={1.8} />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Health Score + Summary Hero */}
        <View style={styles.heroCard}>
          {/* Health Score */}
          <View style={styles.scoreSection}>
            <HealthScoreGauge score={MOCK_HEALTH_SCORE.overall} size={130} label={MOCK_HEALTH_SCORE.label} />
            <View style={styles.scoreInfo}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.financialHealthLabel}>
                Financial Health Score
              </Typography>
              <View style={styles.scoreStatusRow}>
                <View style={styles.statusDot} />
                <Typography variant="bodyMedium" color={COLORS.success} style={styles.statusText}>
                  You're on track!
                </Typography>
              </View>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.scoreChange}>
                Score ↓ from {MOCK_HEALTH_SCORE.change.from} last month
              </Typography>
              <TouchableOpacity
                style={styles.viewDetailsBtn}
                onPress={() => {}}
                activeOpacity={0.75}
              >
                <Typography variant="caption" color={COLORS.gold} style={styles.viewDetailsText}>
                  View Details
                </Typography>
                <ChevronRight color={COLORS.gold} size={13} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.heroDivider} />

          {/* Summary Stats */}
          <View style={styles.summaryRow}>
            <SummaryTile
              label="Income"
              value={fmt(MOCK_SUMMARY.monthlyIncome)}
              trend={MOCK_SUMMARY.incomeTrend}
              positive
            />
            <View style={styles.summaryDivider} />
            <SummaryTile
              label="Expenses"
              value={fmt(MOCK_SUMMARY.monthlyExpenses)}
              trend={MOCK_SUMMARY.expenseTrend}
              positive={false}
            />
            <View style={styles.summaryDivider} />
            <SummaryTile
              label="Savings"
              value={fmt(MOCK_SUMMARY.monthlySavings)}
              badge={`${MOCK_SUMMARY.savingsRate}% of income`}
            />
          </View>

          {/* Total Balance */}
          <View style={styles.balanceRow}>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              Total Balance
            </Typography>
            <Typography variant="bodyMedium" color={COLORS.text}>
              ₹{MOCK_SUMMARY.totalBalance.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Across 4 accounts
            </Typography>
          </View>
        </View>

        {/* Cash Flow Trend */}
        <Card style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <Typography variant="cardHeading" color={COLORS.text}>
              Cash Flow Trend
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Last 6 months
            </Typography>
          </View>

          <SparklineChart
            data={MOCK_CASHFLOW_POINTS}
            width={340}
            height={72}
            color={COLORS.gold}
          />

          {/* Month labels */}
          <View style={styles.monthLabels}>
            {MOCK_CASHFLOW_POINTS.map((p) => (
              <Typography key={p.month} variant="caption" color={COLORS.textSecondary} style={styles.monthLabel}>
                {p.month}
              </Typography>
            ))}
          </View>

          {/* Cashflow alert */}
          <View style={styles.alertBanner}>
            <AlertTriangle color={COLORS.warning} size={14} strokeWidth={2} />
            <Typography variant="caption" color={COLORS.warning} style={styles.alertText}>
              Cash-flow pressure predicted around 25 Sep
            </Typography>
          </View>
        </Card>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Typography variant="cardHeading" color={COLORS.text}>Recent</Typography>
          <TouchableOpacity
            style={styles.viewAllRow}
            onPress={() => router.push('/(tabs)/transactions')}
            activeOpacity={0.7}
          >
            <Typography variant="secondary" color={COLORS.textSecondary}>View All</Typography>
            <ArrowUpRight color={COLORS.textSecondary} size={16} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        <Card variant="list" style={styles.txnCard}>
          {recentTxns.map((txn, idx) => (
            <TransactionRow
              key={txn.id}
              name={txn.name}
              category={txn.category}
              date={`${txn.date}, ${txn.time}`}
              amount={txn.amount > 0 ? `+${fmt(txn.amount)}` : `-${fmt(txn.amount)}`}
              method={txn.method}
              isIncome={txn.isIncome}
              showDivider={idx < recentTxns.length - 1}
              onPress={() => {}}
            />
          ))}
        </Card>

        {/* Quick Actions Row */}
        <View style={styles.quickActions}>
          <QuickAction emoji="📊" label="Analytics" onPress={() => router.push('/analytics')} />
          <QuickAction emoji="🔄" label="Recurring" onPress={() => router.push('/recurring')} />
          <QuickAction emoji="💸" label="Debt" onPress={() => router.push('/debt')} />
          <QuickAction emoji="🔮" label="Forecast" onPress={() => router.push('/cashflow')} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryTile({
  label,
  value,
  trend,
  positive,
  badge,
}: {
  label: string;
  value: string;
  trend?: number;
  positive?: boolean;
  badge?: string;
}) {
  const trendColor = positive ? COLORS.success : COLORS.error;
  return (
    <View style={styles.tile}>
      <Typography variant="caption" color={COLORS.textSecondary} style={styles.tileLabel}>
        {label}
      </Typography>
      <Typography variant="financial" color={COLORS.text} style={styles.tileValue}>
        {value}
      </Typography>
      {trend !== undefined && (
        <View style={[styles.trendPill, { backgroundColor: trendColor + '15' }]}>
          {positive
            ? <TrendingUp color={trendColor} size={10} strokeWidth={2} />
            : <TrendingDown color={trendColor} size={10} strokeWidth={2} />
          }
          <Typography variant="caption" color={trendColor} style={styles.trendText}>
            {positive ? '+' : ''}{trend}%
          </Typography>
        </View>
      )}
      {badge && (
        <Typography variant="caption" color={COLORS.textSecondary} style={styles.badgeText}>
          {badge}
        </Typography>
      )}
    </View>
  );
}

function QuickAction({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.qaItem} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.qaIcon}>
        <Typography variant="body" style={styles.qaEmoji}>{emoji}</Typography>
      </View>
      <Typography variant="caption" color={COLORS.textSecondary} style={styles.qaLabel}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.md,
  },
  userName: { fontSize: 20, lineHeight: 28 },
  bellBtn: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  bellDot: {
    position: 'absolute', top: 9, right: 9,
    width: 7, height: 7, borderRadius: 3.5, backgroundColor: COLORS.gold,
  },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
  },

  /* Hero Card */
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.heroRadius,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.base,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.base,
  },
  scoreInfo: {
    flex: 1,
    gap: SPACING.xs,
  },
  financialHealthLabel: { fontSize: 11, letterSpacing: 0.3, marginBottom: 2 },
  scoreStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: COLORS.success },
  statusText: { fontSize: 13 },
  scoreChange: { fontSize: 11, lineHeight: 16, color: COLORS.textSecondary },
  viewDetailsBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    marginTop: SPACING.xs,
  },
  viewDetailsText: { fontFamily: FONTS.bodySemiBold, fontSize: 12 },
  heroDivider: { height: 1, backgroundColor: COLORS.border },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tile: { flex: 1, gap: 4, alignItems: 'center' },
  tileLabel: { fontSize: 11, textAlign: 'center' },
  tileValue: { fontSize: 14, textAlign: 'center' },
  trendPill: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  trendText: { fontSize: 10, fontFamily: FONTS.bodySemiBold },
  badgeText: { fontSize: 10, textAlign: 'center' },
  summaryDivider: { width: 1, backgroundColor: COLORS.border, alignSelf: 'stretch', marginHorizontal: 4 },
  balanceRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background, borderRadius: 12,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
  },

  /* Cards */
  sectionCard: { marginBottom: SPACING.xl },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  monthLabels: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 4, paddingHorizontal: 4,
  },
  monthLabel: { fontSize: 10 },
  alertBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FEF3C7', borderRadius: 8,
    padding: SPACING.sm + 2, marginTop: SPACING.sm,
  },
  alertText: { flex: 1, fontSize: 12 },

  /* Section header */
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  viewAllRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  txnCard: { marginBottom: SPACING.xl },

  /* Quick Actions */
  quickActions: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: SPACING.base,
  },
  qaItem: { alignItems: 'center', gap: SPACING.xs, width: 68 },
  qaIcon: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  qaEmoji: { fontSize: 22 },
  qaLabel: { fontSize: 11, textAlign: 'center' },
});
