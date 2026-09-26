import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

type MessageType = 'normal' | 'observed' | 'predicted' | 'recommendation';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  type?: MessageType;
  confidence?: number;
}

const TYPE_CONFIG: Record<MessageType, { dot: string; label: string; bg: string; labelColor: string }> = {
  normal: { dot: '', label: '', bg: COLORS.surface, labelColor: COLORS.textSecondary },
  observed: { dot: '🔵', label: 'OBSERVED', bg: '#EFF6FF', labelColor: '#2563EB' },
  predicted: { dot: '🟡', label: 'PREDICTED', bg: '#FFFBEB', labelColor: '#D97706' },
  recommendation: { dot: '🟢', label: 'RECOMMENDATION', bg: '#F0FDF4', labelColor: '#16A34A' },
};

export function ChatBubble({ role, content, type = 'normal', confidence }: ChatBubbleProps) {
  const isUser = role === 'user';
  const config = TYPE_CONFIG[type];

  if (isUser) {
    return (
      <View style={styles.userWrapper}>
        <View style={styles.userBubble}>
          <Typography variant="body" color={COLORS.white} style={styles.userText}>
            {content}
          </Typography>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.assistantWrapper}>
      <View style={[styles.assistantBubble, { backgroundColor: config.bg }]}>
        {type !== 'normal' && (
          <View style={styles.typeLabelRow}>
            <Typography variant="caption" style={styles.typeDot}>{config.dot}</Typography>
            <Typography
              variant="caption"
              color={config.labelColor}
              style={styles.typeLabel}
            >
              {config.label}
            </Typography>
          </View>
        )}
        <Typography variant="body" color={COLORS.text} style={styles.assistantText}>
          {content}
        </Typography>
        {confidence !== undefined && (
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.confidence}>
            Confidence: {confidence}%
          </Typography>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userWrapper: {
    alignItems: 'flex-end',
    marginBottom: SPACING.sm,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm + 2,
    maxWidth: '80%',
  },
  userText: {
    fontSize: 15,
    lineHeight: 22,
  },
  assistantWrapper: {
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  assistantBubble: {
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm + 2,
    maxWidth: '85%',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  typeLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  typeDot: {
    fontSize: 11,
  },
  typeLabel: {
    fontSize: 10,
    fontFamily: FONTS.bodySemiBold,
    letterSpacing: 0.5,
  },
  assistantText: {
    fontSize: 14,
    lineHeight: 21,
  },
  confidence: {
    fontSize: 11,
    marginTop: 2,
  },
});
