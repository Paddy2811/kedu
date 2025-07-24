import React from "react";
import { cn } from "@/lib/utils";
import { EMPTY_PLACEHOLDER } from "@/data/constants";

// Display provided value, otherwise a default placeholder (EMPTY_PLACEHOLDER).
export function PlaceholderText({ value, children, placeholder = EMPTY_PLACEHOLDER, className, ...props }) {
  const text = value !== undefined ? value : children;
  return (
    <span className={cn(className)} {...props}>
      {text && text !== "" ? text : placeholder}
    </span>
  );
} 