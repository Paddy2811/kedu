# PrefilledInput Component

A reusable input component for displaying prefilled text that is disabled and non-editable.

## Usage

Use this component when you need to display values that are:
- Pre-determined by the system or business rules
- Auto-generated (like codes, IDs)
- Should not be modified by the user
- Need to be displayed with proper styling

## Example

```jsx
import { PrefilledInput } from "@/components/ui/prefilled-input";

// Basic usage
<PrefilledInput value="AUTO_GENERATED_CODE" />

// With custom styling
<PrefilledInput 
  value="System Generated"
  className="custom-class"
/>
```

## Props

- `value` (string): The prefilled text to display
- `className` (string): Additional CSS classes
- `...props`: Any other props are passed to the underlying Input component

## Styling

The component uses consistent styling:
- Background: `bg-[#F3F3F3]` (light gray)
- Text color: `text-[#0a0a0a]` (normal dark text, not disabled-looking)
- Cursor: `cursor-not-allowed`
- State: Always disabled

## When to Use

✅ **Use PrefilledInput for:**
- Auto-generated codes (PT00001, CC001, etc.)
- System-determined values (current user, timestamp)
- Read-only calculated values
- Non-editable reference data

❌ **Don't use PrefilledInput for:**
- User-editable fields
- Optional fields
- Fields that might be empty
- Loading states (use Skeleton instead)

## Examples in Codebase

- Order payment dialog: Receipt code, date, time, creator
- Facility management: Facility code
- Course management: Course code (edit mode)
- Class creation: Class name and code 