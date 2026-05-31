import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SwipeScreen } from '../screens/home/SwipeScreen';
import { MatchScreen } from '../screens/home/MatchScreen';
import { DiscoverScreen } from '../screens/discover/DiscoverScreen';
import { ChatListScreen } from '../screens/messages/ChatListScreen';
import { ChatScreen } from '../screens/messages/ChatScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { ViewProfileScreen } from '../screens/profile/ViewProfileScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { Colors } from '../theme/colors';
import { useChatStore } from '../store/useChatStore';
import { AppTabParamList, MessagesStackParamList, ProfileStackParamList, SwipeStackParamList } from '../types';

const Tab = createBottomTabNavigator<AppTabParamList>();
const MessagesStack = createNativeStackNavigator<MessagesStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const SwipeStack = createNativeStackNavigator<SwipeStackParamList>();

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  Swipe: { active: '🔥', inactive: '💤' },
  Discover: { active: '🔍', inactive: '🔎' },
  Messages: { active: '💬', inactive: '💭' },
  Profile: { active: '👤', inactive: '👥' },
};
const TAB_LABELS: Record<string, string> = { Swipe: 'Spark', Discover: 'Discover', Messages: 'Messages', Profile: 'Profile' };

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const totalUnread = useChatStore((s) => s.getTotalUnread());
  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 8 }]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const icon = TAB_ICONS[route.name];
        const label = TAB_LABELS[route.name];
        const hasUnread = route.name === 'Messages' && totalUnread > 0;
        return (
          <TouchableOpacity key={route.key} style={styles.tabItem} onPress={() => { const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true }); if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name); }} activeOpacity={0.7}>
            {isFocused ? (
              <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.activeIconContainer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.iconActive}>{icon?.active}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveIconContainer}><Text style={styles.iconInactive}>{icon?.inactive}</Text></View>
            )}
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{label}</Text>
            {hasUnread && <View style={styles.badge}><Text style={styles.badgeText}>{totalUnread > 9 ? '9+' : totalUnread}</Text></View>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function SwipeStackNavigator() {
  return (
    <SwipeStack.Navigator screenOptions={{ headerShown: false }}>
      <SwipeStack.Screen name="SwipeMain" component={SwipeScreen} />
      <SwipeStack.Screen name="Match" component={MatchScreen} options={{ animation: 'fade' }} />
      <SwipeStack.Screen name="ViewProfile" component={ViewProfileScreen} options={{ animation: 'slide_from_bottom' }} />
    </SwipeStack.Navigator>
  );
}

function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator screenOptions={{ headerShown: false }}>
      <MessagesStack.Screen name="ChatList" component={ChatListScreen} />
      <MessagesStack.Screen name="Chat" component={ChatScreen} options={{ animation: 'slide_from_right' }} />
    </MessagesStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="MyProfile" component={ProfileScreen} />
      <ProfileStack.Screen name="ViewProfile" component={ViewProfileScreen} options={{ animation: 'slide_from_right' }} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ animation: 'slide_from_right' }} />
    </ProfileStack.Navigator>
  );
}

export const AppNavigator: React.FC = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Swipe" component={SwipeStackNavigator} />
    <Tab.Screen name="Discover" component={DiscoverScreen} />
    <Tab.Screen name="Messages" component={MessagesStackNavigator} />
    <Tab.Screen name="Profile" component={ProfileStackNavigator} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: { flexDirection: 'row', backgroundColor: Colors.tabBarBackground, borderTopWidth: 1, borderTopColor: Colors.tabBarBorder, paddingTop: 10, paddingHorizontal: 8 },
  tabItem: { flex: 1, alignItems: 'center', gap: 4, position: 'relative' },
  activeIconContainer: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  inactiveIconContainer: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconActive: { fontSize: 20 },
  iconInactive: { fontSize: 20, opacity: 0.5 },
  tabLabel: { fontSize: 10, color: Colors.tabBarInactive, fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
  badge: { position: 'absolute', top: -2, right: 12, backgroundColor: Colors.primary, borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
});
