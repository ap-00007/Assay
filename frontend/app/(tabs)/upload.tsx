import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { MerchantLogo } from '../../components/ui/MerchantLogo';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useAAState } from '../../services/aaState';
import { 
  Camera, 
  Image as ImageIcon,
  Receipt,
  FilePlus2,
  ScanLine
} from 'lucide-react-native';

interface UploadItem {
  id: string;
  merchant: string;
  title: string;
  time: string;
  amount: string;
  category: string;
  notes: string;
  status: 'Processed' | 'Analyzing';
}

const RECENT_UPLOADS: UploadItem[] = [
  { id: 'tx-1', merchant: 'starbucks', title: 'Starbucks Receipt', time: 'Today, 9:42 AM', amount: '₹250', category: 'Food & Dining', notes: 'Morning coffee ☕', status: 'Processed' },
  { id: 'tx-2', merchant: 'uber', title: 'Uber Ride', time: 'Today, 8:20 AM', amount: '₹120', category: 'Transport', notes: 'Morning Commute to HQ', status: 'Processed' },
  { id: 'tx-3', merchant: 'amazon', title: 'Amazon Purchase', time: 'Yesterday, 6:10 PM', amount: '₹899', category: 'Shopping', notes: 'Office Desk Accessories', status: 'Processed' },
];

