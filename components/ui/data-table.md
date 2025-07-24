# DataTable Component

The DataTable component is a reusable table component with built-in support for skeleton loading, empty states, and pagination. It provides a consistent UI across the application and reduces code duplication.

## Features

- Consistent styling across all tables
- Built-in skeleton loading
- Customizable empty states with optional action buttons
- Integrated pagination
- Column-based configuration
- Custom cell renderers
- Error handling

## Usage Example

```jsx
import { DataTable } from '@/components/ui/data-table';
import { SkeletonRenderers } from '@/components/ui/data-table-renderers';
import { Plus } from 'lucide-react';

// Define columns configuration
const columns = [
  {
    key: 'name',
    header: t('product_name', 'Product Name'),
    cellRenderer: (product) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-gray-100 overflow-hidden">
          <img 
            src={product.thumbnail || '/images/logo.png'} 
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium text-[#18181B]">{product.name}</div>
          <div className="text-xs text-[#71717A]">{product.code}</div>
        </div>
      </div>
    ),
    skeletonRenderer: SkeletonRenderers.avatarSquare
  },
  {
    key: 'price',
    header: t('price', 'Price'),
    width: '150px',
    cellRenderer: (product) => formatCurrency(product.price)
  },
  // More columns...
];

// Use the DataTable component
<DataTable
  columns={columns}
  data={products}
  loading={loading}
  error={error}
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  emptyTitle={t('product_empty_title', 'No products yet')}
  emptySubtitle={t('product_empty_subtitle', 'Products will appear here when they are created.')}
  emptyButtonText={t('create_product', 'Create Product')}
  onEmptyAction={() => navigate('/products/create')}
  emptyButtonIcon={<Plus className="w-4 h-4" />}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `columns` | Array | Array of column definitions |
| `data` | Array | Array of data items to display |
| `loading` | boolean | Whether data is loading |
| `error` | string\|null | Error message if any |
| `currentPage` | number | Current page number for pagination |
| `totalPages` | number | Total number of pages for pagination |
| `onPageChange` | Function | Function to call when page changes |
| `skeletonRows` | number | Number of skeleton rows to show when loading (default: 5) |
| `emptyTitle` | string | Title to show when no data |
| `emptySubtitle` | string | Subtitle to show when no data |
| `emptyButtonText` | string | Text for action button when no data |
| `onEmptyAction` | Function | Function to call when empty state button is clicked |
| `emptyButtonIcon` | React.ReactNode | Icon for empty state button |
| `className` | string | Additional class names for the table container |

## Column Definition

Each column object can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `key` | string | Key of the data property to display |
| `header` | string | Column header text |
| `width` | string | Width of the column (e.g., '150px') |
| `align` | string | Text alignment ('left', 'center', 'right') |
| `cellRenderer` | Function | Custom renderer for the cell content |
| `skeletonRenderer` | Function | Custom renderer for skeleton loading |
| `skeletonWidth` | string | Width of the skeleton (e.g., 'w-[80px]') |

## Skeleton Renderers

The `SkeletonRenderers` object provides common skeleton renderers for different cell types:

```jsx
import { SkeletonRenderers } from '@/components/ui/data-table-renderers';

// Available renderers:
// - SkeletonRenderers.avatarWithName: Avatar with name and subtitle
// - SkeletonRenderers.avatarSquare: Square avatar with name and subtitle
// - SkeletonRenderers.badge: Badge skeleton
// - SkeletonRenderers.actions: Action buttons skeleton
``` 