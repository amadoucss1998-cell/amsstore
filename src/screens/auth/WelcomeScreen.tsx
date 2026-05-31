import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { GradientButton } from '../../components/GradientButton';
import { Colors } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';

const { width: W, height: H } = Dimensions.get('window');
type Props = { navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'> };

const FLOATING = [
  { top: H * 0.08, left: W * 0.05, size: 80, emoji: '👩‍🦱', delay: 0 },
  { top: H * 0.12, left: W * 0.7, size: 64, emoji: '👨‍🦲', delay: 200 },
  { top: H * 0.25, left: W * 0.78, size: 72, emoji: '👩‍🦰', delay: 400 },
  { top: H * 0.35, left: W * 0.0, size: 68, emoji: '🧑‍🦳', delay: 600 },
  { top: H * 0.5, left: W * 0.72, size: 60, emoji: '👩‍🦳', delay: 300 },
  { top: H * 0.58, left: W * 0.02, size: 76, emoji: '👨‍🦦', delay: 500 },
];

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { skipAuth } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const floatAnims = useRef(FLOATING.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(logoScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8, delay: 200 }),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }),
      ]),
    ]).start();
    floatAnims.forEach((anim, i) => {
      Animated.loop(Animated.sequence([
        Animated.delay(FLOATING[i].delay),
        Animated.timing(anim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0F0F1A', '#1a0a2e', '#0F0F1A']} style={StyleSheet.absoluteFill} />
      {FLOATING.map((p, i) => (
        <Animated.View key={i} style={[styles.floatingProfile, { top: p.top, left: p.left, width: p.size, height: p.size, borderRadius: p.size / 2, transform: [{ translateY: floatAnims[i].interpolate({ inputRange: [0, 1], outputRange: [0, -12] }) }], opacity: floatAnims[i].interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 1, 0.6] }) }]}>
          <Text style={{ fontSize: p.size * 0.55 }}>{p.emoji}</Text>
        </Animated.View>
      ))}
      <LinearGradient colors={['transparent', Colors.background, Colors.background]} locations={[0, 0.35, 1]} style={[StyleSheet.absoluteFill, { top: H * 0.25 }]} />
      <View style={styles.content}>
        <Animated.View style={{ transform: [{ scale: logoScale }], alignItems: 'center' }}>
          <View style={styles.logoContainer}>
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.logoGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.logoEmoji}>⚡</Text>
            </LinearGradient>
          </View>
        </Animated.View>
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>SparkMatch</Text>
          <Text style={styles.tagline}>Where connections ignite</Text>
          <Text style={styles.subtitle}>Meet real people, build real connections.{`\n`}Your next story starts here.</Text>
        </Animated.View>
        <Animated.View style={[styles.buttons, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <GradientButton title="Create Account" onPress={() => navigation.navigate('SignUp')} size="lg" />
          <GradientButton title="Sign In" onPress={() => navigation.navigate('Login')} variant="outline" size="lg" />
          <TouchableOpacity onPress={skipAuth} style={styles.skipButton}>
            <Text style={styles.skipText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  floatingProfile: { position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.cardBackground, borderWidth: 2, borderColor: Colors.border },
  content: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 60, paddingHorizontal: 32 },
  logoContainer: { marginBottom: 24 },
  logoGradient: { width: 90, height: 90, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  logoEmoji: { fontSize: 44 },
  textContainer: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 42, fontWeight: '900', color: Colors.white, letterSpacing: -1, marginBottom: 4 },
  tagline: { fontSize: 16, color: Colors.primary, fontWeight: '600', letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' },
  subtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  buttons: { width: '100%', gap: 12 },
  skipButton: { alignItems: 'center', padding: 12 },
  skipText: { color: Colors.textMuted, fontSize: 14, fontWeight: '500' },
});
