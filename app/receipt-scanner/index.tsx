import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { X, Camera, CheckCircle, RefreshCw } from 'lucide-react-native';

// Simulated scanned receipt data
const MOCK_SCANNED = {
  merchant: 'ZOMATO',
  address: '4th Floor, Bengaluru',
  billNo: '12345',
  date: '12 Sep 2026',
  items: [
    { name: 'Paneer Pizza', qty: 1, price: 256 },
    { name: 'Coke', qty: 1, price: 60 },
  ],
  tax: 0,
  total: 310,
};

type ScanState = 'idle' | 'scanning' | 'scanned';

export default function ReceiptScannerScreen() {
  const router = useRouter();
  const [state, setState] = useState<ScanState>('idle');

  const handleScan = () => {
    setState('scanning');
    setTimeout(() => setState('scanned'), 1800);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="cardHeading" color={COLORS.white} style={styles.headerTitle}>
          Scan Receipt
        </Typography>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} activeOpacity={0.7}>
          <X color={COLORS.white} size={22} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      {state !== 'scanned' ? (
        /* Camera Viewfinder */
        <View style={styles.viewfinderSection}>
          <View style={styles.viewfinder}>
            {/* Corner brackets */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {state === 'scanning' && (
              <View style={styles.scanLine} />
            )}

            <View style={styles.viewfinderContent}>
              {state === 'idle' ? (
                <>
                  <Camera color="rgba(255,255,255,0.5)" size={48} strokeWidth={1} />
                  <Typography variant="secondary" style={styles.viewfinderHint}>
                    Position your receipt within the frame
                  </Typography>
                </>
              ) : (
                <View style={styles.scanningIndicator}>
                  <RefreshCw color={COLORS.gold} size={32} strokeWidth={1.8} />
                  <Typography variant="bodyMedium" color={COLORS.gold} style={styles.scanningText}>
                    Scanning...
                  </Typography>
                </View>
              )}
            </View>
          </View>

          {/* Scan Button */}
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={handleScan}
            activeOpacity={0.85}
            disabled={state === 'scanning'}
          >
            <View style={styles.scanBtnInner} />
          </TouchableOpacity>

          <Typography variant="secondary" color="rgba(255,255,255,0.5)" style={styles.scanHint}>
            Tap the button to scan
          </Typography>
        </View>
      ) : (
        /* Scanned Result */
        <ScrollView
          contentContainerStyle={styles.resultScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Success Banner */}
          <View style={styles.successBanner}>
            <CheckCircle color={COLORS.success} size={20} strokeWidth={2} />
            <Typography variant="bodyMedium" color={COLORS.success} style={styles.successText}>
              Receipt scanned successfully!
            </Typography>
          </View>

          {/* Receipt Card */}
          <View style={styles.receiptCard}>
            {/* Header */}
            <View style={styles.receiptHeader}>
              <Typography variant="h2" color={COLORS.text} style={styles.merchantName}>
                {MOCK_SCANNED.merchant}
              </Typography>
              <Typography variant="caption" color={COLORS.textSecondary}>
                {MOCK_SCANNED.address}
              </Typography>

              <View style={styles.receiptMeta}>
                <View style={styles.metaRow}>
                  <Typography variant="caption" color={COLORS.textSecondary}>Bill No.</Typography>
                  <Typography variant="caption" color={COLORS.text} style={styles.metaValue}>
                    #{MOCK_SCANNED.billNo}
                  </Typography>
                </View>
                <View style={styles.metaRow}>
                  <Typography variant="caption" color={COLORS.textSecondary}>Date</Typography>
                  <Typography variant="caption" color={COLORS.text} style={styles.metaValue}>
                    {MOCK_SCANNED.date}
                  </Typography>
                </View>
              </View>
            </View>

            <View style={styles.receiptDivider} />

            {/* Items */}
            <View style={styles.itemsSection}>
              {MOCK_SCANNED.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                  <Typography variant="body" color={COLORS.text} style={styles.itemQty}>
                    {item.qty} ×
                  </Typography>
                  <Typography variant="bodyMedium" color={COLORS.text} style={styles.itemName}>
                    {item.name}
                  </Typography>
                  <Typography variant="financial" color={COLORS.text} style={styles.itemPrice}>
                    ₹{item.price}
                  </Typography>
                </View>
              ))}
            </View>

            <View style={styles.receiptDivider} />

            {/* Total */}
            <View style={styles.totalRow}>
              <Typography variant="cardHeading" color={COLORS.text}>Total</Typography>
              <Typography variant="h2" color={COLORS.text} style={styles.totalAmount}>
                ₹{MOCK_SCANNED.total}
              </Typography>
            </View>

            {/* Category Auto-detected */}
            <View style={styles.categoryTag}>
              <Typography variant="caption" color={COLORS.gold} style={styles.catTagText}>
                🍽️ Food & Dining — auto-detected
              </Typography>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => setState('idle')}
              activeOpacity={0.75}
            >
              <Typography variant="bodyMedium" color={COLORS.text}>Retake</Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => router.back()}
              activeOpacity={0.85}
            >
              <Typography variant="bodyMedium" color={COLORS.primary} style={styles.saveBtnText}>
                Save Transaction
              </Typography>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const CORNER_SIZE = 24;
