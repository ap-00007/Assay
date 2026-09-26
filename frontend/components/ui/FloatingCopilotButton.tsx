import React, { useState, useEffect, useRef } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  View, 
  LayoutAnimation,
  Pressable 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bot } from 'lucide-react-native';
import { Typography } from '../Typography';
import { COLORS } from '../../constants/theme';

interface FloatingCopilotButtonProps {
  bottomOffset?: number;
}

export function FloatingCopilotButton({ bottomOffset = 82 }: FloatingCopilotButtonProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const autoCollapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleExpansion = (expand: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(expand);

    if (autoCollapseTimer.current) {
      clearTimeout(autoCollapseTimer.current);
      autoCollapseTimer.current = null;
    }

    if (expand) {
      // Auto-collapse after 4 seconds on mobile touch
      autoCollapseTimer.current = setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(false);
      }, 4000);
    }
  };

  const handlePress = () => {
    if (isExpanded) {
      router.push('/ai');
    } else {
      // First click expands on mobile/touch
      toggleExpansion(true);
    }
  };

  useEffect(() => {
    return () => {
      if (autoCollapseTimer.current) {
        clearTimeout(autoCollapseTimer.current);
      }
    };
  }, []);

  return (
    <Pressable
      style={[
        styles.floatingContainer, 
        { bottom: bottomOffset },
        isExpanded && styles.floatingContainerExpanded
      ]}
      onPress={handlePress}
      // Web hover support
      {...(Platform.OS === 'web' ? {
        onMouseEnter: () => toggleExpansion(true),
        onMouseLeave: () => toggleExpansion(false),
      } : {})}
      android_ripple={{ color: 'rgba(214, 169, 40, 0.2)', borderless: false, radius: 40 }}
    >
      <View style={styles.iconBox}>
        <Bot color="#FFFFFF" size={20} strokeWidth={2} />
      </View>
      {isExpanded && (
        <Typography variant="caption" style={styles.btnText}>
          Ask Copilot
        </Typography>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    right: 18,
    height: 44,
    minWidth: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#D6A928',
    paddingHorizontal: 11,
    zIndex: 999,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.35)',
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
      },
      default: {
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
    }),
  },
  floatingContainerExpanded: {
    paddingLeft: 12,
    paddingRight: 16,
  },
  iconBox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
});
