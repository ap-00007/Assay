import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle, 
  MessageSquare, 
  Info, 
  ChevronRight,
  LogOut
} from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Unified Header */}
      <ScreenHeader 
        title="Settings" 
        showNotification={false}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Typography variant="bodyBold" color={COLORS.white} style={{ fontSize: 18 }}>
              A
            </Typography>
          </View>
          <View style={styles.profileInfo}>
            <Typography variant="bodyBold" style={styles.profileName}>
              Ashish
            </Typography>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              ashish@example.com
            </Typography>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <Typography variant="caption" color={COLORS.primary} style={{ fontWeight: '600' }}>
              Edit
            </Typography>
          </TouchableOpacity>
        </Card>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.sectionTitle}>
            PREFERENCES
          </Typography>
          <Card variant="list" style={styles.settingsListCard}>
            <SettingRow icon={<User color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Categories" />
            <SettingRow icon={<CreditCard color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Payment Methods" />
            <SettingRow icon={<Bell color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Notifications" />
            <SettingRow icon={<Shield color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Privacy" />
            <SettingRow icon={<Palette color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Appearance" />
            <SettingRow icon={<Globe color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Language" isLast />
          </Card>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.sectionTitle}>
            SUPPORT
          </Typography>
          <Card variant="list" style={styles.settingsListCard}>
            <SettingRow icon={<HelpCircle color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Help Center" />
            <SettingRow icon={<MessageSquare color={COLORS.primary} size={18} strokeWidth={1.8} />} title="Send Feedback" />
            <SettingRow icon={<Info color={COLORS.primary} size={18} strokeWidth={1.8} />} title="About Assay" isLast />
          </Card>
        </View>

        {/* Log Out */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          activeOpacity={0.7}
          onPress={() => router.replace('/')}
        >
          <LogOut color={COLORS.error} size={16} strokeWidth={1.8} />
          <Typography variant="bodyMedium" color={COLORS.error} style={{ marginLeft: 8 }}>
            Log Out
          </Typography>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingRow = ({ 
  icon, 
  title, 
  isLast = false 
}: { 
  icon: React.ReactNode; 
  title: string; 
  isLast?: boolean;
}) => (
  <TouchableOpacity style={[styles.settingRow, !isLast && styles.settingRowBorder]} activeOpacity={0.7}>
    <View style={styles.settingIconWrapper}>
      {icon}
    </View>
    <Typography variant="bodyMedium" style={styles.settingTitle}>
      {title}
    </Typography>
    <ChevronRight color={COLORS.textSecondary} size={18} strokeWidth={1.8} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    marginBottom: 2,
  },
  editBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  settingsListCard: {
    marginBottom: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingTitle: {
    flex: 1,
    fontSize: 15,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
});
