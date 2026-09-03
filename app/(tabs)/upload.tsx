import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { COLORS, SIZES, SPACING } from '../../constants/theme';
import { 
  Camera, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Tag,
  ShieldCheck,
  Building2
} from 'lucide-react-native';

export default function UploadScreen() {
  const router = useRouter();
  const [extractedDemo, setExtractedDemo] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSimulateScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedDemo(true);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Unified Header */}
      <ScreenHeader 
        title="Upload Receipt" 
        subtitle="Extract. Understand. Track."
        showNotification
        onNotificationPress={() => router.push('/ai')}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Large Upload Surface */}
        <TouchableOpacity 
          activeOpacity={0.85}
          onPress={handleSimulateScan}
        >
          <Card style={styles.uploadArea}>
            <View style={styles.uploadIconContainer}>
              <Camera color={COLORS.white} size={28} strokeWidth={1.8} />
            </View>
            <Typography variant="h3" align="center" style={styles.uploadTitle}>
              Tap to Scan Receipt
            </Typography>
            <Typography variant="secondary" color={COLORS.textSecondary} align="center" style={styles.uploadSub}>
              or upload UPI screenshot from gallery
            </Typography>

            <View style={styles.uploadActions}>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={handleSimulateScan}
                activeOpacity={0.7}
              >
                <ImageIcon color={COLORS.primary} size={18} strokeWidth={1.8} />
                <Typography variant="bodyMedium" color={COLORS.primary} style={styles.actionBtnText}>
                  Gallery
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionBtn, styles.actionBtnPrimary]}
                onPress={handleSimulateScan}
                activeOpacity={0.7}
              >
                <Camera color={COLORS.white} size={18} strokeWidth={1.8} />
                <Typography variant="bodyMedium" color={COLORS.white} style={styles.actionBtnText}>
                  Camera
                </Typography>
              </TouchableOpacity>
            </View>
          </Card>
        </TouchableOpacity>

        {/* AI Extraction Pipeline Preview Card */}
        {extractedDemo && (
          <Card style={styles.pipelineCard}>
            <View style={styles.pipelineHeader}>
              <View style={styles.pipelineBadge}>
                <Sparkles color={COLORS.gold} size={16} strokeWidth={2} />
                <Typography variant="caption" color={COLORS.primary} style={styles.pipelineBadgeText}>
                  Assay Intelligence
                </Typography>
              </View>
              <View style={styles.confidenceBadge}>
                <ShieldCheck color={COLORS.success} size={14} strokeWidth={2} />
                <Typography variant="caption" color={COLORS.success} style={{ marginLeft: 4 }}>
                  99% Confidence
                </Typography>
              </View>
            </View>

            {/* Pipeline Stage Indicators */}
            <View style={styles.stagesRow}>
              <StageItem label="Image" completed />
              <ArrowRight color={COLORS.border} size={14} />
              <StageItem label="OCR" completed />
              <ArrowRight color={COLORS.border} size={14} />
              <StageItem label="Extracted" completed />
              <ArrowRight color={COLORS.border} size={14} />
              <StageItem label="Categorized" completed />
            </View>

            <View style={styles.extractedDetails}>
              <DetailRow label="Merchant" value="Blue Tokai Coffee" icon={<Building2 size={16} color={COLORS.textSecondary} />} />
              <DetailRow label="Amount" value="₹420.00" isFinancial />
              <DetailRow label="Date & Time" value="Today, 11:20 AM" />
              <DetailRow label="Category" value="Food & Dining" tag />
              <DetailRow label="Payment Source" value="Google Pay • UPI" isLast />
            </View>

            <Button 
              title="Confirm & Save Transaction" 
              variant="primary" 
              size="md"
              onPress={() => router.push('/transactions')}
              style={styles.confirmBtn}
            />
          </Card>
        )}

        {/* Recent Uploads */}
        <View style={styles.recentHeader}>
          <Typography variant="h3">Recent Uploads</Typography>
        </View>

        <Card variant="list" style={styles.recentListCard}>
          <UploadItem 
            merchant="Swiggy Delivery" 
            amount="₹840" 
            time="2 hours ago" 
            status="Processed" 
            showDivider
          />
          <UploadItem 
            merchant="Shell Petrol Pump" 
            amount="₹2,500" 
            time="Yesterday, 5:30 PM" 
            status="Processed" 
            showDivider
          />
          <UploadItem 
            merchant="Blinkit Grocery" 
            amount="₹1,120" 
            time="3 days ago" 
            status="Processed" 
          />
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const StageItem = ({ label, completed }: { label: string; completed?: boolean }) => (
  <View style={styles.stageItem}>
    <View style={[styles.stageDot, completed && styles.stageDotActive]}>
      {completed && <CheckCircle2 color={COLORS.white} size={10} strokeWidth={2.5} />}
    </View>
    <Typography variant="caption" color={completed ? COLORS.primary : COLORS.textSecondary} style={styles.stageLabel}>
      {label}
    </Typography>
  </View>
);

