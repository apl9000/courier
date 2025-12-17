
/**
 * Tests for theme validation and error handling
 */

import { assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { generateThemedCSS, mergeTheme } from "../src/email-styles.ts";

Deno.test("generateThemedCSS: throws on null theme", () => {
  assertThrows(
    () => {
      // @ts-expect-error Testing invalid input
      generateThemedCSS(null);
    },
    Error,
    "Invalid theme configuration: theme must be an object",
  );
});

Deno.test("generateThemedCSS: throws on undefined theme", () => {
  assertThrows(
    () => {
      // @ts-expect-error Testing invalid input
      generateThemedCSS(undefined);
    },
    Error,
    "Invalid theme configuration: theme must be an object",
  );
});

Deno.test("generateThemedCSS: throws on string instead of object", () => {
  assertThrows(
    () => {
      // @ts-expect-error Testing invalid input
      generateThemedCSS("not an object");
    },
    Error,
    "Invalid theme configuration: theme must be an object",
  );
});

Deno.test("generateThemedCSS: throws on incomplete theme object", () => {
  assertThrows(
    () => {
      // @ts-expect-error Testing invalid input
      generateThemedCSS({ colors: {} });
    },
    Error,
    "Invalid theme configuration: missing required theme properties",
  );
});

Deno.test("generateThemedCSS: accepts valid merged theme", () => {
  const theme = mergeTheme({
    colors: { text: "#000000" },
  });

  const css = generateThemedCSS(theme);

  // Should not throw and should return CSS string
  if (typeof css !== "string" || css.length === 0) {
    throw new Error("Expected non-empty CSS string");
  }
});

Deno.test("mergeTheme: accepts undefined and returns default theme", () => {
  const theme = mergeTheme(undefined);

  // Should have all required properties
  if (!theme.colors || !theme.typography || !theme.spacing || !theme.borders || !theme.container) {
    throw new Error("Expected complete theme object");
  }
});

Deno.test("mergeTheme: accepts partial theme config", () => {
  const theme = mergeTheme({
    colors: {
      text: "#333333",
    },
  });

  // Should merge with defaults
  if (theme.colors.text !== "#333333") {
    throw new Error("Expected custom text color to be applied");
  }

  // Should keep default values for other properties
  if (!theme.typography || !theme.spacing) {
    throw new Error("Expected default values to be preserved");
  }
});
