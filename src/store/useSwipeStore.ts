import { create } from 'zustand';
import { User, SwipeAction, Match } from '../types';
import { MOCK_PROFILES } from '../data/mockProfiles';
import { MOCK_MATCHES } from '../data/mockMessages';
import { generateId } from '../utils/helpers';

interface SwipeState {
  profiles: User[];
  currentIndex: number;
  swipeHistory: SwipeAction[];
  matches: Match[];
  likedUserIds: Set<string>;
  dislikedUserIds: Set<string>;
  superlikedUserIds: Set<string>;
  isLoading: boolean;
  newMatch: User | null;

  swipeRight: (user: User) => Match | null;
  swipeLeft: (user: User) => void;
  superLike: (user: User) => Match | null;
  undoLastSwipe: () => void;
  clearNewMatch: () => void;
  loadMoreProfiles: () => void;
  getCurrentProfile: () => User | null;
  getRemainingCount: () => number;
}

const SIMULATE_MATCH_CHANCE = 0.4;

export const useSwipeStore = create<SwipeState>((set, get) => ({
  profiles: MOCK_PROFILES,
  currentIndex: 0,
  swipeHistory: [],
  matches: MOCK_MATCHES,
  likedUserIds: new Set(),
  dislikedUserIds: new Set(),
  superlikedUserIds: new Set(),
  isLoading: false,
  newMatch: null,

  getCurrentProfile: () => {
    const { profiles, currentIndex } = get();
    return profiles[currentIndex] ?? null;
  },

  getRemainingCount: () => {
    const { profiles, currentIndex } = get();
    return profiles.length - currentIndex;
  },

  swipeRight: (user: User) => {
    const state = get();
    const action: SwipeAction = { userId: user.id, action: 'like', timestamp: new Date() };
    const newLiked = new Set(state.likedUserIds);
    newLiked.add(user.id);

    let newMatch: Match | null = null;
    const isMatch = Math.random() < SIMULATE_MATCH_CHANCE;
    if (isMatch) {
      newMatch = {
        id: generateId(),
        userId: 'current_user',
        matchedUserId: user.id,
        user,
        createdAt: new Date(),
        unreadCount: 0,
      };
    }

    set((s) => ({
      currentIndex: s.currentIndex + 1,
      swipeHistory: [...s.swipeHistory, action],
      likedUserIds: newLiked,
      matches: newMatch ? [newMatch, ...s.matches] : s.matches,
      newMatch: newMatch ? user : null,
    }));

    return newMatch;
  },

  swipeLeft: (user: User) => {
    const action: SwipeAction = { userId: user.id, action: 'dislike', timestamp: new Date() };
    set((s) => {
      const newDisliked = new Set(s.dislikedUserIds);
      newDisliked.add(user.id);
      return {
        currentIndex: s.currentIndex + 1,
        swipeHistory: [...s.swipeHistory, action],
        dislikedUserIds: newDisliked,
      };
    });
  },

  superLike: (user: User) => {
    const state = get();
    const action: SwipeAction = { userId: user.id, action: 'superlike', timestamp: new Date() };
    const newSuperliked = new Set(state.superlikedUserIds);
    newSuperliked.add(user.id);

    const newMatch: Match = {
      id: generateId(),
      userId: 'current_user',
      matchedUserId: user.id,
      user,
      createdAt: new Date(),
      unreadCount: 0,
    };

    set((s) => ({
      currentIndex: s.currentIndex + 1,
      swipeHistory: [...s.swipeHistory, action],
      superlikedUserIds: newSuperliked,
      matches: [newMatch, ...s.matches],
      newMatch: user,
    }));

    return newMatch;
  },

  undoLastSwipe: () => {
    set((s) => {
      if (s.currentIndex === 0 || s.swipeHistory.length === 0) return s;
      const newHistory = [...s.swipeHistory];
      const last = newHistory.pop()!;
      const newLiked = new Set(s.likedUserIds);
      const newDisliked = new Set(s.dislikedUserIds);
      const newSuperliked = new Set(s.superlikedUserIds);
      newLiked.delete(last.userId);
      newDisliked.delete(last.userId);
      newSuperliked.delete(last.userId);
      return {
        currentIndex: s.currentIndex - 1,
        swipeHistory: newHistory,
        likedUserIds: newLiked,
        dislikedUserIds: newDisliked,
        superlikedUserIds: newSuperliked,
      };
    });
  },

  clearNewMatch: () => set({ newMatch: null }),

  loadMoreProfiles: () => {
    set((s) => ({
      profiles: [...s.profiles, ...MOCK_PROFILES.map((p) => ({ ...p, id: generateId() }))],
    }));
  },
}));
