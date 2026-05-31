import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SwipeStackParamList } from '../../types';
import { GradientButton } from '../../components/GradientButton';
import { MatchAnimation } from '../../components/MatchAnimation';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';

const { width: W } = Dimensions.get('window');
type Props = { navigation: NativeStackNavigationProp<SwipeStackParamList, 'Match'>; route: RouteProp<SwipeStackParamList, 'Match'>; };

export const MatchScreen: React.FC<Props> = ({ navigation, route }) => {
  const { matchedUser } = route.params;
  const { user: currentUser } = useAuthStore();
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const photo1Scale = useRef(new Animated.Value(0)).current;
  const photo2Scale = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(60)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(bgOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.parallel([
        Animated.spring(photo1Scale, { toValue: 1, useNativeDriver: true, tension: 70, friction: 8, delay: 100 }),
        Animated.spring(photo2Scale, { toValue: 1, useNativeDriver: true, tension: 70, friction: 8, delay: 200 }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(contentSlide, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: bgOpacity }]}>
      <LinearGradient colors={['rgba(123,47,190,0.95)', 'rgba(255,75,110,0.95)', 'rgba(123,47,190,0.95)']} locations={[0, 0.5, 1]} style={StyleSheet.absoluteFill} />
      <MatchAnimation isVisible />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.photosContainer}>
          <Animated.View style={[styles.photoWrapper, styles.photoLeft, { transform: [{ scale: photo1Scale }] }]}>
            <Image source={{ uri: currentUser?.photos[0] ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80' }} style={styles.photo} />
          </Animated.View>
          <View style={styles.heartBadge}><Text style={styles.heartEmoji}>❤️</Text></View>
          <Animated.View style={[styles.photoWrapper, styles.photoRight, { transform: [{ scale: photo2Scale }] }]}>
            <Image source={{ uri: matchedUser.photos[0] }} style={styles.photo} />
          </Animated.View>
        </View>
        <Animated.View style={[styles.content, { opacity: contentOpacity, transform: [{ translateY: contentSlide }] }]}>
          <Text style={styles.matchEmoji}>✨</Text>
          <Text style={styles.title}>It's a Match!</Text>
          <Text style={styles.subtitle}>You and <Text style={styles.nameHighlight}>{matchedUser.name}</Text> liked each other!</Text>
          <View style={styles.buttons}>
            <GradientButton title={`Message ${matchedUser.name.split(' ')[0]} 💬`} onPress={() => navigation.navigate('SwipeMain')} size="lg" />
            <TouchableOpacity style={styles.keepSwipingButton} onPress={() => navigation.navigate('SwipeMain')}>
              <Text style={styles.keepSwipingText}>Keep Swiping</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing['6'] },
  photosContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50, height: 200, width: W },
  photoWrapper: { width: 150, height: 180, borderRadius: BorderRadius['2xl'], overflow: 'hidden', position: 'absolute', borderWidth: 4, borderColor: Colors.white },
  photoLeft: { left: W * 0.08, transform: [{ rotate: '-6deg' }] },
  photoRight: { right: W * 0.08, transform: [{ rotate: '6deg' }] },
  photo: { width: '100%', height: '100%', resizeMode: 'cover' },
  heartBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  heartEmoji: { fontSize: 28 },
  content: { alignItems: 'center', gap: 12 },
  matchEmoji: { fontSize: 48 },
  title: { fontSize: 44, fontWeight: '900', color: Colors.white, textAlign: 'center' },
  subtitle: { fontSize: 17, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 24 },
  nameHighlight: { fontWeight: '800', color: Colors.white },
  buttons: { width: '100%', gap: 12, marginTop: Spacing['4'] },
  keepSwipingButton: { alignItems: 'center', padding: 14 },
  keepSwipingText: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
});
