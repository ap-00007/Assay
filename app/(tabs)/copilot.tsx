import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { ChatBubble } from '../../components/ui/ChatBubble';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import {
  MOCK_QUICK_QUESTIONS,
  MOCK_CHAT_MESSAGES,
  ChatMessage,
} from '../../constants/mockData';
import { Send, Bot } from 'lucide-react-native';

const AFFORDABILITY_RESPONSE: ChatMessage[] = [
  {
    id: 'r1',
    role: 'assistant',
    content: 'Current balance: ₹42,000. Upcoming obligations: ₹28,200',
    type: 'observed',
  },
  {
    id: 'r2',
    role: 'assistant',
    content: 'After upcoming payments, your balance may be ₹13,800.',
    type: 'predicted',
    confidence: 87,
  },
  {
    id: 'r3',
    role: 'assistant',
    content: 'Consider waiting until your next salary to maintain a healthy cash buffer.',
    type: 'recommendation',
  },
];

export default function CopilotScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const flatRef = useRef<FlatList>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text };
    const newMessages = [...messages, userMsg];

    // Simulate AI response for affordability question
    const isAffordability = text.toLowerCase().includes('afford') || text.toLowerCase().includes('phone');
    const response = isAffordability
      ? AFFORDABILITY_RESPONSE
      : [
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant' as const,
            content: `I'm analyzing your financial data for "${text}"... Based on your current spending patterns and balance, here's what I see.`,
            type: 'normal' as const,
          },
        ];

    setMessages([...newMessages, ...response]);
    setInput('');
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleQuickQuestion = (q: string) => sendMessage(q);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.botIconWrapper}>
            <Bot color={COLORS.gold} size={22} strokeWidth={1.8} />
          </View>
          <View>
            <Typography variant="cardHeading" color={COLORS.text} style={styles.headerTitle}>
              FinCopilot
            </Typography>
            <Typography variant="caption" color={COLORS.success} style={styles.headerSub}>
              ● Your AI financial assistant
            </Typography>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <ChatBubble
              role={item.role}
              content={item.content}
              type={item.type}
              confidence={item.confidence}
            />
          )}
          ListFooterComponent={
            messages.length === 1 ? (
              <View style={styles.quickQSection}>
                <Typography variant="caption" color={COLORS.textSecondary} style={styles.quickQLabel}>
                  Try asking:
                </Typography>
                <View style={styles.quickQList}>
                  {MOCK_QUICK_QUESTIONS.map((q) => (
                    <TouchableOpacity
                      key={q}
                      style={styles.quickQChip}
                      onPress={() => handleQuickQuestion(q)}
                      activeOpacity={0.75}
                    >
                      <Typography variant="secondary" color={COLORS.text} style={styles.quickQText}>
                        {q}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null
          }
        />

        {/* Bottom Comparison Bar (shown after affordability response) */}
        {messages.some((m) => m.type === 'recommendation') && (
          <View style={styles.comparisonBar}>
            <View style={styles.comparisonItem}>
              <Typography variant="caption" color={COLORS.error} style={styles.compLabel}>
                Buy Now
              </Typography>
              <Typography variant="financial" color={COLORS.text} style={styles.compValue}>
                ₹12,000
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                projected balance
              </Typography>
            </View>
            <View style={styles.comparisonDivider} />
            <View style={styles.comparisonItem}>
              <Typography variant="caption" color={COLORS.success} style={styles.compLabel}>
                Wait
              </Typography>
              <Typography variant="financial" color={COLORS.text} style={styles.compValue}>
                ₹32,400
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                projected balance
              </Typography>
            </View>
          </View>
        )}

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything about your finances..."
            placeholderTextColor={COLORS.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            activeOpacity={input.trim() ? 0.8 : 1}
          >
            <Send color={input.trim() ? COLORS.white : COLORS.textSecondary} size={18} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  botIconWrapper: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 16 },
  headerSub: { fontSize: 11, marginTop: 1 },

  messageList: {
    padding: SPACING.xl,
    gap: SPACING.xs,
    flexGrow: 1,
  },

  quickQSection: {
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  quickQLabel: { fontSize: 11, letterSpacing: 0.3, fontFamily: FONTS.bodySemiBold },
  quickQList: { gap: SPACING.sm },
  quickQChip: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.smallRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm + 2,
  },
  quickQText: { fontSize: 14 },

  comparisonBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  comparisonItem: { flex: 1, alignItems: 'center', gap: 2 },
  comparisonDivider: { width: 1, backgroundColor: COLORS.border, alignSelf: 'stretch', marginHorizontal: SPACING.md },
  compLabel: { fontFamily: FONTS.bodySemiBold, fontSize: 11 },
  compValue: { fontSize: 16 },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm + 2,
    maxHeight: 100,
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  },
});
