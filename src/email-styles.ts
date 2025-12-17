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

/**
 * CSS class name constants for email styling
 */
export const EmailClasses = {
  container: "email-container",
  section: "email-section",
  sectionBordered: "email-section-bordered",
  box: "email-box",
  boxAlt: "email-box-alt",
  heading: "email-heading",
  subheading: "email-subheading",
  body: "email-body",
  textAlt: "email-text-alt",
  code: "email-code",
  button: "email-button",
  link: "email-link",
  divider: "email-divider",
  footer: "email-footer",
  spacingNone: "email-spacing-none",
} as const;

/**
 * Design tokens for the email theme
 */
export const EmailTokens = {
  fontFamily: {
    mono: "ui-monospace, 'SFMono-Regular', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
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
  lineHeight: {
    base: "1.20rem",
  },
  spacing: {
    line: "1.20rem",
  },
  borderWidth: {
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
    alt: "#666666",
  },
  bg: {
    default: "#ffffff",
    alt: "#eeeeee",
  },
  border: {
    default: "#000000",
  },
  accent: {
    default: "#0891b2",
    hover: "#0e7490",
  },
} as const;

/**
 * Default theme configuration
 */
export const DefaultTheme = {
  colors: {
    text: EmailColors.text.default,
    textAlt: EmailColors.text.alt,
    background: EmailColors.bg.default,
    backgroundAlt: EmailColors.bg.alt,
    border: EmailColors.border.default,
    accent: EmailColors.accent.default,
    accentHover: EmailColors.accent.hover,
  },
  typography: {
    fontFamily: EmailTokens.fontFamily.mono,
    fontSize: EmailTokens.fontSize,
    fontWeight: EmailTokens.fontWeight,
    lineHeight: EmailTokens.lineHeight.base,
  },
  spacing: {
    line: EmailTokens.spacing.line,
    containerPadding: EmailTokens.spacing.line,
  },
  borders: {
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
    textAlt: "#a0a0a0",
    background: "#1a1a1a",
    backgroundAlt: "#2d2d2d",
    border: "#404040",
    accent: "#60a5fa",
    accentHover: "#3b82f6",
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
    textAlt: "#6b7280",
    background: "#ffffff",
    backgroundAlt: "#f3f4f6",
    border: "#d1d5db",
    accent: "#2563eb",
    accentHover: "#1e40af",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: EmailTokens.fontSize,
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "700",
    },
    lineHeight: "1.5rem",
  },
  spacing: {
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
    textAlt: "#64748b",
    background: "#ffffff",
    backgroundAlt: "#fef3c7",
    border: "#f59e0b",
    accent: "#ec4899",
    accentHover: "#db2777",
  },
  typography: DefaultTheme.typography,
  spacing: DefaultTheme.spacing,
  borders: {
    width: "3px",
    widthThick: "4px",
    widthDouble: "8px",
  },
  container: DefaultTheme.container,
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
    padding: "0.6rem 1rem",
    backgroundColor: DefaultTheme.colors.background,
    color: DefaultTheme.colors.text,
    fontWeight: DefaultTheme.typography.fontWeight.medium,
    border: `${DefaultTheme.borders.width} solid ${DefaultTheme.colors.border}`,
    textDecoration: "none",
    textTransform: "uppercase" as const,
    lineHeight: DefaultTheme.typography.lineHeight,
  },
} as const;

/**
 * Merge custom theme with default theme
 * @internal
 */
