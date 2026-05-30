import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { Badge } from '../../components/Badge';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';

const { width: W } = Dimensions.get('window');

type Props = { navigation: NativeStackNavigationProp<ProfileStackParamList, 'MyProfile'> };

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuthStore();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  if (!user) return null;

  const completionFields = [
    { label: 'Photos', done: user.photos.length > 0 },
    { label: 'Bio', done: user.bio.length > 20 },
    { label: 'Interests', done: user.interests.length >= 3 },
    { label: 'Occupation', done: !!user.occupation },
  ];
  const completionPct = Math.round(
    (completionFields.filter((f) => f.done).length / completionFields.length) * 100
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.background, '#0d0d1f']} style={StyleSheet.absoluteFill} />

      {/* Sticky header */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.stickyHeaderContent}>
            <Text style={styles.stickyHeaderTitle}>My Profile</Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        <SafeAreaView edges={['top']}>
          {/* Profile photo header */}
          <View style={styles.photoSection}>
            <Image source={{ uri: user.photos[0] }} style={styles.mainPhoto} />
            <LinearGradient
              colors={['transparent', Colors.background]}
              style={styles.photoGradient}
            />
            <View style={styles.photoActions}>
              <TouchableOpacity style={styles.editPhotoButton}>
                <Text style={styles.editPhotoText}>📷 Edit Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsButtonFloat}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.settingsIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.profileSummary}>
              <Text style={styles.profileName}>{user.name}, {user.age}</Text>
              <Text style={styles.profileOccupation}>{user.occupation}</Text>
              <Text style={styles.profileLocation}>📍 {user.location}</Text>
            </View>
          </View>

          {/* Profile completeness */}
          <View style={styles.completionCard}>
            <View style={styles.completionHeader}>
              <Text style={styles.completionTitle}>Profile strength</Text>
              <Text style={styles.completionPct}>{completionPct}%</Text>
            </View>
            <View style={styles.completionBar}>
              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.completionFill, { width: `${completionPct}%` }]}
              />
            </View>
            <View style={styles.completionItems}>
              {completionFields.map((field) => (
                <View key={field.label} style={styles.completionItem}>
                  <Text style={field.done ? styles.completionDone : styles.completionMissing}>
                    {field.done ? '✅' : '○'}
                  </Text>
                  <Text style={styles.completionLabel}>{field.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.content}>
            {/* Bio */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>About me</Text>
                <TouchableOpacity><Text style={styles.editButton}>✏️ Edit</Text></TouchableOpacity>
              </View>
              <Text style={styles.bioText}>
                {user.bio || 'Add a bio to help people get to know you better...'}
              </Text>
            </View>

            {/* Interests */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <TouchableOpacity><Text style={styles.editButton}>✏️ Edit</Text></TouchableOpacity>
              </View>
              {user.interests.length > 0 ? (
                <View style={styles.badgesRow}>
                  {user.interests.map((interest) => (
                    <Badge key={interest} label={interest} />
                  ))}
                </View>
              ) : (
                <TouchableOpacity style={styles.addInterestsButton}>
                  <Text style={styles.addInterestsText}>+ Add interests</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Photos grid */}
            {user.photos.length > 1 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Photos</Text>
                  <TouchableOpacity><Text style={styles.editButton}>✏️ Edit</Text></TouchableOpacity>
                </View>
                <View style={styles.photosGrid}>
                  {user.photos.map((uri, i) => (
                    <Image key={i} source={{ uri }} style={styles.gridPhoto} />
                  ))}
                </View>
              </View>
            )}

            {/* Stats */}
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>142</Text>
                <Text style={styles.statLabel}>Profile views</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Likes received</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>6</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  stickyHeader: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  stickyHeaderContent: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['5'],
    paddingVertical: Spacing['3'],
  },
  stickyHeaderTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  photoSection: { height: W * 1.1, position: 'relative' },
  mainPhoto: { width: '100%', height: '100%', resizeMode: 'cover' },
  photoGradient: { ...StyleSheet.absoluteFillObject, top: '50%' },
  photoActions: {
    position: 'absolute', top: 50,
    left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: Spacing['4'],
  },
  editPhotoButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: BorderRadius.full,
    paddingVertical: 8, paddingHorizontal: 14,
  },
  editPhotoText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
  settingsButtonFloat: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  settingsButton: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center', justifyContent: 'center',
  },
  settingsIcon: { fontSize: 18 },
  profileSummary: { position: 'absolute', bottom: Spacing['5'], left: Spacing['5'], right: Spacing['5'] },
  profileName: { fontSize: 28, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  profileOccupation: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  profileLocation: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  completionCard: {
    margin: Spacing['5'],
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing['4'],
    borderWidth: 1, borderColor: Colors.border,
  },
  completionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  completionTitle: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  completionPct: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  completionBar: {
    height: 4, backgroundColor: Colors.border,
    borderRadius: 2, overflow: 'hidden', marginBottom: 12,
  },
  completionFill: { height: '100%', borderRadius: 2 },
  completionItems: { flexDirection: 'row', justifyContent: 'space-between' },
  completionItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  completionDone: { fontSize: 13 },
  completionMissing: { fontSize: 13, color: Colors.textMuted },
  completionLabel: { fontSize: 11, color: Colors.textSecondary },
  content: { paddingHorizontal: Spacing['5'], paddingBottom: 40 },
  section: { marginBottom: Spacing['6'] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing['3'] },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  editButton: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  bioText: { fontSize: 15, color: Colors.textSecondary, lineHeight: 24 },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  addInterestsButton: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingVertical: 10, paddingHorizontal: 16,
    alignSelf: 'flex-start', borderStyle: 'dashed',
  },
  addInterestsText: { color: Colors.textMuted, fontSize: 14 },
  photosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  gridPhoto: {
    width: (W - 58) / 3,
    height: (W - 58) / 3,
    borderRadius: BorderRadius.md,
  },
  statsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    padding: Spacing['5'],
    flexDirection: 'row',
    borderWidth: 1, borderColor: Colors.border,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statNumber: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: 11, color: Colors.textMuted },
  statDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
});
