import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { COLORS } from '../../constants/theme';
import { useAAState } from '../../services/aaState';
import { 
  LayoutGrid, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  Moon, 
  Globe, 
  HelpCircle, 
  MessageSquare,
  ChevronRight,
  User
} from 'lucide-react-native';

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  showDivider?: boolean;
}

function SettingRow({ icon, label, value, onPress, showDivider = false }: SettingRowProps) {
  return (
    <>
      <TouchableOpacity 
        style={styles.settingRow} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          {icon}
        </View>

        <Typography variant="body" color={COLORS.text} style={styles.rowLabel}>
          {label}
        </Typography>

        {value && (
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.rowValue}>
            {value}
          </Typography>
        )}

        <ChevronRight color={COLORS.textSecondary} size={18} />
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const aaState = useAAState();

  const handleRowClick = (title: string) => {
    Alert.alert(title, `${title} management is connected to your Assay profile.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <Typography variant="pageTitle" style={styles.pageTitle}>
          Settings
        </Typography>

        {/* Profile Card */}
        <TouchableOpacity 
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => router.push('/settings/profile')}
        >
          <ProfileAvatar size={48} seed="Ashish" style={{ marginRight: 12 }} />

          <View style={styles.profileInfo}>
            <Typography variant="bodyBold" style={styles.userName}>
              Ashish Panda
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              ashishpanda@email.com
            </Typography>
          </View>

          <ChevronRight color={COLORS.textSecondary} size={20} />
        </TouchableOpacity>

        {/* Section 1: Preferences */}
        <Typography variant="cardHeading" style={styles.sectionHeader}>
          Preferences
        </Typography>

        <View style={styles.groupedCard}>
          <SettingRow
            icon={<LayoutGrid color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Categories"
            showDivider
            onPress={() => router.push('/settings/categories')}
          />
          <SettingRow
            icon={<CreditCard color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Connected Accounts"
            value={aaState.aa_connected ? "1 Connected" : "Not Connected"}
            showDivider
            onPress={() => router.push('/settings/connected-accounts')}
          />
          <SettingRow
            icon={<Bell color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Notifications"
            showDivider
            onPress={() => router.push('/settings/notifications')}
          />
          <SettingRow
            icon={<ShieldCheck color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Privacy & PII Security"
            showDivider
            onPress={() => router.push('/settings/privacy')}
          />
          <SettingRow
            icon={<Moon color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Appearance"
            value="System"
            showDivider
            onPress={() => router.push('/settings/appearance')}
          />
          <SettingRow
            icon={<Globe color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Language"
            value="English"
            onPress={() => router.push('/settings/language')}
          />
        </View>

        {/* Section 2: Support */}
        <Typography variant="cardHeading" style={styles.sectionHeader}>
          Support
        </Typography>

        <View style={styles.groupedCard}>
          <SettingRow
            icon={<HelpCircle color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Help Center & RBI Policies"
            showDivider
            onPress={() => router.push('/settings/help')}
          />
          <SettingRow
            icon={<MessageSquare color={COLORS.text} size={20} strokeWidth={1.8} />}
            label="Send Feedback"
            onPress={() => router.push('/settings/feedback')}
          />
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 36,
    marginBottom: 20,
    color: COLORS.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 26,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    marginBottom: 2,
    color: COLORS.text,
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 12,
    color: COLORS.text,
    marginLeft: 2,
  },
  groupedCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 28,
    alignItems: 'center',
    marginRight: 12,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
  },
  rowValue: {
    fontSize: 14,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 56,
  },
});
