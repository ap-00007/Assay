import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_WHATIF_SCENARIOS, MOCK_HEALTH_SCORE } from '../../constants/mockData';
import { ArrowLeft, ChevronDown, TrendingUp } from 'lucide-react-native';

const SCENARIOS = MOCK_WHATIF_SCENARIOS;

function computeImpact(scenarioId: string, currentVal: number, newVal: number) {
  const diff = currentVal - newVal;
  switch (scenarioId) {
    case '1': // Reduce Shopping
      return {
        monthlySavings: `+₹${diff.toLocaleString('en-IN')}`,
        annualSavings: `+₹${(diff * 12).toLocaleString('en-IN')}`,
        scoreChange: '+4',
        balanceChange: `+₹${(diff * 12).toLocaleString('en-IN')}`,
        newScore: MOCK_HEALTH_SCORE.overall + 4,
        newBalance: 35400,
      };
    case '2': // Buy Laptop
      return {
        monthlySavings: `-₹${Math.abs(diff).toLocaleString('en-IN')}`,
        annualSavings: `-₹${Math.abs(diff).toLocaleString('en-IN')}`,
        scoreChange: '-5',
        balanceChange: `-₹${Math.abs(diff).toLocaleString('en-IN')}`,
        newScore: MOCK_HEALTH_SCORE.overall - 5,
        newBalance: newVal,
      };
    case '3': // Increase SIP
      return {
        monthlySavings: `-₹${Math.abs(newVal - currentVal).toLocaleString('en-IN')} (invested)`,
        annualSavings: `+₹${(newVal - currentVal) * 12 * 1.12}`,
        scoreChange: '+6',
        balanceChange: `+₹${((newVal - currentVal) * 12 * 1.12).toLocaleString('en-IN')}`,
        newScore: MOCK_HEALTH_SCORE.overall + 6,
        newBalance: 32400 - (newVal - currentVal),
      };
    default:
      return {
        monthlySavings: `+₹3,000`,
        annualSavings: `+₹36,000`,
        scoreChange: '+4',
        balanceChange: `+₹3,100`,
        newScore: 86,
        newBalance: 35400,
      };
  }
}

export default function WhatIfScreen() {
  const router = useRouter();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [currentVal, setCurrentVal] = useState(SCENARIOS[0].defaultCurrent);
  const [newVal, setNewVal] = useState(SCENARIOS[0].defaultNew);
  const [showDropdown, setShowDropdown] = useState(false);
  const [applied, setApplied] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];
  const impact = computeImpact(scenario.id, currentVal, newVal);
  const isPositive = impact.scoreChange.startsWith('+');

  const selectScenario = (idx: number) => {
    setScenarioIdx(idx);
    setCurrentVal(SCENARIOS[idx].defaultCurrent);
    setNewVal(SCENARIOS[idx].defaultNew);
    setShowDropdown(false);
    setApplied(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft color={COLORS.text} size={22} strokeWidth={1.8} />
        </TouchableOpacity>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          What-If Simulator
        </Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Scenario Picker */}
        <View style={styles.scenarioSection}>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.fieldLabel}>
            SCENARIO
          </Typography>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
            activeOpacity={0.8}
          >
            <Typography variant="bodyMedium" color={COLORS.text} style={styles.dropdownText}>
              {scenario.label}
            </Typography>
            <ChevronDown color={COLORS.textSecondary} size={18} strokeWidth={1.8} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {SCENARIOS.map((s, idx) => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.dropdownItem, idx === scenarioIdx && styles.dropdownItemActive]}
                  onPress={() => selectScenario(idx)}
                  activeOpacity={0.75}
                >
                  <Typography
                    variant="bodyMedium"
                    color={idx === scenarioIdx ? COLORS.white : COLORS.text}
                    style={styles.dropdownItemText}
                  >
                    {s.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.fieldLabel}>
                CURRENT AMOUNT
              </Typography>
              <View style={styles.inputBox}>
                <Typography variant="financial" color={COLORS.textSecondary} style={styles.rupeeSmall}>₹</Typography>
                <TextInput
                  style={styles.amountInput}
                  value={currentVal.toString()}
                  onChangeText={(v) => setCurrentVal(Number(v.replace(/\D/g, '')) || 0)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Typography variant="h2" color={COLORS.textSecondary} style={styles.inputArrow}>→</Typography>
            <View style={styles.inputGroup}>
              <Typography variant="caption" color={COLORS.success} style={styles.fieldLabel}>
                NEW AMOUNT
              </Typography>
              <View style={[styles.inputBox, styles.inputBoxNew]}>
                <Typography variant="financial" color={COLORS.success} style={styles.rupeeSmall}>₹</Typography>
                <TextInput
                  style={[styles.amountInput, { color: COLORS.success }]}
                  value={newVal.toString()}
                  onChangeText={(v) => setNewVal(Number(v.replace(/\D/g, '')) || 0)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Impact Preview */}
        <View style={styles.impactCard}>
          <View style={styles.impactHeader}>
            <TrendingUp color={isPositive ? COLORS.success : COLORS.error} size={18} strokeWidth={2} />
            <Typography variant="cardHeading" color={COLORS.text} style={styles.impactTitle}>
              Expected Impact
            </Typography>
          </View>

          <View style={styles.impactGrid}>
            <ImpactItem
              label="Monthly Savings"
              value={impact.monthlySavings}
              color={isPositive ? COLORS.success : COLORS.error}
            />
            <ImpactItem
              label="Annual Savings"
              value={impact.annualSavings}
              color={isPositive ? COLORS.success : COLORS.error}
            />
            <ImpactItem
              label="Health Score"
              value={`${MOCK_HEALTH_SCORE.overall} → ${impact.newScore}`}
              color={isPositive ? COLORS.success : COLORS.error}
              badge={`${impact.scoreChange} pts`}
            />
            <ImpactItem
              label="Projected Balance"
              value={`₹32,400 → ₹${impact.newBalance.toLocaleString('en-IN')}`}
              color={isPositive ? COLORS.success : COLORS.error}
            />
          </View>

          {/* Score bar before/after */}
          <View style={styles.scoreCompare}>
            <View style={styles.scoreRow}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.scoreLabel}>
                Before
              </Typography>
              <ProgressBar percent={MOCK_HEALTH_SCORE.overall} color={COLORS.textSecondary} height={6} />
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.scoreVal}>
                {MOCK_HEALTH_SCORE.overall}
              </Typography>
            </View>
            <View style={styles.scoreRow}>
              <Typography variant="caption" color={isPositive ? COLORS.success : COLORS.error} style={styles.scoreLabel}>
                After
              </Typography>
              <ProgressBar
                percent={impact.newScore}
                color={isPositive ? COLORS.success : COLORS.error}
                height={6}
              />
              <Typography variant="caption" color={isPositive ? COLORS.success : COLORS.error} style={styles.scoreVal}>
                {impact.newScore}
              </Typography>
            </View>
          </View>
        </View>

        {/* Confidence */}
        <View style={styles.confidenceRow}>
          <View style={styles.confDot} />
          <Typography variant="caption" color={COLORS.textSecondary}>
            Prediction confidence: 87% — based on 6 months of spending data
          </Typography>
        </View>

        {/* Apply Button */}
        <TouchableOpacity
          style={[styles.applyBtn, applied && styles.applyBtnApplied]}
          onPress={() => setApplied(true)}
          activeOpacity={0.85}
        >
          <Typography variant="bodyMedium" color={COLORS.primary} style={styles.applyText}>
            {applied ? '✓ Scenario Applied' : 'Apply This Scenario'}
          </Typography>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ImpactItem({
  label,
  value,
  color,
  badge,
}: {
  label: string;
  value: string;
  color: string;
  badge?: string;
}) {
  return (
    <View style={impactStyles.item}>
      <Typography variant="caption" color={COLORS.textSecondary} style={impactStyles.label}>
        {label}
      </Typography>
      <Typography variant="financial" color={color} style={impactStyles.value} numberOfLines={1}>
        {value}
      </Typography>
      {badge && (
        <View style={[impactStyles.badge, { backgroundColor: color + '18' }]}>
          <Typography variant="caption" color={color} style={impactStyles.badgeText}>{badge}</Typography>
        </View>
      )}
    </View>
  );
}

