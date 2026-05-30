import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { GradientButton } from '../../components/GradientButton';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';
import { INTERESTS } from '../../utils/helpers';

const { width: W } = Dimensions.get('window');
const TOTAL_STEPS = 5;

type Props = { navigation: NativeStackNavigationProp<AuthStackParamList, 'Onboarding'> };

const PLACEHOLDER_PHOTOS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80',
  'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=300&q=80',
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { updateUser, completeOnboarding } = useAuthStore();
  const [step, setStep] = useState(0);
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [minAge, setMinAge] = useState(22);
  const [maxAge, setMaxAge] = useState(35);
  const [maxDistance, setMaxDistance] = useState(25);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goToStep = (next: number) => {
    Animated.timing(slideAnim, { toValue: -W, duration: 250, useNativeDriver: true }).start(() => {
      setStep(next);
      slideAnim.setValue(W);
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }).start();
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest].slice(0, 10)
    );
  };

  const handleFinish = () => {
    updateUser({
      bio,
      interests: selectedInterests,
      photos: selectedPhotos.length > 0
        ? selectedPhotos.map((i) => PLACEHOLDER_PHOTOS[i])
        : [PLACEHOLDER_PHOTOS[0]],
    });
    completeOnboarding();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>📸</Text>
            <Text style={styles.stepTitle}>Add your photos</Text>
            <Text style={styles.stepSubtitle}>Pick up to 6 photos that show the real you</Text>
            <View style={styles.photoGrid}>
              {PLACEHOLDER_PHOTOS.map((uri, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.photoSlot,
                    selectedPhotos.includes(i) && styles.photoSlotSelected,
                  ]}
                  onPress={() =>
                    setSelectedPhotos((prev) =>
                      prev.includes(i) ? prev.filter((p) => p !== i) : [...prev, i].slice(0, 6)
                    )
                  }
                >
                  <Image source={{ uri }} style={styles.photoThumb} />
                  {selectedPhotos.includes(i) && (
                    <View style={styles.photoCheckOverlay}>
                      <Text style={styles.photoCheck}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
              {[...Array(3)].map((_, i) => (
                <TouchableOpacity key={`empty-${i}`} style={[styles.photoSlot, styles.photoSlotEmpty]}>
                  <Text style={styles.photoAddIcon}>+</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>✏️</Text>
            <Text style={styles.stepTitle}>Write your bio</Text>
            <Text style={styles.stepSubtitle}>Tell people what makes you, you</Text>
            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={5}
              placeholder="I love spontaneous road trips, making pasta from scratch, and finding hidden rooftop bars. Looking for someone to share good stories with..."
              placeholderTextColor={Colors.textMuted}
              maxLength={300}
            />
            <Text style={styles.charCount}>{bio.length}/300</Text>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>✨</Text>
            <Text style={styles.stepTitle}>What are you into?</Text>
            <Text style={styles.stepSubtitle}>Pick up to 10 interests ({selectedInterests.length}/10)</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.interestsScroll}>
              <View style={styles.interestsGrid}>
                {INTERESTS.map((interest) => (
                  <Badge
                    key={interest}
                    label={interest}
                    selected={selectedInterests.includes(interest)}
                    onPress={() => toggleInterest(interest)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepEmoji}>🎯</Text>
            <Text style={styles.stepTitle}>Your preferences</Text>
            <Text style={styles.stepSubtitle}>We'll show you people you'll actually like</Text>

            <View style={styles.preferenceSection}>
              <Text style={styles.preferenceLabel}>Age range</Text>
              <View style={styles.rangeRow}>
                <TouchableOpacity
                  style={styles.rangeButton}
                  onPress={() => setMinAge((v) => Math.max(18, v - 1))}
                >
                  <Text style={styles.rangeButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.rangeValue}>{minAge} – {maxAge}</Text>
                <TouchableOpacity
                  style={styles.rangeButton}
                  onPress={() => setMaxAge((v) => Math.min(65, v + 1))}
                >
                  <Text style={styles.rangeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.preferenceSection}>
              <Text style={styles.preferenceLabel}>Max distance: {maxDistance} miles</Text>
              <View style={styles.distanceRow}>
                {[5, 10, 25, 50, 100].map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.distanceChip,
                      maxDistance === d && styles.distanceChipActive,
                    ]}
                    onPress={() => setMaxDistance(d)}
                  >
                    <Text
                      style={[
                        styles.distanceChipText,
                        maxDistance === d && styles.distanceChipTextActive,
                      ]}
                    >
                      {d}mi
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 4:
        return (
          <View style={[styles.stepContent, styles.finalStep]}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              style={styles.finalEmoji}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={{ fontSize: 48 }}>⚡</Text>
            </LinearGradient>
            <Text style={styles.stepTitle}>You're all set!</Text>
            <Text style={styles.stepSubtitle}>
              SparkMatch is ready to find your people.{`\n`}Let the sparks fly.
            </Text>
            <View style={styles.readyStats}>
              <View style={styles.readyStat}>
                <Text style={styles.readyStatNum}>15+</Text>
                <Text style={styles.readyStatLabel}>Profiles nearby</Text>
              </View>
              <View style={styles.readyDivider} />
              <View style={styles.readyStat}>
                <Text style={styles.readyStatNum}>{selectedInterests.length}</Text>
                <Text style={styles.readyStatLabel}>Interests set</Text>
              </View>
              <View style={styles.readyDivider} />
              <View style={styles.readyStat}>
                <Text style={styles.readyStatNum}>{maxDistance}mi</Text>
                <Text style={styles.readyStatLabel}>Distance range</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1a0a2e', Colors.background]} style={StyleSheet.absoluteFill} />

      {/* Progress */}
      <View style={styles.progressContainer}>
        <ProgressBar current={step + 1} total={TOTAL_STEPS} height={3} />
        <Text style={styles.stepIndicator}>{step + 1}/{TOTAL_STEPS}</Text>
      </View>

      {/* Content */}
      <Animated.View style={[styles.contentArea, { transform: [{ translateX: slideAnim }] }]}>
        {renderStep()}
      </Animated.View>

      {/* Footer buttons */}
      <View style={styles.footer}>
        <GradientButton
          title={step < TOTAL_STEPS - 1 ? 'Continue' : 'Start Matching ⚡'}
          onPress={() => {
            if (step < TOTAL_STEPS - 1) {
              goToStep(step + 1);
            } else {
              handleFinish();
            }
          }}
          size="lg"
        />
        {step > 0 && step < TOTAL_STEPS - 1 && (
          <TouchableOpacity style={styles.skipStep} onPress={() => goToStep(step + 1)}>
            <Text style={styles.skipStepText}>Skip for now</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  progressContainer: {
    paddingHorizontal: Spacing['6'],
    paddingTop: Spacing['4'],
    paddingBottom: Spacing['2'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepIndicator: { fontSize: 13, color: Colors.textMuted, fontWeight: '600' },
  contentArea: { flex: 1, paddingHorizontal: Spacing['6'] },
  stepContent: { flex: 1, paddingTop: Spacing['6'] },
  stepEmoji: { fontSize: 48, marginBottom: Spacing['4'] },
  stepTitle: { fontSize: 28, fontWeight: '800', color: Colors.white, marginBottom: 8 },
  stepSubtitle: { fontSize: 15, color: Colors.textSecondary, marginBottom: Spacing['6'], lineHeight: 22 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  photoSlot: {
    width: (W - 64) / 3,
    height: (W - 64) / 3,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  photoSlotSelected: { borderColor: Colors.primary },
  photoSlotEmpty: { alignItems: 'center', justifyContent: 'center' },
  photoThumb: { width: '100%', height: '100%' },
  photoCheckOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,75,110,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCheck: { fontSize: 28, color: Colors.white, fontWeight: '800' },
  photoAddIcon: { fontSize: 28, color: Colors.textMuted },
  bioInput: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    padding: Spacing['4'],
    fontSize: 15,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    minHeight: 140,
    lineHeight: 22,
  },
  charCount: { alignSelf: 'flex-end', fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  interestsScroll: { maxHeight: 400 },
  interestsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: Spacing['4'] },
  preferenceSection: { marginBottom: Spacing['6'] },
  preferenceLabel: { fontSize: 16, fontWeight: '600', color: Colors.textSecondary, marginBottom: Spacing['3'] },
  rangeRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  rangeButton: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  rangeButtonText: { fontSize: 20, color: Colors.white, fontWeight: '600' },
  rangeValue: { fontSize: 20, fontWeight: '700', color: Colors.white, flex: 1, textAlign: 'center' },
  distanceRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  distanceChip: {
    paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1, borderColor: Colors.border,
  },
  distanceChipActive: { backgroundColor: 'rgba(255,75,110,0.2)', borderColor: Colors.primary },
  distanceChipText: { fontSize: 14, color: Colors.textSecondary, fontWeight: '600' },
  distanceChipTextActive: { color: Colors.primary },
  finalStep: { alignItems: 'center', justifyContent: 'center' },
  finalEmoji: { width: 100, height: 100, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing['6'] },
  readyStats: { flexDirection: 'row', marginTop: Spacing['8'], backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.xl, padding: Spacing['5'] },
  readyStat: { flex: 1, alignItems: 'center', gap: 4 },
  readyStatNum: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  readyStatLabel: { fontSize: 12, color: Colors.textMuted, textAlign: 'center' },
  readyDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  footer: { padding: Spacing['6'], gap: Spacing['2'] },
  skipStep: { alignItems: 'center', padding: 8 },
  skipStepText: { fontSize: 14, color: Colors.textMuted },
});
