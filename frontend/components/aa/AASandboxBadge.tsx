import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldCheck, Database } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';

interface AASandboxBadgeProps {
  label?: string;
}

export function AASandboxBadge({ label = 'SANDBOX ENVIRONMENT • RBI AA DEMO' }: AASandboxBadgeProps) {
  return (
    <View style={styles.badge}>
      <Database size={13} color="#927014" strokeWidth={2} />
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(214, 169, 40, 0.09)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.25)',
    marginBottom: 16,
  },
  badgeText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10.5,
    color: '#927014',
    letterSpacing: 0.8,
  },
});
