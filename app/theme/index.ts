/**
 * Theme system for the application
 * This file exports all theme-related constants and functions
 */

import colors from './colors';
import typography from './typography';
import spacing from './spacing';

// Export all theme components
export { colors, typography, spacing };

// Export individual theme components for convenience
export * from './colors';
export * from './typography';
export * from './spacing';

// Main theme object that combines all theme components
const theme = {
  colors,
  typography,
  spacing,
};

export default theme;