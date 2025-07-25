import React from 'react';

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { Breadcrumbs } from '@/components/breadcrumbs';

import { AppSidebar } from '../app-sidebar';
import { Separator } from '@/components/ui/separator';

export default function MainLayout({ children, breadcrumb }) {
  return (
    <SidebarProvider>
      {/* Sidebar with icon-collapse handled inside AppSidebar */}
      <AppSidebar />

      <SidebarInset>
        {/* Header replicating reference template */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumb ? (
              breadcrumb
            ) : (
              <Breadcrumbs />
            )}
          </div>
        </header>

        <div className="flex flex-1 flex-col p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
} 