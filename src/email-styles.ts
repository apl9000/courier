/**
 * CSS utilities and design tokens for email templates
 * Provides runtime theme configuration with fallback to default monospace design
 *
 * @example Basic usage with custom colors
 * ```ts
 * const courier = await Courier.initialize({
 *   smtp: config,
 *   theme: {
 *     colors: { text: "#1a1a1a", background: "#f5f5f5" }
 *   }
 * });
 * ```
 *
 * @example Using a preset theme
 * ```ts
 * import { DarkTheme } from "@rivescloud/courier";
 *
 * const courier = await Courier.initialize({
 *   smtp: config,
 *   theme: DarkTheme
 * });
 * ```
 *
 * @module
 */

import type { ThemeConfig } from "./types.ts";

/**
 * CSS class name constants for email styling
 */
export const EmailClasses = {
  container: "email-container",
  section: "email-section",
  sectionBordered: "email-section-bordered",
  sectionHero: "email-section-hero",
  box: "email-box",
  boxAlt: "email-box-alt",
  boxHighlight: "email-box-highlight",
  boxSuccess: "email-box-success",
  boxWarning: "email-box-warning",
  boxError: "email-box-error",
  boxInfo: "email-box-info",
  heading: "email-heading",
  subheading: "email-subheading",
  body: "email-body",
  textAlt: "email-text-alt",
  textXs: "email-text-xs",
  code: "email-code",
  codeLg: "email-code-lg",
  button: "email-button",
  buttonPrimary: "email-button-primary",
  buttonAccent: "email-button-accent",
  link: "email-link",
  linkAccent: "email-link-accent",
  divider: "email-divider",
  dividerSubtle: "email-divider-subtle",
  dividerAccent: "email-divider-accent",
  footer: "email-footer",
  spacingNone: "email-spacing-none",
  spacingXs: "email-spacing-xs",
  spacingSm: "email-spacing-sm",
  spacingMd: "email-spacing-md",
  spacingLg: "email-spacing-lg",
  imageHero: "email-image-hero",
  imageInline: "email-image-inline",
  imageCell: "email-image-cell",
  contentCell: "email-content-cell",
  sectionImageLeft: "email-section-image-left",
  sectionImageRight: "email-section-image-right",
} as const;

/**
 * Design tokens for the email theme
 */
export const EmailTokens = {
  fontFamily: {
    mono:
      "ui-monospace, 'SFMono-Regular', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "15px",
    lg: "17px",
    xl: "20px",
    "2xl": "26px",
    "3xl": "32px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    black: "800",
  },
  lineHeight: {
    tight: "1.25",
    base: "1.5",
    relaxed: "1.625",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    base: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
    "2xl": "3rem",
  },
  borderWidth: {
    thin: "1px",
    default: "2px",
    thick: "3px",
    double: "6px",
  },
} as const;

/**
 * Color palette for email templates
 */
export const EmailColors = {
  text: {
    default: "#000000",
    secondary: "#404040",
    alt: "#666666",
    disabled: "#999999",
  },
  bg: {
    default: "#ffffff",
    subtle: "#fafafa",
    alt: "#f5f5f5",
    muted: "#e5e5e5",
  },
  border: {
    default: "#000000",
    soft: "#d4d4d4",
    muted: "#e5e5e5",
  },
  accent: {
    default: "#0891b2",
    hover: "#0e7490",
    muted: "#cffafe",
  },
  semantic: {
    success: "#15803d",
    successBg: "#dcfce7",
    warning: "#a16207",
    warningBg: "#fef3c7",
    error: "#b91c1c",
    errorBg: "#fee2e2",
    info: "#0369a1",
    infoBg: "#e0f2fe",
  },
} as const;

/**
 * Default theme configuration
 */
