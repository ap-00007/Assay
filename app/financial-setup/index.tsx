import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { ChevronRight, Check } from 'lucide-react-native';

const SETUP_ITEMS = [
  { id: 'income', emoji: '💰', title: 'Add Income', subtitle: 'Salary, Freelance, Business', done: false },
  { id: 'bank', emoji: '🏦', title: 'Add Bank Accounts', subtitle: 'Connect or enter manually', done: false },
  { id: 'credit', emoji: '💳', title: 'Add Credit Cards', subtitle: 'Track your card spends', done: false },
  { id: 'cash', emoji: '💵', title: 'Add Cash Balance', subtitle: 'Your current cash on hand', done: false },
  { id: 'invest', emoji: '📈', title: 'Add Investments', subtitle: 'Mutual funds, stocks, FDs', done: false },
  { id: 'loans', emoji: '🏠', title: 'Add Loans / EMIs', subtitle: 'Home, car, personal loans', done: false },
];

export default function FinancialSetupScreen() {
  const router = useRouter();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="h2" color={COLORS.text} style={styles.title}>
            Let's set up
          </Typography>
          <Typography variant="h2" color={COLORS.text} style={styles.titleLine2}>
            your financial profile
          </Typography>
          <Typography variant="secondary" color={COLORS.textSecondary} style={styles.subtitle}>
            You can also use demo data to explore the app
          </Typography>
        </View>

        {/* Setup Items */}
        <View style={styles.itemList}>
          {SETUP_ITEMS.map((item) => {
            const isDone = completed.has(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.setupCard, isDone && styles.setupCardDone]}
                onPress={() => toggle(item.id)}
                activeOpacity={0.75}
              >
                <View style={[styles.emojiWrapper, isDone && styles.emojiWrapperDone]}>
                  <Typography variant="body" style={styles.emoji}>{item.emoji}</Typography>
                </View>
                <View style={styles.itemText}>
                  <Typography variant="bodyMedium" style={styles.itemTitle}>{item.title}</Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>{item.subtitle}</Typography>
                </View>
                {isDone
                  ? <Check color={COLORS.success} size={20} strokeWidth={2.5} />
                  : <ChevronRight color={COLORS.textSecondary} size={20} strokeWidth={1.8} />
                }
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.8}
          >
            <Typography variant="bodyMedium" color={COLORS.primary} style={styles.demoText}>
              Use Demo Data
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Typography variant="bodyMedium" color={COLORS.white} style={styles.continueText}>
              Continue →
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.xxl,
  },
  header: {
    gap: SPACING.xs,
    paddingTop: SPACING.md,
  },
  title: {
    fontSize: 26,
    lineHeight: 34,
  },
  titleLine2: {
    fontSize: 26,
    lineHeight: 34,
  },
  subtitle: {
    marginTop: SPACING.sm,
    fontSize: 14,
    lineHeight: 20,
  },
  itemList: {
    gap: SPACING.md,
  },
  setupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  setupCardDone: {
    borderColor: COLORS.success,
    backgroundColor: '#F0FDF4',
  },
  emojiWrapper: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiWrapperDone: {
    backgroundColor: '#DCFCE7',
  },
  emoji: {
    fontSize: 22,
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontSize: 15,
  },
  buttonSection: {
    gap: SPACING.md,
  },
  demoButton: {
    paddingVertical: SPACING.base + 2,
    borderRadius: SIZES.radius,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  demoText: {
    fontSize: 16,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.gold,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.base + 2,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  continueText: {
    fontSize: 16,
    fontFamily: FONTS.bodySemiBold,
  },
});
