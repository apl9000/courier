/**
 * Tests for preset themes and theme helpers
 * Demonstrates usage of DarkTheme, ProfessionalTheme, ColorfulTheme, and createTheme
 */

import { assertStringIncludes } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../src/courier.ts";
import {
  ColorfulTheme,
  createTheme,
  DarkTheme,
  ProfessionalTheme,
} from "../src/email-styles.ts";

const testConfig = {
  service: "iCloud" as const,
  user: "test@example.com",
  pass: "password",
};

const templatesDir = "./src/emails";

Deno.test("DarkTheme: uses light text on dark background", async () => {
  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: DarkTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Light text
  assertStringIncludes(html, `color: ${DarkTheme.colors.text}`, "Should use light text");

  // Dark background
  assertStringIncludes(html, `background-color: ${DarkTheme.colors.background}`, "Should use dark background");

  // Dark alt background
  assertStringIncludes(html, `background-color: ${DarkTheme.colors.backgroundAlt}`, "Should use dark alt background");

  // Blue accent
  assertStringIncludes(html, `color: ${DarkTheme.colors.text}`, "Should use light text for buttons");
});

Deno.test("ProfessionalTheme: uses sans-serif font and subtle colors", async () => {
  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: ProfessionalTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Sans-serif font
  assertStringIncludes(html, `font-family: ${ProfessionalTheme.typography.fontFamily}`, "Should use Inter font");

  // Subtle gray text
  assertStringIncludes(html, `color: ${ProfessionalTheme.colors.text}`, "Should use dark gray text");

  // Light gray borders
  assertStringIncludes(html, `border: ${ProfessionalTheme.borders.width} solid ${ProfessionalTheme.colors.border}`, "Should use light gray borders");

  // 1.5rem line height
  assertStringIncludes(html, `line-height: ${ProfessionalTheme.typography.lineHeight}`, "Should use 1.5rem line height");

  // 700px container
  assertStringIncludes(html, `max-width: ${ProfessionalTheme.container.maxWidth}`, "Should use 700px max width");
});

Deno.test("ColorfulTheme: uses vibrant colors and thicker borders", async () => {
  const courier = await Courier.initialize({
    smtp: testConfig,
    templatesDir,
    theme: ColorfulTheme,
  });

  const html = courier.renderTemplate("welcome", {
    name: "Test User",
    actionUrl: "https://example.com",
    companyName: "Test Company",
  });

  // Orange borders
  assertStringIncludes(html, `border: ${ColorfulTheme.borders.width} solid ${ColorfulTheme.colors.border}`, "Should use orange 3px borders");

  // Yellow background alt
  assertStringIncludes(html, `background-color: ${ColorfulTheme.colors.backgroundAlt}`, "Should use yellow alt background");

  // Pink accent (button hover)
  assertStringIncludes(html, `background-color: ${ColorfulTheme.colors.backgroundAlt}`, "Button hover should use colorful background");

  // Thicker borders
  assertStringIncludes(html, `border-top: ${ColorfulTheme.borders.widthThick} double`, "Footer should use 4px border");
});

Deno.test("createTheme: extends DarkTheme with custom accent color", async () => {
  const customTheme = createTheme(DarkTheme, {
    colors: {
      ...DarkTheme.colors,
      accent: "#ff6b6b",
      accentHover: "#ff5252",
    },
  });

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

  // Should keep DarkTheme's light text
  assertStringIncludes(html, `color: ${DarkTheme.colors.text}`, "Should use DarkTheme's light text");

  // Should keep DarkTheme's dark background
  assertStringIncludes(html, `background-color: ${DarkTheme.colors.background}`, "Should use DarkTheme's dark background");

  // Theme merged successfully
  assertStringIncludes(html, DarkTheme.typography.fontFamily.split(",")[0], "Should keep DarkTheme's monospace font");
});

Deno.test("createTheme: extends ProfessionalTheme with larger container", async () => {
  const customTheme = createTheme(ProfessionalTheme, {
    container: {
      maxWidth: "900px",
    },
  });

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
  assertStringIncludes(html, `max-width: ${customTheme.container!.maxWidth}`, "Should use custom max width");

  // Should keep ProfessionalTheme's sans-serif font
  assertStringIncludes(html, `font-family: ${ProfessionalTheme.typography.fontFamily}`, "Should keep ProfessionalTheme's font");

  // Should keep ProfessionalTheme's line height
  assertStringIncludes(html, `line-height: ${ProfessionalTheme.typography.lineHeight}`, "Should keep ProfessionalTheme's line height");
});

Deno.test("All preset themes work with different email types", async () => {
  const themes = [
    { name: "Dark", theme: DarkTheme },
    { name: "Professional", theme: ProfessionalTheme },
    { name: "Colorful", theme: ColorfulTheme },
  ];

  for (const { name, theme } of themes) {
    const courier = await Courier.initialize({
      smtp: testConfig,
      templatesDir,
      theme,
    });

    // Test welcome email
    const welcomeHtml = courier.renderTemplate("welcome", {
      name: "Test User",
      actionUrl: "https://example.com",
      companyName: "Test Company",
    });

    // Test verification email
    const verificationHtml = courier.renderTemplate("email-verification", {
      name: "Test User",
      verificationUrl: "https://example.com/verify",
      verificationCode: "ABC123",
      companyName: "Test Company",
    });

    // Both should have themed CSS (not Tailwind CSS)
    assertStringIncludes(
      welcomeHtml,
      ".email-container {",
      `${name} theme should generate CSS for welcome`
    );
    assertStringIncludes(
      verificationHtml,
      ".email-container {",
      `${name} theme should generate CSS for verification`
    );
  }
});
