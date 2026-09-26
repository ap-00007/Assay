import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { ChevronLeft, Check, Globe } from 'lucide-react-native';

interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
}

const LANGUAGES: LanguageOption[] = [
  { id: 'en', name: 'English', nativeName: 'English (Default)' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('en');

  const handleSelect = (lang: LanguageOption) => {
    setSelectedLang(lang.id);
    Alert.alert('Language Selected', `Assay Copilot and UI language updated to ${lang.name}.`);
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
          Language
        </Typography>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.banner}>
          <Globe color={COLORS.gold} size={22} style={{ marginRight: 12 }} />
          <Typography variant="caption" color={COLORS.text} style={{ flex: 1, lineHeight: 18 }}>
            Assay Copilot can analyze receipts, answer financial questions, and audit bank SMS statements in multiple Indian languages.
          </Typography>
        </View>

        <View style={styles.groupCard}>
          {LANGUAGES.map((lang, index) => {
            const isSelected = selectedLang === lang.id;
            return (
              <React.Fragment key={lang.id}>
                <TouchableOpacity
                  style={styles.langRow}
                  onPress={() => handleSelect(lang)}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Typography variant="bodyBold" style={{ fontSize: 15 }}>
                      {lang.name}
                    </Typography>
                    <Typography variant="caption" color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                      {lang.nativeName}
                    </Typography>
                  </View>

                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Check color="#FFFFFF" size={14} strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>
                {index < LANGUAGES.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9F5',
    borderWidth: 1,
    borderColor: '#E7E7E3',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  groupCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});
