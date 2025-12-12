/**
 * CSS utilities for email templates
 * Provides Tailwind CSS classes inlined into email templates
 *
 * @module
 */

/**
 * CSS class name constants for email styling
 * These follow Tailwind CSS naming conventions and are applied as inline styles
 */
export const EmailClasses = {
  // Layout
  container: "email-container",
  section: "email-section",

  // Typography
  heading: "email-heading",
  body: "email-body",
  label: "text-sm font-semibold",

  // Spacing
  spacing: {
    none: "m-0",
    small: "mb-4",
    medium: "mb-6",
    large: "mb-12",
  },

  // Colors
  colors: {
    primary: "text-primary-600",
    text: "text-gray-900",
    textMuted: "text-gray-600",
    background: "bg-white",
    backgroundAlt: "bg-gray-50",
  },

  // Components
  button: "email-button",
  link: "email-link",
  footer: "email-footer",
} as const;

/**
 * Inline style objects for common email components
 * These can be used as fallbacks when CSS classes are not sufficient
 */
export const EmailStyles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "16px",
    marginTop: "0",
  },
  body: {
    fontSize: "16px",
    color: "#1f2937",
    lineHeight: "1.625",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "#7c3aed",
    color: "#ffffff",
    fontWeight: "600",
    borderRadius: "8px",
    textDecoration: "none",
  },
  link: {
    color: "#7c3aed",
    textDecoration: "underline",
  },
  footer: {
    marginTop: "48px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "24px",
    fontSize: "14px",
    color: "#4b5563",
  },
} as const;

/**
 * Tailwind CSS color palette for email
 */
export const TailwindColors = {
  white: "#ffffff",
  primary: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#cabffd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
} as const;
