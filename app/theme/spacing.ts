/**
 * Spacing constants for the application
 * This file defines spacing values for margins, paddings, and gaps
 */

export const spacing = {
  // Base spacing units
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 56,
  '5xl': 64,
  '6xl': 72,
  '7xl': 80,
  '8xl': 96,
  
  // Specific spacing for different contexts
  screen: {
    horizontal: 16, // Horizontal padding for screens
    vertical: 16,   // Vertical padding for screens
  },
  
  card: {
    padding: 16,    // Internal padding for cards
    gap: 8,         // Gap between elements in a card
    marginBottom: 16, // Margin between cards
  },
  
  section: {
    marginBottom: 24, // Margin between sections
    gap: 16,         // Gap between elements in a section
  },
  
  form: {
    gap: 16,         // Gap between form elements
    labelGap: 4,     // Gap between label and input
  },
  
  button: {
    paddingHorizontal: 16, // Horizontal padding for buttons
    paddingVertical: 12,   // Vertical padding for buttons
    gap: 8,               // Gap between icon and text in a button
  },
};

// Shorthand for common spacing values
export const insets = {
  screen: {
    padding: {
      horizontal: spacing.screen.horizontal,
      vertical: spacing.screen.vertical,
    },
  },
  card: {
    padding: spacing.card.padding,
    margin: {
      bottom: spacing.card.marginBottom,
    },
  },
};

// Layout constants
export const layout = {
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  
  // Common component sizes
  buttonHeight: {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  },
  
  iconSize: {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  },
  
  // Z-index values
  zIndex: {
    base: 0,
    above: 1,
    dropdown: 10,
    sticky: 100,
    fixed: 200,
    modal: 300,
    popover: 400,
    toast: 500,
  },
};

export default {
  spacing,
  insets,
  layout,
};