"use client";

import React, { createContext, useContext } from "react";
import { useSiteConfig, UseSiteConfigReturn } from "@/hooks/useSiteConfig";

const SiteConfigContext = createContext<UseSiteConfigReturn | null>(null);

/**
 * Provider that wraps the page and makes site config + edit functions
 * available to all child components via context.
 */
export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const siteConfig = useSiteConfig();

  return (
    <SiteConfigContext.Provider value={siteConfig}>
      {children}
    </SiteConfigContext.Provider>
  );
}

/**
 * Hook for child components to access the shared site config.
 * Must be used within a <SiteConfigProvider>.
 */
export function useSiteConfigContext(): UseSiteConfigReturn {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfigContext must be used within a <SiteConfigProvider>");
  }
  return context;
}
