/**
 * GRI Top-Level Bottom Tab Navigation Layout
 *
 * Requirements Section 3, 4, 14:
 * - Exactly 5 bottom tabs: Home, Discover, Services, Alerts, Profile.
 * - Dynamic bottom inset using useSafeAreaInsets() so tab bar never overlaps Android gesture nav bar.
 * - Non-tab destinations hidden with href: null.
 */

import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Compass, Layers, Bell, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontWeights } from '../../components/ui/tokens';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const bottomInset = insets.bottom > 0 ? insets.bottom : 8;
  const tabHeight = 56 + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: tabHeight,
          paddingBottom: bottomInset,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: fontWeights.semibold,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color, size }) => <Layers size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      {/* Hidden non-tab routes */}
      <Tabs.Screen name="academics" options={{ href: null }} />
      <Tabs.Screen name="ai_chat" options={{ href: null }} />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="examinations" options={{ href: null }} />
      <Tabs.Screen name="hostel" options={{ href: null }} />
    </Tabs>
  );
}
