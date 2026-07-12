import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { COLORS, SIZES } from '../../constants/theme';
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
  ChevronRight 
} from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Typography variant="h2" style={styles.title}>Settings</Typography>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Typography variant="h3" color={COLORS.white}>A</Typography>
          </View>
          <View style={styles.profileInfo}>
            <Typography variant="h3">Ashish</Typography>
            <Typography variant="body" color={COLORS.textMuted} style={{marginTop: 4}}>
              ashish@example.com
            </Typography>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Typography variant="bodyMedium" color={COLORS.primary}>Edit</Typography>
          </TouchableOpacity>
        </Card>

        <View style={styles.section}>
          <Typography variant="bodyBold" color={COLORS.textMuted} style={styles.sectionTitle}>
            PREFERENCES
          </Typography>
          <Card style={styles.settingsListCard}>
            <SettingRow icon={<User color={COLORS.primary} size={20} />} title="Categories" />
            <SettingRow icon={<CreditCard color={COLORS.primary} size={20} />} title="Payment Methods" />
            <SettingRow icon={<Bell color={COLORS.primary} size={20} />} title="Notifications" />
            <SettingRow icon={<Shield color={COLORS.primary} size={20} />} title="Privacy" />
            <SettingRow icon={<Palette color={COLORS.primary} size={20} />} title="Appearance" />
            <SettingRow icon={<Globe color={COLORS.primary} size={20} />} title="Language" isLast />
          </Card>
        </View>

        <View style={styles.section}>
          <Typography variant="bodyBold" color={COLORS.textMuted} style={styles.sectionTitle}>
            SUPPORT
          </Typography>
          <Card style={styles.settingsListCard}>
            <SettingRow icon={<HelpCircle color={COLORS.primary} size={20} />} title="Help Center" />
            <SettingRow icon={<MessageSquare color={COLORS.primary} size={20} />} title="Send Feedback" />
            <SettingRow icon={<Info color={COLORS.primary} size={20} />} title="About Assay" isLast />
          </Card>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Typography variant="bodyMedium" color={COLORS.error}>Log Out</Typography>
        </TouchableOpacity>

        <View style={{height: 60}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingRow = ({ icon, title, isLast = false }: { icon: React.ReactNode, title: string, isLast?: boolean }) => (
  <TouchableOpacity style={[styles.settingRow, !isLast && styles.settingRowBorder]}>
    <View style={styles.settingIconWrapper}>
      {icon}
    </View>
    <Typography variant="bodyMedium" style={styles.settingTitle}>{title}</Typography>
    <ChevronRight color={COLORS.border} size={20} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingTop: 12,
  },
  title: {
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  editBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
    borderRadius: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
    marginLeft: 8,
  },
  settingsListCard: {
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  settingIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
  },
  logoutBtn: {
    alignItems: 'center',
    paddingVertical: 16,
  },
});