export default function UploadScreen() {
  const router = useRouter();
  const aaState = useAAState();

  const [uploads, setUploads] = useState<UploadItem[]>(RECENT_UPLOADS);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanAction = (source: 'camera' | 'gallery' | 'manual') => {
    if (source === 'manual') {
      Alert.alert(
        'Manual Transaction',
        'Add a custom expense or cash transaction.',
        [
          { text: 'Add ₹150 Chai & Snacks', onPress: () => {
            const newItem: UploadItem = {
              id: `tx-${Date.now()}`,
              merchant: 'chaipoint',
              title: 'Chai Point',
              time: 'Just now',
              amount: '₹150',
              category: 'Food & Dining',
              notes: 'Manual entry: Evening tea',
              status: 'Processed'
            };
            setUploads(prev => [newItem, ...prev]);
          }},
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      return;
    }

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert(
        'Receipt Extracted Successfully',
        'Assay OCR detected ₹340 at Starbucks. Normalized & added to Transactions.',
        [
          { 
            text: 'View Transaction', 
            onPress: () => router.push({
              pathname: '/transaction/[id]',
              params: {
                id: 'tx-1',
                name: 'Starbucks',
                merchantKey: 'starbucks',
                amount: '₹340',
                time: 'Just now',
                method: 'UPI',
                category: 'Food & Dining',
                notes: 'Scanned receipt breakdown: Caffè Americano + Cinnamon Roll'
              }
            }) 
          },
          { text: 'OK' }
        ]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Typography variant="pageTitle" style={styles.headerTitle}>
          Add financial activity
        </Typography>
        <Typography variant="secondary" color={COLORS.textSecondary} style={styles.headerSubtitle}>
          Upload receipts, UPI screenshots, or manual entries.
        </Typography>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dashed Drop Zone */}
        <TouchableOpacity 
          style={styles.dropZone}
          activeOpacity={0.75}
          onPress={() => handleScanAction('camera')}
        >
          <Camera color={COLORS.text} size={42} strokeWidth={1.6} style={styles.dropZoneIcon} />
          <Typography variant="cardHeading" style={styles.dropZoneTitle}>
            {isScanning ? 'Analyzing Receipt / UPI...' : 'Tap to scan receipt'}
          </Typography>
          <Typography variant="secondary" color={COLORS.textSecondary}>
            or upload UPI payment screenshot from gallery
          </Typography>
        </TouchableOpacity>

        {/* Triple Actions: Gallery, Camera, Manual */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            style={styles.actionButton}
            activeOpacity={0.75}
            onPress={() => handleScanAction('gallery')}
          >
            <ImageIcon color={COLORS.text} size={18} style={{ marginRight: 6 }} />
            <Typography variant="bodyBold" color={COLORS.text} style={styles.actionButtonText}>
              Gallery
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            activeOpacity={0.75}
            onPress={() => handleScanAction('camera')}
          >
            <Camera color={COLORS.text} size={18} style={{ marginRight: 6 }} />
            <Typography variant="bodyBold" color={COLORS.text} style={styles.actionButtonText}>
              Camera
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            activeOpacity={0.75}
            onPress={() => handleScanAction('manual')}
          >
            <FilePlus2 color={COLORS.text} size={18} style={{ marginRight: 6 }} />
            <Typography variant="bodyBold" color={COLORS.text} style={styles.actionButtonText}>
              Manual
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Live Bank Sync banner is NEVER shown once AA onboarding is completed */}
        {!aaState.aa_onboarding_completed && (
          <TouchableOpacity
            style={styles.aaBanner}
            activeOpacity={0.8}
            onPress={() => router.push('/connect')}
          >
            <View style={styles.aaBannerLeft}>
              <Typography variant="caption" color={COLORS.gold} style={{ fontFamily: FONTS.bodyBold, letterSpacing: 0.8 }}>
                RBI ACCOUNT AGGREGATOR
              </Typography>
              <Typography variant="bodyBold" color={COLORS.primary} style={{ marginTop: 2 }}>
                Sync Live Bank Accounts
              </Typography>
              <Typography variant="secondary" color={COLORS.textSecondary} style={{ marginTop: 2 }}>
                Automate statements with consent-based data access.
              </Typography>
            </View>
            <Typography variant="caption" color={COLORS.primary} style={{ fontFamily: FONTS.bodySemiBold }}>
              Connect →
            </Typography>
          </TouchableOpacity>
        )}

        {/* Recent Uploads Section */}
        <View style={styles.recentSectionHeader}>
          <Typography variant="cardHeading" style={styles.sectionTitle}>
            Recent uploads
          </Typography>
          <TouchableOpacity activeOpacity={0.7}>
            <Typography variant="caption" color={COLORS.textSecondary}>
              View all
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Upload Cards */}
        {uploads.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.uploadCard}
            activeOpacity={0.75}
            onPress={() => router.push({
              pathname: '/transaction/[id]',
              params: {
                id: item.id,
                name: item.title.replace(' Receipt', '').replace(' Ride', '').replace(' Purchase', '').replace(' Groceries', '').replace(' Gourmet', ''),
                merchantKey: item.merchant,
                amount: item.amount,
                time: item.time,
                method: 'UPI',
                category: item.category,
                notes: item.notes
              }
            })}
          >
            {/* Standardized Brand Logo */}
            <MerchantLogo name={item.merchant} size={46} style={{ marginRight: 14 }} />

            <View style={styles.uploadInfo}>
              <Typography variant="bodyBold" style={styles.uploadTitle}>
                {item.title}
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary} style={{ marginBottom: 6 }}>
                {item.time}
              </Typography>
              
              <View style={styles.processedBadge}>
                <Typography variant="caption" style={styles.processedText}>
                  {item.status}
                </Typography>
              </View>
            </View>

            <Typography variant="financial" style={styles.amountText}>
              {item.amount}
            </Typography>
          </TouchableOpacity>
        ))}

        <View style={{ height: 110 }} />
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    color: COLORS.text,
  },
  headerSubtitle: {
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  dropZone: {
    backgroundColor: '#FAF9F5',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D4CEB8',
    borderRadius: 24,
    paddingVertical: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dropZoneIcon: {
    marginBottom: 10,
  },
  dropZoneTitle: {
    fontSize: 19,
    marginBottom: 4,
    color: COLORS.text,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 26,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 12,
  },
  actionButtonText: {
    fontSize: 14,
  },
  recentSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.text,
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },
  uploadInfo: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 15,
    marginBottom: 2,
    color: COLORS.text,
  },
  processedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  processedText: {
    color: '#16A34A',
    fontSize: 11,
    fontWeight: '600',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 12,
  },
  aaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.35)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  aaBannerLeft: {
    flex: 1,
    paddingRight: 10,
  },
});
