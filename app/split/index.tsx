import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { X, Check, Users } from 'lucide-react-native';

export default function SmartSplitScreen() {
  const router = useRouter();
  const [selectedPeople, setSelectedPeople] = useState<string[]>(['Ashish (You)', 'Rohan']);

  const togglePerson = (name: string) => {
    if (selectedPeople.includes(name)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== name));
    } else {
      setSelectedPeople([...selectedPeople, name]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Typography variant="bodyBold" style={{ fontSize: 16 }}>
          Split Bill
        </Typography>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.closeBtn}
          activeOpacity={0.7}
        >
          <X color={COLORS.text} size={20} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Typography variant="h3" style={styles.sectionTitle}>
          Receipt Summary
        </Typography>
        
        <Card style={styles.receiptCard}>
          <ReceiptItem name="Pizza Margherita" price="₹450" />
          <ReceiptItem name="Truffle Burger" price="₹380" />
          <ReceiptItem name="Cold Coffee" price="₹220" />
          <ReceiptItem name="Chocolate Lava Cake" price="₹250" isLast />
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Typography variant="bodyMedium">Total Amount</Typography>
            <Typography variant="financial" color={COLORS.text} style={{ fontSize: 20 }}>
              ₹1,300
            </Typography>
          </View>
        </Card>

        <Typography variant="h3" style={styles.sectionTitle}>
          Split Amongst
        </Typography>
        
        <View style={styles.peopleList}>
          <PersonRow 
            name="Ashish (You)" 
            amount="₹650" 
            isSelected={selectedPeople.includes('Ashish (You)')}
            onToggle={() => togglePerson('Ashish (You)')}
          />
          <PersonRow 
            name="Rohan" 
            amount="₹380" 
            isSelected={selectedPeople.includes('Rohan')}
            onToggle={() => togglePerson('Rohan')}
          />
          <PersonRow 
            name="Sneha" 
            amount="₹270" 
            isSelected={selectedPeople.includes('Sneha')}
            onToggle={() => togglePerson('Sneha')}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Send UPI Payment Requests" 
          variant="primary" 
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}

const ReceiptItem = ({ name, price, isLast = false }: { name: string; price: string; isLast?: boolean }) => (
  <View style={[styles.receiptItem, !isLast && styles.receiptItemBorder]}>
    <Typography variant="body">{name}</Typography>
    <Typography variant="bodyMedium">{price}</Typography>
  </View>
);

const PersonRow = ({ 
  name, 
  amount, 
  isSelected = false,
  onToggle 
}: { 
  name: string; 
  amount: string; 
  isSelected?: boolean;
  onToggle: () => void;
}) => (
  <Card style={styles.personCard} onPress={onToggle} variant="interactive">
    <View style={styles.personRow}>
      <View style={styles.avatar}>
        <Typography variant="bodyBold" color={COLORS.white}>{name[0]}</Typography>
      </View>
      <View style={styles.personInfo}>
        <Typography variant="bodyBold">{name}</Typography>
        <Typography variant="secondary" color={COLORS.textSecondary}>Owes {amount}</Typography>
      </View>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <Check color={COLORS.white} size={14} strokeWidth={2.5} />}
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    paddingTop: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    marginTop: 8,
  },
  receiptCard: {
    marginBottom: SPACING.xl,
    padding: 16,
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  receiptItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  peopleList: {
    gap: 12,
  },
  personCard: {
    padding: 14,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  personInfo: {
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
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
    paddingBottom: 36,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
