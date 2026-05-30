import { create } from 'zustand';
import { Message, Match } from '../types';
import { MOCK_MESSAGES, MOCK_MATCHES } from '../data/mockMessages';
import { generateId } from '../utils/helpers';

interface ChatState {
  matches: Match[];
  messages: Record<string, Message[]>;
  activeMatchId: string | null;
  isTyping: Record<string, boolean>;

  sendMessage: (matchId: string, text: string, senderId: string) => void;
  markAsRead: (matchId: string) => void;
  setActiveMatch: (matchId: string | null) => void;
  getMessages: (matchId: string) => Message[];
  getTotalUnread: () => number;
  simulateReply: (matchId: string, userId: string) => void;
}

const MOCK_REPLIES = [
  'Haha that\'s so true! 😂',
  'I was literally just thinking about that!',
  'Okay you\'ve got my attention now 😏',
  'That\'s actually a great point.',
  'So what are you up to this weekend?',
  'I love that! Tell me more.',
  'Honestly same 😂',
  'Wait, really?? That\'s wild.',
  'You seem fun. Drinks soon?',
  'Okay I wasn\'t expecting that answer but I respect it',
];

export const useChatStore = create<ChatState>((set, get) => ({
  matches: MOCK_MATCHES,
  messages: MOCK_MESSAGES,
  activeMatchId: null,
  isTyping: {},

  getMessages: (matchId: string) => {
    return get().messages[matchId] ?? [];
  },

  sendMessage: (matchId: string, text: string, senderId: string) => {
    const match = get().matches.find((m) => m.id === matchId);
    if (!match) return;

    const newMsg: Message = {
      id: generateId(),
      matchId,
      senderId,
      receiverId: match.matchedUserId === senderId ? match.userId : match.matchedUserId,
      text,
      createdAt: new Date(),
      read: false,
      type: 'text',
    };

    set((s) => ({
      messages: {
        ...s.messages,
        [matchId]: [...(s.messages[matchId] ?? []), newMsg],
      },
      matches: s.matches.map((m) =>
        m.id === matchId ? { ...m, lastMessage: newMsg } : m
      ),
    }));

    // Simulate typing + reply
    get().simulateReply(matchId, match.matchedUserId);
  },

  simulateReply: (matchId: string, userId: string) => {
    const typingDelay = 1000 + Math.random() * 1500;
    const replyDelay = typingDelay + 1500 + Math.random() * 2000;

    setTimeout(() => {
      set((s) => ({ isTyping: { ...s.isTyping, [matchId]: true } }));
    }, typingDelay);

    setTimeout(() => {
      const text = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
      const reply: Message = {
        id: generateId(),
        matchId,
        senderId: userId,
        receiverId: 'current_user',
        text,
        createdAt: new Date(),
        read: false,
        type: 'text',
      };

      set((s) => ({
        isTyping: { ...s.isTyping, [matchId]: false },
        messages: {
          ...s.messages,
          [matchId]: [...(s.messages[matchId] ?? []), reply],
        },
        matches: s.matches.map((m) =>
          m.id === matchId ? { ...m, lastMessage: reply, unreadCount: m.unreadCount + 1 } : m
        ),
      }));
    }, replyDelay);
  },

  markAsRead: (matchId: string) => {
    set((s) => ({
      messages: {
        ...s.messages,
        [matchId]: (s.messages[matchId] ?? []).map((msg) => ({ ...msg, read: true })),
      },
      matches: s.matches.map((m) =>
        m.id === matchId ? { ...m, unreadCount: 0 } : m
      ),
    }));
  },

  setActiveMatch: (matchId) => set({ activeMatchId: matchId }),

  getTotalUnread: () => {
    return get().matches.reduce((sum, m) => sum + m.unreadCount, 0);
  },
}));
