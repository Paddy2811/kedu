import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { SkeletonRenderers } from "@/components/ui/data-table-renderers";

/**
 * DataTable component - A reusable table component with support for skeleton loading, empty states, and pagination
 * 
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions with { key, header, width, align, cellRenderer }
 * @param {Array} props.data - Array of data items to display
 * @param {boolean} props.loading - Whether data is loading
 * @param {string|null} props.error - Error message if any
 * @param {number} props.currentPage - Current page number for pagination
 * @param {number} props.totalPages - Total number of pages for pagination
 * @param {Function} props.onPageChange - Function to call when page changes
 * @param {number} props.skeletonRows - Number of skeleton rows to show when loading (default: 5)
 * @param {string} props.emptyTitle - Title to show when no data
 * @param {string} props.emptySubtitle - Subtitle to show when no data
 * @param {string} props.emptyButtonText - Text for action button when no data
 * @param {Function} props.onEmptyAction - Function to call when empty state button is clicked
 * @param {React.ReactNode} props.emptyButtonIcon - Icon for empty state button
 * @param {string} props.className - Additional class names for the table container
 */
export function DataTable({
  columns = [],
  data = [],
  loading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  skeletonRows = 5,
  emptyTitle,
  emptySubtitle,
  emptyButtonText,
  onEmptyAction,
  emptyButtonIcon,
  className = "",
}) {
  const { t } = useTranslation();
  
  // Default empty state texts
  const defaultEmptyTitle = t('no_data_title', 'Không có dữ liệu');
  const defaultEmptySubtitle = t('no_data_subtitle', 'Không có dữ liệu nào được tìm thấy.');
  
  // Generate skeleton rows - memoized to prevent unnecessary re-renders
  const skeletonRowsContent = useMemo(() => {
    return Array(skeletonRows).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`} className="hover:bg-[#F8FAFC] border-b border-[#E2E8F0] last:border-0">
        {columns.map((column, colIndex) => (
          <TableCell 
            key={`skeleton-cell-${colIndex}`} 
            className={`px-4 py-4 ${column.align ? `text-${column.align}` : ''}`}
            style={{ width: column.width || 'auto' }}
          >
            {column.skeletonRenderer ? (
              column.skeletonRenderer()
            ) : (
              <Skeleton className={`h-5 ${column.skeletonWidth || 'w-[80px]'}`} />
            )}
          </TableCell>
        ))}
      </TableRow>
    ));
  }, [columns, skeletonRows]);

  // Memoize rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => {
    if (loading) {
      return skeletonRowsContent;
    }
    
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="py-10">
            <EmptyState
              title={error ? t('error_title', 'Đã xảy ra lỗi') : (emptyTitle || defaultEmptyTitle)}
              subtitle={error || emptySubtitle || defaultEmptySubtitle}
              buttonText={!error && emptyButtonText}
              onButtonClick={!error && onEmptyAction}
              buttonIcon={!error && emptyButtonIcon}
              noBorder
            />
          </TableCell>
        </TableRow>
      );
    }
    
    // Create cell renderer functions once
    const safeRenderCell = (column, item) => {
      try {
        return column.cellRenderer ? column.cellRenderer(item) : item[column.key];
      } catch (err) {
        console.error('Error rendering cell:', err);
        return `Error: ${err.message || 'Unknown error'}`;
      }
    };
    
    return data.map((item, rowIndex) => (
      <TableRow key={item.id || `row-${rowIndex}`} className="hover:bg-[#F8FAFC] border-b border-[#E2E8F0] last:border-0">
        {columns.map((column, colIndex) => (
          <TableCell 
            key={`${rowIndex}-${column.key || colIndex}`} 
            className={`px-4 py-4 ${column.align ? `text-${column.align}` : ''}`}
            style={{ width: column.width || 'auto' }}
          >
            {safeRenderCell(column, item)}
          </TableCell>
        ))}
      </TableRow>
    ));
  }, [columns, data, error, loading, skeletonRowsContent, emptyButtonIcon, emptyButtonText, emptySubtitle, emptyTitle, onEmptyAction, t, defaultEmptyTitle, defaultEmptySubtitle]);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full border border-[#E2E8F0] rounded-xl bg-white overflow-hidden min-w-full">
        <Table className="flex-1">
          <TableHeader className="bg-[#F8F8F8] border-b border-[#E2E8F0]">
            <TableRow className="hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead 
                  key={column.key || index} 
                  className={`font-medium text-[13px] text-[#64748B] px-4 py-3 ${column.align ? `text-${column.align}` : ''}`}
                  style={{ width: column.width || 'auto' }}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {!loading && data.length > 0 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-4 flex justify-end"
        />
      )}
    </div>
  );
}

// Export the SkeletonRenderers for convenience
export { SkeletonRenderers }; 