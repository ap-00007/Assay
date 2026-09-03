import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { TransactionRow } from '../../components/ui/TransactionRow';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { 
  ScanLine, 
  Image as ImageIcon, 
  Users, 
  PieChart, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react-native';

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Unified Header */}
      <ScreenHeader 
        greeting="Good Morning," 
        userName="Ashish" 
        showNotification
        onNotificationPress={() => router.push('/ai')}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Monthly Spending Hero Card */}
        <Card variant="hero" style={styles.heroCard}>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.heroLabel}>
            Total spent this month
          </Typography>
          
          <View style={styles.amountRow}>
            <Typography variant="h1" color={COLORS.white} style={styles.heroAmount}>
              ₹12,450
            </Typography>
            <View style={styles.trendBadge}>
              <TrendingUp color={COLORS.success} size={14} strokeWidth={2} />
              <Typography variant="caption" color={COLORS.success} style={styles.trendText}>
                +8%
              </Typography>
            </View>
          </View>

          <View style={styles.heroBottomRow}>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Most spent category
            </Typography>
            <Typography variant="bodyMedium" color={COLORS.gold}>
              Food & Dining
            </Typography>
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

        {/* Spending Breakdown */}
        <Card style={styles.sectionCard}>
          <Typography variant="h3" style={styles.sectionTitle}>
            Spending
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
              <BreakdownItem color={COLORS.gold} label="Food & Dining" amount="₹4,200" percent="34%" />
              <BreakdownItem color={COLORS.primary} label="Shopping" amount="₹3,100" percent="25%" />
              <BreakdownItem color={COLORS.success} label="Transport" amount="₹2,050" percent="16%" />
              <BreakdownItem color={COLORS.warning} label="Entertainment" amount="₹1,800" percent="14%" />
              <BreakdownItem color={COLORS.textSecondary} label="Others" amount="₹1,300" percent="11%" />
            </View>
          </View>
        </Card>

        {/* Money Leaks */}
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

        {/* Recent Transactions */}
        <View style={styles.transactionsHeader}>
          <Typography variant="h3">Recent</Typography>
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
  heroCard: {
    marginBottom: SPACING.xl,
  },
  heroLabel: {
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  heroBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
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
  sectionCard: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.base,
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
