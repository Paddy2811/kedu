import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * PrefilledInput component for inputs that show prefilled text and are read-only
 * Used when the value is pre-determined by the system or rules
 */
export const PrefilledInput = React.forwardRef(({ 
  value, 
  className,
  postfix,
  ...props 
}, ref) => {
  const wrapperCls = cn(
    "flex items-center border border-input rounded-md bg-[#F3F3F3]",
    className
  );

  return (
    <div className={wrapperCls}>
      <Input
        ref={ref}
        value={value}
        readOnly
        aria-readonly="true"
        className={cn(
          "text-sm !text-[#020617] bg-transparent cursor-not-allowed border-0 shadow-none focus-visible:ring-0",
          className
        )}
        {...props}
      />
      {postfix && (
        <div className="flex items-center">
          <span className="shrink-0 text-sm text-[#64748B] ml-2 mr-3 pointer-events-none">
            {postfix}
          </span>
        </div>
      )}
    </div>
  );
});

PrefilledInput.displayName = "PrefilledInput"; 