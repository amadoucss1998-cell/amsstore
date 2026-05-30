import { User, Message } from '../types';

export const formatDistance = (miles: number): string => {
  if (miles < 1) return 'Less than a mile away';
  if (miles === 1) return '1 mile away';
  return `${miles} miles away`;
};

export const formatAge = (age: number): string => `${age}`;

export const getAgeFromBirthdate = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};

export const formatMessageTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

export const formatChatTime = (date: Date): string => {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
  if (isYesterday) return 'Yesterday';
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const isNewMatch = (createdAt: Date): boolean => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  return diff < 86400000 * 2; // within 2 days
};

export const getLastMessagePreview = (message?: Message): string => {
  if (!message) return 'Say hello! 👋';
  if (message.text.length > 40) return `${message.text.slice(0, 40)}...`;
  return message.text;
};

export const INTERESTS = [
  'Travel', 'Music', 'Hiking', 'Photography', 'Cooking', 'Reading',
  'Yoga', 'Gaming', 'Art', 'Movies', 'Fitness', 'Dancing',
  'Coffee', 'Wine', 'Dogs', 'Cats', 'Surfing', 'Climbing',
  'Cycling', 'Running', 'Foodie', 'Concerts', 'Theater', 'Meditation',
  'Tech', 'Fashion', 'Sports', 'Writing', 'Volunteering', 'Languages',
];
