import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Check } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { MerchantLogo } from '../ui/MerchantLogo';
import { SandboxAccount } from '../../types/aa';

interface BankCardItemProps {
  account: SandboxAccount;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function BankCardItem({ account, isSelected, onToggle }: BankCardItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={() => onToggle(account.id)}
      activeOpacity={0.8}
    >
      <View style={styles.leftContent}>
        <MerchantLogo name={account.bankKey} size={40} />
        
        <View style={styles.textContainer}>
          <Text style={styles.bankName}>{account.bankName}</Text>
          <Text style={styles.maskedNumber}>{account.maskedNumber}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.balance}>{account.formattedBalance}</Text>
        
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={2.8} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    ...Platform.select({
      web: {
        transition: 'border-color 0.15s ease, background-color 0.15s ease',
      },
      default: {
        shadowColor: '#111827',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
      },
    }),
  },
  cardSelected: {
    borderColor: COLORS.gold,
    backgroundColor: '#FCFAF5',
    ...Platform.select({
      web: {
        boxShadow: '0 0 0 1px #D6A928',
      },
    }),
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  bankName: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 2,
  },
  maskedNumber: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  rightContent: {
    alignItems: 'flex-end',
    gap: 6,
  },
  balance: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});