export const DefaultTheme = {
  colors: {
    text: EmailColors.text.default,
    textSecondary: EmailColors.text.secondary,
    textAlt: EmailColors.text.alt,
    background: EmailColors.bg.default,
    backgroundSubtle: EmailColors.bg.subtle,
    backgroundAlt: EmailColors.bg.alt,
    border: EmailColors.border.default,
    borderSoft: EmailColors.border.soft,
    accent: EmailColors.accent.default,
    accentHover: EmailColors.accent.hover,
    accentMuted: EmailColors.accent.muted,
  },
  typography: {
    fontFamily: EmailTokens.fontFamily.mono,
    fontSize: EmailTokens.fontSize,
    fontWeight: EmailTokens.fontWeight,
    lineHeight: EmailTokens.lineHeight.base,
  },
  spacing: {
    ...EmailTokens.spacing,
    line: EmailTokens.spacing.md,
    containerPadding: EmailTokens.spacing.md,
  },
  borders: {
    widthThin: EmailTokens.borderWidth.thin,
    width: EmailTokens.borderWidth.default,
    widthThick: EmailTokens.borderWidth.thick,
    widthDouble: EmailTokens.borderWidth.double,
  },
  container: {
    maxWidth: "600px",
  },
} as const;

/**
 * Dark theme preset - Light text on dark background
 * @example
 * ```ts
 * const courier = await Courier.initialize({
 *   smtp: config,
 *   theme: DarkTheme
 * });
 * ```
 */
export const DarkTheme = {
  colors: {
    text: "#f5f5f5",
    textSecondary: "#d4d4d4",
    textAlt: "#a0a0a0",
    background: "#0d1117",
    backgroundSubtle: "#161b22",
    backgroundAlt: "#1c2128",
    border: "#30363d",
    borderSoft: "#525252",
    accent: "#60a5fa",
    accentHover: "#3b82f6",
    accentMuted: "#1e3a5f",
  },
  typography: DefaultTheme.typography,
  spacing: DefaultTheme.spacing,
  borders: DefaultTheme.borders,
  container: DefaultTheme.container,
} as const;

/**
 * Professional theme preset - Subtle grays with blue accent
 * @example
 * ```ts
 * const courier = await Courier.initialize({
 *   smtp: config,
 *   theme: ProfessionalTheme
 * });
 * ```
 */
export const ProfessionalTheme = {
  colors: {
    text: "#1f2937",
    textSecondary: "#4b5563",
    textAlt: "#6b7280",
    background: "#ffffff",
    backgroundSubtle: "#f9fafb",
    backgroundAlt: "#f3f4f6",
    border: "#d1d5db",
    borderSoft: "#e5e7eb",
    accent: "#2563eb",
    accentHover: "#1e40af",
    accentMuted: "#dbeafe",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: EmailTokens.fontSize,
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "800",
    },
    lineHeight: "1.5",
  },
  spacing: {
    ...EmailTokens.spacing,
    line: "1.5rem",
    containerPadding: "2rem",
  },
  borders: DefaultTheme.borders,
  container: {
    maxWidth: "700px",
  },
} as const;

/**
 * Colorful theme preset - Vibrant colors for newsletters
 * @example
 * ```ts
 * const courier = await Courier.initialize({
 *   smtp: config,
 *   theme: ColorfulTheme
 * });
 * ```
 */
export const ColorfulTheme = {
  colors: {
    text: "#1e293b",
    textSecondary: "#475569",
    textAlt: "#64748b",
    background: "#ffffff",
    backgroundSubtle: "#fffbeb",
    backgroundAlt: "#fef3c7",
    border: "#f59e0b",
    borderSoft: "#fcd34d",
    accent: "#ec4899",
    accentHover: "#db2777",
    accentMuted: "#fce7f3",
  },
  typography: DefaultTheme.typography,
  spacing: DefaultTheme.spacing,
  borders: {
    widthThin: "2px",
    width: "3px",
    widthThick: "4px",
    widthDouble: "8px",
  },
  container: DefaultTheme.container,
} as const;

/**
 * Modern Brutalist theme preset - Refined monospace with better contrast
 * @example
 * ```ts
 * const courier = await Courier.initialize({
 *   smtp: config,
 *   theme: ModernBrutalistTheme
 * });
 * ```
 */
