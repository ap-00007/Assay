import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  Share2, 
  Bot, 
  FileText, 
  BarChart2, 
  Target, 
  Lightbulb, 
  Send,
  CheckCheck,
  Sparkles
} from 'lucide-react-native';

export default function CopilotAnalysisScreen() {
  const router = useRouter();
  const [followUp, setFollowUp] = useState('');
  const [capApplied, setCapApplied] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Assay Financial Audit: Projected liquidity trough ₹2,400 on 25 Sep. Recommendation: Cap dining to ₹2,000 to preserve ₹5,400 buffer.',
      });
    } catch (e) {
      // ignore
    }
  };

  const handleApplyCap = () => {
    setCapApplied(true);
    Alert.alert(
      'Spending Cap Applied',
      'Discretionary dining has been capped at ₹2,000 for this week. Alerts enabled.',
      [{ text: 'OK' }]
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

        <View style={styles.robotAvatar}>
          <Bot color="#FFFFFF" size={24} />
        </View>

        <View style={styles.headerTitleCol}>
          <Typography variant="h3" style={styles.headerTitle}>
            Copilot Analysis
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary}>
            Audited Financial Intelligence
          </Typography>
        </View>

        <TouchableOpacity 
          style={styles.shareBtn} 
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <Share2 color={COLORS.text} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Question */}
        <View style={styles.userBubbleWrapper}>
          <View style={styles.userBubble}>
            <Typography variant="body" color={COLORS.text}>
              Analyze my cash-flow risk for the rest of this month.
            </Typography>
          </View>
          <View style={styles.timeRow}>
            <Typography variant="caption" color={COLORS.textSecondary} style={{ fontSize: 11, marginRight: 4 }}>
              9:41 AM
            </Typography>
            <CheckCheck color="#3B82F6" size={14} />
          </View>
        </View>

        {/* Bot Introduction */}
        <View style={styles.botIntroRow}>
          <View style={styles.botMiniAvatar}>
            <Bot color="#FFFFFF" size={18} />
          </View>
          <View>
            <Typography variant="bodyBold" style={{ fontSize: 15 }}>
              Here's your financial analysis:
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary} style={{ fontSize: 11 }}>
              9:41 AM
            </Typography>
          </View>
        </View>

        {/* Structured Analysis Container */}
        <View style={styles.analysisCard}>
          {/* 1. OBSERVED FACTS */}
          <View style={styles.sectionBlock}>
            <View style={styles.badgeRow}>
              <View style={[styles.iconPill, { backgroundColor: '#EFF6FF' }]}>
                <FileText color="#2563EB" size={14} />
              </View>
              <View style={[styles.sectionBadge, { backgroundColor: '#EFF6FF' }]}>
                <Typography variant="caption" style={[styles.badgeLabel, { color: '#1D4ED8' }]}>
                  OBSERVED FACTS
                </Typography>
              </View>
            </View>

            <View style={styles.bulletItem}>
              <View style={[styles.dot, { backgroundColor: '#2563EB' }]} />
              <Typography variant="secondary" color={COLORS.text} style={styles.bulletText}>
                Current checking balance across accounts: <Typography variant="bodyBold">₹42,850</Typography>.
              </Typography>
            </View>

            <View style={styles.bulletItem}>
              <View style={[styles.dot, { backgroundColor: '#2563EB' }]} />
              <Typography variant="secondary" color={COLORS.text} style={styles.bulletText}>
                Fixed bills due before 30 Sep total <Typography variant="bodyBold">₹28,900</Typography> (Car EMI: ₹8,400, Rent: ₹18,500, Wi-Fi: ₹2,000).
              </Typography>
            </View>
          </View>

          <View style={styles.divider} />

          {/* 2. PREDICTION */}
          <View style={styles.sectionBlock}>
            <View style={styles.badgeRowBetween}>
              <View style={styles.badgeLeft}>
                <View style={[styles.iconPill, { backgroundColor: '#FFF7ED' }]}>
                  <BarChart2 color="#EA580C" size={14} />
                </View>
                <View style={[styles.sectionBadge, { backgroundColor: '#FFF7ED' }]}>
                  <Typography variant="caption" style={[styles.badgeLabel, { color: '#C2410C' }]}>
                    PREDICTION
                  </Typography>
                </View>
              </View>

              <View style={styles.confidenceBadge}>
                <Typography variant="caption" style={styles.confidenceText}>
                  89% Confidence (High)
                </Typography>
              </View>
            </View>

            <View style={styles.bulletItem}>
              <View style={[styles.dot, { backgroundColor: '#EA580C' }]} />
              <Typography variant="secondary" color={COLORS.text} style={styles.bulletText}>
                Projected liquidity will hit a trough of <Typography variant="bodyBold">₹2,400</Typography> on 25 Sep after EMI debits.
              </Typography>
            </View>

            <View style={styles.bulletItem}>
              <View style={[styles.dot, { backgroundColor: '#EA580C' }]} />
              <Typography variant="secondary" color={COLORS.text} style={styles.bulletText}>
                Discretionary dining spend is trending <Typography variant="bodyBold">24% higher</Typography> than your 90-day baseline.
              </Typography>
            </View>

            <Typography variant="caption" color={COLORS.textSecondary} style={styles.footnote}>
              Confidence based on 6 months of verified recurring bank debits.
            </Typography>
          </View>

          <View style={styles.divider} />

          {/* 3. RECOMMENDED ACTION */}
          <View style={styles.sectionBlock}>
            <View style={styles.badgeRow}>
              <View style={[styles.iconPill, { backgroundColor: '#F0FDF4' }]}>
                <Target color="#16A34A" size={14} />
              </View>
              <View style={[styles.sectionBadge, { backgroundColor: '#F0FDF4' }]}>
                <Typography variant="caption" style={[styles.badgeLabel, { color: '#15803D' }]}>
                  RECOMMENDED ACTION
                </Typography>
              </View>
            </View>

            <View style={styles.bulletItem}>
              <View style={[styles.dot, { backgroundColor: '#16A34A' }]} />
              <Typography variant="secondary" color={COLORS.text} style={styles.bulletText}>
                Cap discretionary dining to <Typography variant="bodyBold">₹2,000</Typography> this week to protect your safety reserve.
              </Typography>
            </View>

            {/* Expected Impact Highlight */}
            <View style={styles.impactBox}>
              <Lightbulb color="#D97706" size={18} style={styles.impactIcon} />
              <Typography variant="secondary" color={COLORS.text} style={styles.impactText}>
                <Typography variant="bodyBold">Expected Impact:</Typography> Preserves a <Typography variant="bodyBold">₹5,400</Typography> safe cash buffer on 25 Sep and avoids overdraft risk.
              </Typography>
            </View>

            {/* Action CTA */}
            <TouchableOpacity 
              style={[styles.applyButton, capApplied && styles.applyButtonActive]}
              onPress={handleApplyCap}
              activeOpacity={0.8}
            >
              <Typography variant="bodyBold" style={styles.applyButtonText}>
                {capApplied ? 'Spending Cap Active ✓' : 'Apply Spending Cap'}
              </Typography>
            </TouchableOpacity>

            {/* Simulate in What-If CTA */}
            <TouchableOpacity 
              style={styles.simulateButton}
              onPress={() => router.push('/simulator')}
              activeOpacity={0.8}
            >
              <Sparkles color={COLORS.text} size={16} style={{ marginRight: 8 }} />
              <Typography variant="bodyBold" color={COLORS.text} style={styles.simulateButtonText}>
                Simulate Impact in What-If
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Follow-up input bar */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask a follow-up question..."
            placeholderTextColor="#9CA3AF"
            value={followUp}
            onChangeText={setFollowUp}
          />
          <TouchableOpacity 
            style={styles.sendBtn}
            onPress={() => setFollowUp('')}
            activeOpacity={0.8}
          >
            <Send color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>
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
  robotAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.text,
  },
  shareBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  userBubbleWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  userBubble: {
    backgroundColor: '#E0E7FF',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    maxWidth: '84%',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  botIntroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  botMiniAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  analysisCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 16,
  },
  sectionBlock: {
    paddingVertical: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  badgeRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  badgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPill: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sectionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeLabel: {
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  confidenceBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    color: '#B45309',
    fontWeight: '600',
    fontSize: 11,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  footnote: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 14,
  },
  impactBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 14,
    padding: 14,
    marginVertical: 14,
  },
  impactIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  impactText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  applyButton: {
    backgroundColor: '#D6A928',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonActive: {
    backgroundColor: '#16A34A',
  },
  applyButtonText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  simulateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF9F5',
    borderWidth: 1,
    borderColor: '#D4CEB8',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 10,
  },
  simulateButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
