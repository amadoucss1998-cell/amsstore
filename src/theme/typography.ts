import { StyleSheet } from 'react-native';

export const FontFamily = {
  regular: undefined,
  medium: undefined,
  bold: undefined,
};

export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
};

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
};

export const Typography = StyleSheet.create({
  h1: { fontSize: FontSize['4xl'], fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  h2: { fontSize: FontSize['3xl'], fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3 },
  h3: { fontSize: FontSize['2xl'], fontWeight: '700', color: '#FFFFFF' },
  h4: { fontSize: FontSize.xl, fontWeight: '600', color: '#FFFFFF' },
  h5: { fontSize: FontSize.lg, fontWeight: '600', color: '#FFFFFF' },
  body: { fontSize: FontSize.base, fontWeight: '400', color: '#B0B0C3', lineHeight: FontSize.base * 1.5 },
  bodyMd: { fontSize: FontSize.md, fontWeight: '400', color: '#B0B0C3', lineHeight: FontSize.md * 1.5 },
  caption: { fontSize: FontSize.sm, fontWeight: '400', color: '#6B6B8A' },
  label: { fontSize: FontSize.base, fontWeight: '600', color: '#FFFFFF', letterSpacing: 0.5 },
  button: { fontSize: FontSize.md, fontWeight: '700', letterSpacing: 0.5 },
  buttonSm: { fontSize: FontSize.base, fontWeight: '600', letterSpacing: 0.3 },
});
