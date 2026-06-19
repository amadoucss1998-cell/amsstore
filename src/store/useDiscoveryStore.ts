import { create } from 'zustand';
import { Profile } from '../types';
import { MOCK_PROFILES } from '../data/mockProfiles';

interface DiscoveryState {
  profiles: Profile[];
  history: { type: 'like' | 'pass' | 'super'; profile: Profile }[];
  lastMatch: Profile | null;
  swipe: (type: 'like' | 'pass' | 'super', profile: Profile) => void;
  undoLast: () => void;
  clearMatch: () => void;
}

export const useDiscoveryStore = create<DiscoveryState>()((set) => ({
  profiles: [...MOCK_PROFILES],
  history: [],
  lastMatch: null,
  swipe: (type, profile) =>
    set((s) => {
      const matched = type === 'super' ? true : type === 'like' ? Math.random() > 0.6 : false;
      return {
        profiles: s.profiles.filter((p) => p.id !== profile.id),
        history: [{ type, profile }, ...s.history],
        lastMatch: matched ? profile : null,
      };
    }),
  undoLast: () =>
    set((s) => {
      if (!s.history.length) return s;
      const [last, ...rest] = s.history;
      return { profiles: [last.profile, ...s.profiles], history: rest };
    }),
  clearMatch: () => set({ lastMatch: null }),
}));
