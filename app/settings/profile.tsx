import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS, SIZES } from '../../constants/theme';
import { 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Building2, 
  Check, 
  Camera, 
  Lock 
} from 'lucide-react-native';
import { MerchantLogo } from '../../components/ui/MerchantLogo';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Ashish Panda');
  const [email, setEmail] = useState('ashishpanda@email.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [pan, setPan] = useState('ABCDE1234F');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
    Alert.alert('Profile Updated', 'Your identity and Account Aggregator details have been saved.');
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
        <Typography variant="h3" style={styles.headerTitle}>
          Profile
        </Typography>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.8} style={styles.saveBtn}>
          <Typography variant="bodyBold" style={{ color: COLORS.gold }}>
            {isSaved ? 'Saved ✓' : 'Save'}
          </Typography>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar Card */}
        <View style={styles.avatarSection}>
          <ProfileAvatar size={84} seed={name || 'Ashish'} editable />
          <Typography variant="h3" style={{ marginTop: 12 }}>
            {name}
          </Typography>
          <View style={styles.kycBadge}>
            <ShieldCheck color="#16A34A" size={14} />
            <Typography variant="caption" style={styles.kycText}>
              RBI KYC Verified
            </Typography>
          </View>
        </View>

        {/* Identity Details */}
        <Typography variant="cardHeading" style={styles.sectionHeader}>
          Personal Information
        </Typography>

        <View style={styles.cardGroup}>
          <View style={styles.inputRow}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.inputLabel}>
              Full Name
            </Typography>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.inputRow}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.inputLabel}>
              Email Address
            </Typography>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email Address"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.inputRow}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.inputLabel}>
              Mobile Number (Linked to AA)
            </Typography>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Mobile Number"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.inputRow}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.inputLabel}>
              PAN Verification
            </Typography>
            <TextInput
              style={styles.textInput}
              value={pan}
              onChangeText={setPan}
              autoCapitalize="characters"
              placeholder="PAN Number"
            />
          </View>
        </View>

        {/* Connected Primary Bank Account */}
        <Typography variant="cardHeading" style={styles.sectionHeader}>
          Primary Financial Entity
        </Typography>

        <View style={styles.bankCard}>
          <MerchantLogo name="hdfc" size={42} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Typography variant="bodyBold">HDFC Bank Salary Account</Typography>
            <Typography variant="caption" color={COLORS.textSecondary} style={{ marginTop: 2 }}>
              Account Number: •••• 4291 • IFSC: HDFC0001234
            </Typography>
          </View>
          <View style={styles.primaryPill}>
            <Typography variant="caption" style={styles.primaryPillText}>
              Primary
            </Typography>
          </View>
        </View>

        {/* Sign Out Action */}
        <TouchableOpacity
          style={styles.signOutBtn}
          activeOpacity={0.7}
          onPress={() => router.replace('/auth/login')}
        >
          <Lock color={COLORS.error} size={18} />
          <Typography variant="bodySemiBold" color={COLORS.error} style={{ marginLeft: 8 }}>
            Sign Out of ASSAY
          </Typography>
        </TouchableOpacity>

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
  saveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  cameraPill: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  kycBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    gap: 4,
  },
  kycText: {
    color: '#15803D',
    fontWeight: '700',
    fontSize: 11.5,
  },
  sectionHeader: {
    fontSize: 17,
    marginBottom: 12,
    color: COLORS.text,
  },
  cardGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  inputRow: {
    paddingVertical: 10,
  },
  inputLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  textInput: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  bankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  bankIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  primaryPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  primaryPillText: {
    color: '#B45309',
    fontWeight: '700',
    fontSize: 11,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: SIZES.radius,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 20,
  },
});
