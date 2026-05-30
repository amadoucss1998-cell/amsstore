import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';
import { formatChatTime } from '../utils/helpers';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showTime?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, showTime = false }) => {
  return (
    <View style={[styles.wrapper, isOwn ? styles.ownWrapper : styles.otherWrapper]}>
      {isOwn ? (
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bubble, styles.ownBubble]}
        >
          <Text style={styles.ownText}>{message.text}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.bubble, styles.otherBubble]}>
          <Text style={styles.otherText}>{message.text}</Text>
        </View>
      )}
      {showTime && (
        <Text style={[styles.time, isOwn ? styles.timeRight : styles.timeLeft]}>
          {formatChatTime(message.createdAt)}
          {isOwn && (
            <Text style={styles.readStatus}>
              {message.read ? '  ✓✓' : '  ✓'}
            </Text>
          )}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '80%',
    marginVertical: 2,
  },
  ownWrapper: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherWrapper: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  ownBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#252540',
    borderBottomLeftRadius: 4,
  },
  ownText: {
    color: Colors.white,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  otherText: {
    color: Colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
  },
  time: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 3,
  },
  timeRight: {
    textAlign: 'right',
    marginRight: 4,
  },
  timeLeft: {
    marginLeft: 4,
  },
  readStatus: {
    color: Colors.accentBlue,
  },
});
