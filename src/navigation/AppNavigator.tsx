import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { AppTabParamList } from '../types';
import { useChatStore } from '../store/useChatStore';

import DiscoverScreen from '../screens/home/DiscoverScreen';
import MatchCelebrationScreen from '../screens/home/MatchCelebrationScreen';
import ViewProfileScreen from '../screens/profile/ViewProfileScreen';
import ChatListScreen from '../screens/messages/ChatListScreen';
import ChatScreen from '../screens/messages/ChatScreen';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import SubscriptionScreen from '../screens/profile/SubscriptionScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();
const DiscoverStack = createNativeStackNavigator();
const MatchesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function DiscoverStackNav() {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <DiscoverStack.Screen name="MatchCelebration" component={MatchCelebrationScreen} />
      <DiscoverStack.Screen name="ViewProfile" component={ViewProfileScreen} />
    </DiscoverStack.Navigator>
  );
}

function MatchesStackNav() {
  return (
    <MatchesStack.Navigator screenOptions={{ headerShown: false }}>
      <MatchesStack.Screen name="ChatList" component={ChatListScreen} />
      <MatchesStack.Screen name="Chat" component={ChatScreen} />
    </MatchesStack.Navigator>
  );
}

function ProfileStackNav() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="MyProfile" component={MyProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Subscription" component={SubscriptionScreen} />
    </ProfileStack.Navigator>
  );
}

function TabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const matches = useChatStore((s) => s.matches);
  const totalUnread = matches.reduce((sum, m) => sum + m.unreadCount, 0);

  const tabs = [
    { name: 'Discover', icon: 'flame', label: 'Discover' },
    { name: 'Matches', icon: 'chatbubble-ellipses', label: 'Matches' },
    { name: 'Profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 8 }]}>
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;
        const tab = tabs[index];
        const showBadge = tab.name === 'Matches' && totalUnread > 0;
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={(focused ? tab.icon : `${tab.icon}-outline`) as any}
                size={24}
                color={focused ? Colors.primary : Colors.textMuted}
              />
              {showBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalUnread}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 4 },
  iconWrap: { position: 'relative' },
  tabLabel: { fontSize: 10, color: Colors.textMuted },
  tabLabelActive: { color: Colors.primary },
  badge: {
    position: 'absolute', top: -4, right: -8,
    backgroundColor: Colors.primary, borderRadius: 8,
    minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
});

export default function AppNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Discover" component={DiscoverStackNav} />
      <Tab.Screen name="Matches" component={MatchesStackNav} />
      <Tab.Screen name="Profile" component={ProfileStackNav} />
    </Tab.Navigator>
  );
}