const CORNER_THICKNESS = 3;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1A' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.xl, paddingVertical: SPACING.base,
  },
  headerTitle: { fontSize: 18 },
  closeBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },

  /* Viewfinder */
  viewfinderSection: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.xl,
  },
  viewfinder: {
    width: 300, height: 420,
    borderRadius: 16, position: 'relative',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  corner: {
    position: 'absolute', width: CORNER_SIZE, height: CORNER_SIZE,
    borderColor: COLORS.gold, borderWidth: CORNER_THICKNESS,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  scanLine: {
    position: 'absolute', left: 16, right: 16, height: 2,
    backgroundColor: COLORS.gold, top: '40%', opacity: 0.8,
  },
  viewfinderContent: { alignItems: 'center', gap: SPACING.md },
  viewfinderHint: { color: 'rgba(255,255,255,0.45)', textAlign: 'center', maxWidth: 200 },
  scanningIndicator: { alignItems: 'center', gap: SPACING.sm },
  scanningText: { fontSize: 15 },

  scanBtn: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  scanBtnInner: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.gold,
  },
  scanHint: { fontSize: 13 },

  /* Result */
  resultScroll: {
    paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, gap: SPACING.xl,
  },
  successBanner: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: '#DCFCE7', borderRadius: SIZES.smallRadius,
    padding: SPACING.md, borderWidth: 1, borderColor: '#BBF7D0',
  },
  successText: { fontSize: 14 },

  receiptCard: {
    backgroundColor: COLORS.surface, borderRadius: SIZES.cardRadius,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  receiptHeader: {
    padding: SPACING.lg, alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  merchantName: { fontSize: 22, letterSpacing: 1 },
  receiptMeta: { gap: SPACING.xs, width: '100%', marginTop: SPACING.sm },
  metaRow: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  metaValue: { fontFamily: FONTS.bodySemiBold },
  receiptDivider: {
    height: 1, backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
  },
  itemsSection: { padding: SPACING.lg, gap: SPACING.md },
  itemRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
  },
  itemQty: { fontSize: 14, color: COLORS.textSecondary, width: 28 },
  itemName: { flex: 1, fontSize: 14 },
  itemPrice: { fontSize: 14 },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: SPACING.lg,
  },
  totalAmount: { fontSize: 26 },
  categoryTag: {
    backgroundColor: COLORS.gold + '18',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
    borderTopWidth: 1, borderTopColor: COLORS.gold + '30',
  },
  catTagText: { fontFamily: FONTS.bodySemiBold, fontSize: 12 },

  actionRow: {
    flexDirection: 'row', gap: SPACING.md,
  },
  retryBtn: {
    flex: 1, paddingVertical: SPACING.base,
    borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.border,
    backgroundColor: COLORS.surface, alignItems: 'center',
  },
  saveBtn: {
    flex: 2, paddingVertical: SPACING.base,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gold, alignItems: 'center',
  },
  saveBtnText: { fontFamily: FONTS.bodySemiBold, color: COLORS.primary },
});
