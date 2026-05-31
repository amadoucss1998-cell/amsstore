import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '../types';
import { Colors } from '../theme/colors';
import { BorderRadius, Shadow, Spacing } from '../theme/spacing';
import { Badge } from './Badge';
import { ProfilePhoto } from './ProfilePhoto';

const { width: W, height: H } = Dimensions.get('window');
const SWIPE_THRESHOLD = W * 0.32;
const SWIPE_UP_THRESHOLD = -H * 0.2;

interface SwipeCardProps { user: User; onSwipeRight: (user: User) => void; onSwipeLeft: (user: User) => void; onSuperLike: (user: User) => void; onPress: (user: User) => void; isTop?: boolean; stackIndex?: number; }

export const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipeRight, onSwipeLeft, onSuperLike, onPress, isTop = false, stackIndex = 0 }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [photoIndex, setPhotoIndex] = useState(0);

  const rotate = position.x.interpolate({ inputRange: [-W / 2, 0, W / 2], outputRange: ['-12deg', '0deg', '12deg'], extrapolate: 'clamp' });
  const likeOpacity = position.x.interpolate({ inputRange: [0, SWIPE_THRESHOLD * 0.6], outputRange: [0, 1], extrapolate: 'clamp' });
  const nopeOpacity = position.x.interpolate({ inputRange: [-SWIPE_THRESHOLD * 0.6, 0], outputRange: [1, 0], extrapolate: 'clamp' });
  const superLikeOpacity = position.y.interpolate({ inputRange: [SWIPE_UP_THRESHOLD, SWIPE_UP_THRESHOLD * 0.4], outputRange: [1, 0], extrapolate: 'clamp' });
  const cardScale = position.x.interpolate({ inputRange: [-W, 0, W], outputRange: [0.95, 1, 0.95], extrapolate: 'clamp' });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isTop,
    onPanResponderMove: (_, g) => position.setValue({ x: g.dx, y: g.dy }),
    onPanResponderRelease: (_, g) => {
      const { dx, dy } = g;
      if (dx > SWIPE_THRESHOLD) {
        Animated.timing(position, { toValue: { x: W * 1.5, y: dy }, duration: 280, useNativeDriver: false }).start(() => { position.setValue({ x: 0, y: 0 }); onSwipeRight(user); });
      } else if (dx < -SWIPE_THRESHOLD) {
        Animated.timing(position, { toValue: { x: -W * 1.5, y: dy }, duration: 280, useNativeDriver: false }).start(() => { position.setValue({ x: 0, y: 0 }); onSwipeLeft(user); });
      } else if (dy < SWIPE_UP_THRESHOLD) {
        Animated.timing(position, { toValue: { x: dx, y: -H * 1.5 }, duration: 280, useNativeDriver: false }).start(() => { position.setValue({ x: 0, y: 0 }); onSuperLike(user); });
      } else {
        Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false, bounciness: 8 }).start();
      }
    },
  });

  const cardStyle = isTop
    ? [styles.card, { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }, { scale: cardScale }] }]
    : [styles.card, { transform: [{ scale: 1 - stackIndex * 0.04 }, { translateY: stackIndex * 10 }], opacity: 1 - stackIndex * 0.15 }];

  return (
    <Animated.View style={cardStyle} {...(isTop ? panResponder.panHandlers : {})}>
      <TouchableOpacity activeOpacity={0.98} onPress={() => isTop && onPress(user)} style={{ flex: 1 }}>
        <ProfilePhoto uri={user.photos[photoIndex]} width={W - 32} height={H * 0.65} showGradient />
        {user.photos.length > 1 && (
          <View style={styles.photoDots}>
            {user.photos.map((_, i) => <TouchableOpacity key={i} style={[styles.dot, i === photoIndex && styles.dotActive]} onPress={() => setPhotoIndex(i)} />)}
          </View>
        )}
        {user.photos.length > 1 && (
          <>
            <TouchableOpacity style={styles.tapLeft} onPress={() => setPhotoIndex((p) => Math.max(0, p - 1))} />
            <TouchableOpacity style={styles.tapRight} onPress={() => setPhotoIndex((p) => Math.min(user.photos.length - 1, p + 1))} />
          </>
        )}
        <Animated.View style={[styles.overlay, styles.likeOverlay, { opacity: likeOpacity }]}><Text style={styles.likeText}>LIKE</Text></Animated.View>
        <Animated.View style={[styles.overlay, styles.nopeOverlay, { opacity: nopeOpacity }]}><Text style={styles.nopeText}>NOPE</Text></Animated.View>
        <Animated.View style={[styles.overlay, styles.superLikeOverlay, { opacity: superLikeOpacity }]}><Text style={styles.superLikeText}>★ SUPER</Text></Animated.View>
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.age}>{user.age}</Text>
            {user.verified && <Text style={styles.verified}>✓</Text>}
          </View>
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{user.distance} miles away</Text>
          </View>
          <Text style={styles.occupation}>{user.occupation}</Text>
          {user.interests.length > 0 && (
            <View style={styles.interests}>
              {user.interests.slice(0, 3).map((interest) => <Badge key={interest} label={interest} size="sm" />)}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { position: 'absolute', width: W - 32, height: H * 0.72, borderRadius: BorderRadius['2xl'], backgroundColor: Colors.cardBackground, overflow: 'hidden', ...Shadow.lg },
  photoDots: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', gap: 4 },
  dot: { flex: 1, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: Colors.white },
  tapLeft: { position: 'absolute', left: 0, top: 0, width: '35%', height: '65%' },
  tapRight: { position: 'absolute', right: 0, top: 0, width: '65%', height: '65%' },
  overlay: { position: 'absolute', top: 40, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 3, borderRadius: 8 },
  likeOverlay: { left: 20, borderColor: Colors.like, transform: [{ rotate: '-20deg' }] },
  likeText: { color: Colors.like, fontSize: 32, fontWeight: '900', letterSpacing: 2 },
  nopeOverlay: { right: 20, borderColor: Colors.dislike, transform: [{ rotate: '20deg' }] },
  nopeText: { color: Colors.dislike, fontSize: 32, fontWeight: '900', letterSpacing: 2 },
  superLikeOverlay: { alignSelf: 'center', bottom: 100, top: undefined, borderColor: Colors.superlike },
  superLikeText: { color: Colors.superlike, fontSize: 28, fontWeight: '900', letterSpacing: 2 },
  infoContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing['4'], paddingBottom: Spacing['5'] },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  name: { fontSize: 26, fontWeight: '800', color: Colors.white },
  age: { fontSize: 22, fontWeight: '400', color: Colors.white },
  verified: { fontSize: 16, color: Colors.accentBlue, fontWeight: '700' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  locationIcon: { fontSize: 12 },
  locationText: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  occupation: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 },
  interests: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
