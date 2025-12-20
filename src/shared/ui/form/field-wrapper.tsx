"use client";

import * as React from "react";
import { type FieldError } from "react-hook-form";
import { Label } from "./label";
import { Error } from "./error";

type FieldWrapperProps = {
  label?: string;
  labelFor?: string;
  required?: boolean;
  description?: string;

  error?: FieldError | string;
  children: React.ReactNode;
  className?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export function FieldWrapper({
  label,
  labelFor,
  required,
  description,
  error,
  children,
  className,
}: FieldWrapperProps) {
  const baseClass = "space-y-1.5 relative";
  const mergedClass = className ? `${baseClass} ${className}` : baseClass;

  const errorMessage =
    typeof error === "string" ? error : error?.message ?? undefined;

  const showDescription = !errorMessage && description;

  return (
    <div className={mergedClass}>
      {label ? (
        <Label htmlFor={labelFor} className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-1">
            {label}
            {required && <span className="text-destructive">*</span>}
          </span>

          <div>{children}</div>
        </Label>
      ) : (
        <div>{children}</div>
      )}

      {/* {errorMessage && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )} */}
      <Error errorMessage={errorMessage} className="absolute -bottom-3" />

      {showDescription && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
