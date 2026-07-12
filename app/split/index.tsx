import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { X, Check } from 'lucide-react-native';

export default function SmartSplitScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: 24}} /> {/* Spacer */}
        <Typography variant="bodyBold">Smart Split</Typography>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <X color={COLORS.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Typography variant="h3" style={styles.sectionTitle}>Receipt Summary</Typography>
        
        <Card style={styles.receiptCard}>
          <ReceiptItem name="Pizza Margherita" price="₹450" />
          <ReceiptItem name="Truffle Burger" price="₹380" />
          <ReceiptItem name="Cold Coffee" price="₹220" />
          <ReceiptItem name="Chocolate Lava Cake" price="₹250" />
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Typography variant="bodyMedium">Total</Typography>
            <Typography variant="h3">₹1,300</Typography>
          </View>
        </Card>

        <Typography variant="h3" style={styles.sectionTitle}>People</Typography>
        
        <View style={styles.peopleList}>
          <PersonRow name="Ashish (You)" amount="₹700" isSelected />
          <PersonRow name="Rohan" amount="₹380" />
          <PersonRow name="Sneha" amount="₹220" />
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Settle Up" 
          variant="primary" 
        />
      </View>
    </SafeAreaView>
  );
}

const ReceiptItem = ({ name, price }: { name: string, price: string }) => (
  <View style={styles.receiptItem}>
    <Typography variant="body">{name}</Typography>
    <Typography variant="bodyMedium">{price}</Typography>
  </View>
);

const PersonRow = ({ name, amount, isSelected = false }: { name: string, amount: string, isSelected?: boolean }) => (
  <Card style={styles.personCard}>
    <View style={styles.personRow}>
      <View style={styles.avatar}>
        <Typography variant="bodyBold" color={COLORS.white}>{name[0]}</Typography>
      </View>
      <View style={styles.personInfo}>
        <Typography variant="bodyBold">{name}</Typography>
        <Typography variant="body" color={COLORS.textMuted}>Owes {amount}</Typography>
      </View>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <Check color={COLORS.white} size={14} />}
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 16,
  },
  closeBtn: {
    padding: 8,
    marginRight: -8,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    marginBottom: 16,
    marginTop: 8,
  },
  receiptCard: {
    marginBottom: 32,
    paddingVertical: 16,
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  peopleList: {
    gap: 12,
  },
  personCard: {
    padding: 16,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  personInfo: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.padding,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  }
});
