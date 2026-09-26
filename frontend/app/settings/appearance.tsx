import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  Moon, 
  Sun, 
  Monitor, 
  DollarSign, 
  Check, 
  Layers 
} from 'lucide-react-native';

export default function AppearanceScreen() {
  const router = useRouter();
  const [themeMode, setThemeMode] = useState<'system' | 'dark' | 'light'>('system');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR'>('INR');
  const [compactCards, setCompactCards] = useState(false);

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
          Appearance
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Interface Theme
        </Typography>

        <View style={styles.themeOptionsRow}>
          {/* System */}
          <TouchableOpacity
            style={[styles.themeOptionCard, themeMode === 'system' && styles.themeOptionActive]}
            onPress={() => setThemeMode('system')}
            activeOpacity={0.8}
          >
            <View style={styles.themeIconBox}>
              <Monitor color={themeMode === 'system' ? COLORS.gold : COLORS.text} size={24} />
            </View>
            <Typography variant="bodyBold" style={styles.themeLabel}>
              System
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Matches device
            </Typography>
            {themeMode === 'system' && (
              <View style={styles.selectedCheck}>
                <Check color="#FFFFFF" size={12} strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>

          {/* Light */}
          <TouchableOpacity
            style={[styles.themeOptionCard, themeMode === 'light' && styles.themeOptionActive]}
            onPress={() => setThemeMode('light')}
            activeOpacity={0.8}
          >
            <View style={styles.themeIconBox}>
              <Sun color={themeMode === 'light' ? COLORS.gold : COLORS.text} size={24} />
            </View>
            <Typography variant="bodyBold" style={styles.themeLabel}>
              Light
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Classic warm
            </Typography>
            {themeMode === 'light' && (
              <View style={styles.selectedCheck}>
                <Check color="#FFFFFF" size={12} strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>

          {/* Dark */}
          <TouchableOpacity
            style={[styles.themeOptionCard, themeMode === 'dark' && styles.themeOptionActive]}
            onPress={() => setThemeMode('dark')}
            activeOpacity={0.8}
          >
            <View style={[styles.themeIconBox, { backgroundColor: '#0F172A' }]}>
              <Moon color={COLORS.gold} size={24} />
            </View>
            <Typography variant="bodyBold" style={styles.themeLabel}>
              Dark
            </Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>
              Deep navy
            </Typography>
            {themeMode === 'dark' && (
              <View style={styles.selectedCheck}>
                <Check color="#FFFFFF" size={12} strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Currency Display Format */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Currency & Numerals
        </Typography>

        <View style={styles.groupCard}>
          <TouchableOpacity 
            style={styles.currencyRow}
            onPress={() => setCurrency('INR')}
            activeOpacity={0.7}
          >
            <View style={styles.currencySymbolBox}>
              <Typography variant="bodyBold" style={{ fontSize: 16 }}>₹</Typography>
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="bodyBold">Indian Rupee (INR)</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Lakhs & Crores formatting (e.g. ₹1,42,850)
              </Typography>
            </View>
            {currency === 'INR' && <Check color={COLORS.gold} size={20} strokeWidth={2.5} />}
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.currencyRow}
            onPress={() => setCurrency('USD')}
            activeOpacity={0.7}
          >
            <View style={styles.currencySymbolBox}>
              <Typography variant="bodyBold" style={{ fontSize: 16 }}>$</Typography>
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="bodyBold">US Dollar (USD)</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Thousands & Millions formatting (e.g. $1,714.20)
              </Typography>
            </View>
            {currency === 'USD' && <Check color={COLORS.gold} size={20} strokeWidth={2.5} />}
          </TouchableOpacity>
        </View>

        {/* Density Layout */}
        <Typography variant="cardHeading" style={styles.sectionTitle}>
          Layout Density
        </Typography>

        <View style={styles.groupCard}>
          <View style={styles.densityRow}>
            <View style={styles.densityIconBox}>
              <Layers color={COLORS.text} size={20} />
            </View>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Typography variant="bodyBold">Compact Card Density</Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                Fit more transaction rows on screen without scrolling.
              </Typography>
            </View>
            <Switch
              value={compactCards}
              onValueChange={setCompactCards}
              trackColor={{ false: '#E5E7EB', true: COLORS.gold }}
            />
          </View>
        </View>

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
  sectionTitle: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 14,
    color: COLORS.text,
  },
  themeOptionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  themeOptionCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    position: 'relative',
  },
  themeOptionActive: {
    borderColor: COLORS.gold,
    backgroundColor: '#FAF9F5',
  },
  themeIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  themeLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  selectedCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  currencySymbolBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FAF9F5',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  densityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  densityIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FAF9F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
});
