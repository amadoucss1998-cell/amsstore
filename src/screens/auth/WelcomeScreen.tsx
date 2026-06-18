import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthStackParamList } from '../../types';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const skipAuth = useAuthStore((s) => s.skipAuth);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={['#0D0D1A', '#1A1A2E', '#0D0D1A']} style={styles.container}>
      {/* Background decorations */}
      <View style={[styles.circle, { top: -60, right: -60, backgroundColor: Colors.primary + '20' }]} />
      <View style={[styles.circle, { bottom: 100, left: -80, backgroundColor: Colors.accent + '15', width: 200, height: 200 }]} />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* Logo */}
        <View style={styles.logoWrap}>
          <LinearGradient colors={Gradients.primary as any} style={styles.logoGradient}>
            <Text style={styles.logoIcon}>⚡</Text>
          </LinearGradient>
          <Text style={styles.logoText}>SPARK</Text>
          <Text style={styles.tagline}>Love starts here 🇱🇷</Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {[
            { icon: '🔒', text: 'Safe & verified profiles' },
            { icon: '📱', text: 'Mobile Money payments' },
            { icon: '🤝', text: 'Match with real people' },
            { icon: '💌', text: 'AI-powered icebreakers' },
          ].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Phone')}>
            <LinearGradient colors={Gradients.primary as any} style={styles.btnGradient}>
              <Text style={styles.primaryBtnText}>Get Started →</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={skipAuth}>
            <Text style={styles.ghostBtnText}>Explore first (no sign-up)</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.legal}>By continuing you agree to our Terms & Privacy Policy</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  circle: { position: 'absolute', width: 250, height: 250, borderRadius: 125 },
  content: { paddingHorizontal: Spacing.xl, alignItems: 'center' },
  logoWrap: { alignItems: 'center', marginBottom: Spacing.xxl },
  logoGradient: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md },
  logoIcon: { fontSize: 40 },
  logoText: { fontSize: FontSize.hero, fontWeight: FontWeight.black, color: Colors.text, letterSpacing: 4 },
  tagline: { fontSize: FontSize.md, color: Colors.textSecondary, marginTop: Spacing.xs },
  features: { width: '100%', marginBottom: Spacing.xxl, gap: Spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  featureIcon: { fontSize: 24 },
  featureText: { fontSize: FontSize.md, color: Colors.textSecondary, flex: 1 },
  buttons: { width: '100%', gap: Spacing.md },
  primaryBtn: { borderRadius: Radius.full, overflow: 'hidden' },
  btnGradient: { paddingVertical: 18, alignItems: 'center', borderRadius: Radius.full },
  primaryBtnText: { color: '#fff', fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  ghostBtn: { paddingVertical: 16, alignItems: 'center' },
  ghostBtnText: { color: Colors.textSecondary, fontSize: FontSize.md },
  legal: { marginTop: Spacing.lg, fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center' },
});
