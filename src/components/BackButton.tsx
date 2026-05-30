import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text } from 'react-native';
import { Colors } from '../theme/colors';

interface BackButtonProps {
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color = Colors.white,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={0.7}>
      <Text style={[styles.arrow, { color }]}>{'←'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 20,
    fontWeight: '600',
  },
});
