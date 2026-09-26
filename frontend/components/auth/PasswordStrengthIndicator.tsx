import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Check, Dot } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { PasswordStrength } from '../../services/auth';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  showCriteria?: boolean;
}

export function PasswordStrengthIndicator({
  strength,
  showCriteria = true,
}: PasswordStrengthIndicatorProps) {
  if (strength.score === 0) {
    return null;
  }

  const getBarColor = (index: number) => {
    if (index >= strength.score) {
      return COLORS.border;
    }
    if (strength.score === 1) return COLORS.error;
    if (strength.score === 2) return COLORS.warning;
    return COLORS.success;
  };

  const getLabelColor = () => {
    if (strength.score === 1) return COLORS.error;
    if (strength.score === 2) return COLORS.warning;
    return COLORS.success;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerLabel}>Password strength</Text>
        <Text style={[styles.strengthLabel, { color: getLabelColor() }]}>
          {strength.label}
        </Text>
      </View>

      <View style={styles.barsContainer}>
        {[0, 1, 2].map((idx) => (
          <View
            key={idx}
            style={[
              styles.bar,
              { backgroundColor: getBarColor(idx) },
            ]}
          />
        ))}
      </View>

      {showCriteria && (
        <View style={styles.criteriaList}>
          <View style={styles.criteriaItem}>
            {strength.hasMinLength ? (
              <Check size={13} color={COLORS.success} strokeWidth={2.5} style={styles.criteriaIcon} />
            ) : (
              <Dot size={16} color={COLORS.textSecondary} style={styles.criteriaIcon} />
            )}
            <Text
              style={[
                styles.criteriaText,
                strength.hasMinLength && styles.criteriaTextMet,
              ]}
            >
              8+ characters
            </Text>
          </View>

          <View style={styles.criteriaItem}>
            {strength.hasLetter && strength.hasNumberOrSpecial ? (
              <Check size={13} color={COLORS.success} strokeWidth={2.5} style={styles.criteriaIcon} />
            ) : (
              <Dot size={16} color={COLORS.textSecondary} style={styles.criteriaIcon} />
            )}
            <Text
              style={[
                styles.criteriaText,
                strength.hasLetter && strength.hasNumberOrSpecial && styles.criteriaTextMet,
              ]}
            >
              Letters & numbers or symbols
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -8,
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerLabel: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  strengthLabel: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
  },
  barsContainer: {
    flexDirection: 'row',
    gap: 6,
    height: 3,
    marginBottom: 10,
  },
  bar: {
    flex: 1,
    height: '100%',
    borderRadius: 2,
  },
  criteriaList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  criteriaIcon: {
    marginRight: 4,
  },
  criteriaText: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  criteriaTextMet: {
    color: COLORS.primary,
    fontFamily: FONTS.bodyMedium,
  },
});
