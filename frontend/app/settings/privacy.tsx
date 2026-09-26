import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileKey, 
  Trash2, 
  Fingerprint,
  ExternalLink
} from 'lucide-react-native';

export default function PrivacyScreen() {
  const router = useRouter();

  const [biometricLock, setBiometricLock] = useState(true);
  const [maskPii, setMaskPii] = useState(true);
  const [readOnlyConsent, setReadOnlyConsent] = useState(true);

  const handleRevokeConsent = () => {
    Alert.alert(
      'Revoke Account Aggregator Consent?',
      'Revoking consent will disconnect your bank synchronization and disable automated solvency forecasts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Revoke Consent', 
          style: 'destructive',
          onPress: () => {
            setReadOnlyConsent(false);
            Alert.alert('Consent Revoked', 'Assay has erased cached session tokens in compliance with RBI regulations.');
          }
        }
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Local Financial Cache?',
      'Your scanned receipt images and temporary cache will be flushed. Server data remains encrypted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear Cache', onPress: () => Alert.alert('Cache Cleared', '14.2 MB of temporary receipt cache freed.') }
      ]
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
        <Typography variant="h3" style={styles.headerTitle}>
          Privacy & Security
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Compliance Certification Banner */}
        <View style={styles.securityBanner}>
          <ShieldCheck color="#16A34A" size={28} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold" style={{ color: '#166534' }}>
              RBI-Regulated Data Privacy
            </Typography>
            <Typography variant="caption" style={{ color: '#15803D', marginTop: 2 }}>
              Bank-grade 256-bit AES encryption. Zero net-banking password storage. Read-only financial synchronization.
            </Typography>
          </View>
        </View>

        {/* Section 1: Access Controls */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          App Security & Biometrics
        </Typography>

        <View style={styles.groupCard}>
          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
              <Fingerprint color="#2563EB" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">Biometric App Lock</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Require Face ID / Fingerprint on launch.
              </Typography>
            </View>
            <Switch
              value={biometricLock}
              onValueChange={setBiometricLock}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
              <EyeOff color="#D97706" size={20} />
            </View>
            <View style={styles.textCol}>
              <Typography variant="bodyBold">Mask Account & PII Data</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Hide account numbers and sensitive names in screenshots.
              </Typography>
            </View>
            <Switch
              value={maskPii}
              onValueChange={setMaskPii}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>
        </View>

        {/* Section 2: Account Aggregator Consents */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Account Aggregator (AA) Mandate
        </Typography>

        <View style={styles.groupCard}>
          <View style={styles.consentHeader}>
            <FileKey color="#0F172A" size={22} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Typography variant="bodyBold">Active Financial Consent</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Consent ID: AA-2026-09-882194
              </Typography>
            </View>
            <View style={styles.activeTag}>
              <Typography variant="caption" style={styles.activeTagText}>
                {readOnlyConsent ? 'Active' : 'Revoked'}
              </Typography>
            </View>
          </View>

          <Typography variant="caption" color={COLORS.textSecondary} style={{ marginVertical: 10, lineHeight: 16 }}>
            Allows Assay read-only access to transaction streams and liability schedules across HDFC, ICICI, and Axis Bank.
          </Typography>

          <TouchableOpacity 
            style={styles.revokeBtn}
            onPress={handleRevokeConsent}
            activeOpacity={0.8}
          >
            <Typography variant="caption" style={styles.revokeText}>
              Revoke Consent in 1-Click
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Section 3: Data Hygiene */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Storage & Hygiene
        </Typography>

        <TouchableOpacity 
          style={styles.clearCard}
          onPress={handleClearCache}
          activeOpacity={0.75}
        >
          <Trash2 color="#DC2626" size={20} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold" color="#DC2626">
              Clear Offline Receipt Cache
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Frees local storage without deleting server-backed data.
            </Typography>
          </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
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
    paddingVertical: 8,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
  consentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
  },
  activeTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeTagText: {
    color: '#15803D',
    fontWeight: '700',
    fontSize: 11,
  },
  revokeBtn: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  revokeText: {
    color: '#B91C1C',
    fontWeight: '700',
    fontSize: 12,
  },
  clearCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    padding: 16,
    marginBottom: 20,
  },
});
