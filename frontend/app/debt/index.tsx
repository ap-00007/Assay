import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { MerchantLogo } from '../../components/ui/MerchantLogo';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { 
  ChevronLeft, 
  SlidersHorizontal, 
  ChevronRight, 
  Sparkles, 
  Sprout 
} from 'lucide-react-native';

interface LoanItemProps {
  name: string;
  bank: string;
  balance: string;
  detail: string;
  schedule: string;
  apr: string;
  isHighApr?: boolean;
  progress: number;
  progressLabel: string;
  onPress?: () => void;
}

function LoanItem({
  name,
  bank,
  balance,
  detail,
  schedule,
  apr,
  isHighApr = false,
  progress,
  progressLabel,
  onPress,
}: LoanItemProps) {
  return (
    <TouchableOpacity 
      style={styles.loanCard} 
      activeOpacity={0.75} 
      onPress={onPress}
    >
      <View style={styles.loanTopRow}>
        <MerchantLogo name={bank} size={44} style={styles.bankLogo} />
        
        <View style={styles.loanInfoCol}>
          <View style={styles.loanHeaderRow}>
            <Typography variant="bodyBold" style={styles.loanTitle} numberOfLines={1}>
              {name}
            </Typography>
            <View style={[styles.aprBadge, isHighApr ? styles.highAprBadge : styles.normalAprBadge]}>
              <Typography 
                variant="caption" 
                style={[styles.aprText, isHighApr ? styles.highAprText : styles.normalAprText]}
              >
                {apr}
              </Typography>
            </View>
            <ChevronRight color={COLORS.textSecondary} size={18} />
          </View>

          <Typography variant="caption" color={COLORS.textSecondary} style={styles.balanceText}>
            Balance: <Typography variant="bodyBold" style={styles.balanceHighlight}>{balance}</Typography>
            {detail ? ` • ${detail}` : ''}
          </Typography>

          <Typography variant="caption" color={COLORS.textSecondary} style={styles.scheduleText}>
            {schedule}
          </Typography>

          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.progressLabel}>
              {progressLabel}
            </Typography>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function DebtAndLiabilitiesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        
        <Typography variant="h2" style={styles.screenTitle}>
          Debt & Liabilities
        </Typography>

        <TouchableOpacity 
          style={styles.filterButton}
          activeOpacity={0.7}
        >
          <SlidersHorizontal color={COLORS.text} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dark Hero Summary Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <Typography variant="caption" style={styles.heroLabel}>
              Total Outstanding Debt
            </Typography>
            <View style={styles.dtiBadge}>
              <Sprout color="#4ADE80" size={14} style={{ marginRight: 4 }} />
              <Typography variant="caption" style={styles.dtiBadgeText}>
                DTI: 28% (Healthy)
              </Typography>
            </View>
          </View>

          <Typography variant="display" style={styles.heroAmount}>
            ₹4,82,450
          </Typography>

          <View style={styles.heroDivider} />

          <View style={styles.heroBottomRow}>
            <View style={styles.heroStatCol}>
              <Typography variant="caption" style={styles.heroStatLabel}>
                Total Monthly EMIs
              </Typography>
              <Typography variant="h3" style={styles.heroStatValue}>
                ₹26,900
              </Typography>
            </View>

            <View style={styles.heroStatDivider} />

            <View style={styles.heroStatCol}>
              <Typography variant="caption" style={styles.heroStatLabel}>
                Avg. Blended APR
              </Typography>
              <Typography variant="h3" style={styles.heroStatValue}>
                11.4%
              </Typography>
            </View>
          </View>
        </View>

        {/* Section: Active Credit Lines & Loans */}
        <Typography variant="cardHeading" style={styles.sectionHeader}>
          Active Credit Lines & Loans
        </Typography>

        <LoanItem
          name="ICICI Sapphiro Credit Card"
          bank="icici"
          balance="₹24,450"
          detail="42% Limit Used"
          schedule="Due 24 Sep • Min: ₹1,200"
          apr="38.4% APR (High)"
          isHighApr
          progress={0.42}
          progressLabel="42% used"
        />

        <LoanItem
          name="Axis Car Loan (Fixed)"
          bank="axis"
          balance="₹2,18,000"
          detail=""
          schedule="26 of 60 EMIs Paid • ₹8,400/mo"
          apr="8.75% APR"
          progress={0.43}
          progressLabel="43% repaid"
        />

        <LoanItem
          name="HDFC Education Loan"
          bank="hdfc"
          balance="₹2,40,000"
          detail=""
          schedule="18 of 48 EMIs Paid • ₹17,300/mo"
          apr="9.20% APR"
          progress={0.38}
          progressLabel="38% repaid"
        />

        {/* Avalanche Payoff Recommendation Card */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <View style={styles.sparkleBadge}>
              <Sparkles color="#B45309" size={20} />
            </View>
            <Typography variant="bodyBold" style={styles.recommendationTitle}>
              Avalanche Payoff Recommendation
            </Typography>
          </View>

          <Typography variant="secondary" color={COLORS.text} style={styles.recommendationBody}>
            Pay off <Typography variant="bodyBold">₹24,450</Typography> on ICICI Card first to eliminate 38.4% APR compounding interest. Saves <Typography variant="bodyBold">₹8,920</Typography> in annual finance charges.
          </Typography>

          <TouchableOpacity 
            style={styles.simulateButton}
            onPress={() => router.push('/simulator')}
            activeOpacity={0.8}
          >
            <Typography variant="bodyBold" style={styles.simulateButtonText}>
              Simulate Lump-Sum Payoff
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  screenTitle: {
    fontSize: 24,
    color: COLORS.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  dtiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  dtiBadgeText: {
    color: '#4ADE80',
    fontWeight: '600',
    fontSize: 12,
  },
  heroAmount: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 20,
  },
  heroDivider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginBottom: 16,
  },
  heroBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroStatCol: {
    flex: 1,
  },
  heroStatDivider: {
    width: 1,
    backgroundColor: '#1E293B',
    marginHorizontal: 16,
  },
  heroStatLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  heroStatValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 14,
    color: COLORS.text,
  },
  loanCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },
  loanTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bankLogo: {
    marginRight: 12,
    marginTop: 2,
  },
  loanInfoCol: {
    flex: 1,
  },
  loanHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  loanTitle: {
    fontSize: 15,
    flex: 1,
    color: COLORS.text,
  },
  aprBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 6,
  },
  normalAprBadge: {
    backgroundColor: '#DCFCE7',
  },
  highAprBadge: {
    backgroundColor: '#FEE2E2',
  },
  aprText: {
    fontSize: 11,
    fontWeight: '600',
  },
  normalAprText: {
    color: '#16A34A',
  },
  highAprText: {
    color: '#DC2626',
  },
  balanceText: {
    fontSize: 13,
    marginBottom: 2,
  },
  balanceHighlight: {
    fontSize: 13,
    color: COLORS.text,
  },
  scheduleText: {
    fontSize: 12,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C89B3C',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    minWidth: 65,
    textAlign: 'right',
  },
  recommendationCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 20,
    marginTop: 10,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sparkleBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  recommendationBody: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
  simulateButton: {
    backgroundColor: '#D6A928',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simulateButtonText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
});
