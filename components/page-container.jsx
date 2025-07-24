import React from 'react';
import { cn } from "@/lib/utils";

export function PageContainer({ 
  title,
  children,
  className,
  ...props 
}) {
  return (
    <div className="w-full bg-white" {...props}>
      <div className="w-full mx-auto px-2 pb-6">
        {title && (
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-[#020617]">{title}</h1>
          </div>
        )}
        <div className={cn("flex flex-col gap-4", className)}>
          {children}
        </div>
      </div>
    </div>
  );
} 