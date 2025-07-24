import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EMPTY_PLACEHOLDER } from "@/data/constants";
import { useState, useEffect, useCallback } from "react";

// Generic input field that shows a postfix (unit) inside the input wrapper
// Props:
//  id, name, type, value, onChange, placeholder, postfix, disabled, readOnly, className, ...rest
export function InputWithPostfix({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder = EMPTY_PLACEHOLDER,
  postfix,
  disabled = false,
  readOnly = false,
  className,
  ...rest
}) {
  // Extract background color from className if it exists
  const bgColorMatch = className?.match(/bg-\[[^\]]+\]|bg-[a-zA-Z0-9-]+/);
  const bgColor = bgColorMatch ? bgColorMatch[0] : "";
  
  // Track internal value to ensure correct display
  const [internalValue, setInternalValue] = useState(() => {
    // Initialize with formatted value to prevent extra renders
    if (!value && value !== 0) return "";
    const cleaned = value.toString().replace(/[^\d,]/g, "");
    const parts = cleaned.split(',');
    const wholePart = parts[0] || "";
    const decimalPart = parts[1] || "";
    const formattedWhole = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${formattedWhole},${decimalPart}` : formattedWhole;
  });
  
  // Format number with periods as thousand separators for Vietnamese locale
  const formatNumber = useCallback((inputVal) => {
    if (!inputVal && inputVal !== 0) return "";
    
    // Convert to string and keep only digits and commas
    const cleaned = inputVal.toString().replace(/[^\d,]/g, "");
    
    // Split by comma to handle decimal part
    const parts = cleaned.split(',');
    const wholePart = parts[0] || "";
    const decimalPart = parts[1] || "";
    
    // Format the whole part with periods as thousand separators
    const formattedWhole = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Return formatted number with decimal part if it exists
    return decimalPart ? `${formattedWhole},${decimalPart}` : formattedWhole;
  }, []);
  
  // Update internal value when external value changes
  useEffect(() => {
    const formatted = formatNumber(value);
    // Only update if the formatted value is different to prevent infinite loops
    setInternalValue(prev => {
      if (prev !== formatted) {
        return formatted;
      }
      return prev;
    });
  }, [value, formatNumber]);
  
  // Custom onChange handler to restrict input and format correctly
  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Keep only digits and comma (for decimal separator)
    inputValue = inputValue.replace(/[^\d,]/g, "");

    // Prevent multiple commas - only allow one comma
    const commaCount = (inputValue.match(/,/g) || []).length;
    if (commaCount > 1) {
      const firstCommaIndex = inputValue.indexOf(',');
      inputValue = inputValue.substring(0, firstCommaIndex + 1) + 
                   inputValue.substring(firstCommaIndex + 1).replace(/,/g, '');
    }

    // Format the number with periods as thousand separators
    const formatted = formatNumber(inputValue);
    setInternalValue(formatted);

    // Send clean numeric value to parent (digits only, including decimal part)
    const cleanValue = inputValue.replace(/[^\d,]/g, '');
    const standardValue = cleanValue.replace(',', '.'); // Convert comma to dot for standard decimal format
    
    // Only call onChange if the value actually changed to prevent infinite loops
    if (onChange && standardValue !== value) {
      const modifiedEvent = {
        ...e,
        target: {
          ...e.target,
          name: name, // Ensure name is preserved
          value: standardValue
        }
      };
      onChange(modifiedEvent);
    }
  };
  
  const wrapperCls = cn(
    "flex items-center border border-input rounded-md focus-within:ring-1 focus-within:ring-brand focus-within:border-brand",
    disabled ? `${bgColor || "bg-white"} opacity-50 cursor-not-allowed text-[#71717A]` : bgColor || "bg-background"
  );

  return (
    <div className={wrapperCls}>
      <Input
        id={id}
        name={name}
        type={type}
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(
          "flex-1 border-0 shadow-none focus-visible:ring-0 bg-transparent",
          disabled && "opacity-50 cursor-not-allowed text-[#71717A]",
          className?.replace(bgColorMatch?.[0], "")
        )}
        {...rest}
      />
      {postfix && (
        <div className={`flex items-center ${disabled ? "opacity-50 cursor-not-allowed text-[#71717A]" : ""}`}>
          <span className={cn(
            "shrink-0 text-sm text-[#64748B] ml-2 mr-3 pointer-events-none text-[#71717A]"
          )}>
            {postfix}
          </span>
        </div>
      )}
    </div>
  );
} 