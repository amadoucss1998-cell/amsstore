# SparkMatch 💘

> A modern, feature-rich dating app built with React Native & Expo

![SparkMatch Banner](https://via.placeholder.com/1200x400/FF4B6E/FFFFFF?text=SparkMatch+%F0%9F%92%98)

## Overview

SparkMatch is a full-featured dating app inspired by Tinder and Hinge, built with a stunning dark-mode UI featuring smooth animations, gesture-based interactions, and a beautiful pink-to-purple gradient design language.

## Features

- **Swipe Cards** — Full-screen animated profile cards with swipe left/right/up gestures
- **Like / Nope / Super Like** — Visual overlays and satisfying animations
- **It's a Match!** — Confetti celebration screen when two users like each other
- **Chat** — Clean real-time-style messaging UI
- **Discover** — Grid-browse profiles beyond your swipe queue
- **Onboarding** — Beautiful multi-step profile setup flow
- **Settings** — Preferences, distance, age range controls

## Tech Stack

| Tool | Purpose |
|------|---------|
| React Native + Expo | Cross-platform mobile framework |
| TypeScript | Type safety |
| React Navigation v6 | Navigation (stack + tabs) |
| Zustand | Lightweight state management |
| React Native Reanimated | Smooth animations |
| React Native Gesture Handler | Swipe gestures |
| Expo Linear Gradient | Gradient backgrounds |
| Expo Blur | Glassmorphism effects |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

## Project Structure

```
sparkmatch/
├── App.tsx                    # Root component
├── src/
│   ├── navigation/            # Navigation setup
│   │   ├── index.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── auth/              # Welcome, Login, SignUp, Onboarding
│   │   ├── home/              # Swipe + Match screens
│   │   ├── messages/          # Chat list + Chat
│   │   ├── profile/           # Own profile + View others
│   │   ├── discover/          # Grid discover
│   │   └── settings/          # App settings
│   ├── components/            # Reusable UI components
│   ├── store/                 # Zustand state stores
│   ├── data/                  # Mock data
│   ├── types/                 # TypeScript types
│   ├── theme/                 # Colors, typography, spacing
│   └── utils/                 # Helper functions
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#FF4B6E` | Buttons, active states |
| Secondary | `#7B2FBE` | Gradients, accents |
| Background | `#0F0F1A` | App background |
| Card | `#1A1A2E` | Card surfaces |
| Gold | `#FFD700` | Super like |
| Text Primary | `#FFFFFF` | Headings |
| Text Secondary | `#B0B0C3` | Body, captions |

## Screenshots

> Run the app locally to see the full experience!

## License

MIT © SparkMatch
