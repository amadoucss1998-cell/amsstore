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
  lastActive: string;
  distance?: number;
  safetyMode?: boolean;
}

export interface Match {
  id: string;
  userId: string;
  profile: Profile;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  read: boolean;
  flagged: boolean;
  createdAt: string;
}

export interface SwipeAction {
  type: 'like' | 'pass' | 'super';
  targetId: string;
}
