import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  RotateCcw, 
  Bot, 
  AlertTriangle, 
  Smartphone, 
  Calendar, 
  Send,
  CheckCheck
} from 'lucide-react-native';

export default function AffordabilityCheckScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'emi' | 'delay'>('emi');
  const [followUp, setFollowUp] = useState('');

  const handleSelectPlan = () => {
    Alert.alert(
      'Plan Selected',
      selectedPlan === 'emi'
        ? '3-Month No-Cost EMI plan configured. Auto-debits set to ₹10,000/mo.'
        : 'Reminder set for 29 Sep after ₹85,000 salary deposit.',
      [{ text: 'Great' }]
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
            Affordability Check
          </Typography>
        </View>

        <TouchableOpacity 
          style={styles.refreshBtn}
          onPress={() => setSelectedPlan('emi')}
          activeOpacity={0.7}
        >
          <RotateCcw color={COLORS.text} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Bubble */}
        <View style={styles.userBubbleWrapper}>
          <View style={styles.userBubble}>
            <Typography variant="body" color={COLORS.text}>
              Can I buy a ₹30,000 smartphone this weekend?
            </Typography>
          </View>
          <View style={styles.timeRow}>
            <Typography variant="caption" color={COLORS.textSecondary} style={{ fontSize: 11, marginRight: 4 }}>
              9:41 AM
            </Typography>
            <CheckCheck color="#3B82F6" size={14} />
          </View>
        </View>

        {/* Bot Bubble */}
        <View style={styles.botRow}>
          <View style={styles.botAvatar}>
            <Bot color="#FFFFFF" size={18} />
          </View>
          <View style={styles.botBubbleWrapper}>
            <View style={styles.botBubble}>
              <Typography variant="body" color={COLORS.text} style={styles.botText}>
                Technically you have the funds today, but purchasing upfront will trigger a cash shortfall before your next payday.
              </Typography>
            </View>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.botTime}>
              9:41 AM
            </Typography>
          </View>
        </View>

        {/* Card 1: Deficit Warning Breakdown */}
        <View style={styles.card}>
          <View style={styles.warningBanner}>
            <AlertTriangle color="#DC2626" size={18} style={{ marginRight: 8 }} />
            <Typography variant="caption" style={styles.warningBannerText}>
              Cash Deficit Warning on 25 Sep
            </Typography>
          </View>

          <View style={styles.calcRow}>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              Current Checking Balance
            </Typography>
            <Typography variant="bodyBold" color={COLORS.text}>
              ₹42,850
            </Typography>
          </View>

          <View style={styles.calcRow}>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              Immediate Purchase
            </Typography>
            <Typography variant="bodyBold" color="#DC2626">
              -₹30,000
            </Typography>
          </View>

          <View style={styles.divider} />

          <View style={styles.calcRow}>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              Remaining Balance
            </Typography>
            <Typography variant="bodyBold" color={COLORS.text}>
              ₹12,850
            </Typography>
          </View>

          <View style={styles.calcRow}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Typography variant="secondary" color={COLORS.textSecondary}>
                Upcoming Bills before 28 Sep Payday
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                (EMI + Utilities)
              </Typography>
            </View>
            <Typography variant="bodyBold" color="#DC2626">
              -₹15,200
            </Typography>
          </View>

          <View style={styles.troughBox}>
            <Typography variant="secondary" color="#DC2626" style={{ fontWeight: '600' }}>
              Projected Trough on 25 Sep
            </Typography>
            <Typography variant="bodyBold" color="#DC2626">
              -₹2,350 (Overdraft)
            </Typography>
          </View>
        </View>

        {/* Card 2: Recommended Alternatives */}
        <View style={styles.alternativesCard}>
          <Typography variant="cardHeading" style={styles.alternativesTitle}>
            Recommended Alternatives
          </Typography>

          {/* Option 1: 3-Month No-Cost EMI */}
          <TouchableOpacity 
            style={[styles.optionCard, selectedPlan === 'emi' ? styles.optionCardSelected : styles.optionCardUnselected]}
            onPress={() => setSelectedPlan('emi')}
            activeOpacity={0.8}
          >
            <View style={styles.radioContainer}>
              <View style={[styles.radioCircle, selectedPlan === 'emi' && styles.radioCircleSelected]}>
                {selectedPlan === 'emi' && <View style={styles.radioDot} />}
              </View>
            </View>

            <View style={styles.optionIconBox}>
              <Smartphone color={COLORS.text} size={20} />
            </View>

            <View style={styles.optionContent}>
              <Typography variant="bodyBold" style={styles.optionTitle}>
                3-Month No-Cost EMI (₹10,000 / mo)
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.optionSubtitle}>
                Keeps 25 Sep trough safe at +₹17,650. Zero overdraft penalty.
              </Typography>
            </View>
          </TouchableOpacity>

          {/* Option 2: Delay Purchase by 12 Days */}
          <TouchableOpacity 
            style={[styles.optionCard, selectedPlan === 'delay' ? styles.optionCardSelected : styles.optionCardUnselected]}
            onPress={() => setSelectedPlan('delay')}
            activeOpacity={0.8}
          >
            <View style={styles.radioContainer}>
              <View style={[styles.radioCircle, selectedPlan === 'delay' && styles.radioCircleSelected]}>
                {selectedPlan === 'delay' && <View style={styles.radioDot} />}
              </View>
            </View>

            <View style={styles.optionIconBox}>
              <Calendar color={COLORS.text} size={20} />
            </View>

            <View style={styles.optionContent}>
              <Typography variant="bodyBold" style={styles.optionTitle}>
                Delay Purchase by 12 Days (to 29 Sep)
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.optionSubtitle}>
                Pay in full after ₹85,000 salary clears on 28 Sep.
              </Typography>
            </View>
          </TouchableOpacity>

          {/* Select Button */}
          <TouchableOpacity 
            style={styles.selectPlanBtn}
            onPress={handleSelectPlan}
            activeOpacity={0.8}
          >
            <Typography variant="bodyBold" style={styles.selectPlanBtnText}>
              {selectedPlan === 'emi' ? 'Select No-Cost EMI Plan' : 'Select Delay Plan'}
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/debt')}
            activeOpacity={0.75}
            style={{ marginTop: 12, paddingVertical: 4, alignItems: 'center' }}
          >
            <Typography variant="caption" color={COLORS.textSecondary}>
              Check current debt & EMI commitments (₹26,900/mo) →
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Follow-up input bar */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything about this purchase..."
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
    fontSize: 22,
    color: COLORS.text,
  },
  refreshBtn: {
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
    maxWidth: '85%',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 4,
  },
  botBubbleWrapper: {
    flex: 1,
  },
  botBubble: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  botText: {
    fontSize: 15,
    lineHeight: 22,
  },
  botTime: {
    marginTop: 4,
    fontSize: 11,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 20,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  warningBannerText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 13,
  },
  calcRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  troughBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  alternativesCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 20,
  },
  alternativesTitle: {
    fontSize: 17,
    marginBottom: 16,
    color: COLORS.text,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 12,
  },
  optionCardSelected: {
    backgroundColor: '#FFFCF5',
    borderColor: '#D6A928',
  },
  optionCardUnselected: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  radioContainer: {
    marginRight: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#D6A928',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D6A928',
  },
  optionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    marginBottom: 2,
    color: COLORS.text,
  },
  optionSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  selectPlanBtn: {
    backgroundColor: '#D6A928',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  selectPlanBtnText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
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
