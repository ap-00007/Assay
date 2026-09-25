import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { AppChip } from '../../components/ui/AppChip';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_TRANSACTIONS, Transaction } from '../../constants/mockData';
import { Search, Plus, TrendingUp, TrendingDown } from 'lucide-react-native';

const FILTERS = ['All', 'UPI', 'Card', 'Cash', 'Income'];

const CATEGORY_ICONS: Record<string, string> = {
  'Food & Dining': '🍽️',
  'Transport': '🚗',
  'Shopping': '🛍️',
  'Subscriptions': '📺',
  'Income': '💰',
  'Bills & Utilities': '⚡',
  'Entertainment': '🎬',
  'Groceries': '🛒',
};

export default function TransactionsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = MOCK_TRANSACTIONS.filter((t) => {
    const matchFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Income'
        ? t.isIncome
        : t.method === activeFilter;
    const matchQuery = query
      ? t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchFilter && matchQuery;
  });

  // Group by date
  const grouped: Record<string, Transaction[]> = {};
  filtered.forEach((txn) => {
    if (!grouped[txn.date]) grouped[txn.date] = [];
    grouped[txn.date].push(txn);
  });

  const fmt = (n: number) => `₹${Math.abs(n).toLocaleString('en-IN')}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="pageTitle" color={COLORS.text} style={styles.title}>
          Transactions
        </Typography>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push('/add-transaction')}
          activeOpacity={0.8}
        >
          <Plus color={COLORS.white} size={20} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Search color={COLORS.textSecondary} size={16} strokeWidth={1.8} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScroll}
      >
        {FILTERS.map((f) => (
          <AppChip
            key={f}
            label={f}
            active={activeFilter === f}
            onPress={() => setActiveFilter(f)}
          />
        ))}
      </ScrollView>

      {/* Transactions List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {Object.entries(grouped).map(([date, txns]) => (
          <View key={date}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.dateGroup}>
              {date}
            </Typography>
            <Card variant="list" style={styles.groupCard}>
              {txns.map((txn, idx) => (
                <View key={txn.id}>
                  <View style={styles.txnRow}>
                    {/* Icon */}
                    <View style={[styles.txnIcon, txn.isIncome ? styles.incomeIcon : styles.expenseIcon]}>
                      <Typography variant="body" style={styles.txnEmoji}>
                        {CATEGORY_ICONS[txn.category] ?? '💸'}
                      </Typography>
                    </View>

                    {/* Info */}
                    <View style={styles.txnInfo}>
                      <Typography variant="bodyMedium" style={styles.txnName} numberOfLines={1}>
                        {txn.name}
                      </Typography>
                      <View style={styles.txnMeta}>
                        <Typography variant="caption" color={COLORS.textSecondary} style={styles.txnTime}>
                          {txn.time}
                        </Typography>
                        <View style={[styles.methodBadge]}>
                          <Typography variant="caption" color={COLORS.textSecondary} style={styles.methodText}>
                            {txn.method}
                          </Typography>
                        </View>
                      </View>
                    </View>

                    {/* Amount */}
                    <View style={styles.txnAmountCol}>
                      <Typography
                        variant="financial"
                        color={txn.isIncome ? COLORS.success : COLORS.text}
                        style={styles.txnAmount}
                      >
                        {txn.isIncome ? '+' : '−'}{fmt(txn.amount)}
                      </Typography>
                      <Typography variant="caption" color={COLORS.textSecondary} style={styles.txnCategory}>
                        {txn.category}
                      </Typography>
                    </View>
                  </View>
                  {idx < txns.length - 1 && <View style={styles.rowDivider} />}
                </View>
              ))}
            </Card>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.md,
  },
  title: { fontSize: 28, lineHeight: 36 },
  addBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: SPACING.xl,
    paddingHorizontal: SPACING.base,
    height: 46,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  searchIcon: {},
  searchInput: {
    flex: 1,
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.text,
  },
  filtersScroll: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
    flexDirection: 'row',
  },
  list: {
    paddingHorizontal: SPACING.xl,
  },
  dateGroup: {
    fontSize: 12,
    fontFamily: FONTS.bodySemiBold,
    letterSpacing: 0.4,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  groupCard: { marginBottom: SPACING.md },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
    gap: SPACING.md,
  },
  txnIcon: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  incomeIcon: { backgroundColor: '#DCFCE7' },
  expenseIcon: { backgroundColor: COLORS.background },
  txnEmoji: { fontSize: 18 },
  txnInfo: { flex: 1 },
  txnName: { fontSize: 14, lineHeight: 20 },
  txnMeta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: 2 },
  txnTime: { fontSize: 11 },
  methodBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 6, paddingVertical: 1,
    borderRadius: 5, borderWidth: 1, borderColor: COLORS.border,
  },
  methodText: { fontSize: 10 },
  txnAmountCol: { alignItems: 'flex-end', gap: 2 },
  txnAmount: { fontSize: 14 },
  txnCategory: { fontSize: 10 },
  rowDivider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.base },
});
