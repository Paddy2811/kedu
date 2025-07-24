"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { BreadcrumbContext } from "@/contexts/breadcrumb-context";

export function Breadcrumbs({ className }) {
  const [crumbs] = React.useContext(BreadcrumbContext) ?? [[]];

  const items = React.useMemo(() => {
    const home = { label: "Trang chủ", to: "/" };
    return [home, ...crumbs];
  }, [crumbs]);

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 overflow-x-auto text-xs font-medium">
        {items.map((c, idx) => (
          <React.Fragment key={c.label + idx}>
            {idx !== 0 && (
              <li>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </li>
            )}
            <li>
              {idx === items.length - 1 || !c.to ? (
                <span className="text-foreground">{c.label}</span>
              ) : (
                <Link to={c.to} className="text-muted-foreground hover:underline">
                  {c.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
} 