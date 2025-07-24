import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Common skeleton renderers for different cell types
 */
export const SkeletonRenderers = {
  // Avatar with name and subtitle
  avatarWithName: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  ),
  
  // Avatar with square image
  avatarSquare: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-md" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  ),
  
  // Badge
  badge: () => <Skeleton className="h-6 w-[100px] rounded-full" />,
  
  // Action buttons
  actions: () => (
    <div className="flex items-center justify-end gap-3">
      <Skeleton className="h-8 w-[60px]" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  ),
}; 