import React from "react";
import { Button } from "@/components/ui/button";

/**
 * EmptyState component for displaying empty state UI
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} [props.subtitle] - Optional subtitle text
 * @param {string} [props.buttonText] - Optional button text
 * @param {function} [props.onButtonClick] - Optional button click handler
 * @param {React.ReactNode} [props.buttonIcon] - Optional icon to display in the button
 * @param {React.ReactNode} [props.customIllustration] - Optional custom illustration to override the default one
 * @param {boolean} [props.noBorder=false] - Whether to remove the border
 * @param {string} [props.className] - Optional additional CSS classes
 */
export function EmptyState({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  buttonIcon,
  customIllustration,
  noBorder = false,
  className = "",
  ...props
}) {
  return (
    <div 
      className={`${!noBorder ? 'border border-[#E2E8F0]' : ''} rounded-lg flex flex-col items-center justify-center py-6 px-4 ${className}`}
      {...props}
    >
      <div className="flex flex-col items-center">
        <div className="w-[121px] h-[99px] mb-2">
          {customIllustration || (
            <img 
              src="/images/empty-states/empty_image.png" 
              alt="Empty state" 
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <h3 className="text-base font-medium text-[#71717A] mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-[#64748B] mb-4">
            {subtitle}
          </p>
        )}
      </div>
      
      {buttonText && onButtonClick && (
        <Button 
          className="bg-brand hover:bg-brand/90 text-white flex items-center gap-2"
          onClick={onButtonClick}
        >
          {buttonIcon && buttonIcon}
          {buttonText}
        </Button>
      )}
    </div>
  );
} 