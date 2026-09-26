import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  Bell, 
  Calendar, 
  AlertTriangle, 
  Sparkles, 
  Mail, 
  MessageSquare 
} from 'lucide-react-native';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();

  const [emiAlerts, setEmiAlerts] = useState(true);
  const [cashFlowPressure, setCashFlowPressure] = useState(true);
  const [unusualSpend, setUnusualSpend] = useState(true);
  const [weeklyBriefing, setWeeklyBriefing] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);

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
        <Typography variant="h3" style={styles.headerTitle}>
          Notifications & Alerts
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Typography variant="secondary" color={COLORS.textSecondary} style={{ marginBottom: 16 }}>
          Configure predictive alarms to protect your liquidity buffer before recurring debits clear.
        </Typography>

        {/* Section 1: Critical Financial Alarms */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Critical Financial Alarms
        </Typography>

        <View style={styles.groupCard}>
          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#FEE2E2' }]}>
              <Calendar color="#DC2626" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">EMI & Auto-Debit Pre-Alerts</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Alert 3 days and 1 day before loan or SIP deductions.
              </Typography>
            </View>
            <Switch
              value={emiAlerts}
              onValueChange={setEmiAlerts}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
              <AlertTriangle color="#D97706" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">Cash-Flow Solvency Warning</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Alert when projected checking balance dips below ₹5,000.
              </Typography>
            </View>
            <Switch
              value={cashFlowPressure}
              onValueChange={setCashFlowPressure}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
              <Bell color="#2563EB" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">Surge & Anomaly Detection</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Notify when a transaction exceeds 2x your category baseline.
              </Typography>
            </View>
            <Switch
              value={unusualSpend}
              onValueChange={setUnusualSpend}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>
        </View>

        {/* Section 2: AI Copilot Digests */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Assay Intelligence Digests
        </Typography>

        <View style={styles.groupCard}>
          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#FAF5FF' }]}>
              <Sparkles color="#9333EA" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">Weekly AI Briefing</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Sunday summary of spend leaks and upcoming bills.
              </Typography>
            </View>
            <Switch
              value={weeklyBriefing}
              onValueChange={setWeeklyBriefing}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
              <MessageSquare color="#16A34A" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">WhatsApp Monthly Statement</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Encrypted PDF audit sent directly to your registered number.
              </Typography>
            </View>
            <Switch
              value={whatsappAlerts}
              onValueChange={setWhatsappAlerts}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#F1F5F9' }]}>
              <Mail color="#475569" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">Email Financial Audit</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Quarterly tax deduction summary & OCR receipt backup.
              </Typography>
            </View>
            <Switch
              value={emailDigest}
              onValueChange={setEmailDigest}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>
        </View>

        <View style={{ height: 60 }} />
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 17,
    marginTop: 8,
    marginBottom: 12,
    color: COLORS.text,
  },
  groupCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textCol: {
    flex: 1,
    marginRight: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});
