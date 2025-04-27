/**
 * Theme colors for the application
 * This file defines all the colors used throughout the app
 */

export const colors = {
  // Primary colors
  primary: {
    DEFAULT: '#CDFF00', // Main primary color
    light: '#DEFF4D',   // Lighter shade for hover states
    dark: '#A3CC00',    // Darker shade for pressed states
  },
  
  // Background colors
  background: {
    DEFAULT: '#0E0E0E', // Main background color
    card: '#2B2B2B4D',  // Card background color
    elevated: '#1A1A1A', // Elevated background color
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',   // Primary text color
    secondary: '#FFFFFF80', // Secondary text color (with opacity)
    disabled: '#FFFFFF40',  // Disabled text color (with opacity)
  },
  
  // Status colors
  status: {
    positive: '#00C853', // Positive/success color
    negative: '#FF3440', // Negative/error color
    warning: '#FFB300',  // Warning color
    info: '#2196F3',     // Info color
  },
  
  // Border colors
  border: {
    DEFAULT: '#FFFFFF20', // Default border color
    light: '#FFFFFF10',   // Light border color
    focus: '#CDFF00',     // Focus border color
  },
  
  // Overlay colors
  overlay: {
    DEFAULT: 'rgba(0, 0, 0, 0.5)', // Default overlay color
    light: 'rgba(0, 0, 0, 0.3)',    // Light overlay color
    dark: 'rgba(0, 0, 0, 0.7)',     // Dark overlay color
  },
};

// Export individual color groups for convenience
export const primaryColors = colors.primary;
export const backgroundColors = colors.background;
export const textColors = colors.text;
export const statusColors = colors.status;
export const borderColors = colors.border;
export const overlayColors = colors.overlay;

export default colors;