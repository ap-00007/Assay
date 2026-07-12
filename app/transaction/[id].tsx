import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { Coffee, X, Receipt } from 'lucide-react-native';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: 24}} /> {/* Spacer */}
        <Typography variant="bodyBold">Transaction Details</Typography>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <X color={COLORS.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.merchantLogo}>
          <Coffee color={COLORS.gold} size={48} />
        </View>

        <Typography variant="h2" align="center" style={styles.merchantName}>
          Starbucks
        </Typography>

        <Typography variant="h1" align="center" style={styles.amount}>
          ₹340
        </Typography>

        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Typography variant="caption">Food & Dining</Typography>
          </View>
          <View style={styles.chip}>
            <Typography variant="caption">UPI</Typography>
          </View>
        </View>

        <Card style={styles.infoCard}>
          <InfoRow label="Merchant" value="Starbucks Coffee Co." />
          <InfoRow label="Date" value="12 July 2026, 10:42 AM" />
          <InfoRow label="Payment Method" value="Google Pay (UPI)" />
          <InfoRow label="Transaction ID" value="UPI1234567890ABC" />
          <InfoRow label="Notes" value="Morning coffee run" isLast />
        </Card>

        <Button 
          title="View Original Receipt" 
          variant="secondary" 
          style={styles.receiptBtn}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, value, isLast = false }: { label: string, value: string, isLast?: boolean }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Typography variant="body" color={COLORS.textMuted}>{label}</Typography>
    <Typography variant="bodyMedium" style={styles.infoValue} numberOfLines={1}>{value}</Typography>
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
  },
  closeBtn: {
    padding: 8,
    marginRight: -8,
  },
  scrollContent: {
    padding: SIZES.padding,
    alignItems: 'center',
  },
  merchantLogo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
    ...SHADOWS.medium,
  },
  merchantName: {
    marginBottom: 8,
  },
  amount: {
    marginBottom: 24,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  chip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoCard: {
    width: '100%',
    marginBottom: 32,
    paddingVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  receiptBtn: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 0,
  }
});
