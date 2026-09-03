import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { X, Send, Sparkles, Bot, ArrowUpRight } from 'lucide-react-native';

export default function AssayAIScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <View style={styles.headerTitleRow}>
          <Sparkles color={COLORS.gold} size={18} strokeWidth={2} />
          <Typography variant="bodyBold" style={{ marginLeft: 8, fontSize: 16 }}>
            Assay Intelligence
          </Typography>
        </View>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.closeBtn}
          activeOpacity={0.7}
        >
          <X color={COLORS.text} size={20} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.greetingContainer}>
            <View style={styles.aiAvatar}>
              <Sparkles color={COLORS.gold} size={28} strokeWidth={2} />
            </View>
            <Typography variant="h2" align="center" style={styles.greetingTitle}>
              Hi Ashish
            </Typography>
            <Typography variant="secondary" color={COLORS.textSecondary} align="center">
              Ask any question about your spending, leaks, or trends.
            </Typography>
          </View>

          <View style={styles.suggestionsList}>
            <SuggestionChip title="Top Merchants" onPress={() => setInput("What are my top merchants this month?")} />
            <SuggestionChip title="Budget Check" onPress={() => setInput("How is my budget pacing for this month?")} />
            <SuggestionChip title="Monthly Summary" onPress={() => setInput("Give me a summary of my spending.")} />
            <SuggestionChip title="How much did I spend on coffee?" onPress={() => setInput("How much did I spend on coffee?")} />
            <SuggestionChip title="Where is most of my money going?" onPress={() => setInput("Where is most of my money going?")} />
          </View>

          {/* Example Chat Bubble */}
          <View style={styles.chatArea}>
            <View style={styles.userBubble}>
              <Typography variant="body" color={COLORS.white}>
                What's my biggest expense category this month?
              </Typography>
            </View>
            <View style={styles.aiBubble}>
              <Typography variant="body" color={COLORS.text}>
                Your biggest expense category is <Typography variant="bodyBold">Food & Dining</Typography> at <Typography variant="financial">₹4,200</Typography> (34% of total).
              </Typography>
              <Typography variant="secondary" color={COLORS.textSecondary} style={{ marginTop: 8 }}>
                This is ₹860 higher than the same period last month, driven primarily by 8 Starbucks visits and weekend dining.
              </Typography>
            </View>
          </View>

        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ask Assay AI..."
              placeholderTextColor={COLORS.textSecondary}
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity 
              style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]} 
              activeOpacity={0.7}
              disabled={!input.trim()}
            >
              <Send color={COLORS.white} size={18} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const SuggestionChip = ({ title, onPress }: { title: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.suggestionChip} onPress={onPress} activeOpacity={0.7}>
    <Typography variant="caption" color={COLORS.primary}>{title}</Typography>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 32,
  },
  greetingContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  aiAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  greetingTitle: {
    marginBottom: 6,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  suggestionChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chatArea: {
    gap: 16,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
    maxWidth: '82%',
  },
  aiBubble: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  inputContainer: {
    padding: SIZES.padding,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: COLORS.text,
    height: 38,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  },
});
