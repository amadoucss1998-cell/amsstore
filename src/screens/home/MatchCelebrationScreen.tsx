import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useChatStore } from '../../store/useChatStore';
import { Profile, Match } from '../../types';

const { width: W } = Dimensions.get('window');

export default function MatchCelebrationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { profile } = route.params as { profile: Profile };
  const matches = useChatStore((s) => s.matches);
  const scaleA = useRef(new Animated.Value(0)).current;
  const scaleB = useRef(new Animated.Value(0)).current;
  const fadeContent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleA, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.spring(scaleB, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.timing(fadeContent, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const existingMatch = matches.find((m) => m.userId === profile.id);

  const handleMessage = () => {
    if (existingMatch) {
      navigation.navigate('Matches', { screen: 'Chat', params: { match: existingMatch } });
    } else {
      navigation.navigate('Discover');
    }
  };

  return (
    <LinearGradient colors={['#0D0D1A', '#1A0A0A', '#0D0D1A']} style={styles.container}>
      {/* Emoji rain */}
      {['❤️','✨','🔥','💫','⚡'].map((e, i) => (
        <Text key={i} style={[styles.floatingEmoji, { left: (i * 20) + '%', top: (i * 8) + '%', opacity: 0.4 }]}>{e}</Text>
      ))}

      <Text style={styles.headline}>It's a SPARK! ⚡</Text>
      <Text style={styles.subheadline}>You and {profile.name} liked each other</Text>

      {/* Photos */}
      <View style={styles.photosRow}>
        <Animated.View style={[styles.photoWrap, { transform: [{ scale: scaleA }] }]}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' }} style={styles.photo} />
          <View style={styles.youLabel}><Text style={styles.youLabelText}>You</Text></View>
        </Animated.View>
        <Text style={styles.heartEmoji}>❤️</Text>
        <Animated.View style={[styles.photoWrap, { transform: [{ scale: scaleB }] }]}>
          <Image source={{ uri: profile.photos[0] }} style={styles.photo} />
          <View style={styles.youLabel}><Text style={styles.youLabelText}>{profile.name.split(' ')[0]}</Text></View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.actions, { opacity: fadeContent }]}>
        <TouchableOpacity style={styles.messageBtn} onPress={handleMessage}>
          <LinearGradient colors={Gradients.primary as any} style={styles.messageBtnGradient}>
            <Text style={styles.messageBtnText}>Send a Message 💬</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.keepSwipingBtn} onPress={() => navigation.navigate('DiscoverMain')}>
          <Text style={styles.keepSwipingText}>Keep Swiping</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  floatingEmoji: { position: 'absolute', fontSize: 30 },
  headline: { fontSize: FontSize.hero, fontWeight: FontWeight.black, color: Colors.text, textAlign: 'center', marginBottom: Spacing.sm },
  subheadline: { fontSize: FontSize.lg, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xxl },
  photosRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg, marginBottom: Spacing.xxl },
  photoWrap: { alignItems: 'center', gap: Spacing.sm },
  photo: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: Colors.primary },
  youLabel: { backgroundColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radius.full },
  youLabelText: { color: '#fff', fontWeight: FontWeight.bold, fontSize: FontSize.sm },
  heartEmoji: { fontSize: 48 },
  actions: { width: '100%', gap: Spacing.md },
  messageBtn: { borderRadius: Radius.full, overflow: 'hidden' },
  messageBtnGradient: { paddingVertical: 18, alignItems: 'center' },
  messageBtnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  keepSwipingBtn: { paddingVertical: 16, alignItems: 'center' },
  keepSwipingText: { color: Colors.textSecondary, fontSize: FontSize.md },
});
