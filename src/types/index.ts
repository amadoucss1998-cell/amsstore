export type Country = {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  currency: string;
};

export type Gender = 'man' | 'woman' | 'non-binary';

export type VerificationStatus = 'none' | 'phone' | 'photo' | 'id';

export type SubscriptionPlan = 'free' | 'gold' | 'platinum';

export interface Profile {
  id: string;
  phone?: string;
  name: string;
  age: number;
  gender: Gender;
  city: string;
  countryCode: string;
  bio: string;
  interests: string[];
  photos: string[];
  verified: VerificationStatus;
  premium: SubscriptionPlan;
  lat?: number;
  lng?: number;
  lastActive: Date;
  distance?: number;
  safetyMode?: boolean;
}

export interface Match {
  id: string;
  userId: string;
  profile: Profile;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  read: boolean;
  flagged: boolean;
  createdAt: Date;
}

export interface SwipeAction {
  type: 'like' | 'pass' | 'super';
  targetId: string;
}

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Phone: undefined;
  OTP: { phone: string; countryCode: string };
  ProfileSetup: undefined;
  PhotoUpload: undefined;
};

export type AppTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Profile: undefined;
};

export type DiscoverStackParamList = {
  DiscoverMain: undefined;
  MatchCelebration: { matchId: string; profile: Profile };
  ViewProfile: { profile: Profile };
};

export type MatchesStackParamList = {
  ChatList: undefined;
  Chat: { match: Match };
};

export type ProfileStackParamList = {
  MyProfile: undefined;
  Settings: undefined;
  Subscription: undefined;
  Verification: undefined;
};
