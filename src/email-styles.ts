/**
 * CSS utilities for email templates
 * Provides Tailwind CSS classes and constants for minimalist monospace-inspired email styling
 *
 * @module
 */

/**
 * CSS class name constants for email styling
 * These follow the minimalist monospace design system and can be overridden by users
 */
export const EmailClasses = {
  // Layout
  container: "email-container",
  section: "email-section",
  sectionBordered: "email-section-bordered",
  box: "email-box",
  boxAlt: "email-box-alt",

  // Typography
  heading: "email-heading",
  subheading: "email-subheading",
  body: "email-body",
  textAlt: "email-text-alt",
  code: "email-code",
  codeBlock: "email-code-block",

  // Spacing
  spacing: {
    none: "email-spacing-none",
    small: "email-spacing-small",
    medium: "email-spacing-medium",
    large: "email-spacing-large",
  },

  // Components
  button: "email-button",
  link: "email-link",
  divider: "email-divider",
  footer: "email-footer",
  list: "email-list",
  listItem: "email-list-item",
  table: "email-table",
} as const;

/**
 * Inline style objects for common email components
 * These follow the minimalist monospace design system
 * Users can override these with their own brand colors and styles
 */
export const EmailStyles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "1.20rem",
    fontFamily: "ui-monospace, 'SFMono-Regular', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontSize: "16px",
    lineHeight: "1.20rem",
    fontWeight: "500",
    fontVariantNumeric: "tabular-nums lining-nums",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#000000",
    marginBottom: "1.20rem",
    marginTop: "0",
    textTransform: "uppercase",
    lineHeight: "1.20rem",
  },
  subheading: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#000000",
    marginBottom: "1.20rem",
    marginTop: "1.20rem",
    textTransform: "uppercase",
    lineHeight: "1.20rem",
  },
  body: {
    fontSize: "16px",
    color: "#000000",
    lineHeight: "1.20rem",
    marginBottom: "1.20rem",
  },
  button: {
    display: "inline-block",
    padding: "0.6rem 1rem",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontWeight: "600",
    border: "2px solid #000000",
    textDecoration: "none",
    textTransform: "uppercase",
    lineHeight: "1.20rem",
  },
  buttonHover: {
    backgroundColor: "#eeeeee",
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
    textDecorationThickness: "2px",
  },
  divider: {
    height: "1.20rem",
    borderTop: "6px double #000000",
    marginTop: "1.20rem",
    marginBottom: "1.20rem",
  },
  footer: {
    marginTop: "1.20rem",
    borderTop: "6px double #000000",
    paddingTop: "1.20rem",
    fontSize: "14px",
    color: "#666666",
    lineHeight: "1.20rem",
  },
  code: {
    fontFamily: "ui-monospace, 'SFMono-Regular', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontWeight: "600",
    backgroundColor: "#eeeeee",
    padding: "0.125rem 0.25rem",
  },
  box: {
    padding: "1.20rem",
    border: "2px solid #000000",
    marginBottom: "1.20rem",
  },
} as const;

/**
 * Minimalist color palette for email templates
 * Users should override these with their brand colors
 */
export const EmailColors = {
  // Primary colors (monochrome by default)
  text: "#000000",
  textAlt: "#666666",
  background: "#ffffff",
  backgroundAlt: "#eeeeee",
  border: "#000000",

  // Can be overridden with brand colors
  // Example: { accent: "#7c3aed", success: "#22c55e", error: "#ef4444" }
} as const;

/**
 * Design tokens for consistent spacing and sizing
 * Based on the monospace design system with 1.20rem baseline
 */
export const EmailTokens = {
  // Typography
  fontSize: {
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
  },
  fontWeight: {
    normal: "500",
    medium: "600",
    bold: "800",
  },
  lineHeight: "1.20rem",

  // Spacing
  spacing: {
    line: "1.20rem",
    small: "1.20rem",
    medium: "calc(1.20rem * 1.5)",
    large: "calc(1.20rem * 2)",
  },

  // Border
  borderWidth: "2px",
  borderThick: "6px",

  // Layout
  maxWidth: "600px",
} as const;
