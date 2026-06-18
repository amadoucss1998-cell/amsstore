import { create } from 'zustand';
import { Match, Message } from '../types';
import { MOCK_MATCHES } from '../data/mockProfiles';

const MOCK_MESSAGES: Record<string, Message[]> = {
  m1: [
    { id: 'msg1', matchId: 'm1', senderId: 'p1', content: 'Hey! We matched 😊', read: true, flagged: false, createdAt: new Date(Date.now() - 60000 * 30) },
    { id: 'msg2', matchId: 'm1', senderId: 'me', content: 'Hi Amara! Great to match with you!', read: true, flagged: false, createdAt: new Date(Date.now() - 60000 * 20) },
    { id: 'msg3', matchId: 'm1', senderId: 'p1', content: 'Would love to grab coffee sometime! ☕', read: false, flagged: false, createdAt: new Date(Date.now() - 60000 * 15) },
  ],
  m2: [
    { id: 'msg4', matchId: 'm2', senderId: 'me', content: 'I read your article about Liberia\'s tech scene', read: true, flagged: false, createdAt: new Date(Date.now() - 60000 * 130) },
    { id: 'msg5', matchId: 'm2', senderId: 'p4', content: 'That article you mentioned sounds interesting', read: true, flagged: false, createdAt: new Date(Date.now() - 60000 * 120) },
  ],
};

interface ChatState {
  matches: Match[];
  messages: Record<string, Message[]>;
  isTyping: Record<string, boolean>;
  sendMessage: (matchId: string, content: string, senderId: string) => void;
  markRead: (matchId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  matches: MOCK_MATCHES as Match[],
  messages: MOCK_MESSAGES,
  isTyping: {},
  sendMessage: (matchId, content, senderId) => {
    const msg: Message = {
      id: `msg_${Date.now()}`,
      matchId,
      senderId,
      content,
      read: false,
      flagged: false,
      createdAt: new Date(),
    };
    set((s) => ({
      messages: { ...s.messages, [matchId]: [...(s.messages[matchId] || []), msg] },
      matches: s.matches.map((m) => m.id === matchId ? { ...m, lastMessage: content, lastMessageAt: new Date(), unreadCount: 0 } : m),
    }));
    // Simulate reply
    set((s) => ({ isTyping: { ...s.isTyping, [matchId]: true } }));
    const replies = ['Haha 😄', 'That\'s so true!', 'Tell me more 👀', 'I like that ❤️', 'For real! 😂'];
    setTimeout(() => {
      const match = get().matches.find((m) => m.id === matchId);
      if (!match) return;
      const reply: Message = {
        id: `msg_${Date.now()}_r`,
        matchId,
        senderId: match.userId,
        content: replies[Math.floor(Math.random() * replies.length)],
        read: false,
        flagged: false,
        createdAt: new Date(),
      };
      set((s) => ({
        messages: { ...s.messages, [matchId]: [...(s.messages[matchId] || []), reply] },
        isTyping: { ...s.isTyping, [matchId]: false },
      }));
    }, 2000 + Math.random() * 2000);
  },
  markRead: (matchId) => set((s) => ({
    matches: s.matches.map((m) => m.id === matchId ? { ...m, unreadCount: 0 } : m),
    messages: { ...s.messages, [matchId]: (s.messages[matchId] || []).map((msg) => ({ ...msg, read: true })) },
  })),
}));
