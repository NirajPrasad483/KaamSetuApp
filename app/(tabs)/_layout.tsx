<<<<<<< HEAD
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

=======
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { KColors as Colors } from "../../constants/kaamsetuTheme";
>>>>>>> upstream/feature/auth-profile-integration
// ─────────────────────────────────────────────────────────────────────────────
// TABS LAYOUT — place this file at:  app/(tabs)/_layout.tsx
//
// This defines the bottom tab bar with 3 tabs:
//   Account | Post New Job | Live Jobs
// ─────────────────────────────────────────────────────────────────────────────

<<<<<<< HEAD
function TabIcon({ label, emoji, focused }: { label: string; emoji: string; focused: boolean }) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      <Text style={styles.tabEmoji}>{emoji}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
=======
function TabIcon({
  label,
  emoji,
  focused,
}: {
  label: string;
  emoji: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      <Text style={styles.tabEmoji}>{emoji}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {label}
      </Text>
>>>>>>> upstream/feature/auth-profile-integration
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
<<<<<<< HEAD
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Account" emoji="👤" focused={focused} />
          ),
        }}
      />
=======

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Live Jobs" emoji="📡" focused={focused} />
          ),
        }}
      />

>>>>>>> upstream/feature/auth-profile-integration
      <Tabs.Screen
        name="post-job"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Post Job" emoji="＋" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
<<<<<<< HEAD
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Live Jobs" emoji="📡" focused={focused} />
=======
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Account" emoji="👤" focused={focused} />
>>>>>>> upstream/feature/auth-profile-integration
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    height: 70,
    paddingBottom: 8,
<<<<<<< HEAD
    paddingTop: 6,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
=======
    paddingTop: 9,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: 0, // 🔥 reduced
    paddingVertical: 0.5,
    borderRadius: 1,// 🔥 VERY IMPORTANT
>>>>>>> upstream/feature/auth-profile-integration
  },
  tabIconFocused: {
    backgroundColor: Colors.primaryPale,
  },
  tabEmoji: { fontSize: 20 },
  tabLabel: {
    fontSize: 10,
    color: Colors.textMuted,
<<<<<<< HEAD
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: Colors.primary,
    fontWeight: '700',
=======
    fontWeight: "500",
  },
  tabLabelFocused: {
    color: Colors.primary,
    fontWeight: "700",
>>>>>>> upstream/feature/auth-profile-integration
  },
});
