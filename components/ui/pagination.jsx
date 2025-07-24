import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = "" 
}) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Số trang hiển thị tối đa
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Điều chỉnh startPage nếu endPage đã đạt giới hạn
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Thêm trang đầu và dấu ...
    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          variant="outline"
          className={`h-8 w-8 text-[13px] border-transparent hover:bg-[#F8FAFC] hover:text-[#0F172A] ${
            currentPage === 1
              ? "border border-brand text-brand"
              : "text-[#64748B]"
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 text-[#64748B]">
            ...
          </span>
        );
      }
    }

    // Thêm các trang ở giữa
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant="outline"
          className={`h-8 w-8 text-[13px] border-transparent hover:bg-[#F8FAFC] hover:text-[#0F172A] ${
            currentPage === i
              ? "border border-brand text-brand"
              : "text-[#64748B]"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Thêm dấu ... và trang cuối
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 text-[#64748B]">
            ...
          </span>
        );
      }
      pages.push(
        <Button
          key={totalPages}
          variant="outline"
          className={`h-8 w-8 text-[13px] border-transparent hover:bg-[#F8FAFC] hover:text-[#0F172A] ${
            currentPage === totalPages
              ? "border border-brand text-brand"
              : "text-[#64748B]"
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-end gap-1 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-transparent text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-transparent text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
} 