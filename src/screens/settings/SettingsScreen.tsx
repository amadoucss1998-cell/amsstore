import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types';
import { BackButton } from '../../components/BackButton';
import { GradientButton } from '../../components/GradientButton';
import { Avatar } from '../../components/Avatar';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';

type Props = { navigation: NativeStackNavigationProp<ProfileStackParamList, 'Settings'> };

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout, updatePreferences } = useAuthStore();
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [maxDist, setMaxDist] = useState(user?.preferences.maxDistance ?? 25);
  const [minAge, setMinAge] = useState(user?.preferences.minAge ?? 22);
  const [maxAge, setMaxAge] = useState(user?.preferences.maxAge ?? 35);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', icon: '👤', action: () => navigation.goBack() },
        { label: 'Verify Account', icon: '✓', action: () => {} },
        { label: 'Linked Accounts', icon: '🔗', action: () => {} },
        { label: 'Privacy & Safety', icon: '🔒', action: () => {} },
      ],
    },
    {
      title: 'Subscription',
      items: [
        { label: 'SparkMatch Gold ✨', icon: '🏆', action: () => {}, highlight: true },
        { label: 'Restore Purchases', icon: '📦', action: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: '❓', action: () => {} },
        { label: 'Report a Problem', icon: '⚠️', action: () => {} },
        { label: 'About SparkMatch', icon: 'ℹ️', action: () => {} },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={[Colors.background, '#0d0d1f']} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <Avatar uri={user?.photos[0]} name={user?.name ?? ''} size={64} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Text style={styles.editBadgeText}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Discovery Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discovery Preferences</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.settingLabel}>Maximum distance</Text>
              <Text style={styles.settingValue}>{maxDist} mi</Text>
            </View>
            <View style={styles.sliderRow}>
              {[5, 10, 25, 50, 100].map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.sliderChip,
                    maxDist === d && styles.sliderChipActive,
                  ]}
                  onPress={() => {
                    setMaxDist(d);
                    updatePreferences({ maxDistance: d });
                  }}
                >
                  <Text style={[styles.sliderChipText, maxDist === d && styles.sliderChipTextActive]}>
                    {d}mi
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.settingLabel}>Age range</Text>
              <Text style={styles.settingValue}>{minAge}–{maxAge}</Text>
            </View>
            <View style={styles.ageRow}>
              <View style={styles.ageControl}>
                <Text style={styles.ageControlLabel}>Min age</Text>
                <View style={styles.ageButtons}>
                  <TouchableOpacity
                    style={styles.ageBtn}
                    onPress={() => setMinAge((v) => Math.max(18, v - 1))}
                  >
                    <Text style={styles.ageBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.ageValue}>{minAge}</Text>
                  <TouchableOpacity
                    style={styles.ageBtn}
                    onPress={() => setMinAge((v) => Math.min(maxAge - 1, v + 1))}
                  >
                    <Text style={styles.ageBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.ageSeparator} />
              <View style={styles.ageControl}>
                <Text style={styles.ageControlLabel}>Max age</Text>
                <View style={styles.ageButtons}>
                  <TouchableOpacity
                    style={styles.ageBtn}
                    onPress={() => setMaxAge((v) => Math.max(minAge + 1, v - 1))}
                  >
                    <Text style={styles.ageBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.ageValue}>{maxAge}</Text>
                  <TouchableOpacity
                    style={styles.ageBtn}
                    onPress={() => setMaxAge((v) => Math.min(65, v + 1))}
                  >
                    <Text style={styles.ageBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Notifications</Text>
          <View style={styles.card}>
            {[
              { label: 'Push Notifications', value: notifications, onChange: setNotifications },
              { label: 'Location Sharing', value: locationSharing, onChange: setLocationSharing },
              { label: 'Show My Age', value: showAge, onChange: setShowAge },
              { label: 'Show My Distance', value: showDistance, onChange: setShowDistance },
              { label: 'Private Mode', value: privateMode, onChange: setPrivateMode },
            ].map((item, i) => (
              <View key={item.label} style={[styles.toggleRow, i > 0 && styles.rowBorder]}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Switch
                  value={item.value}
                  onValueChange={item.onChange}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Settings sections */}
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.settingsRow, i > 0 && styles.rowBorder]}
                  onPress={item.action}
                  activeOpacity={0.7}
                >
                  <Text style={styles.settingsRowIcon}>{item.icon}</Text>
                  <Text style={[styles.settingsRowLabel, (item as any).highlight && styles.highlightLabel]}>
                    {item.label}
                  </Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View style={styles.logoutSection}>
          <GradientButton
            title="Sign Out"
            onPress={logout}
            variant="outline"
            size="lg"
          />
          <TouchableOpacity style={styles.deleteAccount}>
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing['5'], paddingVertical: Spacing['3'],
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  scroll: { paddingHorizontal: Spacing['5'], paddingBottom: 40 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing['4'],
    marginBottom: Spacing['6'],
    gap: 14,
    borderWidth: 1, borderColor: Colors.border,
  },
  profileInfo: { flex: 1, gap: 2 },
  profileName: { fontSize: 18, fontWeight: '700', color: Colors.white },
  profileEmail: { fontSize: 13, color: Colors.textMuted },
  editBadge: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
  },
  editBadgeText: { fontSize: 16 },
  section: { marginBottom: Spacing['6'] },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: Colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: Spacing['3'],
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    borderWidth: 1, borderColor: Colors.border,
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing['4'] },
  rowBorder: { borderTopWidth: 1, borderTopColor: Colors.border },
  settingLabel: { fontSize: 15, color: Colors.textPrimary, fontWeight: '500' },
  settingValue: { fontSize: 15, color: Colors.primary, fontWeight: '600' },
  sliderRow: { flexDirection: 'row', gap: 8, padding: Spacing['4'], paddingTop: 0 },
  sliderChip: {
    paddingVertical: 7, paddingHorizontal: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 1, borderColor: Colors.border,
  },
  sliderChipActive: { backgroundColor: 'rgba(255,75,110,0.2)', borderColor: Colors.primary },
  sliderChipText: { fontSize: 13, color: Colors.textMuted, fontWeight: '600' },
  sliderChipTextActive: { color: Colors.primary },
  ageRow: { flexDirection: 'row', padding: Spacing['4'], gap: 20 },
  ageControl: { flex: 1, gap: 8 },
  ageControlLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  ageButtons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ageBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  ageBtnText: { fontSize: 18, color: Colors.white, fontWeight: '600' },
  ageValue: { fontSize: 18, fontWeight: '700', color: Colors.white, minWidth: 30, textAlign: 'center' },
  ageSeparator: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing['4'] },
  settingsRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing['4'], gap: 14 },
  settingsRowIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  settingsRowLabel: { flex: 1, fontSize: 15, color: Colors.textPrimary, fontWeight: '500' },
  highlightLabel: { color: Colors.accent },
  chevron: { fontSize: 18, color: Colors.textMuted },
  logoutSection: { gap: 12, marginTop: Spacing['4'] },
  deleteAccount: { alignItems: 'center', padding: 12 },
  deleteAccountText: { fontSize: 14, color: Colors.error },
});
