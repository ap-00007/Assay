import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Typography } from '../../components/Typography';
import { MerchantLogo } from '../../components/ui/MerchantLogo';
import { COLORS, SIZES } from '../../constants/theme';
import { Search } from 'lucide-react-native';

interface TransactionItemData {
  id: string;
  name: string;
  merchantKey: string;
  time: string;
  method: 'UPI' | 'Card' | 'Cash' | 'Wallet';
  amount: string;
  category?: string;
  notes?: string;
}

interface DateGroup {
  date: string;
  items: TransactionItemData[];
}

const TRANSACTIONS_DATA: DateGroup[] = [
  {
    date: 'Today',
    items: [
      { id: 'tx-1', name: 'Starbucks', merchantKey: 'starbucks', time: '9:42 AM', method: 'UPI', amount: '₹250', category: 'Food & Dining', notes: 'Morning coffee ☕' },
      { id: 'tx-2', name: 'Uber', merchantKey: 'uber', time: '8:20 AM', method: 'UPI', amount: '₹120', category: 'Transport', notes: 'Ride to office' },
      { id: 'tx-8', name: 'Blinkit', merchantKey: 'blinkit', time: '7:45 AM', method: 'UPI', amount: '₹340', category: 'Groceries', notes: 'Breakfast supplies' },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      { id: 'tx-3', name: 'Amazon', merchantKey: 'amazon', time: '6:10 PM', method: 'Card', amount: '₹899', category: 'Shopping', notes: 'Office electronics' },
      { id: 'tx-4', name: 'Tea Stall', merchantKey: 'tea', time: '4:30 PM', method: 'Cash', amount: '₹30', category: 'Food & Dining', notes: 'Evening chai' },
      { id: 'tx-9', name: 'Netflix', merchantKey: 'netflix', time: '1:15 PM', method: 'Card', amount: '₹649', category: 'Entertainment', notes: 'Monthly 4K plan' },
    ],
  },
  {
    date: 'Tue, 25 Jun',
    items: [
      { id: 'tx-5', name: 'Swiggy', merchantKey: 'swiggy', time: '8:10 PM', method: 'UPI', amount: '₹430', category: 'Food & Dining', notes: 'Dinner order' },
      { id: 'tx-6', name: 'BookMyShow', merchantKey: 'bookmyshow', time: '5:12 PM', method: 'UPI', amount: '₹620', category: 'Entertainment', notes: 'Weekend movie' },
      { id: 'tx-10', name: 'Zomato', merchantKey: 'zomato', time: '1:30 PM', method: 'UPI', amount: '₹280', category: 'Food & Dining', notes: 'Lunch order' },
    ],
  },
  {
    date: 'Mon, 24 Jun',
    items: [
      { id: 'tx-7', name: 'Metro Card', merchantKey: 'metro', time: '10:02 AM', method: 'Wallet', amount: '₹200', category: 'Transport', notes: 'Metro recharge' },
      { id: 'tx-11', name: 'Spotify', merchantKey: 'spotify', time: '9:00 AM', method: 'Card', amount: '₹119', category: 'Entertainment', notes: 'Premium individual' },
    ],
  },
];

const FILTERS = ['All', 'UPI', 'Card', 'Cash', 'Wallet'] as const;

export default function TransactionsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const [activeFilter, setActiveFilter] = useState<string>(params.filter || 'All');
  const [searchQuery, setSearchQuery] = useState(params.query || '');

  useEffect(() => {
    if (params.query) {
      setSearchQuery(params.query);
    }
    if (params.filter) {
      setActiveFilter(params.filter);
    }
  }, [params.query, params.filter]);

  const filteredGroups = TRANSACTIONS_DATA.map((group) => {
    const items = group.items.filter((item) => {
      const matchesFilter = activeFilter === 'All' || item.method === activeFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.amount.includes(searchQuery) ||
        item.method.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="pageTitle" style={styles.pageTitle}>
          Transactions
        </Typography>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search color="#9CA3AF" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search merchant, amount, category..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterPill, isActive ? styles.filterPillActive : styles.filterPillInactive]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.8}
              >
                <Typography
                  variant="caption"
                  style={[styles.filterText, isActive ? styles.filterTextActive : styles.filterTextInactive]}
                >
                  {filter}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredGroups.map((group) => (
          <View key={group.date} style={styles.groupContainer}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.dateHeader}>
              {group.date}
            </Typography>

            {group.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.transactionCard}
                activeOpacity={0.75}
                onPress={() => router.push({
                  pathname: `/transaction/${item.id}`,
                  params: {
                    name: item.name,
                    merchantKey: item.merchantKey,
                    amount: item.amount,
                    time: item.time,
                    method: item.method,
                    category: item.category || 'General',
                    notes: item.notes || '',
                  },
                })}
              >
                <MerchantLogo name={item.merchantKey} size={44} style={styles.merchantLogo} />
                
                <View style={styles.transactionDetails}>
                  <Typography variant="bodyBold" style={styles.merchantName}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    {item.time} • {item.method}
                  </Typography>
                </View>

                <Typography variant="financial" style={styles.amountText}>
                  {item.amount}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={{ height: 110 }} />
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 34,
    marginBottom: 16,
    color: COLORS.text,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 8,
  },
  filterPill: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPillActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filterPillInactive: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterTextInactive: {
    color: COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  groupContainer: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 2,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 10,
  },
  merchantLogo: {
    marginRight: 14,
  },
  transactionDetails: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.text,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});
