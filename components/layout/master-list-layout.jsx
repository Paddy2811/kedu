import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { PageContainer } from "@/components/page-container";
import MainLayout from "@/components/layout/main-layout";
import { useTranslation } from "react-i18next";

/**
 * MasterListLayout - A reusable layout for list pages
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.searchPlaceholder - Placeholder text for search input
 * @param {string} props.searchValue - Current search value
 * @param {Function} props.onSearchChange - Function to handle search changes
 * @param {React.ReactNode} props.searchWithFilter - Custom search component with filter
 * @param {Array} props.columns - Table columns configuration
 * @param {Array} props.data - Data to display in the table
 * @param {boolean} props.loading - Whether data is loading
 * @param {string} props.error - Error message if any
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Function to handle page changes
 * @param {number} props.totalItems - Total number of items
 * @param {string} props.itemsLabel - Label for items (e.g., "transactions", "students")
 * @param {string} props.emptyTitle - Title for empty state
 * @param {string} props.emptySubtitle - Subtitle for empty state
 * @param {string} props.emptyButtonText - Text for empty state button
 * @param {Function} props.onEmptyAction - Function to call when empty state button is clicked
 * @param {React.ReactNode} props.emptyButtonIcon - Icon for empty state button
 * @param {boolean} props.showAddButton - Whether to show the add button (default: true)
 * @param {string} props.addButtonText - Text for add button
 * @param {Function} props.onAddClick - Function to call when add button is clicked
 * @param {React.ReactNode} props.additionalActions - Additional action buttons to show in the header
 * @param {React.ReactNode} props.children - Additional content to render before the table
 */
export function MasterListLayout({
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  searchWithFilter,
  columns,
  data,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsLabel,
  emptyTitle,
  emptySubtitle,
  emptyButtonText,
  onEmptyAction,
  emptyButtonIcon,
  showAddButton = true,
  addButtonText,
  onAddClick,
  additionalActions,
  children,
}) {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <PageContainer title={title}>
        {/* Search and Actions */}
        <div className="flex justify-between items-center gap-8">
          {searchWithFilter ? (
            searchWithFilter
          ) : (
            <div className="flex items-center gap-3 w-full max-w-[384px]">
              <div className="relative flex-1">
                <div className="flex items-center border border-[#E2E8F0] rounded-lg focus-within:ring-1 focus-within:ring-brand focus-within:border-brand bg-white h-9">
                  <Search className="w-4 h-4 ml-3 text-[#94A3B8]" />
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="border-0 flex-1 h-9 px-3 py-2 text-[13px] focus-visible:ring-0 placeholder:text-[#94A3B8] bg-transparent"
                    value={searchValue}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            {additionalActions}
            
            {showAddButton && (
              <Button
                className="bg-brand hover:bg-brand/90 text-white"
                onClick={onAddClick}
              >
                <Plus className="mr-2 h-4 w-4" />
                {addButtonText}
              </Button>
            )}
          </div>
        </div>

        {/* Total Count */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-sm text-[#64748B]">{t('common.total')}:</span>
          <span className="text-sm font-medium text-[#020617]">
            {totalItems} {itemsLabel}
          </span>
        </div>

        {/* Additional content */}
        {children}

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          emptyTitle={emptyTitle}
          emptySubtitle={emptySubtitle}
          emptyButtonText={emptyButtonText}
          onEmptyAction={onEmptyAction}
          emptyButtonIcon={emptyButtonIcon}
          className="mt-2"
        />
      </PageContainer>
    </MainLayout>
  );
} 