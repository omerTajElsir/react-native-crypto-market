import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { textPresets } from '@/app/theme/typography';

export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'bodyLarge' 
  | 'bodyMedium' 
  | 'bodySmall' 
  | 'labelLarge' 
  | 'labelMedium' 
  | 'labelSmall';

export type TextColor = 
  | 'primary' 
  | 'secondary' 
  | 'disabled' 
  | 'inverse' 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

/**
 * Text component that follows the design system
 */
export const Text = ({
  variant = 'bodyMedium',
  color = 'primary',
  align = 'left',
  transform = 'none',
  style,
  children,
  ...props
}: TextProps) => {
  // Get the typography preset based on variant
  const variantStyle = textPresets[variant] || textPresets.bodyMedium;
  
  // Determine the text color class
  const getColorClass = (): string => {
    switch (color) {
      case 'primary':
        return 'text-text-primary';
      case 'secondary':
        return 'text-text-secondary';
      case 'disabled':
        return 'text-text-disabled';
      case 'inverse':
        return 'text-background';
      case 'success':
        return 'text-status-positive';
      case 'error':
        return 'text-status-negative';
      case 'warning':
        return 'text-status-warning';
      case 'info':
        return 'text-status-info';
      default:
        return 'text-text-primary';
    }
  };
  
  // Determine the text alignment class
  const getAlignClass = (): string => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
        return 'text-center';
      case 'justify':
        return 'text-justify';
      default:
        return 'text-left';
    }
  };
  
  // Determine the text transform class
  const getTransformClass = (): string => {
    switch (transform) {
      case 'capitalize':
        return 'capitalize';
      case 'uppercase':
        return 'uppercase';
      case 'lowercase':
        return 'lowercase';
      default:
        return 'normal-case';
    }
  };
  
  // Combine all classes
  const textClasses = `${getColorClass()} ${getAlignClass()} ${getTransformClass()}`;
  
  return (
    <RNText
      className={textClasses}
      style={[variantStyle, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;