# SparkMatch 💘

A modern, feature-rich dating app built with React Native + Expo. Think Tinder meets Hinge with a bold, beautiful twist.

## Screenshots

> SparkMatch features a stunning dark UI with vibrant pink-to-purple gradients, smooth swipe animations, real-time chat, and an engaging onboarding experience.

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native + Expo | Cross-platform mobile framework |
| TypeScript | Type safety |
| React Navigation v6 | Routing (stack + bottom tabs) |
| Zustand | Lightweight global state |
| React Native Reanimated | Fluid animations |
| React Native Gesture Handler | Swipe gestures |
| Expo Linear Gradient | Beautiful gradients |
| Expo Blur | Glassmorphism effects |

## Features

- **Swipe Cards** — Full-screen animated profile cards with Like / Nope / Super Like gestures
- **Match Celebration** — Confetti overlay when two users match
- **Chat** — Clean messaging UI with timestamps and read receipts
- **Discover** — Grid browse view of nearby profiles
- **Onboarding** — Multi-step profile setup (photos, bio, interests, preferences)
- **Settings** — Preference controls for distance, age range, and account management

## Color Palette

```
Primary   #FF4B6E  Hot pink/coral
Secondary #7B2FBE  Purple
Gradient  #FF4B6E → #7B2FBE
Bg        #0F0F1A  Near black
Card      #1A1A2E
Text      #FFFFFF / #B0B0C3
Accent    #FFD700  Gold (super like)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

## Project Structure

```
SparkMatch/
├── App.tsx                          # Root entry
├── src/
│   ├── navigation/
│   │   ├── index.tsx                # Root navigator
│   │   ├── AuthNavigator.tsx
│   │   └── AppNavigator.tsx         # Bottom tabs
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignUpScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── home/
│   │   │   ├── SwipeScreen.tsx
│   │   │   └── MatchScreen.tsx
│   │   ├── messages/
│   │   │   ├── ChatListScreen.tsx
│   │   │   └── ChatScreen.tsx
│   │   ├── profile/
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── ViewProfileScreen.tsx
│   │   ├── discover/
│   │   │   └── DiscoverScreen.tsx
│   │   └── settings/
│   │       └── SettingsScreen.tsx
│   ├── components/
│   │   ├── SwipeCard.tsx
│   │   ├── ActionButtons.tsx
│   │   ├── ProfilePhoto.tsx
│   │   ├── Badge.tsx
│   │   ├── MatchAnimation.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── GradientButton.tsx
│   │   ├── BackButton.tsx
│   │   └── Avatar.tsx
│   ├── store/
│   │   ├── useAuthStore.ts
│   │   ├── useSwipeStore.ts
│   │   └── useChatStore.ts
│   ├── data/
│   │   ├── mockProfiles.ts
│   │   └── mockMessages.ts
│   ├── types/
│   │   └── index.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   └── utils/
│       └── helpers.ts
```

## License

MIT © SparkMatch
