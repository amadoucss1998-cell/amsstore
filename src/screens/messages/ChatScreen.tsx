import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Gradients } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useChatStore } from '../../store/useChatStore';
import { Match } from '../../types';

const ICEBREAKERS = [
  'What\'s your favorite spot in Monrovia? 🇱🇷',
  'If you could eat any Liberian dish right now, what would it be? 🍲',
  'What\'s the best thing about living in West Africa? ✨',
  'Are you a morning person or night owl? 🌅',
];

export default function ChatScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { match } = route.params as { match: Match };
  const insets = useSafeAreaInsets();
  const { messages, sendMessage, markRead, isTyping } = useChatStore();
  const [text, setText] = useState('');
  const flatRef = useRef<FlatList>(null);
  const myId = 'me';

  const chatMessages = messages[match.id] || [];
  const typing = isTyping[match.id];

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(match.id, text.trim(), myId);
    setText('');
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </TouchableOpacity>
        <Image source={{ uri: match.profile.photos[0] }} style={styles.headerAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{match.profile.name}</Text>
          <Text style={styles.headerStatus}>
            {match.profile.verified !== 'none' ? '✅ Verified · ' : ''}Active recently
          </Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Icebreakers */}
      {chatMessages.length === 0 && (
        <View style={styles.icebreakers}>
          <Text style={styles.icebreakerTitle}>💬 AI Icebreakers</Text>
          <View style={styles.icebreakerChips}>
            {ICEBREAKERS.map((ic, i) => (
              <TouchableOpacity key={i} style={styles.icebreakerChip} onPress={() => setText(ic)}>
                <Text style={styles.icebreakerText}>{ic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={chatMessages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: Spacing.md, paddingBottom: Spacing.lg }}
        onContentSizeChange={() => flatRef.current?.scrollToEnd()}
        renderItem={({ item }) => {
          const isMine = item.senderId === myId;
          return (
            <View style={[styles.msgWrap, isMine ? styles.msgWrapRight : styles.msgWrapLeft]}>
              <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
                <Text style={[styles.bubbleText, isMine && styles.bubbleTextMine]}>{item.content}</Text>
              </View>
              {isMine && (
                <Ionicons name={item.read ? 'checkmark-done' : 'checkmark'} size={12} color={Colors.primary} style={{ marginTop: 2 }} />
              )}
            </View>
          );
        }}
        ListFooterComponent={
          typing ? (
            <View style={styles.typingWrap}>
              <Text style={styles.typingText}>{match.profile.name.split(' ')[0]} is typing...</Text>
            </View>
          ) : null
        }
      />

      {/* Input */}
      <View style={[styles.inputWrap, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={styles.inputAction}>
          <Ionicons name="happy-outline" size={24} color={Colors.textMuted} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={Colors.textMuted}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!text.trim()}
        >
          <LinearGradient colors={text.trim() ? Gradients.primary as any : [Colors.card, Colors.card]} style={styles.sendBtnGradient}>
            <Ionicons name="send" size={18} color={text.trim() ? '#fff' : Colors.textMuted} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { padding: 4 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20 },
  headerInfo: { flex: 1 },
  headerName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  headerStatus: { fontSize: FontSize.xs, color: Colors.textMuted },
  headerBtn: { padding: 4 },
  icebreakers: { padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  icebreakerTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary, marginBottom: Spacing.sm },
  icebreakerChips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  icebreakerChip: { backgroundColor: Colors.card, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: Colors.primary + '50' },
  icebreakerText: { fontSize: FontSize.xs, color: Colors.textSecondary },
  msgWrap: { flexDirection: 'row', marginBottom: Spacing.sm, alignItems: 'flex-end', gap: 4 },
  msgWrapLeft: { justifyContent: 'flex-start' },
  msgWrapRight: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '75%', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.lg },
  bubbleMine: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleTheirs: { backgroundColor: Colors.card, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 20 },
  bubbleTextMine: { color: '#fff' },
  typingWrap: { padding: Spacing.sm },
  typingText: { fontSize: FontSize.sm, color: Colors.textMuted, fontStyle: 'italic' },
  inputWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm, paddingHorizontal: Spacing.md, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.background },
  inputAction: { padding: 8 },
  input: { flex: 1, backgroundColor: Colors.card, borderRadius: Radius.xl, paddingHorizontal: Spacing.md, paddingVertical: 10, color: Colors.text, fontSize: FontSize.md, maxHeight: 120, borderWidth: 1, borderColor: Colors.border },
  sendBtn: { borderRadius: Radius.full, overflow: 'hidden' },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnGradient: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
});
