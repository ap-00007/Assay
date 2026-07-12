import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { X, Send, Bot, Sparkles } from 'lucide-react-native';

export default function AssayAIScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: 24}} /> {/* Spacer */}
        <View style={styles.headerTitleRow}>
          <Sparkles color={COLORS.gold} size={18} />
          <Typography variant="bodyBold" style={{marginLeft: 8}}>Assay AI</Typography>
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <X color={COLORS.text} size={24} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.greetingContainer}>
            <View style={styles.aiAvatar}>
              <Bot color={COLORS.white} size={32} />
            </View>
            <Typography variant="h2" align="center" style={styles.greetingTitle}>
              Hi Ashish 👋
            </Typography>
            <Typography variant="body" color={COLORS.textMuted} align="center">
              How can I help you today?
            </Typography>
          </View>

          <View style={styles.suggestionsList}>
            <SuggestionChip title="Top Merchants" />
            <SuggestionChip title="Budget Check" />
            <SuggestionChip title="Monthly Summary" />
            <SuggestionChip title="How much did I spend on coffee?" />
            <SuggestionChip title="Where is most of my money going?" />
            <SuggestionChip title="Did I overspend this week?" />
          </View>

          {/* Example mock chat bubble */}
          <View style={styles.chatArea}>
            <View style={styles.userBubble}>
              <Typography variant="body" color={COLORS.white}>What's my biggest expense this month?</Typography>
            </View>
            <View style={styles.aiBubble}>
              <Typography variant="body">Your biggest expense this month is Food & Dining, totaling ₹4,200. This is 20% higher than last month.</Typography>
            </View>
          </View>

        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ask Assay..."
              placeholderTextColor={COLORS.textMuted}
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.7}>
              <Send color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const SuggestionChip = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.suggestionChip}>
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
    padding: 8,
    marginRight: -8,
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: 40,
  },
  greetingContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  aiAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  greetingTitle: {
    marginBottom: 8,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  suggestionChip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    borderRadius: 20,
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  aiBubble: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    ...SHADOWS.soft,
  },
  inputContainer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
    height: 40,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});
