import React, { useRef } from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions,
  PanResponder, Animated, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients } from '../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../theme/spacing';
import { Profile } from '../types';

const { width: W, height: H } = Dimensions.get('window');
const SWIPE_THRESHOLD = W * 0.3;
const SWIPE_UP_THRESHOLD = -H * 0.2;

interface Props {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  isTop: boolean;
  stackIndex: number;
}

export default function SwipeCard({ profile, onSwipe, isTop, stackIndex }: Props) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [photoIndex, setPhotoIndex] = React.useState(0);

  const rotate = pan.x.interpolate({ inputRange: [-W, 0, W], outputRange: ['-20deg', '0deg', '20deg'] });
  const likeOpacity = pan.x.interpolate({ inputRange: [0, SWIPE_THRESHOLD / 2], outputRange: [0, 1] });
  const nopeOpacity = pan.x.interpolate({ inputRange: [-SWIPE_THRESHOLD / 2, 0], outputRange: [1, 0] });
  const superOpacity = pan.y.interpolate({ inputRange: [SWIPE_UP_THRESHOLD, 0], outputRange: [1, 0] });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onMoveShouldSetPanResponder: () => isTop,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, g) => {
        if (g.dx > SWIPE_THRESHOLD) {
          Animated.timing(pan, { toValue: { x: W * 1.5, y: g.dy }, duration: 300, useNativeDriver: false }).start(() => onSwipe('right'));
        } else if (g.dx < -SWIPE_THRESHOLD) {
          Animated.timing(pan, { toValue: { x: -W * 1.5, y: g.dy }, duration: 300, useNativeDriver: false }).start(() => onSwipe('left'));
        } else if (g.dy < SWIPE_UP_THRESHOLD) {
          Animated.timing(pan, { toValue: { x: g.dx, y: -H }, duration: 300, useNativeDriver: false }).start(() => onSwipe('up'));
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  const stackScale = 1 - stackIndex * 0.04;
  const stackTranslateY = stackIndex * 12;

  const cardStyle = isTop
    ? { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }] }
    : { transform: [{ scale: stackScale }, { translateY: stackTranslateY }] };

  const verifiedColor =
    profile.verified === 'id' ? Colors.verified :
    profile.verified === 'photo' ? Colors.success : Colors.textMuted;

  const verifiedLabel =
    profile.verified === 'id' ? 'ID Verified' :
    profile.verified === 'photo' ? 'Photo Verified' : 'Unverified';

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      {/* Photo */}
      <Image
        source={{ uri: profile.photos[photoIndex] || profile.photos[0] }}
        style={styles.photo}
        resizeMode="cover"
      />

      {/* Photo dots */}
      {profile.photos.length > 1 && (
        <View style={styles.dots}>
          {profile.photos.map((_, i) => (
            <View key={i} style={[styles.dot, i === photoIndex && styles.dotActive]} />
          ))}
        </View>
      )}

      {/* Tap zones */}
      <View style={styles.tapZones}>
        <TouchableOpacity style={styles.tapLeft} onPress={() => setPhotoIndex((i) => Math.max(0, i - 1))} />
        <TouchableOpacity style={styles.tapRight} onPress={() => setPhotoIndex((i) => Math.min(profile.photos.length - 1, i + 1))} />
      </View>

      {/* Gradient overlay */}
      <LinearGradient colors={Gradients.card as any} style={styles.gradient} />

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          {profile.premium === 'gold' && <Text style={styles.premiumBadge}>⭐ Gold</Text>}
          {profile.premium === 'platinum' && <Text style={[styles.premiumBadge, { backgroundColor: Colors.verified + '30', color: Colors.verified }]}>💎 Platinum</Text>}
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color={Colors.textSecondary} />
          <Text style={styles.location}>{profile.city} · {profile.distance}km away</Text>
          <View style={[styles.verifiedBadge, { backgroundColor: verifiedColor + '25' }]}>
            <Ionicons name="checkmark-circle" size={12} color={verifiedColor} />
            <Text style={[styles.verifiedText, { color: verifiedColor }]}>{verifiedLabel}</Text>
          </View>
        </View>
        {profile.bio ? <Text style={styles.bio} numberOfLines={2}>{profile.bio}</Text> : null}
        {profile.interests.length > 0 && (
          <View style={styles.interests}>
            {profile.interests.slice(0, 3).map((interest) => (
              <View key={interest} style={styles.interestChip}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Swipe indicators */}
      {isTop && (
        <>
          <Animated.View style={[styles.likeStamp, { opacity: likeOpacity }]}>
            <Text style={styles.stampText}>LIKE ❤️</Text>
          </Animated.View>
          <Animated.View style={[styles.nopeStamp, { opacity: nopeOpacity }]}>
            <Text style={[styles.stampText, { color: Colors.nope }]}>NOPE ❌</Text>
          </Animated.View>
          <Animated.View style={[styles.superStamp, { opacity: superOpacity }]}>
            <Text style={[styles.stampText, { color: Colors.gold }]}>⭐ SUPER</Text>
          </Animated.View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { position: 'absolute', width: W - 32, height: H * 0.65, borderRadius: Radius.xl, overflow: 'hidden', backgroundColor: Colors.card, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  photo: { width: '100%', height: '100%', position: 'absolute' },
  dots: { position: 'absolute', top: 12, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 4 },
  dot: { width: 20, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: '#fff' },
  tapZones: { position: 'absolute', top: 0, left: 0, right: 0, height: '65%', flexDirection: 'row' },
  tapLeft: { flex: 1 },
  tapRight: { flex: 1 },
  gradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%' },
  info: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.lg },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 4 },
  name: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: '#fff' },
  premiumBadge: { fontSize: FontSize.xs, backgroundColor: Colors.gold + '30', color: Colors.gold, paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.full, fontWeight: FontWeight.bold },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.sm },
  location: { fontSize: FontSize.sm, color: Colors.textSecondary, flex: 1 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.full },
  verifiedText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
  bio: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', marginBottom: Spacing.sm, lineHeight: 18 },
  interests: { flexDirection: 'row', gap: Spacing.xs },
  interestChip: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  interestText: { fontSize: FontSize.xs, color: '#fff' },
  likeStamp: { position: 'absolute', top: 40, left: 20, borderWidth: 3, borderColor: Colors.like, borderRadius: Radius.md, padding: Spacing.sm, transform: [{ rotate: '-15deg' }] },
  nopeStamp: { position: 'absolute', top: 40, right: 20, borderWidth: 3, borderColor: Colors.nope, borderRadius: Radius.md, padding: Spacing.sm, transform: [{ rotate: '15deg' }] },
  superStamp: { position: 'absolute', bottom: 140, left: 0, right: 0, alignItems: 'center' },
  stampText: { fontSize: FontSize.lg, fontWeight: FontWeight.black, color: Colors.like, letterSpacing: 2 },
});
