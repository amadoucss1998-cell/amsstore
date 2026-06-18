import { create } from 'zustand';
import { Profile, SwipeAction } from '../types';
import { MOCK_PROFILES } from '../data/mockProfiles';

interface DiscoveryState {
  profiles: Profile[];
  swipedIds: string[];
  newMatch: Profile | null;
  likeCount: number;
  maxLikes: number;
  swipe: (action: SwipeAction) => { matched: boolean };
  clearMatch: () => void;
  undoLast: () => void;
  resetLikes: () => void;
}

export const useDiscoveryStore = create<DiscoveryState>((set, get) => ({
  profiles: [...MOCK_PROFILES],
  swipedIds: [],
  newMatch: null,
  likeCount: 0,
  maxLikes: 10,
  swipe: (action) => {
    const { profiles, likeCount, maxLikes } = get();
    const top = profiles[profiles.length - 1];
    if (!top) return { matched: false };
    const isLike = action.type === 'like' || action.type === 'super';
    const matched = isLike && Math.random() < 0.4;
    set((s) => ({
      profiles: s.profiles.slice(0, -1),
      swipedIds: [...s.swipedIds, top.id],
      newMatch: matched ? top : null,
      likeCount: isLike ? likeCount + 1 : likeCount,
    }));
    return { matched };
  },
  clearMatch: () => set({ newMatch: null }),
  undoLast: () => {
    const { swipedIds } = get();
    if (!swipedIds.length) return;
    const lastId = swipedIds[swipedIds.length - 1];
    const profile = MOCK_PROFILES.find((p) => p.id === lastId);
    if (!profile) return;
    set((s) => ({
      profiles: [...s.profiles, profile],
      swipedIds: s.swipedIds.slice(0, -1),
    }));
  },
  resetLikes: () => set({ likeCount: 0 }),
}));
