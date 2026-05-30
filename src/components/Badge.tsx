import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../theme/colors';
import { BorderRadius } from '../theme/spacing';

interface BadgeProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  emoji?: string;
}

const INTEREST_EMOJIS: Record<string, string> = {
  Travel: '✈️',
  Music: '🎵',
  Hiking: '🧗',
  Photography: '📸',
  Cooking: '👨‍🍳',
  Reading: '📚',
  Yoga: '🧘',
  Gaming: '🎮',
  Art: '🎨',
  Movies: '🎥',
  Fitness: '💪',
  Dancing: '💃',
  Coffee: '☕',
  Wine: '🍷',
  Dogs: '🐶',
  Cats: '🐱',
  Surfing: '🌊',
  Climbing: '🧗',
  Cycling: '🚴',
  Running: '🏃',
  Foodie: '👁‍🗨',
  Concerts: '🎸',
  Theater: '🎭',
  Meditation: '🧘',
  Tech: '💻',
  Fashion: '👗',
  Sports: '⚽',
  Writing: '✍️',
  Volunteering: '🤝',
  Languages: '🌍',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  selected = false,
  onPress,
  size = 'md',
  style,
  emoji,
}) => {
  const emojiChar = emoji ?? INTEREST_EMOJIS[label] ?? '✨';

  const content = (
    <View
      style={[
        styles.badge,
        size === 'sm' ? styles.badgeSm : styles.badgeMd,
        selected ? styles.badgeSelected : styles.badgeDefault,
        style,
      ]}
    >
      <Text style={size === 'sm' ? styles.emojiSm : styles.emojiMd}>{emojiChar}</Text>
      <Text
        style={[
          styles.label,
          size === 'sm' ? styles.labelSm : styles.labelMd,
          selected ? styles.labelSelected : styles.labelDefault,
        ]}
      >
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
  },
  badgeMd: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
  },
  badgeSm: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 4,
  },
  badgeDefault: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badgeSelected: {
    backgroundColor: 'rgba(255,75,110,0.2)',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  label: {
    fontWeight: '600',
  },
  labelMd: { fontSize: 14 },
  labelSm: { fontSize: 12 },
  labelDefault: { color: Colors.textSecondary },
  labelSelected: { color: Colors.primary },
  emojiMd: { fontSize: 16 },
  emojiSm: { fontSize: 13 },
});
