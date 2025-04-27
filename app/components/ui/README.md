# UI Components

This directory contains reusable UI components that follow the design system for the React Native Crypto Market app. These components provide a consistent look and feel across the application.

## Available Components

### Button

A customizable button component with different variants, sizes, and states.

```jsx
import { Button } from '@/app/components/ui';

// Basic usage
<Button 
  label="Click me" 
  onPress={() => {}} 
/>

// With variants
<Button 
  variant="primary" // 'primary', 'secondary', 'outline', 'ghost'
  label="Primary Button" 
  onPress={() => {}} 
/>

// With sizes
<Button 
  size="lg" // 'sm', 'md', 'lg'
  label="Large Button" 
  onPress={() => {}} 
/>

// With icons
<Button 
  label="Button with Icon" 
  leftIcon={<Icon name="star" />} 
  onPress={() => {}} 
/>

// Loading state
<Button 
  label="Loading Button" 
  isLoading={true} 
  onPress={() => {}} 
/>

// Disabled state
<Button 
  label="Disabled Button" 
  isDisabled={true} 
  onPress={() => {}} 
/>

// Full width
<Button 
  label="Full Width Button" 
  fullWidth={true} 
  onPress={() => {}} 
/>
```

### Text

A text component that follows the typography system.

```jsx
import { Text } from '@/app/components/ui';

// Basic usage
<Text>Hello World</Text>

// With variants
<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
<Text variant="h5">Heading 5</Text>
<Text variant="bodyLarge">Body Large</Text>
<Text variant="bodyMedium">Body Medium</Text>
<Text variant="bodySmall">Body Small</Text>
<Text variant="labelLarge">Label Large</Text>
<Text variant="labelMedium">Label Medium</Text>
<Text variant="labelSmall">Label Small</Text>

// With colors
<Text color="primary">Primary Text</Text>
<Text color="secondary">Secondary Text</Text>
<Text color="disabled">Disabled Text</Text>
<Text color="inverse">Inverse Text</Text>
<Text color="success">Success Text</Text>
<Text color="error">Error Text</Text>
<Text color="warning">Warning Text</Text>
<Text color="info">Info Text</Text>

// With alignment
<Text align="center">Centered Text</Text>
<Text align="right">Right-aligned Text</Text>
<Text align="justify">Justified Text</Text>

// With text transformation
<Text transform="uppercase">UPPERCASE TEXT</Text>
<Text transform="lowercase">lowercase text</Text>
<Text transform="capitalize">Capitalized Text</Text>

// Combined props
<Text 
  variant="h2" 
  color="primary" 
  align="center" 
  transform="uppercase"
>
  STYLED HEADING
</Text>
```

### Card

A card component for containing content.

```jsx
import { Card, Text } from '@/app/components/ui';

// Basic usage
<Card>
  <Text>Card content</Text>
</Card>

// With variants
<Card variant="default">
  <Text>Default Card</Text>
</Card>

<Card variant="elevated">
  <Text>Elevated Card</Text>
</Card>

<Card variant="outlined">
  <Text>Outlined Card</Text>
</Card>

// Without padding
<Card padding={false}>
  <Text>Card without padding</Text>
</Card>

// With custom styles
<Card className="my-4">
  <Text>Card with custom margin</Text>
</Card>
```

## Best Practices

1. **Use the provided components**: Prefer using these UI components over creating custom ones to maintain consistency.
2. **Follow the design system**: Use the variants, colors, and sizes defined in the design system.
3. **Combine with NativeWind**: You can use NativeWind classes alongside these components for additional styling.
4. **Extend responsibly**: If you need to extend these components, maintain the design system principles.

## Adding New Components

When adding new UI components:

1. Create the component file in this directory
2. Follow the existing pattern for props and styling
3. Use the theme system for colors, typography, and spacing
4. Export the component in the `index.ts` file
5. Document the component in this README