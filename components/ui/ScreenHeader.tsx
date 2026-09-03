import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../Typography';
import { COLORS, SIZES } from '../../constants/theme';
import { Bell } from 'lucide-react-native';

export interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  greeting?: string;
  userName?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  greeting,
  userName,
  showNotification = true,
  onNotificationPress,
  rightAction,
}: ScreenHeaderProps) {
  const isGreeting = Boolean(greeting && userName);

  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        {isGreeting ? (
          <>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              {greeting}
            </Typography>
            <Typography variant="h2" color={COLORS.text} style={styles.userName}>
              {userName}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="pageTitle" color={COLORS.text}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="secondary" color={COLORS.textSecondary} style={styles.subtitle}>
                {subtitle}
              </Typography>
            )}
          </>
        )}
      </View>

      <View style={styles.actionsContainer}>
        {rightAction}
        {showNotification && !rightAction && (
          <TouchableOpacity 
            style={styles.notificationBtn} 
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Bell color={COLORS.text} size={20} strokeWidth={1.8} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export const AppHeader = ScreenHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SIZES.padding,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    marginTop: 2,
  },
  subtitle: {
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 16,
    marginTop: 2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
