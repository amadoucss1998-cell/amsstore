import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { FontSize, FontWeight, Spacing, Radius } from '../../theme/spacing';
import { useChatStore } from '../../store/useChatStore';
import { Match } from '../../types';

export default function ChatListScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const matches = useChatStore((s) => s.matches);

  const formatTime = (date?: Date) => {
    if (!date) return '';
    const diff = Date.now() - date.getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity><Ionicons name="search" size={22} color={Colors.text} /></TouchableOpacity>
      </View>

      {matches.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>💌</Text>
          <Text style={styles.emptyTitle}>No matches yet</Text>
          <Text style={styles.emptyText}>Keep swiping to find your SPARK!</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: Spacing.lg }}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.border, marginLeft: 80 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.matchRow}
              onPress={() => navigation.navigate('Chat', { match: item })}
              activeOpacity={0.7}
            >
              <View style={styles.avatarWrap}>
                <Image source={{ uri: item.profile.photos[0] }} style={styles.avatar} />
                {item.profile.verified !== 'none' && (
                  <View style={styles.verifiedDot}>
                    <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                  </View>
                )}
              </View>
              <View style={styles.matchInfo}>
                <View style={styles.matchTopRow}>
                  <Text style={styles.matchName}>{item.profile.name}</Text>
                  <Text style={styles.matchTime}>{formatTime(item.lastMessageAt)}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage || 'Say hi! 👋'}</Text>
              </View>
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  emptyIcon: { fontSize: 60 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary },
  matchRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  avatarWrap: { position: 'relative' },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  verifiedDot: { position: 'absolute', bottom: 0, right: 0 },
  matchInfo: { flex: 1 },
  matchTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  matchName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  matchTime: { fontSize: FontSize.xs, color: Colors.textMuted },
  lastMessage: { fontSize: FontSize.sm, color: Colors.textSecondary },
  unreadBadge: { backgroundColor: Colors.primary, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  unreadText: { color: '#fff', fontSize: FontSize.xs, fontWeight: FontWeight.bold },
});
