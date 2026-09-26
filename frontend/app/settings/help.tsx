import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ShieldCheck, 
  Mail, 
  Phone, 
  FileText,
  ExternalLink 
} from 'lucide-react-native';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'How does Assay connect to my bank without passwords?',
    answer: 'Assay connects via the Reserve Bank of India (RBI) Account Aggregator (AA) framework. You provide an OTP-verified mandate directly from your bank. Assay never asks for, sees, or stores your net-banking credentials or card CVVs.',
  },
  {
    id: '2',
    question: 'How accurate is receipt OCR extraction?',
    answer: 'Assay uses dual-pass computer vision with fuzzy merchant matching to normalize names (e.g. Starbucks, Uber), separate tax/tip lines, and automatically link paper receipts to your digital UPI debit streams.',
  },
  {
    id: '3',
    question: 'How are solvency warnings and cash dips calculated?',
    answer: 'Our Copilot AI aggregates your historical 90-day recurrent billing cycles (rent, EMIs, credit card minimums) and compares them against your projected income to calculate your daily cash buffer.',
  },
  {
    id: '4',
    question: 'Can I revoke bank access at any time?',
    answer: 'Yes. Under RBI AA regulations, you have full sovereignty over your data. Go to Settings > Privacy & PII Security to revoke your Account Aggregator mandate with 1 click.',
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<string | null>('1');

  const toggleFaq = (id: string) => {
    setExpandedFaq((prev) => (prev === id ? null : id));
  };

  const handleContactConcierge = () => {
    Alert.alert(
      'Assay Priority Concierge',
      'Assay Grievance Officer: grievance@assay.ai\nSupport Helpline: 1800-200-ASSAY (9 AM - 7 PM IST)'
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
          Help & RBI Policies
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Compliance Banner */}
        <View style={styles.policyCard}>
          <ShieldCheck color="#16A34A" size={24} style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold" style={{ color: '#15803D' }}>
              RBI Master Direction Compliance
            </Typography>
            <Typography variant="caption" style={{ color: '#166534', marginTop: 3, lineHeight: 16 }}>
              Assay operates strictly as a Financial Information User (FIU) under RBI Master Direction DNBR.PD.009/03.10.119/2016-17.
            </Typography>
          </View>
        </View>

        {/* FAQs Section */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Frequently Asked Questions
        </Typography>

        <View style={styles.faqList}>
          {FAQS.map((faq) => {
            const isOpen = expandedFaq === faq.id;
            return (
              <View key={faq.id} style={styles.faqCard}>
                <TouchableOpacity 
                  style={styles.faqHeader}
                  onPress={() => toggleFaq(faq.id)}
                  activeOpacity={0.75}
                >
                  <Typography variant="bodyBold" style={styles.faqQuestion}>
                    {faq.question}
                  </Typography>
                  {isOpen ? (
                    <ChevronUp color={COLORS.textSecondary} size={18} />
                  ) : (
                    <ChevronDown color={COLORS.textSecondary} size={18} />
                  )}
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.faqAnswerWrapper}>
                    <Typography variant="secondary" color={COLORS.textSecondary} style={styles.faqAnswer}>
                      {faq.answer}
                    </Typography>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Grievance & Concierge Support */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Support & Grievance Redressal
        </Typography>

        <TouchableOpacity 
          style={styles.contactCard}
          onPress={handleContactConcierge}
          activeOpacity={0.75}
        >
          <View style={styles.contactIconBox}>
            <Mail color="#2563EB" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography variant="bodyBold">Contact Grievance Officer</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              grievance@assay.ai • SLA: 24 hours
            </Typography>
          </View>
          <ExternalLink color={COLORS.textSecondary} size={18} />
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
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    marginTop: 8,
    marginBottom: 12,
    color: COLORS.text,
  },
  faqList: {
    gap: 10,
    marginBottom: 24,
  },
  faqCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14.5,
    marginRight: 10,
  },
  faqAnswerWrapper: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  faqAnswer: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  contactIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
});
