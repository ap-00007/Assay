import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { GoalCard } from '../../components/ui/GoalCard';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_GOALS } from '../../constants/mockData';
import { Plus, Target } from 'lucide-react-native';

export default function GoalsScreen() {
  const totalSaved = MOCK_GOALS.reduce((sum, g) => sum + g.current, 0);
  const totalTarget = MOCK_GOALS.reduce((sum, g) => sum + g.target, 0);
  const overallPct = Math.round((totalSaved / totalTarget) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Financial Goals
        </Typography>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Plus color={COLORS.white} size={20} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewLeft}>
            <View style={styles.targetIconWrapper}>
              <Target color={COLORS.gold} size={26} strokeWidth={1.8} />
            </View>
            <View style={styles.overviewText}>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Total Goals Progress
              </Typography>
              <Typography variant="cardHeading" color={COLORS.text}>
                {overallPct}% achieved
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                ₹{totalSaved.toLocaleString('en-IN')} of ₹{(totalTarget / 100000).toFixed(1)}L target
              </Typography>
            </View>
          </View>
          <View style={styles.overviewStat}>
            <Typography variant="h2" color={COLORS.gold} style={styles.goalCount}>
              {MOCK_GOALS.length}
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              active goals
            </Typography>
          </View>
        </View>

        {/* AI Tip */}
        <View style={styles.aiTip}>
          <Typography variant="caption" style={styles.aiEmoji}>💡</Typography>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.aiTipText}>
            Tip from FinCopilot: You can reach your laptop goal 2 months earlier by reducing shopping by ₹2,000/month.
          </Typography>
        </View>

        {/* Goals List */}
        <View style={styles.sectionHeader}>
          <Typography variant="cardHeading" color={COLORS.text}>Your Goals</Typography>
        </View>

        {MOCK_GOALS.map((goal) => (
          <GoalCard key={goal.id} {...goal} />
        ))}

        {/* Add Goal CTA */}
        <TouchableOpacity style={styles.addGoalCard} activeOpacity={0.75}>
          <View style={styles.addGoalIcon}>
            <Plus color={COLORS.textSecondary} size={22} strokeWidth={1.8} />
          </View>
          <View>
            <Typography variant="bodyMedium" color={COLORS.text}>Add a new goal</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Emergency fund, vacation, gadget...
            </Typography>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
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
  title: { fontSize: 28, lineHeight: 36 },
  addBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
  },
  overviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.heroRadius,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  overviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  targetIconWrapper: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: COLORS.gold + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  overviewText: { gap: 3 },
  overviewStat: { alignItems: 'center' },
  goalCount: { fontSize: 34, lineHeight: 40 },
  aiTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    backgroundColor: '#FFFBEB',
    borderRadius: SIZES.smallRadius,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  aiEmoji: { fontSize: 16 },
  aiTipText: { flex: 1, fontSize: 13, lineHeight: 19 },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  addGoalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: SPACING.base,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    marginTop: SPACING.xs,
  },
  addGoalIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
});
