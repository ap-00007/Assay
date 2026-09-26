import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  Send, 
  BarChart2, 
  TrendingUp, 
  Target, 
  Bot,
  ChevronLeft
} from 'lucide-react-native';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  hasDetailsButton?: boolean;
  detailsTarget?: { pathname: string; params?: Record<string, string> };
}

export default function CopilotChatScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hey Ashish! 👋\nHow can I help you today?',
      time: '9:41 AM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'How much did I spend on coffee this month?',
      time: '9:42 AM',
    },
    {
      id: '3',
      sender: 'bot',
      text: 'You spent ₹1,860 on coffee across 14 transactions this month ☕',
      time: '9:42 AM',
      hasDetailsButton: true,
      detailsTarget: { pathname: '/(tabs)/transactions', params: { query: 'coffee' } },
    },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      time: '9:43 AM',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate smart reply with routing
    setTimeout(() => {
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('afford') || lower.includes('phone') || lower.includes('buy')) {
        router.push('/copilot/affordability');
      } else if (lower.includes('risk') || lower.includes('cash-flow') || lower.includes('analysis')) {
        router.push('/copilot/analysis');
      } else {
        const botReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Based on your bank data, your discretionary spending is pacing within normal limits. Would you like a deep cash-flow analysis?`,
          time: '9:43 AM',
          hasDetailsButton: true,
        };
        setMessages((prev) => [...prev, botReply]);
      }
    }, 800);
  };

  const handleSuggestionPress = (promptText: string) => {
    setInputText(promptText);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Copilot Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>

        <View style={styles.robotAvatar}>
          <Bot color="#FFFFFF" size={26} />
        </View>

        <View style={styles.headerTextCol}>
          <Typography variant="h3" style={styles.botTitle}>
            Copilot AI
          </Typography>
          <Typography variant="caption" style={styles.botSubtitle}>
            Your money copilot ✨
          </Typography>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatScroll}
        >
          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <View key={msg.id} style={styles.userMsgWrapper}>
                  <View style={styles.userBubble}>
                    <Typography variant="body" color="#111827" style={styles.userText}>
                      {msg.text}
                    </Typography>
                  </View>
                  <Typography variant="caption" color={COLORS.textSecondary} style={styles.userTimestamp}>
                    {msg.time}
                  </Typography>
                </View>
              );
            }

            return (
              <View key={msg.id} style={styles.botMsgWrapper}>
                <View style={styles.botRow}>
                  <View style={styles.botSmallAvatar}>
                    <Bot color="#FFFFFF" size={18} />
                  </View>

                  <View style={styles.botBubble}>
                    <Typography variant="body" color={COLORS.text} style={styles.botText}>
                      {msg.text}
                    </Typography>

                    {msg.hasDetailsButton && (
                      <TouchableOpacity
                        style={styles.viewDetailsBtn}
                        activeOpacity={0.75}
                        onPress={() => {
                          if (msg.detailsTarget) {
                            router.push(msg.detailsTarget as any);
                          } else {
                            router.push('/copilot/analysis');
                          }
                        }}
                      >
                        <Typography variant="bodyBold" color={COLORS.text} style={styles.viewDetailsText}>
                          View details
                        </Typography>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <Typography variant="caption" color={COLORS.textSecondary} style={styles.botTimestamp}>
                  {msg.time}
                </Typography>
              </View>
            );
          })}
        </ScrollView>

        {/* Quick Suggestion Chips */}
        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsRow}>
            <TouchableOpacity
              style={styles.suggestionChip}
              onPress={() => handleSuggestionPress('Top merchants this month')}
              activeOpacity={0.7}
            >
              <BarChart2 color="#B45309" size={16} style={{ marginRight: 6 }} />
              <Typography variant="caption" style={styles.suggestionText}>
                Top merchants
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.suggestionChip}
              onPress={() => router.push('/copilot/analysis')}
              activeOpacity={0.7}
            >
              <TrendingUp color="#D97706" size={16} style={{ marginRight: 6 }} />
              <Typography variant="caption" style={styles.suggestionText}>
                Spending trend
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.suggestionChip}
              onPress={() => router.push('/copilot/affordability')}
              activeOpacity={0.7}
            >
              <Target color="#B45309" size={16} style={{ marginRight: 6 }} />
              <Typography variant="caption" style={styles.suggestionText}>
                Budget check
              </Typography>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Bottom Input Field */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask anything about your spending..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity 
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.8}
            >
              <Send color="#FFFFFF" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  backBtn: {
    marginRight: 10,
  },
  robotAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextCol: {
    justifyContent: 'center',
  },
  botTitle: {
    fontSize: 20,
    color: COLORS.text,
  },
  botSubtitle: {
    color: '#D6A928',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatScroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  userMsgWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  userBubble: {
    backgroundColor: '#E0E7FF',
    borderRadius: 20,
    borderBottomRightRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 14,
    maxWidth: '82%',
  },
  userText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userTimestamp: {
    marginTop: 4,
    fontSize: 11,
    marginRight: 4,
  },
  botMsgWrapper: {
    marginBottom: 20,
  },
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  botSmallAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 4,
  },
  botBubble: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    maxWidth: '82%',
  },
  botText: {
    fontSize: 15,
    lineHeight: 22,
  },
  viewDetailsBtn: {
    marginTop: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
  },
  botTimestamp: {
    marginLeft: 44,
    marginTop: 4,
    fontSize: 11,
  },
  suggestionsContainer: {
    paddingVertical: 10,
  },
  suggestionsRow: {
    paddingHorizontal: 20,
    gap: 8,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingTop: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 6,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
});
