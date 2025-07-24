import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * InfoCard - A reusable card component for displaying information with a consistent layout
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The main title of the card
 * @param {Object} props.status - Status object with variant, className, and label properties
 * @param {Array} props.infoItems - Array of info items to display (each with icon, label, and optional secondaryLabel)
 * @param {string} props.detailLink - URL to navigate to when detail button is clicked
 * @param {string} props.detailText - Text to display on the detail button (default: "Detail")
 * @param {function} props.onDetailClick - Optional callback for detail button click (if not provided, will use detailLink)
 * @param {boolean} props.clickable - Whether the entire card is clickable
 * @param {string} props.className - Optional additional CSS classes
 */
export function InfoCard({
  title,
  subtitle,
  status,
  infoItems = [],
  detailLink,
  detailText = "Detail",
  onDetailClick,
  clickable = false,
  className = "",
  ...props
}) {
  const handleCardClick = () => {
    if (clickable && (onDetailClick || detailLink)) {
      if (onDetailClick) {
        onDetailClick();
      } else if (detailLink) {
        window.location.href = detailLink;
      }
    }
  };

  return (
    <div 
      className={cn(
        "border border-[#E2E8F0] rounded-lg p-4",
        clickable && "cursor-pointer hover:shadow-sm transition-shadow duration-200",
        className
      )}
      onClick={clickable ? handleCardClick : undefined}
      {...props}
    >
      <div className="flex flex-col gap-4">
        {/* Header with title and status */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[16px] font-medium text-[#020617]">{title}</h3>
            {subtitle && (
              <div className="flex items-center mt-1">
                {subtitle.icon && (
                  <span className="mr-1">{subtitle.icon}</span>
                )}
                <span className="text-[14px] text-[#64748B]">{subtitle.text}</span>
              </div>
            )}
          </div>
          {status && (
            <Badge 
              variant={status.variant || "outline"} 
              className={status.className}
            >
              {status.label}
            </Badge>
          )}
        </div>
        
        {/* Info items in a 2-column grid */}
        <div className="grid grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-center w-full">
              {item.icon && (
                <span className="mr-1 flex-shrink-0">{item.icon}</span>
              )}
              <span className="text-[14px] text-[#64748B] truncate">
                {item.label}
                {item.secondaryLabel && (
                  <> {item.secondaryLabel}</>
                )}
              </span>
            </div>
          ))}
        </div>
        
        {/* Detail button */}
        {(detailLink || onDetailClick) && !clickable && (
          <div className="mt-2">
            <Button 
              variant="link" 
              className="text-[#E67364] p-0 h-auto"
              onClick={onDetailClick}
              asChild={!!detailLink && !onDetailClick}
            >
              {detailLink && !onDetailClick ? (
                <a href={detailLink}>
                  {detailText}
                </a>
              ) : (
                <>{detailText}</>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 