import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { 
  TrendingUp, 
  TrendingDown, 
  Coffee, 
  Calendar, 
  AlertTriangle,
  Sparkles,
  ArrowRight
} from 'lucide-react-native';

const SEGMENTS = ['Overview', 'Trends', 'Analysis'];

export default function InsightsScreen() {
  const router = useRouter();
  const [activeSegment, setActiveSegment] = useState('Overview');

  return (
    <SafeAreaView style={styles.container}>
      {/* Unified Header */}
      <ScreenHeader 
        title="Insights" 
        showNotification
        onNotificationPress={() => router.push('/ai')}
      />

      {/* Segmented Control */}
      <View style={styles.segmentContainer}>
        <View style={styles.segmentedControl}>
          {SEGMENTS.map((segment) => {
            const isActive = activeSegment === segment;
            return (
              <TouchableOpacity 
                key={segment}
                style={[styles.segment, isActive && styles.activeSegment]}
                onPress={() => setActiveSegment(segment)}
                activeOpacity={0.8}
              >
                <Typography 
                  variant="caption" 
                  color={isActive ? COLORS.primary : COLORS.textSecondary}
                  style={styles.segmentText}
                >
                  {segment}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Insight Card */}
        <Card variant="hero" style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.heroTag}>
              <Sparkles color={COLORS.gold} size={14} strokeWidth={2} />
              <Typography variant="caption" color={COLORS.gold} style={{ marginLeft: 4 }}>
                Key Intelligence
              </Typography>
            </View>
          </View>

          <Typography variant="h2" color={COLORS.white} style={styles.heroTitle}>
            You spent ₹860
          </Typography>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.heroSubtitle}>
            Across 14 micro-transactions under ₹100 this week.
          </Typography>
          
          {/* Visual Trend sparkline container */}
          <View style={styles.graphContainer}>
            <View style={styles.barGraphRow}>
              {[35, 60, 20, 90, 45, 80, 100].map((h, i) => (
                <View key={i} style={styles.barCol}>
                  <View style={[
                    styles.barFill, 
                    { height: `${h}%` },
                    i === 6 ? styles.barHighlight : undefined
                  ]} />
                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.barLabel}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </Typography>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Structured Insight Cards */}
        <View style={styles.insightsList}>
          
          <Card style={styles.insightCard}>
            <View style={[styles.insightIconWrapper, { backgroundColor: 'rgba(220, 38, 38, 0.08)' }]}>
              <TrendingUp color={COLORS.error} size={20} strokeWidth={2} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">Food spending increased 22%</Typography>
              <Typography variant="secondary" color={COLORS.textSecondary} style={styles.insightSub}>
                Compared to your 30-day average, dining out peaked on weekends.
              </Typography>
            </View>
          </Card>

          <Card style={styles.insightCard}>
            <View style={[styles.insightIconWrapper, { backgroundColor: 'rgba(214, 169, 40, 0.12)' }]}>
              <Coffee color={COLORS.gold} size={20} strokeWidth={2} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">You visited Starbucks 8 times</Typography>
              <Typography variant="secondary" color={COLORS.textSecondary} style={styles.insightSub}>
                Total spend: ₹3,120 this month via UPI.
              </Typography>
            </View>
          </Card>

          <Card style={styles.insightCard}>
            <View style={[styles.insightIconWrapper, { backgroundColor: 'rgba(17, 24, 39, 0.06)' }]}>
              <Calendar color={COLORS.primary} size={20} strokeWidth={2} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">Most expensive day was Saturday</Typography>
              <Typography variant="secondary" color={COLORS.textSecondary} style={styles.insightSub}>
                Average spend: ₹4,500 across 3 dining and grocery payments.
              </Typography>
            </View>
          </Card>

          <Card style={styles.insightCard}>
            <View style={[styles.insightIconWrapper, { backgroundColor: 'rgba(220, 38, 38, 0.08)' }]}>
              <AlertTriangle color={COLORS.error} size={20} strokeWidth={2} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">Spending leak detected</Typography>
              <Typography variant="secondary" color={COLORS.textSecondary} style={styles.insightSub}>
                Subscription services account for 15% of your fixed expenses.
              </Typography>
            </View>
          </Card>

        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  segmentContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(17, 24, 39, 0.04)',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 9,
  },
  activeSegment: {
    backgroundColor: COLORS.surface,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 8,
  },
  heroCard: {
    marginBottom: SPACING.xl,
  },
  heroHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 169, 40, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  heroTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    marginBottom: 6,
  },
  heroSubtitle: {
    marginBottom: 20,
  },
  graphContainer: {
    height: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'flex-end',
  },
  barGraphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  barHighlight: {
    backgroundColor: COLORS.gold,
  },
  barLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 18,
  },
  insightIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  insightContent: {
    flex: 1,
  },
  insightSub: {
    marginTop: 4,
  },
});
