import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';
import { getInitials } from '../utils/helpers';

interface AvatarProps { uri?: string; name?: string; size?: number; showOnline?: boolean; style?: ViewStyle; }

export const Avatar: React.FC<AvatarProps> = ({ uri, name = '', size = 52, showOnline = false, style }) => {
  const borderRadius = size / 2;
  const dotSize = size * 0.28;
  return (
    <View style={[{ width: size, height: size }, style]}>
      {uri ? (
        <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius }]} />
      ) : (
        <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={[styles.placeholder, { width: size, height: size, borderRadius }]}>
          <Text style={[styles.initials, { fontSize: size * 0.35 }]}>{getInitials(name)}</Text>
        </LinearGradient>
      )}
      {showOnline && <View style={[styles.onlineDot, { width: dotSize, height: dotSize, borderRadius: dotSize / 2, bottom: 1, right: 1 }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: { resizeMode: 'cover' },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: Colors.white, fontWeight: '700' },
  onlineDot: { position: 'absolute', backgroundColor: Colors.success, borderWidth: 2, borderColor: Colors.cardBackground },
});
