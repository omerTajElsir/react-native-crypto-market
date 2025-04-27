import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  padding?: boolean;
}

/**
 * Card component that follows the design system
 */
export const Card = ({
  variant = 'default',
  padding = true,
  style,
  children,
  ...props
}: CardProps) => {
  // Determine the card's base className based on variant
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'default':
        return 'bg-background-card rounded-lg overflow-hidden';
      case 'elevated':
        return 'bg-background-elevated rounded-lg overflow-hidden shadow-md';
      case 'outlined':
        return 'bg-transparent border border-border rounded-lg overflow-hidden';
      default:
        return 'bg-background-card rounded-lg overflow-hidden';
    }
  };

  // Determine padding class
  const getPaddingClass = (): string => {
    return padding ? 'p-4' : '';
  };

  // Combine all classes
  const cardClasses = `${getVariantClasses()} ${getPaddingClass()}`;

  return (
    <View
      className={cardClasses}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;