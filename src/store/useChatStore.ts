import { create } from 'zustand';
import { Match, Message } from '../types';
import { MOCK_MATCHES, MOCK_MESSAGES } from '../data/mockProfiles';

const AUTO_REPLIES = [
  'Haha that\'s so true! 😄',
  'Tell me more about that 👀',
  'Wow, I feel the same way!',
  'That\'s really interesting 🤔',
  'I\'d love to hear more about you!',
  'You seem really cool 😊',
];

interface ChatState {
  matches: Match[];
  messages: Record<string, Message[]>;
  typing: string | null;
  sendMessage: (matchId: string, content: string) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  matches: MOCK_MATCHES,
  messages: MOCK_MESSAGES,
  typing: null,
  sendMessage: (matchId, content) => {
    const msg: Message = {
      id: Date.now().toString(),
      matchId, senderId: 'me', content, read: true, flagged: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    set((s) => ({
      messages: { ...s.messages, [matchId]: [...(s.messages[matchId] ?? []), msg] },
      typing: matchId,
    }));
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        matchId,
        senderId: MOCK_MATCHES.find((m) => m.id === matchId)?.profile.id ?? '',
        content: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        read: false, flagged: false,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      set((s) => ({
        messages: { ...s.messages, [matchId]: [...(s.messages[matchId] ?? []), reply] },
        typing: null,
      }));
    }, 1800);
  },
}));
