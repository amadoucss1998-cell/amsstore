import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { logout, profile } = useAuthStore();
  const [safetyMode, setSafetyMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const sections = [
    {
      title: 'Discovery',
      items: [
        { label: 'Show me', value: 'Everyone', icon: 'people-outline' },
        { label: 'Age range', value: '20 – 35', icon: 'calendar-outline' },
        { label: 'Distance', value: '25 km', icon: 'location-outline' },
      ],
    },
    {
      title: 'Safety',
      items: [
        { label: 'Women\'s Safety Mode', value: null, icon: 'shield-checkmark-outline', toggle: true, state: safetyMode, setState: setSafetyMode },
        { label: 'Identity Verification', value: profile?.verified === 'id' ? '✅ Verified' : 'Get Verified', icon: 'id-card-outline' },
        { label: 'Block & Report History', value: null, icon: 'hand-left-outline' },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { label: 'Push Notifications', value: null, icon: 'notifications-outline', toggle: true, state: notifications, setState: setNotifications },
        { label: 'New Match Alert', value: 'On', icon: 'heart-outline' },
        { label: 'Message Notifications', value: 'On', icon: 'chatbubble-outline' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Subscription', value: profile?.premium === 'free' ? 'Free' : '⭐ Gold', icon: 'star-outline' },
        { label: 'Phone Number', value: profile?.phone || '', icon: 'phone-portrait-outline' },
        { label: 'Privacy Policy', value: null, icon: 'document-text-outline' },
      ],
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing.lg, paddingBottom: 40 }}>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item: any, i) => (
                <View key={item.label}>
                  {i > 0 && <View style={styles.divider} />}
                  <View style={styles.row}>
                    <Ionicons name={item.icon as any} size={20} color={Colors.textSecondary} />
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    {item.toggle ? (
                      <Switch
                        value={item.state}
                        onValueChange={item.setState}
                        trackColor={{ true: Colors.primary, false: Colors.border }}
                        thumbColor="#fff"
                      />
                    ) : (
                      <Text style={styles.rowValue}>{item.value}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>SPARK v1.0 · Made for Liberia 🇱🇷</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textMuted, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 1 },
  sectionCard: { backgroundColor: Colors.card, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md },
  rowLabel: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  rowValue: { fontSize: FontSize.sm, color: Colors.textMuted },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 52 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, padding: Spacing.lg, backgroundColor: Colors.danger + '15', borderRadius: Radius.lg, marginBottom: Spacing.lg },
  logoutText: { color: Colors.danger, fontWeight: FontWeight.semibold, fontSize: FontSize.md },
  version: { textAlign: 'center', color: Colors.textMuted, fontSize: FontSize.xs },
});
