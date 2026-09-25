import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_USER } from '../../constants/mockData';
import {
  Link,
  UserCircle,
  Tag,
  Bell,
  Lock,
  Palette,
  HelpCircle,
  Info,
  ChevronRight,
  Star,
  LogOut,
} from 'lucide-react-native';

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: Link, label: 'Accounts & Connections' },
      { icon: UserCircle, label: 'Financial Profile' },
      { icon: Tag, label: 'Categories' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications' },
      { icon: Lock, label: 'Privacy & Security' },
      { icon: Palette, label: 'Appearance' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help & Support' },
      { icon: Info, label: 'About FinCopilot' },
    ],
  },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Profile & Settings
        </Typography>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Typography variant="h2" color={COLORS.white} style={styles.avatarText}>
              {MOCK_USER.initials}
            </Typography>
          </View>
          <View style={styles.profileInfo}>
            <Typography variant="cardHeading" color={COLORS.text} style={styles.profileName}>
              {MOCK_USER.name}
            </Typography>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              {MOCK_USER.email}
            </Typography>
            <Typography variant="caption" color={COLORS.textMuted} style={styles.joinedText}>
              Member since {MOCK_USER.joinedDate}
            </Typography>
          </View>
        </View>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.sectionTitle}>
              {section.title.toUpperCase()}
            </Typography>
            <View style={styles.sectionCard}>
              {section.items.map((item, idx) => (
                <View key={item.label}>
                  <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7}>
                    <View style={styles.settingsIconWrapper}>
                      <item.icon color={COLORS.text} size={18} strokeWidth={1.8} />
                    </View>
                    <Typography variant="bodyMedium" color={COLORS.text} style={styles.settingsLabel}>
                      {item.label}
                    </Typography>
                    <ChevronRight color={COLORS.textSecondary} size={16} strokeWidth={1.8} />
                  </TouchableOpacity>
                  {idx < section.items.length - 1 && <View style={styles.rowDivider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Go Premium */}
        <TouchableOpacity style={styles.premiumCard} activeOpacity={0.85}>
          <View style={styles.premiumLeft}>
            <View style={styles.starWrapper}>
              <Star color={COLORS.primary} size={20} strokeWidth={2} fill={COLORS.primary} />
            </View>
            <View style={styles.premiumText}>
              <Typography variant="bodyMedium" color={COLORS.primary} style={styles.premiumTitle}>
                Go Premium
              </Typography>
              <Typography variant="caption" color={COLORS.primary} style={styles.premiumSub}>
                Unlock advanced insights and bank integrations.
              </Typography>
            </View>
          </View>
          <ChevronRight color={COLORS.primary} size={16} strokeWidth={2} />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/splash')}
          activeOpacity={0.75}
        >
          <LogOut color={COLORS.error} size={18} strokeWidth={1.8} />
          <Typography variant="bodyMedium" color={COLORS.error}>
            Log Out
          </Typography>
        </TouchableOpacity>

        {/* Brand Footer */}
        <View style={styles.brandFooter}>
          <View style={styles.logoMark}>
            <View style={[styles.bar, { height: 10, opacity: 0.4 }]} />
            <View style={[styles.bar, { height: 16, opacity: 0.65 }]} />
            <View style={[styles.bar, { height: 22 }]} />
            <View style={[styles.bar, { height: 16, opacity: 0.65 }]} />
            <View style={[styles.bar, { height: 10, opacity: 0.4 }]} />
          </View>
          <Typography variant="h3" color={COLORS.text} style={styles.brandName}>FinCopilot</Typography>
          <Typography variant="caption" color={COLORS.textSecondary}>Plan Smarter. Live Better.</Typography>
          <Typography variant="caption" color={COLORS.textMuted} style={styles.version}>v1.0.0</Typography>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.base,
    gap: SPACING.lg,
  },
  title: { fontSize: 28, lineHeight: 36, marginBottom: SPACING.sm },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.base,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.heroRadius,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  avatar: {
    width: 60, height: 60, borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 22, lineHeight: 28 },
  profileInfo: { flex: 1, gap: 3 },
  profileName: { fontSize: 17 },
  joinedText: { marginTop: 2 },
  section: { gap: SPACING.sm },
  sectionTitle: {
    fontSize: 10,
    letterSpacing: 0.8,
    fontFamily: FONTS.bodySemiBold,
    paddingLeft: 2,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md + 2,
  },
  settingsIconWrapper: {
    width: 34, height: 34, borderRadius: 9,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },
  settingsLabel: { flex: 1, fontSize: 14 },
  rowDivider: { height: 1, backgroundColor: COLORS.border, marginLeft: SPACING.base + 34 + SPACING.md },
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gold,
    borderRadius: SIZES.cardRadius,
    padding: SPACING.base + 2,
  },
  premiumLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, flex: 1 },
  starWrapper: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(17,24,39,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  premiumText: { flex: 1, gap: 2 },
  premiumTitle: { fontSize: 15 },
  premiumSub: { fontSize: 12, lineHeight: 17 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.base,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.error + '40',
    backgroundColor: COLORS.error + '08',
  },
  brandFooter: {
    alignItems: 'center',
    gap: SPACING.xs,
    paddingTop: SPACING.lg,
  },
  logoMark: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    marginBottom: SPACING.xs,
  },
  bar: {
    width: 6,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
  },
  brandName: { fontSize: 18, letterSpacing: -0.3 },
  version: { marginTop: SPACING.xs },
});
