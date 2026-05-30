import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { Colors } from '../theme/colors';
import { Shadow } from '../theme/spacing';

interface ActionButtonsProps {
  onDislike: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onUndo?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDislike,
  onLike,
  onSuperLike,
  onUndo,
  size = 'lg',
}) => {
  const dislikeScale = useRef(new Animated.Value(1)).current;
  const likeScale = useRef(new Animated.Value(1)).current;
  const superLikeScale = useRef(new Animated.Value(1)).current;
  const undoScale = useRef(new Animated.Value(1)).current;

  const animatePress = (anim: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.spring(anim, { toValue: 0.85, useNativeDriver: true, speed: 50 }),
      Animated.spring(anim, { toValue: 1.1, useNativeDriver: true, speed: 50 }),
      Animated.spring(anim, { toValue: 1, useNativeDriver: true, speed: 30 }),
    ]).start();
    callback();
  };

  const sizes = {
    sm: { main: 52, secondary: 44, superlike: 48 },
    md: { main: 60, secondary: 52, superlike: 56 },
    lg: { main: 68, secondary: 56, superlike: 64 },
  }[size];

  return (
    <View style={styles.container}>
      {onUndo && (
        <Animated.View style={{ transform: [{ scale: undoScale }] }}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.undoButton,
              { width: sizes.secondary, height: sizes.secondary, borderRadius: sizes.secondary / 2 },
            ]}
            onPress={() => animatePress(undoScale, onUndo)}
            activeOpacity={0.85}
          >
            <Text style={styles.undoEmoji}>↩</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View style={{ transform: [{ scale: dislikeScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.dislikeButton,
            { width: sizes.main, height: sizes.main, borderRadius: sizes.main / 2 },
          ]}
          onPress={() => animatePress(dislikeScale, onDislike)}
          activeOpacity={0.85}
        >
          <Text style={styles.dislikeEmoji}>✕</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: superLikeScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.superLikeButton,
            { width: sizes.superlike, height: sizes.superlike, borderRadius: sizes.superlike / 2 },
          ]}
          onPress={() => animatePress(superLikeScale, onSuperLike)}
          activeOpacity={0.85}
        >
          <Text style={styles.superLikeEmoji}>★</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: likeScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.likeButton,
            { width: sizes.main, height: sizes.main, borderRadius: sizes.main / 2 },
          ]}
          onPress={() => animatePress(likeScale, onLike)}
          activeOpacity={0.85}
        >
          <Text style={styles.likeEmoji}>♥</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  dislikeButton: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.dislike,
  },
  likeButton: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.like,
  },
  superLikeButton: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.superlike,
  },
  undoButton: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.textMuted,
  },
  dislikeEmoji: { fontSize: 26, color: Colors.dislike },
  likeEmoji: { fontSize: 26, color: Colors.like },
  superLikeEmoji: { fontSize: 22, color: Colors.superlike },
  undoEmoji: { fontSize: 20, color: Colors.textMuted },
});
