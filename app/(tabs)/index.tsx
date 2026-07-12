import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { COLORS, SIZES } from '../../constants/theme';
import { Bell, ScanLine, Image as ImageIcon, Users, PieChart, ArrowUpRight, TrendingUp } from 'lucide-react-native';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="body" color={COLORS.textMuted}>Good Morning,</Typography>
            <Typography variant="h3">Ashish</Typography>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.iconButton}>
              <Bell color={COLORS.text} size={24} />
            </View>
            <View style={styles.avatar}>
              <Typography variant="bodyMedium" color={COLORS.white}>A</Typography>
            </View>
          </View>
        </View>

        {/* Hero Card */}
        <Card variant="primary" style={styles.heroCard}>
          <Typography variant="body" color={COLORS.textMuted} style={styles.heroLabel}>
            Total spent this month
          </Typography>
          <View style={styles.amountRow}>
            <Typography variant="h2" color={COLORS.white}>₹12,450</Typography>
            <View style={styles.trendBadge}>
              <TrendingUp color={COLORS.success} size={14} />
              <Typography variant="caption" color={COLORS.success} style={{marginLeft: 4}}>+8%</Typography>
            </View>
          </View>
          <View style={styles.heroBottomRow}>
            <Typography variant="caption" color={COLORS.textMuted}>Most spent category</Typography>
            <Typography variant="bodyMedium" color={COLORS.gold}>Food & Dining</Typography>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <ActionItem icon={<ScanLine color={COLORS.primary} size={24} />} title="Scan Receipt" />
          <ActionItem icon={<ImageIcon color={COLORS.primary} size={24} />} title="Upload UPI" />
          <ActionItem icon={<Users color={COLORS.primary} size={24} />} title="Split Bill" />
          <ActionItem icon={<PieChart color={COLORS.primary} size={24} />} title="Insights" />
        </View>

        {/* Spending Breakdown */}
        <Card style={styles.sectionCard}>
          <Typography variant="h3" style={styles.sectionTitle}>Spending</Typography>
          <View style={styles.breakdownRow}>
            {/* Mock Donut Chart area */}
            <View style={styles.donutPlaceholder}>
              <Typography variant="caption" color={COLORS.textMuted}>Total</Typography>
              <Typography variant="bodyMedium">Spend</Typography>
            </View>
            
            <View style={styles.breakdownList}>
              <BreakdownItem color="#EF4444" label="Food" amount="4,200" percent="34%" />
              <BreakdownItem color="#3B82F6" label="Shopping" amount="3,100" percent="25%" />
              <BreakdownItem color="#10B981" label="Transport" amount="2,050" percent="16%" />
              <BreakdownItem color="#8B5CF6" label="Entertainment" amount="1,800" percent="14%" />
              <BreakdownItem color="#9CA3AF" label="Others" amount="1,300" percent="11%" />
            </View>
          </View>
        </Card>

        {/* Money Leaks */}
        <Card style={styles.sectionCard}>
          <View style={styles.leakHeader}>
            <Typography variant="h3">Money Leaks</Typography>
            <View style={styles.leakTotalBadge}>
              <Typography variant="caption" color={COLORS.error}>₹1,450 Total</Typography>
            </View>
          </View>
          <View style={styles.leakList}>
            <LeakItem title="Tea & Coffee" amount="₹450" />
            <LeakItem title="Snacks" amount="₹600" />
            <LeakItem title="Auto" amount="₹250" />
            <LeakItem title="Impulse Buys" amount="₹150" />
          </View>
          <Typography variant="caption" color={COLORS.textMuted} align="center" style={styles.leakFooter}>
            Small purchases often go unnoticed.
          </Typography>
        </Card>

        {/* Recent Transactions */}
        <View style={styles.transactionsHeader}>
          <Typography variant="h3">Recent</Typography>
          <Typography variant="bodyMedium" color={COLORS.textMuted}>View All</Typography>
        </View>
        <Card style={styles.sectionCard}>
          <TransactionItem name="Starbucks" category="Food & Dining" date="Today, 10:42 AM" amount="-₹340" />
          <View style={styles.divider} />
          <TransactionItem name="Uber" category="Transport" date="Yesterday, 6:15 PM" amount="-₹250" />
          <View style={styles.divider} />
          <TransactionItem name="Amazon" category="Shopping" date="10 Jul, 2:30 PM" amount="-₹1,200" />
        </Card>

        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const ActionItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <View style={styles.actionItem}>
    <View style={styles.actionIconWrapper}>{icon}</View>
    <Typography variant="caption" align="center" style={styles.actionTitle}>{title}</Typography>
  </View>
);

const BreakdownItem = ({ color, label, amount, percent }: { color: string, label: string, amount: string, percent: string }) => (
  <View style={styles.breakdownItemRow}>
    <View style={styles.breakdownLabelGroup}>
      <View style={[styles.colorDot, { backgroundColor: color }]} />
      <Typography variant="caption">{label}</Typography>
    </View>
    <View style={styles.breakdownAmountGroup}>
      <Typography variant="caption" color={COLORS.textMuted}>{percent}</Typography>
      <Typography variant="bodyMedium" style={{width: 50, textAlign: 'right'}}>₹{amount}</Typography>
    </View>
  </View>
);

const LeakItem = ({ title, amount }: { title: string, amount: string }) => (
  <View style={styles.leakItemRow}>
    <Typography variant="bodyMedium">{title}</Typography>
    <Typography variant="bodyBold" color={COLORS.error}>{amount}</Typography>
  </View>
);

const TransactionItem = ({ name, category, date, amount }: { name: string, category: string, date: string, amount: string }) => (
  <View style={styles.transactionRow}>
    <View style={styles.transactionIcon} />
    <View style={styles.transactionDetails}>
      <Typography variant="bodyBold">{name}</Typography>
      <View style={styles.transactionSub}>
        <Typography variant="caption" color={COLORS.textMuted}>{category}</Typography>
        <Typography variant="caption" color={COLORS.textMuted} style={styles.dotSeparator}>•</Typography>
        <Typography variant="caption" color={COLORS.textMuted}>{date}</Typography>
      </View>
    </View>
    <Typography variant="bodyBold">{amount}</Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    // ...SHADOWS.soft,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    marginBottom: 24,
  },
  heroLabel: {
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
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
    marginBottom: 24,
  },
  actionItem: {
    alignItems: 'center',
    width: 70,
  },
  actionIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // ...SHADOWS.soft,
  },
  actionTitle: {
    lineHeight: 16,
  },
  sectionCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donutPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 16,
    borderColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  breakdownList: {
    flex: 1,
    gap: 12,
  },
  breakdownItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownAmountGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leakTotalBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  leakList: {
    gap: 16,
    marginBottom: 16,
  },
  leakItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leakFooter: {
    marginTop: 8,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionSub: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dotSeparator: {
    marginHorizontal: 6,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 52,
  }
});
