import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import {
  LayoutDashboard,
  Receipt,
  Bot,
  Target,
  MoreHorizontal,
} from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          borderTopLeftRadius: SIZES.bottomNavRadius,
          borderTopRightRadius: SIZES.bottomNavRadius,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: FONTS.bodyMedium,
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <LayoutDashboard color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, focused }) => (
            <Receipt color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="copilot"
        options={{
          title: 'Copilot',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 15,
                backgroundColor: focused ? COLORS.gold : 'rgba(214,169,40,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
                borderWidth: focused ? 0 : 1.5,
                borderColor: 'rgba(214,169,40,0.4)',
              }}
            >
              <Bot color={focused ? COLORS.primary : COLORS.gold} size={22} strokeWidth={2} />
            </View>
          ),
          tabBarActiveTintColor: COLORS.gold,
          tabBarLabelStyle: {
            fontFamily: FONTS.bodyMedium,
            fontSize: 11,
            marginTop: 2,
            color: COLORS.gold,
          },
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color, focused }) => (
            <Target color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <MoreHorizontal color={color} size={22} strokeWidth={focused ? 2.2 : 1.8} />
          ),
        }}
      />

      {/* Legacy screens — hidden from tab bar */}
      <Tabs.Screen name="insights" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="upload" options={{ href: null }} />
    </Tabs>
  );
}
