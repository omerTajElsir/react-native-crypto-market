import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  View,
  TouchableOpacityProps,
  StyleSheet
} from 'react-native';
import { textPresets } from '@/app/theme/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Button component that follows the design system
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  label,
  leftIcon,
  rightIcon,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  style,
  ...props
}: ButtonProps) => {
  // Determine the button's base className based on variant
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-primary justify-center items-center rounded-full';
      case 'secondary':
        return 'bg-background-elevated justify-center items-center rounded-full';
      case 'outline':
        return 'bg-transparent border border-border justify-center items-center rounded-full';
      case 'ghost':
        return 'bg-transparent justify-center items-center rounded-full';
      default:
        return 'bg-primary justify-center items-center rounded-full';
    }
  };

  // Determine the button's size className
  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4';
      case 'md':
        return 'py-3 px-6';
      case 'lg':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  // Determine the text color based on variant
  const getTextColorClass = (): string => {
    switch (variant) {
      case 'primary':
        return 'text-background';
      case 'secondary':
      case 'outline':
      case 'ghost':
        return 'text-text-primary';
      default:
        return 'text-background';
    }
  };

  // Determine the text style based on size
  const getTextStyle = () => {
    switch (size) {
      case 'sm':
        return textPresets.buttonSmall;
      case 'md':
        return textPresets.buttonMedium;
      case 'lg':
        return textPresets.buttonLarge;
      default:
        return textPresets.buttonMedium;
    }
  };

  // Combine all classes
  const buttonClasses = `${getVariantClasses()} ${getSizeClasses()} ${
    isDisabled ? 'opacity-50' : ''
  } ${fullWidth ? 'w-full' : ''}`;

  return (
    <TouchableOpacity
      className={buttonClasses}
      disabled={isDisabled || isLoading}
      style={[fullWidth && styles.fullWidth, style]}
      {...props}
    >
      <View className="flex-row items-center justify-center">
        {isLoading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? '#0E0E0E' : '#FFFFFF'} 
            className="mr-2"
          />
        ) : leftIcon ? (
          <View className="mr-2">{leftIcon}</View>
        ) : null}

        {label && (
          <Text 
            className={getTextColorClass()}
            style={getTextStyle()}
          >
            {label}
          </Text>
        )}

        {rightIcon && !isLoading && (
          <View className="ml-2">{rightIcon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});

export default Button;