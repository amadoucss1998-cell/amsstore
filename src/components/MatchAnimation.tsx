import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '../theme/colors';

const { width: W, height: H } = Dimensions.get('window');

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  scale: Animated.Value;
  color: string;
  emoji: string;
  startX: number;
}

const CONFETTI_COLORS = ['#FF4B6E', '#7B2FBE', '#FFD700', '#FF8C00', '#00E5FF', '#FF6B9D'];
const CONFETTI_EMOJIS = ['✨', '❤️', '🎉', '💖', '⭐', '🌸'];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    x: new Animated.Value(0),
    y: new Animated.Value(0),
    opacity: new Animated.Value(1),
    scale: new Animated.Value(1),
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
    startX: (i / count) * W,
  }));
}

interface MatchAnimationProps {
  isVisible: boolean;
}

export const MatchAnimation: React.FC<MatchAnimationProps> = ({ isVisible }) => {
  const particles = useRef<Particle[]>(createParticles(20)).current;
  const titleScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isVisible) return;

    Animated.spring(titleScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 6 }).start();
    Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();

    particles.forEach((p, i) => {
      const delay = i * 50;
      const targetX = p.startX + (Math.random() - 0.5) * 200;
      const targetY = -(Math.random() * H * 0.7 + H * 0.1);

      p.x.setValue(W / 2);
      p.y.setValue(H * 0.4);
      p.opacity.setValue(1);
      p.scale.setValue(Math.random() * 0.8 + 0.4);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(p.x, { toValue: targetX, duration: 1200, useNativeDriver: true }),
          Animated.timing(p.y, { toValue: targetY, duration: 1200, useNativeDriver: true }),
          Animated.sequence([
            Animated.delay(600),
            Animated.timing(p.opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
          ]),
        ]),
      ]).start();
    });
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { scale: p.scale },
              ],
              opacity: p.opacity,
            },
          ]}
        >
          {p.emoji}
        </Animated.Text>
      ))}
      <Animated.View
        style={[
          styles.titleContainer,
          { transform: [{ scale: titleScale }], opacity: titleOpacity },
        ]}
      >
        <Text style={styles.sparkEmoji}>✨</Text>
        <Text style={styles.matchTitle}>It\'s a Match!</Text>
        <Text style={styles.sparkEmoji}>✨</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    fontSize: 24,
  },
  titleContainer: {
    position: 'absolute',
    top: H * 0.35,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  matchTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: Colors.white,
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  sparkEmoji: {
    fontSize: 32,
  },
});
