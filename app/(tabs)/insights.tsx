import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { TrendingUp, TrendingDown, Coffee, Calendar, AlertTriangle } from 'lucide-react-native';

const SEGMENTS = ['Overview', 'Trends', 'Analysis'];

export default function InsightsScreen() {
  const [activeSegment, setActiveSegment] = useState('Overview');

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Typography variant="h2" style={styles.title}>Insights</Typography>
        
        <View style={styles.segmentedControl}>
          {SEGMENTS.map((segment) => (
            <TouchableOpacity 
              key={segment}
              style={[styles.segment, activeSegment === segment && styles.activeSegment]}
              onPress={() => setActiveSegment(segment)}
            >
              <Typography 
                variant="bodyMedium" 
                color={activeSegment === segment ? COLORS.primary : COLORS.textMuted}
              >
                {segment}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Insight Card */}
        <Card variant="primary" style={styles.heroCard}>
          <Typography variant="h3" color={COLORS.white} style={styles.heroTitle}>
            You spent ₹860
          </Typography>
          <Typography variant="body" color={COLORS.textMuted} style={styles.heroSubtitle}>
            Across 14 transactions under ₹100 this week.
          </Typography>
          
          <View style={styles.graphPlaceholder}>
            {/* Mock graph line */}
            <View style={styles.mockGraphLine} />
          </View>
        </Card>

        {/* Insight Cards */}
        <View style={styles.insightsList}>
          
          <Card style={styles.insightCard}>
            <View style={styles.insightIconWrapper}>
              <TrendingUp color={COLORS.error} size={24} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">Food spending increased 22%</Typography>
              <Typography variant="caption" color={COLORS.textMuted} style={{marginTop: 4}}>
                Compared to last month.
              </Typography>
            </View>
          </Card>

          <Card style={styles.insightCard}>
            <View style={[styles.insightIconWrapper, { backgroundColor: 'rgba(212, 169, 55, 0.1)' }]}>
              <Coffee color={COLORS.gold} size={24} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">You visited Starbucks 8 times</Typography>
              <Typography variant="caption" color={COLORS.textMuted} style={{marginTop: 4}}>
                Total spend: ₹3,120
              </Typography>
            </View>
          </Card>

          <Card style={styles.insightCard}>
            <View style={styles.insightIconWrapper}>
              <Calendar color={COLORS.primary} size={24} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">Most expensive day was Saturday</Typography>
              <Typography variant="caption" color={COLORS.textMuted} style={{marginTop: 4}}>
                Average spend: ₹4,500
              </Typography>
            </View>
          </Card>

          <Card style={styles.insightCard}>
            <View style={[styles.insightIconWrapper, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <AlertTriangle color={COLORS.error} size={24} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="bodyBold">Spending leak detected</Typography>
              <Typography variant="caption" color={COLORS.textMuted} style={{marginTop: 4}}>
                Subscription services account for 15% of your fixed expenses.
              </Typography>
            </View>
          </Card>

        </View>

        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    marginBottom: 20,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeSegment: {
    backgroundColor: COLORS.white,
    ...SHADOWS.soft,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  heroCard: {
    marginBottom: 24,
  },
  heroTitle: {
    marginBottom: 8,
  },
  heroSubtitle: {
    marginBottom: 24,
  },
  graphPlaceholder: {
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  mockGraphLine: {
    height: 2,
    backgroundColor: COLORS.gold,
    width: '100%',
    opacity: 0.8,
  },
  insightsList: {
    gap: 16,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  insightIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightContent: {
    flex: 1,
  },
});
