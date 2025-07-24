"use client"

import { Link, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { menuGroups } from "@/lib/menu";
import { cn } from "@/lib/utils";

export function NavMain() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/students") {
      return (
        location.pathname === path || location.pathname === "/students/create"
      );
    }
    if (path === "/classes") {
      return (
        location.pathname === path || location.pathname.startsWith("/classes/")
      );
    }
    return location.pathname === path;
  };

  return (
    <>
      {menuGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  className={cn(
                    isActive(item.path) &&
                      "bg-accent/20 text-accent-foreground"
                  )}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
