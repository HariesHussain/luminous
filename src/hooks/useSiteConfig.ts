"use client";

import { useState, useEffect, useCallback } from "react";
import defaultSiteConfig from "../config/siteConfig.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SiteConfigData = Record<string, any>;

export interface UseSiteConfigReturn {
  config: SiteConfigData;
  isEditMode: boolean;
  updateTextField: (fieldKey: string, newValue: string) => void;
  updateImageField: (fieldKey: string, file: File, index?: number | null) => void;
  updateNestedTextField: (path: string, newValue: string) => void;
}

/**
 * Core hook for SiteBox builder integration.
 * - Listens for `sitebox-draft-sync` postMessages from the parent iframe
 * - Sends `sitebox-inline-edit` and `sitebox-inline-image-edit` back to parent
 * - Falls back to siteConfig.json when not inside an iframe
 */
export function useSiteConfig(): UseSiteConfigReturn {
  const [config, setConfig] = useState<SiteConfigData>(defaultSiteConfig);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Only run if we are inside the SiteBox builder iframe
    if (typeof window === "undefined" || window.self === window.top) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "sitebox-draft-sync") {
        if (event.data.data) {
          setConfig((prev) => ({ ...prev, ...event.data.data }));
        }
        if (event.data.isEditMode !== undefined) {
          setIsEditMode(event.data.isEditMode);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Tell the parent SiteBox builder that we are ready to receive data
    window.parent.postMessage({ type: "sitebox-draft-ready" }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Apply dynamic colors whenever primaryColor/secondaryColor change
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (config.primaryColor) {
      document.documentElement.style.setProperty("--color-gold", config.primaryColor);
      document.documentElement.style.setProperty("--color-gold-light", lightenHex(config.primaryColor, 30));
    }
    if (config.secondaryColor) {
      document.documentElement.style.setProperty("--color-bg", config.secondaryColor);
    }
  }, [config.primaryColor, config.secondaryColor]);

  // Call this when the owner edits a text field directly on the screen
  const updateTextField = useCallback((fieldKey: string, newValue: string) => {
    setConfig((prev) => ({ ...prev, [fieldKey]: newValue }));

    // Send the change back to the SiteBox parent
    if (typeof window !== "undefined" && window.self !== window.top) {
      window.parent.postMessage(
        {
          type: "sitebox-inline-edit",
          field: fieldKey,
          value: newValue,
        },
        "*"
      );
    }
  }, []);

  // For nested fields like "services[0].name" or "aboutBody[1]"
  const updateNestedTextField = useCallback((path: string, newValue: string) => {
    setConfig((prev) => {
      const updated = { ...prev };
      const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const idx = Number(key);
        if (!isNaN(idx) && Array.isArray(obj)) {
          obj[idx] = Array.isArray(obj[idx]) ? [...obj[idx]] : { ...obj[idx] };
          obj = obj[idx];
        } else {
          obj[key] = Array.isArray(obj[key]) ? [...obj[key]] : { ...obj[key] };
          obj = obj[key];
        }
      }

      const lastKey = keys[keys.length - 1];
      const lastIdx = Number(lastKey);
      if (!isNaN(lastIdx) && Array.isArray(obj)) {
        obj[lastIdx] = newValue;
      } else {
        obj[lastKey] = newValue;
      }

      return updated;
    });

    // Send the change back to the SiteBox parent
    if (typeof window !== "undefined" && window.self !== window.top) {
      window.parent.postMessage(
        {
          type: "sitebox-inline-edit",
          field: path,
          value: newValue,
        },
        "*"
      );
    }
  }, []);

  // Call this when the owner replaces an image (logo or gallery slot)
  const updateImageField = useCallback(
    (fieldKey: string, file: File, index: number | null = null) => {
      const objectUrl = URL.createObjectURL(file);

      // Convert to base64 so SiteBox can upload it to Appwrite storage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        if (typeof window !== "undefined" && window.self !== window.top) {
          window.parent.postMessage(
            {
              type: "sitebox-inline-image-edit",
              field: fieldKey,
              index: index,
              filename: file.name,
              base64: base64,
            },
            "*"
          );
        }
      };

      // Update local state instantly so the user sees the new image
      if (index !== null && Array.isArray(config[fieldKey])) {
        const updatedArray = [...config[fieldKey]];
        updatedArray[index] = objectUrl;
        setConfig((prev) => ({ ...prev, [fieldKey]: updatedArray }));
      } else {
        setConfig((prev) => ({ ...prev, [fieldKey]: objectUrl }));
      }
    },
    [config]
  );

  return { config, isEditMode, updateTextField, updateImageField, updateNestedTextField };
}

/** Utility: lighten a hex color by a percentage */
function lightenHex(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + Math.round(2.55 * percent));
  const g = Math.min(255, ((num >> 8) & 0x00ff) + Math.round(2.55 * percent));
  const b = Math.min(255, (num & 0x0000ff) + Math.round(2.55 * percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
