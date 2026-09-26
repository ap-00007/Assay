import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import {
  ChevronLeft,
  RotateCcw,
  Utensils,
  Car,
  Sparkles,
  BarChart2
} from 'lucide-react-native';

export default function WhatIfSimulatorScreen() {
  const router = useRouter();

  // Financial levers
  const [diningReduction, setDiningReduction] = useState(2500);
  const [extraLoanPayment, setExtraLoanPayment] = useState(3000);

  // Computed values
  const baseMonthlySavings = 4800;
  const simulatedMonthlySavings = baseMonthlySavings + diningReduction;
  const savingsDelta = simulatedMonthlySavings - baseMonthlySavings;

  const simulatedInterestSaved = Math.round((extraLoanPayment / 3000) * 14280);
  const healthScoreDelta = Math.min(10, Math.round((diningReduction / 2500) * 3 + (extraLoanPayment / 3000) * 2));
  const simulatedScore = 82 + healthScoreDelta;

  const handleReset = () => {
    setDiningReduction(2500);
    setExtraLoanPayment(3000);
  };

  const handleCommit = () => {
    Alert.alert(
      'Plan Committed',
      `Your budget has been adjusted: Dining cap -₹${diningReduction.toLocaleString()}/mo, Loan auto-debit +₹${extraLoanPayment.toLocaleString()}/mo.`,
      [
        { text: 'View Updated Debt Plan', onPress: () => router.push('/debt') },
        { text: 'Done', onPress: () => router.push('/(tabs)/insights') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>

        <View style={styles.headerTitleCol}>
          <Typography variant="h2" style={styles.headerTitle}>
            What-If Simulator
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.headerSubtitle}>
            Adjust levers. See the impact. Make a smarter you.
          </Typography>
        </View>

        <TouchableOpacity
          style={styles.resetBtn}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <RotateCcw color={COLORS.text} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card 1: Adjust Financial Levers */}
        <View style={styles.leversCard}>
          <Typography variant="cardHeading" style={styles.leversTitle}>
            Adjust Financial Levers
          </Typography>

          {/* Lever 1: Dining & Entertainment */}
          <View style={styles.leverItem}>
            <View style={styles.leverHeader}>
              <View style={[styles.leverIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Utensils color="#B45309" size={18} />
              </View>
              <Typography variant="bodyBold" style={styles.leverName}>
                Reduce Dining & Entertainment
              </Typography>
              <Typography variant="bodyBold" style={styles.leverGoldValue}>
                -₹{diningReduction.toLocaleString()} / mo
              </Typography>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000}
              step={500}
              value={diningReduction}
              onValueChange={setDiningReduction}
              minimumTrackTintColor="#D6A928"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#D6A928"
            />

            <View style={styles.sliderLabels}>
              <Typography variant="caption" color={COLORS.textSecondary}>
                ₹0
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                -₹10,000
              </Typography>
            </View>
          </View>

          {/* Lever 2: Extra Payment to Loan */}
          <View style={[styles.leverItem, { marginTop: 14 }]}>
            <View style={styles.leverHeader}>
              <View style={[styles.leverIconBox, { backgroundColor: '#F1F5F9' }]}>
                <Car color="#334155" size={18} />
              </View>
              <Typography variant="bodyBold" style={styles.leverName}>
                Extra Payment to Axis Car Loan
              </Typography>
              <Typography variant="bodyBold" style={styles.leverDarkValue}>
                +₹{extraLoanPayment.toLocaleString()} / mo
              </Typography>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000}
              step={500}
              value={extraLoanPayment}
              onValueChange={setExtraLoanPayment}
              minimumTrackTintColor="#0F172A"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#0F172A"
            />

            <View style={styles.sliderLabels}>
              <Typography variant="caption" color={COLORS.textSecondary}>
                ₹0
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                +₹10,000
              </Typography>
            </View>
          </View>
        </View>

        {/* Card 2: Projected 12-Month Impact (Hero Dark Card) */}
        <View style={styles.impactCard}>
          <View style={styles.impactHeader}>
            <Sparkles color="#D6A928" size={20} style={{ marginRight: 8 }} />
            <Typography variant="h2" style={styles.impactTitle}>
              Projected 12-Month Impact
            </Typography>
          </View>

          {/* 2-Column Comparison */}
          <View style={styles.comparisonGrid}>
            {/* CURRENT column */}
            <View style={styles.column}>
              <Typography variant="caption" style={styles.currentColHeader}>
                CURRENT
              </Typography>

              <View style={styles.statBox}>
                <Typography variant="caption" style={styles.statLabel}>
                  Monthly Savings
                </Typography>
                <Typography variant="financial" style={styles.statAmount}>
                  ₹{baseMonthlySavings.toLocaleString()}
                </Typography>
              </View>

              <View style={styles.columnDivider} />

              <View style={styles.statBox}>
                <Typography variant="caption" style={styles.statLabel}>
                  Debt-Free Date
                </Typography>
                <Typography variant="financial" style={styles.statAmount}>
                  Mar 2028
                </Typography>
              </View>

              <View style={styles.columnDivider} />

              <View style={styles.statBox}>
                <Typography variant="caption" style={styles.statLabel}>
                  Health Score
                </Typography>
                <Typography variant="financial" style={styles.statAmount}>
                  82 / 100
                </Typography>
              </View>
            </View>

            {/* Vertical Separator */}
            <View style={styles.verticalDivider} />

            {/* SIMULATED column */}
            <View style={styles.column}>
              <Typography variant="caption" style={styles.simulatedColHeader}>
                SIMULATED
              </Typography>

              <View style={styles.statBox}>
                <Typography variant="caption" style={styles.statLabel}>
                  Monthly Savings
                </Typography>
                <View style={styles.statWithBadgeRow}>
                  <Typography variant="financial" style={styles.statAmount}>
                    ₹{simulatedMonthlySavings.toLocaleString()}
                  </Typography>
                  <View style={styles.greenBadge}>
                    <Typography variant="caption" style={styles.greenBadgeText}>
                      +₹{savingsDelta.toLocaleString()}
                    </Typography>
                  </View>
                </View>
              </View>

              <View style={styles.columnDivider} />

              <View style={styles.statBox}>
                <Typography variant="caption" style={styles.statLabel}>
                  Debt-Free Date
                </Typography>
                <View style={styles.statWithBadgeRow}>
                  <Typography variant="financial" style={styles.statAmount}>
                    Nov 2027
                  </Typography>
                  <View style={styles.greenBadge}>
                    <Typography variant="caption" style={styles.greenBadgeText}>
                      4 Mos Earlier
                    </Typography>
                  </View>
                </View>
              </View>

              <View style={styles.columnDivider} />

              <View style={styles.statBox}>
                <Typography variant="caption" style={styles.statLabel}>
                  Health Score
                </Typography>
                <View style={styles.statWithBadgeRow}>
                  <Typography variant="financial" style={styles.statAmount}>
                    {simulatedScore} / 100
                  </Typography>
                  <View style={styles.greenBadge}>
                    <Typography variant="caption" style={styles.greenBadgeText}>
                      +{healthScoreDelta} pts
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Total Interest Saved Highlight Box */}
          <View style={styles.interestSavedBanner}>
            <BarChart2 color="#FACC15" size={20} style={{ marginRight: 8 }} />
            <Typography variant="bodyBold" style={styles.interestSavedText}>
              Total Interest Saved: ₹{simulatedInterestSaved.toLocaleString()} across loan tenure
            </Typography>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.commitBtn}
          onPress={handleCommit}
          activeOpacity={0.8}
        >
          <Typography variant="bodyBold" style={styles.commitBtnText}>
            Commit to this Plan
          </Typography>
        </TouchableOpacity>

        <Typography variant="caption" color={COLORS.textSecondary} align="center" style={styles.footnote}>
          Automatically adjusts your weekly category limits and SIP mandates.
        </Typography>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  backBtn: {
    marginRight: 10,
  },
  headerTitleCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  resetBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  leversCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 20,
  },
  leversTitle: {
    fontSize: 17,
    marginBottom: 16,
    color: COLORS.text,
  },
  leverItem: {
    marginBottom: 10,
  },
  leverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  leverIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  leverName: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
  },
  leverGoldValue: {
    color: '#D6A928',
    fontSize: 14,
  },
  leverDarkValue: {
    color: COLORS.text,
    fontSize: 14,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: -6,
  },
  impactCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 20,
    marginBottom: 20,
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  impactTitle: {
    fontSize: 22,
    color: '#F8FAFC',
  },
  comparisonGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  column: {
    flex: 1,
  },
  currentColHeader: {
    color: '#9CA3AF',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  simulatedColHeader: {
    color: '#D6A928',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  statBox: {
    paddingVertical: 8,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    marginBottom: 2,
  },
  statAmount: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  statWithBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  greenBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  greenBadgeText: {
    color: '#4ADE80',
    fontSize: 11,
    fontWeight: '700',
  },
  columnDivider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 4,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#1E293B',
    marginHorizontal: 14,
  },
  interestSavedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 169, 40, 0.08)',
    borderWidth: 1,
    borderColor: '#CA8A04',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  interestSavedText: {
    flex: 1,
    color: '#FACC15',
    fontSize: 13,
  },
  commitBtn: {
    backgroundColor: '#D6A928',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  commitBtnText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  footnote: {
    fontSize: 12,
    lineHeight: 16,
  },
});
