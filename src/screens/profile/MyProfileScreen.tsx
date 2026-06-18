import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';

export default function MyProfileScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const profile = useAuthStore((s) => s.profile);
  if (!profile) return null;

  const completionItems = [
    { label: 'Name', done: !!profile.name },
    { label: 'Bio', done: !!profile.bio },
    { label: 'Photos', done: profile.photos.length > 0 },
    { label: 'Interests', done: profile.interests.length > 0 },
    { label: 'Verified', done: profile.verified !== 'none' },
  ];
  const completion = Math.round((completionItems.filter((i) => i.done).length / completionItems.length) * 100);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Photo + basic info */}
        <View style={styles.photoSection}>
          <Image source={{ uri: profile.photos[0] }} style={styles.mainPhoto} />
          <View style={styles.photoOverlay}>
            <TouchableOpacity style={styles.editPhotoBtn}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color={Colors.primary} />
            <Text style={styles.location}>{profile.city}, Liberia</Text>
          </View>

          {/* Profile completion */}
          <View style={styles.completionCard}>
            <View style={styles.completionHeader}>
              <Text style={styles.completionTitle}>Profile Strength</Text>
              <Text style={styles.completionPct}>{completion}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${completion}%` }]} />
            </View>
            <View style={styles.completionItems}>
              {completionItems.map((item) => (
                <View key={item.label} style={styles.completionItem}>
                  <Ionicons name={item.done ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={item.done ? Colors.success : Colors.textMuted} />
                  <Text style={[styles.completionItemText, !item.done && styles.completionItemMuted]}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Premium banner */}
          {profile.premium === 'free' && (
            <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
              <LinearGradient colors={Gradients.primary as any} style={styles.premiumBanner}>
                <Text style={styles.premiumBannerIcon}>⭐</Text>
                <View style={styles.premiumBannerText}>
                  <Text style={styles.premiumBannerTitle}>Upgrade to Spark Gold</Text>
                  <Text style={styles.premiumBannerSub}>Unlimited likes + see who liked you</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Bio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About me</Text>
            <Text style={styles.bio}>{profile.bio || 'Add a bio to help people get to know you'}</Text>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interests}>
              {profile.interests.map((i) => (
                <View key={i} style={styles.chip}><Text style={styles.chipText}>{i}</Text></View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  photoSection: { height: 280, position: 'relative' },
  mainPhoto: { width: '100%', height: '100%' },
  photoOverlay: { position: 'absolute', bottom: 12, right: 12 },
  editPhotoBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  infoSection: { padding: Spacing.xl },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.lg },
  location: { fontSize: FontSize.md, color: Colors.textSecondary },
  completionCard: { backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.border },
  completionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  completionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  completionPct: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
  progressBg: { height: 6, backgroundColor: Colors.border, borderRadius: 3, marginBottom: Spacing.md },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  completionItems: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  completionItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  completionItemText: { fontSize: FontSize.sm, color: Colors.text },
  completionItemMuted: { color: Colors.textMuted },
  premiumBanner: { borderRadius: Radius.lg, flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.lg, marginBottom: Spacing.lg },
  premiumBannerIcon: { fontSize: 28 },
  premiumBannerText: { flex: 1 },
  premiumBannerTitle: { color: '#fff', fontWeight: FontWeight.bold, fontSize: FontSize.md },
  premiumBannerSub: { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.sm },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text, marginBottom: Spacing.sm },
  bio: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  interests: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: { backgroundColor: Colors.card, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1, borderColor: Colors.border },
  chipText: { color: Colors.textSecondary, fontSize: FontSize.sm },
});
