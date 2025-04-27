# Theme System

This directory contains the theme system for the React Native Crypto Market app. The theme system provides a centralized way to manage colors, typography, spacing, and other design tokens.

## Overview

The theme system is organized into several modules:

- **colors.ts**: Defines the color palette for the application
- **typography.ts**: Defines typography styles, including font families, sizes, weights, and presets
- **spacing.ts**: Defines spacing values for margins, paddings, and layout
- **index.ts**: Exports all theme components for easy importing

## Usage

### Importing Theme Values

You can import the entire theme or specific parts:

```typescript
// Import the entire theme
import theme from '@/app/theme';

// Import specific parts
import { colors, typography, spacing } from '@/app/theme';

// Import specific values
import { primaryColors, textPresets } from '@/app/theme';
```

### Using with NativeWind

The theme values are configured in `tailwind.config.js`, so you can use them directly in your NativeWind classes:

```jsx
// Using theme colors
<View className="bg-primary text-text-primary" />

// Using theme spacing
<View className="p-md m-lg" />

// Using theme typography (via font family)
<Text className="font-lufga-medium text-lg" />
```

### Using with UI Components

The theme system includes a set of reusable UI components that use the theme values:

```jsx
import { Button, Text, Card } from '@/app/components/ui';

// Using the Button component
<Button 
  variant="primary" 
  size="md" 
  label="Click me" 
  onPress={() => {}} 
/>

// Using the Text component
<Text 
  variant="h1" 
  color="primary" 
  align="center"
>
  Hello World
</Text>

// Using the Card component
<Card variant="elevated" padding={true}>
  <Text>Card content</Text>
</Card>
```

## Color System

The color system is organized into functional groups:

- **primary**: Main brand colors
- **background**: Background colors for different surfaces
- **text**: Text colors with different emphasis levels
- **status**: Colors for status indicators (success, error, etc.)
- **border**: Border colors
- **overlay**: Overlay colors for modals, dialogs, etc.

Example usage:

```jsx
// Using primary colors
<View className="bg-primary" /> // Default primary color
<View className="bg-primary-light" /> // Lighter shade
<View className="bg-primary-dark" /> // Darker shade

// Using text colors
<Text className="text-text-primary" /> // Primary text
<Text className="text-text-secondary" /> // Secondary text
<Text className="text-text-disabled" /> // Disabled text
```

## Typography System

The typography system provides consistent text styles:

- Font families (Lufga with various weights)
- Font sizes (xs, sm, base, lg, xl, etc.)
- Line heights
- Letter spacing
- Text presets for common use cases (headings, body text, labels, etc.)

Example usage with the Text component:

```jsx
// Using text presets
<Text variant="h1">Heading 1</Text>
<Text variant="bodyLarge">Body text</Text>
<Text variant="labelSmall">Label</Text>

// Customizing text
<Text 
  variant="h2" 
  color="secondary" 
  align="center" 
  transform="uppercase"
>
  Custom Heading
</Text>
```

## Spacing System

The spacing system provides consistent spacing values:

- Base spacing units (xs, sm, md, lg, xl, etc.)
- Context-specific spacing (screen, card, section, form, button)
- Layout constants (border radius, button heights, icon sizes, z-index)

Example usage:

```jsx
// Using spacing values
<View className="p-md m-lg" />
<View className="gap-sm" />

// Using border radius
<View className="rounded-lg" />
```

## Best Practices

1. **Use the UI components**: Prefer using the provided UI components (Button, Text, Card) over creating custom ones.
2. **Use NativeWind classes**: Use NativeWind classes with theme values for styling.
3. **Avoid hardcoded values**: Don't use hardcoded color or spacing values; use the theme values instead.
4. **Maintain consistency**: Follow the established patterns for a consistent look and feel.