export const ModernBrutalistTheme = {
  colors: {
    text: "#0a0a0a",
    textSecondary: "#404040",
    textAlt: "#525252",
    background: "#ffffff",
    backgroundSubtle: "#fafafa",
    backgroundAlt: "#f5f5f5",
    border: "#171717",
    borderSoft: "#d4d4d4",
    accent: "#0d9488",
    accentHover: "#0f766e",
    accentMuted: "#ccfbf1",
  },
  typography: {
    fontFamily: EmailTokens.fontFamily.mono,
    fontSize: EmailTokens.fontSize,
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "800",
    },
    lineHeight: "1.5",
  },
  spacing: {
    ...EmailTokens.spacing,
    line: "1.5rem",
    containerPadding: "1.5rem",
  },
  borders: {
    widthThin: "1px",
    width: "2px",
    widthThick: "3px",
    widthDouble: "6px",
  },
  container: {
    maxWidth: "600px",
  },
} as const;

/**
 * Inline style objects for fallback compatibility
 */
export const EmailStyles = {
  container: {
    maxWidth: DefaultTheme.container.maxWidth,
    margin: "0 auto",
    backgroundColor: DefaultTheme.colors.background,
    padding: DefaultTheme.spacing.containerPadding,
    fontFamily: DefaultTheme.typography.fontFamily,
    fontSize: DefaultTheme.typography.fontSize.base,
    lineHeight: DefaultTheme.typography.lineHeight,
    fontWeight: DefaultTheme.typography.fontWeight.normal,
  },
  heading: {
    fontSize: DefaultTheme.typography.fontSize["2xl"],
    fontWeight: DefaultTheme.typography.fontWeight.bold,
    color: DefaultTheme.colors.text,
    marginBottom: DefaultTheme.spacing.line,
    marginTop: "0",
    textTransform: "uppercase" as const,
    lineHeight: DefaultTheme.typography.lineHeight,
  },
  body: {
    fontSize: DefaultTheme.typography.fontSize.base,
    color: DefaultTheme.colors.text,
    lineHeight: DefaultTheme.typography.lineHeight,
    marginBottom: DefaultTheme.spacing.line,
  },
  button: {
    display: "inline-block",
    padding: "0.875rem 1.5rem",
    backgroundColor: DefaultTheme.colors.background,
    color: DefaultTheme.colors.text,
    fontWeight: DefaultTheme.typography.fontWeight.medium,
    fontSize: DefaultTheme.typography.fontSize.sm,
    border: `${DefaultTheme.borders.width} solid ${DefaultTheme.colors.border}`,
    textDecoration: "none",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    lineHeight: "1",
  },
} as const;

/**
 * Merge custom theme with default theme
 * @internal
 */
export function mergeTheme(customTheme?: Partial<ThemeConfig>) {
  if (!customTheme) return DefaultTheme;

  return {
    colors: { ...DefaultTheme.colors, ...customTheme.colors },
    typography: {
      ...DefaultTheme.typography,
      ...customTheme.typography,
      fontSize: {
        ...DefaultTheme.typography.fontSize,
        ...customTheme.typography?.fontSize,
      },
      fontWeight: {
        ...DefaultTheme.typography.fontWeight,
        ...customTheme.typography?.fontWeight,
      },
    },
    spacing: { ...DefaultTheme.spacing, ...customTheme.spacing },
    borders: { ...DefaultTheme.borders, ...customTheme.borders },
    container: { ...DefaultTheme.container, ...customTheme.container },
  };
}

/**
 * Create a custom theme by extending a base theme
 * @param baseTheme - Base theme to extend (DefaultTheme, DarkTheme, etc.)
 * @param overrides - Properties to override
 * @returns Merged theme configuration
 *
 * @example
 * ```ts
 * const myTheme = createTheme(DarkTheme, {
 *   colors: { accent: "#ff6b6b" },
 *   container: { maxWidth: "800px" }
 * });
 * ```
 */
export function createTheme(
  baseTheme: Partial<ThemeConfig>,
  overrides: Partial<ThemeConfig>,
): ReturnType<typeof mergeTheme> {
  return mergeTheme({ ...baseTheme, ...overrides });
}

