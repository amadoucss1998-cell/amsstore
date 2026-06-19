import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile, SubscriptionPlan } from '../types';

interface AuthState {
  isLoggedIn: boolean;
  user: Partial<Profile> | null;
  login: (phone: string) => void;
  skipAuth: () => void;
  updateProfile: (data: Partial<Profile>) => void;
  upgradePlan: (plan: SubscriptionPlan) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (phone) =>
        set({
          isLoggedIn: true,
          user: { id: 'me', phone, name: '', age: 0, gender: 'man', city: '', countryCode: 'LR', bio: '', interests: [], photos: [], verified: 'phone', premium: 'free', lastActive: 'now' },
        }),
      skipAuth: () =>
        set({
          isLoggedIn: true,
          user: { id: 'me', name: 'Guest', age: 25, gender: 'man', city: 'Monrovia', countryCode: 'LR', bio: '', interests: [], photos: [], verified: 'none', premium: 'free', lastActive: 'now' },
        }),
      updateProfile: (data) =>
        set((s) => ({ user: { ...s.user, ...data } })),
      upgradePlan: (plan) =>
        set((s) => ({ user: { ...s.user, premium: plan } })),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    { name: 'spark-auth' }
  )
);
