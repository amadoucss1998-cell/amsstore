export const Colors = {
  primary: '#FF4B6E',
  secondary: '#7B2FBE',
  accent: '#FFD700',
  accentBlue: '#4FC3F7',

  // Gradient
  gradientStart: '#FF4B6E',
  gradientEnd: '#7B2FBE',
  gradientMid: '#C0392B',

  // Backgrounds
  background: '#0F0F1A',
  cardBackground: '#1A1A2E',
  surfaceBackground: '#16213E',
  modalBackground: '#12121F',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0C3',
  textMuted: '#6B6B8A',
  textDisabled: '#3D3D5C',

  // Borders
  border: '#2A2A45',
  borderLight: '#3D3D60',

  // Semantic
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',

  // Action colors
  like: '#FF4B6E',
  dislike: '#4A90D9',
  superlike: '#FFD700',

  // Overlays
  overlayDark: 'rgba(0,0,0,0.6)',
  overlayLight: 'rgba(255,255,255,0.1)',
  overlayPrimary: 'rgba(255,75,110,0.15)',

  // White/Black
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Tab bar
  tabBarBackground: '#12121F',
  tabBarBorder: '#1E1E35',
  tabBarActive: '#FF4B6E',
  tabBarInactive: '#4A4A6A',
};

export type ColorKey = keyof typeof Colors;
