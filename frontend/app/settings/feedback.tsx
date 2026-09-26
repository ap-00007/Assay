import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  Star, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react-native';

const TOPICS = [
  'OCR Accuracy',
  'Copilot Intelligence',
  'Cash-Flow Forecast',
  'Bank Synchronization',
  'UI & Aesthetics',
  'Feature Request',
];

export default function FeedbackScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState('Copilot Intelligence');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!comments.trim()) {
      Alert.alert('Feedback Note', 'Please enter a few words about your experience.');
      return;
    }
    setSubmitted(true);
  };

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
          Send Feedback
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {submitted ? (
          <View style={styles.successCard}>
            <CheckCircle2 color="#16A34A" size={48} style={{ marginBottom: 12 }} />
            <Typography variant="h2" align="center" style={{ marginBottom: 6 }}>
              Thank you, Ashish!
            </Typography>
            <Typography variant="body" color={COLORS.textSecondary} align="center" style={{ lineHeight: 22, maxWidth: 280 }}>
              Your feedback helps our AI model better understand Indian banking debits and cash-flow patterns.
            </Typography>

            <TouchableOpacity 
              style={styles.doneBtn}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Typography variant="bodyBold" style={{ color: '#111827' }}>
                Return to Settings
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Typography variant="secondary" color={COLORS.textSecondary} style={{ marginBottom: 20 }}>
              Help us tailor Assay's quiet financial clarity to your daily spending habits.
            </Typography>

            {/* Rating Stars */}
            <View style={styles.ratingCard}>
              <Typography variant="cardHeading" style={{ marginBottom: 12 }}>
                Rate Your Experience
              </Typography>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    activeOpacity={0.7}
                    style={{ padding: 6 }}
                  >
                    <Star
                      color={star <= rating ? '#D6A928' : '#D1D5DB'}
                      fill={star <= rating ? '#D6A928' : 'none'}
                      size={32}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Topic Pills */}
            <Typography variant="cardHeading" style={styles.sectionTitle}>
              What area are you reviewing?
            </Typography>

            <View style={styles.topicsGrid}>
              {TOPICS.map((topic) => {
                const isActive = selectedTopic === topic;
                return (
                  <TouchableOpacity
                    key={topic}
                    style={[styles.topicPill, isActive && styles.topicPillActive]}
                    onPress={() => setSelectedTopic(topic)}
                    activeOpacity={0.75}
                  >
                    <Typography 
                      variant="caption" 
                      style={[styles.topicText, isActive && styles.topicTextActive]}
                    >
                      {topic}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Comments Field */}
            <Typography variant="cardHeading" style={styles.sectionTitle}>
              Your Comments or Suggestions
            </Typography>

            <View style={styles.inputCard}>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={5}
                placeholder="Tell us what you love or what financial insight you'd like Copilot to predict..."
                placeholderTextColor="#9CA3AF"
                value={comments}
                onChangeText={setComments}
                textAlignVertical="top"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={styles.submitBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Send color="#111827" size={18} style={{ marginRight: 8 }} />
              <Typography variant="bodyBold" style={{ color: '#111827' }}>
                Submit Feedback
              </Typography>
            </TouchableOpacity>

            <View style={{ height: 60 }} />
          </>
        )}
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
  ratingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 12,
    color: COLORS.text,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  topicPill: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  topicPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  topicText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  topicTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 24,
  },
  textArea: {
    height: 120,
    fontSize: 14.5,
    color: COLORS.text,
  },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.gold,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 32,
    alignItems: 'center',
    marginTop: 30,
  },
  doneBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 24,
  },
});
