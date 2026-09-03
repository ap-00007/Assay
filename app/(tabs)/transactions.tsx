import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { AppInput } from '../../components/ui/AppInput';
import { AppChip } from '../../components/ui/AppChip';
import { TransactionRow } from '../../components/ui/TransactionRow';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const FILTERS = ['All', 'UPI', 'Receipt', 'Cash', 'Card'];

export default function TransactionsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Unified Header */}
      <ScreenHeader 
        title="Transactions" 
        showNotification
        onNotificationPress={() => router.push('/ai')}
      />

      <View style={styles.filterSection}>
        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <AppInput 
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((filter) => (
            <AppChip 
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Group 1: Today */}
        <Typography variant="caption" color={COLORS.textSecondary} style={styles.groupHeader}>
          TODAY
        </Typography>
        <Card variant="list" style={styles.groupCard}>
          <TransactionRow 
            name="Starbucks" 
            category="Food & Dining" 
            time="10:42 AM" 
            amount="-₹340" 
            method="UPI"
            showDivider
            onPress={() => router.push('/transaction/1')}
          />
          <TransactionRow 
            name="Salary" 
            category="Income" 
            time="09:00 AM" 
            amount="+₹85,000" 
            method="Bank"
            isIncome
            onPress={() => router.push('/transaction/2')}
          />
        </Card>

        {/* Group 2: Yesterday */}
        <Typography variant="caption" color={COLORS.textSecondary} style={styles.groupHeader}>
          YESTERDAY
        </Typography>
        <Card variant="list" style={styles.groupCard}>
          <TransactionRow 
            name="Uber" 
            category="Transport" 
            time="6:15 PM" 
            amount="-₹250" 
            method="Card"
            showDivider
            onPress={() => router.push('/transaction/3')}
          />
          <TransactionRow 
            name="Netflix" 
            category="Entertainment" 
            time="1:00 AM" 
            amount="-₹649" 
            method="Card"
            showDivider
            onPress={() => router.push('/transaction/4')}
          />
          <TransactionRow 
            name="Blinkit" 
            category="Groceries" 
            time="4:30 PM" 
            amount="-₹1,120" 
            method="UPI"
            onPress={() => router.push('/transaction/5')}
          />
        </Card>

        {/* Group 3: Earlier */}
        <Typography variant="caption" color={COLORS.textSecondary} style={styles.groupHeader}>
          EARLIER THIS WEEK
        </Typography>
        <Card variant="list" style={styles.groupCard}>
          <TransactionRow 
            name="Amazon Fresh" 
            category="Groceries" 
            time="8 Jul, 3:15 PM" 
            amount="-₹2,450" 
            method="Card"
            showDivider
            onPress={() => router.push('/transaction/1')}
          />
          <TransactionRow 
            name="Swiggy Gourmet" 
            category="Food & Dining" 
            time="7 Jul, 8:30 PM" 
            amount="-₹980" 
            method="UPI"
            showDivider
            onPress={() => router.push('/transaction/2')}
          />
          <TransactionRow 
            name="Apollo Pharmacy" 
            category="Health" 
            time="6 Jul, 11:20 AM" 
            amount="-₹540" 
            method="Cash"
            onPress={() => router.push('/transaction/3')}
          />
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterSection: {
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
  },
  searchWrapper: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 12,
  },
  filtersContent: {
    paddingHorizontal: SIZES.padding,
    gap: 8,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 16,
  },
  groupHeader: {
    marginBottom: 8,
    marginTop: 8,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  groupCard: {
    marginBottom: SPACING.lg,
  },
});
