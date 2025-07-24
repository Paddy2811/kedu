# Branding Color System

This document outlines the branding color system used throughout the application.

## Color Palette

The primary branding color is `#E67364`, a coral-red shade. This color has been implemented as a CSS variable and Tailwind class for consistent usage across the application.

### Available Color Variables

| CSS Variable | Tailwind Class | Hex Value | Usage |
|-------------|---------------|-----------|-------|
| `--brand` | `text-brand`, `bg-brand`, etc. | `#E67364` | Primary brand color |
| `--brand-hover` | `text-brand-hover`, `bg-brand-hover` | `#d45c4d` | Hover state for primary brand color |
| `--brand-light` | `bg-brand-light`, etc. | `#FEE4E2` | Light variant for backgrounds, badges |
| `--brand-lighter` | `bg-brand-lighter`, etc. | `#FDF5F4` | Very light variant for subtle backgrounds |

## Implementation

The branding colors are implemented in three ways:

1. **CSS Variables**: Defined in `src/index.css` as HSL values
2. **Tailwind Classes**: Configured in `tailwind.config.js` to map to the CSS variables
3. **JavaScript Constants**: Available in `src/utils/colors.js` for programmatic usage

## Usage Guidelines

### In Components

Always use the Tailwind classes for consistency:

```jsx
// Good
<Button className="bg-brand hover:bg-brand-hover">Submit</Button>

// Avoid
<Button className="bg-[#E67364] hover:bg-[#d45c4d]">Submit</Button>
```

### In JavaScript

For programmatic usage, import the color constants:

```jsx
import { BRAND_PRIMARY, BRAND_PRIMARY_HOVER } from '@/utils/colors';

// Use in dynamic styles or calculations
const dynamicStyle = {
  backgroundColor: someCondition ? BRAND_PRIMARY : 'transparent'
};
```

## Updating the Brand Color

To change the brand color site-wide:

1. Update the HSL values in `src/index.css`
2. Update the hex values in `src/utils/colors.js`

The Tailwind classes will automatically use the updated CSS variables.

## Maintenance

A script is available to help convert any hardcoded color values to the new variable system:

```bash
node update-branding-color.js
```

This script will scan the codebase and replace hardcoded color values with the appropriate Tailwind classes. 