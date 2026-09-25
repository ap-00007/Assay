import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { LoanCard } from '../../components/ui/LoanCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_LOANS, MOCK_DEBT_SUMMARY } from '../../constants/mockData';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react-native';

const RISK_COLORS: Record<string, string> = {
  Low: COLORS.success,
  Moderate: COLORS.warning,
  High: COLORS.error,
};

export default function DebtScreen() {
  const router = useRouter();
  const riskColor = RISK_COLORS[MOCK_DEBT_SUMMARY.riskLevel];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft color={COLORS.text} size={22} strokeWidth={1.8} />
        </TouchableOpacity>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Debt & Loans
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Total Outstanding Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Typography variant="caption" style={styles.heroLabel}>Total Outstanding</Typography>
              <Typography variant="h1" color={COLORS.white} style={styles.heroAmount}>
                ₹{(MOCK_DEBT_SUMMARY.totalOutstanding / 100000).toFixed(1)}L
              </Typography>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: riskColor + '25' }]}>
              <Typography variant="caption" color={riskColor} style={styles.riskText}>
                {MOCK_DEBT_SUMMARY.riskLevel} Risk
              </Typography>
            </View>
          </View>

          <View style={styles.repaidRow}>
            <Typography variant="caption" style={styles.repaidLabel}>
              {MOCK_DEBT_SUMMARY.repaidPercent}% repaid overall
            </Typography>
            <ProgressBar
              percent={MOCK_DEBT_SUMMARY.repaidPercent}
              color={COLORS.gold}
              trackColor="rgba(255,255,255,0.15)"
              height={6}
            />
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Typography variant="caption" color={COLORS.textSecondary}>Monthly Burden</Typography>
            <Typography variant="financial" color={COLORS.text} style={styles.statValue}>
              ₹{MOCK_DEBT_SUMMARY.monthlyBurden.toLocaleString('en-IN')}
            </Typography>
          </View>
          <View style={styles.statCard}>
            <Typography variant="caption" color={COLORS.textSecondary}>Debt-to-Income</Typography>
            <Typography variant="financial" color={COLORS.text} style={styles.statValue}>
              {MOCK_DEBT_SUMMARY.debtToIncomeRatio}%
            </Typography>
            <Typography variant="caption" color={COLORS.success} style={styles.statBadge}>
              ✓ Below 40%
            </Typography>
          </View>
        </View>

        {/* Loan Cards */}
        <Typography variant="cardHeading" color={COLORS.text} style={styles.sectionTitle}>
          Your Loans
        </Typography>
        {MOCK_LOANS.map((loan) => (
          <LoanCard key={loan.id} {...loan} />
        ))}

        {/* DTI Explanation */}
        <View style={styles.dtiCard}>
          <View style={styles.dtiHeader}>
            <CheckCircle color={COLORS.success} size={18} strokeWidth={2} />
            <Typography variant="bodyMedium" color={COLORS.text} style={styles.dtiTitle}>
              Debt-to-Income Ratio: {MOCK_DEBT_SUMMARY.debtToIncomeRatio}%
            </Typography>
          </View>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.dtiBody}>
            Looks good! Generally below 40% is considered healthy. Your ratio indicates manageable debt levels.
          </Typography>
          <ProgressBar percent={MOCK_DEBT_SUMMARY.debtToIncomeRatio} color={COLORS.success} height={6} />
        </View>

        {/* AI Tip */}
        <View style={styles.aiTipCard}>
          <Typography variant="caption" style={styles.aiIcon}>💡</Typography>
          <View style={styles.aiText}>
            <Typography variant="bodyMedium" color={COLORS.text} style={styles.aiTitle}>
              Tip from FinCopilot
            </Typography>
            <Typography variant="secondary" color={COLORS.textSecondary} style={styles.aiBody}>
              Paying an extra ₹5,000/month toward your Car Loan can save ₹18,000 in interest and cut 6 months from tenure.
            </Typography>
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
  scroll: { paddingHorizontal: SPACING.xl, gap: SPACING.xl },

  heroCard: {
    backgroundColor: COLORS.primary, borderRadius: SIZES.heroRadius,
    padding: SPACING.lg, gap: SPACING.base,
  },
  heroTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  heroLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginBottom: 4 },
  heroAmount: { color: COLORS.white, fontSize: 34, lineHeight: 42 },
  riskBadge: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs + 2,
    borderRadius: SIZES.smallRadius, alignSelf: 'flex-start',
  },
  riskText: { fontFamily: FONTS.bodySemiBold, fontSize: 12 },
  repaidRow: { gap: SPACING.sm },
  repaidLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 12 },

  statsRow: { flexDirection: 'row', gap: SPACING.md },
  statCard: {
    flex: 1, backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius, padding: SPACING.base,
    borderWidth: 1, borderColor: COLORS.border, gap: 4,
  },
  statValue: { fontSize: 18 },
  statBadge: { fontSize: 11 },

  sectionTitle: { marginBottom: -SPACING.md },

  dtiCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm,
  },
  dtiHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  dtiTitle: { fontSize: 14 },
  dtiBody: { fontSize: 13, lineHeight: 19 },

  aiTipCard: {
    flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start',
    backgroundColor: '#FFFBEB', borderRadius: SIZES.cardRadius,
    padding: SPACING.base, borderWidth: 1, borderColor: '#FDE68A',
  },
  aiIcon: { fontSize: 18, marginTop: 2 },
  aiText: { flex: 1, gap: 4 },
  aiTitle: { fontSize: 14 },
  aiBody: { fontSize: 13, lineHeight: 19 },
});
