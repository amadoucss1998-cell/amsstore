import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MessagesStackParamList, Match } from '../../types';
import { useChatStore } from '../../store/useChatStore';
import { Avatar } from '../../components/Avatar';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { formatMessageTime, getLastMessagePreview, isNewMatch } from '../../utils/helpers';

type Props = { navigation: NativeStackNavigationProp<MessagesStackParamList, 'ChatList'> };

export const ChatListScreen: React.FC<Props> = ({ navigation }) => {
  const { matches } = useChatStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  const newMatches = matches.filter((m) => isNewMatch(m.createdAt));
  const conversations = matches.filter(
    (m) =>
      m.lastMessage &&
      (search
        ? m.user.name.toLowerCase().includes(search.toLowerCase())
        : true)
  );
  const noMessageMatches = matches.filter((m) => !m.lastMessage);

  const renderNewMatch = ({ item }: { item: Match }) => (
    <TouchableOpacity
      style={styles.newMatchItem}
      onPress={() => navigation.navigate('Chat', { matchId: item.id, user: item.user })}
      activeOpacity={0.8}
    >
      <View style={styles.newMatchAvatar}>
        <Avatar
          uri={item.user.photos[0]}
          name={item.user.name}
          size={64}
          showOnline
        />
        {item.unreadCount > 0 && (
          <View style={styles.newMatchBadge}>
            <Text style={styles.newMatchBadgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      <Text style={styles.newMatchName} numberOfLines={1}>
        {item.user.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );

  const renderConversation = ({ item, index }: { item: Match; index: number }) => {
    const isUnread = item.unreadCount > 0;
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20 + index * 5, 0],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity
          style={styles.conversationItem}
          onPress={() => navigation.navigate('Chat', { matchId: item.id, user: item.user })}
          activeOpacity={0.8}
        >
          <Avatar
            uri={item.user.photos[0]}
            name={item.user.name}
            size={58}
            showOnline={Math.random() > 0.5}
          />
          <View style={styles.conversationInfo}>
            <View style={styles.conversationHeader}>
              <Text style={[styles.conversationName, isUnread && styles.conversationNameBold]}>
                {item.user.name}
              </Text>
              {item.lastMessage && (
                <Text style={[styles.conversationTime, isUnread && styles.conversationTimeUnread]}>
                  {formatMessageTime(item.lastMessage.createdAt)}
                </Text>
              )}
            </View>
            <View style={styles.conversationPreviewRow}>
              <Text
                style={[styles.conversationPreview, isUnread && styles.conversationPreviewBold]}
                numberOfLines={1}
              >
                {getLastMessagePreview(item.lastMessage)}
              </Text>
              {isUnread && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={[Colors.background, '#0d0d1f']} style={StyleSheet.absoluteFill} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.headerIconText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* New matches row */}
      {newMatches.length > 0 && (
        <View style={styles.newMatchesSection}>
          <Text style={styles.sectionTitle}>New Matches ✨</Text>
          <FlatList
            data={[...newMatches, ...noMessageMatches.slice(0, 4)]}
            renderItem={renderNewMatch}
            keyExtractor={(item) => `nm-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newMatchesList}
          />
        </View>
      )}

      {/* Conversations */}
      <Text style={styles.sectionTitle2}>Conversations</Text>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conversationsList}
        ListEmptyComponent={
          <View style={styles.emptyConversations}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptySubtitle}>Start swiping to find your match!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['5'],
    paddingVertical: Spacing['4'],
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.white },
  headerIcons: { flexDirection: 'row', gap: 8 },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: { fontSize: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    marginHorizontal: Spacing['5'],
    paddingHorizontal: Spacing['4'],
    marginBottom: Spacing['4'],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  newMatchesSection: { marginBottom: Spacing['4'] },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: Spacing['5'],
    marginBottom: Spacing['3'],
  },
  sectionTitle2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
    paddingHorizontal: Spacing['5'],
    marginBottom: Spacing['2'],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 12,
  },
  newMatchesList: { paddingHorizontal: Spacing['5'], gap: 16 },
  newMatchItem: { alignItems: 'center', gap: 6, width: 76 },
  newMatchAvatar: { position: 'relative' },
  newMatchBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  newMatchBadgeText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  newMatchName: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },
  conversationsList: { paddingHorizontal: Spacing['5'], paddingBottom: 20 },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  conversationInfo: { flex: 1, gap: 4 },
  conversationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  conversationName: { fontSize: 16, color: Colors.textPrimary, fontWeight: '500' },
  conversationNameBold: { fontWeight: '700' },
  conversationTime: { fontSize: 12, color: Colors.textMuted },
  conversationTimeUnread: { color: Colors.primary, fontWeight: '600' },
  conversationPreviewRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  conversationPreview: { fontSize: 14, color: Colors.textMuted, flex: 1 },
  conversationPreviewBold: { color: Colors.textSecondary, fontWeight: '600' },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
  unreadBadgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  emptyConversations: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  emptySubtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center' },
});
