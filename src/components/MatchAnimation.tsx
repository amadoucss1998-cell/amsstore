import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '../theme/colors';

const { width: W, height: H } = Dimensions.get('window');
const CONFETTI_EMOJIS = ['✨', '❤️', '🎉', '💖', '⭐', '🌸'];

function createParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: new Animated.Value(0), y: new Animated.Value(0), opacity: new Animated.Value(1), scale: new Animated.Value(1),
    emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length], startX: (i / count) * W,
  }));
}

export const MatchAnimation: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const particles = useRef(createParticles(20)).current;

  useEffect(() => {
    if (!isVisible) return;
    particles.forEach((p, i) => {
      const delay = i * 50;
      const targetX = p.startX + (Math.random() - 0.5) * 200;
      const targetY = -(Math.random() * H * 0.7 + H * 0.1);
      p.x.setValue(W / 2); p.y.setValue(H * 0.4); p.opacity.setValue(1); p.scale.setValue(Math.random() * 0.8 + 0.4);
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(p.x, { toValue: targetX, duration: 1200, useNativeDriver: true }),
          Animated.timing(p.y, { toValue: targetY, duration: 1200, useNativeDriver: true }),
          Animated.sequence([Animated.delay(600), Animated.timing(p.opacity, { toValue: 0, duration: 600, useNativeDriver: true })]),
        ]),
      ]).start();
    });
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.Text key={i} style={[styles.particle, { transform: [{ translateX: p.x }, { translateY: p.y }, { scale: p.scale }], opacity: p.opacity }]}>{p.emoji}</Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  particle: { position: 'absolute', fontSize: 24 },
});
