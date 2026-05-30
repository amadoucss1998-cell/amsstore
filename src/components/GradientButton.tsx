import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';
import { BorderRadius, Spacing } from '../theme/spacing';
import { FontSize } from '../theme/typography';

interface GradientButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  fullWidth = true,
}) => {
  const sizeStyles = {
    sm: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: BorderRadius.md },
    md: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: BorderRadius.xl },
    lg: { paddingVertical: 20, paddingHorizontal: 40, borderRadius: BorderRadius['2xl'] },
  }[size];

  const textSizes = {
    sm: FontSize.sm,
    md: FontSize.md,
    lg: FontSize.lg,
  }[size];

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.outlineButton,
          sizeStyles,
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Text style={[styles.outlineText, { fontSize: textSizes }, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'ghost') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.ghostButton,
          sizeStyles,
          fullWidth && styles.fullWidth,
          style,
        ]}
        activeOpacity={0.7}
      >
        <Text style={[styles.ghostText, { fontSize: textSizes }, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[fullWidth && styles.fullWidth, disabled && styles.disabled, style]}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, sizeStyles]}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={[styles.text, { fontSize: textSizes }, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  outlineText: {
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  ghostButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostText: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
