import { Profile, Match, Message } from '../types';

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'p1', name: 'Amara', age: 24, gender: 'woman',
    city: 'Monrovia', countryCode: 'LR',
    bio: 'Marketing student at UL. Love Afrobeats, jollof rice debates, and long drives to Robertsport 🌊',
    interests: ['Music', 'Travel', 'Cooking', 'Dancing'],
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
    ],
    verified: 'phone', premium: 'gold',
    lastActive: '2m ago', distance: 3,
  },
  {
    id: 'p2', name: 'Koffi', age: 27, gender: 'man',
    city: 'Accra', countryCode: 'GH',
    bio: 'Software engineer building fintech for Africa. Gym bro, foodie, and terrible at FIFA 😅',
    interests: ['Tech', 'Fitness', 'Food', 'Gaming'],
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    ],
    verified: 'id', premium: 'platinum',
    lastActive: '1h ago', distance: 12,
  },
  {
    id: 'p3', name: 'Fatima', age: 22, gender: 'woman',
    city: 'Freetown', countryCode: 'SL',
    bio: 'Medical student 🩺. Fashion lover. Will judge your playlist. Ask me about Freetown beaches.',
    interests: ['Medicine', 'Fashion', 'Beach', 'Art'],
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80',
    ],
    verified: 'photo', premium: 'free',
    lastActive: '30m ago', distance: 8,
  },
  {
    id: 'p4', name: 'Emmanuel', age: 29, gender: 'man',
    city: 'Lagos', countryCode: 'NG',
    bio: 'Architect designing the future of Lagos. Runs 5K every morning. Sucker for good coffee ☕',
    interests: ['Architecture', 'Running', 'Coffee', 'Design'],
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    ],
    verified: 'id', premium: 'gold',
    lastActive: '15m ago', distance: 45,
  },
  {
    id: 'p5', name: 'Mariatu', age: 25, gender: 'woman',
    city: 'Conakry', countryCode: 'GN',
    bio: 'Journalist covering West African stories. Fluent in Fula, French & English. Tea > Coffee 🍵',
    interests: ['Journalism', 'Languages', 'Politics', 'Tea'],
    photos: [
      'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&q=80',
    ],
    verified: 'phone', premium: 'free',
    lastActive: '5m ago', distance: 2,
  },
  {
    id: 'p6', name: 'Daniel', age: 26, gender: 'man',
    city: 'Monrovia', countryCode: 'LR',
    bio: 'Pastor\'s kid turned DJ 🎧. Plays at Club Platinum every Saturday. Jesus & good vibes only.',
    interests: ['Music', 'DJing', 'Faith', 'Nightlife'],
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80',
    ],
    verified: 'phone', premium: 'free',
    lastActive: '2h ago', distance: 1,
  },
  {
    id: 'p7', name: 'Abena', age: 23, gender: 'woman',
    city: 'Kumasi', countryCode: 'GH',
    bio: 'Kente designer bringing Ghanaian fashion to the world 🌍. Dog mom. Gym 4x a week.',
    interests: ['Fashion', 'Design', 'Dogs', 'Fitness'],
    photos: [
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&q=80',
      'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=600&q=80',
    ],
    verified: 'id', premium: 'gold',
    lastActive: '45m ago', distance: 22,
  },
  {
    id: 'p8', name: 'Moses', age: 31, gender: 'man',
    city: 'Abidjan', countryCode: 'CI',
    bio: 'Football coach & entrepreneur. Scouts talent across West Africa. Loves a good attiéké 🍚',
    interests: ['Football', 'Business', 'Travel', 'Food'],
    photos: [
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=80',
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80',
    ],
    verified: 'phone', premium: 'platinum',
    lastActive: '3h ago', distance: 60,
  },
];

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1', userId: 'me', profile: MOCK_PROFILES[0],
    lastMessage: 'Hey! Ready for that Robertsport trip? 🌊',
    lastMessageAt: '2m ago', unreadCount: 1, createdAt: '2024-01-15',
  },
  {
    id: 'm2', userId: 'me', profile: MOCK_PROFILES[1],
    lastMessage: 'I finally beat someone at FIFA lol',
    lastMessageAt: '1h ago', unreadCount: 0, createdAt: '2024-01-14',
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  m1: [
    { id: 'msg1', matchId: 'm1', senderId: 'p1', content: 'Hi! I saw you like beaches too 🌊', read: true, flagged: false, createdAt: '10:00 AM' },
    { id: 'msg2', matchId: 'm1', senderId: 'me', content: 'Yes! Robertsport is my favorite spot', read: true, flagged: false, createdAt: '10:02 AM' },
    { id: 'msg3', matchId: 'm1', senderId: 'p1', content: 'Hey! Ready for that Robertsport trip? 🌊', read: false, flagged: false, createdAt: '10:05 AM' },
  ],
  m2: [
    { id: 'msg4', matchId: 'm2', senderId: 'me', content: 'You play FIFA? 😂', read: true, flagged: false, createdAt: 'Yesterday' },
    { id: 'msg5', matchId: 'm2', senderId: 'p2', content: 'I finally beat someone at FIFA lol', read: true, flagged: false, createdAt: 'Yesterday' },
  ],
};
