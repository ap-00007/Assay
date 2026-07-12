import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { Camera, Image as ImageIcon, FileText, CheckCircle2 } from 'lucide-react-native';

export default function UploadScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Typography variant="h2" style={styles.title}>Upload Receipt</Typography>
          <Typography variant="body" color={COLORS.textMuted}>Extract. Understand. Track.</Typography>
        </View>

        <TouchableOpacity activeOpacity={0.8}>
          <Card style={styles.uploadArea}>
            <View style={styles.uploadIconContainer}>
              <Camera color={COLORS.white} size={32} />
            </View>
            <Typography variant="h3" style={{marginTop: 16}}>Tap to Scan</Typography>
            <Typography variant="body" color={COLORS.textMuted} style={{marginTop: 4}}>
              or upload from gallery
            </Typography>

            <View style={styles.uploadActions}>
              <View style={styles.actionBtn}>
                <ImageIcon color={COLORS.primary} size={20} />
                <Typography variant="bodyMedium" style={{marginLeft: 8}}>Gallery</Typography>
              </View>
              <View style={[styles.actionBtn, styles.actionBtnPrimary]}>
                <Camera color={COLORS.white} size={20} />
                <Typography variant="bodyMedium" color={COLORS.white} style={{marginLeft: 8}}>Camera</Typography>
              </View>
            </View>
          </Card>
        </TouchableOpacity>

        <View style={styles.recentHeader}>
          <Typography variant="h3">Recent Uploads</Typography>
        </View>

        <View style={styles.recentList}>
          <UploadItem 
            merchant="Swiggy" 
            amount="₹840" 
            time="2 hours ago" 
            status="Processed" 
          />
          <UploadItem 
            merchant="Shell Fuel" 
            amount="₹2,500" 
            time="Yesterday" 
            status="Processed" 
          />
          <UploadItem 
            merchant="Unknown" 
            amount="--" 
            time="Just now" 
            status="Processing" 
          />
        </View>

        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const UploadItem = ({ merchant, amount, time, status }: { merchant: string, amount: string, time: string, status: string }) => (
  <Card style={styles.uploadItemCard}>
    <View style={styles.uploadItemRow}>
      <View style={styles.thumbnail}>
        <FileText color={COLORS.textMuted} size={20} />
      </View>
      <View style={styles.uploadItemDetails}>
        <View style={styles.uploadItemTopRow}>
          <Typography variant="bodyBold">{merchant}</Typography>
          <Typography variant="bodyBold">{amount}</Typography>
        </View>
        <View style={styles.uploadItemBottomRow}>
          <Typography variant="caption" color={COLORS.textMuted}>{time}</Typography>
          <View style={styles.statusBadge}>
            {status === 'Processed' && <CheckCircle2 color={COLORS.success} size={12} />}
            <Typography 
              variant="caption" 
              color={status === 'Processed' ? COLORS.success : COLORS.textMuted}
              style={{marginLeft: 4}}
            >
              {status}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  header: {
    marginBottom: 32,
    marginTop: 12,
  },
  title: {
    marginBottom: 8,
  },
  uploadArea: {
    alignItems: 'center',
    paddingVertical: 48,
    borderWidth: 2,
    borderColor: 'rgba(15, 23, 42, 0.05)',
    borderStyle: 'dashed',
    backgroundColor: COLORS.white,
    marginBottom: 40,
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  uploadActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: COLORS.background,
  },
  actionBtnPrimary: {
    backgroundColor: COLORS.primary,
  },
  recentHeader: {
    marginBottom: 16,
  },
  recentList: {
    gap: 12,
  },
  uploadItemCard: {
    padding: 16,
  },
  uploadItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  uploadItemDetails: {
    flex: 1,
  },
  uploadItemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
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
});
