import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MessagesStackParamList, Message } from '../../types';
import { useChatStore } from '../../store/useChatStore';
import { MessageBubble } from '../../components/MessageBubble';
import { Avatar } from '../../components/Avatar';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';

type Props = {
  navigation: NativeStackNavigationProp<MessagesStackParamList, 'Chat'>;
  route: RouteProp<MessagesStackParamList, 'Chat'>;
};

export const ChatScreen: React.FC<Props> = ({ navigation, route }) => {
  const { matchId, user } = route.params;
  const { getMessages, sendMessage, markAsRead, isTyping } = useChatStore();
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const typingOpacity = useRef(new Animated.Value(0)).current;

  const messages = getMessages(matchId);
  const typing = isTyping[matchId] ?? false;

  useEffect(() => {
    markAsRead(matchId);
  }, [matchId]);

  useEffect(() => {
    if (typing) {
      Animated.timing(typingOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    } else {
      Animated.timing(typingOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [typing]);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages.length]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(matchId, text.trim(), 'current_user');
    setText('');
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isOwn = item.senderId === 'current_user';
    const prevMsg = messages[index - 1];
    const showTime = !prevMsg || (
      new Date(item.createdAt).getTime() - new Date(prevMsg.createdAt).getTime() > 300000 // 5 min gap
    );
    return (
      <View style={styles.messageRow}>
        {showTime && (
          <Text style={styles.timeStamp}>
            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
        <MessageBubble message={item} isOwn={isOwn} showTime={false} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={[Colors.background, '#0d0d1f']} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerProfile} activeOpacity={0.8}>
          <Avatar uri={user.photos[0]} name={user.name} size={42} showOnline />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{user.name}</Text>
            <Text style={styles.headerOnline}>Online now</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerAction}>
          <Text style={styles.headerActionIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          ListHeaderComponent={
            <View style={styles.matchHeader}>
              <Avatar uri={user.photos[0]} name={user.name} size={80} />
              <Text style={styles.matchName}>{user.name}</Text>
              <Text style={styles.matchInfo}>
                {user.age} • {user.occupation} • {user.distance} miles away
              </Text>
              <View style={styles.matchedBadge}>
                <Text style={styles.matchedBadgeText}>❤️ You matched!</Text>
              </View>
            </View>
          }
        />

        {/* Typing indicator */}
        <Animated.View style={[styles.typingContainer, { opacity: typingOpacity }]}>
          <Avatar uri={user.photos[0]} name={user.name} size={28} />
          <View style={styles.typingBubble}>
            <Text style={styles.typingDots}>• • •</Text>
          </View>
        </Animated.View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.emojiButton}>
            <Text style={styles.emojiButtonIcon}>😊</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder={`Message ${user.name.split(' ')[0]}...`}
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              text.trim().length > 0 && styles.sendButtonActive,
            ]}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <LinearGradient
              colors={text.trim() ? [Colors.gradientStart, Colors.gradientEnd] : ['#2A2A45', '#2A2A45']}
              style={styles.sendGradient}
            >
              <Text style={styles.sendIcon}>↑</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing['4'],
    paddingVertical: Spacing['3'],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 12,
  },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 20, color: Colors.white, fontWeight: '600' },
  headerProfile: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerInfo: { gap: 2 },
  headerName: { fontSize: 16, fontWeight: '700', color: Colors.white },
  headerOnline: { fontSize: 12, color: Colors.success },
  headerAction: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerActionIcon: { fontSize: 20, color: Colors.textSecondary },
  messagesList: { padding: Spacing['4'], paddingBottom: Spacing['2'] },
  messageRow: { marginVertical: 3 },
  timeStamp: {
    textAlign: 'center', fontSize: 11, color: Colors.textMuted, marginVertical: 10,
  },
  matchHeader: { alignItems: 'center', paddingVertical: Spacing['6'], gap: 8 },
  matchName: { fontSize: 20, fontWeight: '800', color: Colors.white },
  matchInfo: { fontSize: 13, color: Colors.textMuted },
  matchedBadge: {
    backgroundColor: 'rgba(255,75,110,0.15)',
    borderRadius: BorderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,75,110,0.3)',
  },
  matchedBadgeText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing['5'],
    paddingBottom: 6,
  },
  typingBubble: {
    backgroundColor: '#252540',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  typingDots: { color: Colors.textMuted, fontSize: 14, letterSpacing: 3 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing['4'],
    paddingVertical: Spacing['3'],
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  emojiButton: {
    width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center',
  },
  emojiButtonIcon: { fontSize: 22 },
  input: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: 100,
    lineHeight: 20,
  },
  sendButton: { flexShrink: 0 },
  sendButtonActive: {},
  sendGradient: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: { fontSize: 20, color: Colors.white, fontWeight: '700' },
});
