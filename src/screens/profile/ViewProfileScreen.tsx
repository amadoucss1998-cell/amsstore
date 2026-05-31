import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Badge } from '../../components/Badge';
import { GradientButton } from '../../components/GradientButton';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { SwipeStackParamList } from '../../types';

const { width: W } = Dimensions.get('window');
type Props = { navigation: NativeStackNavigationProp<SwipeStackParamList, 'ViewProfile'>; route: RouteProp<SwipeStackParamList, 'ViewProfile'>; };

export const ViewProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = route.params;
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({ inputRange: [W * 0.6, W * 0.85], outputRange: [0, 1], extrapolate: 'clamp' });

  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.background, '#0d0d1f']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.floatingHeader} edges={['top']} pointerEvents="box-none">
        <Animated.View style={[styles.stickyBar, { opacity: headerOpacity }]}>
          <Text style={styles.stickyName}>{user.name}, {user.age}</Text>
        </Animated.View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Animated.ScrollView showsVerticalScrollIndicator={false} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })} scrollEventThrottle={16}>
        <View style={styles.photosContainer}>
          <Image source={{ uri: user.photos[currentPhoto] }} style={styles.mainPhoto} resizeMode="cover" />
          <LinearGradient colors={['transparent', 'rgba(15,15,26,0.5)', Colors.background]} locations={[0.4, 0.75, 1]} style={StyleSheet.absoluteFill} />
          <View style={styles.photoDots}>
            {user.photos.map((_, i) => <TouchableOpacity key={i} style={[styles.dot, i === currentPhoto && styles.dotActive]} onPress={() => setCurrentPhoto(i)} />)}
          </View>
          <TouchableOpacity style={styles.tapLeft} onPress={() => setCurrentPhoto((p) => Math.max(0, p - 1))} />
          <TouchableOpacity style={styles.tapRight} onPress={() => setCurrentPhoto((p) => Math.min(user.photos.length - 1, p + 1))} />
          <View style={styles.nameOverlay}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.age}>{user.age}</Text>
              {user.verified && <Text style={styles.verified}>✓</Text>}
            </View>
            <Text style={styles.occupation}>{user.occupation}</Text>
            <Text style={styles.location}>📍 {user.distance} miles away</Text>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickInfoScroll}>
            <View style={styles.quickInfo}>
              {user.height && <View style={styles.infoChip}><Text style={styles.infoChipEmoji}>📏</Text><Text style={styles.infoChipText}>{user.height}</Text></View>}
              {user.education && <View style={styles.infoChip}><Text style={styles.infoChipEmoji}>🎓</Text><Text style={styles.infoChipText}>{user.education}</Text></View>}
              <View style={styles.infoChip}><Text style={styles.infoChipEmoji}>💝</Text><Text style={styles.infoChipText}>{user.lookingFor}</Text></View>
              <View style={styles.infoChip}><Text style={styles.infoChipEmoji}>📍</Text><Text style={styles.infoChipText}>{user.location}</Text></View>
            </View>
          </ScrollView>
          {user.bio && <View style={styles.section}><Text style={styles.sectionTitle}>About {user.name.split(' ')[0]}</Text><Text style={styles.bioText}>{user.bio}</Text></View>}
          {user.prompts?.map((prompt, i) => (
            <View key={i} style={styles.promptCard}>
              <Text style={styles.promptQuestion}>{prompt.question}</Text>
              <Text style={styles.promptAnswer}>{prompt.answer}</Text>
            </View>
          ))}
          {user.interests.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.badgesRow}>{user.interests.map((i) => <Badge key={i} label={i} />)}</View>
            </View>
          )}
          <View style={styles.ctaSection}>
            <GradientButton title={`♥ Like ${user.name.split(' ')[0]}`} onPress={() => navigation.goBack()} size="lg" />
            <TouchableOpacity style={styles.nopeButton} onPress={() => navigation.goBack()}>
              <Text style={styles.nopeButtonText}>✕ Nope</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  floatingHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 },
  stickyBar: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 8 },
  stickyName: { fontSize: 18, fontWeight: '700', color: Colors.white },
  backButton: { marginTop: 10, marginLeft: Spacing['4'], width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 20, color: Colors.white, fontWeight: '600' },
  photosContainer: { height: W * 1.25 },
  mainPhoto: { width: '100%', height: '100%' },
  photoDots: { position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', gap: 4 },
  dot: { flex: 1, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: Colors.white },
  tapLeft: { position: 'absolute', left: 0, top: 0, width: '35%', height: '80%' },
  tapRight: { position: 'absolute', right: 0, top: 0, width: '65%', height: '80%' },
  nameOverlay: { position: 'absolute', bottom: Spacing['5'], left: Spacing['5'], right: Spacing['5'] },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  name: { fontSize: 30, fontWeight: '800', color: Colors.white },
  age: { fontSize: 26, fontWeight: '400', color: Colors.white },
  verified: { fontSize: 18, color: Colors.accentBlue, fontWeight: '700' },
  occupation: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  location: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  content: { padding: Spacing['5'] },
  quickInfoScroll: { marginBottom: Spacing['5'], marginHorizontal: -Spacing['5'] },
  quickInfo: { flexDirection: 'row', gap: 8, paddingHorizontal: Spacing['5'] },
  infoChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.full, paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderColor: Colors.border },
  infoChipEmoji: { fontSize: 14 },
  infoChipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  section: { marginBottom: Spacing['6'] },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.white, marginBottom: Spacing['3'] },
  bioText: { fontSize: 15, color: Colors.textSecondary, lineHeight: 24 },
  promptCard: { backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.xl, padding: Spacing['5'], marginBottom: Spacing['4'], borderWidth: 1, borderColor: Colors.border, borderLeftWidth: 3, borderLeftColor: Colors.primary },
  promptQuestion: { fontSize: 13, color: Colors.primary, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  promptAnswer: { fontSize: 16, color: Colors.textPrimary, lineHeight: 24, fontStyle: 'italic' },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ctaSection: { marginTop: Spacing['4'], gap: 12 },
  nopeButton: { alignItems: 'center', paddingVertical: 14, backgroundColor: Colors.cardBackground, borderRadius: BorderRadius.xl, borderWidth: 1, borderColor: Colors.border },
  nopeButtonText: { fontSize: 16, color: Colors.textSecondary, fontWeight: '600' },
});
