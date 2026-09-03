import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { Coffee, X, Receipt, CheckCircle2 } from 'lucide-react-native';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Typography variant="bodyBold" style={{ fontSize: 16 }}>
          Transaction Details
        </Typography>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.closeBtn}
          activeOpacity={0.7}
        >
          <X color={COLORS.text} size={20} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.merchantLogo}>
          <Coffee color={COLORS.gold} size={36} strokeWidth={1.8} />
        </View>

        <Typography variant="h1" align="center" style={styles.merchantName}>
          Starbucks
        </Typography>

        <Typography variant="display" color={COLORS.text} align="center" style={styles.amount}>
          -₹340.00
        </Typography>

        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Typography variant="caption" color={COLORS.primary}>Food & Dining</Typography>
          </View>
          <View style={styles.chip}>
            <Typography variant="caption" color={COLORS.primary}>UPI Payment</Typography>
          </View>
        </View>

        <Card variant="list" style={styles.infoCard}>
          <InfoRow label="Merchant" value="Starbucks Coffee Co." />
          <InfoRow label="Date & Time" value="12 July 2026, 10:42 AM" />
          <InfoRow label="Payment Source" value="Google Pay (UPI • HDFC)" />
          <InfoRow label="Reference ID" value="UPI492048294820" />
          <InfoRow label="Category Leak" value="Micro Spend (< ₹500)" isWarning />
          <InfoRow label="Notes" value="Morning coffee run" isLast />
        </Card>

        <Button 
          title="View Original Receipt" 
          variant="secondary" 
          icon={<Receipt size={18} color={COLORS.primary} strokeWidth={1.8} />}
          style={styles.receiptBtn}
        />
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow = ({ 
  label, 
  value, 
  isWarning = false,
  isLast = false 
}: { 
  label: string; 
  value: string; 
  isWarning?: boolean;
  isLast?: boolean;
}) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Typography variant="secondary" color={COLORS.textSecondary}>{label}</Typography>
    <Typography 
      variant="bodyMedium" 
      color={isWarning ? COLORS.warning : COLORS.text}
      style={styles.infoValue} 
      numberOfLines={1}
    >
      {value}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  merchantLogo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
  },
  merchantName: {
    marginBottom: 4,
  },
  amount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    lineHeight: 42,
    marginBottom: 16,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  chip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoCard: {
    width: '100%',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  receiptBtn: {
    width: '100%',
  },
});
