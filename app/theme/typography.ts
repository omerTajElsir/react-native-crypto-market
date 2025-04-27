/**
 * Typography styles for the application
 * This file defines font families, sizes, weights, and line heights
 */

export const fontFamilies = {
  lufga: {
    regular: 'LufgaRegular',
    medium: 'LufgaMedium',
    bold: 'LufgaBold',
    semiBold: 'LufgaSemiBold',
    light: 'LufgaLight',
    extraLight: 'LufgaExtraLight',
    extraBold: 'LufgaExtraBold',
    black: 'LufgaBlack',
    thin: 'LufgaThin',
  },
  spaceMono: {
    regular: 'SpaceMono-Regular',
  },
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const fontWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
};

// Typography presets for common text styles
export const textPresets = {
  // Headings
  h1: {
    fontFamily: fontFamilies.lufga.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights.tight,
  },
  h2: {
    fontFamily: fontFamilies.lufga.bold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.tight,
  },
  h3: {
    fontFamily: fontFamilies.lufga.bold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.tight,
  },
  h4: {
    fontFamily: fontFamilies.lufga.bold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.tight,
  },
  h5: {
    fontFamily: fontFamilies.lufga.bold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.tight,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: fontFamilies.lufga.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.normal,
  },
  bodyMedium: {
    fontFamily: fontFamilies.lufga.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.lufga.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
  },
  
  // Labels
  labelLarge: {
    fontFamily: fontFamilies.lufga.medium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.normal,
  },
  labelMedium: {
    fontFamily: fontFamilies.lufga.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
  },
  labelSmall: {
    fontFamily: fontFamilies.lufga.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
  },
  
  // Button text
  buttonLarge: {
    fontFamily: fontFamilies.lufga.medium,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.none,
  },
  buttonMedium: {
    fontFamily: fontFamilies.lufga.medium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.none,
  },
  buttonSmall: {
    fontFamily: fontFamilies.lufga.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.none,
  },
};

export default {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textPresets,
};