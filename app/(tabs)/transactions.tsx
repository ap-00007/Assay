import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { COLORS, SIZES } from '../../constants/theme';
import { Search } from 'lucide-react-native';

const FILTERS = ['All', 'UPI', 'Receipt', 'Cash', 'Card'];

export default function TransactionsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2" style={styles.title}>Transactions</Typography>
        <View style={styles.searchBar}>
          <Search color={COLORS.textMuted} size={20} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor={COLORS.textMuted}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}
              onPress={() => setActiveFilter(filter)}
            >
              <Typography 
                variant="bodyMedium" 
                color={activeFilter === filter ? COLORS.white : COLORS.text}
              >
                {filter}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Date Group 1 */}
        <Typography variant="bodyBold" color={COLORS.textMuted} style={styles.dateHeader}>
          Today
        </Typography>
        <Card style={styles.transactionsCard}>
          <TransactionItem 
            name="Starbucks" category="Food & Dining" method="UPI" time="10:42 AM" amount="-₹340" 
            onPress={() => router.push('/transaction/1')}
          />
          <View style={styles.divider} />
          <TransactionItem 
            name="Salary" category="Income" method="Bank" time="09:00 AM" amount="+₹85,000" isIncome
            onPress={() => router.push('/transaction/2')}
          />
        </Card>

        {/* Date Group 2 */}
        <Typography variant="bodyBold" color={COLORS.textMuted} style={styles.dateHeader}>
          Yesterday
        </Typography>
        <Card style={styles.transactionsCard}>
          <TransactionItem 
            name="Uber" category="Transport" method="Card" time="6:15 PM" amount="-₹250" 
            onPress={() => router.push('/transaction/3')}
          />
          <View style={styles.divider} />
          <TransactionItem 
            name="Netflix" category="Entertainment" method="Card" time="1:00 AM" amount="-₹649" 
            onPress={() => router.push('/transaction/4')}
          />
          <View style={styles.divider} />
          <TransactionItem 
            name="Blinkit" category="Groceries" method="UPI" time="4:30 PM" amount="-₹1,120" 
            onPress={() => router.push('/transaction/5')}
          />
        </Card>

        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

interface TxProps {
  name: string; category: string; method: string; time: string; amount: string; isIncome?: boolean; onPress: () => void;
}

const TransactionItem = ({ name, category, method, time, amount, isIncome, onPress }: TxProps) => (
  <TouchableOpacity style={styles.transactionRow} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.transactionIcon} />
    <View style={styles.transactionDetails}>
      <Typography variant="bodyBold">{name}</Typography>
      <View style={styles.transactionSub}>
        <Typography variant="caption" color={COLORS.textMuted}>{category}</Typography>
        <Typography variant="caption" color={COLORS.textMuted} style={styles.dotSeparator}>•</Typography>
        <Typography variant="caption" color={COLORS.textMuted}>{time}</Typography>
      </View>
    </View>
    <View style={styles.amountContainer}>
      <Typography variant="bodyBold" color={isIncome ? COLORS.success : COLORS.text}>{amount}</Typography>
      <View style={styles.methodChip}>
        <Typography variant="caption" color={COLORS.textMuted} style={{fontSize: 10}}>{method}</Typography>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
  },
  filtersContent: {
    paddingHorizontal: SIZES.padding,
    gap: 12,
    paddingBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  dateHeader: {
    marginBottom: 12,
    marginTop: 8,
  },
  transactionsCard: {
    paddingVertical: 8,
    marginBottom: 24,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionSub: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dotSeparator: {
    marginHorizontal: 6,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  methodChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 60,
  },
});
