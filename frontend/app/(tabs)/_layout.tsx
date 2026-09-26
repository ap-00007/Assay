import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import {
  Home,
  Camera,
  List,
  BarChart2,
  Settings
} from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.08)',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: Platform.OS === 'ios' ? 84 : 66,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          overflow: 'hidden',
          ...Platform.select({
            web: {
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(15, 23, 42, 0.96)',
            },
            default: {
              elevation: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.35,
              shadowRadius: 10,
            },
          }),
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={80}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: '#0F172A' }
              ]}
            />
          )
        ),
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: FONTS.bodyMedium,
          fontSize: 10.5,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Home color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color, focused }) => (
            <Camera color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, focused }) => (
            <List color={color} size={22} strokeWidth={focused ? 2.4 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, focused }) => (
            <BarChart2 color={color} size={22} strokeWidth={focused ? 2.4 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Settings color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
    </Tabs>
  );
}