/**
 * Helper to generate a CSS rule
 * @internal
 */
function cssRule(selector: string, properties: Record<string, string>): string {
  const props = Object.entries(properties)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
  return `${selector} {\n${props}\n}`;
}

/**
 * Generate CSS from theme configuration
 * Creates a complete stylesheet with all email component classes
 *
 * @param theme - Merged theme configuration
 * @returns CSS string wrapped in <style> tag
 * @throws {Error} If theme configuration is invalid
 *
 * @example
 * ```ts
 * const css = generateThemedCSS(mergeTheme(customTheme));
 * // Returns: <style>.email-container { ... } .email-button { ... }</style>
 * ```
 */
export function generateThemedCSS(theme: ReturnType<typeof mergeTheme>): string {
  if (!theme || typeof theme !== "object") {
    throw new Error("Invalid theme configuration: theme must be an object");
  }
  if (!theme.colors || !theme.typography || !theme.spacing || !theme.borders || !theme.container) {
    throw new Error("Invalid theme configuration: missing required theme properties");
  }

  // Helper to get color with fallback
  const color = (key: string, fallback: string) =>
    (theme.colors as Record<string, string>)[key] ?? fallback;
  const spacing = (key: string, fallback: string) =>
    (theme.spacing as Record<string, string>)[key] ?? fallback;

  const rules = [
    // Container
    cssRule(".email-container", {
      "max-width": theme.container.maxWidth,
      "height": "100%",
      "min-height": "100vh",
      "margin": "0 auto",
      "background-color": theme.colors.background,
      "padding": theme.spacing.containerPadding,
      "box-sizing": "border-box",
      "font-family": theme.typography.fontFamily,
      "font-size": theme.typography.fontSize.base,
      "line-height": theme.typography.lineHeight,
      "font-weight": theme.typography.fontWeight.normal,
      "text-align": "left",
    }),
    // Typography
    cssRule(".email-heading", {
      "font-size": theme.typography.fontSize["2xl"],
      "font-weight": theme.typography.fontWeight.bold,
      "color": theme.colors.text,
      "margin-bottom": theme.spacing.line,
      "margin-top": "0",
      "text-transform": "uppercase",
      "line-height": "1.25",
      "letter-spacing": "-0.01em",
    }),
    cssRule(".email-subheading", {
      "font-size": theme.typography.fontSize.base,
      "font-weight": theme.typography.fontWeight.bold,
      "color": theme.colors.text,
      "margin-bottom": theme.spacing.line,
      "margin-top": theme.spacing.line,
      "text-transform": "uppercase",
      "line-height": "1.25",
    }),
    cssRule(".email-body", {
      "font-size": theme.typography.fontSize.base,
      "color": theme.colors.text,
      "line-height": theme.typography.lineHeight,
      "margin-bottom": theme.spacing.line,
      "letter-spacing": "0.01em",
    }),
    cssRule(".email-text-alt", {
      "font-size": theme.typography.fontSize.sm,
      "color": theme.colors.textAlt,
      "line-height": theme.typography.lineHeight,
    }),
    cssRule(".email-text-xs", {
      "font-size": theme.typography.fontSize.xs ?? "12px",
      "color": theme.colors.textAlt,
      "line-height": theme.typography.lineHeight,
    }),

    // Buttons - Base
    cssRule(".email-button", {
      "display": "inline-block",
      "padding": "0.875rem 1.5rem",
      "background-color": theme.colors.backgroundAlt,
      "color": theme.colors.text,
      "font-weight": theme.typography.fontWeight.medium,
      "font-size": theme.typography.fontSize.sm,
      "border": `${theme.borders.width} solid ${theme.colors.border}`,
      "text-decoration": "none",
      "text-transform": "uppercase",
      "letter-spacing": "0.05em",
      "line-height": "1",
      "transition": "background-color 150ms ease",
    }),
    cssRule(".email-button:hover", {
      "background-color": color("backgroundSubtle", theme.colors.background),
    }),

    // Buttons - Primary
    cssRule(".email-button-primary", {
      "display": "inline-block",
      "padding": "0.875rem 1.5rem",
      "background-color": theme.colors.text,
      "color": theme.colors.background,
      "font-weight": theme.typography.fontWeight.medium,
      "font-size": theme.typography.fontSize.sm,
      "border": `${theme.borders.width} solid ${theme.colors.text}`,
      "text-decoration": "none",
      "text-transform": "uppercase",
      "letter-spacing": "0.05em",
      "line-height": "1",
      "transition": "background-color 150ms ease",
    }),
    cssRule(".email-button-primary:hover", {
      "background-color": "#333333",
    }),

    // Buttons - Accent
    cssRule(".email-button-accent", {
      "display": "inline-block",
      "padding": "0.875rem 1.5rem",
      "background-color": theme.colors.background,
      "color": theme.colors.accent,
      "font-weight": theme.typography.fontWeight.medium,
      "font-size": theme.typography.fontSize.sm,
      "border": `${theme.borders.width} solid ${theme.colors.accent}`,
      "text-decoration": "none",
      "text-transform": "uppercase",
      "letter-spacing": "0.05em",
      "line-height": "1",
      "transition": "background-color 150ms ease",
    }),
    cssRule(".email-button-accent:hover", {
      "background-color": color("accentMuted", "#cffafe"),
    }),

    // Links
    cssRule(".email-link", {
      "color": theme.colors.text,
      "text-decoration": "underline",
      "text-decoration-thickness": theme.borders.width,
      "text-underline-offset": "3px",
    }),
    cssRule(".email-link-accent", {
      "color": theme.colors.accent,
      "text-decoration": "underline",
      "text-decoration-thickness": theme.borders.width,
      "text-underline-offset": "3px",
      "text-decoration-color": theme.colors.accent,
    }),

    // Dividers
    cssRule(".email-divider", {
      "position": "relative",
      "display": "block",
      "margin-top": "2rem",
      "margin-bottom": "2rem",
      "border": "0",
      "height": theme.typography.lineHeight,
    }),
    cssRule(".email-divider::after", {
      "content": "''",
      "position": "absolute",
      "top": `calc(${theme.typography.lineHeight} / 2 - 3px)`,
      "left": "0",
      "width": "100%",
      "height": "0",
      "border-top": `${theme.borders.widthDouble} double ${theme.colors.border}`,
    }),
    cssRule(".email-divider-subtle", {
      "margin-top": "1.5rem",
      "margin-bottom": "1.5rem",
      "border": "0",
      "height": "1px",
      "background-color": color("borderSoft", "#d4d4d4"),
    }),
    cssRule(".email-divider-accent", {
      "margin-top": "1.5rem",
      "margin-bottom": "1.5rem",
      "margin-left": "0",
      "margin-right": "auto",
      "border": "0",
      "height": "3px",
      "width": "60px",
      "background-color": theme.colors.accent,
    }),

    // Sections
    cssRule(".email-section", {
      "margin-bottom": theme.spacing.line,
    }),
    cssRule(".email-section-bordered", {
      "margin-bottom": theme.spacing.line,
      "padding": theme.spacing.line,
      "border": `${theme.borders.width} solid ${theme.colors.border}`,
    }),
    cssRule(".email-section-hero", {
      "padding": "2.5rem 0",
      "text-align": "left",
      "margin-bottom": "2rem",
    }),

    // Images
    cssRule(".email-image-hero", {
      "width": "100%",
      "max-width": "100%",
      "height": "auto",
      "display": "block",
      "margin-bottom": theme.spacing.line,
      "border": `${theme.borders.width} solid ${theme.colors.border}`,
    }),
    cssRule(".email-image-inline", {
      "width": "150px",
      "height": "150px",
      "object-fit": "cover",
      "display": "block",
      "border": `${theme.borders.width} solid ${theme.colors.border}`,
    }),
    cssRule(".email-section-image-left", {
      "width": "100%",
      "margin-bottom": theme.spacing.line,
    }),
    cssRule(".email-section-image-right", {
      "width": "100%",
      "margin-bottom": theme.spacing.line,
    }),
    cssRule(".email-image-cell", {
      "width": "150px",
      "vertical-align": "top",
      "padding-right": theme.spacing.line,
    }),
    cssRule(".email-section-image-right .email-image-cell", {
      "padding-right": "0",
      "padding-left": theme.spacing.line,
    }),
    cssRule(".email-content-cell", {
      "vertical-align": "top",
    }),

    // Footer
    cssRule(".email-footer", {
      "margin-top": theme.spacing.line,
      "padding-top": theme.spacing.line,
      "border-top": `${theme.borders.widthThick} double ${theme.colors.border}`,
      "font-size": theme.typography.fontSize.sm,
      "color": theme.colors.textAlt,
    }),

    // Code
    cssRule(".email-code", {
      "font-family": theme.typography.fontFamily,
      "font-weight": theme.typography.fontWeight.medium,
      "background-color": theme.colors.backgroundAlt,
      "padding": "0.25rem 0.5rem",
      "border": `1px solid ${color("borderSoft", "#d4d4d4")}`,
    }),
    cssRule(".email-code-lg", {
      "font-family": theme.typography.fontFamily,
      "font-weight": theme.typography.fontWeight.bold,
      "background-color": theme.colors.backgroundAlt,
      "padding": "0.5rem 0.75rem",
      "font-size": "24px",
      "letter-spacing": "0.15em",
      "border": `1px solid ${color("borderSoft", "#d4d4d4")}`,
    }),

    // Boxes
    cssRule(".email-box", {
      "padding": theme.spacing.line,
      "border": `${theme.borders.width} solid ${theme.colors.border}`,
      "margin-bottom": theme.spacing.line,
    }),
    cssRule(".email-box-alt", {
      "padding": theme.spacing.line,
      "background-color": theme.colors.backgroundAlt,
      "margin-bottom": theme.spacing.line,
    }),
    cssRule(".email-box-highlight", {
      "padding": "1.5rem",
      "padding-left": "1.25rem",
      "border-left": `4px solid ${theme.colors.accent}`,
      "background-color": color("backgroundSubtle", "#fafafa"),
      "margin-bottom": "1.5rem",
    }),

    // Semantic boxes
    cssRule(".email-box-success", {
      "padding": "1.5rem",
      "background-color": "#dcfce7",
      "border-left": "4px solid #15803d",
      "margin-bottom": "1.5rem",
    }),
    cssRule(".email-box-warning", {
      "padding": "1.5rem",
      "background-color": "#fef3c7",
      "border-left": "4px solid #a16207",
      "margin-bottom": "1.5rem",
    }),
    cssRule(".email-box-error", {
      "padding": "1.5rem",
      "background-color": "#fee2e2",
      "border-left": "4px solid #b91c1c",
      "margin-bottom": "1.5rem",
    }),
    cssRule(".email-box-info", {
      "padding": "1.5rem",
      "background-color": "#e0f2fe",
      "border-left": "4px solid #0369a1",
      "margin-bottom": "1.5rem",
    }),

    // Spacing utilities
    cssRule(".email-spacing-none", {
      "margin-top": "0",
    }),
    cssRule(".email-spacing-xs", {
      "margin-top": spacing("xs", "0.5rem"),
    }),
    cssRule(".email-spacing-sm", {
      "margin-top": spacing("sm", "0.75rem"),
    }),
    cssRule(".email-spacing-md", {
      "margin-top": spacing("md", "1.5rem"),
    }),
    cssRule(".email-spacing-lg", {
      "margin-top": spacing("lg", "2rem"),
    }),

    // Text alignment
    cssRule(".email-text-center", {
      "text-align": "center",
    }),

    // Images
    cssRule(".email-logo", {
      "max-width": "150px",
      "height": "auto",
      "margin-bottom": "1rem",
    }),
    cssRule(".email-avatar", {
      "width": "64px",
      "height": "64px",
      "border-radius": "50%",
      "margin-bottom": "1rem",
    }),
  ];

  return `\n${rules.join("\n")}\n`;
}
