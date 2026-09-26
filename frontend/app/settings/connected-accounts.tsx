import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  Trash2,
  FileCheck2,
  Calendar,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Lock,
  Building2,
  X,
  Clock,
  KeyRound,
} from 'lucide-react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { MerchantLogo } from '../../components/ui/MerchantLogo';
import { COLORS, SIZES, SPACING, FONTS } from '../../constants/theme';
import { AAService, useAAState } from '../../services/aaState';
import { SANDBOX_ACCOUNTS } from '../../types/aa';

export default function ConnectedAccountsScreen() {
  const router = useRouter();
  const aaState = useAAState();

  const [isSyncing, setIsSyncing] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Default connected account or fallback to HDFC
  const primaryAccount = aaState.connected_accounts.length > 0
    ? aaState.connected_accounts[0]
    : SANDBOX_ACCOUNTS[0];

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const newTime = await AAService.syncNow();
      setSyncFeedback(`Synchronized successfully at ${newTime.replace('Today, ', '')}`);
      setTimeout(() => setSyncFeedback(null), 3500);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConfirmDisconnect = () => {
    AAService.disconnectAccount();
    setShowDisconnectModal(false);
  };

  const handleReconnect = () => {
    AAService.reconnectAccount([SANDBOX_ACCOUNTS[0]]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Top Header Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={22} color={COLORS.primary} strokeWidth={1.8} />
        </TouchableOpacity>

        <View style={styles.badgeContainer}>
          <ShieldCheck size={14} color={COLORS.gold} strokeWidth={2} />
          <Text style={styles.badgeText}>RBI AA COMPLIANT</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Editorial Header */}
        <View style={styles.headerSection}>
          <Typography variant="pageTitle" style={styles.pageTitle}>
            Connected Accounts
          </Typography>
          <Typography variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
            Manage your consent parameters and live bank synchronizations.
          </Typography>
        </View>

        {/* Sync Feedback Banner */}
        {syncFeedback && (
          <View style={styles.feedbackBanner}>
            <CheckCircle2 size={16} color={COLORS.success} />
            <Text style={styles.feedbackText}>{syncFeedback}</Text>
          </View>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STATE A: ACCOUNT CONNECTED
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {aaState.aa_connected ? (
          <View style={styles.sectionContainer}>
            {/* Account Card */}
            <View style={styles.accountCard}>
              <View style={styles.accountTopRow}>
                <View style={styles.bankLeft}>
                  <MerchantLogo name={primaryAccount.bankKey} size={42} />
                  <View style={styles.bankDetails}>
                    <Typography variant="bodyBold" color={COLORS.primary}>
                      {primaryAccount.bankName}
                    </Typography>
                    <Typography variant="secondary" color={COLORS.textSecondary}>
                      {primaryAccount.maskedNumber}
                    </Typography>
                  </View>
                </View>

                <View style={styles.connectedBadge}>
                  <View style={styles.greenDot} />
                  <Text style={styles.connectedBadgeText}>Connected</Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.syncMetaRow}>
                <View style={styles.syncMetaCol}>
                  <Text style={styles.metaLabel}>Last synced</Text>
                  <Text style={styles.metaVal}>{aaState.aa_last_synced || 'Today, 2:30 PM'}</Text>
                </View>

                <View style={styles.syncMetaCol}>
                  <Text style={styles.metaLabel}>Available balance</Text>
                  <Text style={styles.metaValBalance}>{primaryAccount.formattedBalance}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsCard}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.actionsHeading}>
                ACCOUNT ACTIONS
              </Typography>

              {/* Action 1: Sync Now */}
              <TouchableOpacity
                style={styles.actionRow}
                activeOpacity={0.7}
                onPress={handleSyncNow}
                disabled={isSyncing}
              >
                <View style={styles.actionIconWrapper}>
                  {isSyncing ? (
                    <ActivityIndicator size="small" color={COLORS.primary} />
                  ) : (
                    <RefreshCw size={18} color={COLORS.primary} />
                  )}
                </View>
                <View style={styles.actionTextCol}>
                  <Typography variant="bodyMedium" color={COLORS.primary}>
                    {isSyncing ? 'Fetching Latest Statement...' : 'Sync Now'}
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    Fetch recent transactions & normalize balances
                  </Typography>
                </View>
              </TouchableOpacity>

              <View style={styles.rowDivider} />

              {/* Action 2: Manage Consent */}
              <TouchableOpacity
                style={styles.actionRow}
                activeOpacity={0.7}
                onPress={() => setShowConsentModal(true)}
              >
                <View style={styles.actionIconWrapper}>
                  <FileCheck2 size={18} color={COLORS.primary} />
                </View>
                <View style={styles.actionTextCol}>
                  <Typography variant="bodyMedium" color={COLORS.primary}>
                    Manage Consent
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    View permissions, valid period, and purpose
                  </Typography>
                </View>
              </TouchableOpacity>

              <View style={styles.rowDivider} />

              {/* Action 3: Disconnect Account */}
              <TouchableOpacity
                style={styles.actionRow}
                activeOpacity={0.7}
                onPress={() => setShowDisconnectModal(true)}
              >
                <View style={[styles.actionIconWrapper, styles.dangerIconWrapper]}>
                  <Trash2 size={18} color={COLORS.error} />
                </View>
                <View style={styles.actionTextCol}>
                  <Typography variant="bodyMedium" color={COLORS.error}>
                    Disconnect Account
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    Revoke data sharing & pause automatic statement imports
                  </Typography>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              STATE B: NO ACCOUNT CONNECTED
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
          <View style={styles.disconnectedContainer}>
            <View style={styles.unlinkedCard}>
              <View style={styles.unlinkedIconCircle}>
                <Building2 size={32} color={COLORS.textSecondary} strokeWidth={1.6} />
              </View>

              <Typography variant="h3" color={COLORS.primary} align="center" style={{ marginBottom: 6 }}>
                No active bank connections
              </Typography>
              <Typography variant="secondary" color={COLORS.textSecondary} align="center" style={styles.unlinkedText}>
                Connect your account via the RBI Account Aggregator to automate your transaction feeds and unlock rich cash flow insights.
              </Typography>

              <Button
                title="Connect Bank Account"
                variant="primary"
                size="lg"
                onPress={handleReconnect}
                style={{ width: '100%', marginTop: 20 }}
              />
            </View>
          </View>
        )}

        {/* Security & Regulatory Information */}
        <View style={styles.securityFooter}>
          <Lock size={15} color={COLORS.textSecondary} />
          <Typography variant="caption" color={COLORS.textSecondary} style={{ flex: 1 }}>
            Financial Information Provider (FIP) access is fully encrypted end-to-end under the RBI Account Aggregator master direction.
          </Typography>
        </View>
      </ScrollView>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL: MANAGE CONSENT DETAILS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Modal
        visible={showConsentModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConsentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Typography variant="h3" color={COLORS.primary}>
                Active Consent Artifact
              </Typography>
              <TouchableOpacity
                onPress={() => setShowConsentModal(false)}
                style={styles.modalCloseButton}
              >
                <X size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.consentArtifactBox}>
              <View style={styles.artifactRow}>
                <Text style={styles.artifactKey}>Consent Handle:</Text>
                <Text style={styles.artifactVal}>{aaState.consent_details.consentId}</Text>
              </View>
              <View style={styles.artifactRow}>
                <Text style={styles.artifactKey}>Status:</Text>
                <View style={styles.activePill}>
                  <Text style={styles.activePillText}>{aaState.aa_consent_status}</Text>
                </View>
              </View>
              <View style={styles.artifactRow}>
                <Text style={styles.artifactKey}>Purpose:</Text>
                <Text style={styles.artifactVal}>{aaState.consent_details.purpose}</Text>
              </View>
              <View style={styles.artifactRow}>
                <Text style={styles.artifactKey}>Data Range:</Text>
                <Text style={styles.artifactVal}>{aaState.consent_details.dataRange}</Text>
              </View>
              <View style={styles.artifactRow}>
                <Text style={styles.artifactKey}>Fetch Frequency:</Text>
                <Text style={styles.artifactVal}>{aaState.consent_details.fetchFrequency}</Text>
              </View>
              <View style={styles.artifactRow}>
                <Text style={styles.artifactKey}>Valid Until:</Text>
                <Text style={styles.artifactVal}>{aaState.consent_details.expiryDate}</Text>
              </View>
            </View>

            <Typography variant="caption" color={COLORS.textSecondary} style={{ marginTop: 12, marginBottom: 20 }}>
              You may revoke this consent artifact at any time. Revocation immediately ceases new statement fetching.
            </Typography>

            <Button
              title="Close"
              variant="primary"
              size="md"
              onPress={() => setShowConsentModal(false)}
            />
          </View>
        </View>
      </Modal>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL: CONFIRM DISCONNECT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Modal
        visible={showDisconnectModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDisconnectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.dangerIconCircle}>
              <AlertTriangle size={32} color={COLORS.error} />
            </View>

            <Typography variant="h3" color={COLORS.primary} align="center" style={{ marginBottom: 8 }}>
              Disconnect this account?
            </Typography>

            <Typography variant="body" color={COLORS.textSecondary} align="center" style={{ marginBottom: 24, lineHeight: 22 }}>
              ASSAY will no longer receive new financial information from this account. Your past historical analysis will be preserved.
            </Typography>

            <View style={{ gap: 10 }}>
              <Button
                title="Disconnect Account"
                variant="primary"
                size="lg"
                onPress={handleConfirmDisconnect}
                style={{ backgroundColor: COLORS.error, borderColor: COLORS.error }}
              />
              <Button
                title="Cancel"
                variant="secondary"
                size="md"
                onPress={() => setShowDisconnectModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: 12,
    marginBottom: SPACING.lg,
    height: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(214, 169, 40, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.2)',
  },
  badgeText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10,
    color: '#927014',
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: SPACING.xl,
  },
  pageTitle: {
    fontSize: 34,
    lineHeight: 42,
    color: COLORS.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: SIZES.smallRadius,
    marginBottom: 16,
  },
  feedbackText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13,
    color: COLORS.success,
  },
  sectionContainer: {
    gap: 16,
  },
  accountCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  accountTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bankDetails: {
    gap: 2,
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
  },
  connectedBadgeText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 11,
    color: COLORS.success,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  syncMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  syncMetaCol: {
    gap: 2,
  },
  metaLabel: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  metaVal: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13.5,
    color: COLORS.primary,
  },
  metaValBalance: {
    fontFamily: FONTS.bodyBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  actionsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  actionsHeading: {
    letterSpacing: 0.8,
    marginBottom: 12,
    fontFamily: FONTS.bodySemiBold,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 14,
  },
  actionIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(17, 24, 39, 0.04)',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerIconWrapper: {
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    borderColor: 'rgba(220, 38, 38, 0.2)',
  },
  actionTextCol: {
    flex: 1,
    gap: 2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
    marginLeft: 52,
  },
  disconnectedContainer: {
    marginBottom: 16,
  },
  unlinkedCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: 'center',
  },
  unlinkedIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(17, 24, 39, 0.04)',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  unlinkedText: {
    lineHeight: 21,
    maxWidth: 300,
  },
  securityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
    paddingHorizontal: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    width: '100%',
    maxWidth: 400,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consentArtifactBox: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.smallRadius,
    padding: 14,
    gap: 10,
  },
  artifactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artifactKey: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  artifactVal: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13,
    color: COLORS.primary,
  },
  activePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activePillText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 10.5,
    color: COLORS.success,
  },
  dangerIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
});
