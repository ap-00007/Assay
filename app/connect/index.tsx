import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
  CheckCircle2,
  Lock,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  LineChart,
  Lightbulb,
  X,
  FileCheck2,
  RefreshCw,
  Building2,
  Smartphone,
  KeyRound,
  Check,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { AASandboxBadge } from '../../components/aa/AASandboxBadge';
import { BankCardItem } from '../../components/aa/BankCardItem';
import { FetchingStepItem } from '../../components/aa/FetchingStepItem';
import { MerchantLogo } from '../../components/ui/MerchantLogo';
import { COLORS, SIZES, SPACING, FONTS } from '../../constants/theme';
import { SANDBOX_ACCOUNTS, SandboxAccount } from '../../types/aa';
import { AAService, useAAState } from '../../services/aaState';

type FlowStep = 1 | 2 | 3 | 4 | 5;
type SandboxSubStep = 'phone' | 'otp' | 'bank_select' | 'account_confirm';

export default function AccountAggregatorFlow() {
  const router = useRouter();
  const aaState = useAAState();

  const [currentStep, setCurrentStep] = useState<FlowStep>(1);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>(['acc-hdfc-4821']);

  // AA Gateway simulator internal states
  const [sandboxSubStep, setSandboxSubStep] = useState<SandboxSubStep>('phone');
  const [otpCode, setOtpCode] = useState<string>('849201');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

  // Screen 4 pipeline state
  const [fetchStage, setFetchStage] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(10);

  // Toggle account selection
  const handleToggleAccount = (id: string) => {
    setSelectedAccountIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  // Step 4 automated progression simulation
  useEffect(() => {
    if (currentStep === 4) {
      setFetchStage(1); // Consent verified
      setProgressPercent(25);

      const t1 = setTimeout(() => {
        setFetchStage(2); // Account connected
        setProgressPercent(50);
      }, 700);

      const t2 = setTimeout(() => {
        setFetchStage(3); // Fetching transactions
        setProgressPercent(75);
      }, 1500);

      const t3 = setTimeout(() => {
        setFetchStage(4); // Analyzing financial activity
        setProgressPercent(100);
      }, 2300);

      const t4 = setTimeout(() => {
        setCurrentStep(5); // Transition to success
      }, 3100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [currentStep]);

  const selectedAccounts = SANDBOX_ACCOUNTS.filter((acc) =>
    selectedAccountIds.includes(acc.id)
  );
  const selectedAccountsCount = selectedAccounts.length > 0 ? selectedAccounts.length : 1;
  const totalImportedTransactions = selectedAccountsCount * 171;

  // Handle "Set Up Later"
  const handleSetUpLater = () => {
    AAService.skipOnboarding();
    router.replace('/(tabs)');
  };

  // Handle Complete Onboarding & View Financial Health
  const handleFinishOnboarding = () => {
    AAService.completeOnboarding(selectedAccounts);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Navigation & Step Indicator */}
        <View style={styles.topNav}>
          <TouchableOpacity
            onPress={() => {
              if (currentStep > 1 && currentStep < 4) {
                setCurrentStep((prev) => (prev - 1) as FlowStep);
              } else if (currentStep === 1) {
                handleSetUpLater();
              } else {
                router.replace('/(tabs)');
              }
            }}
            style={styles.backButton}
            activeOpacity={0.7}
            accessibilityLabel="Back"
          >
            {currentStep === 5 ? (
              <X size={20} color={COLORS.primary} strokeWidth={2} />
            ) : (
              <ArrowLeft size={20} color={COLORS.primary} strokeWidth={2} />
            )}
          </TouchableOpacity>

          <View style={styles.stepPill}>
            <Text style={styles.stepPillText}>
              {currentStep === 1 && 'ONBOARDING'}
              {currentStep === 2 && 'CONSENT REVIEW'}
              {currentStep === 3 && 'AA GATEWAY (SANDBOX)'}
              {currentStep === 4 && 'DATA PIPELINE'}
              {currentStep === 5 && 'COMPLETED'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleSetUpLater}
            style={styles.skipButton}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>
              {currentStep === 1 ? 'Later' : 'Close'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCREEN 1 — FIRST-TIME AA INTRO
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 1 && (
          <View style={styles.stepContainer}>
            <View style={styles.headerSection}>
              <Typography variant="pageTitle" style={styles.pageTitle}>
                Connect your finances
              </Typography>
              <Typography variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
                Give ASSAY the financial context it needs to understand your spending, cash flow and financial health.
              </Typography>
            </View>

            {/* Three Concise Key Benefits */}
            <View style={styles.benefitsCard}>
              <View style={styles.benefitRow}>
                <View style={styles.checkIconCircle}>
                  <Check size={16} color={COLORS.gold} strokeWidth={2.8} />
                </View>
                <View style={styles.benefitTextCol}>
                  <Typography variant="bodyBold" color={COLORS.primary} style={styles.benefitTitle}>
                    Understand your spending
                  </Typography>
                  <Typography variant="secondary" color={COLORS.textSecondary}>
                    Deep categorization, merchant intelligence, and automated leak detection.
                  </Typography>
                </View>
              </View>

              <View style={styles.benefitDivider} />

              <View style={styles.benefitRow}>
                <View style={styles.checkIconCircle}>
                  <Check size={16} color={COLORS.gold} strokeWidth={2.8} />
                </View>
                <View style={styles.benefitTextCol}>
                  <Typography variant="bodyBold" color={COLORS.primary} style={styles.benefitTitle}>
                    Forecast upcoming cash flow
                  </Typography>
                  <Typography variant="secondary" color={COLORS.textSecondary}>
                    Predictive balance trajectory accounting for recurring commitments and income.
                  </Typography>
                </View>
              </View>

              <View style={styles.benefitDivider} />

              <View style={styles.benefitRow}>
                <View style={styles.checkIconCircle}>
                  <Check size={16} color={COLORS.gold} strokeWidth={2.8} />
                </View>
                <View style={styles.benefitTextCol}>
                  <Typography variant="bodyBold" color={COLORS.primary} style={styles.benefitTitle}>
                    Get personalized financial insights
                  </Typography>
                  <Typography variant="secondary" color={COLORS.textSecondary}>
                    Clear recommendations tailored to your actual observed cash flows.
                  </Typography>
                </View>
              </View>
            </View>

            {/* Privacy / Trust Section */}
            <View style={styles.trustBox}>
              <View style={styles.trustHeader}>
                <ShieldCheck size={18} color={COLORS.success} strokeWidth={2} />
                <Typography variant="bodySemiBold" color={COLORS.primary}>
                  Consent-Based Architecture
                </Typography>
              </View>
              <Typography variant="secondary" color={COLORS.textSecondary} style={styles.trustText}>
                Your data is accessed only with your consent. ASSAY uses consent-based financial data access in compliance with RBI regulations.
              </Typography>
            </View>

            {/* Primary & Secondary Action CTAs */}
            <View style={styles.actionGroup}>
              <Button
                title="Connect Account"
                variant="primary"
                size="lg"
                onPress={() => setCurrentStep(2)}
                style={styles.mainCta}
              />
              <Button
                title="Set Up Later"
                variant="secondary"
                size="md"
                onPress={handleSetUpLater}
                style={styles.secondaryCta}
              />
            </View>
          </View>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCREEN 2 — CONSENT SCREEN
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 2 && (
          <View style={styles.stepContainer}>
            <View style={styles.headerSection}>
              <Typography variant="pageTitle" style={styles.pageTitle}>
                Review your access
              </Typography>
              <Typography variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
                Review the consent parameters requested by ASSAY before proceeding to the Account Aggregator gateway.
              </Typography>
            </View>

            {/* Consent Details Card */}
            <View style={styles.consentCard}>
              {/* Data Requested */}
              <View style={styles.consentSection}>
                <Typography variant="caption" color={COLORS.textSecondary} style={styles.sectionHeading}>
                  DATA REQUESTED
                </Typography>
                
                <View style={styles.checkItem}>
                  <CheckCircle2 size={18} color={COLORS.success} strokeWidth={2.2} />
                  <Typography variant="bodyMedium" color={COLORS.primary} style={styles.checkText}>
                    Account information
                  </Typography>
                </View>

                <View style={styles.checkItem}>
                  <CheckCircle2 size={18} color={COLORS.success} strokeWidth={2.2} />
                  <Typography variant="bodyMedium" color={COLORS.primary} style={styles.checkText}>
                    Transaction history
                  </Typography>
                </View>

                <View style={styles.checkItem}>
                  <CheckCircle2 size={18} color={COLORS.success} strokeWidth={2.2} />
                  <Typography variant="bodyMedium" color={COLORS.primary} style={styles.checkText}>
                    Balance information
                  </Typography>
                </View>
              </View>

              <View style={styles.consentDivider} />

              {/* Data Period */}
              <View style={styles.consentSection}>
                <Typography variant="caption" color={COLORS.textSecondary} style={styles.sectionHeading}>
                  DATA PERIOD
                </Typography>
                <View style={styles.parameterBadgeBox}>
                  <Calendar size={18} color={COLORS.primary} strokeWidth={1.8} />
                  <Typography variant="bodySemiBold" color={COLORS.primary} style={{ marginLeft: 10 }}>
                    Last 6 months
                  </Typography>
                </View>
              </View>

              <View style={styles.consentDivider} />

              {/* Purpose */}
              <View style={styles.consentSection}>
                <Typography variant="caption" color={COLORS.textSecondary} style={styles.sectionHeading}>
                  PURPOSE OF ACCESS
                </Typography>
                <View style={styles.purposeBox}>
                  <Typography variant="bodyBold" color={COLORS.primary}>
                    "Personal Financial Management"
                  </Typography>
                  <Typography variant="secondary" color={COLORS.textSecondary} style={{ marginTop: 6 }}>
                    ASSAY uses this information to analyze your financial health and provide personalized insights.
                  </Typography>
                </View>
              </View>
            </View>

            {/* CTAs */}
            <View style={styles.actionGroup}>
              <Button
                title="Continue to Consent"
                variant="primary"
                size="lg"
                onPress={() => {
                  setSandboxSubStep('phone');
                  setCurrentStep(3);
                }}
                style={styles.mainCta}
              />
              <Button
                title="Cancel"
                variant="secondary"
                size="md"
                onPress={() => setCurrentStep(1)}
                style={styles.secondaryCta}
              />
            </View>
          </View>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCREEN 3 — AA SANDBOX GATEWAY (External Mock UI)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 3 && (
          <View style={styles.stepContainer}>
            {/* Visually separate sandbox frame */}
            <View style={styles.sandboxFrame}>
              <View style={styles.sandboxGatewayHeader}>
                <View style={styles.sandboxHeaderLeft}>
                  <Building2 size={16} color="#475569" />
                  <Text style={styles.sandboxHeaderText}>RBI ACCOUNT AGGREGATOR GATEWAY</Text>
                </View>
                <View style={styles.sandboxBadgePill}>
                  <Text style={styles.sandboxBadgeText}>SANDBOX</Text>
                </View>
              </View>

              <View style={styles.sandboxContent}>
                {/* Sub-step 1: Mobile Verification */}
                {sandboxSubStep === 'phone' && (
                  <View style={styles.sandboxStepInner}>
                    <Typography variant="h3" color={COLORS.primary} style={styles.gatewayTitle}>
                      Verify your mobile number
                    </Typography>
                    <Typography variant="secondary" color={COLORS.textSecondary} style={styles.gatewaySubtitle}>
                      An OTP will be sent to the number registered with your financial institutions.
                    </Typography>

                    <View style={styles.phoneInputRow}>
                      <View style={styles.countryCodeBox}>
                        <Text style={styles.countryCodeText}>+91</Text>
                      </View>
                      <View style={styles.phoneDisplayBox}>
                        <Smartphone size={16} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
                        <Text style={styles.phoneDisplayText}>98765 43210</Text>
                      </View>
                    </View>

                    <Button
                      title="Send OTP"
                      variant="primary"
                      size="md"
                      onPress={() => setSandboxSubStep('otp')}
                      style={{ marginTop: 16 }}
                    />
                  </View>
                )}

                {/* Sub-step 2: OTP Entry */}
                {sandboxSubStep === 'otp' && (
                  <View style={styles.sandboxStepInner}>
                    <Typography variant="h3" color={COLORS.primary} style={styles.gatewayTitle}>
                      Enter 6-digit OTP
                    </Typography>
                    <Typography variant="secondary" color={COLORS.textSecondary} style={styles.gatewaySubtitle}>
                      Sent to +91 98765 43210 (Demo auto-filled)
                    </Typography>

                    <View style={styles.otpBoxesRow}>
                      {['8', '4', '9', '2', '0', '1'].map((digit, idx) => (
                        <View key={idx} style={styles.otpBox}>
                          <Text style={styles.otpDigit}>{digit}</Text>
                        </View>
                      ))}
                    </View>

                    <Button
                      title={isVerifyingOtp ? "Verifying Token..." : "Verify OTP & Discover Accounts"}
                      variant="primary"
                      size="md"
                      loading={isVerifyingOtp}
                      onPress={() => {
                        setIsVerifyingOtp(true);
                        setTimeout(() => {
                          setIsVerifyingOtp(false);
                          setSandboxSubStep('bank_select');
                        }, 600);
                      }}
                      style={{ marginTop: 16 }}
                    />
                  </View>
                )}

                {/* Sub-step 3: Bank & Account Selection */}
                {sandboxSubStep === 'bank_select' && (
                  <View style={styles.sandboxStepInner}>
                    <Typography variant="h3" color={COLORS.primary} style={styles.gatewayTitle}>
                      Select Linked Bank Accounts
                    </Typography>
                    <Typography variant="secondary" color={COLORS.textSecondary} style={styles.gatewaySubtitle}>
                      Discovered accounts associated with your mobile identity.
                    </Typography>

                    <View style={styles.bankCardsContainer}>
                      {SANDBOX_ACCOUNTS.slice(0, 3).map((account) => (
                        <BankCardItem
                          key={account.id}
                          account={account}
                          isSelected={selectedAccountIds.includes(account.id)}
                          onToggle={handleToggleAccount}
                        />
                      ))}
                    </View>

                    <Button
                      title="Proceed with Selected Account"
                      variant="primary"
                      size="md"
                      onPress={() => setSandboxSubStep('account_confirm')}
                      style={{ marginTop: 10 }}
                    />
                  </View>
                )}

                {/* Sub-step 4: Final Consent Approval */}
                {sandboxSubStep === 'account_confirm' && (
                  <View style={styles.sandboxStepInner}>
                    <Typography variant="h3" color={COLORS.primary} style={styles.gatewayTitle}>
                      Confirm & Authorize Consent
                    </Typography>
                    <Typography variant="secondary" color={COLORS.textSecondary} style={styles.gatewaySubtitle}>
                      You are granting read-only consent to ASSAY for the selected account(s).
                    </Typography>

                    <View style={styles.consentSummarySnippet}>
                      <View style={styles.snippetRow}>
                        <Text style={styles.snippetLabel}>FIU Entity:</Text>
                        <Text style={styles.snippetVal}>ASSAY Financial</Text>
                      </View>
                      <View style={styles.snippetRow}>
                        <Text style={styles.snippetLabel}>Accounts:</Text>
                        <Text style={styles.snippetVal}>{selectedAccountsCount} selected</Text>
                      </View>
                      <View style={styles.snippetRow}>
                        <Text style={styles.snippetLabel}>Data Types:</Text>
                        <Text style={styles.snippetVal}>Profile, Balance, History</Text>
                      </View>
                      <View style={styles.snippetRow}>
                        <Text style={styles.snippetLabel}>Validity:</Text>
                        <Text style={styles.snippetVal}>1 Year (Revocable anytime)</Text>
                      </View>
                    </View>

                    <Button
                      title="Approve Consent & Return to ASSAY"
                      variant="gold"
                      size="lg"
                      onPress={() => setCurrentStep(4)}
                      style={{ marginTop: 14 }}
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Disclaimers */}
            <View style={styles.securityNotice}>
              <Lock size={14} color={COLORS.textSecondary} />
              <Typography variant="caption" color={COLORS.textSecondary}>
                ASSAY does not collect or store actual bank passwords.
              </Typography>
            </View>
          </View>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCREEN 4 — PROGRESS PIPELINE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 4 && (
          <View style={styles.stepContainer}>
            <View style={styles.headerSection}>
              <Typography variant="pageTitle" style={styles.pageTitle}>
                Connecting your account...
              </Typography>
              <Typography variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
                Normalizing statement data and computing financial health indicators.
              </Typography>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
            </View>

            {/* Checklist Pipeline */}
            <View style={styles.fetchingCard}>
              <FetchingStepItem
                label="Consent approved"
                status={fetchStage >= 1 ? 'completed' : 'active'}
                detail="AA Consent Token #AA-2026-9812 validated."
              />
              <FetchingStepItem
                label="Account connected"
                status={fetchStage >= 2 ? 'completed' : fetchStage === 1 ? 'active' : 'pending'}
                detail={`${selectedAccountsCount} bank entity handshake confirmed.`}
              />
              <FetchingStepItem
                label="Fetching financial data"
                status={fetchStage >= 3 ? 'completed' : fetchStage === 2 ? 'active' : 'pending'}
                detail="Receiving encrypted statement payload (Last 6 months)."
              />
              <FetchingStepItem
                label="Analyzing transactions"
                status={fetchStage >= 4 ? 'completed' : fetchStage === 3 ? 'active' : 'pending'}
                detail="Categorizing spend, cash flow trends, and recurring leaks."
                isLast
              />
            </View>

            <View style={styles.fetchingNote}>
              <RefreshCw size={14} color={COLORS.textMuted} />
              <Typography variant="caption" color={COLORS.textMuted}>
                Encrypted with AES-256 GCM in compliance with Account Aggregator specs.
              </Typography>
            </View>
          </View>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCREEN 5 — DATA IMPORT SUCCESS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 5 && (
          <View style={styles.stepContainer}>
            <View style={styles.successIconCircle}>
              <CheckCircle2 size={40} color={COLORS.success} strokeWidth={2} />
            </View>

            <View style={styles.headerSectionCenter}>
              <Typography variant="pageTitle" align="center" style={styles.pageTitle}>
                Your financial picture is ready.
              </Typography>
              <Typography variant="body" color={COLORS.textSecondary} align="center" style={styles.subtitleCenter}>
                ASSAY analyzed your recent financial activity to build your first financial health overview.
              </Typography>
            </View>

            {/* Metrics Summary Card */}
            <View style={styles.metricCard}>
              <View style={styles.metricRow}>
                <View style={styles.metricItem}>
                  <Typography variant="display" color={COLORS.primary} style={styles.metricNumber}>
                    {selectedAccountsCount}
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.metricLabel}>
                    account connected
                  </Typography>
                </View>

                <View style={styles.metricDivider} />

                <View style={styles.metricItem}>
                  <Typography variant="display" color={COLORS.primary} style={styles.metricNumber}>
                    342
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.metricLabel}>
                    transactions analyzed
                  </Typography>
                </View>

                <View style={styles.metricDivider} />

                <View style={styles.metricItem}>
                  <Typography variant="display" color={COLORS.primary} style={styles.metricNumber}>
                    6
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.metricLabel}>
                    months of activity
                  </Typography>
                </View>
              </View>
            </View>

            {/* Observed & Actionable Badges */}
            <View style={styles.highlightsContainer}>
              <View style={styles.highlightBadgeCard}>
                <View style={styles.highlightHeader}>
                  <View style={styles.observedPill}>
                    <Text style={styles.observedText}>OBSERVED</Text>
                  </View>
                  <Typography variant="bodySemiBold" color={COLORS.primary}>
                    ₹1,66,930 Total Reserves
                  </Typography>
                </View>
                <Typography variant="secondary" color={COLORS.textSecondary}>
                  Liquid bank balance and monthly income streams synchronized.
                </Typography>
              </View>

              <View style={styles.highlightBadgeCard}>
                <View style={styles.highlightHeader}>
                  <View style={styles.recommendedPill}>
                    <Text style={styles.recommendedText}>ACTIONABLE</Text>
                  </View>
                  <Typography variant="bodySemiBold" color={COLORS.primary}>
                    3 Spending Leaks Detected
                  </Typography>
                </View>
                <Typography variant="secondary" color={COLORS.textSecondary}>
                  ASSAY identified ₹1,450 in recurring micro-transactions ready for review.
                </Typography>
              </View>
            </View>

            {/* CTA */}
            <Button
              title="View My Financial Health"
              variant="primary"
              size="lg"
              onPress={handleFinishOnboarding}
              style={styles.mainCta}
            />
          </View>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SCREEN TESTER TOOLBAR (Sandbox Testing)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>SANDBOX TESTING CONTROLS</Text>
          <View style={styles.demoPillsRow}>
            {[1, 2, 3, 4, 5].map((step) => (
              <TouchableOpacity
                key={step}
                style={[
                  styles.demoPill,
                  currentStep === step && styles.demoPillActive,
                ]}
                onPress={() => setCurrentStep(step as FlowStep)}
              >
                <Text
                  style={[
                    styles.demoPillText,
                    currentStep === step && styles.demoPillTextActive,
                  ]}
                >
                  Step {step}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.demoPill, { borderColor: COLORS.error }]}
              onPress={() => {
                AAService.resetState();
                setCurrentStep(1);
              }}
            >
              <Text style={[styles.demoPillText, { color: COLORS.error }]}>Reset State</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 12,
    paddingBottom: 40,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 44,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  stepPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(17, 24, 39, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepPillText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10.5,
    color: COLORS.primary,
    letterSpacing: 0.8,
  },
  stepContainer: {
    marginTop: 4,
  },
  headerSection: {
    marginBottom: SPACING.xl,
  },
  headerSectionCenter: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 34,
    lineHeight: 42,
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  subtitleCenter: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
    maxWidth: 320,
  },
  benefitsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  checkIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(214, 169, 40, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  benefitTextCol: {
    flex: 1,
    gap: 2,
  },
  benefitTitle: {
    fontSize: 15,
    marginBottom: 2,
  },
  benefitDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
    marginLeft: 42,
  },
  trustBox: {
    backgroundColor: '#FCFAF5',
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.3)',
    padding: 16,
    marginBottom: SPACING.xl,
  },
  trustHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  trustText: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  actionGroup: {
    gap: 10,
    marginTop: 4,
  },
  mainCta: {
    height: 52,
    borderRadius: SIZES.radius,
  },
  secondaryCta: {
    height: 48,
    borderRadius: SIZES.radius,
  },
  consentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  consentSection: {
    paddingVertical: 2,
  },
  sectionHeading: {
    letterSpacing: 0.8,
    marginBottom: 12,
    fontFamily: FONTS.bodySemiBold,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  checkText: {
    fontSize: 15,
  },
  consentDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  parameterBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.smallRadius,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  purposeBox: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.smallRadius,
    padding: 14,
  },
  sandboxFrame: {
    backgroundColor: '#0F172A',
    borderRadius: SIZES.cardRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  sandboxGatewayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  sandboxHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sandboxHeaderText: {
    color: '#94A3B8',
    fontSize: 11,
    fontFamily: FONTS.bodySemiBold,
    letterSpacing: 0.5,
  },
  sandboxBadgePill: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sandboxBadgeText: {
    color: '#000000',
    fontSize: 9.5,
    fontFamily: FONTS.bodyBold,
    letterSpacing: 0.5,
  },
  sandboxContent: {
    backgroundColor: COLORS.surface,
    padding: 20,
  },
  sandboxStepInner: {
    gap: 10,
  },
  gatewayTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  gatewaySubtitle: {
    fontSize: 13.5,
    lineHeight: 19,
    marginBottom: 8,
  },
  phoneInputRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  countryCodeBox: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: SIZES.smallRadius,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  countryCodeText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  phoneDisplayBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: SIZES.smallRadius,
    paddingHorizontal: 14,
    height: 48,
  },
  phoneDisplayText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15,
    color: COLORS.primary,
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  otpBox: {
    width: 44,
    height: 50,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpDigit: {
    fontSize: 20,
    fontFamily: FONTS.bodyBold,
    color: COLORS.primary,
  },
  bankCardsContainer: {
    marginVertical: 6,
  },
  consentSummarySnippet: {
    backgroundColor: '#F8FAFC',
    borderRadius: SIZES.smallRadius,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 8,
    marginTop: 4,
  },
  snippetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  snippetLabel: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  snippetVal: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13,
    color: COLORS.primary,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: SPACING.xl,
  },
  progressContainer: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  fetchingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  fetchingNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  successIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  metricCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 20,
    paddingHorizontal: 14,
    marginBottom: SPACING.xl,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 2,
  },
  metricLabel: {
    textAlign: 'center',
    lineHeight: 16,
  },
  metricDivider: {
    width: 1,
    height: 38,
    backgroundColor: COLORS.border,
  },
  highlightsContainer: {
    gap: 12,
    marginBottom: SPACING.xxl,
  },
  highlightBadgeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 6,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  observedPill: {
    backgroundColor: 'rgba(17, 24, 39, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  observedText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 9.5,
    color: COLORS.primary,
    letterSpacing: 0.6,
  },
  recommendedPill: {
    backgroundColor: 'rgba(214, 169, 40, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  recommendedText: {
    fontFamily: FONTS.bodyBold,
    fontSize: 9.5,
    color: '#927014',
    letterSpacing: 0.6,
  },
  demoSection: {
    marginTop: SPACING.xxxl,
    paddingTop: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  demoTitle: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10.5,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  demoPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  demoPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(17, 24, 39, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  demoPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  demoPillText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  demoPillTextActive: {
    color: COLORS.white,
    fontFamily: FONTS.bodySemiBold,
  },
});
