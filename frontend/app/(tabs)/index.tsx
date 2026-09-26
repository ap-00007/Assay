import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { TransactionRow } from '../../components/ui/TransactionRow';
import { COLORS, SIZES, SPACING, FONTS } from '../../constants/theme';
import { useAAState } from '../../services/aaState';
import {
  ScanLine,
  Image as ImageIcon,
  Users,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Calendar,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  Layers,
} from 'lucide-react-native';

export default function Dashboard() {
  const router = useRouter();
  const aaState = useAAState();
  const [hasUnreadNotification, setHasUnreadNotification] = React.useState(true);

  const handleNotificationPress = () => {
    setHasUnreadNotification(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Unified Header */}
      <ScreenHeader
        greeting="Good Morning,"
        userName="Ashish"
        showNotification
        hasUnreadNotification={hasUnreadNotification}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Subtle limited insights banner if user chose Set Up Later or disconnected */}
        {!aaState.aa_connected && (
          <View style={styles.limitedBanner}>
            <View style={styles.limitedBannerLeft}>
              <View style={styles.limitedIconWrap}>
                <AlertCircle size={18} color="#D97706" />
              </View>
              <View style={styles.limitedTextWrap}>
                <Typography variant="bodySemiBold" color={COLORS.primary} style={{ fontSize: 13.5 }}>
                  Financial insights are limited
                </Typography>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  Connect your bank account to automate cash-flow analysis.
                </Typography>
              </View>
            </View>
            <TouchableOpacity
              style={styles.connectPill}
              onPress={() => router.push('/connect')}
              activeOpacity={0.8}
            >
              <Text style={styles.connectPillText}>Connect</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            HERO CARD: CURRENT BALANCE & SPENDING
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Card variant="hero" style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <Typography variant="secondary" color={COLORS.textSecondary} style={styles.heroLabel}>
              {aaState.aa_connected ? 'Available Liquid Balance' : 'Total spent this month'}
            </Typography>

            {aaState.aa_connected && (
              <View style={styles.bankStatusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.bankStatusText}>
                  {aaState.connected_accounts[0]?.bankName || 'HDFC Bank'} • Synced
                </Text>
              </View>
            )}
          </View>

          <View style={styles.amountRow}>
            <Typography variant="h1" color={COLORS.white} style={styles.heroAmount}>
              {aaState.aa_connected ? '₹1,66,930' : '₹12,450'}
            </Typography>
            <View style={styles.trendBadge}>
              <TrendingUp color={COLORS.success} size={14} strokeWidth={2} />
              <Typography variant="caption" color={COLORS.success} style={styles.trendText}>
                +8.4%
              </Typography>
            </View>
          </View>

          {/* Key Financial Health Ratios (Payoff) */}
          <View style={styles.heroMetricsGrid}>
            <View style={styles.heroMetricCol}>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Monthly Income
              </Typography>
              <Typography variant="bodyBold" color={COLORS.white} style={{ marginTop: 2 }}>
                ₹85,000
              </Typography>
            </View>

            <View style={styles.heroMetricCol}>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Monthly Spending
              </Typography>
              <Typography variant="bodyBold" color={COLORS.white} style={{ marginTop: 2 }}>
                ₹32,450
              </Typography>
            </View>

            <View style={styles.heroMetricCol}>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Savings Rate
              </Typography>
              <Typography variant="bodyBold" color={COLORS.gold} style={{ marginTop: 2 }}>
                61.8%
              </Typography>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <ActionItem
            icon={<ScanLine color={COLORS.primary} size={22} strokeWidth={1.8} />}
            title="Scan Receipt"
            onPress={() => router.push('/upload')}
          />
          <ActionItem
            icon={<ImageIcon color={COLORS.primary} size={22} strokeWidth={1.8} />}
            title="Upload UPI"
            onPress={() => router.push('/upload')}
          />
          <ActionItem
            icon={<Users color={COLORS.primary} size={22} strokeWidth={1.8} />}
            title="Split Bill"
            onPress={() => router.push('/split')}
          />
          <ActionItem
            icon={<PieChart color={COLORS.primary} size={22} strokeWidth={1.8} />}
            title="Insights"
            onPress={() => router.push('/insights')}
          />
        </View>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FINANCIAL COPILOT INSIGHT
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Card style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightTag}>
              <Sparkles size={13} color={COLORS.gold} />
              <Text style={styles.insightTagText}>ASSAY CLARITY</Text>
            </View>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Automated Analysis
            </Typography>
          </View>

          <Typography variant="bodyBold" color={COLORS.primary} style={styles.insightHeadline}>
            {aaState.aa_connected
              ? "Positive Cash Flow Trajectory"
              : "Basic spend tracking active"}
          </Typography>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.insightDetail}>
            {aaState.aa_connected
              ? "Your liquid reserves comfortably cover projected month-end commitments of ₹14,200. ₹52,550 surplus is eligible for compounding."
              : "Upload recent receipts or link your account via Settings to unlock full cash flow forecasting."}
          </Typography>
        </Card>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            UPCOMING OBLIGATIONS & CASH FLOW
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {aaState.aa_connected && (
          <Card style={styles.sectionCard}>
            <View style={styles.obligationHeader}>
              <Typography variant="h3">Upcoming Obligations</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>Next 14 Days</Typography>
            </View>

            <View style={styles.obligationList}>
              <View style={styles.obligationRow}>
                <View style={styles.obligationLeft}>
                  <Calendar size={16} color={COLORS.primary} />
                  <View>
                    <Typography variant="bodyMedium">Apartment Rent</Typography>
                    <Typography variant="caption" color={COLORS.textSecondary}>Due 25 Sep • Auto-debit</Typography>
                  </View>
                </View>
                <Typography variant="bodyBold" color={COLORS.primary}>₹12,000</Typography>
              </View>

              <View style={styles.obligationDivider} />

              <View style={styles.obligationRow}>
                <View style={styles.obligationLeft}>
                  <Calendar size={16} color={COLORS.primary} />
                  <View>
                    <Typography variant="bodyMedium">Broadband & Utilities</Typography>
                    <Typography variant="caption" color={COLORS.textSecondary}>Due 28 Sep • AirFiber</Typography>
                  </View>
                </View>
                <Typography variant="bodyBold" color={COLORS.primary}>₹2,200</Typography>
              </View>
            </View>
          </Card>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SPENDING BREAKDOWN
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Card style={styles.sectionCard}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Top Spending Categories
          </Typography>

          <View style={styles.breakdownRow}>
            {/* Minimalist Donut Chart ring */}
            <View style={styles.donutContainer}>
              <View style={styles.donutOuter}>
                <View style={styles.donutInner}>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    Total
                  </Typography>
                  <Typography variant="bodyBold" color={COLORS.text}>
                    Spend
                  </Typography>
                </View>
              </View>
            </View>

            <View style={styles.breakdownList}>
              <BreakdownItem color={COLORS.gold} label="Food & Dining" amount="₹11,400" percent="35%" />
              <BreakdownItem color={COLORS.primary} label="Shopping" amount="₹8,200" percent="25%" />
              <BreakdownItem color={COLORS.success} label="Transport" amount="₹5,150" percent="16%" />
              <BreakdownItem color={COLORS.warning} label="Subscriptions" amount="₹4,400" percent="14%" />
              <BreakdownItem color={COLORS.textSecondary} label="Others" amount="₹3,300" percent="10%" />
            </View>
          </View>
        </Card>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            MONEY LEAKS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Card style={styles.sectionCard}>
          <View style={styles.leakHeader}>
            <Typography variant="h3">Money Leaks</Typography>
            <View style={styles.leakTotalBadge}>
              <Typography variant="caption" color={COLORS.error}>
                ₹1,450 Total
              </Typography>
            </View>
          </View>

          <View style={styles.leakList}>
            <LeakItem title="Tea & Coffee" amount="₹450" count="9 micro-transactions" />
            <LeakItem title="Snacks" amount="₹600" count="12 transactions" />
            <LeakItem title="Auto & Quick Cabs" amount="₹250" count="4 short rides" />
            <LeakItem title="Impulse Buys" amount="₹150" count="3 small orders" />
          </View>

          <View style={styles.leakFooterBox}>
            <Typography variant="caption" color={COLORS.textSecondary} align="center">
              Small purchases under ₹100 often go unnoticed.
            </Typography>
          </View>
        </Card>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            RECENT TRANSACTIONS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <View style={styles.transactionsHeader}>
          <Typography variant="h3">Recent Transactions</Typography>
          <TouchableOpacity
            onPress={() => router.push('/transactions')}
            activeOpacity={0.7}
            style={styles.viewAllRow}
          >
            <Typography variant="secondary" color={COLORS.textSecondary}>
              View All
            </Typography>
            <ArrowUpRight color={COLORS.textSecondary} size={16} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        <Card variant="list" style={styles.recentTransactionsCard}>
          <TransactionRow
            name="Starbucks"
            category="Food & Dining"
            date="Today, 10:42 AM"
            amount="-₹340"
            method="UPI"
            showDivider
            onPress={() => router.push('/transaction/1')}
          />
          <TransactionRow
            name="Salary"
            category="Income"
            date="Today, 09:00 AM"
            amount="+₹85,000"
            method="Bank"
            isIncome
            showDivider
            onPress={() => router.push('/transaction/2')}
          />
          <TransactionRow
            name="Uber"
            category="Transport"
            date="Yesterday, 6:15 PM"
            amount="-₹250"
            method="Card"
            showDivider
            onPress={() => router.push('/transaction/3')}
          />
          <TransactionRow
            name="Amazon"
            category="Shopping"
            date="10 Jul, 2:30 PM"
            amount="-₹1,200"
            method="Card"
            onPress={() => router.push('/transaction/5')}
          />
        </Card>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const ActionItem = ({ icon, title, onPress }: { icon: React.ReactNode; title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress} activeOpacity={0.75}>
    <View style={styles.actionIconWrapper}>{icon}</View>
    <Typography variant="caption" align="center" style={styles.actionTitle}>
      {title}
    </Typography>
  </TouchableOpacity>
);

const BreakdownItem = ({
  color,
  label,
  amount,
  percent
}: {
  color: string;
  label: string;
  amount: string;
  percent: string;
}) => (
  <View style={styles.breakdownItemRow}>
    <View style={styles.breakdownLabelGroup}>
      <View style={[styles.colorDot, { backgroundColor: color }]} />
      <Typography variant="secondary" numberOfLines={1} style={styles.breakdownLabel}>
        {label}
      </Typography>
    </View>
    <View style={styles.breakdownAmountGroup}>
      <Typography variant="caption" color={COLORS.textSecondary}>
        {percent}
      </Typography>
      <Typography variant="bodyBold" color={COLORS.text} style={styles.breakdownAmount}>
        {amount}
      </Typography>
    </View>
  </View>
);

const LeakItem = ({ title, amount, count }: { title: string; amount: string; count: string }) => (
  <View style={styles.leakItemRow}>
    <View>
      <Typography variant="bodyMedium">{title}</Typography>
      <Typography variant="caption" color={COLORS.textSecondary}>{count}</Typography>
    </View>
    <Typography variant="financial" color={COLORS.error}>
      {amount}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 8,
  },
  limitedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: SIZES.radius,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  limitedBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingRight: 10,
  },
  limitedIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(217, 119, 6, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  limitedTextWrap: {
    flex: 1,
    gap: 1,
  },
  connectPill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  connectPillText: {
    color: COLORS.white,
    fontFamily: FONTS.bodySemiBold,
    fontSize: 12,
  },
  heroCard: {
    marginBottom: SPACING.xl,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroLabel: {
    fontSize: 13,
  },
  bankStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
  },
  bankStatusText: {
    color: '#D1D5DB',
    fontSize: 11,
    fontFamily: FONTS.bodyMedium,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroAmount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    lineHeight: 42,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 163, 74, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  trendText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  heroMetricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    paddingTop: 14,
  },
  heroMetricCol: {
    gap: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  actionItem: {
    alignItems: 'center',
    width: 74,
  },
  actionIconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    lineHeight: 16,
    fontSize: 12,
  },
  insightCard: {
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.3)',
    borderRadius: SIZES.cardRadius,
    padding: 16,
    marginBottom: SPACING.xl,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  insightTagText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10,
    color: '#927014',
    letterSpacing: 0.8,
  },
  insightHeadline: {
    fontSize: 16,
    marginBottom: 4,
  },
  insightDetail: {
    fontSize: 13.5,
    lineHeight: 19,
  },
  sectionCard: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.base,
  },
  obligationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.base,
  },
  obligationList: {
    gap: 10,
  },
  obligationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  obligationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  obligationDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  donutOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 12,
    borderColor: COLORS.primary,
    borderTopColor: COLORS.gold,
    borderRightColor: COLORS.success,
    borderBottomColor: COLORS.warning,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakdownList: {
    flex: 1,
    gap: 10,
  },
  breakdownItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  breakdownLabel: {
    fontSize: 13,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  breakdownAmountGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownAmount: {
    fontSize: 13,
    minWidth: 54,
    textAlign: 'right',
  },
  leakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.base,
  },
  leakTotalBadge: {
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.15)',
  },
  leakList: {
    gap: 12,
    marginBottom: 16,
  },
  leakItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  leakFooterBox: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recentTransactionsCard: {
    marginBottom: SPACING.xl,
  },
});
