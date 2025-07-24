import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function AppSidebar(props) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={cn("flex w-full items-center gap-2", isCollapsed && "justify-center")}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
            <img src="/images/logo.png" alt="Logo" className="h-full w-auto" />
          </div>
          <div
            className={cn(
              "flex flex-col overflow-hidden transition-all duration-200",
              isCollapsed && "w-0 opacity-0 pointer-events-none"
            )}
          >
            <span className="text-sm font-semibold leading-5">K-Edu</span>
            <span className="text-xs leading-4 text-muted-foreground">Quản lý trung tâm</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
