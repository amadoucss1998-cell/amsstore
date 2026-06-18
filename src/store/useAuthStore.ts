import { create } from 'zustand';
import { Profile, Country, SubscriptionPlan } from '../types';
import { DEFAULT_COUNTRY } from '../data/countries';

const DEFAULT_PROFILE: Profile = {
  id: 'me',
  phone: '+231770000001',
  name: 'Alex Doe',
  age: 25,
  gender: 'man',
  city: 'Monrovia',
  countryCode: 'LR',
  bio: 'Living my best life in Monrovia 🇱🇷',
  interests: ['Music', 'Football', 'Tech'],
  photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600'],
  verified: 'phone',
  premium: 'free',
  lastActive: new Date(),
};

interface AuthState {
  isAuthenticated: boolean;
  profile: Profile | null;
  selectedCountry: Country;
  phone: string;
  step: 'welcome' | 'phone' | 'otp' | 'setup' | 'photos' | 'done';
  login: (phone: string) => void;
  logout: () => void;
  skipAuth: () => void;
  setCountry: (country: Country) => void;
  setPhone: (phone: string) => void;
  setStep: (step: AuthState['step']) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  upgradePlan: (plan: SubscriptionPlan) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  profile: null,
  selectedCountry: DEFAULT_COUNTRY,
  phone: '',
  step: 'welcome',
  login: (phone) => set({ isAuthenticated: true, profile: { ...DEFAULT_PROFILE, phone }, step: 'done' }),
  logout: () => set({ isAuthenticated: false, profile: null, step: 'welcome' }),
  skipAuth: () => set({ isAuthenticated: true, profile: DEFAULT_PROFILE, step: 'done' }),
  setCountry: (country) => set({ selectedCountry: country }),
  setPhone: (phone) => set({ phone }),
  setStep: (step) => set({ step }),
  updateProfile: (updates) => set((s) => ({ profile: s.profile ? { ...s.profile, ...updates } : null })),
  upgradePlan: (plan) => set((s) => ({ profile: s.profile ? { ...s.profile, premium: plan } : null })),
}));
