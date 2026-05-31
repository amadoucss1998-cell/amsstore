import { create } from 'zustand';
import { AuthUser, UserPreferences } from '../types';

const DEFAULT_USER: AuthUser = {
  id: 'current_user',
  email: 'alex@example.com',
  name: 'Alex Morgan',
  photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80'],
  bio: 'Software engineer who loves hiking and cooking. Always up for a spontaneous adventure. My dog Biscuit judges my dates.',
  age: 28,
  interests: ['Hiking', 'Cooking', 'Photography', 'Travel', 'Music'],
  occupation: 'Software Engineer',
  location: 'San Francisco, CA',
  preferences: {
    minAge: 22,
    maxAge: 35,
    maxDistance: 25,
    genderPreference: ['female', 'non-binary'],
    lookingFor: ['relationship'],
  },
  onboardingComplete: true,
};

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
  skipAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  hasCompletedOnboarding: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 1200));
    set({ isAuthenticated: true, isLoading: false, user: { ...DEFAULT_USER, email }, hasCompletedOnboarding: true });
  },

  signup: async (email: string, _password: string, name: string) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 1200));
    set({ isAuthenticated: true, isLoading: false, user: { ...DEFAULT_USER, email, name }, hasCompletedOnboarding: false });
  },

  skipAuth: () => set({ isAuthenticated: true, user: DEFAULT_USER, hasCompletedOnboarding: true }),

  logout: () => set({ isAuthenticated: false, user: null, hasCompletedOnboarding: false }),

  updateUser: (updates) => {
    const user = get().user;
    if (user) set({ user: { ...user, ...updates } });
  },

  updatePreferences: (prefs) => {
    const user = get().user;
    if (user) set({ user: { ...user, preferences: { ...user.preferences, ...prefs } } });
  },

  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
    const user = get().user;
    if (user) set({ user: { ...user, onboardingComplete: true } });
  },
}));
