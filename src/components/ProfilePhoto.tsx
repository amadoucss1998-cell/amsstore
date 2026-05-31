import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProfilePhotoProps { uri: string; width?: number; height?: number; showGradient?: boolean; borderRadius?: number; }

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ uri, width = SCREEN_WIDTH, height = SCREEN_WIDTH * 1.3, showGradient = true, borderRadius = 0 }) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={{ width, height, borderRadius, overflow: 'hidden' }}>
      {loading && <View style={[StyleSheet.absoluteFill, styles.loadingContainer]}><ActivityIndicator color={Colors.primary} /></View>}
      <Image source={{ uri }} style={[StyleSheet.absoluteFill, { borderRadius }]} resizeMode="cover" onLoad={() => setLoading(false)} />
      {showGradient && <LinearGradient colors={['transparent', 'transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)']} locations={[0, 0.4, 0.7, 1]} style={StyleSheet.absoluteFill} />}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { backgroundColor: Colors.cardBackground, alignItems: 'center', justifyContent: 'center' },
});