const impactStyles = StyleSheet.create({
  item: {
    width: '48%',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.smallRadius,
    padding: SPACING.md,
    gap: 4,
  },
  label: { fontSize: 11 },
  value: { fontSize: 14, lineHeight: 20 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 5,
  },
  badgeText: { fontSize: 10, fontFamily: FONTS.bodySemiBold },
});

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
  scroll: { paddingHorizontal: SPACING.xl, gap: SPACING.xl, paddingTop: SPACING.sm },

  scenarioSection: { gap: SPACING.sm, zIndex: 10 },
  fieldLabel: { fontSize: 10, letterSpacing: 0.6, fontFamily: FONTS.bodySemiBold },
  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md + 2,
  },
  dropdownText: { fontSize: 15 },
  dropdownMenu: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
    marginTop: 4, shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 8,
  },
  dropdownItem: {
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md + 2,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  dropdownItemActive: { backgroundColor: COLORS.primary },
  dropdownItemText: { fontSize: 14 },

  inputSection: {},
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end', gap: SPACING.md,
  },
  inputGroup: { flex: 1, gap: SPACING.sm },
  inputBox: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: COLORS.surface, borderRadius: SIZES.radius,
    borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: SPACING.base, height: 56,
  },
  inputBoxNew: { borderColor: COLORS.success + '80', backgroundColor: '#F0FDF4' },
  rupeeSmall: { fontSize: 16 },
  amountInput: {
    flex: 1, fontFamily: FONTS.bodyBold, fontSize: 20, color: COLORS.text,
  },
  inputArrow: { fontSize: 24, paddingBottom: SPACING.md, color: COLORS.border },

  impactCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.heroRadius,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.lg,
  },
  impactHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  impactTitle: { fontSize: 16 },
  impactGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm,
  },
  scoreCompare: { gap: SPACING.sm },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  scoreLabel: { width: 40, fontSize: 11 },
  scoreVal: { width: 26, textAlign: 'right', fontFamily: FONTS.bodySemiBold, fontSize: 11 },

  confidenceRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  confDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },

  applyBtn: {
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.base + 2,
    borderRadius: SIZES.radius, alignItems: 'center',
  },
  applyBtnApplied: { backgroundColor: COLORS.success },
  applyText: { fontSize: 16, fontFamily: FONTS.bodySemiBold },
});
