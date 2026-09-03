import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../Typography';
import { COLORS, SIZES } from '../../constants/theme';
import { 
  Coffee, 
  ShoppingBag, 
  Car, 
  Tv, 
  ArrowDownLeft, 
  Zap, 
  CreditCard, 
  Utensils, 
  Briefcase,
  Layers
} from 'lucide-react-native';

export interface TransactionRowProps {
  name: string;
  category: string;
  time?: string;
  date?: string;
  amount: string;
  method?: string;
  isIncome?: boolean;
  onPress?: () => void;
  showDivider?: boolean;
}

export function TransactionRow({
  name,
  category,
  time,
  date,
  amount,
  method,
  isIncome = false,
  onPress,
  showDivider = false,
}: TransactionRowProps) {
  const subtitleTime = time || date;

  // Icon resolution based on category/merchant
  const getCategoryIcon = () => {
    const cat = (category + ' ' + name).toLowerCase();
    if (cat.includes('coffee') || cat.includes('starbucks')) {
      return <Coffee color={COLORS.text} size={18} strokeWidth={1.8} />;
    }
    if (cat.includes('food') || cat.includes('dining') || cat.includes('swiggy') || cat.includes('zomato')) {
      return <Utensils color={COLORS.text} size={18} strokeWidth={1.8} />;
    }
    if (cat.includes('salary') || cat.includes('income')) {
      return <ArrowDownLeft color={COLORS.success} size={18} strokeWidth={2} />;
    }
    if (cat.includes('transport') || cat.includes('uber') || cat.includes('fuel') || cat.includes('shell')) {
      return <Car color={COLORS.text} size={18} strokeWidth={1.8} />;
    }
    if (cat.includes('entertainment') || cat.includes('netflix')) {
      return <Tv color={COLORS.text} size={18} strokeWidth={1.8} />;
    }
    if (cat.includes('shop') || cat.includes('blinkit') || cat.includes('amazon') || cat.includes('grocer')) {
      return <ShoppingBag color={COLORS.text} size={18} strokeWidth={1.8} />;
    }
    return <Layers color={COLORS.text} size={18} strokeWidth={1.8} />;
  };

  const isFormattedIncome = isIncome || amount.startsWith('+');

  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={!onPress}
      >
        <View style={[styles.iconWrapper, isFormattedIncome && styles.incomeIconWrapper]}>
          {getCategoryIcon()}
        </View>

        <View style={styles.details}>
          <Typography variant="bodyBold" numberOfLines={1} style={styles.name}>
            {name}
          </Typography>
          <View style={styles.subRow}>
            <Typography variant="caption" color={COLORS.textSecondary}>
              {category}
            </Typography>
            {subtitleTime && (
              <>
                <Typography variant="caption" color={COLORS.textSecondary} style={styles.dot}>
                  •
                </Typography>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  {subtitleTime}
                </Typography>
              </>
            )}
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Typography
            variant="financial"
            color={isFormattedIncome ? COLORS.success : COLORS.text}
            style={styles.amountText}
          >
            {amount}
          </Typography>
          {method && (
            <View style={styles.methodBadge}>
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.methodText}>
                {method}
              </Typography>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  incomeIconWrapper: {
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
    borderColor: 'rgba(22, 163, 74, 0.2)',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    marginBottom: 2,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 6,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 12,
  },
  amountText: {
    fontSize: 15,
  },
  methodBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodText: {
    fontSize: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 70,
    marginRight: 16,
  },
});
