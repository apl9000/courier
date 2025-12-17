/**
 * Tests for custom theme configuration
 * Validates that custom themes override default values correctly
 */

import { assertStringIncludes } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../src/courier.ts";
import type { ThemeConfig } from "../src/types.ts";

const testConfig = {
  service: "iCloud" as const,
  user: "test@example.com",
  pass: "password",
};

const templatesDir = "./src/emails";

Deno.test("Custom theme: overrides default colors", async () => {
  const customTheme: ThemeConfig = {
    colors: {
      text: "#1a1a1a",
      textAlt: "#555555",
      background: "#f5f5f5",
      backgroundAlt: "#e0e0e0",
      border: "#333333",
      accent: "#0891b2",
      accentHover: "#0e7490",
    },
  };

  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: customTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Should use custom text color
  assertStringIncludes(html, `color: ${customTheme.colors!.text}`, "Should use custom text color");

  // Should use custom background color
  assertStringIncludes(
    html,
    `background-color: ${customTheme.colors!.background}`,
    "Should use custom background color",
  );

  // Should use custom border color
  assertStringIncludes(
    html,
    `border: 2px solid ${customTheme.colors!.border}`,
    "Should use custom border color",
  );

  // Should use custom alt text color
  assertStringIncludes(
    html,
    `color: ${customTheme.colors!.textAlt}`,
    "Should use custom alt text color",
  );

  // Should use custom alt background color
  assertStringIncludes(
    html,
    `background-color: ${customTheme.colors!.backgroundAlt}`,
    "Should use custom alt background color",
  );
});

Deno.test("Custom theme: overrides typography settings", async () => {
  const customTheme: ThemeConfig = {
    typography: {
      fontFamily: "Arial, sans-serif",
      fontSize: {
        sm: "12px",
        base: "18px",
        lg: "20px",
        xl: "22px",
        "2xl": "28px",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        bold: "700",
      },
      lineHeight: "1.5rem",
    },
  };

  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: customTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Should use custom font family
  assertStringIncludes(
    html,
    `font-family: ${customTheme.typography!.fontFamily}`,
    "Should use custom font family",
  );

  // Should use custom base font size
  assertStringIncludes(
    html,
    `font-size: ${customTheme.typography!.fontSize!.base}`,
    "Should use custom base font size",
  );

  // Should use custom heading font size
  assertStringIncludes(
    html,
    `font-size: ${customTheme.typography!.fontSize!["2xl"]}`,
    "Should use custom heading font size",
  );

  // Should use custom line height
  assertStringIncludes(
    html,
    `line-height: ${customTheme.typography!.lineHeight}`,
    "Should use custom line height",
  );

  // Should use custom font weight
  assertStringIncludes(
    html,
    `font-weight: ${customTheme.typography!.fontWeight!.bold}`,
    "Should use custom bold weight",
  );
});

Deno.test("Custom theme: overrides spacing settings", async () => {
  const customTheme: ThemeConfig = {
    spacing: {
      line: "1.5rem",
      containerPadding: "2rem",
    },
  };

  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: customTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Should use custom container padding
  assertStringIncludes(
    html,
    `padding: ${customTheme.spacing!.containerPadding}`,
    "Should use custom container padding",
  );

  // Should use custom line spacing
  assertStringIncludes(
    html,
    `margin-bottom: ${customTheme.spacing!.line}`,
    "Should use custom line spacing",
  );
});

Deno.test("Custom theme: overrides border settings", async () => {
  const customTheme: ThemeConfig = {
    borders: {
      width: "3px",
      widthThick: "5px",
      widthDouble: "8px",
    },
  };

  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: customTheme,
  });

  const html = courier.renderTemplate("password-reset", {
    name: "Test User",
    resetUrl: "https://example.com/reset",
    resetCode: "ABC123",
    companyName: "Test Company",
  });

  // Should use custom border width
  assertStringIncludes(
    html,
    `border: ${customTheme.borders!.width} solid`,
    "Should use custom border width",
  );

  // Should use custom thick border (footer)
  assertStringIncludes(
    html,
    `border-top: ${customTheme.borders!.widthThick} double`,
    "Should use custom thick border width",
  );
});

Deno.test("Custom theme: overrides container settings", async () => {
  const customTheme: ThemeConfig = {
    container: {
      maxWidth: "800px",
    },
  };

  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: customTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Should use custom max width
  assertStringIncludes(
    html,
    `max-width: ${customTheme.container!.maxWidth}`,
    "Should use custom container max-width",
  );
});

Deno.test("Custom theme: partial override merges with defaults", async () => {
  // Only override colors, keep default typography/spacing/borders
  const customTheme: ThemeConfig = {
    colors: {
      text: "#2d2d2d",
      background: "#fafafa",
    },
  };

  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: customTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Should use custom text color
  assertStringIncludes(html, `color: ${customTheme.colors!.text}`, "Should use custom text color");

  // Should use custom background color
  assertStringIncludes(
    html,
    `background-color: ${customTheme.colors!.background}`,
    "Should use custom background color",
  );

  // Should still use default typography (monospace)
  assertStringIncludes(
    html,
    "ui-monospace",
    "Should keep default monospace font when not overridden",
  );

  // Should still use default line height
  assertStringIncludes(
    html,
    "line-height: 1.5",
    "Should keep default line height when not overridden",
  );
});

Deno.test("No custom theme: uses DefaultTheme runtime CSS", async () => {
  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    // No theme provided - should use DefaultTheme
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Should use runtime-generated CSS with DefaultTheme values
  assertStringIncludes(html, ".email-container {", "Should include CSS classes");
  assertStringIncludes(html, "color: #000000", "Should use DefaultTheme text color");
  assertStringIncludes(html, "ui-monospace", "Should use DefaultTheme monospace font");
});

Deno.test("Custom theme: generates dynamic CSS for all email types", async () => {
  const customTheme: ThemeConfig = {
    colors: {
      text: "#111111",
      accent: "#ff6b6b",
      accentHover: "#ff5252",
    },
  };

  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: customTheme,
  });

  // Test multiple email types use the custom theme
  const welcomeHtml = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  const verificationHtml = courier.renderTemplate("email-verification", {
    name: "Test User",
    verificationUrl: "https://example.com/verify",
    companyName: "Test Company",
  });

  const newsletterHtml = courier.renderTemplate("newsletter", {
    title: "Newsletter",
    sections: [
      { heading: "News", content: "Some news", link: "https://example.com" },
    ],
    companyName: "Test Company",
  });

  // All should use custom text color
  assertStringIncludes(welcomeHtml, "color: #111111", "Welcome should use custom theme");
  assertStringIncludes(verificationHtml, "color: #111111", "Verification should use custom theme");
  assertStringIncludes(newsletterHtml, "color: #111111", "Newsletter should use custom theme");
});