const DetailRow = ({ 
  label, 
  value, 
  icon, 
  tag = false, 
  isFinancial = false,
  isLast = false 
}: { 
  label: string; 
  value: string; 
  icon?: React.ReactNode; 
  tag?: boolean; 
  isFinancial?: boolean;
  isLast?: boolean;
}) => (
  <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
    <Typography variant="secondary" color={COLORS.textSecondary}>
      {label}
    </Typography>
    {tag ? (
      <View style={styles.tagBadge}>
        <Typography variant="caption" color={COLORS.primary}>
          {value}
        </Typography>
      </View>
    ) : (
      <Typography 
        variant={isFinancial ? "financial" : "bodyMedium"} 
        color={COLORS.text}
      >
        {value}
      </Typography>
    )}
  </View>
);

const UploadItem = ({ 
  merchant, 
  amount, 
  time, 
  status, 
  showDivider = false 
}: { 
  merchant: string; 
  amount: string; 
  time: string; 
  status: string; 
  showDivider?: boolean;
}) => (
  <>
    <View style={styles.uploadItemRow}>
      <View style={styles.thumbnail}>
        <FileText color={COLORS.text} size={18} strokeWidth={1.8} />
      </View>
      <View style={styles.uploadItemDetails}>
        <View style={styles.uploadItemTopRow}>
          <Typography variant="bodyBold" numberOfLines={1}>{merchant}</Typography>
          <Typography variant="financial">{amount}</Typography>
        </View>
        <View style={styles.uploadItemBottomRow}>
          <Typography variant="caption" color={COLORS.textSecondary}>{time}</Typography>
          <View style={styles.statusBadge}>
            <CheckCircle2 color={COLORS.success} size={12} strokeWidth={2} />
            <Typography variant="caption" color={COLORS.success} style={{ marginLeft: 4 }}>
              {status}
            </Typography>
          </View>
        </View>
      </View>
    </View>
    {showDivider && <View style={styles.divider} />}
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 8,
  },
  uploadArea: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.xl,
  },
  uploadIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    marginBottom: 4,
  },
  uploadSub: {
    marginBottom: 24,
  },
  uploadActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  actionBtnText: {
    marginLeft: 8,
    fontSize: 14,
  },
  pipelineCard: {
    marginBottom: SPACING.xl,
    padding: 20,
  },
  pipelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pipelineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(214, 169, 40, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pipelineBadgeText: {
    marginLeft: 6,
    fontWeight: '600',
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  stageItem: {
    alignItems: 'center',
  },
  stageDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stageDotActive: {
    backgroundColor: COLORS.success,
  },
  stageLabel: {
    fontSize: 10,
  },
  extractedDetails: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tagBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  confirmBtn: {
    marginTop: 4,
  },
  recentHeader: {
    marginBottom: 12,
  },
  recentListCard: {
    marginBottom: SPACING.xl,
  },
  uploadItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  uploadItemDetails: {
    flex: 1,
  },
  uploadItemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  uploadItemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 70,
    marginRight: 16,
  },
});
