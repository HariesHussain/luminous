"use client";

import React, { useCallback, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { useSiteConfigContext } from "@/context/SiteConfigContext";

interface EditableImageProps extends Omit<ImageProps, "src"> {
  /** Config field key (e.g. "logoUrl", "gallery") */
  fieldKey: string;
  /** For array fields like gallery, the index of the image */
  index?: number | null;
  /** The current image src from config */
  src: string;
  /** Label shown on the replace overlay (e.g. "Replace Logo", "Replace Image") */
  replaceLabel?: string;
  /** Optional wrapper className */
  wrapperClassName?: string;
}

/**
 * Renders an image with a "Replace" file-input overlay when SiteBox edit mode is active.
 * When edit mode is off, renders as a plain Next.js Image with zero visual changes.
 */
export const EditableImage: React.FC<EditableImageProps> = ({
  fieldKey,
  index = null,
  src,
  replaceLabel = "✏️ Replace Image",
  wrapperClassName = "",
  alt,
  ...imageProps
}) => {
  const { isEditMode, updateImageField } = useSiteConfigContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        updateImageField(fieldKey, file, index);
      }
    },
    [fieldKey, index, updateImageField]
  );

  // For external URLs that go through next/image, we need unoptimized
  const isExternal = src.startsWith("http") || src.startsWith("blob:");

  return (
    <div className={`relative group ${wrapperClassName}`}>
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        {...(isExternal ? { unoptimized: true } : {})}
      />

      {isEditMode && (
        <label className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer text-xs font-bold transition-all duration-300 z-30">
          {replaceLabel}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  );
};

export default React.memo(EditableImage);
