import React, { useState } from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Typography } from '../Typography';
import { COLORS } from '../../constants/theme';
import { getBrandLogoSource } from '../../constants/brandLogos';
import { 
  Coffee, 
  Car, 
  Utensils, 
  Train, 
  Dumbbell, 
  Landmark,
  ShoppingBag,
  CreditCard
} from 'lucide-react-native';

export interface MerchantLogoProps {
  name: string;
  size?: number;
  domain?: string;
  style?: StyleProp<ViewStyle>;
}

// Optional helper to resolve domain for unbundled merchants
function guessDomain(name: string): string | null {
  const norm = (name || '').toLowerCase().trim();
  if (norm.includes('zara')) return 'zara.com';
  if (norm.includes('h&m') || norm.includes('hm')) return 'hm.com';
  if (norm.includes('decathlon')) return 'decathlon.in';
  if (norm.includes('mcdonald')) return 'mcdonalds.com';
  if (norm.includes('domino')) return 'dominos.co.in';
  if (norm.includes('kfc')) return 'kfc.com';
  if (norm.includes('pizza hut')) return 'pizzahut.co.in';
  if (norm.includes('subway')) return 'subway.com';
  if (norm.includes('irctc')) return 'irctc.co.in';
  if (norm.includes('indigo')) return 'goindigo.in';
  if (norm.includes('air india')) return 'airindia.com';
  return null;
}

export function MerchantLogo({ name, size = 42, domain, style }: MerchantLogoProps) {
  const [remoteFailed, setRemoteFailed] = useState(false);
  const normalized = (name || '').toLowerCase().trim();

  // 1. High-Resolution Curated Local Asset (Standardized 1:1 Square with safe margin)
  const localSource = getBrandLogoSource(normalized);
  if (localSource) {
    return (
      <View 
        style={[
          styles.container, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2, 
            backgroundColor: '#FFFFFF',
            borderColor: 'rgba(0, 0, 0, 0.08)' 
          }, 
          style
        ]}
      >
        <Image 
          source={localSource} 
          style={{ width: size, height: size }} 
          resizeMode="contain" 
        />
      </View>
    );
  }

  // 2. Dynamic Domain Favicon (for long-tail merchants)
  const targetDomain = domain || guessDomain(normalized);
  if (targetDomain && !remoteFailed) {
    const remoteUrl = `https://www.google.com/s2/favicons?domain=${targetDomain}&sz=128`;
    const innerSize = Math.round(size * 0.68);
    return (
      <View 
        style={[
          styles.container, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2, 
            backgroundColor: '#FFFFFF',
            borderColor: 'rgba(0, 0, 0, 0.08)' 
          }, 
          style
        ]}
      >
        <Image 
          source={{ uri: remoteUrl }} 
          style={{ width: innerSize, height: innerSize }} 
          resizeMode="contain" 
          onError={() => setRemoteFailed(true)}
        />
      </View>
    );
  }

  // 3. Category Fallbacks for generic or local cash vendors
  if (normalized.includes('tea') || normalized.includes('chai')) {
    return (
      <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }, style]}>
        <Coffee color="#B45309" size={size * 0.5} strokeWidth={2} />
      </View>
    );
  }

  if (normalized.includes('coffee') || normalized.includes('cafe')) {
    return (
      <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }, style]}>
        <Coffee color="#2563EB" size={size * 0.5} strokeWidth={2} />
      </View>
    );
  }

  if (normalized.includes('cab') || normalized.includes('auto') || normalized.includes('taxi')) {
    return (
      <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }, style]}>
        <Car color="#16A34A" size={size * 0.5} strokeWidth={2} />
      </View>
    );
  }

  if (normalized.includes('food') || normalized.includes('restaurant') || normalized.includes('dine')) {
    return (
      <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#FFF7ED', borderColor: '#FED7AA' }, style]}>
        <Utensils color="#EA580C" size={size * 0.5} strokeWidth={2} />
      </View>
    );
  }

  if (normalized.includes('bank') || normalized.includes('loan') || normalized.includes('interest')) {
    return (
      <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }, style]}>
        <Landmark color="#475569" size={size * 0.5} strokeWidth={1.8} />
      </View>
    );
  }

  // 4. Default Monogram
  const initial = (name || '?').charAt(0).toUpperCase();
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' }, style]}>
      <Typography variant="bodyBold" style={{ color: '#334155', fontSize: size * 0.44, fontWeight: '700' }}>
        {initial}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
});
