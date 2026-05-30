import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';

interface ProgressBarProps {
  current: number;
  total: number;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, height = 4 }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = (current / total) * 100;
    Animated.spring(progress, {
      toValue: percentage,
      useNativeDriver: false,
      tension: 60,
      friction: 10,
    }).start();
  }, [current, total]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.track, { height }]}>
      <Animated.View style={{ width: widthInterpolated, height: '100%', borderRadius: height }}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
    overflow: 'hidden',
  },
});
