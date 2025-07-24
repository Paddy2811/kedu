/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";

export const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
  const value = useState([]); // [crumbs, setCrumbs]
  return (
    <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>
  );
}

// Hook for pages to declare a breadcrumb item
export function useBreadcrumb(label, to = null) {
  const ctx = useContext(BreadcrumbContext);
  const setCrumbs = ctx ? ctx[1] : null;

  useEffect(() => {
    if (!setCrumbs || !label) return undefined;
    setCrumbs((prev) => {
      if (prev.find((c) => c.label === label)) return prev;
      return [...prev, { label, to }];
    });
    return () => setCrumbs((prev) => prev.filter((c) => c.label !== label));
  }, [label, to, setCrumbs]);
} 