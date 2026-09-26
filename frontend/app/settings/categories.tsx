import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS } from '../../constants/theme';
import { 
  ChevronLeft, 
  Plus, 
  Utensils, 
  ShoppingBag, 
  Car, 
  Zap, 
  Film, 
  HeartPulse, 
  Briefcase,
  X,
  Check
} from 'lucide-react-native';

interface CategoryItem {
  id: string;
  name: string;
  budget: string;
  spent: string;
  color: string;
  iconName: string;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Food & Dining', budget: '₹12,000', spent: '₹8,450', color: '#D97706', iconName: 'utensils' },
  { id: '2', name: 'Shopping & E-Commerce', budget: '₹8,000', spent: '₹4,300', color: '#2563EB', iconName: 'shopping' },
  { id: '3', name: 'Transportation & Commute', budget: '₹5,000', spent: '₹2,800', color: '#16A34A', iconName: 'car' },
  { id: '4', name: 'Utilities & Bills', budget: '₹6,500', spent: '₹4,100', color: '#9333EA', iconName: 'zap' },
  { id: '5', name: 'Entertainment & Subscriptions', budget: '₹3,500', spent: '₹1,950', color: '#EA580C', iconName: 'film' },
  { id: '6', name: 'Healthcare & Fitness', budget: '₹4,000', spent: '₹1,450', color: '#059669', iconName: 'heart' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatBudget, setNewCatBudget] = useState('');

  const renderIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'utensils': return <Utensils color={color} size={20} />;
      case 'shopping': return <ShoppingBag color={color} size={20} />;
      case 'car': return <Car color={color} size={20} />;
      case 'zap': return <Zap color={color} size={20} />;
      case 'film': return <Film color={color} size={20} />;
      default: return <HeartPulse color={color} size={20} />;
    }
  };

  const handleAddCategory = () => {
    if (!newCatName.trim() || !newCatBudget.trim()) {
      Alert.alert('Incomplete Fields', 'Please enter a name and monthly budget.');
      return;
    }
    const newCat: CategoryItem = {
      id: Date.now().toString(),
      name: newCatName.trim(),
      budget: `₹${newCatBudget.replace(/[^0-9]/g, '')}`,
      spent: '₹0',
      color: '#D6A928',
      iconName: 'utensils',
    };
    setCategories((prev) => [...prev, newCat]);
    setNewCatName('');
    setNewCatBudget('');
    setModalVisible(false);
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
          Categories & Budgets
        </Typography>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Plus color={COLORS.gold} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Typography variant="secondary" color={COLORS.textSecondary} style={{ marginBottom: 16 }}>
          Define spending thresholds for AI auto-categorization and overdraft warnings.
        </Typography>

        {categories.map((cat) => (
          <View key={cat.id} style={styles.categoryCard}>
            <View style={[styles.iconBox, { backgroundColor: `${cat.color}15` }]}>
              {renderIcon(cat.iconName, cat.color)}
            </View>

            <View style={styles.catDetails}>
              <Typography variant="bodyBold" style={{ fontSize: 15 }}>
                {cat.name}
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                Spent {cat.spent} of {cat.budget}
              </Typography>
            </View>

            <View style={styles.budgetPill}>
              <Typography variant="caption" style={styles.budgetText}>
                {cat.budget}/mo
              </Typography>
            </View>
          </View>
        ))}

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Add Category Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Typography variant="h3">Add Category</Typography>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color={COLORS.text} size={20} />
              </TouchableOpacity>
            </View>

            <Typography variant="caption" color={COLORS.textSecondary} style={{ marginBottom: 4 }}>
              Category Name
            </Typography>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Travel, Books, Gifts"
              value={newCatName}
              onChangeText={setNewCatName}
            />

            <Typography variant="caption" color={COLORS.textSecondary} style={{ marginBottom: 4, marginTop: 12 }}>
              Monthly Spending Cap (₹)
            </Typography>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. 5000"
              keyboardType="numeric"
              value={newCatBudget}
              onChangeText={setNewCatBudget}
            />

            <TouchableOpacity 
              style={styles.createBtn}
              onPress={handleAddCategory}
              activeOpacity={0.8}
            >
              <Typography variant="bodyBold" style={{ color: '#111827' }}>
                Save Category
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  addBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  catDetails: {
    flex: 1,
  },
  budgetPill: {
    backgroundColor: '#FAF9F5',
    borderWidth: 1,
    borderColor: '#E7E7E3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  budgetText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#FAF9F5',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  createBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
});
