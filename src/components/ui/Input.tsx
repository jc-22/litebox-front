"use client";

import {InputHTMLAttributes, useState} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: "default" | "fixed" | "modal";
  showLabel?: boolean;
}

export default function Input({
  label,
  error,
  helpText,
  variant = "default",
  showLabel = false,
  className = "",
  disabled,
  value,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== "" && value !== undefined && value !== null;

  const wrapperClass = [
    "input-wrapper",
    variant === "fixed" && "fixed",
    variant === "modal" && "modal",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mainClass = [
    "input-main",
    hasValue && "filled",
    error && "error",
    disabled && "disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass}>
      {label && (
        <label
          className={`input-label ${!showLabel ? "sr-only" : ""} ${
            error ? "error" : ""
          }`}
        >
          {label}
        </label>
      )}

      <div className="input-field">
        <div className="input-frame">
          <div className={mainClass}>
            <input
              className="input"
              disabled={disabled}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </div>
        </div>

        {(error || helpText) && (
          <span className={`input-help ${error ? "error" : "info"}`}>
            {error || helpText}
          </span>
        )}
      </div>
    </div>
  );
}
