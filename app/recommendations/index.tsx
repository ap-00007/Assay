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
import { RecommendationCard } from '../../components/ui/RecommendationCard';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_RECOMMENDATIONS } from '../../constants/mockData';
import { ArrowLeft, Lightbulb } from 'lucide-react-native';

export default function RecommendationsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'foryou' | 'whatif'>('foryou');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft color={COLORS.text} size={22} strokeWidth={1.8} />
        </TouchableOpacity>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Recommendations
        </Typography>
      </View>

      {/* Tab */}
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {[{ key: 'foryou', label: 'For You' }, { key: 'whatif', label: 'What-If' }].map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabBtn, tab === t.key && styles.tabBtnActive]}
              onPress={() => {
                if (t.key === 'whatif') router.push('/whatif');
                else setTab(t.key as 'foryou');
              }}
              activeOpacity={0.75}
            >
              <Typography
                variant="bodyMedium"
                color={tab === t.key ? COLORS.white : COLORS.textSecondary}
                style={styles.tabText}
              >
                {t.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero Impact Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIcon}>
            <Lightbulb color={COLORS.gold} size={24} strokeWidth={1.8} />
          </View>
          <View style={styles.heroText}>
            <Typography variant="cardHeading" color={COLORS.white} style={styles.heroTitle}>
              5 ways to improve your finances
            </Typography>
            <Typography variant="secondary" style={styles.heroSubtitle}>
              Potential annual savings: up to ₹54,000
            </Typography>
          </View>
        </View>

        {/* Recommendations */}
        <Typography variant="cardHeading" color={COLORS.text} style={styles.sectionTitle}>
          Personalized for you
        </Typography>

        {MOCK_RECOMMENDATIONS.map((rec) => (
          <RecommendationCard
            key={rec.id}
            icon={rec.icon}
            title={rec.title}
            subtitle={rec.subtitle}
            impact={rec.impact}
            impactColor={rec.impactColor}
            onPress={() => router.push('/whatif')}
          />
        ))}

        {/* Before / After Example */}
        <View style={styles.beforeAfterCard}>
          <Typography variant="cardHeading" color={COLORS.text} style={styles.baTitle}>
            Expected Impact Example
          </Typography>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.baSub}>
            Reduce shopping by ₹3,000/month
          </Typography>

          <View style={styles.baRow}>
            <View style={styles.baItem}>
              <Typography variant="caption" color={COLORS.textSecondary}>Before</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>Monthly Savings</Typography>
              <Typography variant="financial" color={COLORS.text} style={styles.baValue}>₹18,000</Typography>
            </View>
            <Typography variant="h2" color={COLORS.textSecondary} style={styles.baArrow}>→</Typography>
            <View style={styles.baItem}>
              <Typography variant="caption" color={COLORS.success}>After</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>Monthly Savings</Typography>
              <Typography variant="financial" color={COLORS.success} style={styles.baValue}>₹21,000</Typography>
            </View>
          </View>

          <View style={styles.baBadge}>
            <Typography variant="caption" color={COLORS.success} style={styles.baBadgeText}>
              +₹36,000 annually
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

  heroBanner: {
    flexDirection: 'row', gap: SPACING.md, alignItems: 'center',
    backgroundColor: COLORS.primary, borderRadius: SIZES.heroRadius, padding: SPACING.lg,
  },
  heroIcon: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: 'rgba(214,169,40,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  heroText: { flex: 1, gap: 4 },
  heroTitle: { color: COLORS.white, fontSize: 15 },
  heroSubtitle: { color: 'rgba(255,255,255,0.65)', fontSize: 13 },

  sectionTitle: { marginBottom: -SPACING.sm },

  beforeAfterCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm,
  },
  baTitle: { fontSize: 15 },
  baSub: { fontSize: 13 },
  baRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.background, borderRadius: 12,
    padding: SPACING.md, marginTop: SPACING.sm,
  },
  baItem: { alignItems: 'center', gap: 3 },
  baValue: { fontSize: 18, marginTop: 2 },
  baArrow: { fontSize: 24, color: COLORS.border },
  baBadge: {
    alignSelf: 'center',
    backgroundColor: COLORS.success + '15',
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs + 2,
    borderRadius: 8,
  },
  baBadgeText: { fontFamily: FONTS.bodySemiBold, fontSize: 13 },
});