export function mergeTheme(customTheme?: any) {
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
  baseTheme: any,
  overrides: any
) {
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
 * 
 * @example
 * ```ts
 * const css = generateThemedCSS(mergeTheme(customTheme));
 * // Returns: <style>.email-container { ... } .email-button { ... }</style>
 * ```
 */
export function generateThemedCSS(theme: ReturnType<typeof mergeTheme>): string {
  const rules = [
    cssRule(".email-container", {
      "max-width": theme.container.maxWidth,
      "margin": "0 auto",
      "background-color": theme.colors.background,
      "padding": theme.spacing.containerPadding,
      "font-family": theme.typography.fontFamily,
      "font-size": theme.typography.fontSize.base,
      "line-height": theme.typography.lineHeight,
      "font-weight": theme.typography.fontWeight.normal,
    }),
    cssRule(".email-heading", {
      "font-size": theme.typography.fontSize["2xl"],
      "font-weight": theme.typography.fontWeight.bold,
      "color": theme.colors.text,
      "margin-bottom": theme.spacing.line,
      "margin-top": "0",
      "text-transform": "uppercase",
      "line-height": theme.typography.lineHeight,
    }),
    cssRule(".email-subheading", {
      "font-size": theme.typography.fontSize.base,
      "font-weight": theme.typography.fontWeight.bold,
      "color": theme.colors.text,
      "margin-bottom": theme.spacing.line,
      "margin-top": theme.spacing.line,
      "text-transform": "uppercase",
      "line-height": theme.typography.lineHeight,
    }),
    cssRule(".email-body", {
      "font-size": theme.typography.fontSize.base,
      "color": theme.colors.text,
      "line-height": theme.typography.lineHeight,
      "margin-bottom": theme.spacing.line,
    }),
    cssRule(".email-text-alt", {
      "font-size": theme.typography.fontSize.sm,
      "color": theme.colors.textAlt,
      "line-height": theme.typography.lineHeight,
    }),
    cssRule(".email-button", {
      "display": "inline-block",
      "padding": "0.6rem 1rem",
      "background-color": theme.colors.background,
      "color": theme.colors.text,
      "font-weight": theme.typography.fontWeight.medium,
      "border": `${theme.borders.width} solid ${theme.colors.border}`,
      "text-decoration": "none",
      "text-transform": "uppercase",
      "line-height": theme.typography.lineHeight,
      "transition": "background-color 150ms ease",
    }),
    cssRule(".email-button:hover", {
      "background-color": theme.colors.backgroundAlt,
    }),
    cssRule(".email-link", {
      "color": theme.colors.text,
      "text-decoration": "underline",
      "text-decoration-thickness": theme.borders.width,
    }),
    cssRule(".email-divider", {
      "position": "relative",
      "display": "block",
      "margin-top": theme.spacing.line,
      "margin-bottom": theme.spacing.line,
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
    cssRule(".email-section", {
      "margin-bottom": theme.spacing.line,
    }),
    cssRule(".email-section-bordered", {
      "margin-bottom": theme.spacing.line,
      "padding": theme.spacing.line,
      "border": `${theme.borders.width} solid ${theme.colors.border}`,
    }),
    cssRule(".email-footer", {
      "margin-top": theme.spacing.line,
      "padding-top": theme.spacing.line,
      "border-top": `${theme.borders.widthThick} double ${theme.colors.border}`,
      "font-size": theme.typography.fontSize.sm,
      "color": theme.colors.textAlt,
    }),
    cssRule(".email-code", {
      "font-family": theme.typography.fontFamily,
      "font-weight": theme.typography.fontWeight.medium,
      "background-color": theme.colors.backgroundAlt,
      "padding": "0.125rem 0.25rem",
    }),
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
    cssRule(".email-spacing-none", {
      "margin-top": "0",
    }),
    cssRule(".email-spacing-top", {
      "margin-top": "0.6rem",
    }),
    cssRule(".email-text-center", {
      "text-align": "center",
    }),
    cssRule(".email-code-lg", {
      "font-family": theme.typography.fontFamily,
      "font-weight": theme.typography.fontWeight.medium,
      "background-color": theme.colors.backgroundAlt,
      "padding": "0.125rem 0.25rem",
      "font-size": "20px",
    }),
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

  return `<style>\n${rules.join("\n")}\n</style>`;
}
