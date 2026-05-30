export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  interests: string[];
  distance: number;
  location: string;
  occupation: string;
  education?: string;
  height?: string;
  gender: 'male' | 'female' | 'non-binary' | 'other';
  lookingFor: 'relationship' | 'casual' | 'friendship' | 'unsure';
  verified: boolean;
  lastActive: Date;
  instagram?: string;
  prompts?: Prompt[];
}

export interface Prompt {
  question: string;
  answer: string;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  user: User;
  createdAt: Date;
  lastMessage?: Message;
  unreadCount: number;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
  read: boolean;
  type: 'text' | 'gif' | 'emoji';
}

export interface Conversation {
  matchId: string;
  user: User;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface SwipeAction {
  userId: string;
  action: 'like' | 'dislike' | 'superlike';
  timestamp: Date;
}

export interface UserPreferences {
  minAge: number;
  maxAge: number;
  maxDistance: number;
  genderPreference: string[];
  lookingFor: string[];
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  photos: string[];
  bio: string;
  age: number;
  interests: string[];
  occupation: string;
  location: string;
  preferences: UserPreferences;
  onboardingComplete: boolean;
}

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
};

export type AppTabParamList = {
  Swipe: undefined;
  Discover: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type MessagesStackParamList = {
  ChatList: undefined;
  Chat: { matchId: string; user: User };
};

export type ProfileStackParamList = {
  MyProfile: undefined;
  ViewProfile: { user: User };
  Settings: undefined;
};

export type SwipeStackParamList = {
  SwipeMain: undefined;
  Match: { matchedUser: User };
  ViewProfile: { user: User };
};
