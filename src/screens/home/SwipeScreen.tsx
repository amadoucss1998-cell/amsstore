import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SwipeStackParamList, User } from '../../types';
import { useSwipeStore } from '../../store/useSwipeStore';
import { SwipeCard } from '../../components/SwipeCard';
import { ActionButtons } from '../../components/ActionButtons';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

const { width: W, height: H } = Dimensions.get('window');
const CARD_STACK_SIZE = 3;

type Props = { navigation: NativeStackNavigationProp<SwipeStackParamList, 'SwipeMain'> };

export const SwipeScreen: React.FC<Props> = ({ navigation }) => {
  const {
    profiles,
    currentIndex,
    swipeRight,
    swipeLeft,
    superLike,
    undoLastSwipe,
    newMatch,
    clearNewMatch,
    loadMoreProfiles,
  } = useSwipeStore();

  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    if (newMatch) {
      clearNewMatch();
      navigation.navigate('Match', { matchedUser: newMatch });
    }
  }, [newMatch]);

  useEffect(() => {
    const remaining = profiles.length - currentIndex;
    if (remaining <= 3) {
      loadMoreProfiles();
    }
  }, [currentIndex]);

  const visibleProfiles = profiles.slice(currentIndex, currentIndex + CARD_STACK_SIZE);

  const handleSwipeRight = (user: User) => {
    swipeRight(user);
  };

  const handleSwipeLeft = (user: User) => {
    swipeLeft(user);
  };

  const handleSuperLike = (user: User) => {
    superLike(user);
  };

  const handleViewProfile = (user: User) => {
    navigation.navigate('ViewProfile', { user });
  };

  const handleLikeButton = () => {
    const user = profiles[currentIndex];
    if (user) handleSwipeRight(user);
  };

  const handleDislikeButton = () => {
    const user = profiles[currentIndex];
    if (user) handleSwipeLeft(user);
  };

  const handleSuperLikeButton = () => {
    const user = profiles[currentIndex];
    if (user) handleSuperLike(user);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.background, '#0d0d1f']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>🔥</Text>
            <Text style={styles.logoText}>SparkMatch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction}>
            <Text style={styles.headerActionIcon}>🔔</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Card stack */}
        <View style={styles.cardArea}>
          {visibleProfiles.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>You\'ve seen everyone!</Text>
              <Text style={styles.emptySubtitle}>
                Come back later or expand your preferences to see more people.
              </Text>
              <TouchableOpacity
                style={styles.reloadButton}
                onPress={loadMoreProfiles}
              >
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  style={styles.reloadGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.reloadText}>Load More Profiles</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            [...visibleProfiles].reverse().map((user, reversedIndex) => {
              const stackIndex = visibleProfiles.length - 1 - reversedIndex;
              return (
                <SwipeCard
                  key={`${user.id}-${currentIndex + stackIndex}`}
                  user={user}
                  onSwipeRight={handleSwipeRight}
                  onSwipeLeft={handleSwipeLeft}
                  onSuperLike={handleSuperLike}
                  onPress={handleViewProfile}
                  isTop={stackIndex === 0}
                  stackIndex={stackIndex}
                />
              );
            })
          )}
        </View>

        {/* Action buttons */}
        {visibleProfiles.length > 0 && (
          <View style={styles.actions}>
            <ActionButtons
              onDislike={handleDislikeButton}
              onLike={handleLikeButton}
              onSuperLike={handleSuperLikeButton}
              onUndo={currentIndex > 0 ? undoLastSwipe : undefined}
              size="lg"
            />
            <Text style={styles.hint}>← Nope  ★ Super  Like →</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['5'],
    paddingVertical: Spacing['3'],
  },
  filterButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  filterIcon: { fontSize: 22 },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActionIcon: { fontSize: 18 },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actions: {
    paddingBottom: Spacing['5'],
    paddingHorizontal: Spacing['5'],
    gap: 12,
    alignItems: 'center',
  },
  hint: {
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 8 },
  emptyTitle: { fontSize: 24, fontWeight: '800', color: Colors.white, textAlign: 'center' },
  emptySubtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  reloadButton: { marginTop: 16, borderRadius: 24, overflow: 'hidden' },
  reloadGradient: { paddingVertical: 14, paddingHorizontal: 32 },
  reloadText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
