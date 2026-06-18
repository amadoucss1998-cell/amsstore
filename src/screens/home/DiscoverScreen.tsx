import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useDiscoveryStore } from '../../store/useDiscoveryStore';
import { useAuthStore } from '../../store/useAuthStore';
import SwipeCard from '../../components/SwipeCard';

const { width: W } = Dimensions.get('window');

export default function DiscoverScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { profiles, newMatch, swipe, clearMatch, undoLast } = useDiscoveryStore();
  const profile = useAuthStore((s) => s.profile);
  const visibleProfiles = profiles.slice(-3);

  useEffect(() => {
    if (newMatch) {
      clearMatch();
      navigation.navigate('MatchCelebration', { matchId: 'new', profile: newMatch });
    }
  }, [newMatch]);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    const top = profiles[profiles.length - 1];
    if (!top) return;
    const type = direction === 'right' ? 'like' : direction === 'up' ? 'super' : 'pass';
    swipe({ type, targetId: top.id });
  };

  const isPremium = profile?.premium !== 'free';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>⚡ SPARK</Text>
          <Text style={styles.subtitle}>Monrovia, Liberia 🇱🇷</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="options" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('Profile', { screen: 'Subscription' })}>
            {isPremium ? (
              <Text style={styles.goldLabel}>⭐ Gold</Text>
            ) : (
              <LinearGradient colors={Gradients.primary as any} style={styles.upgradeBtn}>
                <Text style={styles.upgradeText}>Upgrade</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Card stack */}
      <View style={styles.cardArea}>
        {profiles.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👀</Text>
            <Text style={styles.emptyTitle}>You've seen everyone!</Text>
            <Text style={styles.emptySubtitle}>Check back later for new people nearby</Text>
          </View>
        ) : (
          visibleProfiles.map((p, i) => (
            <SwipeCard
              key={p.id}
              profile={p}
              onSwipe={handleSwipe}
              isTop={i === visibleProfiles.length - 1}
              stackIndex={visibleProfiles.length - 1 - i}
            />
          ))
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, styles.undoBtn]} onPress={undoLast}>
          <Ionicons name="arrow-undo" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.nopeBtn]} onPress={() => handleSwipe('left')}>
          <Ionicons name="close" size={32} color={Colors.nope} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.superBtn, !isPremium && styles.btnLocked]}
          onPress={() => isPremium ? handleSwipe('up') : navigation.navigate('Profile', { screen: 'Subscription' })}
        >
          <Text style={{ fontSize: 24 }}>⭐</Text>
          {!isPremium && <Ionicons name="lock-closed" size={12} color={Colors.gold} style={styles.lockIcon} />}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.likeBtn]} onPress={() => handleSwipe('right')}>
          <Ionicons name="heart" size={32} color={Colors.like} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.boostBtn]}>
          <Ionicons name="flash" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  appName: { fontSize: FontSize.xl, fontWeight: FontWeight.black, color: Colors.text },
  subtitle: { fontSize: FontSize.xs, color: Colors.textMuted },
  headerRight: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  headerBtn: { width: 40, height: 40, backgroundColor: Colors.card, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  goldLabel: { color: Colors.gold, fontWeight: FontWeight.bold, fontSize: FontSize.sm },
  upgradeBtn: { borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 6 },
  upgradeText: { color: '#fff', fontSize: FontSize.xs, fontWeight: FontWeight.bold },
  cardArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  emptyState: { alignItems: 'center', gap: Spacing.md },
  emptyIcon: { fontSize: 60 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  emptySubtitle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center' },
  actions: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: Spacing.md, paddingBottom: Spacing.lg, paddingTop: Spacing.md },
  actionBtn: { alignItems: 'center', justifyContent: 'center', borderRadius: Radius.full, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  undoBtn: { width: 44, height: 44, backgroundColor: Colors.card },
  nopeBtn: { width: 64, height: 64, backgroundColor: Colors.card, borderWidth: 2, borderColor: Colors.nope + '40' },
  superBtn: { width: 52, height: 52, backgroundColor: Colors.card, borderWidth: 2, borderColor: Colors.gold + '40' },
  likeBtn: { width: 64, height: 64, backgroundColor: Colors.card, borderWidth: 2, borderColor: Colors.like + '40' },
  boostBtn: { width: 44, height: 44, backgroundColor: Colors.card },
  btnLocked: { opacity: 0.7 },
  lockIcon: { position: 'absolute', bottom: 4, right: 4 },
});
