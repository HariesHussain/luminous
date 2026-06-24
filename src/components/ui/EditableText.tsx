"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { useSiteConfigContext } from "@/context/SiteConfigContext";

interface EditableTextProps {
  /** Config field key for top-level fields, or dot-path for nested (e.g. "services[0].name") */
  fieldKey: string;
  /** The current text value to display */
  children: React.ReactNode;
  /** HTML tag to render */
  as?: keyof React.JSX.IntrinsicElements;
  /** CSS classes — passed through untouched */
  className?: string;
  /** Use nested update path instead of top-level field */
  nested?: boolean;
  /** Additional props to spread onto the element */
  [key: string]: unknown;
}

/**
 * Renders text that becomes contentEditable when SiteBox edit mode is active.
 * On blur, it sends the updated value back to SiteBox via the context.
 * When edit mode is off, it renders as a normal element with zero visual changes.
 */
export const EditableText: React.FC<EditableTextProps> = ({
  fieldKey,
  children,
  as: Tag = "span",
  className = "",
  nested = false,
  ...rest
}) => {
  const { isEditMode, updateTextField, updateNestedTextField } = useSiteConfigContext();
  const elementRef = useRef<HTMLElement>(null);

  // Keep the displayed content in sync with config changes from parent
  useEffect(() => {
    if (elementRef.current && !isEditMode) {
      const textContent = typeof children === "string" ? children : "";
      if (textContent && elementRef.current.innerText !== textContent) {
        elementRef.current.innerText = textContent;
      }
    }
  }, [children, isEditMode]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      const newValue = e.currentTarget.innerText;
      if (nested) {
        updateNestedTextField(fieldKey, newValue);
      } else {
        updateTextField(fieldKey, newValue);
      }
    },
    [fieldKey, nested, updateTextField, updateNestedTextField]
  );

  // Filter out our custom props before spreading onto DOM element
  const { nested: _nested, fieldKey: _fk, ...domProps } = rest;
  void _nested;
  void _fk;

  const editableProps = isEditMode
    ? {
        contentEditable: true,
        suppressContentEditableWarning: true,
        onBlur: handleBlur,
        "data-editable-field": fieldKey,
      }
    : {};

  const editClassName = isEditMode ? `sitebox-editable ${className}` : className;

  return React.createElement(
    Tag as string,
    {
      ref: elementRef,
      className: editClassName,
      ...editableProps,
      ...domProps,
    },
    children
  );
};

export default React.memo(EditableText);
